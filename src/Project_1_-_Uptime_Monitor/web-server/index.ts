import * as http from 'http';
import * as https from 'https';
import * as url from 'url';
import * as fs from 'fs';
import * as path from 'path';
import { StringDecoder, NodeStringDecoder } from 'string_decoder';

import { IServerResponseModel } from '../data-structures/models/server-response.model';
import { handlerType } from '../data-structures/types/handler.type';
import { ROUTER } from '../router';
import { Config } from '../config';

export class WebServer {
  // WebServer is a singleton
  private static _instance: WebServer;
  static get Instance(): WebServer {
    return this._instance || (this._instance = new this());
  }

  httpServer: http.Server;
  httpServerResponse: IServerResponseModel;
  httpsServer: https.Server;
  httpsServerResponse: IServerResponseModel;

  private constructor() {
    this.httpServerResponse = { path: '', method: '' };
    this.httpsServerResponse = { path: '', method: '' };
    this.httpServer = http.createServer((request: http.IncomingMessage,  response: http.ServerResponse) => {
      this._generateServerResponse(request, response, this.httpServerResponse, 'Http server');
    });
    this.httpsServer = https.createServer({
      key: fs.readFileSync(path.join(__dirname, './../../../.https/key.pem')), // correct this path using path node module
      cert: fs.readFileSync(path.join(__dirname, './../../../.https/cert.pem'))
    }, (request: http.IncomingMessage, response: http.ServerResponse) => {
      this._generateServerResponse(request, response, this.httpsServerResponse, 'Https server');
    });
  }

  private _generateServerResponse(request: http.IncomingMessage,
      response: http.ServerResponse,
      responseObject: IServerResponseModel,
      caption: string
  ): void {
    const parseUrl = url.parse(request.url || '', true);
    const decoder: NodeStringDecoder = new StringDecoder('utf-8');
    responseObject = {
      path: (parseUrl.pathname || '').replace(/^\/+|\/+$/g, ''),
      method: (request.method || '').toLowerCase(),
      queryStringObject: parseUrl.query,
      headers: request.headers,
      payload: ''
    };
    request.on('data', (data: Buffer) => responseObject.payload += decoder.write(data))
      .on('end', () => {
        responseObject.payload += decoder.end();
        const handler: handlerType = (responseObject.path in ROUTER) ? ROUTER[responseObject.path] : ROUTER.notFound;
        handler(responseObject, (statusCode: number, payload: any) => {
          payload = typeof (payload) === 'object' ? payload : {};
          response.setHeader('Content-Type', 'application/json');
          response.writeHead(statusCode);
          response.end(JSON.stringify(payload));
          console.log(`${caption} is returning the response:`, statusCode, payload);
        });
      });
  }

  startServers(): void {
    this.httpServer.listen(Config.environment.httpPort, () =>  {
      console.log(`The http server is listening on port ${Config.environment.httpPort}...`);
    });
    this.httpsServer.listen(Config.environment.httpsPort, () => {
      console.log(`The https server is listening on port ${Config.environment.httpsPort}...`);
    })
  }
}

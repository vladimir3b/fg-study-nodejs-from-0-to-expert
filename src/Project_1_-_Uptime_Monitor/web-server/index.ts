import * as http from 'http';
import * as url from 'url';
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

  server: http.Server;
  serverResponse: IServerResponseModel;
  get chosenHandler(): handlerType {
    return (this.serverResponse.path in ROUTER) ? ROUTER[this.serverResponse.path] : ROUTER.notFound;
  }

  private constructor() {
    this.serverResponse = { path: '', method: '' }; // this is a simple initialization
    this.server = http.createServer(
      (request: http.IncomingMessage, response: http.ServerResponse) => {
        const parseUrl = url.parse(request.url || '', true);
        const decoder: NodeStringDecoder = new StringDecoder('utf-8');
        this.serverResponse = {
          path: (parseUrl.pathname || '').replace(/^\/+|\/+$/g, ''),
          method: (request.method || '').toLowerCase(),
          queryStringObject: parseUrl.query,
          headers: request.headers,
          payload: ''
        };
        request
          .on('data', (data: Buffer) => this.serverResponse.payload += decoder.write(data))
          .on('end', () => {
            this.serverResponse.payload += decoder.end();
            this.chosenHandler(this.serverResponse, (statusCode: number, payload: any) => {
              payload = typeof (payload) === 'object' ? payload : {};
              response.setHeader('Content-Type', 'application/json');
              response.writeHead(statusCode);
              response.end(JSON.stringify(payload));
              console.log('Returning the response:', statusCode, payload);
            });
          });
      }
    );
  }

  startServer(): void {
    this.server.listen(Config.environment.port, () => {
      console.log(
        `The server is listening on port ${Config.environment.port} in ${
        Config.environment.envName
        } mode...`
      );
    });
  }
}

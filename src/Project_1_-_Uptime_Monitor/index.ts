import { IServerResponseModel } from './models/server-response.model';
import * as http from 'http';
import * as url from 'url';
import { StringDecoder, NodeStringDecoder } from 'string_decoder';
import { ROUTER } from './router';

const PORT = 3000;

class WebServer {
  // WebServer is a singleton
  private static _instance: WebServer;
  static get Instance(): WebServer {
    return this._instance || (this._instance = new this());
  }

  server: http.Server;
  serverResponse: IServerResponseModel;
  get chosenHandler(): any {
    // return (this.serverResponse.path in ROUTER) ? (ROUTER as any)[this.serverResponse.path] : ROUTER.notFound;
    if (ROUTER[this.serverResponse.path]) {
      return ROUTER[this.serverResponse.path];
    }
  }

  private constructor() {
    this.serverResponse = { path: '', method: ''}; // this is a simple initialization
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
            this.chosenHandler(this.serverResponse, (statis))
            response.end('Hello World!\n');
          });
      }
    );
  }

  startServer(): void {
    this.server.listen(PORT, () => {
      console.log(`The server is listening on port ${PORT}...`);
    });
  }
}

const MyServer = WebServer.Instance;
MyServer.startServer();
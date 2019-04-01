import * as http from 'http';
import * as url from 'url';
import { ParsedUrlQuery } from 'querystring';
import { StringDecoder, NodeStringDecoder } from 'string_decoder';

const PORT = 3000;

class WebServer {
  // WebServer is a singleton
  private static _instance: WebServer;
  static get Instance(): WebServer {
    return this._instance || (this._instance = new this());
  }

  server: http.Server;
  path?: string;
  method?: string;
  payload?: string;
  queryStringObject?: ParsedUrlQuery;
  headers?: http.IncomingHttpHeaders;

  private constructor() {
    this.server = http.createServer(
      (request: http.IncomingMessage, response: http.ServerResponse) => {
        const parseUrl = url.parse(request.url || '', true);
        const decoder: NodeStringDecoder = new StringDecoder('utf-8');
        this.payload = ''; // payload resets with every new request
        this.path = (parseUrl.pathname || '').replace(/^\/+|\/+$/g, '');
        this.method = (request.method || '').toLowerCase();
        this.queryStringObject = parseUrl.query;
        this.headers = request.headers;
        request
          .on('data', (data: Buffer) => this.payload += decoder.write(data))
          .on('end', () => {
            this.payload += decoder.end();
            response.end('Hello World!\n');
            this.logRequestState();
          });
      }
    );
  }

  startServer(): void {
    this.server.listen(PORT, () => {
      console.log(`The server is listening on port ${PORT}...`);
    });
  }
  logRequestState() {
    if (this.path) {
      console.log(`Request received on path: ${this.path}.`);
    }
    if (this.method) {
      console.log(`Method: ${this.method}.`);
    }
    if (this.queryStringObject && Object.keys(this.queryStringObject).length) {
      console.log('Query string parameters: ', this.queryStringObject);
    }
    if (this.headers && Object.keys(this.headers).length) {
      console.log('Request received with these headers: ', this.headers);
    }
    if (this.payload) {
      console.log(`'Request received with these payload: ': ${this.payload}.`)
    }
  }
}

const MyServer = WebServer.Instance;
MyServer.startServer();
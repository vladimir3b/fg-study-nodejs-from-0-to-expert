/**
 * Primary file for the API - Typescript
 */

 // Dependencies
import * as http from 'http';
import * as url from 'url';
import { StringDecoder, NodeStringDecoder } from 'string_decoder';
import { ParsedUrlQuery } from 'querystring';

// Defining server constants
const PORT: number = 3000;

interface IDataForHandler {
  trimmedPath: string;
  queryStringObject: ParsedUrlQuery;
  method: string;
  headers: http.IncomingHttpHeaders;
  payload: string;
}

interface ISampleHandler {
  sample: (data: IDataForHandler, callback: Function) => void;
  notFound: (data: IDataForHandler, callback: Function) => void;
}

class WebServer {
  // Create a singleton
  private static _instance: WebServer;

  public static get Instance(): WebServer {
    return this._instance || (this._instance = new this());
  }

  // Properties
  public server: http.Server;
  // private


  // Constructor
  private constructor() {
    // The server should respond to all requests with a string
    this.server = http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => {

      // Convert undefined cases to empty strings
      request.url = request.url || '';
      request.method = request.method || '';

      // Get the URL and parse it
      const parsedURL: url.UrlWithParsedQuery = url.parse(request.url, true);

      // Get the path from the URL
      const path: string = parsedURL.pathname || '';
      const trimmedPath = path.replace(/^\/+|\/+$/g, '');

      // Get the HTTP method
      const method: string = request.method.toUpperCase();

      // Get the query string as an object
      const queryStringObject: ParsedUrlQuery = parsedURL.query;

      // Get the headers as an object
      const headers: http.IncomingHttpHeaders = request.headers;

      // Get the payload, if any
      const decoder: NodeStringDecoder = new StringDecoder('utf-8');
      let buffer: string = '';
      request.on('data', (data: Buffer) => {
        buffer += decoder.write(data)
      });
      request.on('end', () => {
        buffer += decoder.end();

        // Send the response
        response.end('Hello World!\n');

        // Log the requested path
        if (trimmedPath) {
          console.log(`Request received on path: ${ trimmedPath }.`);
        }
        if (method) {
          console.log(`Method: ${ method }.`)
        }
        if (Object.keys(queryStringObject).length) { // verify if queryStringObject is empty
          console.log('Query string parameters: ', queryStringObject);
        }
        if (Object.keys(headers).length) { // verify if headers is empty
          console.log('Request received with these headers: ', headers);
        }
        if (buffer) {
          console.log(`'Request received with these payload: ': ${ buffer }.`)
        }

      });

    });

  }

  // Methods
  public startServer(): void {
    this.server.listen(PORT, () => {
      console.log(`The server is listening on port ${PORT}...`);
    });
  }

}

const MyServer: WebServer = WebServer.Instance; // Instantiate the singleton
MyServer.startServer();

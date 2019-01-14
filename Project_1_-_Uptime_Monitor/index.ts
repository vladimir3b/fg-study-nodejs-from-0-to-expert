/**
 * Primary file for the API - Typescript
 */

 // Dependencies
import * as http from 'http';
import * as url from 'url';
import { StringDecoder } from 'string_decoder';
import { ParsedUrlQuery } from 'querystring';

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

class MyServer {
  // Create a singleton
  private static _instance: MyServer;

  public static get Instance(): MyServer {
    return this._instance || (this._instance = new this());
  }

  // Singleton's properties
  public server: http.Server;
  public data: IDataForHandler | null;
  public handlers: ISampleHandler;

  // Singleton's constructor
  private constructor() {
    this.data = null;
    this.server = http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => {

      // Get the URL and parse it
      const parsedUrl: url.UrlWithParsedQuery = url.parse(request.url || '', true);

      // Get the path from the URL
      const path: string = parsedUrl.pathname || '';
      const trimmedPath: string = path.replace(/^\/+|\/+$/g, '');

      // Get the query string as an object
      const queryStringObject: ParsedUrlQuery = parsedUrl.query;

      // Get the HTTP method
      const method: string = (request.method || '').toUpperCase();

      // Get the headers as an object
      const headers: http.IncomingHttpHeaders = request.headers;

      // Get the payload, if any



    })

    this.handlers = {
      sample: (data: IDataForHandler, callback: Function) => {
        // Callback http status code and a payload object
        callback(406, {
          name: 'sample handler'
        })
      },
      notFound: (data: IDataForHandler, callback:Function) => {
        // Not found handler
        callback(404);
      }
    }

    // this.router = {
    //   sample: this.handlers.sample
    // }
  }

}
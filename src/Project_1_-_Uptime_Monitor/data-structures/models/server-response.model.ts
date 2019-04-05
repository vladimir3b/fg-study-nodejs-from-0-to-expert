import { ParsedUrlQuery } from 'querystring';
import * as http from 'http';

export interface IServerResponseModel {
  path: string;
  method: string;
  payload?: string;
  queryStringObject?: ParsedUrlQuery;
  headers?: http.IncomingHttpHeaders;
}
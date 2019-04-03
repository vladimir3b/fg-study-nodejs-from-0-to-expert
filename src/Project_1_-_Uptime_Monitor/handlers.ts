import { IServerResponseModel } from './models/server-response.model';

export type callbackType = (statusCode: number, payload?: any) => void;

export class Handler {
  static sample(data: IServerResponseModel, callback: callbackType) {
    callback(406, data);
  }
  static notFound(data: IServerResponseModel, callback: callbackType) {
    callback(404);
  }
}
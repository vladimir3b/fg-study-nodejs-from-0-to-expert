import { IServerResponseModel } from '../data-structures/models/server-response.model';
import { callbackType } from '../data-structures/types/callback.type';

export class Handler {
  static ping(data: IServerResponseModel, callback: callbackType) {
    callback(200);
  }
  static notFound(data: IServerResponseModel, callback: callbackType) {
    callback(404);
  }
}
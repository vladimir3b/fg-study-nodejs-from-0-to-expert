import { IServerResponseModel } from '../data-structures/models/server-response.model';
import { callbackHandlerType } from '../data-structures/types/callback.types';

export class Handler {
  static ping(data: IServerResponseModel, callback: callbackHandlerType) {
    callback(200);
  }
  static notFound(data: IServerResponseModel, callback: callbackHandlerType) {
    callback(404);
  }
}
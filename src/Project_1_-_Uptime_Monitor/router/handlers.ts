import { IServerResponseModel } from '../data-structures/models/server-response.model';
import { callbackType } from '../data-structures/types/callback.type';

export class Handler {
  static sample(data: IServerResponseModel, callback: callbackType) {
    callback(406, data);
  }
  static notFound(data: IServerResponseModel, callback: callbackType) {
    callback(404);
  }
}
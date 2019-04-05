import { callbackType } from './callback.type';
import { IServerResponseModel } from '../models/server-response.model';

export type handlerType = (date: IServerResponseModel, callback: callbackType) => void;
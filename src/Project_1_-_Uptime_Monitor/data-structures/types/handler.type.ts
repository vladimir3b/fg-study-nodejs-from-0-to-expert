import { callbackHandlerType } from './callback.types';
import { IServerResponseModel } from '../models/server-response.model';

export type handlerType = (date: IServerResponseModel, callback: callbackHandlerType) => void;
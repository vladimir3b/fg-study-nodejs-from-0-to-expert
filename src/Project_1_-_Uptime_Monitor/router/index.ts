
import { Handler } from './handlers';
import { IHashTable } from '../data-structures/hash-table';
import { handlerType } from '../data-structures/types/handler.type';

export const ROUTER: IHashTable<handlerType> = {
  ping: Handler.ping,
  notFound: Handler.notFound
}
import { IHashTable } from './data-structures/hash-table';
import { IEnvironmentModel } from './data-structures/models/environment.model';

export class Config {
  private static _environments: IHashTable<IEnvironmentModel> = {
    staging: {
      port: 3000,
      envName: 'staging'
    },
    production: {
      port: 5000,
      envName: 'production'
    }
  }
  private static get _currentEnvironment(): string {
    return (process.env.NODE_ENV || '').toLowerCase().trim();
  }
  public static get environment(): IEnvironmentModel {
    return (this._currentEnvironment in this._environments) ?
      this._environments[this._currentEnvironment ] :
      this._environments.staging;
  }
}

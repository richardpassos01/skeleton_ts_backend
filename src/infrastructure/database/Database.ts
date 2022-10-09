import {injectable} from 'inversify';
import * as Knex from 'knex';
import Settings from '../../settings/Settings';

@injectable()
class Database {
  private instance: Knex;

  constructor() {
    this.instance = Knex(Settings.database);
    this.checkConnection();
  }

  async checkConnection(): Promise<void> {
    return this.instance.select(1).then(() => {
      console.log('database connected!');
    });
  }

  connection(): Knex {
    return this.instance;
  }
}

export default Database;

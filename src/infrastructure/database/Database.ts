import {Settings} from '@settings';
import {injectable} from 'inversify';
import * as Knex from 'knex';

@injectable()
class Database {
  private instance: Knex;

  constructor() {
    this.instance = Knex(Settings.database);
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

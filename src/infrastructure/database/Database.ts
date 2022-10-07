import * as Knex from 'knex';
import knexConfig from '../../../knexfile';

class Database {
  private static instance: Database;

  private constructor(private readonly knexInstance: Knex) {}

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database(Knex(knexConfig));
      Database.instance.checkConnection();
    }

    return Database.instance;
  }

  async checkConnection() {
    return this.knexInstance.select(1).then(() => {
      console.log('database connected!');
    });
  }

  connection() {
    return this.knexInstance;
  }
}

export default Database;

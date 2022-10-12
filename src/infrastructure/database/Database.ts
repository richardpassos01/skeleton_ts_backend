import {Settings} from '@settings';
import {injectable} from 'inversify';
import {Db, MongoClient} from 'mongodb';
import Tables from './Tables';

@injectable()
class Database {
  private instance: MongoClient;

  constructor() {
    this.instance = new MongoClient(Settings.databaseStringConnection);
  }

  checkConnection(): void {
    this.instance.connect().then(() => {
      console.log('database connected!');
    });
  }

  createIndexes(): void {
    this.connection()
      .collection(Tables.USERS)
      .createIndex({email: 1}, {unique: true});
  }

  connection(): Db {
    return this.instance.db(Settings.database);
  }
}

export default Database;

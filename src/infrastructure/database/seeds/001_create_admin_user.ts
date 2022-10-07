import * as Knex from 'knex';

import database from '../../../config/database';

export async function seed(knex: Knex): Promise<void> {
  return knex(database.tables.users)
    .del()
    .then(() => {
      return knex(database.tables.users).insert([
        {
          id: 'c1daef5f-4bd0-4616-bb62-794e9b5d8ca2',
          name: 'admin',
          email: 'admin@email.com',
          salt: '5fa64dffbbbc4334c8b9e6e51923b050',
          hash: 'cf5874e22a1d12b0c2717eb05817f3f7f4014402ed9a97c553691196e2033779ef045e8da108ac923fa6646c6e2e405c18287aec555fa68df79351733370e05b',
        },
      ]);
    });
}

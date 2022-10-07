import * as Knex from 'knex';

import database from '../../../config/database';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.hasTable(database.tables.users).then(exists => {
    if (!exists) {
      knex.schema
        .createTable(database.tables.users, table => {
          table.uuid('id').primary();
          table.string('name', 350).notNullable();
          table.string('email', 50).unique().notNullable();
          table.string('salt', 50).notNullable();
          table.string('hash', 250).notNullable();

          table.timestamps(true, true);
        })
        .then();
    }
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(database.tables.users);
}

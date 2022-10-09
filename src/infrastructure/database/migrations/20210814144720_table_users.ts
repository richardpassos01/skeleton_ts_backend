import * as Knex from 'knex';
import Tables from '../Tables';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.hasTable(Tables.USERS).then(exists => {
    if (!exists) {
      knex.schema
        .createTable(Tables.USERS, table => {
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
  return knex.schema.dropTable(Tables.USERS);
}

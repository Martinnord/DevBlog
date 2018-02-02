exports.up = function(knex) {
  return knex.schema
    .createTable('users', function(table) {
      table.increments('id').primary()
      table
        .string('username')
        .notNullable()
        .unique()
      table.string('firstname')
      table.string('lastname')
      table
        .string('email')
        .notNullable()
        .unique()
      table.string('password').notNullable()
      table.timestamps(true, true)
    })
    .createTable('posts', function(table) {
      table.increments('id').primary()
      table
        .string('title')
        .notNullable()
        .defaultTo('')
      table
        .string('content', 100000)
        .notNullable()
        .defaultTo('')
      table
        .string('imageUrl')
        .defaultTo('')
      table
        .integer('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      table
        .timestamp('createdAt')
        .defaultTo(knex.fn.now())
    })
}

exports.down = function(knex) {
  return knex.schema.dropTable('posts').dropTable('users')
}

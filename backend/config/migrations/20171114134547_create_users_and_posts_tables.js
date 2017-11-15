
exports.up = function(knex, Promise) {
 return knex.schema.createTable('users', function(table) {
 	table.increments().primary()
	table.string('username').notNullable()
	table.string('firstname').notNullable()
	table.string('lastname').notNullable()
	table.string('email').notNullable()
	table.string('password').notNullable()
	table.timestamp('created_at').defaultTo(knex.fn.now())
	table.timestamp('updated_at').defaultTo(knex.fn.now())
 })
	.createTable('posts', function(table) {
		table.increments().primary()
		table.timestamp('created_at').defaultTo(knex.fn.now())
 		table.timestamp('updated_at').defaultTo(knex.fn.now())
 		table.string('title').notNullable()
 		table.string('content').notNullable()
 		table.integer('user_id').references('id').inTable('users')
    })
  }

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts').dropTable('users')
}

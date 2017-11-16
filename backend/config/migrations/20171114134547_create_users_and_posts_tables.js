exports.up = function(knex) {
  return knex.schema
    .createTable('User', function(table) {
      table.increments('id').primary();
      table.string("username").notNullable();
      table.string("firstname").notNullable();
      table.string("lastname").notNullable();
      table.string("email").notNullable();
      table.string("password").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("Post", function(table) {
      table.increments('id').primary();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
      table.string("title").notNullable();
      table.string("content").notNullable();
      table
        .integer("user_id")
        .references("id")
        .inTable("User");
    });
};

exports.down = function(knex) {
  return knex.schema
		.dropTableIfExists("Post")
		.dropTableIfExists("User");
};

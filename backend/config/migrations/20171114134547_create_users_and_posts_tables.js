exports.up = function(knex) {
  return knex.schema
    .createTable("users", function(table) {
      table.increments("id").primary();
      table.string("username");
      table.string("firstname");
      table.string("lastname");
      table.string("email");
      table.string("password");
      table.timestamps(true, true)
    })
    .createTable("posts", function(table) {
      table.increments("id").primary();
      table
        .string("title")
        .notNullable()
        .defaultTo("");
      table
        .string("content")
        .notNullable()
        .defaultTo("");
      table
        .integer("user_id")
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.timestamps(true, true)
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable("posts").dropTable("users");
};

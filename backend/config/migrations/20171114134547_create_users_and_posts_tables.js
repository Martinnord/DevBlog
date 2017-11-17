exports.up = function (knex) {
  return knex
    .schema
    .createTable("users", function (table) {
      table
        .increments("id")
        .primary();
      table.string("username");
      table.string("firstname");
      table.string("lastname");
      table.string("email");
      table.string("password");
      table
        .timestamp("created_at")
        .defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")
        .defaultTo(knex.fn.now());
    })
    .createTable("posts", function (table) {
      table
        .increments("id")
        .primary();
      table
        .timestamp("created_at")
        .defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")
        .defaultTo(knex.fn.now());
      table.string("title");
      table.string("content");
      table
        .integer("user_id")
        .references("id")
        .inTable("users");
    });
};

exports.down = function (knex) {
  return knex
    .schema
    .dropTableIfExists("posts")
    .dropTableIfExists("users");
};

exports.up = function(knex) {
  return knex.schema
    .createTable('users', function(table) {
      table.increments('id').primary()
      table
        .text('username')
        .notNullable()
        .unique()
      table.text('name')
      table
        .text('email')
        .notNullable()
        .unique()
      table.string('password').notNullable()
      table
        .text('profile_image')
        .defaultTo('http://www.ecehh.org/wp-content/uploads/2018/02/avatar.jpg')
      table.text('website_url').unique()
      table.text('bio')
      table.text('location')
      table.text('work_status')
      table.text('twitter_username').unique()
      table.text('github_username').unique()
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
    .createTable('posts', function(table) {
      table.increments('id').primary()
      table
        .string('title')
        .notNullable()
        .defaultTo('')
      table.string('image_url').defaultTo('')
      table
        .text('content')
        .notNullable()
        .defaultTo('')
      table
        .integer('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
    .createTable('post_likes', function(table) {
      table.increments('id').primary()
      table
        .integer('user_id')
        .references('id')
        .inTable('users')
        .notNullable()
      table
        .integer('post_id')
        .references('id')
        .inTable('posts')
        .notNullable()
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
}

exports.down = function(knex) {
  return knex.schema
    .dropTable('post_likes')
    .dropTable('posts')
    .dropTable('users')
}

// const objection = require('objection');
// const Model = objection.Model;
// const Knex = require('knex');

// // Initialize knex connection.
// const knex = Knex({
//   client: 'pg',
//   useNullAsDefault: true,
//   connection: 'postgres://localhost/devblog'
// });

// // Give the connection to objection.
// Model.knex(knex);

// // Person model.
// class Post extends Model {
//   static get tableName() {
//     return 'posts';
//   }
// }

// Post.query().then(posts => { console.log(posts) })
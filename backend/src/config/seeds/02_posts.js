exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('posts').insert([
        {
          id: 1,
          title: 'title1',
          content: 'content1',
          user_id: 1
        },
        {
          id: 2,
          title: 'title2',
          content: 'content2',
          user_id: 1
        },
        {
          id: 3,
          title: 'title3',
          content: 'content3',
          user_id: 2
        }
      ])
    })
}

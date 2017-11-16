
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('User').del()
    .then(function () {
      // Inserts seed entries
      return knex('User').insert([
				{
					id: 1,
					email: "martin@gmail.com",
					username: "martinnord",
					firstname: "Martin",
					lastname: "Nordström",
					password: "test123"
				},
				{
					id: 2,
					email: "kalle@gmail.com",
        	username: "kallenord",
        	firstname: "Kalle",
					lastname: "Pellesson",
       		password: "test1234"
				}
		])
  })
}

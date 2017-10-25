const express = require('express')
const middlewares = require('./config/middlewares')
const constants = require('./config/constants')
const routes = require('./routes')

// Init express
const app = express()

// express middleware
middlewares(app)

app.use('/api', routes)

app.listen(constants.PORT, err => {
  if (err) {
    console.log('Cannot run')
  } else {
    console.log(`
      Good to go 😄
      App listening on: ${constants.PORT}
      Env: ${process.env.NODE_ENV} 💫
    `)
  }
})

module.exports = app

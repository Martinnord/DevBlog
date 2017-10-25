const mongoose = require('mongoose')
const constants = require('./constants.js')

// Remove the warning
mongoose.Promise = global.Promise

// Connect to the db
try {
  mongoose.connect(constants.MONGO_URL, { useMongoClient: true })
} catch (err) {
  mongoose.createConnections(constants.MONGO_URL, { useMongoClient: true })
}

module.exports = mongoose.connection

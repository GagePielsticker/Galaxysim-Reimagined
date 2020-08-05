const MongoClient = require('mongodb').MongoClient
const logger = require('../library/logger.js')

module.exports = client => {
  client.connectDb = () => {
    const { host, port, database, username, password } = client.settings.mongo
    MongoClient.connect(`mongodb://${username ? `${username}:${password}@` : ''}${host}:${port}`, { useNewUrlParser: true }, async (err, data) => {
      if (err) {
        logger.error(`Mongo Error: ${err}`)
        process.exit(1)
      }
      client.database = data.db(database)
      logger.success('MongoDB Connected')
    })
  }
}

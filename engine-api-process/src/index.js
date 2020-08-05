// Dependencies
const express = require('express')
const http = require('http')
const logger = require('./library/logger.js')
const client = {
  game: {}
}

// Check environment for settings
if (process.argv.includes('-d')) {
  client.settings = require('./settings/dev_env_settings.json')
} else {
  client.settings = require('./settings/prod_env_settings.json')
}
client.settings.game = require('./settings/game_settings.json')

// view engine setup
const app = express()

// middleware setup
app.set('port', client.settings.api.port)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use((req, res, next) => {
  if (req.headers.key !== client.settings.api.key) return res.json({ error: 'Invalid auth token.' })
  next()
})

// Get our libs
require('./library/mongodb.js')(client)
require('./library/game-engine.js')(client)

// connect our database
client.connectDb()

// our routes
app.use('/', require('./routes/index'))
app.use('/api/users', require('./routes/users')(client))

// rest server creation and listen
const server = http.createServer(app)

server.listen(client.settings.api.port, () => {
  logger.status(`Server listening on port ${client.settings.api.port} with authkey: ${client.settings.api.key}`)
})

server.on('error', err => {
  logger.error(`HTTP server error: ${err}`)
  process.exit(1)
})

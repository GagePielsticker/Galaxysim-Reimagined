// Dependencies
const express = require('express')
const logger = require('morgan')
const client = {
  settings: require('./settings/settings.json')
}

// Check environment
if (process.argv.includes('-d')) {
    //testing environment
}

// view engine setup
const app = express()

// middleware setup
app.use(logger('common'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use((req, res, next) => {
  if (req.headers.key !== client.settings.api.key) return res.json({ error: 'Invalid auth token.' })
  next()
})

// our routes
app.use('/', require('./routes/index'))
app.use('/api/users', require('./routes/users')(client))

module.exports = app
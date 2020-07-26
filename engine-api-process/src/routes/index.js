const express = require('express')
const router = express.Router()

/**
 * Handles Index routing
 */
router.get('/', (req, res, next) => {
  res.send('api online.')
})

module.exports = router
/**
 * Dependencies
 */
const express = require('express')
const router = express.Router()

module.exports = client => {
  /**
   * Gets information on a user
   */
  router.get('/:user', async (req, res) => {
    client.game.getUser(req.params.user)
      .then(r => res.json(r))
      .catch(e => res.json({ error: e }))
  })

  return router
}
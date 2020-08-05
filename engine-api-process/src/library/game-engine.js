const logger = require('../library/logger.js')

module.exports = client => {
  // QoL
  const game = client.game
  const settings = require('../settings/game_settings.json')

  /**
   * Checks to see if user exist in database
   * @param {String<Discord ID>} uid Discord user id
   * @returns {Boolean}
   */
  game.doesUserExist = async uid => {
    const entry = await client.database.collection('users').findOne({ uid: uid })
    if (!entry) return false
    return true
  }

  /**
   * Creates a game account for a specific user
   * @param {String<Discord ID>} uid Discord user id
   * @param {String<Faction Name>} faction Valid faction to join
   * @returns {Promise<Object>} The user object
   */
  game.createUser = (uid, faction) => {
    return new Promise((resolve, reject) => {
      if (game.doesUserExist(uid)) return reject(new Error('User already has an account in the database.'))

      const factionEntry = settings.filter(e => e.name === faction.toLowerCase())[0]
      if (!factionEntry) return reject(new Error('Faction does not exist.'))

      logger.success(`Created user account ${uid}.`)

      return client.database.collection('users').insertOne({
        uid: uid,
        faction: factionEntry.name,
        credits: 0,
        createAt: Date.now() / 1000
      })
    })
  }
}

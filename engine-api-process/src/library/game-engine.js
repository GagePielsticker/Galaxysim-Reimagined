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
   * Checks to see if tile exist in database
   * @param {Integer} xPos x position
   * @param {Integer} yPos y position
   * @returns {Boolean}
   */
  game.doesTileExist = async (xPos, yPos) => {
    const entry = await client.database.collection('map').findOne({ 'pos.x': xPos, 'pos.y': yPos })
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

      let alphaTester = false
      if (settings.alpha_testers.includes(uid)) alphaTester = true

      const x = Math.floor(Math.random() * (factionEntry.spawn.x.max - factionEntry.spawn.x.min) + factionEntry.spawn.x.min)
      const y = Math.floor(Math.random() * (factionEntry.spawn.y.max - factionEntry.spawn.y.min) + factionEntry.spawn.y.min)

      logger.success(`Created user account ${uid}.`)

      return client.database.collection('users').insertOne({
        uid: uid,
        faction: factionEntry.name,
        alliance: '',
        alphaTester: alphaTester,
        betaTester: true,
        bounty: 0,
        credits: 0,
        pos: { x, y },
        respawn: { x, y },
        kills: [],
        deaths: [],
        assets: [],
        titles: [],
        currentShip: {},
        createAt: Date.now() / 1000
      })
    })
  }

  /**
   * Generate a map tile in the database
   * @param {Integer} xPos x position
   * @param {Integer} yPos y position
   */
  game.createTile = (xPos, yPos) => {
    return new Promise(async (resolve, reject) => {
      if (game.doesTileExist(xPos, yPos)) return reject(new Error('Tile already has an account in the database.'))

      // randomly generate planets

      // randomly generate stations

      // randomly generate asteroids

      // randomly generate anomalies

      return client.database.collection('map').insertOne({
        pos: {
          x: xPos,
          y: yPos
        },
        anomalies: [],
        planets: [],
        asteroids: [],
        stations: [],
        createAt: Date.now() / 1000
      })
    })
  }
}

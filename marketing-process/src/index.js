/* Import Dependencies */
const Discord = require('discord.js')
const client = new Discord.Client()
const DBL = require('top.gg')
const settings = require('./settings.json')
const MongoClient = require('mongodb').MongoClient

/* Setup Dependencies */
let dbl

try {
  dbl = new DBL(settings.topgg_token, { webhookPort: settings.webhook_port, webhookAuth: settings.webhook_auth })
} catch (e) {
  console.log(new Error(`Error connecting to DBL! : ${e}`))
  process.exit(1)
}

client.login(settings.bot_token)
  .catch(e => {
    console.log(new Error(`Error connecting to Discord! : ${e}`))
    process.exit(1)
  })

const db = settings.mongodb // QoL
let database

MongoClient.connect(`mongodb://${db.username ? `${db.username}:${db.password}@` : ''}${db.host}:${db.port}`, (err, data) => {
  if (err) {
    console.log(new Error(`Error connecting to database! : ${err}`))
    process.exit(1)
  }
  database = data.db(db.database)
  console.log('Connected MongoDB')
})

/* Posting Interval Setup */
function startPosting () {
  setInterval(() => dbl.postStats(client.guilds.cache.size), settings.post_interval)
}

/* Handle events */
client.on('ready', () => {
  console.log('Client has entered ready state.')
  startPosting()
})

dbl.webhook.on('ready', hook => {
  console.log(`Webhook Started at http://${hook.hostname}:${hook.port}${hook.path}`)
})

dbl.webhook.on('vote', async vote => {
  const userEntry = await database.collection(db.collection).findOne({ uid: vote.user })
  if (!userEntry) {
    await database.collection(db.collection).insertOne({
      uid: vote.user,
      votes: [+new Date()]
    })
  } else {
    await database.collection(db.collection).UpdateOne({ uid: vote.user }, {
      $push: {
        votes: +new Date()
      }
    })
  }
  console.log(`User with ID ${vote.user} just voted!`)
})

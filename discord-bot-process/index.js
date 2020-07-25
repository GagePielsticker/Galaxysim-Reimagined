process.title = 'Galaxysim | Cluster Manager'

const { isMaster } = require('cluster');
const { Fleet } = require('eris-fleet');
const path = require('path');
const settings = require('./src/settings');


if (global.dev && isMaster) console.log('Running in development mode.')

const options = {
    path: path.join(__dirname, '/src/Galaxysim.js'),
    token: settings.bot.token,
    clusters: settings.bot.clusters,
    clientOptions: {
        compress: true,
        disableEveryone: true,
        disableEvents: ['GUILD_ROLE_CREATE', 'GUILD_ROLE_UPDATE', 'GUILD_ROLE_DELETE', 'CHANNEL_CREATE', 'CHANNEL_UPDATE', 'CHANNEL_PINS_UPDATE', 'MESSAGE_UPDATE', 'MESSAGE_DELETE', 'MESSAGE_DELETE_BULK'],
        messageLimit: 25,
        largeThreshold: 50,
        defaultImageFormat: 'png',
        intents: 513
    },
    statsInterval: 30000,
    whatToLog: {
        whitelist: ['admiral_start', 'cluster_start', 'cluster_ready', 'shard_connect', 'shard_ready', 'shard_disconnect', 'shard_resume', 'cluster_restart', 'cluster_shutdown', 'total_shutdown', 'all_clusters_launched']
    }

}

const admiral = new Fleet(options);

if (isMaster) {
    //admiral.on('other', m => console.log(m));
    admiral.on('debug', m => console.debug(m));
    admiral.on('warn', m => console.warn(m));
    admiral.on('error', m => console.error(m));
    //admiral.on('cluster_message', console.log)
   
    admiral.on('all', console.log)

    //admiral.on('admiral_start', sendToBotLogs)
    //admiral.on('cluster_start', sendToBotLogs)
    //admiral.on('cluster_ready', sendToBotLogs)
    //admiral.on('shard_connect', sendToBotLogs)
    //admiral.on('shard_disconnect', sendToBotLogs)
    //admiral.on('shard_resume', sendToBotLogs)
    //admiral.on('cluster_restart', sendToBotLogs)
    //admiral.on('cluster_shutdown', sendToBotLogs)
    //admiral.on('total_shutdown', sendToBotLogs)
    //admiral.on('all_clusters_launched', sendToBotLogs)
    //admiral.on('shard_starting', sendToBotLogs)
}
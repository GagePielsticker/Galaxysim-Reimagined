global.dev = (process.argv.includes('-d') || process.argv.includes('--dev'))
global.allowDiscordLogging = (!process.argv.includes('-nl') && !process.argv.includes('--noLog'));

let stable = require('./instances/stable');
let testing = require('./instances/dev');



module.exports = (!dev ? stable : testing);


// External Modules
const { BaseClusterWorker } = require('eris-fleet');
const fs = require('fs');
const path = require('path');

// Internal Modules
const Collection = require('./extensions/Collection');
const API = require('./extensions/API.js');
const IPCManager = require('./extensions/IPC');


//Settings
const settings = require('./settings');


class Galaxysim extends BaseClusterWorker {
    constructor(setup) {
        super(setup);

        process.title = `Galaxysim | Cluster ${this.clusterID}`

        this.commands = new Collection();
        this.settings = settings

        this.api = new API(this)
        this.ipc.manager = new IPCManager(this, this.settings.bot.clusters)

        this.launch()
    }

    async launch() {

        fs.readdirSync(path.join(__dirname, `/commands`), { withFileTypes: true })
            .filter(file => !file.isFile())
            .forEach(folder => {
                fs.readdirSync(path.join(__dirname, `/commands/${folder.name}`), { withFileTypes: true })
                    .filter(file => file.isFile())
                    .forEach(async (file) => {
                        try {
                            const Command = require(`./commands/${folder.name}/${file.name}`);
                            const command = new Command(this);

                            this.commands.set(command.name, command)
                        } catch (e) {
                            console.log(e)
                        }
                    })
            })

            fs.readdirSync(path.join(__dirname, `/events/`), { withFileTypes: true })
            .filter((file) => file.isFile())
            .forEach(file => {
                try {
                    const Event = require(`./events/${file.name}`);
                    const event = new Event(this);

                    this.bot.on(file.name.replace('.js', ''), (...args) => event.run(...args))
                } catch (e) {
                    console.log(e)
                }
            })

    }
}

module.exports = Galaxysim
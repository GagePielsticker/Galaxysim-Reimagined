const fetch = require('node-fetch')
class API {
    constructor(self) {
        this.self = self
        this.settings = self.settings.api

        this.prepend = `http://${this.settings.host}:${this.settings.port}/`
    }

    _post(route, data) {
        
    }

    getGuildPrefix(guildID) {

    }
}

module.exports = API
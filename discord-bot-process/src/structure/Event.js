const Embed = require('../extensions/Embed');

module.exports = class Event {
    constructor(self) {
        Object.keys(self).map(key => this[key] = self[key])

        this.Embed = Embed
    }
}

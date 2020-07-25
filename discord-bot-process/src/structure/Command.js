const Embed = require('../extensions/Embed');
module.exports = class Command {
    constructor(self, info) {
        Object.keys(self).map(key => this[key] = self[key])

        if(!info.name) throw new Error('Name is required')
        this.name = info.name
        this.aliases = info.aliases || null
        this.description = info.description || null

        if (!info.opts) {
            this.devOnly = false
            this.requirePermission = null
            this.category = 'general'
        } else {
            this.devOnly = info.opts.devOnly || false
            this.requirePermission = info.opts.requirePermission || null
            this.category = info.opts.category || 'general'
        }

        this.Embed = Embed
    }
}
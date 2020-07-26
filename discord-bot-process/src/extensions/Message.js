const Embed = require('../extensions/Embed');

class Message {
    constructor(message) {
        Object.keys(message).map(key => this[key] = message[key])
    }

    error(reason) {
        let embed = new Embed()
            .setDescription(reason)
            .setColor('RED')
            .setTitle(':x: Error')
            .build();
        
        this.channel.createMessage(embed)
    }
}

module.exports = Message
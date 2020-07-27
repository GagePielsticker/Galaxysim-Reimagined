const Embed = require('../extensions/Embed');

class Message {
    constructor(message) {
        Object.keys(message).map(key => this[key] = message[key])
    }

    /**
     * 
     * @param {String} reason Reason for error
     */
    error(reason) {
        let embed = new Embed()
            .setDescription(reason)
            .setColor('RED')
            .setTitle(':x: Error')
            .build();
        
        this.channel.createMessage(embed)
    }

    success(response) {
        let embed = new Embed()
            .setDescription(response)
            .setColor('GREEN')
            .setTitle(':white_check_mark: Success')
            .build();
        
        this.channel.createMessage(embed)
    }

}

module.exports = Message
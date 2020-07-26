const Event = require('../structure/Event');
const Message = require('../extensions/Message');


const commandHandler = require('../extensions/conmmandHandler');


class MessageCreate extends Event{
    constructor(self) {
        super(self)
    }

    run(msg) {
        const message = new Message(msg) //! REQUIRED

        if (message.author.bot || !message.channel.guild) return
        
        if (message.channel.id != 734886474549297183) return

        let guildDB = null
        let args = message.content.split(' ')
        commandHandler(this, message, args, guildDB)
    }
}

module.exports = MessageCreate
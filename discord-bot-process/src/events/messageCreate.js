const Event = require('../structure/Event');
const Message = require('../extensions/Message');


class MessageCreate extends Event{
    constructor(self) {
        super(self)
    }

    run(msg) {
        const message = new Message(msg) //! REQUIRED

        if (message.author.bot) return
        
        let embed = new this.Embed()
            .setDescription('Uber is a **MEGA** cute boy')
            .setTimestamp()
            .build()
        
        
        if (message.channel.id == 679495746445508619) message.channel.createMessage(embed)
    }
}

module.exports = MessageCreate
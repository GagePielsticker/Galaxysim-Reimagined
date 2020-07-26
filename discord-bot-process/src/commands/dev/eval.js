const Command = require('../../structure/Command');

class Eval extends Command {
    constructor(self) {
        let details = {
            name: "eval",
            aliases: ['e'],
            description: 'Fancy developer stuff',
            opts: {
                devOnly: true,
                requirePermission: null,
                category: 'dev'
            }
        }
        super(self, details)
    }

    run(message, args) {
        message.channel.createMessage('Insert eval repose for `' + args.join(' ') + '` here')
    }
    
}

module.exports = Eval;
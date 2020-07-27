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
        let code = args.join(' ')

        if (!code) return message.error('No eval provided')
        
        
        try {
            let evaled = eval(code)
            return message.success('```' + evaled + '```')
        } catch (e) {
            return message.error('```' + e + '```')
        }
    }
    
}

module.exports = Eval;
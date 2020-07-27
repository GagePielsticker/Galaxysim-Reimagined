/**
 * get static prefix `client.settings.bot.prefix`
 * 
 * allows for (mentions & (static | guildPrefix))
 * 
 * should also allow a space after the prefix but isnt required
 * 
 * https://regex101.com
 */


function commandHandler(client, message, guildDB) {

  if(guildDB == null) guildDB = {}

  let prefix = guildDB.prefix || client.settings.bot.prefix;

  let prefixRegex = new RegExp(`^(<@!?${client.bot.user.id}>|${prefix})\\s?[^ ]`, 'i');
  
  if (!prefixRegex.test(message.content)) return;
  
  let [, matchedPrefix] = message.content.match(prefixRegex);
  let args = message.content.slice(matchedPrefix.length).trim().split(/ +/);

  let cmd = args.shift().toLowerCase();
  let command = client.commands.find('name', cmd) || client.commands.filter((c) => c.aliases && c.aliases.includes(cmd))[0];
  
    if (!command) return;
    
    let owners = client.settings.bot.developers;
    
    if(command.devOnly && !owners.includes(message.author.id)) return;
    
    if (command.requirePermission && !message.member.permission.has(command.requirePermission)) return message.error(`You require ${command.requirePermission} permission(s) to use this command`);
  
    try {
      command.run(message, args);
    } catch (e) {
      return message.error(`Failed to run command: \`${e}\``);
    }
    
}

module.exports = commandHandlerWW
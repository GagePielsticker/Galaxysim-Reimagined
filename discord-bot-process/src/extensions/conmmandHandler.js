function commandHandler(client, message) {
    let args = message.content.split(' ')
    args.shift();
    let cmd = args.shift().toLowerCase();
    let command = client.commands.find((c) => c.name == cmd || c.aliases && c.aliases.includes(cmd));

    if (!command) return;
    
    let owners = client.settings.developers;
    
    if(command.devOnly && !owners.has(message.author.id)) return;
    
    if (!command.requirePermission && !message.member.hasPermission(command.requirePermission)) return message.error(`You require ${command.requirePermission} permission(s) to use this command`);
  

    try {
      command.run(message, args);
    } catch (e) {
      return message.error(`Failed to run command: \`${error}\``)
    }
    

}

module.exports = commandHandler
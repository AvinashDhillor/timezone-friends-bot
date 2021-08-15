const prefix = "tz";

module.exports = {
  name: "messageCreate",
  execute(message, client) {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command =
      client.commands.get(commandName) ||
      client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );

    if (!command) return;

    if (command.args && !args.length) {
      let reply = `You didn't provide any arguments, ${message.author}!\n`;

      if (command.usage) {
        reply += `The proper usage would be: \`${prefix}${command.name} ${command.usage}\`\n`;
      }

      if (command.available) {
        reply += `Available args:\n`;
        reply += `\`\`\``;
        command.available.forEach((word) => {
          reply += `${prefix}${command.name} ${word}\n`;
        });
        reply += `\`\`\``;
      }

      return message.channel.send(reply);
    }

    try {
      command.execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply("there was an error trying to execute that command!");
    }
  },
};

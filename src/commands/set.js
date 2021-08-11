const { MessageActionRow, MessageSelectMenu } = require("discord.js");

module.exports = {
  name: "set",
  description: "set your timezone or set someones timezone",
  usage: "<timezone> or <@user>",
  execute(message, args) {
    const { mentions } = message;

    // if (!mentions.users.size) {
    //   return message.channel.send(this.usage);
    // }

    const row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId("select")
        .setPlaceholder("Nothing selected")
        .addOptions([
          {
            label: "Select me",
            description: "This is a description",
            value: "first_option",
          },
          {
            label: "You can select me too",
            description: "This is also a description",
            value: "second_option",
          },
        ])
    );

    message.reply({ content: "Pong!", components: [row] });
  },
};

const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h", "?"],
  description: "Shows this help message",
  usage: "help [command]",
  async execute(message) {
    let result = "";
    result += `\`tz set [optional @mention]\` - Set our timezone or mentioned user.`;
    result += "\n";
    result += `\`tz get [optional @mention...]\` - Can view our current time or mention users time(upto 7)`;
    result += "\n";
    result += `\`tz diff @one @two\` - See time difference of two person `;
    result += "\n";
    result += `\`tz now\` - View time of location mentioned in list`;

    const exampleEmbed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Timezone Friends Guide")
      .setDescription(result)
      .setTimestamp();

    message.channel.send({ embeds: [exampleEmbed] });
  },
};

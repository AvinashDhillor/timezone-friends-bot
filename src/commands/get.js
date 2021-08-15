const moment = require("moment-timezone");

const User = require("../models/User");

const { table, getBorderCharacters } = require("table");

const config = {
  border: getBorderCharacters("norc"),
  columnDefault: {
    width: 15,
  },
  columns: [
    { alignment: "center", verticalAlignment: "middle" },
    { alignment: "center", verticalAlignment: "bottom" },
  ],
  header: {
    alignment: "center",
    content: "Timezone",
  },
};

module.exports = {
  name: "get",
  description: "Get the mentioned user's current time",
  usage: "tz get [optional @first_mention @second_mention...]",
  async execute(message) {
    const { guild, mentions } = message;

    let users = [];
    if (mentions.users.size > 7) {
      return message.channel.send(`It support only 7 tags at max`);
    }
    if (mentions.users.size === 0) {
      users.push(message.author);
    } else {
      users = mentions.users.map((user) => user);
    }
    let result = [["Name", "Time"]];
    await Promise.all(
      users.map(async (user) => {
        let displayName = "";
        try {
          let { nickname } = await guild.members.fetch(user.id);
          displayName = nickname;

          let data = await User.findByServerAndUserId(message.guildId, user.id);

          let tmpData = [
            `${displayName ? displayName : user.username}\n${moment()
              .tz(data.timezone)
              .format("MM/DD/YY")}`,
            `${moment().tz(data.timezone).format("hh:mm A")}`,
          ];
          result.push(tmpData);
        } catch (e) {
          let tmpData = [
            `${displayName ? displayName : user.username}`,
            `Not set `,
          ];
          result.push(tmpData);
        }
      })
    );
    return message.channel.send(`\`\`\`prolog\n${table(result, config)}\`\`\``);
  },
};

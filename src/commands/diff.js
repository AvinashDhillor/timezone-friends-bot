const moment = require("moment-timezone");

const User = require("../models/User");

module.exports = {
  name: "diff",
  description: "show time difference in hours:seconds with mentioned user",
  usage: "tz diff @first_mention @second_mention",
  async execute(message) {
    const { mentions } = message;

    if (!mentions.users.size) {
      return message.channel.send(this.usage);
    }

    if (mentions.users.size > 2) {
      return message.reply("❌ Please tag 2 users");
    }

    const userIds = mentions.users.map((user) => user.id);
    const userName = mentions.users.map((user) => user.username);

    let data1 = User.findByServerAndUserId(message.guildId, userIds[0]);
    let data2 = User.findByServerAndUserId(message.guildId, userIds[1]);
    Promise.all([data1, data2])
      .then((values) => {
        let time1 = moment().tz(values[0].timezone).utcOffset();
        let time2 = moment().tz(values[1].timezone).utcOffset();
        var time = (time1 - time2) / 60;
        let messageString = "";
        if (time < 0) {
          messageString = `${userName[0]} is ${time * -1} hours behind of ${
            userName[1]
          }`;
        } else {
          messageString = `${userName[0]} is ${time} hours ahead of ${userName[1]}`;
        }
        return message.channel.send(messageString);
      })
      .catch((e) => {
        console.log(e);
        return message.reply("Please set timezone for both user first 😭");
      });
  },
};

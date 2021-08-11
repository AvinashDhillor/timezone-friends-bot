const db = require("../data.json");
const moment = require("moment-timezone");

const User = require("../models/User");

module.exports = {
  name: "get",
  description: "Get the mentioned user's current time",
  usage: "<@user>",
  async execute(message) {
    const { guild, mentions } = message;

    if (!mentions.users.size) {
      return message.channel.send(this.usage);
    }

    const user = mentions.users.first();

    // let requiredObj = db.find((obj) => {
    //   return obj.userId === user.id;
    // });

    User.findByServerAndUserId(guild.id, user.id)
      .then((data) => {
        message.channel.send(
          `${user.username}'s current time is ${moment()
            .tz(data.timezone)
            .format("hh:mm A")}`
        );
      })
      .catch((err) => {
        message.channel.send(
          `The timezone for ${user.username} is not set`
        );
      });

    // if (requiredObj) {
    //   message.channel.send(
    //     `${user.username}'s current time is ${moment()
    //       .tz(requiredObj.timezone)
    //       .format("HH:mm")}`
    //   );
    // } else {
    //   message.channel.send("time zone is not set");
    // }
  },
};

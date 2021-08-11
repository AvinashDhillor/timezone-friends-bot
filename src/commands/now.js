const moment = require("moment-timezone");

let timezone = new Set(moment.tz.names().map((data) => data.toLowerCase()));

module.exports = {
  name: "now",
  description: "get the current time of <timezone>",
  usage: "<timezone>",
  execute(message, args) {
    if (!args.length) {
      return message.channel.send("Please specify a timezone");
    }

    if (!timezone.has(args[0].toLowerCase())) {
      return message.channel.send("No data for that timezone");
    }

    const time = moment().tz(args[0]).format("MM/DD/YY | HH:mm");
    return message.channel.send(time);
  },
};

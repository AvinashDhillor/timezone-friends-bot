module.exports = {
  name: "diff",
  description: "show time difference in hours:seconds with mentioned user",
  usage: "<@user>",
  execute(message) {
    // TODO
    const { mentions } = message;

    if (!mentions.users.size) {
      return message.channel.send(this.usage);
    }

    message.reply("TODO");
  },
};

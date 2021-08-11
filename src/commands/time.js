module.exports = {
  name: "ping",
  description: "Replies with pong!",
  async execute(interaction) {
    console.log(DB.getTimezone("s"));
    await interaction.reply("ping");
  },
};

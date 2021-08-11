module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    if (!client.application?.owner) await client.application?.fetch();
    if (
      message.content.toLowerCase() === "!deploy" &&
      message.author.id === client.application?.owner.id
    ) {
      // creating 1 slash command (working)
      const data = {
        name: "ping",
        description: "Replies with pong!",
      };

      // 2 or more (not working anymore t__T need the new discordjs.guide)
      // const data = [
      //   {
      //     name: "ping",
      //     description: "Replies with pong!",
      //   },
      //   {
      //     name: "echo",
      //     description: "echo test",
      //   },
      // ];

      // deploy global
      // const command = await client.application?.commands.create(data);

      // for testing
      const command = await client.guilds.cache
        .get("757590934828613662")
        ?.commands.create(data);

      console.log(command);
    }
  },
};

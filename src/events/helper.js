module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    // if (!client.application?.owner) await client.application?.fetch();

    // const data = {
    //   name: "time",
    //   description: "TODO: Description for /time",
    // };

    // const command = await client.guilds.cache
    //   .get("757590934828613662")
    //   ?.commands.create(data);

    if (message.content.toLowerCase() === "!zai") {
      // creating 1 slash command (working)
      const data = {
        name: "timezone",
        description: "timezone friends",
        choices: [
          {
            name: "get",
            value: "get",
            description: "get the user current time",
            type: "USER",
            require: true,
          },
          {
            name: "diff",
            value: "diff",
            description: "show time difference with this user",
            type: "USER",
            require: true,
          },
          {
            name: "set",
            value: "set",
            description: "set your timezone",
            type: "STRING",
            require: true,
          },
        ],
      };

      // const data = {
      //   name: "timezone",
      //   description: "command for timezone bot",
      //   options: [
      //     {
      //       name: "command",
      //       type: "STRING",
      //       description: "Pick a command",
      //       required: true,
      //       choices: [
      //         {
      //           name: "set",
      //           value: "set_timezone",
      //           type: "STRING",
      //           description: "set your timezone",
      //         },
      //         {
      //           name: "diff",
      //           value: "diff_user",
      //           type: "USER",
      //           description: "show time difference with this user",
      //         },
      //         {
      //           name: "get",
      //           value: "get_timezone",
      //           type: "USER",
      //           description: "get the user current time",
      //         },
      //       ],
      //     },
      //   ],
      // };

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
    }
  },
};

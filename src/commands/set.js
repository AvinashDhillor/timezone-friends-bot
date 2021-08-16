const { MessageActionRow, MessageButton } = require("discord.js");

const moment = require("moment-timezone");

// User defined
const MyMessageEmbed = require("../util/MyMessageEmbed");
const User = require("../models/User");

const timezoneArray = moment.tz.names();

module.exports = {
  name: "set",
  description: "set your timezone or set someones timezone",
  usage: "tz set [optional @mention]",
  async execute(message) {
    const myMessageEmbed = new MyMessageEmbed();
    const { mentions } = message;

    const author_id = message.author.id;
    if (mentions.users.length > 1)
      return message.reply("Please tag one user or none");

    //------ Object to store in DB -----
    const data = {
      userId: mentions.users.first()
        ? mentions.users.first().id
        : message.author.id,
      serverId: message.guildId,
      timezone: "",
    };

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("first")
        .setLabel("⏮")
        .setStyle("PRIMARY"),
      new MessageButton().setCustomId("prev").setLabel("←").setStyle("SUCCESS"),
      new MessageButton().setCustomId("next").setLabel("→").setStyle("SUCCESS"),
      new MessageButton().setCustomId("last").setLabel("⏭").setStyle("PRIMARY")
    );

    message.channel
      .send({ embeds: [myMessageEmbed.nextEmbed()], components: [row] })
      .then(async () => {
        // ---------- Buttons -------------

        const navigationFilter = (i) =>
          (i.customId === "next" ||
            i.customId === "prev" ||
            i.customId === "first" ||
            i.customId === "last") &&
          author_id === i.user.id;

        const collector = message.channel.createMessageComponentCollector({
          filter: navigationFilter,
          time: 120000,
        });

        collector.on("collect", async (i) => {
          try {
            if (i.customId === "next") {
              await i.deferUpdate();

              await i.editReply({
                embeds: [myMessageEmbed.nextEmbed()],
              });
            } else if (i.customId === "prev") {
              await i.deferUpdate();

              await i.editReply({
                embeds: [myMessageEmbed.prevEmbed()],
              });
            } else if (i.customId === "first") {
              await i.deferUpdate();

              await i.editReply({
                embeds: [myMessageEmbed.firstEmbed()],
              });
            } else if (i.customId === "last") {
              await i.deferUpdate();

              await i.editReply({
                embeds: [myMessageEmbed.lastEmbed()],
              });
            }
          } catch (e) {
            console.log(e);
          }
        });

        collector.on("end", (collected) =>
          console.log(`Collected ${collected.size} items`)
        );

        // --------- Message Response -----------

        const messageFilter = (m) => {
          return author_id === m.author.id;
        };

        const messageCollector = message.channel.createMessageCollector({
          filter: messageFilter,
          max: 1,
          time: 120000,
        });

        messageCollector.on("collect", (m) => {
          try {
            let inputNumber = m.content;
            try {
              if (
                !Number.isInteger(parseInt(inputNumber)) ||
                inputNumber >= timezoneArray.length ||
                inputNumber <= 0
              ) {
                return m.reply(`❌ Invalid Input`);
              }
            } catch (e) {
              console.log(e);
              return m.reply(`❌ Invalid Input`);
            }

            data.timezone = timezoneArray[inputNumber - 1];

            User.insertOrUpdate(data.serverId, data.userId, data.timezone)
              .then((user_added) => {
                return message.channel.send(
                  `${user_added.timezone} is saved for <@${user_added.userId}>`
                );
              })
              .catch((e) => console.log(e));
          } catch (e) {
            console.log(e);
            m.reply("❌ Error");
          }
        });

        messageCollector.on("end", (collected) => {
          console.log(`Collected ${collected.size} items`);
        });
      });
  },
};

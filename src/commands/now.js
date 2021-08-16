const moment = require("moment-timezone");
const wait = require("util").promisify(setTimeout);
const { MessageActionRow, MessageButton } = require("discord.js");

const MyMessageEmbed = require("../util/MyMessageEmbed");
const timezoneArray = moment.tz.names();

module.exports = {
  name: "now",
  description: "get the current time of <timezone>",
  usage: "<timezone>",
  execute(message, args) {
    const myMessageEmbed = new MyMessageEmbed();
    const author_id = message.author.id;

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
      .then(() => {
        // ---------- Buttons -------------

        const messageComponentFilter = (i) => {
          return (
            (i.customId === "next" ||
              i.customId === "prev" ||
              i.customId === "first" ||
              i.customId === "last") &&
            i.user.id === author_id
          );
        };

        const collector = message.channel.createMessageComponentCollector({
          filter: messageComponentFilter,
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

        // --------- Response -----------
        const messageFilter = (m) => {
          let inputNumber = m.content;
          return (
            author_id === m.author.id &&
            Number.isInteger(parseInt(inputNumber)) &&
            inputNumber <= timezoneArray.length &&
            inputNumber >= 1
          );
        };

        const messageCollector = message.channel.createMessageCollector({
          filter: messageFilter,
          max: 1,
          time: 120000,
        });

        messageCollector.on("collect", (m) => {
          try {
            let inputNumber = m.content;
            const date = moment()
              .tz(timezoneArray[inputNumber - 1])
              .format("Do-MMMM-YYYY");
            const time = moment()
              .tz(timezoneArray[inputNumber - 1])
              .format("hh:mm A");
            return message.channel.send(
              `**${timezoneArray[inputNumber - 1]}**\n📆 ${date}  ⏲ ${time}`
            );
          } catch (e) {
            console.log(e);
            message.channel.send("❌ Error");
          }
        });

        messageCollector.on("end", (collected) => {
          console.log(`Collected ${collected.size} items`);
        });
      });
  },
};

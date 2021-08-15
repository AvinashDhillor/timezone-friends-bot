const moment = require("moment-timezone");
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

        const filter = (i) =>
          (i.customId === "next" ||
            i.customId === "prev" ||
            i.customId === "first" ||
            i.customId === "last") &&
          author_id === i.author.id;

        const collector = message.channel.createMessageComponentCollector({
          filter,
          time: 200000,
        });

        collector.on("collect", async (i) => {
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
        });

        collector.on("end", (collected) =>
          console.log(`Collected ${collected.size} items`)
        );

        // --------- Response -----------
        let filter1 = (m) => {
          return m.author.id === message.author.id;
        };

        message.channel
          .awaitMessages({ filter1, max: 1, time: 200000, errors: ["time"] })
          .then((collected) => {
            let inputNumber = collected.first().content;
            if (
              !Number.isInteger(parseInt(inputNumber)) ||
              inputNumber > timezoneArray.length
            ) {
              return message.channel.send("❌ please enter valid input");
            }
            const date = moment()
              .tz(timezoneArray[inputNumber - 1])
              .format("Do-MMMM-YYYY");
            const time = moment()
              .tz(timezoneArray[inputNumber - 1])
              .format("hh:mm A");
            return message.channel.send(
              `**${timezoneArray[inputNumber - 1]}**\n📆 ${date}  ⏲ ${time}`
            );
          })
          .catch((collected) => {
            console.log(collected);
            message.channel.send("❌ Error");
          });
      });
  },
};

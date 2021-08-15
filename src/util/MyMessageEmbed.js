const moment = require("moment-timezone");

const arraysdata = moment.tz
  .names()
  .map(
    (data, key) => `${key + 1}. (GMT${moment.tz(data).format("Z")})  ${data}`
  );

class MyMessageEmbed {
  allEmbeds = [];

  constructor() {
    this.current = -1;
    let tmpdata = [],
      listNumber = 0;

    for (let i = 0; i < arraysdata.length; i += 20) {
      tmpdata.push({
        name: `List ${++listNumber}`,
        value: arraysdata.slice(i, i + 20).join("\n"),
        inline: true,
      });
    }

    for (let i = 0; i < tmpdata.length; i++) {
      let embed = {
        color: 0x0099ff,
        title: "Select from list",
        description: "Select region ",
        fields: [tmpdata[i]],
        footer: { text: "Reply with respective location number." },
      };

      if (this.allEmbeds.length === 0) {
        this.allEmbeds.push(embed);
        continue;
      }

      if (this.allEmbeds[this.allEmbeds.length - 1].fields.length < 1) {
        this.allEmbeds[this.allEmbeds.length - 1].fields.push(tmpdata[i]);
      } else {
        this.allEmbeds.push(embed);
      }
    }
  }

  nextEmbed() {
    this.current++;
    if (this.current >= this.allEmbeds.length) this.current = 0;
    return this.allEmbeds[this.current];
  }

  prevEmbed() {
    this.current--;
    if (this.current < 0) this.current = this.allEmbeds.length - 1;
    return this.allEmbeds[this.current];
  }

  firstEmbed() {
    this.current = 0;
    return this.allEmbeds[this.current];
  }

  lastEmbed() {
    this.current = this.allEmbeds.length - 1;
    return this.allEmbeds[this.current];
  }
}

module.exports = MyMessageEmbed;

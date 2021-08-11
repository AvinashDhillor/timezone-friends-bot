import { Client, Collection, Intents } from "discord.js";
import * as fs from "fs";

const client: any = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// --------------Commands----------------------
client.commands = new Collection();

const commandFiles = fs
    .readdirSync("./commands")
    .filter((file: any) => file.endsWith(".ts"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    console.log("Hello");
    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}

// -----------------Events------------------------
const eventFiles = fs
    .readdirSync("./events")
    .filter((file: string) => file.endsWith(".js"));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, () => event.execute(client));
    } else {
        client.on(event.name, () => event.execute(client));
    }
}

// -----LOGIN-----
// console.log(process.env.TOKEN);
client.login(process.env.TOKEN);

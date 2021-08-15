module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`Ready! Logged in as ${client.user.username}`);
    client.user.setPresence({
      activities: [{ type: "WATCHING", name: "Netflix" }],
    });
  },
};

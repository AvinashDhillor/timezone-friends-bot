module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isSelectMenu()) {
      interaction.reply({ content: `You choose ${interaction.values[0]}` });
    }
    if (!interaction.isCommand()) return;
    if (!client.commands.has(interaction.commandName)) return;

    try {
      await client.commands.get(interaction.commandName).execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  },
};

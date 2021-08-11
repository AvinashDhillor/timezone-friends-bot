module.exports = {
    name: "ready",
    once: true,
    execute(client: any) {
        console.log(`Ready! ${client.user.username}`);
    },
};

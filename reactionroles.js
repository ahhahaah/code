const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "reactionroles",
        description: "Send an embed containing of all the reaction roles in the server",
        usage: "!roles",
        category: "info",
        accessableby: "Members",
        aliases: ["rr"]
    },
    run: async (bot, message, args) => {

        const embed = new MessageEmbed();
        embed.setTitle("Server Roles for FlatteredMc");
        embed.setColor("BLUE");
        message.channel.send(embed);
    }};
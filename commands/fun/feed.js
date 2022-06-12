const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "feed",
    aliases: ["eat"],
    cooldowns: 3000,
    description: "Feed User with (prefix)feed @taghere",
    usage: "chis!feed @name",
    toggleOff: false,
    developersOnly: false,
    userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    botpermissions: ["SEND_MESSAGES"],
    run: async (client, message, args) => {

        var suffix = message.content.split(" ").slice(1).join(" ");
        if (suffix == "" || suffix == null) return message.channel.sendMessage("You are Missing a TAG or Name of USER to **FEEDING**");


        const { url } = await fetch("https://nekos.life/api/v2/img/feed")
            .then((res) => res.json());

        let embed = new MessageEmbed();
        embed.setColor(0x9900FF)
        embed.setTitle("Feed")
        embed.setDescription(`**${suffix}**, you just got fed by **<@${message.author.id}>**`)
        embed.setImage(url);
        embed.setFooter("Requested by " + message.author.username + " | Powered by nekos.life", message.client.user.avatarURL)
        embed.setTimestamp()

        message.channel.send({
            embeds: [embed]
        })

    }
}

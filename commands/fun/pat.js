const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "pat",
    aliases: ["headpats"],
    cooldowns: 3000,
    description: "Head Pat to User by (prefix)pat @tagnamehere",
    usage: "chis!pat @name",
    toggleOff: false,
    developersOnly: false,
    userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    botpermissions: ["SEND_MESSAGES"],
    run: async (client, message, args) => {

        var suffix = message.content.split(" ").slice(1).join(" ");

        if (suffix == "" || suffix == null) return message.channel.sendMessage("You are Missing a TAG or Name of USER to *PAT**");

        const { url } = await fetch("https://nekos.life/api/v2/img/pat")
            .then((res) => res.json());

        let embed = new MessageEmbed();
        embed.setColor(0x9900FF)
        embed.setTitle("Pats")
        embed.setDescription(`**${suffix}**, you just got pats from **<@${message.author.id}>**`)
        embed.setImage(url);
        embed.setFooter("Requested by " + message.author.username + " | Powered by nekos.life", message.client.user.avatarURL)
        embed.setTimestamp()

        message.channel.send({
            embeds: [embed]
        })

    }
}

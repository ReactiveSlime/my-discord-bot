const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "hug",
    aliases: ["hugging"],
    cooldowns: 3000,
    description: "HUGGING User with (prefix)hug @taghere",
    usage: "chis!hug @name",
    toggleOff: false,
    developersOnly: false,
    userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    botpermissions: ["SEND_MESSAGES"],
    run: async (client, message, args) => {

        var suffix = message.content.split(" ").slice(1).join(" ");
        if (suffix == "" || suffix == null) return message.channel.sendMessage("You are Missing a TAG or Name of USER to **HUGGING**");


        const { url } = await fetch("https://nekos.life/api/v2/img/hug")
            .then((res) => res.json());

        let embed = new MessageEmbed();
        embed.setColor(0x9900FF)
        embed.setTitle("Hug")
        embed.setDescription(`**${suffix}**,  you just got hugged by **<@${message.author.id}>**`)
        embed.setImage(url);
        embed.setFooter("Requested by " + message.author.username + " | Powered by nekos.life", message.client.user.avatarURL)
        embed.setTimestamp()

        message.channel.send({
            embeds: [embed]
        })

    }
}

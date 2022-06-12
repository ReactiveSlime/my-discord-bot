const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "chiscat",
    aliases: ["chiskitty"],
    cooldowns: 3000,
    description: "Images of ChisdealHDYT Kitty",
    usage: "chis!neko",
    toggleOff: false,
    developersOnly: false,
    userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    botpermissions: ["SEND_MESSAGES"],
    run: async (client, message, args) => {

        var mes = ["https://cdn.discordapp.com/attachments/502176949410594826/696712580609212497/IMG_20200405_000316494.jpg", "https://cdn.discordapp.com/attachments/502176949410594826/689614629357355022/IMG_20200317_231637821.jpg", "https://cdn.discordapp.com/attachments/502176949410594826/689614628803575860/IMG_20200317_231458888.jpg", "https://cdn.discordapp.com/attachments/502176949410594826/689614628384407625/IMG_20200317_231420738.jpg", "https://cdn.discordapp.com/attachments/502176949410594826/689614627700736002/IMG_20200317_231342809.jpg", "https://cdn.discordapp.com/attachments/502176949410594826/528394519339728906/WP_20181229_01_59_38_Pro.jpg", "https://cdn.discordapp.com/attachments/502176949410594826/664044364343017482/IMG_20200104_001422015.jpg", "https://cdn.discordapp.com/attachments/502176949410594826/664044364992872478/IMG_20200103_010929769.jpg", "https://cdn.discordapp.com/attachments/502176949410594826/664044365567623168/IMG_20191210_235919079.jpg"];


        message.channel.send({
            embeds: [new MessageEmbed()
	
		    .setColor(0x9900FF)
		    .setTitle("RAWR MY KITTY!")
		    .setDescription("***RAWR*** - MY KITTY")
		    .setImage(mes[Math.floor(Math.random() * mes.length)])
		    .setFooter("Sent via " + message.client.user.username, message.client.user.avatarURL)
		    .setTimestamp()
        ]})

    }
}

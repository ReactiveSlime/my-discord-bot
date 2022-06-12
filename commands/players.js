module.exports = {
    name: "player",
    description: "get the players",
    cooldown: 5
};

const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');
var botconfig = require('../config.json');

module.exports.run = async (client, message, args) => {



    if (args[0] == "" || args[0] == null) return 
    fetch(`${botconfig.url}` + `/v1` + `/players`, {
        method: "get",
        headers: { "Content-Type": "application/json", "key": `${botconfig.key}` }
    })
        .then((res) => res.json())
        .then((json) => {
            // embed
            let embed = new MessageEmbed();
            embed.setTitle("Players");
            embed.setColor("#0099ff");
            for (var i = 0; i < json.length; i++) {
                embed.addField(
                    `${json[i].displayName}`,
                    [
                        `**❯ UUID:** ${json[i].uuid}`
                    ].join('\n'),
                )
            }
            message.channel.send({ embeds: [embed] })
        })


    if (args[0] == "uuid") {
        if (uuid == null) {
            fetch('https://api.mojang.com/user/profiles/' + uuid + '/names');
            if (uuid == false) {
                channel.message.send("The UUID provided is invalid.");
                exit;
            } else {
                channel.message.send("The UUID provided is valid.");
                exit;
            }
            exit;
        }



        } else {

            message.reply("You are not in any Voice Channels, make sure you inside voice channel")

        };
    }
















/*
    fetch(`${botconfig.url}` + `/v1` + `/players`, {
        method: "get",
        headers: { "Content-Type": "application/json", "key": `${botconfig.key}` }
    })
        .then((res) => res.json())
        .then((json) => {
            // embed
            let embed = new MessageEmbed();
            embed.setTitle("Players");
            embed.setColor("#0099ff");
            for (var i = 0; i < json.length; i++) {
                embed.addField(
                    `${json[i].displayName}`,
                    [
                        `**❯ UUID:** ${json[i].uuid}`
                    ].join('\n'),
                )
            }
            message.channel.send({ embeds: [embed] })
        })
};
*/



module.exports.help = {
    name: "player",
    description: "get the players",
}

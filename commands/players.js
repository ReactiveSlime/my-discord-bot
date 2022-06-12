module.exports = {
    name: "player",
    description: "get the players",
    cooldown: 5
};

const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');
var botconfig = require('../config.json');

module.exports.run = async (client, message, args) => {

    if (args.length == 0) {


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
    } else {
        fetch(`https://api.mojang.com/user/profiles/${args[0]}/names`, { method: "get", })
            .then((res) => res.json())
            .then((json) => {
                if (json.error == "BadRequestException") {
                    message.channel.send("Invalid UUID")
                } else {
                    fetch(`${botconfig.url}` + `/v1` + `/players/${args[0]}`, {
                        method: "get",
                        headers: { "Content-Type": "application/json", "key": `${botconfig.key}` }
                    })
                        .then((res) => res.json())
                        .then((json) => {
                            //get player xyz from json.location array
                            let x = parseInt(json.location[0]);
                            let y = parseInt(json.location[1]);
                            let z = parseInt(json.location[2]);

                            if (json.dimension == "NORMAL") {var dimension = "Overworld";}
                            else if (json.dimension == "NETHER") {var dimension = "The Nether"; }
                            else if (json.dimension == "END") {var dimension = "The End";}

                            // embed
                            let embed = new MessageEmbed();
                            embed.setTitle(json.displayName);
                            embed.setColor("#0099ff");
                            embed.addField(
                                `**❯ UUID:** ${json.uuid}`,
                                [
                                    `**❯ GameMode:** ${json.gamemode}`,
                                    `**❯ Health:** ${json.health}`,
                                    `**❯ Hunger:** ${json.hunger}`,
                                    `**❯ Dimension:** ${dimension}`,
                                    `**❯ XYZ:** ${x} ${y} ${z}`,
                                ].join('\n'),
                            )
                            message.channel.send({ embeds: [embed] })
                        })
                }
            })
    }
};

module.exports.help = {
    name: "player",
    description: "get the players",
}

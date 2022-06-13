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
        fetch(`https://api.minecraftservices.com/minecraft/profile/lookup/name/${args[0]}`, { method: "get", })
            .then((res) => res.json())
            .then((json) => {
                if (json.errorMessage == "Couldn't find any profile with that name") {
                    message.channel.send("Invalid UUID")
                } else {
                    //get uuid from json.id and add - 9 characters in and 5 after that and 5 after that
                    let uuid = json.id.substring(0, 8) + "-" + json.id.substring(8, 12) + "-" + json.id.substring(12, 16) + "-" + json.id.substring(16, 20) + "-" + json.id.substring(20, 36);
                    fetch(`${botconfig.url}` + `/v1` + `/players/${uuid}`, {
                        method: "get",
                        headers: { "Content-Type": "application/json", "key": `${botconfig.key}` }
                    })
                        .then((res) => res.json())
                        .then((json) => {
                            //get player xyz from json.location array
                            let x = parseInt(json.location[0]);
                            let y = parseInt(json.location[1]);
                            let z = parseInt(json.location[2]);

                            let health = Math.ceil(json.health);
                            let hunger = Math.ceil(json.hunger);

                            if (json.dimension == "NORMAL") { var dimension = "Overworld"; }
                            else if (json.dimension == "NETHER") { var dimension = "The Nether"; }
                            else if (json.dimension == "END") { var dimension = "The End"; }
                            else { var dimension = "Unknown"; }


                            //dynmap vars
                            if (json.dimension == "NORMAL") { var dyn_dim = "world"; }
                            else if (json.dimension == "NETHER") { var dyn_dim = "world_nether"; }
                            else if (json.dimension == "END") { var dyn_dim = "world_the_end"; }
                            else { var dyn_dim = "Unknown"; }

                            //Gamemode vars
                            if (json.gamemode == "SURVIVAL") { var gamemode = "Pesent Mode"; }
                            else if (json.gamemode == "CREATIVE") { var gamemode = "God Mode"; }
                            else if (json.gamemode == "SPECTATOR") { var gamemode = "Spectator"; }
                            else { var dyn_dim = "Unknown"; }


                            // embed
                            let embed = new MessageEmbed();
                            embed.setTitle(json.displayName);
                            embed.setColor("#0099ff");
                            embed.setThumbnail('https://crafatar.com/avatars/' + json.uuid);
                            embed.addField(
                                `**Server Info**`,
                                [
                                    `**❯ GameMode:** ${gamemode}`,
                                    `**❯ Health:** ${health}`,
                                    `**❯ Hunger:** ${hunger}`,
                                    `**❯ Dimension:** ${dimension}`,
                                    `**❯ XYZ:** ${x}, ${y}, ${z},`,
                                    `**❯ Dynmap:** [Open Link](https://map.reactivesli.me/?worldname=${dyn_dim}&mapname=flat&zoom=6&x=${x}&y=${y}&z=${z})`,
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

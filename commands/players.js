module.exports = {
    name: "player",
    description: "get the players",
    cooldown: 5
};

const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');
var botconfig = require('../config.json');

module.exports.run = async (client, message, args) => {

    if (args.length == 0){

    

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
        console.log(args[0]);
    }
};



module.exports.help = {
    name: "player",
    description: "get the players",
}

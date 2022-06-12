module.exports = {
    name: "player",
    description: "get the players",
    cooldown: 5
};

const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');


var botconfig = require('../config.json');
module.exports.run = async (client, message, args) => {


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




            /*
            //for each json array list display the uuid and displayname from all arrays // YOU MENTAL LOL
            for (var i = 0; i < json.length; i++) {
                embed.addField(`${json[i].displayName}`, `${json[i].uuid}`);
            }
            */


            message.channel.send({
                embeds: [embed]
            })
        })
};



module.exports.help = {

    name: "player",
    description: "get the players",
}

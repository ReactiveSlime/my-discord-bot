module.exports = {
    name: "server",
    description: "Get information about the server",
    cooldown: 5
};

const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');


var botconfig = require('../config.json');
module.exports.run = async (client, message, args) => {


    fetch(`${botconfig.url}` + `/v1` + `/server`, {
        method: "get",
        headers: { "Content-Type": "application/json", "key": `${botconfig.key}` }
    })
        .then((res) => res.json())
        .then((json) => {
            //set uptime math
            var uptime = json.health.uptime;
            var days = Math.floor(uptime / 86400);
            var hours = Math.floor((uptime % 86400) / 3600);
            var minutes = Math.floor((uptime % 3600) / 60);
            var seconds = Math.floor(uptime % 60);

            //set math for RAM use
            //convort data from json.health.maxMemory from MB to GB
            //free memory is used memory - total memory
            /*
            var totalMemory = json.health.maxMemory / 1024;
            var freeMemory = json.health.freeMemory / 1024;
            var usedMemory = totalMemory - freeMemory;
            */




            // embed
            let embed = new MessageEmbed();
            embed.setTitle("Server Information")
            embed.setColor("#00ff00")
            embed.addField(`Server MODT`, `${json.motd}`)
            embed.addField(`TPS`, `${json.tps}`)
            embed.addField(`Uptime`, `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`)
            
            /*
            embed.addField(`Total Memory`, `${totalMemory} GB`)
            embed.addField(`Used Memory`, `${usedMemory} GB`)
            embed.addField(`Free Memory`, `${freeMemory} GB`)
            */
            message.channel.send({
                embeds: [embed]
            })
        })
};



module.exports.help = {

    name: "server",
    description: "Get information about the server",
}

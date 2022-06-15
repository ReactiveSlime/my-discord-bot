module.exports = {
    name: "server",
    description: "Get information about the server",
    cooldown: 5
};

const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');
var botconfig = require('../config.json');
var urls = require('../urls.json');

module.exports.run = async (client, message, args) => {
    fetch(`${botconfig.url}` + `/v1` + `/server`, {
        method: "get",
        headers: { "Content-Type": "application/json", "key": `${botconfig.key}` }
    }
    )
        .then((res) => res.json())
        .then((json) => {
            fetch(`${botconfig.url}` + `/v1` + `/worlds/${botconfig.world_uuid}`, {
                method: "get",
                headers: { "Content-Type": "application/json", "key": `${botconfig.key}` }
            })
                .then((res) => res.json())
                .then((json2) => {
                    if (json2.storm) {
                        if (json2.thundering) { var weather = "Thundering Storm"; }
                        else { var weather = "Storming"; }
                    }
                    else { var weather = "Clear"; }
                    //set uptime math
                    var uptime = json.health.uptime;
                    var days = Math.floor(uptime / 86400);
                    var hours = Math.floor((uptime % 86400) / 3600);
                    var minutes = Math.floor((uptime % 3600) / 60);
                    var seconds = Math.floor(uptime % 60);

                    //get memory usage
                    var maxMemory = json.health.maxMemory;
                    var freeMemory = json.health.freeMemory;
                    var usedMemory = json.health.totalMemory
                    //convert bytes to gb
                    var maxMemoryGB = (maxMemory /1024/1024/1024).toFixed(2);
                    var freeMemoryGB = (freeMemory /1024/1024/1024).toFixed(2);
                    var usedMemoryGB = (usedMemory /1024/1024/1024).toFixed(2);

                    // embed
                    let embed = new MessageEmbed();
                    embed.setTitle("Server Information")
                    embed.setColor("#00ff00")
                    embed.addField(`Server MODT`, `${json.motd}`)
                    embed.addField("Weather", `${weather}`, true);
                    embed.addField(`TPS`, `${json.tps}`)
                    embed.addField('Memory Usage', `${usedMemoryGB}GB / ${maxMemoryGB}GB`, true);
                    embed.addField(`Uptime`, `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`)
                    message.channel.send({
                        embeds: [embed]
                    })
                })
        })
};



module.exports.help = {
    name: "server",
    description: "Get information about the server",
}

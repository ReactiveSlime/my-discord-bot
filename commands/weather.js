module.exports = {
    name: "weather",
    description: "Get weather information",
    cooldown: 5
};

const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');


var botconfig = require('../config.json');
module.exports.run = async (client, message, args) => {


    fetch(`${botconfig.url}` + `/v1` + `/worlds/eb097c21-424c-43c3-8282-7cbb20e4a303`, {
        method: "get",
        headers: { "Content-Type": "application/json", "key": `${botconfig.key}` }
    })
        .then((res) => res.json())
        .then((json) => {
            //check to see if it is storming . if it is also check to see if it is thundering else its clear
            if (json.storm) {
                if (json.thundering) {var weather = "Thundering Storm";}
                else { var weather = "Storming"; }}
            else { var weather = "Clear"; }




            // embed
            let embed = new MessageEmbed();
            embed.setTitle("Server Information")
            embed.setColor("#00ff00")
            embed.addField("Weather", `${weather}`, true);
            message.channel.send({
                embeds: [embed]
            })
        })
};



module.exports.help = {

    name: "weather",
    description: "Get weather information",
}

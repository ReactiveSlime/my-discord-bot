module.exports = {
    name: "test2",
    description: "test2",
    cooldown: 5,
};

const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
var botconfig = require("../config.json");
const fs = require("fs");

module.exports.run = async (client, message, args) => {
    //get URL from the server folder with the server ID as the file name
    var serverID = message.guild.id;
    var serverFolder = "././servers/" + serverID;
    var serverFile = serverFolder + "/serverTap.json";
    var serverTap = JSON.parse(fs.readFileSync(serverFile));
    var url = serverTap.url;
    //get the data from the URL
    fetch(`${url}` + `/v1` + `/players`, {
    method: "get",
    headers: { "Content-Type": "application/json", key: `${botconfig.key}` },
    })
    .then((res) => res.json())
    .then((json) => {
        //if json is empty return Noplayer online
        if (json.length == 0) {
            let embed = new MessageEmbed();
        embed.setTitle("Players");
        embed.setColor("#ff0000");
        embed.setDescription("**No players online**");
        message.channel.send({ embeds: [embed] })
        }else{

        // embed
        let embed = new MessageEmbed();
        embed.setTitle("Players");
        embed.setColor("#0099ff");
        for (var i = 0; i < json.length; i++) {

        //convert unix time to date
        var unixTimeStamp = new Date(json[i].lastPlayed);
        var date = new Date(unixTimeStamp);


        
            embed.addField(
                `${json[i].displayName}`,
                [
                    // use date.get to get the time of the last played in format hh:mm:ss
                    //convert 24 hour time to 12 hour time with AM/PM AEST
                    // Not 100% accurate but it works for now
                    // Joined date can be upto 30 seconds off
                    `Joined: ${date.getHours() > 12 ? date.getHours() - 12 + ":" + date.getMinutes() + ":" + date.getSeconds() + " PM AEST" : date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " AM AEST"}`,                            
                    //calculate how long the player has been online by subtracting cutrrent unix time from last played unix time and convert to Hours:Minutes:Seconds
                    `Online: ${Math.floor((Date.now() - json[i].lastPlayed) / 3600000)} hours, ${Math.floor(((Date.now() - json[i].lastPlayed) % 3600000) / 60000)} minutes, ${Math.floor(((Date.now() - json[i].lastPlayed) % 60000) / 1000)} seconds`


                ].join('\n'),
            )
        }
        message.channel.send({ embeds: [embed] })
    }     
    });
};

module.exports.help = {
    name: "test2",
    description: "test2",
};

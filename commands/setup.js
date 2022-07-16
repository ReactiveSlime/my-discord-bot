module.exports = {
    name: "setup",
    description: "setup",
    cooldown: 5
};

const { MessageEmbed } = require("discord.js");
var botconfig = require('../config.json');
const fs = require("fs");


module.exports.run = async (client, message, args) => {
    //ask the user if thay want to set up the server or not
    message.channel.send("Do you want to set up the server? (yes/no)");
    //create a collector for the user to respond to the message
    const filter = m => m.author.id === message.author.id;
    const collector = message.channel.createMessageCollector(filter, { time: 60000 });
    collector.on('collect', m => {
        //if the user says yes
        if (m.content === "yes") {
            //ask the user to enter the URL
            message.channel.send("Enter the URL of the server you want to set up");
            //create a collector for the user to respond to the message
            const filter = m => m.author.id === message.author.id;
            const collector = message.channel.createMessageCollector(filter, { time: 60000 });
            collector.on('collect', m => {
                //if the user enters a valid URL
                if (m.content.startsWith("http://")) {
                    //get the URL
                    var url = m.content;
                    //create a folder for the server
                    var serverFolder = "././servers/" + message.guild.id;
                    fs.mkdirSync(serverFolder);
                    //create a file for the server with the server ID as the file name
                    var serverFile = serverFolder + "/serverTap.json";
                    //create a json object with the URL
                    var serverTap = {
                        url: url
                    }
                    //write the json object to the file
                    fs.writeFileSync(serverFile, JSON.stringify(serverTap));
                    //send a message to the user
                    message.channel.send("Server setup complete");
                } else {
                    //if the user enters an invalid URL
                    message.channel.send("Invalid URL");
                }
            }
            )
        } else {
            //if the user says no
            message.channel.send("Server setup cancelled");
        }
    }
    )
}

module.exports.help = {
    name: "setup",
    description: "setup",
}

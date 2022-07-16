module.exports = {
    name: "setservertap",
    description: "Sets the server tap url",
    cooldown: 5
};

const { MessageEmbed } = require("discord.js");
var botconfig = require('../config.json');

module.exports.run = async (client, message, args) => {
    //save the URL from the Arg to a json file in the server folder with the server ID as the file name and the URL as the content of the file
    if(!args[0]){
        message.channel.send("Please provide a URL");
        return;
    }
    var url = args[0];
    var serverID = message.guild.id;
    var serverFolder = "./servers/" + serverID;
    var serverFile = serverFolder + "/serverTap.json";
    var serverTap = {
        url: url
    }
    fs.writeFileSync(serverFile, JSON.stringify(serverTap));
    message.channel.send("Server tap URL set to " + url);
}


module.exports.help = {
    name: "setservertap",
    description: "Sets the server tap url",
}

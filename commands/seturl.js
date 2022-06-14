module.exports = {
    name: "seturl",
    description: "Sets the url for the bot to use.",
    cooldown: 5,
};

const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
var botconfig = require("../config.json");
const fs = require('fs');

module.exports.run = async (client, message, args) => {
    //get URL from Args and save it to a json file called urls.json with the guilds ID as the key and the URL as the value
    if (args.length == 0) {
        message.channel.send("Please specify a url.");
    } else {
        //get the url from the args
        var url = args.join(" ");
        //check if the url is valid
        if (url.includes("http://") || url.includes("https://")) {
            //if it is valid, save it to the json file
            //open the json file
            fs.readFile('./urls.json', (err, data) => {
                if (err) throw err;
                //parse the json file
                var urls = JSON.parse(data);
                //add the url to the json file
                urls[message.guild.id] = url;
                //write the json file on new line
                fs.writeFile('./urls.json', JSON.stringify(urls, null, 2), (err) => {
                        if (err) throw err;
                        //send a message to the channel
                        message.channel.send("URL set to " + url);
                    }
            );
        })
    }
}
    
};

module.exports.help = {
    name: "seturl",
    description: "Sets the url for the bot to use.",
};

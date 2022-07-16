module.exports = {
    name: "test3",
    description: "About the bot",
    cooldown: 5,
};

const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
var botconfig = require("../config.json");

module.exports.run = async (client, message, args) => {

    fetch(`https://api.github.com/repos/ReactiveSlime/my-discord-bot/releases/latest`)
        .then((res) => res.json())
        .then((json) => {
            console.log(json)
        }
        )
}

module.exports.help = {
    name: "test3",
    description: "About the bot",
};

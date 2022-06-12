module.exports = {
    name: "ping",
    description: "Ping to our bot!",
    cooldown: 5
};
var Discord = require("discord.js");
const fetch = require('node-fetch');


var botconfig = require('../config.json');
module.exports.run = async (client, message, args) => {
    fetch(`${botconfig.url}` + `/v1` + `/ping`, {
        method: "get",
        headers: { "Content-Type": "application/json", "key": `${botconfig.key}` }
    })
        .then((res) => res.json())
        .then((json) => message.channel.send(json))
};

module.exports.help = {
    name: "ping",
    description: "Usage: get ping"
}
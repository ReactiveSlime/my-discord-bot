module.exports = {
    name: "help",
    description: "Help Command",
    cooldown: 5
};

const { MessageEmbed } = require("discord.js");
var botconfig = require('../config.json');

module.exports.run = async (client, message, args) => {
    // embed
    let embed = new MessageEmbed();
    embed.setTitle("Help Command");
    embed.setColor("#0099ff");
    embed.addField(
        `Here is a list of commands:`,
        [
            `${botconfig.prefix}help`,
            `${botconfig.prefix}ping`,
            `${botconfig.prefix}server`,
            `${botconfig.prefix}player`,
        ].join('\n'),
    );
    message.channel.send({ embeds: [newEmbed] })
}
module.exports.help = {

    name: "help",
    description: "Help Command",
}

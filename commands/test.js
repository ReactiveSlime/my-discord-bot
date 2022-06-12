module.exports = {
    name: "test",
    description: "test",
    cooldown: 5,
};

const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
var botconfig = require("../config.json");

module.exports.run = async (client, message, args) => {
    fetch(`${botconfig.url}` + `/v1` + `/players`, {
        method: "get",
        headers: { "Content-Type": "application/json", key: `${botconfig.key}` },
    })
        .then((res) => res.json())
        .then((json) => {
            // embed
            let embed = new MessageEmbed();
            embed.setTitle("Players");
            embed.setColor("#0099ff");
            embed.addField("Full Hart", `<:mcheartfull:985235371308744724>`, true);
            embed.addField("Half Hart", `<:mchearthalf:985235372818722887>`, true);
            embed.addField("Empty Hart", `<:mcheartempty:985235369756860436>`, true);
            embed.addField("Full Food", `<:mcfood:985235365457719347>`, true);
            embed.addField("Half Food", `<:mcfoodhalf:985333911032844309>`, true);
            embed.addField("Empty Food", `<:mcfoodempty:985235363293446235>`, true);
            message.channel.send({
                embeds: [embed],
            });
        });
};

module.exports.help = {
    name: "test",
    description: "test",
};

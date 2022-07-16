module.exports = {
    name: "about",
    description: "About the bot",
    cooldown: 5,
};

const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
var botconfig = require("../config.json");

module.exports.run = async (client, message, args) => {

    const version = "v1.0.0";
    //get bots created date
    const CreatedDate = new Date(message.client.user.createdAt);
    //get discord.js version
    const DiscordJSVersion = require("discord.js").version;
    //look on github for the latest release and get the version number and if its grater than the current version then show a new release message
    // embed
    let embed = new MessageEmbed();
    embed.setTitle("Bot Info");
    embed.setColor("#0099ff");
    embed.addField(
    "General",
    [
        "**❯ Developer:** [BallisticOK](https://atomicgaming666.com) / [ReactiveSlime](https://reactivesli.me)",
        `**❯ Creation Date:** ${CreatedDate}`,
        `**❯ Node.js:** ${process.version}`,
        `**❯ Discord.js:** v${DiscordJSVersion}`,
        `**❯ Github:** https://github.com/ReactiveSlime/my-discord-bot/`
    ].join("\n")
    )
        //look on github for the latest release and get the version number and if its grater than the current version then show a new release message
        fetch(`https://api.github.com/repos/ReactiveSlime/my-discord-bot/releases/latest`, {
            method: "get"
        })
            .then((res) => res.json())
            .then((json) => {
            console.log(json);
            if (json.tag_name != version) {
                embed.addField(
                    "**❯ New Release:**",
                    `**❯ Version:** ${json.tag_name}`,
                    `**❯ Link:** ${json.html_url}`
                );
            }
        }
        )
        message.channel.send({ embeds: [embed] });
}

module.exports.help = {
    name: "about",
    description: "About the bot",
};

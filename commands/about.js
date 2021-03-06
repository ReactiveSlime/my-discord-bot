module.exports = {
    name: "about",
    description: "About the bot",
    cooldown: 5
};

const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
var botconfig = require("../config.json");

module.exports.run = async (client, message, args) => {
    const CreatedDate = new Date(message.client.user.createdAt);
    //get discord.js version
    const DiscordJSVersion = require("discord.js").version;
    const version = require("../package.json").version; 
    fetch(`https://api.github.com/repos/ReactiveSlime/my-discord-bot/releases/latest`)
        .then((res) => res.json())
        .then((json) => {
            if (json.tag_name != version) {
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
                ),
                embed.addField(
                    "**❯ New Release:**",
                    [
                    `**❯ Version:** ${json.tag_name}`,
                    `**❯ Link:** ${json.html_url}`
                ].join("\n")
                );
                    message.channel.send({ embeds: [embed] });
            } else {
                
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
                );
                message.channel.send({ embeds: [embed] });
            }
        })
}

module.exports.help = {
    name: "about",
    description: "About the bot",
};

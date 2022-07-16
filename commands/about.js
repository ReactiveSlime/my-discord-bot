module.exports = {
    name: "about",
    description: "About the bot",
    cooldown: 5,
};

const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
var botconfig = require("../config.json");

module.exports.run = async (client, message, args) => {
    //get bots created date
    const CreatedDate = new Date(message.client.user.createdAt);
    //get discord.js version
    const DiscordJSVersion = require("discord.js").version;
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
        `**❯ Github:** https://github.com/ReactiveSlime/my-discord-bot/`,
    ].join("\n")
        );
        //check github for latest version and if it is newer than the current version then add a field to the embed
        fetch(`https://api.github.com/repos/ReactiveSlime/my-discord-bot/releases/latest`)
        .then((res) => res.json())
        .then((json) => {
            if (json.tag_name > "v" + "1.0.0") {
                embed.addField(
                    "**❯ Update Available:**",
                    `**❯ Version:** ${json.tag_name}`,
                    true
                );
            }
        }
        )


    message.channel.send({
    embeds: [embed],
    });
};

module.exports.help = {
    name: "about",
    description: "About the bot",
};

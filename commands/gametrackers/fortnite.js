const settings = require("../../config/settings.json");
const i18n = require("i18n");
const { MessageEmbed } = require("discord.js");
const Client = require('fortnite');
const fortnite = new Client(settings.gameapis.fortnite);
const fetch = require("node-fetch");

module.exports = {
    name: "fortnite",
    aliases: ["fn"],
    cooldowns: 3000,
    description: "Fortnite Status",
    usage: "chis!fn",
    toggleOff: false,
    developersOnly: false,
    userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    botpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    run: async (client, message, args) => {

        let embederr1 = new MessageEmbed();
	embederr1.setColor(0x9900FF)
        embederr1.setTitle(`Fortnite Stats (ERROR)`)
        embederr1.setDescription(`ERROR: Didn't Defined what Program want use, "shop|profile"`)
        embederr1.setFooter("Requested by " + message.author.username + " | Powered by Fortnite Tracker API (TRN Tracker)", message.client.user.avatarURL)
        embederr1.setTimestamp()
	    
	if (args[0] == "" || args[0] == null) return  message.channel.send({ embeds: [embederr1] })  

        if (args[0] == "profile") {
		
            let embederr2 = new MessageEmbed();
	    embederr2.setColor(0x9900FF)
            embederr2.setTitle(`Fortnite Stats (ERROR)`)
            embederr2.setDescription(`ERROR: Didn't Defined what platform, "solo|duo|squad|lifetime"`)
            embederr2.setFooter("Requested by " + message.author.username + " | Powered by Fortnite Tracker API (TRN Tracker)", message.client.user.avatarURL)
            embederr2.setTimestamp()
	    
	   if (args[1] == "" || args[1] == null) return  message.channel.send({ embeds: [embederr2] }) 

            if (args[1] == "solo") {

                const plat = args[2];
                const search = message.content.split(' ').splice(4).toString();
                fortnite.user(search, plat).then(data => {

                    let embed = new MessageEmbed();
                    embed.setColor(0x9900FF)
                    embed.setTitle(`${search}'s Fortnite Stats (SOLO)`)
                    embed.setDescription(`Score: ${data.stats.solo.score}\n\n KD: ${data.stats.solo.kd}\n\nMatches: ${data.stats.solo.matches}\n\nKills: ${data.stats.solo.kills}\n\nWins: ${data.stats.solo.wins}`)
                    embed.setFooter("Requested by " + message.author.username + " | Powered by Fortnite Tracker API (TRN Tracker)", message.client.user.avatarURL)
                    embed.setTimestamp()

                    message.channel.send({
						embeds: [embed]
					})

                });

            } else if (args[1] == "duo") {

                const plat = args[2];
                const search = message.content.split(' ').splice(4).toString();
                fortnite.user(search, plat).then(data => {

                    let embed = new MessageEmbed();
                    embed.setColor(0x9900FF)
                    embed.setTitle(`${search}'s Fortnite Stats (DUO)`)
                    embed.setDescription(`Score: ${data.stats.duo.score}\n\n KD: ${data.stats.duo.kd}\n\nMatches: ${data.stats.duo.matches}\n\nKills: ${data.stats.duo.kills}\n\nWins: ${data.stats.duo.wins}`)
                    embed.setFooter("Requested by " + message.author.username + " | Powered by Fortnite Tracker API (TRN Tracker)", message.client.user.avatarURL)
                    embed.setTimestamp()

                    message.channel.send({
						embeds: [embed]
					})

                });

            } else if (args[1] == "squad") {

                const plat = args[2];
                const search = message.content.split(' ').splice(4).toString();
                fortnite.user(search, plat).then(data => {

                    let embed = new MessageEmbed();
                    embed.setColor(0x9900FF)
                    embed.setTitle(`${search}'s Fortnite Stats (SQUAD)`)
                    embed.setDescription(`Score: ${data.stats.squad.score}\n\n KD: ${data.stats.squad.kd}\n\nMatches: ${data.stats.squad.matches}\n\nKills: ${data.stats.squad.kills}\n\nWins: ${data.stats.squad.wins}`)
                    embed.setFooter("Requested by " + message.author.username + " | Powered by Fortnite Tracker API (TRN Tracker)", message.client.user.avatarURL)
                    embed.setTimestamp()

                    message.channel.send({
						embeds: [embed]
					})

                });

            } else if (args[1] == "lifetime") {

                const plat = args[2];
                const search = message.content.split(' ').splice(4).toString();
                fortnite.user(search, plat).then(data => {

                    let embed = new MessageEmbed();
                    embed.setColor(0x9900FF)
                    embed.setTitle(`${search}'s Fortnite Stats (LIFETIME)`)
                    embed.setDescription(`Score: ${data.stats.lifetime.score}\n\n KD: ${data.stats.lifetime.kd}\n\nMatches: ${data.stats.lifetime.matches}\n\nKills: ${data.stats.lifetime.kills}\n\nWins: ${data.stats.lifetime.wins}`)
                    embed.setFooter("Requested by " + message.author.username + " | Powered by Fortnite Tracker API (TRN Tracker)", message.client.user.avatarURL)
                    embed.setTimestamp()

                    message.channel.send({
						embeds: [embed]
					})

                });

            }
	} else if (args[0] == "shop") {

            fortnite.store().then(async(data) => {

                let currentPage = 0;
                const embeds = generateQueueEmbed(message, data);

                const queueEmbed = await message.channel.send({
					content: `**${i18n.__mf("queue.currentPage")} ${currentPage + 1}/${embeds.length}**`,
                    embeds: [embeds[currentPage]]
				});

                try {
                    await queueEmbed.react("⬅️");
                    await queueEmbed.react("⏹");
                    await queueEmbed.react("➡️");
                } catch (error) {
                    console.error(error);
                    message.channel.send(error.message).catch(console.error);
                }

                const filter = (reaction, user) => ["⬅️", "⏹", "➡️"].includes(reaction.emoji.name) && message.author.id === user.id;
                const collector = queueEmbed.createReactionCollector(filter, { time: 60000 });

                collector.on("collect", async(reaction, user) => {
                    try {
                        if (reaction.emoji.name === "➡️") {
                            if (currentPage < embeds.length - 1) {
                                currentPage++;
                                queueEmbed.edit({
									content: `**${i18n.__mf("queue.currentPage")} ${currentPage + 1}/${embeds.length}**`,
									embeds: [embeds[currentPage]]
								});
                            }
                        } else if (reaction.emoji.name === "⬅️") {
                            if (currentPage !== 0) {
                                --currentPage;
                                queueEmbed.edit({
									content: `**${i18n.__mf("queue.currentPage")} ${currentPage + 1}/${embeds.length}**`,
									embeds: [embeds[currentPage]]
								});
                            }
                        } else {
                            collector.stop();
                            reaction.message.reactions.removeAll();
                        }
                        await reaction.users.remove(message.author.id);
                    } catch (error) {
                        console.error(error);
                        return message.channel.send(error.message).catch(console.error);
                    }
                });

            });

        }

    }
}

function generateQueueEmbed(message, queue) {
    let embeds = [];
    let k = 10;

    for (let i = 0; i < queue.length; i += 10) {
        const current = queue.slice(i, k);
        let j = i;
        k += 10;

        const info = current.map((track) => `Item: **${track.name}**\nRarity: **${track.rarity}**\nPrice: **${track.vbucks} VBucks**`).join("\n\n");

        const embed = new MessageEmbed()
            .setTitle("Fortnite SHOP Lists")
            .setThumbnail(message.guild.iconURL())
            .setColor("#F8AA2A")
            .setDescription("API Powered by Fortnite Tracker (TRN Tracker)\n\n" + info)
            .setTimestamp();
        embeds.push(embed);
    }

    return embeds;
}

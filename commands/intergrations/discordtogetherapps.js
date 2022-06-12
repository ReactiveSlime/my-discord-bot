module.exports = {
    name: "discordtogetherapps",
    aliases: ["dtapps"],
    cooldowns: 3000,
    description: "Open Embeded Apps using Embeded Discord Web Browser",
    usage: "chis!dtapps",
    usage: "chis!apps",
    toggleOff: false,
    developersOnly: false,
    userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    botpermissions: ["SEND_MESSAGES", "CREATE_INSTANT_INVITE", "USE_EMBEDDED_ACTIVITIES"],
    run: async (client, message, args) => {

        if (args[0] == "" || args[0] == null) return message.reply("Invalid Command:\n\nLists:\nyoutube")

        if (args[0] == "youtube") {

            if (message.member.voice.channel) {
                const { channelID } = message.member.voice;
                
                client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'youtube').then(async invite => {

                    return message.channel.send(`${invite.code}`);

                });

            } else {

                message.reply("You are not in any Voice Channels, make sure you inside voice channel")

            };

        } else {

            message.reply("Invalid Command:\n\nLists:\nyoutube")

        }

    }
}

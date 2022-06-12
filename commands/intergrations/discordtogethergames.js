module.exports = {
    name: "discordtogethergames",
    aliases: ["dtgames"],
    cooldowns: 3000,
    description: "Play Video Games using Embeded Discord Web Browser",
    usage: "chis!dtgames",
    toggleOff: false,
    developersOnly: false,
    userpermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    botpermissions: ["SEND_MESSAGES", "CREATE_INSTANT_INVITE", "USE_EMBEDDED_ACTIVITIES"],
    run: async (client, message, args) => {

        if (args[0] == "" || args[0] == null) return message.reply("Invalid Command:\n\nLists:\npoker\nbetrayal\nfishing\nchess")

        if (args[0] == "poker") {

            if (message.member.voice.channel) {
                const { channelID } = message.member.voice;

                client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'poker').then(async invite => {

                    return message.channel.send(`${invite.code}`);

                });

            } else {

                message.reply("You are not in any Voice Channels, make sure you inside voice channel")

            };

        } else if (args[0] == "betrayal") {

            if (message.member.voice.channel) {

                client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'betrayal').then(async invite => {

                    return message.channel.send(`${invite.code}`);

                });

            } else {

                message.reply("You are not in any Voice Channels, make sure you inside voice channel")

            };

        } else if (args[0] == "fishing") {

            if (message.member.voice.channel) {

                client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'fishing').then(async invite => {

                    return message.channel.send(`${invite.code}`);

                });

            } else {

                message.reply("You are not in any Voice Channels, make sure you inside voice channel")

            };

        } else if (args[0] == "chess") {

            if (message.member.voice.channel) {

                client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'chess').then(async invite => {

                    return message.channel.send(`${invite.code}`);

                });

            } else {

                message.reply("You are not in any Voice Channels, make sure you inside voice channel")

            };

        } else if (args[0] == "checkers") {

            if (message.member.voice.channel) {

                client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'checkers').then(async invite => {

                    return message.channel.send(`${invite.code}`);

                });

            } else {

                message.reply("You are not in any Voice Channels, make sure you inside voice channel")

            };

        } else if (args[0] == "lettertile") {

            if (message.member.voice.channel) {

                client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'lettertile').then(async invite => {

                    return message.channel.send(`${invite.code}`);

                });

            } else {

                message.reply("You are not in any Voice Channels, make sure you inside voice channel")

            };

        } else if (args[0] == "wordsnack") {

            if (message.member.voice.channel) {

                client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'wordsnack').then(async invite => {

                    return message.channel.send(`${invite.code}`);

                });

            } else {

                message.reply("You are not in any Voice Channels, make sure you inside voice channel")

            };

        } else if (args[0] == "doodlecrew") {

            if (message.member.voice.channel) {

                client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'doodlecrew').then(async invite => {

                    return message.channel.send(`${invite.code}`);

                });

            } else {

                message.reply("You are not in any Voice Channels, make sure you inside voice channel")

            };

        } else if (args[0] == "spellcast") {

            if (message.member.voice.channel) {

                client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'spellcast').then(async invite => {

                    return message.channel.send(`${invite.code}`);

                });

            } else {

                message.reply("You are not in any Voice Channels, make sure you inside voice channel")

            };

        } else if (args[0] == "awkword") {

            if (message.member.voice.channel) {

                client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'awkword').then(async invite => {

                    return message.channel.send(`${invite.code}`);

                });

            } else {

                message.reply("You are not in any Voice Channels, make sure you inside voice channel")

            };

        } else if (args[0] == "puttparty") {

            if (message.member.voice.channel) {

                client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'puttparty').then(async invite => {

                    return message.channel.send(`${invite.code}`);

                });

            } else {

                message.reply("You are not in any Voice Channels, make sure you inside voice channel")

            };

        } else {

            message.reply("Invalid Command:\n\nLists:\npoker\nbetrayal\nfishing\nchess\ncheckers\nlettertile\nwordsnack\ndoodlecrew\nspellcast\nawkword\nputtparty")

        }

    }
}

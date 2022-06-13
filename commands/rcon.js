module.exports = {
    name: "rcon",
    description: "Use RCON to execute commands on the server.",
    cooldown: 5,
};

const { MessageEmbed } = require("discord.js");
var botconfig = require("../config.json");
const axios = require("axios");

module.exports.run = async (client, message, args) => {
    //make it so the command starting with rcon can only be used by users with the role id specified in the config.json under rcon_role_id
    if (message.member.roles.cache.find((r) => r.name === "rcon")) {
        //delete the command message
        message.delete();
        //if the user has the role, execute the command
        if (args.length == 0) {
            message.channel.send("Please specify a command to execute.");
            message.react("<:mchearthalf:985235372818722887>");
        } else {
            //execute the command
            axios
                .get(
                    `https://api.reactivesli.me/rcon/api.php?&command=` +
                    args.join(" ") +
                    `&server_ip=` +
                    botconfig.server_ip +
                    `&server_port=` +
                    botconfig.rcon_port +
                    `&server_pw=` +
                    botconfig.rcon_pw
                )
                .then((response) => {
                    //make embed
                    const embed = new MessageEmbed()
                        .setColor("#0099ff")
                        .setTitle("RCON Command")
                        .setDescription(
                            `Server: ${botconfig.server_ip}` +
                            `\nCommand: ${args.join(" ")}` +
                            `\nResponse:\n ${response.data.slice(0, -2)}`
                        )
                        .setTimestamp();
                    //send embed
                    message.channel.send({
                        embeds: [embed],
                        });
                    message.react("<:mcheartfull:985235371308744724>");
                });
        }
    } else {
        message.channel.send("You do not have permission to use this command.");
        message.react("<:mcheartempty:985235369756860436>");
    }
};

module.exports.help = {
    name: "rcon",
    description: "Use RCON to execute commands on the server.",
};

module.exports = {
    name: "reloadcmd",
    description: "Reloads the commands",
    cooldown: 5
};

const { MessageEmbed } = require("discord.js");


var botconfig = require('../config.json');
module.exports.run = async (client, message, args, Discord, user, text) => {
    if (message.author.id == "902736282998947851" || message.author.id == "321590712665636865") {
        if (!args || args.length < 1) return message.reply("Must provide a command name to reload.");
        const commandName = args[0];
        // Check if the command exists and is valid
        if (!message.client.commands.has(commandName)) {
            return message.reply("That command does not exist");
        }
        // the path is relative to the *current folder*, so just ./filename.js
        delete require.cache[require.resolve(`./${commandName}.js`)];
        // We also need to delete and reload the command from the client.commands Enmap
        message.client.commands.delete(commandName);
        const props = require(`./${commandName}.js`);
        message.client.commands.set(commandName, props);
        message.reply(`The command ${commandName} has been reloaded`);
    } else {
        message.channel.send("Sorry, you do not have permissisons to use this command, **" + message.author.username + "**.")
    }
    

};



module.exports.help = {

    name: "reloadcmd",
    description: "Reloads the commands",
}

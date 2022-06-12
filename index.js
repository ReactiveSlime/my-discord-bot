const { Client, Intents } = require("discord.js");
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

var botconfig = require('./config.json');


client.on('ready', () => {
    client.user.setActivity(`${botconfig.prefix}help`, { type: 'PLAYING' });
    console.log(`${client.user.tag} is online!`);
});

/*
client.on("messageCreate", (message) => {
  if (message.content.startsWith("ping")) {
      fetch(`${botconfig.url}` + `/v1` + `/ping`, {
          method: "get",
          headers: { "Content-Type": "application/json", "key": `${botconfig.key}` }
      })
      .then((res) => res.json())
      .then((json) => message.channel.send(json));
  }
});
*/


//Commands System
const commands = new Map();
client.commands = commands;


client.on('messageCreate', message => {
    // Ignore messages from bots and from DMs (non-guild channels)
    if (message.author.bot || !message.guild) {
        return;
    }

    // Just a shorthand variable
    let {
        content
    } = message;
    // Ignore any messages that don't start with the configurable prefix
    if (!content.startsWith(botconfig.prefix)) {
        return;
    }

    // Take all the text after the prefix and split it into an array,
    // splitting at every space (so 'hello world' becomes ['hello', 'world'])
    let split = content.substr(botconfig.prefix.length).split(' ');
    // Get the command label (which is the first word after the prefix)
    let label = split[0];
    // Get the rest of the words after the prefix
    let args = split.slice(1);

    // If there's a command with that given label...
    if (commands.get(label)) {
        // ... get the command with that label and run it with the bot, the
        // message variable, and the args as parameters
        commands.get(label).run(client, message, args);
    }
});
//load commands
fs.readdirSync(path.resolve(__dirname, 'commands'))
    .filter(f => f.endsWith('.js'))
    .forEach(f => {
        // Attempt to load the file
        console.log(`👌 Loading command ${f}`);
        try {
            // Require the raw file
            let command = require(`./commands/${f}`);
            // Validate that there's a run function and a valid help object
            if (typeof command.run !== 'function') {
                throw 'Command is missing a run function!';
            } else if (!command.help || !command.help.name) {
                throw 'Command is missing a valid help object!';
            }
            // Store the command in the map based on its name
            commands.set(command.help.name, command);
        } catch (error) {
            // Log any errors from the validator or from requiring the file
            console.error(`Failed to load command ${f}: ${error}`);
        }
    });


//get bot token from config.json file and login to discord
client.login(botconfig.token);
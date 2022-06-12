const client = require("../index");
const chalk = require("chalk");
var moment = require('moment');

const { version: discordjsVersion, MessageEmbed } = require("discord.js");

const { prefix } = require("../config/settings.json");
const main_json = require("../config/settings.json");

const request = require("request");

let Parser = require('rss-parser');
let parser = new Parser({
    headers: {
        'User-Agent': 'Vortex Discord BOT/V7.1'
    },
});

const entities = require('entities');
const validUrl = require('valid-url');

let lastTimestamp = Math.floor(Date.now() / 1000);

var backday1 = moment().subtract('days', 1).unix()

let GuildChis;
let ChannelChis;

function toTimestamp(strDate) {
  var datum = Date.parse(strDate);
  return datum / 1000;
}

const characters ='abcdefghijklmnopqrstuvwxyz';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result.replace(/ /g, '');
}

client.on("ready", async () => {

        GuildChis = client.guilds.cache.get("715812735052546078");
        if (GuildChis) {
            ChannelChis = GuildChis.channels.cache.get("862510486444572722");
        }

        if (!ChannelChis) {
            console.log('[ChisDiscord] A matching channel could not be found. Please check your DISCORD_SERVERID and DISCORD_CHANNELID environment variables.');
        } else {
            console.log(`[ChisDiscord] ${client.user.username} Discord BOT Ready Chis Discord!`);
            botReady = true;
        }

  const supportServer = client.guilds.cache.get(`${main_json.TestingServerID}`);
  if (!supportServer) return console.log("");
  // ———————————————[Status]———————————————

  client.user.setActivity(`VORTEX BOT || STARTING UP!!`,
  { type: "WATCHING" })

        setInterval(() => {

            client.user.setActivity(`${prefix}help & /help`,
            { type: "WATCHING" })

            setTimeout(function() {
                client.user.setActivity(`${prefix}help || VORTEX BOT`,
                { type: "WATCHING" })
            }, 30000)

            setTimeout(function() {
                client.user.setActivity(`${prefix}help || NOTICE ME SENPAI!!`,
                { type: "WATCHING" })
            }, 40000)

            setTimeout(function() {
                client.user.setActivity(`${prefix}help || BOT Version 7.5 (BETA)`,
                { type: "WATCHING" })
            }, 50000)

            setTimeout(function() {
                client.user.setActivity(`${prefix}help || Connected: ${client.guilds.cache.size} ${
                  client.guilds.cache.size > 1 ? "Servers" : "Server"
                }`,
                { type: "WATCHING" })
            }, 60000)

            setTimeout(function() {
                client.user.setActivity(`${prefix}help || Surving: ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} ${
                  client.guilds.cache.reduce((a, b) => a + b.memberCount, 0) > 1
                    ? "Users,"
                    : "User,"
                }`,
                { type: "WATCHING" })
            }, 70000)

        }, 80000)

        //client.user.setActivity(`${prefix}help || IF READING THIS STATUS, RELINK BOT USING ADD TO SERVER ON BOT PROFILE, ADDED SLASH COMMANDS AND NEEDS PERMS.`,
        //    { type: "WATCHING" })

  // ———————————————[Ready MSG]———————————————
  console.log(chalk.green.bold("Success!"));
  console.log(chalk.gray("Connected To"), chalk.yellow(`${client.user.tag}`));
  console.log(
    chalk.white("Watching"),
    chalk.red(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}`),
    chalk.white(
      `${
        client.guilds.cache.reduce((a, b) => a + b.memberCount, 0) > 1
          ? "Users,"
          : "User,"
      }`
    ),
    chalk.red(`${client.guilds.cache.size}`),
    chalk.white(`${client.guilds.cache.size > 1 ? "Servers." : "Server."}`)
  );
  console.log(
    chalk.white(`Prefix:` + chalk.red(` ${prefix}`)),
    chalk.white("||"),
    chalk.red(`${client.commands.size}`),
    chalk.white(`Commands`),
    chalk.white("||"),
    chalk.red(`${client.slashCommands.size}`),
    chalk.white(`Slash Commands`)
  );
  console.log(
    chalk.white(`Support-Server: `) +
      chalk.red(`${supportServer.name || "None"}`)
  );
  console.log("");
  console.log(chalk.red.bold("——————————[Statistics]——————————"));
  console.log(
    chalk.gray(
      `Discord.js Version: ${discordjsVersion}\nRunning on Node ${process.version} on ${process.platform} ${process.arch}`
    )
  );
  console.log(
    chalk.gray(
      `Memory: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(
        2
      )} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
        2
      )} MB`
    )
  );
});

const { MessageEmbed, Permissions } = require("discord.js");

module.exports = {
   name: "unban",
   aliases: ["serverunban"],
   description: "Unban a user from the discord server with a certain reason",
   userpermissions: ["BAN_MEMBERS", "VIEW_CHANNEL"],
   botpermissions: ["BAN_MEMBERS"],
   usage: "chis!unban @ChisVR#7777 FALSE ALARM!",
   cooldowns: 2000,
   developersOnly: false,
   toggleOff: false,
   run: async (client, message, args) => {
    
    if (!message.member.permissions.has([Permissions.FLAGS.BAN_MEMBERS])) return message.reply("YOU DONT HAVE PERMISSION DO THIS!")
	const reason = message.content.split(' ').splice(2).toString();
	let user = args[0].includes('<@!') ? args[0].replace('<@!', '').replace('>', '')
    : args[0].includes('<@') ? args[0].replace('<@', '').replace('<', '').replace('>', '') : '';

    const bans = await message.guild.members;
    if (!bans.fetch(user)) return message.reply('this User is not on Banned List');

    await message.guild.members.unban(user);

    const unbanembed = new MessageEmbed()
      .setColor('#99ff66')
      .setDescription(`✅ ${user} is now Unbanned from Server!`);
    message.channel.send({
      embeds: [unbanembed]
    });

   },
};

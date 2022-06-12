const { MessageEmbed, Permissions } = require("discord.js");

module.exports = {
   name: "hackban",
   aliases: ["accounthacked"],
   description: "Ban a user from the discord server with a certain reason and Warns User been Hacked on DM",
   userpermissions: ["BAN_MEMBERS", "VIEW_CHANNEL"],
   botpermissions: ["BAN_MEMBERS"],
   usage: "chis!hackban @ChisVR#7777 SENDING IP GRABBERS",
   cooldowns: 2000,
   developersOnly: false,
   toggleOff: false,
   run: async (client, message, args) => {
    if (!message.member.permissions.has([Permissions.FLAGS.BAN_MEMBERS])) return message.reply("YOU DONT HAVE PERMISSION DO THIS!")
	const reason = message.content.split(' ').splice(2).toString();
	let user = message.mentions.users.first();

    if (!user) {
      try {
        const fetchedUser = await client.users.fetch(args.slice(0, 1).join(' '));
        if (!fetchedUser) throw new Error('User not found!');
        user = fetchedUser;
      }
      catch (error) {
        return message.reply('Invalid ID Check');
      }
    }

    if (user === message.author) return message.channel.send('You cant Ban Yourself');
    if (!reason) return message.reply('There is no Input reasons');


    var ownerid = message.client.users.cache.get(message.guild.ownerId)
    const banembeddm = new MessageEmbed()
        .setColor('#99ff66')
        .setDescription(`✅ ${user} You have Temporary Banned On ${message.guild.name} Server Because your account sending Malware or Treats / BOTNET or you Been Hacked.\n\nWe Banned / Kicked You Provent Hackers Try take more Accounts, More Welcome Come Back by Contact OWNER **__${ownerid.username}#${ownerid.discriminator}__** to be Unbanned.\n\nthis already been Logged to staff Team For Noticed..`);
        user.send({ embeds: [banembeddm] });	   
	 
    message.guild.members.ban(user, {
        reason
    }).then(async () => {

        const banembed = new MessageEmbed()
        .setColor('#99ff66')
        .setDescription(`✅ ${user} is now Banned from Server!\n\nReason: ${reason}`);
        message.channel.send({ embeds: [banembed] });

    }).catch(() => message.reply('YOU DONT HAVE PERMS TO BAN USERS ON SERVER!'));

   },
};

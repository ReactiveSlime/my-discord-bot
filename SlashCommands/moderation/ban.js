const { MessageEmbed, Permissions } = require("discord.js");

module.exports = {
   name: "ban",
   description: "Ban a user from the discord server with a certain reason",
   type: "CHAT_INPUT",

   options: [{
    name: 'user',
    description: 'Select user by @USER',
    type: 'STRING',
    required: true
   },
   {
    name: 'reason',
    description: 'give us Reasons',
    type: 'STRING',
    required: true
   }],

   run: async (client, interaction, args) => {

    if (!interaction.member.permissions.has([Permissions.FLAGS.BAN_MEMBERS])) return interaction.followUp("YOU DONT HAVE PERMISSION DO THIS!")
	const reason = interaction.options.getString('reason');
    
    var atuser;

	if (interaction.options.getString('user')) {
        atuser = interaction.options.getString('user').replace(/[<@!>]/g, '');
    }

    var user = client.users.cache.find(user => user.id === atuser)

    if (!user) {
      try {
        const fetchedUser = await client.users.cache.fetch(user);
        if (!fetchedUser) throw new Error('User not found!');
        user = fetchedUser;
      }
      catch (error) {
        return interaction.followUp('Invalid ID Check');
      }
    }

    if (user === interaction.user) return interaction.followUp('You cant Ban Yourself');
    if (!reason) return interaction.followUp('There is no Input reasons');

    interaction.guild.members.ban(user, {
        reason
    }).then(async () => {

        const banembed = new MessageEmbed()
        .setColor('#99ff66')
        .setDescription(`✅ ${user} is now Banned from Server!\n\nReason: ${reason}`);
        interaction.followUp({ embeds: [banembed] });

    }).catch(() => interaction.followUp('YOU DONT HAVE PERMS TO BAN USERS ON SERVER!'));

   },
};

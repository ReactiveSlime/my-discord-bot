const { MessageEmbed } = require("discord.js");

module.exports = {
   name: "serverinfo",
   aliases: ["si"],
   description: "Returns Server information",
   userpermissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],
   botpermissions: ["VIEW_CHANNEL", "SEND_MESSAGES"],
   usage: "%!serverinfo",
   cooldowns: 2000,
   developersOnly: false,
   toggleOff: false,
   run: async (client, message, args) => {
			
       //get guild created date
        const GuildCreatedDate = new Date(message.guild.createdAt);
        //get guild name and id
        const GuildName = message.guild.name;
        const GuildID = message.guild.id;
        //get guild member count (including bots)
        const GuildMemberCount = message.guild.memberCount;
        //get guild member count (excluding bots) 
        const GuildMemberCountHumans = message.guild.members.cache.filter(m => !m.user.bot).size;
        //get banned member count (excluding bots)
        const GuildBannedCount = message.guild.bans.cache.size;
        //get guild channels count
        const GuildChannelsCount = message.guild.channels.cache.size;
        //get guild roles count
        const GuildRolesCount = message.guild.roles.cache.size;
        //get guild emojis count
        const GuildEmojisCount = message.guild.emojis.cache.size;
        //get guild voice channels count (excluding category)
        const GuildVoiceChannelsCount = message.guild.channels.cache.filter(c => c.type === "GUILD_VOICE").size;
        //get guild text channels count (excluding category)
        const GuildTextChannelsCount = message.guild.channels.cache.filter(c => c.type === "GUILD_TEXT").size;
        //get guild verification level
        const GuildVerificationLevel = message.guild.verificationLevel;
        //get guild afk channel
        const GuildAFKChannel = message.guild.afkChannel;
        //get guild afk timeout
        const GuildAFKTimeout = message.guild.afkTimeout;
        //get guild icon url (png)
        const GuildIconURL = message.guild.iconURL({ format: "png", dynamic: true });

    
    
        
        await message.channel.sendTyping();

        let embed = new MessageEmbed()
        .setColor(0x9900FF)
        .setTitle("About The Server")
        .setThumbnail(GuildIconURL)
        .addField(
            'General',
            [
                `**❯ Guild Name 🔎 :** ${GuildName}`,
                `**❯ Guild ID:** ${GuildID}`,
                `**❯ Guild Created:** ${GuildCreatedDate.toLocaleDateString()}`,
                `**❯ Guild Verification Level:** ${GuildVerificationLevel}`,
                `**❯ Guild AFK Channel:** ${GuildAFKChannel}`,
                `**❯ Guild AFK Timeout:** ${GuildAFKTimeout}`,
            ].join('\n'),
            )
            .addField(
              'Counts',
              [
                `**❯ Guild Member Count:** ${GuildMemberCount}`,
                `**❯ Guild Banned Count:** ${GuildBannedCount}`,
                `**❯ Guild Channels Count:** ${GuildChannelsCount}`,
                `**❯ Guild Roles Count:** ${GuildRolesCount}`,
                `**❯ Guild Emojis Count:** ${GuildEmojisCount}`,
                `**❯ Guild Voice Channels Count:** ${GuildVoiceChannelsCount}`,
                `**❯ Guild Text Channels Count:** ${GuildTextChannelsCount}`,
              ].join('\n'),
            )
        .setTimestamp()
    
  
        message.channel.send({
            embeds: [embed]
        });

   },
};

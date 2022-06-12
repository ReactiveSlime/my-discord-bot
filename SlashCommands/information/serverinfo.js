const { MessageEmbed } = require("discord.js");

module.exports = {
   name: "serverinfo",
   description: "Gets Server Info",
   type: "CHAT_INPUT",
   options: [],

   run: async (client, interaction, args) => {

    //get guild created date
        const GuildCreatedDate = new Date(interaction.guild.createdAt);
        //get guild name and id
        const GuildName = interaction.guild.name;
        const GuildID = interaction.guild.id;
        //get guild member count (including bots)
        const GuildMemberCount = interaction.guild.memberCount;
        //get guild member count (excluding bots) 
        const GuildMemberCountHumans = interaction.guild.members.cache.filter(m => !m.user.bot).size;
        //get banned member count (excluding bots)
        const GuildBannedCount = interaction.guild.bans.cache.size;
        //get guild channels count
        const GuildChannelsCount = interaction.guild.channels.cache.size;
        //get guild roles count
        const GuildRolesCount = interaction.guild.roles.cache.size;
        //get guild emojis count
        const GuildEmojisCount = interaction.guild.emojis.cache.size;
        //get guild voice channels count (excluding category)
        const GuildVoiceChannelsCount = interaction.guild.channels.cache.filter(c => c.type === "GUILD_VOICE").size;
        //get guild text channels count (excluding category)
        const GuildTextChannelsCount = interaction.guild.channels.cache.filter(c => c.type === "GUILD_TEXT").size;
        //get guild verification level
        const GuildVerificationLevel = interaction.guild.verificationLevel;
        //get guild afk channel
        const GuildAFKChannel = interaction.guild.afkChannel;
        //get guild afk timeout
        const GuildAFKTimeout = interaction.guild.afkTimeout;
        //get guild icon url (png)
        const GuildIconURL = interaction.guild.iconURL({ format: "png", dynamic: true });

    
    
        
        await interaction.channel.sendTyping();

        let embed = new MessageEmbed()
        embed.setColor(0x9900FF)
        embed.setTitle("About The Server")
        embed.setThumbnail(GuildIconURL)
        embed.addField(
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
            embed.addField(
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
        embed.setTimestamp()

    interaction.followUp({
        embeds: [embed]
    })
   },
};
const db = require('quick.db');
const Discord = require('discord.js');

module.exports = {
    name: 'clw',
    description: 'Clears a user\'s warnings.',
    aliases: ['clearwarnings', 'clearwarns'],
    usage: '[@member]',
    cooldown: 30000,
	permissions: 'MANAGE_MEMBERS',
    run: async (bot, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!args[0]) return message.channel.send('You must mention a member or member\'s ID.');
        if (!member) return message.channel.send('I could not find that member.');
        if (member.roles.highest.position > message.member.roles.highest.position) return message.channel.send('You cannot remove warnings from people higher than you.');
        if (member == message.member && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You cannot remove warnings from yourself, ask an admin to do it.');
        
        db.delete(`number.${member.id}`);
        db.delete(`info.${member.id}`);

        message.channel.send('You have deleted their warns.');
        bot.cooldown.set(`clw${message.author.id}`, Date.now() + 30000);
    }
}
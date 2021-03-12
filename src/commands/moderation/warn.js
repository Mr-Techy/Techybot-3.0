const Discord = require('discord.js');
const db = require('quick.db');
const moment = require('moment');

module.exports = {
	name: 'warn',
	description: 'Warns a member.',
	aliases: '',
	usage: '[@member] [reason]',
	cooldown: 10000,
	permissions: 'MUTE_MEMBERS',
	run: async (bot, message, args) => {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!user) return message.channel.send('You must mention a member or member\'s ID.');
        if (user.roles.highest.position > message.member.roles.highest.position) return message.channel.send('One of their roles is higher than yours.');
        let res = args.slice(1).join(' ');
        if (!res) return message.channel.send('You must state a reason to warn them.');
        
        message.channel.send(`You have warned ${user.user.username}.`);
        db.push(`info.${user.id}`, {
            moderator: message.author.tag,
            reason: res,
            date: moment().format("MM-DD-YYYY")
        })
        db.add(`number.${user.id}.${message.guild.id}`, 1);
        const embed = new Discord.MessageEmbed()
            .setTitle('You have been warned')
            .addField('Moderator', message.author.tag, true)
            .addField('Reason:', res, true)
            .setFooter(message.guild.name)
            .setColor('YELLOW')
            .setTimestamp();
        user.send(embed)
        bot.cooldown.set(`warn${message.author.id}`, Date.now() + 10000);
	}
}
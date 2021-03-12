const moment = require('moment');
const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'warns',
    description: 'Checks a user\'s warnings.',
    aliases: [''],
    usage: '[@member]',
    cooldown: 10000,
    run: async (bot, message, args) => {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!user) return message.channel.send('You must mention a member or member\'s ID.');

        const number = db.fetch(`number.${user.id}`);
        const warnInfo = db.fetch(`info.${user.id}`);

        if (!number || !warnInfo) return message.channel.send('That user has no warnings.');

        const warnEmbed = new Discord.MessageEmbed()
        for (let warnings of warnInfo) {
            let mod = warnings.moderator;
            let reason = warnings.reason;
            let date = warnings.date;

            warnEmbed.addField(`${user.user.tag}'s warnings`, `**Moderator:** ${mod}\n**Reason:** ${reason}\n**Date:** ${date}`, true);
        }

        warnEmbed.setColor('YELLOW')
        warnEmbed.setTimestamp();
        message.channel.send(warnEmbed);
        bot.cooldown.set(`warns${message.author.id}`, Date.now() + 10000);
    }
}
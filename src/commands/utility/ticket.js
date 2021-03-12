const Discord = require('discord.js');

module.exports = {
    name: 'ticket',
    description: 'Opens a ticket for an issue.',
    aliases: ['issue', 'createTicket', 'create-ticket'],
    usage: '[issue]',
    cooldown: 60000,
    run: async (bot, message, args) => {
        const ch = message.guild.channels.cache.find(ch => ch.name == message.author.id)
        if (ch) return message.channel.send(`You already have a ticket open, go here: ${ch}`);
        const issue = args.join(' ');
        if (!issue) return message.channel.send('You must specify your issue.');

        message.guild.channels.create(`${message.author.id}`, {
            type: 'text',
            parent: bot.ticketCategory,
            permissionOverwrites: [
                {
                    id: message.guild.id,
                    deny: ['VIEW_CHANNEL']
                },
                {
                    id: message.author.id,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS', 'ATTACH_FILES']
                },
            ]
        }).then(async channel => {
            const embed = new Discord.MessageEmbed()
                .setTitle(message.author.username + ' has an issue!')
                .setDescription(`Issue: \`${issue}\``)
                .setFooter(message.channel.name)
                .setColor('YELLOW')
                .setTimestamp();
            await channel.send(message.guild.roles.cache.get('812296806590316594'), embed);
            await message.channel.send(`I have created your ticket, go here: <#${channel.id}>.`)
        })
    }
}
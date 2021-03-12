const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'embed',
    description: 'Makes an embed based on the JSON data provided.',
    aliases: ['make-embed', 'makembed'],
    cooldown: 6000,
    usage: '[#channel] [json data]',
    run: async (bot, message, args) => {
        const channel = message.mentions.channels.first();

        if (!channel) return message.channel.send('You must mention a channel to send the embed to.');
        let deleteOrNot = false
        if (channel.id == message.channel.id) deleteOrNot = true;

        try {
            const json = JSON.parse(args.slice(1).join(' '));
            const { text = '' } = json

            channel.send(text, {
                embed: json,
            })
        } catch (err) {
            message.channel.send(`Something went wrong when sending the embed. \`${err.message}\`.`);
        }

        bot.cooldown.set(`embed${message.author.id}`, Date.now() + 6000);
    }
}
const Discord = require('discord.js');

module.exports = {
    name: 'firstmessage',
    description: 'Shows the first message sent in the channel.',
    aliases: ['first-message'],
    cooldown: 5000,
    run: async (bot, message, args) => {
        const fetchedMessages = await message.channel.messages.fetch({ after: 1, limit: 1 });
        const m = fetchedMessages.first();

        message.channel.send(
            new Discord.MessageEmbed()
                .setDescription(`**${m}**`)
        )
    }
}
const Discord = require('discord.js');

module.exports = {
    name: 'unlock',
    description: 'Unlocks a channel.',
    aliases: ['lock-channel'],
    cooldown: 10000,
	permissions: 'MANAGE_CHANNELS',
    run: async (bot, message, args) => {
        const role = message.guild.roles.cache.get('812296964124442634')
        let lockChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if (!lockChannel) lockChannel = message.channel;

        lockChannel.updateOverwrite(role, {
            SEND_MESSAGES: true
        }).catch(err => console.log(err))
        lockChannel.setName(lockChannel.name.replace('🔒-', ''));
        message.channel.send('You have unlocked the channel.')

        bot.cooldown.set(`unlock${message.author.id}`, Date.now() + 10000);
    }
}
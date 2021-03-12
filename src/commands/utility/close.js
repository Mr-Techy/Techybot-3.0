module.exports = {
    name: 'close',
    description: 'Deletes a ticket.',
    aliases: ['closechannel'],
    cooldown: 60000,
    run: async (bot, message, args) => {
        if (message.channel.parentID !== '814615460976918541') return message.channel.send('You must be in a ticket to close one.');
        
        message.react('✅');
        let channel = message.guild.channels.cache.find(ch => ch.name == message.author.id);
        channel.delete();
    }
}
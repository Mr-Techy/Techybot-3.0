const { hangman } = require('reconlx');

module.exports = {
    name: 'hangman',
    description: 'Starts a game of hangman.',
    aliases: ['hang-game'],
    usage: '[#channel] [word]',
    cooldown: 3600000,
    run: async (bot, message, args) => {
        if (!message.member.roles.cache.some(role => role.id === '815727600851877908')) return message.channel.send('You do not have permission to start games.');
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if (!channel) return message.channel.send('You must mention a channel to start the game in.');

        const word = args.slice(1).join(' ');
        if (!word) return message.channel.send('You must state a word to guess.');

        message.delete();
        const hang = new hangman({
            message: message,
            word: word,
            client: bot,
            channelID: channel.id
        })

        hang.start();
        bot.cooldown.set(`hangman${message.author.id}`, Date.now() + 3600000);
    }
}
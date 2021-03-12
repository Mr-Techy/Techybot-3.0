module.exports = {
    name: 'emojify',
    description: 'Emojifies the given text.',
    aliases: ['emoji', 'make-emoji', 'makeemoji'],
    usage: '[text]',
    cooldown: 1000,
    run: async (bot, message, args) => {
        if (!args.length) return message.channel.send('You must state something for me to emojify.');
        
        const specialCodes = {
            '0': ':zero:',
            '1': ':one:',
            '2': ':two:',
            '3': ':three:',
            '4': ':four:',
            '5': ':five:',
            '6': ':six:',
            '7': ':seven:',
            '8': ':eight:',
            '9': ':nine:',
            '#': ':hash:',
            '*': ':asterisk:',
            '?': ':grey_question:',
            '!': ':grey_exclamation:',
            ' ': '   ',
        }
        const text = args.join(' ').toLowerCase().split('').map(letter => {
            if (/[a-z]/g.test(letter)) {
                return `:regional_indicator_${letter}:`
            } else if (specialCodes[letter]) {
                return `${specialCodes[letter]}`
            };
            return letter;
        }).join('');

        message.channel.send(text);
        bot.cooldown.set(`emojify${message.author.id}`, 1000);
    }
}
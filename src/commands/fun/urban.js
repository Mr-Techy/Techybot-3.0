const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'urban',
    description: 'Gives the urban dictionary definition of the given word.',
    aliases: ['urban-dictionary', 'urbandictionary'],
    usage: '[word(s)]',
    cooldown: 5000,
    run: async (bot, message, args) => {
        let query = args.join(' ');
        if (!query) return message.channel.send('You must state a word.');
        query = encodeURIComponent(query)

        const { data: { list } } = await axios.get(`https://api.urbandictionary.com/v0/define?term=${query}`);

        const [ answer ] = list;

        message.channel.send(
            new MessageEmbed()
                .setTitle(answer.word)
                .setURL(answer.permaLink)
                .setColor('BLURPLE')
                .addField('DEFINITION', trim(answer.definition), true)
                .addField('EXAMPLE', trim(answer.example), true)
                .setFooter(`${answer.thumbs_up} 👍 || ${answer.thumbs_down} 👎`)
        )
    }
}

function trim(input) {
    return input.length > 1024 ? `${input.slice(0, 1020)} ... ` : input
}
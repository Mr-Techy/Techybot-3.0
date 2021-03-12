const { Util } = require('discord.js');

module.exports = {
    name: 'steal-emoji',
    description: 'Steals an emoji from another server.',
    aliases: [''],
    usage: '[emoji] (emoji)',
	permissions: 'MANAGE_EMOJIS',
    run: async (bot, message, args) => {
        if (!args.length) return message.channel.send('Please state an emoji to steal.');

        for (const rawEmoji of args) {
            const parsedEmoji = Util.parseEmoji(rawEmoji);

            if (parsedEmoji.id) {
                const extension = parsedEmoji.animated ? ".gif" : ".png";
                const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + extension}`;
                message.guild.emojis.create(url, parsedEmoji.name)
                    .then(emoji => message.channel.send(`Added \`${emoji.url}\``))
            }
        }
    }
}
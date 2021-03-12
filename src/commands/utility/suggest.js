const Discord = require('discord.js');
const db = require('quick.db')

module.exports = {
	name: 'suggest',
	description: 'Sends a suggestion to the suggestions channel.',
	aliases: ['setsuggestion', 'makesuggestion'],
	usage: '[suggestion]',
	cooldown: 18000000,
	run: async (bot, message, args) => {

		const suggestion = args.join(' ');
		const suggChannel = message.guild.channels.cache.find(ch => ch.name == 'suggestions');

		if (!suggestion) return message.channel.send('You must state your suggestion.');
		if (!suggChannel) return message.channel.send('There is no suggestion channel.');

		const embed = new Discord.MessageEmbed()
			.setTitle(`New Suggestion by ${message.author.username}`)
			.setDescription(suggestion)
			.setAuthor(message.author.username, message.author.displayAvatarURL())
			.setColor('PURPLE')
			.setFooter(`PENDING`)
			.setTimestamp();
		suggChannel.send(embed).then(msg => msg.react('819260934169034793')).then(r => r.message.react('819261141514453053'));
		
		message.channel.send(`I have submitted your suggestion.`);
		bot.cooldown.set(`suggest${message.author.id}`, Date.now() + 18000000);
	}
}
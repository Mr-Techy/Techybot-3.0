const canvacord = require('canvacord');
const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'youtube',
	description: 'Makes a youtube comment.',
	aliases: ['comment'],
	run: async (bot, message, args) => {
		const user = message.mentions.users.first() || message.guild.users.cache.get(message.author.id);

		let comment = args.join(" ");
		if (!comment) return message.channel.send('You must provide some text.');
 
	}
}
const Discord = require('discord.js');
const ms = require('ms');

module.exports = {
	name: 'giveaway',
	description: 'Starts a giveaway.',
	aliases: ['give'],
	cooldown: 5000,
	run: async (bot, message, args) => {
		if (!message.member.roles.cache.get('812400318846599200')) return message.channel.send('You do not have permission to start a giveaway.');
		// -give #giveaways 10s prize

		const channel = message.mentions.members.first();
		const time = args[1];
		const prize = args.slice(2).join(' ');

		if (!args[0]) return message.channel.send()
		bot.cooldown.set(`giveaway${message.author.id}`, Date.now() + 5000);
	}
}
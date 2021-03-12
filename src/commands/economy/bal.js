const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	name: 'bal',
	description: 'Gives the user\'s balance.',
	aliases: ['balance', 'money'],
	usage: '(@member)',
	cooldown: 2500,
	run: async (bot, message, args) => {
		bot.cooldown.set(`bal${message.author.id}`, Date.now() + 2500);
	}
}
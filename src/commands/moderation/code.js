const Discord = require('discord.js');
const fs = require('fs');
const ms = require('ms');
const fetch = require('node-fetch');
const { inspect } = require('util');

module.exports = {
	name: 'code',
	description: 'Evaluates the given set of code.',
	aliases: ['eval'],
	usage: '[code to evaluate]',
	run: async (bot, message, args) => {
		if (message.author.id != message.guild.owner.id) return

		const code = args.join(' ');
		if (!code) {
			message.delete();
			message.author.send('You must input some code.');
			return;
		}
		
		message.delete();
		
		eval(code);
	}
}
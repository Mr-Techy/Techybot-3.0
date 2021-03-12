const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'rps',
	description: 'An online rock paper scissors game.',
	aliases: ['rockpaperscissors'],
	cooldown: 5000,
	usage: '[rock / paper / scissors]',
	run: async (bot, message, args) => {
		const botChoice = Math.floor(Math.random() * 2) + 1; // Gets a random number between 1 and 3.
		let botEmoji;
		let playerEmoji;
		let botChoiceStr;
		let embed = new MessageEmbed()
			.setTimestamp()
			.setAuthor(message.author.username, message.author.displayAvatarURL())
			.setFooter(message.guild.name)

		if (!args[0]) return message.channel.send(`You must state your choice. \`-rps [rock / paper / scissors]\``);
		if (!args[0].startsWith('r') && !args[0].startsWith('p') && !args[0].startsWith('s')) return message.channel.send(`That is not a valid option.`);

		if (botChoice == 1) {
			botChoiceStr = 'rock';
			botEmoji = ':rock: Rock';
		}
		if (botChoice == 2) {
			botChoiceStr = 'paper';
			botEmoji = ':newspaper: Paper';
		}
		if (botChoice == 3) {
			botChoiceStr = 'scissors';
			botEmoji = ':scissors: Scissors';
		}

		if (args[0].startsWith('r')) playerEmoji = ':rock: Rock';
		if (args[0].startsWith('p')) playerEmoji = ':newspaper: Paper';
		if (args[0].startsWith('s')) playerEmoji = ':scissors: Scissors';

		let array = ['r', 'p', 's'];

		for (const letter of array) {
			if (args[0].startsWith(array[`${letter}`]) && botChoiceStr.startsWith(array[`${letter}`])) {
				embed.setTitle(`TIE`);
				embed.setDescription(`I picked ${botEmoji}, you picked ${playerEmoji}`);
				message.channel.send(embed);
				return;
			};
		};
		
		if (args[0].startsWith('r')) {
			if (botChoiceStr.startsWith('p')) {
				embed.setTitle(`LOSE`);
				embed.setDescription(`I picked ${botEmoji}, you picked ${playerEmoji}`);
			} else {
				embed.setTitle(`WIN`);
				embed.setDescription(`I picked ${botEmoji}, you picked ${playerEmoji}`);
			}
		} else if (args[0].startsWith('s')) {
			if (botChoiceStr.startsWith('r')) {
				embed.setTitle(`LOSE`);
				embed.setDescription(`I picked ${botEmoji}, you picked ${playerEmoji}`);
			} else {
				embed.setTitle(`WIN`);
				embed.setDescription(`I picked ${botEmoji}, you picked ${playerEmoji}`);
			}
		} else {
			if (botChoiceStr.startsWith('s')) {
				embed.setTitle(`LOSE`);
				embed.setDescription(`I picked ${botEmoji}, you picked ${playerEmoji}`);
			} else {
				embed.setTitle(`WIN`);
				embed.setDescription(`I picked ${botEmoji}, you picked ${playerEmoji}`);
			}
		}

		message.channel.send(embed);
		
		bot.cooldown.set(`rps${message.author.id}`, Date.now() + 5000);
	}
}
const Discord = require('discord.js');

module.exports = {
	name: 'avatar',
	aliases: [''],
	description: 'Gives a user\'s avatar.',
	usage: '(@member)',
	cooldown: 5000,
	run: async (bot, message, args) => {
		const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;

		const embed = new Discord.MessageEmbed()
			.setImage(mentionedMember.user.displayAvatarURL());
		message.channel.send(embed);
		bot.cooldown.set(`avatar${message.author.id}`, Date.now() + 5000);
	}
}
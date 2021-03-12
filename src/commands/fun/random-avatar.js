const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'random-avatar',
	description: "Gives the avatar of a random person in the guild.",
	aliases: ['randomavatar'],
	cooldown: 5000,
	run: async (bot, message, args) => {
		const user = bot.people.cache.random();

		message.channel.send(
			new MessageEmbed()
				.setImage(user.displayAvatarURL())
				.setColor('BLUE')
				.setFooter(user.username + '\'s Avatar')
		)

		bot.cooldown.set(`random-avatar${message.author.id}`, Date.now() + 5000);
	}
}
const canvacord = require('canvacord');
const { MessageAttachment } = require('discord.js');
const db = require('quick.db');

module.exports = {
	name: 'rank',
	description: 'Gives the user\'s rank.',
	aliases: ['lvl', 'level'],
	cooldown: 5000,
	usage: '(@member)',
	run: async (bot, message, args) => {
		let user = message.mentions.users.first() || message.author;

		let xp = parseInt(db.get(`leveling.${message.author.id}.xp`));
		let level = parseInt(db.get(`leveling.${message.author.id}.level`));
		let neededXP = level * 65;
		
		const rank = new canvacord.Rank()
			.setAvatar(user.displayAvatarURL({ dynamic: false, format: 'png' }))
			.setCurrentXP(xp)
			.setRequiredXP(neededXP)
			.setLevel(level)
			.setStatus(user.presence.status)
			.setProgressBar('#FFA500', 'COLOR')
			.setUsername(user.username)
			.setDiscriminator(user.discriminator);
		rank.build()
			.then(data => {
				const attachment = new MessageAttachment(data, 'rank.png');
				message.channel.send(attachment);
			})
	}
}
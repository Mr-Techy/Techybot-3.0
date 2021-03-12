const Discord = require('discord.js');

module.exports = {
	name: 'kick',
	aliases: '',
	description: 'Kicks a member.',
	usage: '[@member] [reason]',
	cooldown: 10000,
	permissions: 'KICK_MEMBERS',
	run: async (bot, message, args) => {
		const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		const reason = args.slice(1).join(' ');

		if (!args[0]) return message.channel.send('You must mention a member.');
		if (!mentionedMember) return message.channel.send('That member does not exist.');
		if (mentionedMember.id = message.author.id) return message.channel.send('You can\'t kick yourself!');
		if (!mentionedMember.kickable) return message.channel.send('I do not have permission to kick that member.');
		if (mentionedMember.roles.cache.highest.position >= message.member.roles.cache.highest.position) return message.channel.send('You cannot kick a member who is higher than you.');
		if (!reason) return message.channel.send('You must state a reason to kick them for.');

		const embed = new Discord.MessageEmbed()
			.setTitle('You have been kicked.')
			.setDescription(`Moderator: ${message.author}\nReason: ${reason}`)
			.setColor('ORANGE')
			.setFooter(message.guild.name)
			.setTimestamp();
		
		try {
			mentionedMember.send(embed);
			mentionedMember.kick(reason);
		} catch (err) {
			console.log(err);
			message.channel.send(`I could not kick that member. Error: \`${err}\``);
			return
		}

		message.channel.send(`I have kicked ${mentionedMember} for \`${reason}\`.`);
		bot.cooldown.set(`kick${message.author.id}`, Date.now() + 10000);
	}
}
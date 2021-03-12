const Discord = require('discord.js');
const ms = require('ms');

module.exports = {
	name: 'tempmute',
	description: 'Temporarily mutes a member for a certain amount of time.',
	aliases: ['tmute'],
	usage: '[@member] [time] (reason)',
	cooldown: 30000,
	permissions: 'MUTE_MEMBERS',
	run: async (bot, message, args) => {
		const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		const time = args[1];
		const reason = args.slice(2).join(' ');
		const { send } = message.channel
		const memberRole = message.guild.roles.cache.find(r => r.name.includes('Member'));
		const mutedRole = message.guild.roles.cache.find(r => r.name.includes('Muted'));

		if (!args[0]) return send('You must mention a member.');
		if (!mentionedMember) return send('That is not a valid member.');
		if (!time) return send('You must state a time to mute them for.');

		const embed = new Discord.MessageEmbed()
			.setTitle('You have been muted in the DisCraft Empire')
			.setDescription(`**Moderator:** ${message.author}\nReason: ${reason || "No reason provided."}`)
			.setColor('YELLOW')
			.setTimestamp();

		await mentionedMember.roles.add(mutedRole.id);
		await mentionedMember.roles.remove(memberRole.id);
		await mentionedMember.send(embed);
		send(`You have muted ${mentionedMember} for ${time}.`);

		setTimeout(async () => {
			await mentionedMember.roles.add(memberRole.id);
			await mentionedMember.roles.remove(mutedRole.id);
			await mentionedMember.send('You have been unmuted in the DisCraft Empire.');
		}, ms(time));
		bot.cooldown.set(`tempmute${message.author.id}`, Date.now() + 30000);
	}
}
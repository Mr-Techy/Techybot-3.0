const Discord = require('discord.js');

module.exports = {
	name: 'nuke',
	description: 'Clones then deletes the channel to remove all messages.',
	aliases: '',
	cooldown: 15000,
	permissions: 'MANAGE_CHANNELS',
	run: async (bot, message, args) => {
		// -nuke reason
		
		// variables:

		let reason = args.join(" ");
		const nukeChannel = message.channel;

		// input checking:

		if (!reason) reason = "No reason provided.";
		if (!nukeChannel.deletable) return message.chanel.send('This channel is not deletable.');

		// executing:

		await nukeChannel.clone().catch(err => console.log(err));
		await nukeChannel.delete(reason).catch(err => console.log(err));

		const nukeText = new Discord.MessageEmbed()
			.setTitle(`${message.channel.name} was nuked by ${message.author.tag}.`)
			.setColor('RANDOM')
			.setTimestamp();
		const logsChannel = message.guild.channels.cache.find(ch => ch.name.includes('logs'));

		logsChannel.send(nukeText);
		bot.cooldown.set(`nuke${message.author.id}`, Date.now() + 15000);
	}
}
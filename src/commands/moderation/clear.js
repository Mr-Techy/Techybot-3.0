const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'clear',
	aliases: ['purge'],
	description: 'Clears a set of messages.',
	usage: '[number of messages to delete]',
	cooldown: 10000,
	permissions: 'MANAGE_MESSAGES',
	run: async (bot, message, args) => {
		const num = (args[0]);

		if (!num) return message.channel.send('You must state a number of messages to delete.');
		if (num.isNaN || num.includes('.') || num < 1) return message.channel.send('Your number must be a whole number what is greater than 5.');

		message.channel.bulkDelete(parseInt(num) + 1);
		message.channel.send(`You have deleted \`${num}\` messages.`).then(msg => msg.delete({ timeout: 3000 }));

		const embed = new MessageEmbed()
			.setAuthor(message.author.tag, message.author.displayAvatarURL())
			.setTitle(`Purged Messages`)
			.setDescription(`-clear ${num}`)
			.setColor('BLURPLE')
			.setFooter(`#${message.channel.name}`)
			.setTimestamp();
		
		const logsChannel = message.guild.channels.cache.find(ch => ch.name.includes('logs'));
		logsChannel.send(embed);

		bot.cooldown.set(`clear${message.author.id}`, Date.now() + 10000);
	}
}
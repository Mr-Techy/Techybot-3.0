const Discord = require('discord.js');

module.exports = {
	name: 'deny',
	description: 'Denies a suggestion.',
	aliases: ['deny-suggestion'],
	permissions: "MANAGE_CHANNELS",
	run: async (bot, message, args) => {
		const messageID = args[0];
		const denyReason = args.slice(1).join(' ');

		if (!messageID) return message.channel.send(`You must state the suggestion ID.`);
		if (isNaN(messageID)) return message.channel.send(`That is not a valid ID.`);
		if (!denyReason) return message.channel.send(`You must state a reason to deny it.`);

		try {
			const suggChannel = message.guild.channels.cache.get('819205082330955786');
			const suggEmbed = await suggChannel.messages.fetch(messageID);
			const data = suggEmbed.embeds[0];

			const deniedEmbed = new Discord.MessageEmbed()
				.setAuthor(data.author.name, data.author.iconURL)
				.setTitle(`New suggestion by ${data.author.name}`)
				.setColor(`RED`)
				.setDescription(data.description)
				.setFooter(`DENIED - ${denyReason}`)
				.setTimestamp();
			
			suggEmbed.edit(deniedEmbed);

			const user = await message.guild.users.cache.find(i => i.name == data.author.name);
			user.send(`Your suggestion to \`${data.description}\` has been denied!`);
		} catch (err) {
			message.channel.send(`I could not find that suggestion.`);
		}
	}
}
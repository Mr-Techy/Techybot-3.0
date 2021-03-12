module.exports = {
	name: 'say',
	description: "Says what you want it to say.",
	aliases: ['repeat'],
	cooldown: 5000,
	permissions: 'SEND_MESSAGES',
	run: async (bot, message, args) => {
		let query = args.join(' ');
		if (!query) return message.channel.send(`You must say something for me to say.`);

		message.delete();
		message.channel.send(query);

		bot.cooldown.set(`say${message.author.id}`, Date.now() + 5000);
	}
}
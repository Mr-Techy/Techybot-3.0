const alexa = require('alexa-bot-api');
const chatbot = new alexa("");

module.exports = {
	name: "chat",
	aliases: ['alexa'],
	description: 'Chat with an AI.',
	usage: '[question]',
	run: async (bot, message, args) => {
		const q = args.join(' ');

		if (!q) return message.channel.send('You must ask me a question.');

		message.channel.startTyping();

		chatbot.getReply(q).then(r => {
			message.reply(r);
			message.channel.stopTyping(true);
		})
	}
}
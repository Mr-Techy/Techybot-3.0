const figlet = require('figlet');

module.exports = {
	name: 'text-art',
	description: "Changes the given text into fancy text.",
	aliases: ['textart'],
	usage: '[text]',
	run: async (bot, message, args) => {
		let font = args[0];
		if (!font) return message.channel.send(`You must choose a font, or choose "default".`);
		if (font == 'default') font = '';

		let text = args.slice(1).join(' ');
		if (!text) return message.channel.send(`You must state some text.`);

		figlet.text(text, {
			font: font,
		}, async (err, data) => {
			message.channel.send(`\`\`\`${data}\`\`\``);
		});
	}
}
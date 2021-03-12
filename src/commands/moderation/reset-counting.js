const db = require('quick.db');

module.exports = {
	name: "reset-counting",
	description: "Resets the number in #counting.",
	aliases: ['reset-count'],
	permissions: "ADMINISTRATOR",
	run: async (bot, message, args) => {
		db.set(`counting_num`, 1);
		db.set(`counting_lastperson`, bot);

		message.channel.send(`Reset the counter.`);
	}
}
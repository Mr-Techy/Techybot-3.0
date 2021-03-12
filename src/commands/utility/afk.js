const db = require('quick.db');

module.exports = {
	name: 'afk',
	aliases: ['setafk'],
	description: 'Sets a user\'s AFK.',
	usage: '(afk message)',
	cooldown: 60000,
	run: async (bot, message, args) => {
		let reason = args.join(' ');
		if (!reason) reason = 'No reason given.';
        db.set(`afks_${message.author.id}`, { reason: reason });
        message.channel.send('I have set your AFK.');
        
		bot.cooldown.set(`afk${message.author.id}`, Date.now() + 60000);
	}
}
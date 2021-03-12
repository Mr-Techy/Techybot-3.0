const db = require('quick.db');

module.exports = (bot, message) => {
	// LEVELING
	if (message.author.bot) return;
	if (message.author.id != '812546535895466006') return;

	if (!db.get(`leveling_${message.author.id}`)) {
		db.set(`leveling.${message.author.id}`, { xp: 0, level: 1 });
	};

	let xpAdd = Math.floor(Math.random() * 10) + 15;

	db.add(`leveling.${message.author.id}.xp`, xpAdd);

	let curLvl = db.get(`leveling.${message.author.id}.level`);
	let curXP = db.get(`leveling.${message.author.id}.xp`);
	let neededXP = curLvl * 65;

	if (curXP >= neededXP) {
		db.add(`leveling.${message.author.id}.level`, 1);
		db.subtract(`leveling.${message.author.id}.xp`, neededXP);

		if (!message.author.bot) message.channel.send(`GG ${message.author}! You just advanced to **level ${curLvl + 1}!!**`);
	};
}
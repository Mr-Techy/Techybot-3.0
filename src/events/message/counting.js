const db = require('quick.db');

module.exports = (bot, message) => {
    // COUNTING
    if (message.channel.name != 'counting') return
    if (message.author.bot) return;
    const number = db.get(`counting_num`);
	const lastPerson = db.get(`counting_lastperson`);

    if (message.content != parseInt(db.get(`counting_num`))) return message.delete();
	if (lastPerson.id != message.author.id) return message.delete();

    db.add(`counting_num`, 1);
	db.set(`counting_lastperson`, message.author);
}
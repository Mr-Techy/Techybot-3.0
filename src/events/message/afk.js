const db = require('quick.db');

module.exports = (bot, message) => {
    // AFK
    if (message.author.bot) return

    message.mentions.users.forEach(user => {
        if (message.content.includes('@everyone') || message.content.includes('@here')) return;
        if (db.get(`afks_${message.author.id}`)) return message.reply(`That user is AFK. Reason: \`${AFK[user.id].reason}\``)
    });

    if (db.get(`afks_${message.author.id}`)) {
        db.delete(`afks_${message.author.id}`);
        message.channel.send(`Welcome back ${message.author}!`);
    }
}
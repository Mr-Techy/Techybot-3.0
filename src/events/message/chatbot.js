const alexa = require('alexa-bot-api');
const chatbot = new alexa();

module.exports = (bot, message) => {
    // CHATBOT AI
    if (message.author.bot || message.channel.id !== '8130770930004131841') return;
    message.channel.startTyping();

    const q = message.content;
    chatbot.getReply(q).then(r => {
        message.reply(r);
        message.channel.stopTyping(true);
    });
}
const { fetchTranscript } = require('reconlx');
const { MessageAttachment } = require('discord.js');

module.exports = {
    name: 'transcript',
    description: 'Fetches a transcript of the last few messages sent in that channel.',
    aliases: [''],
    usage: '[number of messages]',
    cooldown: 10000,
	permissions: 'ADMINISTRATOR',
    run: async (bot, message, args) => {
        let number = parseInt(args[0]);
        if (!number) return message.channel.send('You must provide a number of messages to transcript.');

        fetchTranscript(message, number)
            .then((data) => {
                const file = new MessageAttachment(data, 'transcript.html');
                message.author.send(file);
				message.channel.send(`I have DM\'d you the transcript.`)
            })
    }
}
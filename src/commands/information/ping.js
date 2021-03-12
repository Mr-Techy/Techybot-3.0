module.exports = {
	name: 'ping',
	aliases: [''],
	description: 'Pong!',
	cooldown: 1000,
	run: async (bot, message, args) => {
		message.channel.send('Pong!').then(msg => {
			const ping = msg.createdTimestamp - message.createdTimestamp;
			msg.edit(`Pong! Response ping is ${ping}ms. WebSocket ping is ${bot.ws.ping}ms.`);
		})
		bot.cooldown.set(`ping${message.author.id}`, Date.now() + 1000);
	}
}
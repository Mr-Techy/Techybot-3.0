const fetch = require('node-fetch')

module.exports = {
	name: 'joke',
	description: 'Gives a joke.',
	aliases: '',
	cooldown: 1000,
	run: async (bot, message, args) => {
		let getJoke = async () => {
			let result = await fetch("https://official-joke-api.appspot.com/random_joke")
			let json = await result.json()
			return json
		}
		let joke = await getJoke();
		message.channel.send(`**${joke.setup}**\n${joke.punchline}`);
		bot.cooldown.set(`joke${message.author.id}`, Date.now() + 1000);
	}
}
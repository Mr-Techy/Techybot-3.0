module.exports = {
	name: 'status',
	description: "Shows the bot\'s status page.",
	aliases: [''],
	run: async (bot, message, args) => {
		message.channel.send(`I am online and running!\nYou can check my uptime history here: https://stats.uptimerobot.com/VlRW9Cl3nY/787479397`)
	}
}
const Discord = require('discord.js');

module.exports = {
	name: '8ball',
	aliases: ['eightball'],
	description: 'Gives a random reply to their message.',
	usage: '[question]',
	cooldown: 1000,
	run: async (bot, message, args) => {
		if (!args[1]) return message.channel.send(`Please ask a full question.`)
		let replies = ['Yes', 'No', 'Maybe', 'As I see it, yes.', 'Ask again later.', 'Better not tell you now.', 'Don\'t count on it.', 'It is certain.', 'It is decidedly so.', 'Most likely.', 'My sources say no.', 'Outlook not so good.', 'Outlook good.', 'Reply hazy, try again.', 'Signs point to yes.', 'Very doubtful.', 'Without a doubt.', 'Yes – definitely.', 'You may rely on it.'];

		let result = Math.floor((Math.random() * replies.length));
		let question = args.slice(0).join(' ');

		let msg = await message.channel.send(`Rolling an answer...`)
		let ballEmbed = new Discord.MessageEmbed()
			.setAuthor(message.author.tag)
			.addField('Question:', question)
			.addField('Answer:', replies[result])
			.setThumbnail('https://magic-8ball.com/assets/images/magicBallStart.png')
			.setColor('RANDOM')
			.setTimestamp();
		msg.edit(ballEmbed)
		bot.cooldown.set(`8ball${message.author.id}`, Date.now() + 1000);
	}
}
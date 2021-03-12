const Discord = require('discord.js');
const got = require('got')

module.exports = {
	name: 'meme',
	description: 'Is the template for other commands..',
	aliases: [''],
	cooldown: 1000,
	run: async (bot, message, args) => {
		const embed = new Discord.MessageEmbed()
		got('https://www.reddit.com/r/dankmemes/random/.json').then(response => {
			let content = JSON.parse(response.body);
			let permalink = content[0].data.children[0].data.permalink;
			let memeUrl = `https://reddit.com${permalink}`;
			let memeImage = content[0].data.children[0].data.url;
			let memeTitle = content[0].data.children[0].data.title;
			let memeUpvotes = content[0].data.children[0].data.ups;
			let memeDownvotes = content[0].data.children[0].data.downs;
			let memeNumComments = content[0].data.children[0].data.num_comments;
			embed.setTitle(`${memeTitle}`)
			embed.setURL(`${memeUrl}`)
			embed.setImage(memeImage)
			embed.setColor('RANDOM')
			embed.setFooter(`👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`)
			message.channel.send(embed);
		})
		bot.cooldown.set(`meme${message.author.id}`, Date.now() + 1000);
	}
}
module.exports = {
	name: 'invites',
	aliases: [''],
	description: 'Gives the invite links and users of the guild.',
	cooldown: 15000,
	run: async (bot, message, args) => {
		const { guild } = message

		guild.fetchInvites().then((invite) => {
			const inviteCounter = {}

			invite.forEach((invite) => {
				const { uses, inviter } = invite
				const { username, discriminator } = inviter

				const name = `${username}#${discriminator}`

				inviteCounter[name] = (inviteCounter[name] || 0) + uses
			})

			let replyText = '**Invites:**\n'

			const sortedInvites = Object.keys(inviteCounter).sort((a, b) => inviteCounter[b] - inviteCounter[a])

			//sortedInvites.length = 3

			for (const invite of sortedInvites) {
				const count = inviteCounter[invite]
				replyText += `\n**${invite}** has invited *${count}* member(s).`
			}

			message.channel.send(replyText)
		})
		bot.cooldown.set(`invites${message.author.id}`, Date.now() + 15000);
	}
}
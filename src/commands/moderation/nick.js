module.exports = {
	name: 'nick',
	description: 'Changes the nickname of the specified user.',
	aliases: '',
	usage: '[@member] [new nickname]',
	cooldown: 15000,
	run: async (bot, message, args) => {
    	// -nick @user nickname
    	const mentionedMember = message.mentions.members.first();

		if (mentionedMember === message.author) {
			if(message.member.hasPermission('CHANGE_NICKNAME')) {
				const selfNickName = args.slice(1).join(' ');

				await message.member.setNickname(selfNickName).then(message.channel.send(`Changed your nickname to ${selfNickName}.`)).catch(err => console.log(err))
			}
		};
		if (mentionedMember !== message.author) {
			if(message.member.hasPermission('MANAGE_NICKNAMES')) {
				if (!mentionedMember) return message.channel.send('You must mention a member.');
				let nickName = args.slice(1).join(' ');

				if (nickName === 'reset') nickName = mentionedMember.user.username;

				try {
					await mentionedMember.setNickname(nickName).catch(err => console.log(err));
					message.channel.send(`Changed ${mentionedMember.user.username}\'s nickname to ${nickName}.`)
				} catch(err) {
					console.log(err)
					message.channel.send('I was not able to change their nickname.')
				}
			} else return message.channel.send('You do not have permission to use this command.')
		};
		bot.cooldown.set(`nick${message.author.id}`, Date.now() + 15000);
	}
}
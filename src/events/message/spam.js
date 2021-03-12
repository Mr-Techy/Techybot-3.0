const usersMap = new Map();
const LIMIT = 5
const TIME = 7000;
const DIFF = 3000;

module.exports = async (bot, message) => {
	if (message.author.bot) return;
	if (usersMap.has(message.author.id)) {
		const userData = usersMap.get(message.author.id);
		const { lastMessage, timer } = userData;
		const difference = message.createdTimestamp - lastMessage.createdTimestamp;
		let msgCount = userData.msgCount;

		if (difference > DIFF) {
			clearTimeout(timer);
			userData.msgCount = 1;
			userData.lastMessage = message;
			userData.timer = setTimeout(() => {
				usersMap.delete(message.author.id);
			}, TIME);
			usersMap.set(message.author.id, userData)
		} else {
			++msgCount;
			if (parseInt(msgCount) === LIMIT) {
				let muteRole = message.guild.roles.cache.get('813876000676118591');
				let memberRole = message.guild.roles.cache.get('812296964124442634');

				message.member.roles.add(muteRole.id);
				message.member.roles.remove(memberRole.id);
				message.delete();

				setTimeout(() => {
					message.author.send('You have been unmuted');

					message.member.roles.add(memberRole.id);
					message.member.roles.remove(muteRole.id);
				}, TIME);
			} else {
				userData.msgCount = msgCount;
				usersMap.set(message.author.id, userData)
			}
		}
	} else {
		let fn = setTimeout(() => {
			usersMap.delete(message.author.id);
		}, TIME);
		
		usersMap.set(message.author.id, {
			msgCount: 1,
			lastMessage: message,
			timer: fn
		})
	}
}
module.exports = async (bot, member, guild) => {
    let memberRole = guild.roles.cache.get('812296964124442634');

	await guild.members.cache.get(member.id).roles.add(memberRole);
	member.send('Thank you for joining the Discraft Empire!');
}
const { Util } = require('discord.js');

module.exports = {
    name: 'server-lock',
    description: 'Locks down the entire server.',
    aliases: ['lockdown'],
	cooldown: 5000,
	permissions: 'MANAGE_CHANNELS',
    run: async (bot, message, args) => {
		const role = message.guild.roles.cache.find(r => r.name.includes('Member'));
		const perms = role.permissions.toArray();

		const newPerms = perms.filter(perm => perm !== 'SEND_MESSAGES');

		await role.edit({ permissions: newPerms });
		message.channel.send('The server is now locked down.')
		
		bot.cooldown.set(`server-lock${message.author.id}`, Date.now() + 5000);
    }
}
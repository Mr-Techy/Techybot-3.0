const { Util } = require('discord.js');

module.exports = {
    name: 'server-unlock',
    description: 'Unlocks the server..',
    aliases: ['sunlock'],
	cooldown: 5000,
	permissions: 'MANAGE_CHANNELS',
    run: async (bot, message, args) => {
		const role = message.guild.roles.cache.find(r => r.name.includes('Member'));
		const perms = role.permissions.toArray();

		perms.push('SEND_MESSAGES');
		
		await role.edit({ permissions: perms });

		message.channel.send('The server has been unlocked.');

        bot.cooldown.set(`server-unlock${message.author.id}`, Date.now() + 5000);
    }
}
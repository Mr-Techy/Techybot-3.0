const ms = require('ms');
const schema = require('../../models/custom-commands.js');
const db = require('../../reconDB');
let quickDB = require('quick.db');

module.exports = async (bot, message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(bot.prefix)) return;
    if (!message.member) message.member = await message.guild.members.cache.get(message.author.id);

    const args = message.content.slice(bot.prefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();

    if (cmd.length == 0) return;

	const data = await schema.findOne({ Guild: message.guild.id, Command: cmd })

	if (data) {
		message.channel.send(data.Response);
		return;
	};

	const customCommand = await db.get(cmd);

	if (customCommand) {
		await eval(customCommand.response);
		return;
	};

    let command = bot.commands.get(cmd);
    if (!command) command = bot.commands.get(bot.aliases.get(cmd));

    try {
        if (command) {
            if (command.cooldown) {
                if (bot.cooldown.has(`${command.name}${message.author.id}`)) return message.channel.send(`You must wait \`${ms(bot.cooldown.get(`${command.name}${message.author.id}`) - Date.now(), { long: true })}\` before you can use the ${command.name} command again.`);
				
                if (command.ownerOnly) {
					if (message.author.id != bot.owner.id) return message.channel.send(`Only ${bot.owner.tag} can use this command.`)
				}
				if (command.permissions) {

					if (!message.member.hasPermission(command.permissions)) return message.channel.send(`You need the \`${command.permissions}\` permission to use the \`${cmd}\` command.`);
				}

				command.run(bot, message, args);

				quickDB.add(`people`, 1);
				bot.people = quickDB.get(`people`);

                setTimeout(() => {
                    bot.cooldown.delete(`${command.name}${message.author.id}`)
                }, command.cooldown);
            } else {
				if (command.permissions) {
					if (!message.member.hasPermission(command.permissions)) return message.channel.send(`You need the \`${command.permissions}\` permission to use the \`${cmd}\` command.`);
				}
                command.run(bot, message, args);
            }
        } else return;
    } catch (err) {
        console.error(err);
        message.channel.send(`There was an error executing the ${cmd} command. Error: \`${err}\``);
    }
}
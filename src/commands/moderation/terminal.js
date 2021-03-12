const child = require('child_process');

module.exports = {
    name: "terminal",
    description: "Runs the given code in the terminal.",
    aliases: [''],
    usage: '[terminal command]',
	permissions: 'ADMINISTRATOR',
    run: async (bot, message, args) => {
        const command = args.join(' ');
        if (!command) return message.channel.send('You must state your command to run in the terminal. Ex: \`node -v\`.');

        let msg = await message.channel.send('Loading...');

        child.exec(command, async (err, res) => {
            if (err) return console.log(err);
            msg.edit(res.slice(0, 2000), { code: 'js' })
        })
    }
}
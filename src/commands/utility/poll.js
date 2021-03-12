const Discord = require('discord.js');

module.exports = {
    name: 'poll',
    aliases: [''],
    description: 'Gives a test poll',
    usage: '[your-title] [option-1] [option-2] (option-3) (option-4)',
    run: async (bot, message, args) => {
        if (args.length > 7) return message.channel.send('You cannot have more than 7 options.');

        const embed = new Discord.MessageEmbed()
            .setColor('PURPLE');
        
        let title = args[0];
        if (!title) return message.channel.send('You must state a title. \`-poll your-title option-1 option-2\`.');
        if (title.includes('-')) {
            while (title.includes('-')) {
                title = title.replace('-', ' ');
            };
            embed.setTitle(title)
        };

        let emojis = [
            "🔵",
            "🟢",
            "🟠",
            "🟣",
            "🔴",
            "⚪",
            "🟡",
			"⚫",
        ]

        let option1 = args[1];
        if (!option1) return message.channel.send('You must state your first option. \`-poll your-title option-1 option-2\`.');
        if (option1.includes('-')) {
            while (option1.includes('-')) {
                option1 = option1.replace('-', ' ');
            };
        };
        embed.addField(`${emojis[0]} Option 1`, option1, true);

        let option2 = args[2];
        if (!option2) return message.channel.send('You must state your second option. \`-poll your-title option-1 option-2\`.');
        if (option2.includes('-')) {
            while (option2.includes('-')) {
                option2 = option2.replace('-', ' ');
            };
        };
        embed.addField(`${emojis[1]} Option 2`, option2, true);

        let amount = 2;

        for (let i = 3; i < args.length; i++) {
            let option = args[i];
            if (option.includes('-')) {
                while (option.includes('-')) {
                    option = option.replace('-', ' ');
                };
            };
            embed.addField(`${emojis[i - 1]} Option ${i}`, option, true);
            amount++;
        };

        const msg = await message.channel.send(embed)

        await msg.react(emojis[0]);
        await msg.react(emojis[1]);

        let i = 2;

        while (i < amount) {
            await msg.react(emojis[i]);
            i++;
        };
    }
}
const db = require('quick.db');
const Discord = require('discord.js');

module.exports = {
    name: 'apply',
    aliases: [''],
    description: 'Applies for staff.',
    cooldown: 86400000,
    run: async (bot, message, args) => {
        if (db.get(`apps_status`) == false) return message.channel.send(`Staff applications are currently closed. You can use this command when they are open, though!`);

        const questions = [
            "How old are you?",
            "What time zone are you in?",
            "How long will you be able to moderate? Ex: \`10:00 AM - 6:00 PM, Mon - Fri\`.",
            "Why do you want to become staff?",
            "Do you have any previous moderating experience? If so, please provide details.",
            "If a member starts spamming for the first time, what will you do?",
            "If a higher staff member is bragging about their position, what will you do?",
            "If a member reports someone DM advertising, what will you do?",
        ];

        let collectCounter = 0;
        let endCounter = 0;

        const filter = (m) => m.author.id === message.author.id;

        message.channel.send('I have sent you a DM containing further instructions.');

        const appStart = await message.author.send(questions[collectCounter++]);
        const channel = appStart.channel;

        const collector = channel.createMessageCollector(filter);

        collector.on('collect', () => {
            if (collectCounter < questions.length) {
                channel.send(questions[collectCounter++])
            } else {
                channel.send('I have sent your application.');
                collector.stop('fulfilled');
            }
        })

        const appsChannel = bot.channels.cache.get('814967772521168927');

        collector.on('end', (collected, reason) => {
            if (reason === 'fulfilled') {
                let index = 1;
                const mappedResponses = collected.map((msg) => {
                    return `**${index++}) ${questions[endCounter++]}**\n-> ${msg.content}`;
                }).join('\n\n');

                appsChannel.send(
                    new Discord.MessageEmbed()
                        .setTitle(`New Staff Application!`)
                        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                        .setDescription(mappedResponses)
                        .setColor('BLURPLE')
                        .setTimestamp()
                )
            };
        })
    }
}
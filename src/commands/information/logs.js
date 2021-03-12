const recon = require("reconlx");
const ReactionPages = recon.ReactionPages;
const { MessageEmbed } = require("discord.js");
const pagination = require('discord.js-pagination');

module.exports = {
    name: 'logs',
    description: 'Gives the logs of the bot.',
    aliases: ['updates'],
    cooldown: 60000,
    run: async (bot, message, args) => {
        let embed1 = new MessageEmbed().setTitle('Log #1').addField('Added the \'-covid\' command.', 'Gives the current COVID-19 info.').setColor('BLUE');
        let embed2 = new MessageEmbed().setTitle('Log #2').addField('Added the \'-logs\' command.', 'Gives all of the changes added to the bot.').setColor('BLUE');
        let embed3 = new MessageEmbed().setTitle('Log #3').addField('Added the \'-trivia\' command.', 'Gives a random trivia question.').setColor('BLUE');
        let embed4 = new MessageEmbed().setTitle('Log #4').addField('Added the \'-urban\' command.', 'Gives the urban dictionary description of the given word.').setColor('BLUE');

        const pages = [embed4, embed3, embed2, embed1];
        
        const emojis = ["⏪", "⏩"];
        const time = 60000;

        pagination(message, pages, emojis, time);
    }
}
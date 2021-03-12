const covid = require('novelcovid');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'covid',
    aliases: ['COVID-19', 'covid-19', 'covid19', 'corona', 'corona-info'],
    description: 'Gives the current COVID-19 info.',
    cooldown: 120000,
    run: async (bot, message, args) => {
        const covidStats = await covid.all();

        return message.channel.send(
            new MessageEmbed()
                .setTitle('Current COVID-19 Stats')
                .setColor('RED')
                .addFields(
                    { name: `Total Cases`, value: covidStats.cases.toLocaleString(), inline: true },
                    { name: `Cases Today`, value: covidStats.todayCases.toLocaleString(), inline: true },
                    { name: `Total Deaths`, value: covidStats.deaths.toLocaleString(), inline: true },
                    { name: `Deaths Today`, value: covidStats.todayDeaths.toLocaleString(), inline: true },
                    { name: `Total Recovered`, value: covidStats.recovered.toLocaleString(), inline: true },
                    { name: `Recovered Today`, value: covidStats.todayRecovered.toLocaleString(), inline: true },
                    { name: `Infected Right Now`, value: covidStats.active.toLocaleString(), inline: true },
                    { name: `Critical Condition`, value: covidStats.critical.toLocaleString(), inline: true },
                    { name: `Tested`, value: covidStats.tests.toLocaleString(), inline: true },
                )
        )
    }
}
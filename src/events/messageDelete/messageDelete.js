const { MessageEmbed } = require('discord.js');

module.exports = (bot, message) => {
    const logsChannel = message.guild.channels.cache.find(ch => ch.name.includes('logs'));
    if (!logsChannel) return;
    const embed = new MessageEmbed()
        .setTitle(`Deleted Message`)
        .setDescription(`${message.content}`)
		.setAuthor(message.author.username, message.author.displayAvatarURL())
        .setFooter(`#${message.channel.name}`)
        .setColor('BLUE')
        .setTimestamp();
    logsChannel.send(embed);
}
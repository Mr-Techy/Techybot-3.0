const { MessageEmbed } = require('discord.js');

module.exports = (bot, oldMessage, newMessage) => {
    if (oldMessage.author.bot || oldMessage.content == newMessage.content) return;
    const logsChannel = oldMessage.guild.channels.cache.find(ch => ch.name.includes('logs'));
    if (!logsChannel) return;
    const embed = new MessageEmbed()
		.setAuthor(oldMessage.author.username, oldMessage.author.displayAvatarURL())
        .setTitle(`A message was updated`)
        .setDescription(`**Old Message:** ${oldMessage.content}\n**New Message:** ${newMessage.content}`)
        .setColor('BLUE')
		.setFooter(``)
        .setTimestamp();
    logsChannel.send(embed);
}
const { tictactoe } = require("reconlx");

module.exports = {
    name: 'tictactoe',
    description: 'Starts a TicTacToe game',
    aliases: ['ttt'],
    cooldown: 10000,
    usage: '',
    run: async (bot, message, args) => {
        const member2 = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member2) return message.channel.send('You must mention a member to play with.');

        var game = new tictactoe({
            message: message,
            player_two: member2
        });
    }
}
module.exports = (bot) => {
    setInterval(async () => {
        bot.channels.cache.get('815966956892061746').send('Testing message for uptime, don\'t mind me.');
    }, 240000);
}
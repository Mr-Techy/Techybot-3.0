const {readdirSync} = require('fs');

module.exports = (bot) => {
    readdirSync('./events/').forEach(dir => {
        const events = readdirSync(`./events/${dir}/`).filter(file => file.endsWith('.js'));
        for(let file of events){
            let event = require(`../events/${dir}/${file}`);
            let eventName = dir.toString();
            bot.on(eventName, event.bind(null, bot))
        }
    });
}

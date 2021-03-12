const db = require('quick.db');

module.exports = {
    name: 'apps-status',
    description: 'Opens or closes staff applications.',
    aliases: ['appstatus', 'app-status', 'application-status'],
    usage: '[on / off]',
	permissions: 'ADMINISTRATOR',
    run: async (bot, message, args) => {        
        const status = args[0]

        if (!status) return message.channel.send('You must state the status. (on / off)');

        if (status == 'on') {
            db.set('apps_status', true);
            message.channel.send('You have enabled the staff applications.');
        } else {
            db.set('apps_status', false);
            message.channel.send('You have disabled the staff applications.');
        }
    }
}
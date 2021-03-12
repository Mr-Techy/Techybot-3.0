const { Collection, Client, MessageEmbed } = require("discord.js");
const keepAlive = require("./server");
const fs = require("fs");
const ms = require("ms");
const bot = new Client({
  disableEveryone: true,
  partials: ["MESSAGE", "CHANNEL", "REACTION"]
});
const { token } = require("./config.json");
const fetch = require("node-fetch");
const db = require("quick.db");

const mongoose = require("mongoose");

// mongoose.connect('mongodb+srv://MrTechy:valtaoi12@techybot-v3.uzjqd.mongodb.net/Data', {
//	useUnifiedTopology: true,
//	useNewUrlParser: true,
//}).then(console.log('Connected to Mongo.db!'));

module.exports = bot;
bot.cooldown = new Collection();
bot.ticketCategory = "814615460976918541";
bot.prefix = "-";
bot.token = token;
bot.people = db.get(`people`);
bot.owner = bot.users.cache.find((m) => m.tag == "Mr. Techy#0077");
bot.website = "https://Techybot-3.mrtechy11.repl.co";
bot.commands = new Collection();
bot.aliases = new Collection();
bot.categories = fs.readdirSync("./commands/");
["command", "event"].forEach((handler) => {
  require(`./handlers/${handler}`)(bot);
});

let array = [
  `${bot.people} users`,
  `-help for help`,
  `The Discraft Empire`,
  `Mr. Techy code`
];

let index = 0;

setInterval(async () => {
  if (index >= array.length) index = 0;

  await bot.user.setPresence({
    activity: {
      name: array[index],
      type: "WATCHING"
    },
    status: "idle"
  });

  index++;
}, 10000);

setInterval(async () => {
  await fetch(bot.website).then(async () => {
    bot.channels.cache
      .find((ch) => ch.name.includes(`techybot-uptime-logs`))
      .send(`Pinged website.`);
  });
}, 240000);

keepAlive(8080);

bot.login(token);

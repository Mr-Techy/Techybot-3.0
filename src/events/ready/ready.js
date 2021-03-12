const express = require('express');
const app = express();
const port = 3000 || 3001;

module.exports = (bot) => {
    console.log(`${bot.user.tag} has logged in.`);
}
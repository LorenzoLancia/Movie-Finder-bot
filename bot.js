const token = process.env.TOKEN;
const Bot = require('node-telegram-bot-api');
const searchModule = require('./modules/searchModule');
const commandModule = require('./modules/commandModule');
const callbackModule = require('./modules/callbackModule');

let bot;

if (process.env.NODE_ENV === 'production') {
    bot = new Bot(token);
    bot.setWebHook(process.env.VERCEL_URL + bot.token);
} else {
    bot = new Bot(token, { polling: true });
}

console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode');

searchModule.setup(bot);
commandModule.setup(bot);
callbackModule.setup(bot);

module.exports = bot;
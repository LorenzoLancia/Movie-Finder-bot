function setup(bot) {
    // Command /search to start the search
    bot.onText(/\/search (.+)/, function (msg, match) {
        const movie = match[1];
        const chatId = msg.chat.id;
        searchModule.getSearchResults(movie, chatId);
    });

    // Command /start for the welcome message
    bot.onText(/\/start/, function (msg) {
        var chatId = msg.chat.id;
        const name = msg.from.first_name;
        bot.sendMessage(chatId, name + ', welcome to 🎬 *Movie Finder*! \nThis bot will allow you to quickly search for information on movies and series. \n \nAvailable commands: \n- /search <_movie name_> : to start searching \n- /about : to get information about the bot', { parse_mode: 'Markdown' });
    });

    // Command /about to provide information about the bot
    bot.onText(/\/about/, function (msg) {
        var chatId = msg.chat.id;
        bot.sendMessage(chatId, '🎬 *Movie Finder* is a bot for Telegram developed by Lorenzo Lancia. \n \nIt is a project developed to test the functionality of Telegram bots. Code is available in the GitHub repository and is constantly updated. \n \nMovie Finder uses OMDb API.', {
            parse_mode: 'Markdown',
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{
                        text: '⚙️ Github',
                        url: `https://github.com/LorenzoLancia/Movie-Finder-bot`
                    },
                    {
                        text: '📩 Twitter',
                        url: `https://twitter.com/LanciaLorenzo`
                    }],
                    [{
                        text: '🗂 OMDb API',
                        url: `http://www.omdbapi.com/`
                    }],
                ],
            }),
        });
    });
}

module.exports = { setup };
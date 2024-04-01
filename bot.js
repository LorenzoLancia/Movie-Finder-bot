const token = process.env.TOKEN;
const request = require('request');
const Bot = require('node-telegram-bot-api');

let bot;

if (process.env.NODE_ENV === 'production') {
    bot = new Bot(token);
    bot.setWebHook(process.env.VERCEL_URL + bot.token);
} else {
    bot = new Bot(token, { polling: true });
}

console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode');

// Map to store message IDs and associate them with callback data
const messageCallbackMap = {};

// Function to obtain search results
function getSearchResults(movie, chatId, page = 1) {
    request(`https://www.omdbapi.com/?s=${movie}&apikey=7cd14fb&page=${page}`, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const res = JSON.parse(body);
            if (res.Response == 'True' && res.Search && res.Search.length > 0) {
                const results = res.Search.slice(0, 3); // We limit the results to 3
                const keyboard = {
                    inline_keyboard: results.map((result) => {
                        return [{
                            text: result.Title + ' (' + result.Year + ')',
                            callback_data: 'select_result_' + result.imdbID // We pass the IMDB ID as part of the callback_data
                        }];
                    })
                };

                // Add buttons to refresh results or show 3 more results
                keyboard.inline_keyboard.push([
                    {
                        text: '🔄 Refresh',
                        callback_data: `refresh_${page}`
                    },
                    {
                        text: '➕ Show more',
                        callback_data: `show_more_${page}`
                    }
                ]);

                bot.sendMessage(chatId, '🔎 _Search results for_ ' + movie + '...', { parse_mode: 'Markdown', reply_markup: JSON.stringify(keyboard) })
                    .then(sentMessage => {
                        // Store the ID of the sent message containing the results and associate it with the callback data
                        messageCallbackMap[sentMessage.message_id] = { movie, chatId, page };
                    });
            } else {
                bot.sendMessage(chatId, '🔎 _Search results for_ ' + movie + '...', { parse_mode: 'Markdown' })
                    .then(() => {
                        bot.sendMessage(chatId, 'Sorry, we didn\'t find anything. \nTry repeating the search, paying attention to capital letters. \n\n*Example*: \n✅ The Lord of the Rings \n❌ The lord of the Rings', { parse_mode: 'Markdown' });
                    });
            }
        } else {
            bot.sendMessage(chatId, 'An error occurred during the search.');
        }
    });
}

// Command /search to start the search
bot.onText(/\/search (.+)/, function (msg, match) {
    const movie = match[1];
    const chatId = msg.chat.id;
    getSearchResults(movie, chatId);
});

// Event handler for query callbacks
bot.on('callback_query', function (callbackQuery) {
    const action = callbackQuery.data.split('_');
    const messageId = callbackQuery.message.message_id;
    const { movie, chatId, page } = messageCallbackMap[messageId] || {};

    if (!action || !movie || !chatId || !page) {
        // There is no data associated with this message, do nothing
        return;
    }

    if (action[0] === 'select' && action[1] === 'result') {
        const selectedImdbID = action[2];
        // Delete message containing results
        bot.deleteMessage(chatId, messageId);
        // Send information about the selected film
        request('https://www.omdbapi.com/?i=' + selectedImdbID + '&apikey=7cd14fb', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                const movieInfo = JSON.parse(body);
                bot.sendPhoto(chatId, movieInfo.Poster, {
                    parse_mode: 'Markdown',
                    caption: `
                    *Title*: ${movieInfo.Title}                      
                    \n*Type*: ${movieInfo.Type}                      
                    \n*Release*: ${movieInfo.Released}              
                    \n*Runtime*: ${movieInfo.Runtime}                
                    \n*Genre*: ${movieInfo.Genre}                    
                    \n*Language*: ${movieInfo.Language}              
                    \n*Rating*: ${movieInfo.imdbRating}/10     
                    \n*Box Office*: ${movieInfo.BoxOffice}           
                    \n*Plot*: ${movieInfo.Plot}
                    `,
                    reply_markup: JSON.stringify({
                        inline_keyboard: [
                            [{
                                text: '💰 Amazon',
                                url: `http://www.amazon.com/s?url=search-alias%3Ddvd&field-keywords=${movieInfo.Title}`
                            },
                            {
                                text: '📺 Streaming',
                                url: `https://www.justwatch.com/it/cerca?q=${movieInfo.Title}`
                            }]
                        ]
                    }),
                });
            } else {
                bot.sendMessage(chatId, 'An error occurred while searching for the film.');
            }
        });
    } else if (action[0] === 'refresh') {
        // If the user clicked on 'Refresh', it refreshes the search results
        bot.deleteMessage(chatId, messageId);
        const newPage = parseInt(action[1]); // No need to increase the offset to refresh the results
        getSearchResults(movie, chatId, newPage);
    } else if (action[0] === 'show' && action[1] === 'more') {
        // If the user clicked on 'Show more', it shows 3 more results
        bot.deleteMessage(chatId, messageId);
        const nextPage = parseInt(action[2]) + 1; // Increase the page number to get the next results
        getSearchResults(movie, chatId, nextPage);
    }
});

// Command /start to welcome message
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

module.exports = bot;

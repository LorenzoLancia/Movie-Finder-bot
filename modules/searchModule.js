const request = require('request');
const token_api = process.env.API;

function getSearchResults(movie, chatId, page = 1) {
    request(`https://www.omdbapi.com/?s=${movie}&apikey=${token_api}&page=${page}`, function (error, response, body) {
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
                        callback_data: 'refresh'
                    },
                    {
                        text: '➕ Show more',
                        callback_data: `show_more_${page}`
                    }
                ]);

                bot.sendMessage(chatId, '🔎 _Search results for_ ' + movie + '...', { parse_mode: 'Markdown', reply_markup: JSON.stringify(keyboard) })
                    .then(sentMessage => {
                        // Store the ID of the sent message containing the results and associate it with the callback data
                        const messageCallbackData = { movie, chatId, page, results };
                        messageCallbackMap[sentMessage.message_id] = messageCallbackData;
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

module.exports = { getSearchResults };
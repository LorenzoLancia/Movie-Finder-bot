const token_api = process.env.API;

function setup(bot) {
    // Handling of callback events
    bot.on('callback_query', function (callbackQuery) {
        const action = callbackQuery.data.split('_');
        const messageId = callbackQuery.message.message_id;
        const { movie, chatId, page, results } = messageCallbackMap[messageId] || {};

        if (!action || !movie || !chatId || !page || !results) {
            // There is no data associated with this message, do nothing
            return;
        }

        if (action[0] === 'select' && action[1] === 'result') {
            const selectedImdbID = action[2];
            // Delete message containing results
            bot.deleteMessage(chatId, messageId);
            // Send information about the selected film
            request('https://www.omdbapi.com/?i=' + selectedImdbID + '&apikey=${.token_api}', function (error, response, body) {
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
            // If the user clicked on 'Refresh', it reloads the initial 3 results
            bot.deleteMessage(chatId, messageId);
            searchModule.getSearchResults(movie, chatId);
        } else if (action[0] === 'show' && action[1] === 'more') {
            // If the user clicked on 'Show more', it shows 3 more results
            bot.deleteMessage(chatId, messageId);
            const nextPage = parseInt(action[2]) + 1; // Increase the page number to get the next results
            searchModule.getSearchResults(movie, chatId, nextPage);
        }
    });
}

module.exports = { setup };
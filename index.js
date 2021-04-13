var TelegramBot = require('node-telegram-bot-api');
var token = '1710894907:AAGuzCdEXGjKNUNvZHNfmWSeFmW54dl78as';
var bot = new TelegramBot (token, {polling: true});
var request = require('request');


bot.onText(/\/search (.+)/, function(msg,match) {
    var movie = match[1];
    var chatId = msg.chat.id;
    request('https://www.omdbapi.com/?t=' + movie + '&apikey=7cd14fb', function(error,response,body) {
        if(!error && response.statusCode == 200) {
            bot.sendMessage(chatId, '🔎 _Looking for _' + movie + '...', {parse_mode:'Markdown'})
            .then(function(msg) {
                var res = JSON.parse(body); 
                bot.sendPhoto(chatId, res.Poster, {caption: 
                    'Title: ' + res.Title +                     // Returns the Title
                    '\nRelease: ' + res.Released +              // Returns the date of pubblication
                    '\nRuntime: ' + res.Runtime +               // Returns the duration
                    '\nGenre: ' + res.Genre +                   // Returns the genre
                    '\nLanguage: ' + res.Language +             // Returns the language
                    '\nRating: ' + res.imdbRating + '/10' +     // Returns the ratings from (IMDb.com)
                    '\nBox Office: ' + res.BoxOffice +          // Returns box office 
                    '\n \nPlot: ' + res.Plot })                 // Returns plot
            })      
        }
    });
});

bot.onText(/\/start/, function(msg,match) {
    var chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Welcome to 🎬 *Movie Finder*! \nWith this bot you will be able to find all information about movies and series quickly. \n \nAvailable commands: \n- /search <_movie name_>: to start searching \n- /about: to get information about the bot creator',  {parse_mode:'Markdown'});
});

bot.onText(/\/about/, function(msg,match) {
    var chatId = msg.chat.id;
    bot.sendMessage(chatId, '🎬 *Movie Finder* is a bot for Telegram developed by [Lorenzo Lancia](https://twitter.com/LanciaLorenzo). \n \nIt is a project developed to test the functionality of Telegram bots. Code is available in the [GitHub repository](https://github.com/LorenzoLancia/Movie-Finder-bot) and is constantly updated. \n \nMovie Finder uses OMDb API.', {parse_mode:'Markdown'});
});


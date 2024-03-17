const token = process.env.TOKEN;
var request = require('request');

const Bot = require('node-telegram-bot-api');
let bot;

if(process.env.NODE_ENV === 'production') {
  bot = new Bot(token);
}
else {
  bot = new Bot(token, { polling: true });
}

console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode');
// Command /search to start the search //
bot.onText(/\/search (.+)/, function(msg,match) {
  var movie = match[1];
  var chatId = msg.chat.id;
  request('https://www.omdbapi.com/?t=' + movie + '&apikey=7cd14fb', function(error,response,body) {
      if(!error && response.statusCode == 200) {
        var res = JSON.parse(body); 
        if(res.Response == 'True') {
          bot.sendMessage(chatId, '🔎 _Looking for _' + movie + '...', {parse_mode:'Markdown'})
          .then(function(msg) {
              if (res.Type == 'movie'){                           // if the search is a Movie 
                bot.sendPhoto(chatId, res.Poster,  {parse_mode:'Markdown', caption: 
                    '*Title*: ' + res.Title +                     // Returns the Title
                    '\n*Type*: ' + res.Type +                     // Returns Type movie/series
                    '\n*Release*: ' + res.Released +              // Returns the date of pubblication
                    '\n*Runtime*: ' + res.Runtime +               // Returns the duration
                    '\n*Genre*: ' + res.Genre +                   // Returns the genre
                    '\n*Language*: ' + res.Language +             // Returns the language
                    '\n*Rating*: ' + res.imdbRating + '/10' +     // Returns the ratings from (IMDb.com)
                    '\n*Box Office*: ' + res.BoxOffice +          // Returns box office 
                    '\n \n*Plot*: ' + res.Plot,                   // Returns plot

                    reply_markup: JSON.stringify({
                      inline_keyboard: [
                        [{
                          text: '💰 Amazon',
                          url: `http://www.amazon.com/s?url=search-alias%3Ddvd&field-keywords=${res.Title}`
                        },
                        {
                          text: '📺 Streaming',
                          url: `https://www.justwatch.com/it/cerca?q=${res.Title}`
                        }],
                      ],
                    })
                  
                  })            
                } else {                                          // if the search is a Serie 
                  bot.sendPhoto(chatId, res.Poster,  {parse_mode:'Markdown', caption: 
                    '*Title*: ' + res.Title +                     // Returns the Title
                    '\n*Type*: ' + res.Type +                     // Returns Type movie/series
                    '\n*Seasons*: ' + res.totalSeasons +          // Returns the total Seasons
                    '\n*Release*: ' + res.Released +              // Returns the date of pubblication
                    '\n*Runtime*: ' + res.Runtime + ' per episode' + // Returns the duration
                    '\n*Genre*: ' + res.Genre +                   // Returns the genre
                    '\n*Language*: ' + res.Language +             // Returns the language
                    '\n*Rating*: ' + res.imdbRating + '/10' +     // Returns the ratings from (IMDb.com)
                    '\n \n*Plot*: ' + res.Plot,                   // Returns plot
                    
                    reply_markup: JSON.stringify({
                      inline_keyboard: [
                        [{
                          text: '💰 Amazon',
                          url: `http://www.amazon.com/s?url=search-alias%3Ddvd&field-keywords=${res.Title}`
                        },
                        {
                          text: '📺 Streaming',
                          url: `https://www.justwatch.com/it/cerca?q=${res.Title}`
                        }],
                      ],
                    })
                  
                  })            
                }  
          })    
        }  else {
          bot.sendMessage(chatId, '🔎 _Looking for _' + movie + '...', {parse_mode:'Markdown'})
          .then(function(msg) {
            bot.sendMessage(chatId, 'I\'m sorry, we didn\'t find anything. \nTry repeating the search, paying attention to upper case. \n*Example*: \n✅ Games of Thrones \n❌ games of thrones', {parse_mode:'Markdown'})})
        }
      }
  });
});

bot.onText(/\/start/, function(msg,match) {
  var chatId = msg.chat.id;
  const name = msg.from.first_name;
  bot.sendMessage(chatId, name + ', welcome to 🎬 *Movie Finder*! \nThis bot will allow you to quickly search for information on moviews and series. \n \nAvailable commands: \n- /search <_movie name_> : to start searching \n- /about : to get information about the bot',  {parse_mode:'Markdown'});
});

// Command /about to start the search //
bot.onText(/\/about/, function(msg,match) {
  var chatId = msg.chat.id;
  bot.sendMessage(chatId, '🎬 *Movie Finder* is a bot for Telegram developed by Lorenzo Lancia. \n \nIt is a project developed to test the functionality of Telegram bots. Code is available in the GitHub repository and is constantly updated. \n \nMovie Finder uses OMDb API.', {parse_mode:'Markdown',
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

# Movie Finder
<p align="center">
  <img width="150" height="150" src="logo.png")>
</p>
<p align="center"> 
  <strong>Find information about movies and series with a single message 🎬</strong>
</p>

Movie Finder is a [Telegram](https://telegram.org/) bot that helps you quickly check basic movie information, such as release date, runtime or cast and crew members. Open a chat with [@Movie_finder_info_bot](http://telegram.me/Movie_finder_info_bot) on Telegram to try it out.

## Technology
The bot is built with [Node.js](https://nodejs.org) and [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api) a module to interact with the official Telegram Bot Api. Movie Finder is online 24 hours a day deployed thanks to [Heroku](https://heroku.com/).

⚠️ **Please note**: the bot is currently no longer online because the basic Heroku service is no longer free. 
To customize your telegram bot and see it online, we recommend using another hosting service (free or not)

## Contributions
Movie Finder is open to contributions, I recommend creating a fork before request a pull request.

## How to run locally
First you need to clone the project on your Desktop
```bash 
$ git clone https://github.com/LorenzoLancia/Movie-Finder-bot
```
- Then replace in the index.js file the ```token``` of the Telegram bot you created. If you do not know how to create a Telegram bot and get the token, you can follow the [official guide](https://core.telegram.org/bots#6-botfather). 
- As a last step, request an Api key on the [OMDb](http://www.omdbapi.com/apikey.aspx) website and replace it. 
```js 
'https://www.omdbapi.com/?t=' + movie + '&apikey=<key>'
```
- You are now ready to start the bot with the following command 
```bash 
$ node index.js
```

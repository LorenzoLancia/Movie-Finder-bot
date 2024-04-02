# Movie Finder
<p align="center">
  <img width="150" height="150" src="logo.png")>
</p>
<p align="center"> 
  <strong>Find information about movies and series with a single message 🎬</strong>
</p>

<p align="center">
  <a href="https://core.telegram.org/bots/api" target="_blank">
  <img src="https://img.shields.io/badge/Telegram%20Bot%20API-Documentation-blue?style=flat-square&logo=telegram" alt="Telegram Bot API Documentation">
</a>
  <a href="https://nodejs.org/">
    <img src="https://img.shields.io/badge/Node.js-Latest-green?style=flat-square&logo=node.js" alt="Node.js">
  </a>
  <a href="https://github.com/yagop/node-telegram-bot-api" target="_blank">
  <img src="https://img.shields.io/badge/node--telegram--bot--api-Documentation-blue?style=flat-square&logo=npm" alt="node-telegram-bot-api Documentation">
</a>
</p>


Movie Finder is a [Telegram](https://telegram.org/) bot that helps you quickly check basic movie information, such as release date, runtime or cast and crew members. Open a chat with [@Movie_finder_info_bot](http://telegram.me/Movie_finder_info_bot) on Telegram to try it out.

## Technology 🛠️
The bot is built with [Node.js](https://nodejs.org) and [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api) a module to interact with the official Telegram Bot Api. Movie Finder is online 24 hours a day deployed thanks to [Heroku](https://heroku.com/).

⚠️ **Please note**: the bot is currently no longer online because the basic Heroku service is no longer free. 

## Features 🚀 
- **Search Functionality**: Users can search for movies by title, genre, release year, or cast member.  
- **Detailed Information**: The bot provides comprehensive details about each movie, including plot summaries, ratings from various sources, cast members, and more.
- **Interactive Interface**: Users can interact with the bot through simple commands, making it easy to use and navigate.  
- **Multi-language Support**: The bot supports multiple languages, ensuring accessibility for users worldwide.

## Project Structure 📁
The project structure is organized as follows:
- `src/`: Contains the source code of the bot.
- `src/bot.js`: Main file defining the bot's behavior and commands.
- `src/.env`: Configuration files, including token and secret keys.

❗️ We are open to modifying the Project Structure to expand and manage it in the best possible way. Propose your own!

## Supported Commands 🤖
- `/start`: To start the bot 
- `/search <query>`: Search for movies by title.
- `/about`: Display information about the the bot.

## Setup Instructions 🛠️
To deploy the Movie Finder Bot on your Telegram account, follow these steps:

1. **Clone the Repository**: Clone this repository to your local machine using the following command:
```bash 
$ git clone https://github.com/LorenzoLancia/Movie-Finder-bot.git
```

2. **Install Dependencies**: Navigate to the cloned directory and install the necessary dependencies by running:
```bash 
$ npm install
```
3. **Telegram Bot Token**: Obtain a Telegram Bot API token by following the instructions in the [Telegram Bot documentation](https://core.telegram.org/bots#botfather).

4. **Configuration**: Create a `.env` file in the root directory and add your Telegram Bot API token:
```bash
TOKEN=<TELEGRAM_BOT_TOKEN>
```
5. **Run the Bot**: Execute the main script to start the bot:
```bash
$ node index.js
```

6. **Interact with the Bot**: Open Telegram and search for your bot by its username. Start interacting with it by sending commands to search for movies and retrieve information.

## Contribution Guidelines 🤝
Contributions to the Movie Finder Bot project are welcome and encouraged. If you'd like to contribute, please follow these guidelines:

- **Fork the Repository**: Fork this repository to your GitHub account.
- **Create a Branch**: Create a new branch for your contribution and switch to it.
- **Make Changes**: Make your desired changes to the codebase.
- **Test Your Changes**: Ensure that your changes work as expected and do not introduce any errors.
- **Submit a Pull Request**: Once you're satisfied with your changes, submit a pull request explaining the purpose of your contribution.

## Support 🤔
For any questions, issues, or feedback related to the Movie Finder Bot, please [open an issue](https://github.com/LorenzoLancia/Movie-Finder-bot/issues) on GitHub. We'll do our best to address your concerns promptly.

## License 📝
This project is licensed under the [MIT License](https://github.com/LorenzoLancia/Movie-Finder-bot/blob/main/LICENSE.txt).

const { TelegramBotClient } = require('./TelegramBotClient');
const { TelegramBotProxy } = require('./TelegramBotProxy');

global.TelegramBotClient = TelegramBotClient;
global.TelegramBotProxy = TelegramBotProxy;
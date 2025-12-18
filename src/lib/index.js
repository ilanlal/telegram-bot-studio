const { TelegramBotClient, TelegramBotClientFactory } = require('./TelegramBotClient');
const { TelegramBotProxy } = require('./TelegramBotProxy');

global.TelegramBotClient = TelegramBotClient;
global.TelegramBotClientFactory = TelegramBotClientFactory.newTelegramBotClientFactory();
global.TelegramBotProxy = TelegramBotProxy;
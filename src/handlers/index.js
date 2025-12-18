const { EventHandler } = require('./core/EventHandler');
const { NavigationHandler } = require('./core/NavigationHandler');
const { SpreadsheetHandler } = require('./core/SpreadsheetHandler');
const { ChannelsHandler } = require('./bot/ChannelsHandler');
const { BotHandler } = require('./bot/BotHandler');

// Export handlers to global scope for Apps Script
global.EventHandler = EventHandler;
global.NavigationHandler = NavigationHandler;
global.SpreadsheetHandler = SpreadsheetHandler;
global.ChannelsHandler = ChannelsHandler;
global.BotHandler = BotHandler;
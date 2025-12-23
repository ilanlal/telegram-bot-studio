const { EventHandler } = require('./core/EventHandler');
const { NavigationHandler } = require('./core/NavigationHandler');
const { SpreadsheetHandler } = require('./core/SpreadsheetHandler');
const { ChannelsHandler } = require('./bot/ChannelsHandler');
const { BotHandler } = require('./bot/BotHandler');
const { AutomationHandler } = require('./bot/webhook/AutomationHandler');
const { PostMessageHandler } = require('./bot/webhook/PostMessageHandler');
const { PostCallbackQueryHandler } = require('./bot/webhook/PostCallbackQueryHandler');
const { WebhookHandler } = require('./bot/webhook/WebhookHandler');

// Export handlers to global scope for Apps Script
global.EventHandler = EventHandler;
global.NavigationHandler = NavigationHandler;
global.SpreadsheetHandler = SpreadsheetHandler;
global.ChannelsHandler = ChannelsHandler;
global.BotHandler = BotHandler;
global.AutomationHandler = AutomationHandler;
global.PostMessageHandler = PostMessageHandler;
global.PostCallbackQueryHandler = PostCallbackQueryHandler;
global.WebhookHandler = WebhookHandler;
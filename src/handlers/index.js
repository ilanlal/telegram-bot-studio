const { EventHandler } = require('./core/EventHandler');
const { AppHandler } = require('./AppHandler');
const { NavigationHandler } = require('./core/NavigationHandler');
const { SpreadsheetHandler } = require('./core/SpreadsheetHandler');
const { BotApiHandler } = require('./bot/BotApiHandler');
const { AutomationHandler } = require('./bot/webhook/AutomationHandler');
const { PostMessageHandler } = require('./bot/webhook/PostMessageHandler');
const { PostCallbackQueryHandler } = require('./bot/webhook/PostCallbackQueryHandler');
const { WebhookHandler } = require('./bot/webhook/WebhookHandler');
const { MembershipHandler } = require('./core/MembershipHandler');
const { ConnectionHandler } = require('./bot/ConnectionHandler');

// Export handlers to global scope for Apps Script
global.EventHandler = EventHandler;
global.AppHandler = AppHandler;
global.NavigationHandler = NavigationHandler;
global.SpreadsheetHandler = SpreadsheetHandler;
global.BotApiHandler = BotApiHandler;
global.AutomationHandler = AutomationHandler;
global.PostMessageHandler = PostMessageHandler;
global.PostCallbackQueryHandler = PostCallbackQueryHandler;
global.WebhookHandler = WebhookHandler;
global.MembershipHandler = MembershipHandler;
global.ConnectionHandler = ConnectionHandler;
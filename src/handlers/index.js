const { AutomationHandler } = require('./bot/webhook/AutomationHandler');
const { PostMessageHandler } = require('./bot/webhook/PostMessageHandler');
const { PostCallbackQueryHandler } = require('./bot/webhook/PostCallbackQueryHandler');
const { WebhookHandler } = require('./bot/webhook/WebhookHandler');

// Export handlers to global scope for Apps Script
global.AutomationHandler = AutomationHandler;
global.PostMessageHandler = PostMessageHandler;
global.PostCallbackQueryHandler = PostCallbackQueryHandler;
global.WebhookHandler = WebhookHandler;
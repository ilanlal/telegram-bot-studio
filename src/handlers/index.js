const { EventHandler } = require('./core/EventHandler');
const { NavigationHandler } = require('./core/NavigationHandler');
const { SpreadsheetHandler } = require('./SpreadsheetHandler');

// Export handlers to global scope for Apps Script
global.EventHandler = EventHandler;
global.NavigationHandler = NavigationHandler;
global.SpreadsheetHandler = SpreadsheetHandler;
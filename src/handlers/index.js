const { EventHandler } = require('./core/EventHandler');
const { NavigationHandler } = require('./core/NavigationHandler');
const { SpreadsheetHandler } = require('./core/SpreadsheetHandler');

// Export handlers to global scope for Apps Script
global.EventHandler = EventHandler;
global.NavigationHandler = NavigationHandler;
global.SpreadsheetHandler = SpreadsheetHandler;
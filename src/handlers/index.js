const { EventHandler } = require('./EventHandler');
const { CardHandler } = require('./core/CardHandler');

// Expose handlers globally for testing and local Apps Script runtime
global.CardHandler = CardHandler;
global.EventHandler = EventHandler;
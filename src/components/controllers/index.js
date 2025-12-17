const { CardController } = require('./CardController');
const { SpreadsheetController } = require('./SpreadsheetController');
const { CardNavigationsController } = require('./CardNavigationsController');

// Export controllers for global access in Google Apps Script environment
global.CardController = CardController;
global.SpreadsheetController = SpreadsheetController;
global.CardNavigationsController = CardNavigationsController;
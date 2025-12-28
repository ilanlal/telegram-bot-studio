// Export all controllers from this module
const { AppController } = require('./AppController');

// Export controllers for global access in Google Apps Script environment
global.AppController = AppController;
const { SheetModel } = require('./SheetModel');
const { LoggerModel } = require('./LoggerModel');
const { WidgetModel } = require('./WidgetModel');
const { EnvironmentModel } = require('./EnvironmentModel');
const { CustomerModel } = require('./CustomerModel');

// Export all models
global.SheetModel = SheetModel;
global.LoggerModel = LoggerModel;
global.WidgetModel = WidgetModel;
global.EnvironmentModel = EnvironmentModel;
global.CustomerModel = CustomerModel;
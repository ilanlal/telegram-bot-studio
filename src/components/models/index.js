const { AppModel } = require('./AppModel');
const { SheetModel } = require('./SheetModel');
const { LoggerModel } = require('./LoggerModel');
const { WidgetModel } = require('./WidgetModel');
const { EnvironmentModel } = require('./EnvironmentModel');
const { AutomationModel } = require('./AutomationModel');
const { CustomerModel } = require('./CustomerModel');

// Export all models
global.AppModel = AppModel;
global.SheetModel = SheetModel;
global.LoggerModel = LoggerModel;
global.WidgetModel = WidgetModel;
global.EnvironmentModel = EnvironmentModel;
global.AutomationModel = AutomationModel;
global.CustomerModel = CustomerModel;
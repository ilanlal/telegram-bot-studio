const { AppModel } = require('./AppModel');
const { SheetModel } = require('./SheetModel');
const { LoggerModel } = require('./LoggerModel');
const { WidgetModel } = require('./WidgetModel');
const { BotModel } = require('./BotModel');
const { BotSheetModel } = require('./BotSheetModel');
const { EnvironmentModel } = require('./EnvironmentModel');

// Export all models
global.AppModel = AppModel;
global.SheetModel = SheetModel;
global.LoggerModel = LoggerModel;
global.WidgetModel = WidgetModel;
global.BotModel = BotModel;
global.BotSheetModel = BotSheetModel;
global.EnvironmentModel = EnvironmentModel;
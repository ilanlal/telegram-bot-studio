const { AppModel } = require('./AppModel');
const { SheetModel } = require('./SheetModel');
const { LoggerModel } = require('./LoggerModel');
const { WidgetModel } = require('./WidgetModel');
const { BotModel } = require('./BotModel');
const { BotSheetModel } = require('./BotSheetModel');
const { EnvironmentModel } = require('./EnvironmentModel');
const { ChannelsModel } = require('./ChannelsModel');
const { AutomationModel } = require('./AutomationModel');
const { CustomerModel } = require('./CustomerModel');

// Export all models
global.AppModel = AppModel;
global.SheetModel = SheetModel;
global.LoggerModel = LoggerModel;
global.WidgetModel = WidgetModel;
global.BotModel = BotModel;
global.BotSheetModel = BotSheetModel;
global.EnvironmentModel = EnvironmentModel;
global.ChannelsModel = ChannelsModel;
global.AutomationModel = AutomationModel;
global.CustomerModel = CustomerModel;
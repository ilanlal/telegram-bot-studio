class BotApiHandler {
    get documentProperties() {
        if (!this._documentProperties) {
            this._documentProperties = PropertiesService.getDocumentProperties();
        }
        return this._documentProperties;
    }

    get activeSpreadsheet() {
        if (!this._activeSpreadsheet) {
            this._activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        }
        return this._activeSpreadsheet;
    }

    get userProperties() {
        if (!this._userProperties) {
            this._userProperties = PropertiesService.getUserProperties();
        }
        return this._userProperties;
    }

    get scriptProperties() {
        if (!this._scriptProperties) {
            this._scriptProperties = PropertiesService.getScriptProperties();
        }
        return this._scriptProperties;
    }

    constructor() {
        this._documentProperties = null;
        this._userProperties = null;
        this._scriptProperties = null;
        this._activeSpreadsheet = null;
    }
};

BotApiHandler.View = {
    GetMe: (e) => {
        return new BotApiHandler
            .ControllerWrapper(
                BotApiHandler.prototype.activeSpreadsheet, BotApiHandler.prototype.documentProperties, BotApiHandler.prototype.userProperties, BotApiHandler.prototype.scriptProperties)
            .handleGetMe(e);
    },
    GetChat: (e) => {
        return new BotApiHandler
            .ControllerWrapper(
                BotApiHandler.prototype.activeSpreadsheet, BotApiHandler.prototype.documentProperties, BotApiHandler.prototype.userProperties, BotApiHandler.prototype.scriptProperties)
            .handleGetChat(e);
    },
    FetchWebhook: (e) => {
        return new BotApiHandler
            .ControllerWrapper(
                BotApiHandler.prototype.activeSpreadsheet, BotApiHandler.prototype.documentProperties, BotApiHandler.prototype.userProperties, BotApiHandler.prototype.scriptProperties)
            .handleFetchWebhook(e);
    },
    DeleteWebhook: (e) => {
        return new BotApiHandler
            .ControllerWrapper(
                BotApiHandler.prototype.activeSpreadsheet, BotApiHandler.prototype.documentProperties, BotApiHandler.prototype.userProperties, BotApiHandler.prototype.scriptProperties)
            .handleDeleteWebhook(e);
    },
    SetWebhook: (e) => {
        return new BotApiHandler
            .ControllerWrapper(
                BotApiHandler.prototype.activeSpreadsheet, BotApiHandler.prototype.documentProperties, BotApiHandler.prototype.userProperties, BotApiHandler.prototype.scriptProperties)
            .handleSetWebhook(e);
    },
    onSendTestMessageClick: (e) => {
        // Not implemented yet
        return new BotApiHandler
            .ControllerWrapper(
                BotApiHandler.prototype.activeSpreadsheet, BotApiHandler.prototype.documentProperties, BotApiHandler.prototype.userProperties, BotApiHandler.prototype.scriptProperties)
            .handleSendTestMessageClick(e);
    },
    onCreateInvoiceLinkClick: (e) => {
        return new BotApiHandler
            .ControllerWrapper(
                BotApiHandler.prototype.activeSpreadsheet, BotApiHandler.prototype.documentProperties, BotApiHandler.prototype.userProperties, BotApiHandler.prototype.scriptProperties)
            .handleCreateInvoiceLinkClick(e);
    },
    onSetMyNameClick: (e) => {
        // Not implemented yet
        return new BotApiHandler
            .ControllerWrapper(
                BotApiHandler.prototype.activeSpreadsheet, BotApiHandler.prototype.documentProperties, BotApiHandler.prototype.userProperties, BotApiHandler.prototype.scriptProperties)
            .handleSetMyNameClick(e);
    },
    onSetMyDescriptionClick: (e) => {
        // Not implemented yet
        return new BotApiHandler
            .ControllerWrapper(
                BotApiHandler.prototype.activeSpreadsheet, BotApiHandler.prototype.documentProperties, BotApiHandler.prototype.userProperties, BotApiHandler.prototype.scriptProperties)
            .handleSetMyDescriptionClick(e);
    },
    onSetMyShortDescriptionClick: (e) => {
        // Not implemented yet
        return new BotApiHandler
            .ControllerWrapper(
                BotApiHandler.prototype.activeSpreadsheet, BotApiHandler.prototype.documentProperties, BotApiHandler.prototype.userProperties, BotApiHandler.prototype.scriptProperties)
            .handleSetMyShortDescriptionClick(e);
    },
    onSetMyCommandsClick: (e) => {
        // Not implemented yet
        return new BotApiHandler
            .ControllerWrapper(
                BotApiHandler.prototype.activeSpreadsheet, BotApiHandler.prototype.documentProperties, BotApiHandler.prototype.userProperties, BotApiHandler.prototype.scriptProperties)
            .handleSetMyCommandsClick(e);
    }
}

BotApiHandler.ControllerWrapper = class {
    constructor(activeSpreadsheet, documentProperties, userProperties, scriptProperties) {
        this._documentProperties = documentProperties;
        this._userProperties = userProperties;
        this._scriptProperties = scriptProperties;
        this._activeSpreadsheet = activeSpreadsheet;
    }

    handleGetMe(e) {
        try {
            e.parameters = {
                path: 'Plugins.GetMe.HomeCard'
            };
            return Plugins.Navigations.UpdateCard(e);
        } catch (error) {
            TerminalOutput.Write(
                this._activeSpreadsheet,
                'BotApiHandler.GetMe',
                'ERROR', e, error.toString());
            return this.handleError(error)
                .build();
        }
    }

    handleGetChat(e) {
        try {
            e.parameters = {
                path: 'Plugins.GetChat.HomeCard'
            };
            return Plugins.Navigations.UpdateCard(e);
        } catch (error) {
            TerminalOutput.Write(this._activeSpreadsheet,
                'BotApiHandler.GetChat',
                'ERROR',
                e,
                error.toString());
            return this.handleError(error)
                .build();
        }
    }

    handleFetchWebhook(e) {
        try {
            e.parameters = {
                path: 'Plugins.Webhook.HomeCard'
            };
            return Plugins.Navigations.UpdateCard(e);
        } catch (error) {
            TerminalOutput.Write(this._activeSpreadsheet,
                'BotApiHandler.FetchWebhook',
                'ERROR',
                e,
                error.toString());
            return this.handleError(error)
                .build();
        }
    }

    handleDeleteWebhook(e) {
        try {
            // drop_pending_updates_switch
            const dropPendingUpdates = (e.commonEventObject.formInputs && e.commonEventObject.formInputs['drop_pending_updates_switch'])
                ? (e.commonEventObject.formInputs['drop_pending_updates_switch']?.stringInputs?.value?.[0] === 'ON')
                : false;

            // extract token
            const inputToken = (e.commonEventObject.formInputs && e.commonEventObject.formInputs['txt_bot_api_token'])
                ? e.commonEventObject.formInputs['txt_bot_api_token']?.stringInputs?.value?.[0]
                : null;

            if (!inputToken) {
                throw new Error('Bot API token is required to delete webhook.');
            }

            const client = new TelegramBotClient(inputToken);
            const result = client.deleteWebhook(dropPendingUpdates);
            // then update card to reflect changes
            e.parameters = {
                path: 'Plugins.Webhook.HomeCard'
            };
            return Plugins.Navigations.UpdateCard(e);
        } catch (error) {
            TerminalOutput.Write(this._activeSpreadsheet,
                'BotApiHandler.DeleteWebhook',
                'ERROR',
                e,
                error.toString());
            return this.handleError(error)
                .build();
        }
    }

    handleSetWebhook(e) {
        try {
            // set webhook logic here
            // extract webhook_url
            const webhookUrl = (e.commonEventObject.formInputs && e.commonEventObject.formInputs['txt_webhook_url'])
                ? e.commonEventObject.formInputs['txt_webhook_url']?.stringInputs?.value?.[0]
                : null;

            if (!webhookUrl) {
                throw new Error('Webhook URL is required to set webhook.');
            }
            const inputToken = (e.commonEventObject.formInputs && e.commonEventObject.formInputs['txt_bot_api_token'])
                ? e.commonEventObject.formInputs['txt_bot_api_token']?.stringInputs?.value?.[0]
                : null;

            if (!inputToken) {
                throw new Error('Bot API token is required to set webhook.');
            }

            const maxConnections = (e.commonEventObject.formInputs && e.commonEventObject.formInputs['txt_max_connections'])
                ? e.commonEventObject.formInputs['txt_max_connections']?.stringInputs?.value?.[0]
                : '40';

            const maxConnInt = parseInt(maxConnections, 10);

            if (isNaN(maxConnInt) || maxConnInt < 1 || maxConnInt > 100) {
                throw new Error('Max Connections must be an integer between 1 and 100.');
            }

            const ipAddress = (e.commonEventObject.formInputs && e.commonEventObject.formInputs['txt_ip_address'])
                ? e.commonEventObject.formInputs['txt_ip_address']?.stringInputs?.value?.[0]
                : null;
            const secretToken = (e.commonEventObject.formInputs && e.commonEventObject.formInputs['txt_secret_token'])
                ? e.commonEventObject.formInputs['txt_secret_token']?.stringInputs?.value?.[0]
                : '';

            // drop_pending_updates_switch
            const dropPendingUpdates = (e.commonEventObject.formInputs && e.commonEventObject.formInputs['drop_pending_updates_switch'])
                ? (e.commonEventObject.formInputs['drop_pending_updates_switch']?.stringInputs?.value?.[0] === 'ON')
                : false;

            // create telegram bot client
            const client = new TelegramBotClient(inputToken);

            // set webhook
            const result = client.setWebhook(webhookUrl, {
                max_connections: parseInt(maxConnections, 10),
                ip_address: ipAddress,
                secret_token: secretToken,
                drop_pending_updates: dropPendingUpdates
            });

            // then update card to reflect changes
            e.parameters = {
                path: 'Plugins.Webhook.HomeCard'
            };
            return Plugins.Navigations.UpdateCard(e);
        } catch (error) {
            TerminalOutput.Write(
                this._activeSpreadsheet,
                'BotApiHandler.SetWebhook',
                'ERROR', e, error.toString());

            return this.handleError(error)
                .build();
        }
    }

    handleSendTestMessageClick(e) {  
        // Not implemented yet
        return this.handleOperationSuccess("👍 Test message sent successfully.")
            .build();
    }

    handleCreateInvoiceLinkClick(e) {
        return PaymentHandler
            .ControllerWrapper(
                BotApiHandler.prototype.activeSpreadsheet, BotApiHandler.prototype.documentProperties, BotApiHandler.prototype.userProperties, BotApiHandler.prototype.scriptProperties)
            .handleCreateInvoiceLinkClick(e);
    }

    handleSetMyNameClick(e) {
        try {
            // extract chat_id from event object
            const token = (e.commonEventObject.formInputs && e.commonEventObject.formInputs['txt_bot_api_token'])
                ? e.commonEventObject.formInputs['txt_bot_api_token']?.stringInputs?.value?.[0]
                : null;
            const chatId = (e.commonEventObject.formInputs && e.commonEventObject.formInputs['chat_id'])
                ? e.commonEventObject.formInputs['chat_id']?.stringInputs?.value?.[0]
                : null;
            const languageCode = (e.commonEventObject.formInputs && e.commonEventObject.formInputs['language_code'])
                ? e.commonEventObject.formInputs['language_code']?.stringInputs?.value?.[0]
                : null;
            const name = (e.commonEventObject.formInputs && e.commonEventObject.formInputs['bot_name'])
                ? e.commonEventObject.formInputs['bot_name']?.stringInputs?.value?.[0]
                : null;

            const botModel = BotModel.create(this._activeSpreadsheet, this._documentProperties);

            const result = botModel.setMyName(token, name, languageCode);

            SheetModel.create(this._activeSpreadsheet)
                .getSheet(EMD.Spreadsheet.TerminalOutput({}))
                .appendRow([
                    // Created On as iso string
                    new Date().toISOString(),
                    'server', // chat side
                    `Call setMyName('${token}', '${name}', '${languageCode}')`,
                    JSON.stringify(result)
                ]);

            return this.handleOperationSuccess("👍 Bot name set successfully.")
                .build();
        } catch (error) {
            return this.handleError(error)
                .build();
        }
    }

    handleSetMyDescriptionClick(e) {
        try {
            // extract chat_id from event object
            const token = (e.commonEventObject.formInputs && e.commonEventObject.formInputs['txt_bot_api_token'])
                ? e.commonEventObject.formInputs['txt_bot_api_token']?.stringInputs?.value?.[0]
                : null;
            const chatId = (e.commonEventObject.formInputs && e.commonEventObject.formInputs['chat_id'])
                ? e.commonEventObject.formInputs['chat_id']?.stringInputs?.value?.[0]
                : null;
            const languageCode = (e.commonEventObject.formInputs && e.commonEventObject.formInputs['language_code'])
                ? e.commonEventObject.formInputs['language_code']?.stringInputs?.value?.[0]
                : null;
            const description = (e.commonEventObject.formInputs && e.commonEventObject.formInputs['bot_description'])
                ? e.commonEventObject.formInputs['bot_description']?.stringInputs?.value?.[0]
                : null;

            const botModel = BotModel.create(this._activeSpreadsheet, this._documentProperties);

            const result = botModel.setMyDescription(token, description, languageCode);

            SheetModel.create(this._activeSpreadsheet)
                .getSheet(EMD.Spreadsheet.TerminalOutput({}))
                .appendRow([
                    // Created On as iso string
                    new Date().toISOString(),
                    'server', // chat side
                    `Call setMyDescription('${token}', '${description}', '${languageCode}')`,
                    JSON.stringify(result)
                ]);

            return this.handleOperationSuccess("👍 Bot description set successfully.")
                .build();
        } catch (error) {
            return this.handleError(error)
                .build();
        }
    }

    handleSetMyShortDescriptionClick(e) {
        try {
            // extract chat_id from event object
            const token = (e.commonEventObject.formInputs && e.commonEventObject.formInputs['txt_bot_api_token'])
                ? e.commonEventObject.formInputs['txt_bot_api_token']?.stringInputs?.value?.[0]
                : null;
            const chatId = (e.commonEventObject.formInputs && e.commonEventObject.formInputs['chat_id'])
                ? e.commonEventObject.formInputs['chat_id']?.stringInputs?.value?.[0]
                : null;
            const languageCode = (e.commonEventObject.formInputs && e.commonEventObject.formInputs['language_code'])
                ? e.commonEventObject.formInputs['language_code']?.stringInputs?.value?.[0]
                : null;
            const shortDescription = (e.commonEventObject.formInputs && e.commonEventObject.formInputs['bot_short_description'])
                ? e.commonEventObject.formInputs['bot_short_description']?.stringInputs?.value?.[0]
                : null;

            const botModel = BotModel.create(this._activeSpreadsheet, this._documentProperties);

            const result = botModel.setMyShortDescription(token, shortDescription, languageCode);

            SheetModel.create(this._activeSpreadsheet)
                .getSheet(EMD.Spreadsheet.TerminalOutput({}))
                .appendRow([
                    // Created On as iso string
                    new Date().toISOString(),
                    'server', // chat side
                    `Call setMyShortDescription('${token}', '${shortDescription}', '${languageCode}')`,
                    JSON.stringify(result)
                ]);

            return this.handleOperationSuccess("👍 Bot short description set successfully.")
                .build();
        } catch (error) {
            return this.handleError(error)
                .build();
        }
    }

    handleSetMyCommandsClick(e) {
        try {
            // extract chat_id from event object
            const token = (e.commonEventObject.formInputs && e.commonEventObject.formInputs['txt_bot_api_token'])
                ? e.commonEventObject.formInputs['txt_bot_api_token']?.stringInputs?.value?.[0]
                : null;
            const chatId = (e.commonEventObject.formInputs && e.commonEventObject.formInputs['chat_id'])
                ? e.commonEventObject.formInputs['chat_id']?.stringInputs?.value?.[0]
                : null;
            const languageCode = (e.commonEventObject.formInputs && e.commonEventObject.formInputs['language_code'])
                ? e.commonEventObject.formInputs['language_code']?.stringInputs?.value?.[0]
                : null;
            const commands = (e.commonEventObject.formInputs && e.commonEventObject.formInputs['bot_commands'])
                ? e.commonEventObject.formInputs['bot_commands']?.stringInputs?.value?.[0]
                : null;

            const botModel = BotModel.create(this._activeSpreadsheet, this._documentProperties);

            const result = botModel.setMyCommands(token, commands, languageCode);

            SheetModel.create(this._activeSpreadsheet)
                .getSheet(EMD.Spreadsheet.TerminalOutput({}))
                .appendRow([
                    // Created On as iso string
                    new Date().toISOString(),
                    'server', // chat side
                    `Call setMyCommands('${token}', '${commands}', '${languageCode}')`,
                    JSON.stringify(result)
                ]);

            return this.handleOperationSuccess("👍 Bot commands set successfully.")
                .build();
        } catch (error) {
            return this.handleError(error)
                .build();
        }
    }

    handleOperationSuccess(message) {
        // Show a success message to the user
        return CardService.newActionResponseBuilder()
            .setNotification(
                CardService.newNotification()
                    .setText(message));
    }

    handleError(error) {
        // Show an error message to the user
        return CardService.newActionResponseBuilder()
            .setNotification(
                CardService.newNotification()
                    .setText(
                        error.toString()));
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        BotApiHandler
    };
}
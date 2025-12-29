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
            .handleGetMeClick(e);
    },
    GetChat: (e) => {
        return new BotApiHandler
            .ControllerWrapper(
                BotApiHandler.prototype.activeSpreadsheet, BotApiHandler.prototype.documentProperties, BotApiHandler.prototype.userProperties, BotApiHandler.prototype.scriptProperties)
            .handleGetChatClick(e);
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
        // Ensure Terminal Output sheet is initialized and active
        SheetModel.create(this._activeSpreadsheet)
            .setActiveSheet(EMD.Spreadsheet.TerminalOutput({}));
    }

    handleGetMeClick(e) {
        try {
            SheetModel.create(this._activeSpreadsheet)
                .getSheet(EMD.Spreadsheet.TerminalOutput({}))
                .appendRow([
                    // Created On as iso string
                    new Date().toISOString(),
                    'client', // chat side
                    'Request to get bot info',
                    JSON.stringify({ e }) // placeholder
                ]);

            // extract chat_id from event object
            const token = (e.commonEventObject.formInputs && e.commonEventObject.formInputs['txt_bot_api_token'])
                ? e.commonEventObject.formInputs['txt_bot_api_token']?.stringInputs?.value?.[0]
                : null;
            if (!token) {
                throw new Error("Bot API token is required.");
            }
            const telegramBotClient = new TelegramBotClient(token);
            const response = telegramBotClient.getMe();
            if (response.getResponseCode() !== 200) {
                throw new Error("Failed to get bot info");
            }
            const result = JSON.parse(response.getContentText()).result;

            SheetModel.create(this._activeSpreadsheet)
                .getSheet(EMD.Spreadsheet.TerminalOutput({}))
                .appendRow([
                    // Created On as iso string
                    new Date().toISOString(),
                    'server', // chat side
                    `Call getMe('${token}')`,
                    JSON.stringify(result)
                ]);
            return this.handleOperationSuccess("👍 Bot info retrieved successfully.")
                .build();
        } catch (error) {
            SheetModel.create(this._activeSpreadsheet)
                .getSheet(EMD.Spreadsheet.TerminalOutput({}))
                .appendRow([
                    // Created On as iso string
                    new Date().toISOString(),
                    'server', // chat side
                    `Error calling getMe('${token}')`,
                    error.toString()
                ]);
            return this.handleError(error)
                .build();
        }
    }

    handleGetChatClick(e) {
        try {
            SheetModel.create(this._activeSpreadsheet)
                .getSheet(EMD.Spreadsheet.TerminalOutput({}))
                .appendRow([
                    // Created On as iso string
                    new Date().toISOString(),
                    'client', // chat side
                    'Request to get chat info',
                    JSON.stringify({ e }) // placeholder
                ]);

            // extract chat_id from event object
            const token = (e.commonEventObject.formInputs && e.commonEventObject.formInputs['txt_bot_api_token'])
                ? e.commonEventObject.formInputs['txt_bot_api_token']?.stringInputs?.value?.[0]
                : null;

            if (!token) {
                throw new Error('Bot API token is required.');
            }

            const chatId = (e.commonEventObject.formInputs && e.commonEventObject.formInputs['txt_chat_id'])
                ? e.commonEventObject.formInputs['txt_chat_id']?.stringInputs?.value?.[0]
                : null;

            if (!chatId) {
                throw new Error('Chat ID is required.');
            }

            const telegramBotClient = new TelegramBotClient(token);

            // 1. using the bot token and chat id, get chat info from Telegram API`
            const response = telegramBotClient.getChat(encodeURIComponent(chatId));
            if (response.getResponseCode() !== 200) {
                throw new Error("Failed to get bot info");
            }
            const result = JSON.parse(response.getContentText()).result;
            // 2. add result to Terminal Output sheet
            SheetModel.create(this._activeSpreadsheet)
                .getSheet(EMD.Spreadsheet.TerminalOutput({}))
                .appendRow([
                    // Created On as iso string
                    new Date().toISOString(),
                    'server', // chat side
                    `Retrieved info for chat ID: ${chatId}`,
                    JSON.stringify(result)
                ]);

            // For demonstration, we just return the chat ID back
            return this.handleOperationSuccess(`Chat ID retrieved successfully: ${chatId}`)
                .build();
        } catch (error) {
            SheetModel.create(this._activeSpreadsheet)
                .getSheet(EMD.Spreadsheet.TerminalOutput({}))
                .appendRow([
                    // Created On as iso string
                    new Date().toISOString(),
                    'server', // chat side
                    `Error retrieving chat info`,
                    error.toString()
                ]);
            return this.handleError(error)
                .build();
        }
    }

    handleSendTestMessageClick(e) {
        SheetModel.create(this._activeSpreadsheet)
            .getSheet(EMD.Spreadsheet.TerminalOutput({}))
            .appendRow([
                // Created On as iso string
                new Date().toISOString(),
                'client', // chat side
                'Request to send test message',
                JSON.stringify({ e }) // placeholder
            ]);
        // Not implemented yet
        return this.handleOperationSuccess("👍 Test message sent successfully.")
            .build();
    }

    handleCreateInvoiceLinkClick(e) {
        SheetModel.create(this._activeSpreadsheet)
            .getSheet(EMD.Spreadsheet.TerminalOutput({}))
            .appendRow([
                // Created On as iso string
                new Date().toISOString(),
                'client', // chat side
                'Request to create invoice link',
                JSON.stringify({ e }) // placeholder
            ]);
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
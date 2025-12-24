class ChannelsHandler {
    get documentProperties() {
        if (!this._documentProperties) {
            this._documentProperties = PropertiesService.getDocumentProperties();
        }
        return this._documentProperties;
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

    get activeSpreadsheet() {
        if (!this._activeSpreadsheet) {
            this._activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        }
        return this._activeSpreadsheet;
    }

    constructor() {
        this._documentProperties = null;
        this._userProperties = null;
        this._scriptProperties = null;
        this._activeSpreadsheet = null;
    }
};

ChannelsHandler.View = {
    onGetChatClick: (e) => {
        return new ChannelsHandler.ControllerWrapper(
            ChannelsHandler.prototype.activeSpreadsheet,
            ChannelsHandler.prototype.documentProperties,
            ChannelsHandler.prototype.userProperties,
            ChannelsHandler.prototype.scriptProperties
        ).handleGetChatClick(e);
    }
};

ChannelsHandler.ControllerWrapper = class extends ChannelsHandler {
    constructor(activeSpreadsheet, documentProperties, userProperties, scriptProperties) {
        super();
        this._documentProperties = documentProperties;
        this._userProperties = userProperties;
        this._scriptProperties = scriptProperties;
        this._activeSpreadsheet = activeSpreadsheet;
    }

    handleGetChatClick(e) {
        try {
            // extract chat_id from event object
            const token = (e.commonEventObject.formInputs && e.commonEventObject.formInputs['txt_bot_api_token'])
                ? e.commonEventObject.formInputs['txt_bot_api_token']?.stringInputs?.value?.[0]
                : null;

            if (!token) {
                throw new Error('Bot API token is required.');
            }

            const chatId = (e.commonEventObject.formInputs && e.commonEventObject.formInputs['chat_id'])
                ? e.commonEventObject.formInputs['chat_id']?.stringInputs?.value?.[0]
                : null;

            if (!chatId) {
                throw new Error('Chat ID is required.');
            }

            const telegramBotClient = new TelegramBotClient(token);

            // 1. using the bot token and chat id, get chat info from Telegram API`
            const chatInfoResult = telegramBotClient.getChat(chatId);


            // 2. add result to sheet. (for user)
            const sheetModel = SheetModel.create(this._activeSpreadsheet);

            sheetModel.getSheet(EMD.Spreadsheet.TerminalOutput({}))
                .appendRow([
                    // Created On as iso string
                    new Date().toISOString(),
                    'server', // chat side
                    `Retrieved info for chat ID: ${chatId}`,
                    JSON.stringify(chatInfoResult)
                ]);

            // For demonstration, we just return the chat ID back
            return this.handleOperationSuccess(`Chat ID retrieved successfully: ${chatId}`)
                .build();
        } catch (error) {
            this.handleError(error)
                .build();
            SheetModel.create(this._activeSpreadsheet)
                .getSheet(EMD.Spreadsheet.TerminalOutput({}))
                .appendRow([
                    // Created On as iso string
                    new Date().toISOString(),
                    'server', // chat side
                    `Error retrieving chat info`,
                    error.toString()
                ]);
            throw error;
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
        ChannelsHandler
    };
}
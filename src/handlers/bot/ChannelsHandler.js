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
            const chatId = (e.commonEventObject.formInputs && e.commonEventObject.formInputs['chat_id'])
                ? e.commonEventObject.formInputs['chat_id']?.stringInputs?.value?.[0]
                : null;

            if (!chatId) {
                throw new Error('Chat ID is required.');
            }

            const sheetModel = SheetModel.create(this._activeSpreadsheet);
            const channelModel = ChannelsModel.create(
                this._activeSpreadsheet, this._documentProperties, this._userProperties, this._scriptProperties);

            // 1. using some mode object to call getChat API method to get full chat info;
            const chatInfoResult = channelModel.getChat(chatId);
            // 2. add result to sheet. (for user)
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
class ConnectionHandler {
    get cardService() {
        if (!this._cardService) {
            this._cardService = CardService;
        }
        return this._cardService;
    }

    get activeSpreadsheet() {
        if (!this._activeSpreadsheet) {
            this._activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        }
        return this._activeSpreadsheet;
    }

    constructor() {
        // constructor implementation
        this._cardService = null;
        this._activeSpreadsheet = null;
    }
}

ConnectionHandler.ViewModel = {
    onCreateBotConnectionClicked: (e) => {
        return new ConnectionHandler
            .ControllerWrapper(
                ConnectionHandler.prototype.cardService, ConnectionHandler.prototype.activeSpreadsheet)
            .handleCreateBotConnection(e);
    }
}

ConnectionHandler.ControllerWrapper = class extends ConnectionHandler {
    constructor(cardService, activeSpreadsheet) {
        super();
        this._cardService = cardService;
        this._activeSpreadsheet = activeSpreadsheet;
    }

    handleCreateBotConnection(e) {
        try {
            // extract parameters from event
            // extract chat_id from event object
            const token = (e.commonEventObject.formInputs && e.commonEventObject.formInputs['txt_bot_api_token'])
                ? e.commonEventObject.formInputs['txt_bot_api_token']?.stringInputs?.value?.[0]
                : null;

            if (!token) {
                throw new Error('Bot API token is required.');
            }
            const displayName = (e.commonEventObject.formInputs && e.commonEventObject.formInputs['display_name_input'])
                ? e.commonEventObject.formInputs['display_name_input']?.stringInputs?.value?.[0]
                : null;

            // Add the bot connection to the spreadsheet
            const sheet = SheetModel.create(this._activeSpreadsheet)
                .getSheet(EMD.Spreadsheet.BotConnections({}));

            sheet.appendRow([
                token, // Bot API Token
                displayName || '[Unnamed Bot]' // Display Name
            ]);

            return this.handleOperationSuccess(`Bot connection '${displayName || token}' created successfully.`);
        }
        catch (error) {
            SheetModel.create(this._activeSpreadsheet)
                .getSheet(EMD.Spreadsheet.TerminalOutput({}))
                .appendRow([
                    // Created On as iso string
                    new Date().toISOString(),
                    'server', // chat side
                    `Error creating bot connection:`,
                    JSON.stringify({
                        error: error.toString(),
                        event: e
                    })
                ]);
            return this.handleOperationError(error);
        }
    }

    handleOperationSuccess(message) {
        // Show a success message to the user
        return CardService.newActionResponseBuilder()
            .setNotification(
                CardService.newNotification()
                    .setText(message))
            .build();
    }

    handleOperationError(error) {
        // Show an error message to the user
        return CardService.newActionResponseBuilder()
            .setNotification(
                CardService.newNotification()
                    .setText(
                        error.toString()))
            .build();
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ConnectionHandler
    };
}
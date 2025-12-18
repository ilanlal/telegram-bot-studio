class BotHandler {
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

BotHandler.View = {
    onSetMyNameClick: (e) => {
        // Not implemented yet
        return new BotHandler
            .ControllerWrapper(
                BotHandler.prototype.activeSpreadsheet, BotHandler.prototype.documentProperties, BotHandler.prototype.userProperties, BotHandler.prototype.scriptProperties)
            .handleSetMyNameClick(e);
    },
    onSetMyDescriptionClick: (e) => {
        // Not implemented yet
        return new BotHandler
            .ControllerWrapper(
                BotHandler.prototype.activeSpreadsheet, BotHandler.prototype.documentProperties, BotHandler.prototype.userProperties, BotHandler.prototype.scriptProperties)
            .handleSetMyDescriptionClick(e);
    },
    onSetMyShortDescriptionClick: (e) => {
        // Not implemented yet
        return new BotHandler
            .ControllerWrapper(
                BotHandler.prototype.activeSpreadsheet, BotHandler.prototype.documentProperties, BotHandler.prototype.userProperties, BotHandler.prototype.scriptProperties)
            .handleSetMyShortDescriptionClick(e);
    },
    onSetMyCommandsClick: (e) => {
        // Not implemented yet
        return new BotHandler
            .ControllerWrapper(
                BotHandler.prototype.activeSpreadsheet, BotHandler.prototype.documentProperties, BotHandler.prototype.userProperties, BotHandler.prototype.scriptProperties)
            .handleSetMyCommandsClick(e);
    }
}

BotHandler.ControllerWrapper = class {
    constructor(activeSpreadsheet, documentProperties, userProperties, scriptProperties) {
        this._documentProperties = documentProperties;
        this._userProperties = userProperties;
        this._scriptProperties = scriptProperties;
        this._activeSpreadsheet = activeSpreadsheet;
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

            const response = botModel.setMyName(token, name, languageCode);

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

            const response = botModel.setMyDescription(token, description, languageCode);

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

            const response = botModel.setMyShortDescription(token, shortDescription, languageCode);

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

            const response = botModel.setMyCommands(token, commands, languageCode);

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
        BotHandler
    };
}
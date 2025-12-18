class ChannelsModel {
    get telegramBotClient() {
        if (!this._telegramBotClient) {
            const token = this._scriptProperties.getProperty(EnvironmentModel.InputMeta.BOT_API_TOKEN);
            if (!token) {
                throw new Error('Bot API token is not set in script properties.');
            }
            this._telegramBotClient = new TelegramBotClient(token);
        }
        return this._telegramBotClient;
    }

    static create(
        activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet(),
        documentProperties = PropertiesService.getDocumentProperties(),
        userProperties = PropertiesService.getUserProperties(),
        scriptProperties = PropertiesService.getScriptProperties()
    ) {
        return new ChannelsModel(activeSpreadsheet, documentProperties, userProperties, scriptProperties);
    }

    constructor(activeSpreadsheet, documentProperties, userProperties, scriptProperties) {
        this._activeSpreadsheet = activeSpreadsheet;
        this._documentProperties = documentProperties;
        this._userProperties = userProperties;
        this._scriptProperties = scriptProperties;
        this._telegramBotClient = null;
    }

    getChat(chat_id) {
        const response = this.telegramBotClient.getChat(chat_id);
        if (response.getResponseCode() !== 200) {
            throw new Error(`Failed to get chat info: ${response.description}`);
        }

        return JSON.parse(response.getContentText()).result;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ChannelsModel
    };
}
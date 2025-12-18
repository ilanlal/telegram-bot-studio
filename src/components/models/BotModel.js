class BotModel {
    constructor(activeSpreadsheet, documentProperties) {
        this._documentProperties = documentProperties;
        this._activeSpreadsheet = activeSpreadsheet;
    }

    static create(
        activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet(),
        documentProperties = PropertiesService.getDocumentProperties()
    ) {
        return new BotModel(activeSpreadsheet, documentProperties);
    }

    getMe(botToken = '[YOUR_BOT_TOKEN]') {
        const telegramBotClient = new TelegramBotClient(botToken);
        const response = telegramBotClient.getMe();
        if (response.getResponseCode() !== 200) {
            throw new Error("Failed to get bot info");
        }
        return JSON.parse(response.getContentText()).result;
    }

    setWebhook(botToken = '[YOUR_BOT_TOKEN]', deploymentId = '[YOUR_DEPLOYMENT_ID]') {
        const telegramBotClient = new TelegramBotClient(botToken);
        const webhookUrl = `https://script.google.com/macros/s/${deploymentId}/exec`;

        const response = telegramBotClient.setWebhook(webhookUrl);
        if (response.getResponseCode() !== 200) {
            throw new Error("Failed to set webhook");
        }

        return JSON.parse(response.getContentText()).result;
    }

    deleteWebhook(botToken = '[YOUR_BOT_TOKEN]', deploymentId = '[YOUR_DEPLOYMENT_ID]') {
        const telegramBotClient = new TelegramBotClient(botToken);
        const webhookUrl = `https://script.google.com/macros/s/${deploymentId}/exec`;

        const response = telegramBotClient.deleteWebhook(webhookUrl);

        if (response.getResponseCode() !== 200) {
            throw new Error("Failed to delete webhook");
        }

        return JSON.parse(response.getContentText()).result;
    }

    setMyName(botToken = '[YOUR_BOT_TOKEN]', name = null, language_code = null) {
        const telegramBotClient = new TelegramBotClient(botToken);
        const response = telegramBotClient.setMyName({ name, language_code });
        if (response.getResponseCode() !== 200) {
            throw new Error("Failed to set bot name");
        }
        return JSON.parse(response.getContentText()).result;
    }

    setMyDescription(botToken = '[YOUR_BOT_TOKEN]', description = null, language_code = null) {
        const telegramBotClient = new TelegramBotClient(botToken);
        const response = telegramBotClient.setMyDescription({ description, language_code });
        if (response.getResponseCode() !== 200) {
            throw new Error("Failed to set bot description");
        }

        return JSON.parse(response.getContentText()).result;
    }

    setMyShortDescription(botToken = '[YOUR_BOT_TOKEN]', short_description = null, language_code = null) {
        const telegramBotClient = new TelegramBotClient(botToken);
        const response = telegramBotClient.setMyShortDescription({ short_description, language_code });

        if (response.getResponseCode() !== 200) {
            throw new Error("Failed to set bot short description");
        }
        return JSON.parse(response.getContentText()).result;
    }

    setMyCommands(botToken = '[YOUR_BOT_TOKEN]', commands = [], language_code = null) {
        const telegramBotClient = new TelegramBotClient(botToken);
        const response = telegramBotClient.setMyCommands({ commands, language_code });
        if (response.getResponseCode() !== 200) {
            throw new Error("Failed to set bot commands");
        }
        return JSON.parse(response.getContentText()).result;
    }

    // Getters
    get state() {
        const token = this._documentProperties.getProperty(EnvironmentModel.InputMeta.BOT_API_TOKEN);
        const deploymentId = this._documentProperties.getProperty(EnvironmentModel.InputMeta.DEPLOYMENT_ID);
        return {
            // show 4 first and 4 last characters of the token
            botToken: token ? `${token.substring(0, 4)}****${token.substring(token.length - 4)}` : null,
            botTokenSet: !!this._documentProperties.getProperty(EnvironmentModel.InputMeta.BOT_API_TOKEN),
            deploymentId: deploymentId ? `${deploymentId.substring(0, 4)}****${deploymentId.substring(deploymentId.length - 4)}` : null,
            deploymentIdSet: !!this._documentProperties.getProperty(EnvironmentModel.InputMeta.DEPLOYMENT_ID)
        }
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BotModel };
}
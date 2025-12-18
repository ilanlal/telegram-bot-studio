class TelegramBotProxy {
    constructor(token) {
        this.token = token;
    }

    static create(token = '[YOUR_BOT_TOKEN]') {
        return new TelegramBotProxy(token);
    }

    executeApiRequest(uriAction, payload) {
        const url = this.apiBaseUrl + '/' + uriAction;

        if (!payload) {
            return UrlFetchApp.fetch(url);
        }

        const options = {
            'method': 'post',
            'contentType': 'application/json',
            'payload': JSON.stringify(payload)
        };

        return UrlFetchApp.fetch(url, options);
    }

    get apiBaseUrl() {
        return `https://api.telegram.org/bot${this.token}`;
    }
    // Add more proxy methods as needed
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TelegramBotProxy };
}
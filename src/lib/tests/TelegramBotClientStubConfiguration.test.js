class TelegramBotClientStubConfiguration {
    static get DUMMY_BOT_TOKEN() {
        return '[DUMMY_BOT_TOKEN]';
    }

    static get BASE_URL() {
        return 'https://api.telegram.org/bot';
    }

    constructor() {
        // requests array has all the URLs with their specific responses
        this.requests = [
            {
                action: 'getMe',
                result: {
                    id: 123456789,
                    is_bot: true,
                    first_name: "Test",
                    last_name: "User",
                    username: "testuser",
                    language_code: "en"
                }
            }
        ];
        // to find & correctly set the response to specific URL in 'return' method
        this.currentAction = '';
    }

    when(action) {
        this.currentAction = action;
        this.requests.push({ action });
        return this;
    }

    return(result) {
        const data = this.get(this.currentAction);
        data.result = result;
        this.currentAction = '';
        return this;
    }

    get(action) {
        return this.requests.find(r => r.action === action);
    }
    static getMeStub = (token) => {
        const contentText = `{
            "result": {
                "id": 123456789,
                "is_bot": true,
                "first_name": "Test",
                "last_name": "User",
                "username": "testuser",
                "language_code": "en"
            }
        }`;
        UrlFetchAppStubConfiguration.when(`https://api.telegram.org/bot${token}/getMe`)
            .return(new HttpResponse()
                .setContentText(contentText));
    };

    static getWebhookInfoStub = (token) => {
        UrlFetchAppStubConfiguration.when(`https://api.telegram.org/bot${token}/getWebhookInfo`)
            .return(new HttpResponse()
                .setContentText(`{"ok":true,"result":{ "url": "https://example.com/webhook" }}`));
    }

    static setWebhookStub = (token, webhookUrl) => {
        UrlFetchAppStubConfiguration.when(`https://api.telegram.org/bot${token}/setWebhook?url=${webhookUrl}`)
            .return(new HttpResponse()
                .setContentText(`{"ok":true,"result":true,"description":"Webhook was set"}`));
    }
}

describe('TelegramBotClientStubConfiguration', () => {
    it('Instance should be defined', () => {
        expect(TelegramBotClientStubConfiguration).toBeDefined();
    });

    it('getMeStub should be defined', () => {
        expect(TelegramBotClientStubConfiguration.getMeStub).toBeDefined();
    });
});

module.exports = { TelegramBotClientStubConfiguration };
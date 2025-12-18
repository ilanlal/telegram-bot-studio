require("@ilanlal/gasmocks");

const { TelegramBotProxy } = require('./TelegramBotProxy');

describe('TelegramBotProxy', () => {
    const token = 'TEST_BOT_TOKEN';
    /** @type {TelegramBotProxy} */
    let botProxy;

    beforeEach(() => {
        botProxy = TelegramBotProxy.create(token);
    });

    it('should create an instance with the provided token', () => {
        expect(botProxy.token).toBe(token);
    });

    it('should have the correct apiBaseUrl', () => {
        const expectedUrl = `https://api.telegram.org/bot${token}`;
        expect(botProxy.apiBaseUrl).toBe(expectedUrl);
    });

    // Note: The following test is a placeholder. In a real-world scenario,
    // you would mock UrlFetchApp.fetch to avoid making actual HTTP requests.
    it('should execute action and return a response', () => {
        const actionName = 'sendMessage';
        const payload = {
            chat_id: 'CHAT_ID',
            text: 'Hello, world!'
        };

        const response = botProxy.executeApiRequest(actionName, payload);
        expect(response).toBeDefined();
    });
});

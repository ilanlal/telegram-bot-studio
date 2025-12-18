require('../../../tests');

const { BotHandler } = require('./BotHandler');

describe('BotHandler', () => {
    beforeEach(() => {
        UrlFetchAppStubConfiguration.reset();
    });

    it('should create an instance of BotHandler', () => {
        const handler = new BotHandler();
        expect(handler).toBeInstanceOf(BotHandler);
    });
});
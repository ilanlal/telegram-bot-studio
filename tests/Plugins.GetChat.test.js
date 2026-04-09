require('.');
const PropertiesService = require('@ilanlal/gasmocks/src/properties/PropertiesService');
const { Addon, Common } = require('../src/Addon');
const UrlFetchAppStubConfiguration = require('@ilanlal/gasmocks/src/url-fetch/classes/UrlFetchAppStubConfiguration');
const HttpResponse = require('@ilanlal/gasmocks/src/url-fetch/classes/HttpResponse');

describe('Addon.GetChat', () => {
    const sampleToken = '[FAKE_DUMMY_BOT_TOKEN]';
    beforeEach(() => {
        PropertiesService.getDocumentProperties().setProperty(Common.INPUT.TELEGRAM_BOT.BOT_API_TOKEN, sampleToken);
    });

    // HomeCard test
    it('should create HomeCard', () => {
        // mock event parameters
        const data = {};
        const homeCard = Addon.GetChat.View['HomeCard'](data);
        expect(homeCard).toBeDefined();
        const cardData = homeCard.getData();
        expect(cardData).toBeDefined();

        // No notification
        expect(cardData.notification).toBeUndefined();
    });

    // Load test
    it('should handle Load', () => {

        const chatId = '123456789';
        const event = {
            commonEventObject: {
                formInputs: {
                    'txt_bot_api_token': { stringInputs: { value: [sampleToken] } },
                    'txt_chat_id': { stringInputs: { value: [chatId] } }
                }
            }
        };

        // Mock the getChat API response
        const getChatUrl = `https://api.telegram.org/bot${sampleToken}/getChat?chat_id=${encodeURIComponent(chatId)}`;
        UrlFetchAppStubConfiguration.when(getChatUrl)
            .return(new HttpResponse()
                .setContentText(
                    JSON.stringify({
                        ok: true,
                        result: {
                            id: chatId,
                            type: "private",
                            first_name: "Test",
                            username: "testuser"
                        }
                    })));
        const result = Addon.GetChat.Controller['Load'](event);
        expect(result).toBeDefined();
        const data = result.getData();
        expect(data).toBeDefined();

        // No notification
        expect(data.notification).toBeUndefined();
    });

    afterEach(() => {
        PropertiesService.getDocumentProperties().deleteProperty(Common.INPUT.TELEGRAM_BOT.BOT_API_TOKEN);
    });
});
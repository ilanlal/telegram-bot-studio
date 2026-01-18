require('../../../tests');
const { Plugins } = require('../Plugins');

describe('Plugins.GetChat', () => {
    const sampleToken = '[FAKE_DUMMY_BOT_TOKEN]';
    beforeEach(() => {
        UrlFetchAppStubConfiguration.reset();
    });

    // HomeCard test
    it('should create HomeCard', () => {
        // mock event parameters
        const data = {};
        const homeCard = Plugins.GetChat.View['HomeCard'](data);
        expect(homeCard).toBeDefined();
        const cardData = homeCard.getData();
        expect(cardData).toBeDefined();

        // No notification
        expect(cardData.notification).toBeUndefined();
    });

    // OnLoad test
    it('should handle OnLoad', () => {
        PropertiesService.getUserProperties().setProperty('txt_bot_api_token', sampleToken);
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
        const result = Plugins.GetChat.Controller['Load'](event);
        expect(result).toBeDefined();
        const data = result.getData();
        expect(data).toBeDefined();

        // No notification
        expect(data.notification).toBeUndefined();
    });
});
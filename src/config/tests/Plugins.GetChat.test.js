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
        const homeCard = Plugins.GetChat['HomeCard'](data);
        expect(homeCard).toBeDefined();
        const cardData = homeCard.getData();
        expect(cardData).toBeDefined();
        expect(cardData.name).toBe(Plugins.GetChat.id + '-HomeCard');
        // No notification
        expect(cardData.notification).toBeUndefined();
    });

    // AboutCard test
    it('should create AboutCard', () => {
        const aboutCard = Plugins.GetChat['AboutCard']({});
        expect(aboutCard).toBeDefined();
        const cardData = aboutCard.getData();
        expect(cardData).toBeDefined();
        expect(cardData.name).toBe(`About ${Plugins.GetChat.name}`);
        // No notification
        expect(cardData.notification).toBeUndefined();
    });

    // HelpCard test
    it('should create HelpCard', () => {
        const helpCard = Plugins.GetChat['HelpCard']({});
        expect(helpCard).toBeDefined();
        const cardData = helpCard.getData();
        expect(cardData).toBeDefined();
        expect(cardData.name).toBe(`Help - ${Plugins.GetChat.name}`);
        // No notification
        expect(cardData.notification).toBeUndefined();
    });

    // OnLoad test
    it('should handle OnLoad', () => {
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
        const result = Plugins.GetChat['OnLoad'](event);
        expect(result).toBeDefined();
        const data = result.getData();
        expect(data).toBeDefined();

        // No notification
        expect(data.notification).toBeUndefined();
    });
});
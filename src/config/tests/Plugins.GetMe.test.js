require('../../../tests');
const { Plugins } = require('../Plugins');

describe('Plugins.GetMe', () => {
    const sampleToken = '[FAKE_DUMMY_BOT_TOKEN]';
    beforeEach(() => {
        UrlFetchAppStubConfiguration.reset();
        // Set the bot token in user properties
        PropertiesService.getUserProperties().setProperty('txt_bot_api_token', sampleToken);
    });

    it('should have required properties', () => {
        expect(Plugins.GetMe.id).toBeDefined();
        expect(Plugins.GetMe.name).toBeDefined();
    });

    // HomeCard test
    it('should create HomeCard', () => {
        // mock event parameters
        const e = { parameters: {} };
        const homeCard = Plugins.GetMe.View['HomeCard'](e);
        expect(homeCard).toBeDefined();
        const cardData = homeCard.getData();
        expect(cardData).toBeDefined();

        // No notification
        expect(cardData.notification).toBeUndefined();
    });

    // Load test
    it('should handle Load', () => {
        const event = {
            commonEventObject: {
                formInputs: {
                    'txt_bot_api_token': { stringInputs: { value: [sampleToken] } }
                }
            }
        };

        // Mock the getMe API response
        const getMeUrl = `https://api.telegram.org/bot${sampleToken}/getMe`;
        UrlFetchAppStubConfiguration.when(getMeUrl)
            .return(new HttpResponse()
                .setContentText(
                    JSON.stringify({
                        ok: true,
                        result: { id: 123456789, is_bot: true, first_name: "TestBot", username: "test_bot" }
                    })));
        const result = Plugins.GetMe.Controller['Load'](event);
        expect(result).toBeDefined();
        const data = result.getData();
        expect(data).toBeDefined();

        // No notification
        expect(data.notification).toBeUndefined();
    });
});
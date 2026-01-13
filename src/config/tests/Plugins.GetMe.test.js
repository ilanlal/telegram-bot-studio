require('../../../tests');
const { Plugins } = require('../Plugins');

describe('Plugins.GetMe', () => {
    const sampleToken = '[FAKE_DUMMY_BOT_TOKEN]';
    beforeEach(() => {
        UrlFetchAppStubConfiguration.reset();
    });

    describe('GetMe Plugin', () => {
        it('should have required properties', () => {
            expect(Plugins.GetMe.id).toBeDefined();
            expect(Plugins.GetMe.name).toBeDefined();
        });

        // HomeCard test
        it('should create HomeCard', () => {
            // mock event parameters
            const e = { parameters: {} };
            const homeCard = Plugins.GetMe['HomeCard'](e);
            expect(homeCard).toBeDefined();
            const cardData = homeCard.getData();
            expect(cardData).toBeDefined();
            expect(cardData.name).toBe(Plugins.GetMe.name);
            // No notification
            expect(cardData.notification).toBeUndefined();
        });

        it('should create WelcomeSection', () => {
            const welcomeSection = Plugins.GetMe['WelcomeSection']();
            expect(welcomeSection).toBeDefined();
            const sectionData = welcomeSection.getData();
            expect(sectionData).toBeDefined();
        });

        // AboutCard test
        it('should create AboutCard', () => {
            const aboutCard = Plugins.GetMe['AboutCard']();
            expect(aboutCard).toBeDefined();
            const cardData = aboutCard.getData();
            expect(cardData).toBeDefined();
            expect(cardData.name).toBe(`About ${Plugins.GetMe.name}`);

            // No notification
            expect(cardData.notification).toBeUndefined();
        });

        // HelpCard test
        it('should create HelpCard', () => {
            const helpCard = Plugins.GetMe['HelpCard']();
            expect(helpCard).toBeDefined();
            const cardData = helpCard.getData();
            expect(cardData).toBeDefined();
            expect(cardData.name).toBe(`Help - ${Plugins.GetMe.name}`);

            // No notification
            expect(cardData.notification).toBeUndefined();
        });

        // OnGetMeSubmit test
        it('should handle OnGetMeSubmit', () => {
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
            const result = Plugins.GetMe['OnGetMeSubmit'](event);
            expect(result).toBeDefined();
            const data = result.getData();
            expect(data).toBeDefined();

            // No notification
            expect(data.notification).toBeUndefined();
        });
    });
});
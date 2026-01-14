require('../../../tests');
const { Plugins } = require('../Plugins');

describe('Plugins.Connection', () => {
    const sampleToken = '[FAKE_DUMMY_BOT_TOKEN]';
    beforeEach(() => {
        UrlFetchAppStubConfiguration.reset();
    });

    describe('Connection Plugin', () => {
        it('should have required properties', () => {
            expect(Plugins.Connection.id).toBeDefined();
            expect(Plugins.Connection.name).toBeDefined();
        });

        // HomeCard test
        it('should create HomeCard', () => {
            // mock event parameters
            const e = { parameters: {} };
            const homeCard = Plugins.Connection['HomeCard'](e);
            expect(homeCard).toBeDefined();
            const cardData = homeCard.getData();
            expect(cardData).toBeDefined();
            expect(cardData.name).toBe(Plugins.Connection.id + '-Home');

            // No notification
            expect(cardData.notification).toBeUndefined();
        });

        // OnConnect test
        it('should handle OnConnect', () => {
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

            const result = Plugins.Connection['OnConnect'](event);
            expect(result).toBeDefined();
            const data = result.getData();
            expect(data).toBeDefined();

            // No notification
            expect(data.notification).toBeUndefined();
        });

        // should throw error for empty token
        it('should handle OnConnect with empty token', () => {
            const event = {
                commonEventObject: {
                    formInputs: {
                        'txt_bot_api_token': { stringInputs: { value: [''] } }
                    }
                }
            };

            // should throw error for empty token
            expect(() => {
                Plugins.Connection['OnConnect'](event);
            }).toThrowError('Bot API Token cannot be empty.');

        });

        // OnDisconnect test
        it('should handle OnDisconnect', () => {
            const event = {
                commonEventObject: {}
            };


            const result = Plugins.Connection['OnDisconnect'](event);
            expect(result).toBeDefined();
            const data = result.getData();
            expect(data).toBeDefined();
        });
        
    });
});
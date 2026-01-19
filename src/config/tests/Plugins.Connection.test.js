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
            const homeCard = Plugins.Connection.View['HomeCard'](e);
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

            const result = Plugins.Connection.Controller['Connect'](event);
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
        });

        // should get notification with error for invalid token
        it('should handle OnConnect with invalid token', () => {
            const invalidToken = '';
            const event = {
                commonEventObject: {
                    formInputs: {
                        'txt_bot_api_token': { stringInputs: { value: [invalidToken] } }
                    }
                }
            };
            const result = Plugins.Connection.Controller['Connect'](event);
            expect(result).toBeDefined();
            const data = result.getData();
            expect(data).toBeDefined();

            // Expect notification with error
            expect(data.notification).toBeDefined();
            expect(data.notification.text).toContain('Error: Bot API Token cannot be empty.');
        });

        // Disconnect test
        it('should handle Disconnect', () => {
            const event = {
                commonEventObject: {}
            };


            const result = Plugins.Connection.Controller['Disconnect'](event);
            expect(result).toBeDefined();
            const data = result.getData();
            expect(data).toBeDefined();
        });

        // BuildTokenTextInputWidget test
        it('should build Token Text Input Widget', () => {
            let tokenWidget = Plugins.Connection.View.BuildTokenTextInputWidget(sampleToken, false);
            expect(tokenWidget).toBeDefined();
            let widgetData = tokenWidget.getData();
            expect(widgetData).toBeDefined();
            expect(widgetData.value).toBe(sampleToken);
            expect(widgetData.visibility).toBe(CardService.Visibility.VISIBLE);

            tokenWidget = Plugins.Connection.View.BuildTokenTextInputWidget(sampleToken, true);;
            expect(tokenWidget).toBeDefined();
            widgetData = tokenWidget.getData();
            expect(widgetData).toBeDefined();
            expect(widgetData.value).toBe(sampleToken);
            expect(widgetData.visibility).toBe(CardService.Visibility.HIDDEN);
        });

    });
});
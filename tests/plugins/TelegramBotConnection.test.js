require('..');
const UrlFetchAppStubConfiguration = require('@ilanlal/gasmocks/src/url-fetch/classes/UrlFetchAppStubConfiguration');
const { Plugins } = require('../../src/Plugins.js');
const HttpResponse = require('@ilanlal/gasmocks/src/url-fetch/classes/HttpResponse');
const CardService = require('@ilanlal/gasmocks/src/card/CardService');

describe('Plugins.TelegramBotConnection', () => {
    const sampleToken = '[FAKE_DUMMY_BOT_TOKEN]';
    beforeEach(() => {
        UrlFetchAppStubConfiguration.reset();
    });

    describe('Connection Plugin', () => {
        it('should have required properties', () => {
            expect(Plugins.TelegramBotConnection.id).toBeDefined();
            expect(Plugins.TelegramBotConnection.name).toBeDefined();
        });

        // HomeCard test
        it('should create HomeCard', () => {
            // mock event parameters
            const e = { parameters: {} };
            const homeCard = Plugins.TelegramBotConnection.View['HomeCard'](e);
            expect(homeCard).toBeDefined();
            const cardData = homeCard.getData();
            expect(cardData).toBeDefined();
            expect(cardData.name).toBe(Plugins.TelegramBotConnection.id + '-Home');

            // No notification
            expect(cardData.notification).toBeUndefined();
        });

        // OnConnect test
        it('should handle OnConnect', () => {
            const event = {
                commonEventObject: {
                    formInputs: {
                        [Plugins.INPUT.TELEGRAM_BOT.BOT_API_TOKEN]: { stringInputs: { value: [sampleToken] } },
                        'chk_export_token_to_sheet': { stringInputs: { value: ['export_token'] } }
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
            // Mock the getWebhookInfo API response
            const getWebhookInfoUrl = `https://api.telegram.org/bot${sampleToken}/getWebhookInfo`;
            UrlFetchAppStubConfiguration.when(getWebhookInfoUrl)
                .return(new HttpResponse()
                    .setContentText(JSON.stringify({
                        ok: true,
                        result: {
                            url: 'https://example.com/webhook',
                            has_custom_certificate: false,
                            pending_update_count: 0,
                            last_error_date: 0,
                            last_error_message: '',
                            max_connections: 40,
                            allowed_updates: []
                        }
                    })));
            const result = Plugins.TelegramBotConnection.Controller['Connect'](event);
            expect(result).toBeDefined();
            const data = result.getData();
            expect(data).toBeDefined();

            // No notification
            expect(data.notification).toBeUndefined();
        });

        // should get notification with error for invalid token
        it('should handle OnConnect with invalid token', () => {
            const invalidToken = '';
            const e = {
                commonEventObject: {
                    formInputs: {
                        [Plugins.INPUT.TELEGRAM_BOT.BOT_API_TOKEN]: { stringInputs: { value: [invalidToken] } }
                    }
                }
            };
            const result = Plugins.TelegramBotConnection.Controller['Connect'](e);
            expect(result).toBeDefined();
            const data = result.getData();
            expect(data).toBeDefined();

            // Expect notification with error
            expect(data.notification).toBeDefined();
            expect(data.notification.text).toContain('Error: Bot API Token cannot be empty.');
        });

        // Disconnect test
        it('should handle Disconnect', () => {
            const e = {
                commonEventObject: {}
            };


            const result = Plugins.TelegramBotConnection.Controller['Disconnect'](e);
            expect(result).toBeDefined();
            const data = result.getData();
            expect(data).toBeDefined();
        });

        // BuildTokenTextInputWidget test
        it('should build Token Text Input Widget', () => {
            let tokenWidget = Plugins.TelegramBotConnection.View.BuildTokenTextInputWidget(sampleToken, false);
            expect(tokenWidget).toBeDefined();
            let widgetData = tokenWidget.getData();
            expect(widgetData).toBeDefined();
            expect(widgetData.value).toBe(sampleToken);
            expect(widgetData.visibility).toBe(CardService.Visibility.VISIBLE);

            tokenWidget = Plugins.TelegramBotConnection.View.BuildTokenTextInputWidget(sampleToken, true);;
            expect(tokenWidget).toBeDefined();
            widgetData = tokenWidget.getData();
            expect(widgetData).toBeDefined();
            expect(widgetData.value).toBe(sampleToken);
            expect(widgetData.visibility).toBe(CardService.Visibility.HIDDEN);
        });

    });
});
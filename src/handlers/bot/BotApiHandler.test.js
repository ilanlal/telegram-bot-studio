require('../../../tests');

const { BotApiHandler } = require('./BotApiHandler');

describe('BotApiHandler', () => {
    const sampleToken = '[FAKE_DUMMY_BOT_TOKEN]';
    beforeEach(() => {
        UrlFetchAppStubConfiguration.reset();
    });

    it('should create an instance of BotApiHandler', () => {
        const handler = new BotApiHandler();
        expect(handler).toBeInstanceOf(BotApiHandler);
    });

    // getMe
    test('should handle getMeClick', () => {
        const handler = new BotApiHandler();
        const event = {
            commonEventObject: {
                formInputs: {
                    'txt_bot_api_token': { stringInputs: { value: [sampleToken] } }
                }
            }
        }; // Mock event object
        // Mock the getMe API response
        const getMeUrl = `https://api.telegram.org/bot${sampleToken}/getMe`;
        UrlFetchAppStubConfiguration.when(getMeUrl)
            .return(new HttpResponse()
                .setContentText(JSON.stringify({ result: true })));
        const actionResponse = BotApiHandler.View.onGetMeClick(event);
        expect(actionResponse).toBeDefined();
        const data = actionResponse.getData();
        expect(data).toBeDefined();
    });

    describe('set bot info', () => {
        // setMyName
        test('should handle setMyNameClick', () => {
            const handler = new BotApiHandler();
            const event = {
                commonEventObject: {
                    formInputs: {
                        'txt_bot_api_token': { stringInputs: { value: [sampleToken] } },
                        'bot_name': { stringInputs: { value: ['Test Bot Name'] } },
                        'language_code': { stringInputs: { value: ['en'] } }
                    }
                }
            }; // Mock event object

            // Mock the setMyName API response
            const setMyNameUrl = `https://api.telegram.org/bot${sampleToken}/setMyName`;
            UrlFetchAppStubConfiguration.when(setMyNameUrl)
                .return(new HttpResponse()
                    .setContentText(JSON.stringify({ result: true })));
            const actionResponse = BotApiHandler.View.onSetMyNameClick(event);
            expect(actionResponse).toBeDefined();
            const data = actionResponse.getData();
            expect(data).toBeDefined();
        });

        // setMyDescription
        test('should handle setMyDescriptionClick', () => {
            const handler = new BotApiHandler();
            const event = {
                commonEventObject: {
                    formInputs: {
                        'txt_bot_api_token': { stringInputs: { value: [sampleToken] } },
                        'bot_description': { stringInputs: { value: ['This is a test bot description.'] } },
                        'language_code': { stringInputs: { value: ['en'] } }
                    }
                }
            }; // Mock event object
            const setMyDescriptionUrl = `https://api.telegram.org/bot${sampleToken}/setMyDescription`;
            UrlFetchAppStubConfiguration.when(setMyDescriptionUrl)
                .return(new HttpResponse()
                    .setContentText(JSON.stringify({ result: true })));
            const actionResponse = BotApiHandler.View.onSetMyDescriptionClick(event);
            expect(actionResponse).toBeDefined();
            const data = actionResponse.getData();
            expect(data).toBeDefined();
        });

        // setMyShortDescription
        test('should handle setMyShortDescriptionClick', () => {
            const handler = new BotApiHandler();
            const event = {
                commonEventObject: {
                    formInputs: {
                        'txt_bot_api_token': { stringInputs: { value: [sampleToken] } },
                        'bot_short_description': { stringInputs: { value: ['This is a test bot short description.'] } },
                        'language_code': { stringInputs: { value: ['en'] } }
                    }
                }
            }; // Mock event object
            const setMyShortDescriptionUrl = `https://api.telegram.org/bot${sampleToken}/setMyShortDescription`;
            UrlFetchAppStubConfiguration.when(setMyShortDescriptionUrl)
                .return(new HttpResponse()
                    .setContentText(JSON.stringify({ result: true })));
            const actionResponse = BotApiHandler.View.onSetMyShortDescriptionClick(event);
            expect(actionResponse).toBeDefined();
            const data = actionResponse.getData();
            expect(data).toBeDefined();
        });

        // setMyCommands
        test('should handle setMyCommandsClick', () => {
            const handler = new BotApiHandler();
            const event = {
                commonEventObject: {
                    formInputs: {
                        'txt_bot_api_token': { stringInputs: { value: [sampleToken] } },
                        'bot_commands': { stringInputs: { value: ['/start - Start the bot\n/help - Get help'] } },
                        'language_code': { stringInputs: { value: ['en'] } }
                    }
                }
            }; // Mock event object
            const setMyCommandsUrl = `https://api.telegram.org/bot${sampleToken}/setMyCommands`;
            UrlFetchAppStubConfiguration.when(setMyCommandsUrl)
                .return(new HttpResponse()
                    .setContentText(JSON.stringify({ result: true })));
            const actionResponse = BotApiHandler.View.onSetMyCommandsClick(event);
            expect(actionResponse).toBeDefined();
            const data = actionResponse.getData();
            expect(data).toBeDefined();
        });
    });

    afterEach(() => {
        UrlFetchAppStubConfiguration.reset();
        PropertiesService.getDocumentProperties().deleteAllProperties();
        PropertiesService.getUserProperties().deleteAllProperties();
        PropertiesService.getScriptProperties().deleteAllProperties();
        jest.clearAllMocks();
    });
});
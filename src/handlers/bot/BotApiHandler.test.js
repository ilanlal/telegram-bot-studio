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

    // getChat
    test('should handle getChatClick', () => {
        const chatId = '@testchannel';
        const handler = new BotApiHandler();
        const event = {
            commonEventObject: {
                formInputs: {
                    'txt_bot_api_token': { stringInputs: { value: [sampleToken] } },
                    'txt_chat_id': { stringInputs: { value: [chatId] } }
                }
            }
        }; // Mock event object
        // Mock the getChat API response
        const getChatUrl = `https://api.telegram.org/bot${sampleToken}/getChat?chat_id=${encodeURIComponent(chatId)}`;
        UrlFetchAppStubConfiguration.when(getChatUrl)
            .return(new HttpResponse()
                .setContentText(JSON.stringify({ result: true })));

        const actionResponse = BotApiHandler.View.GetChat(event);
        expect(actionResponse).toBeDefined();
        const data = actionResponse.getData();
        expect(data).toBeDefined();
    });

    // fetchWebhook
    test('should handle fetchWebhookClick', () => {
        const handler = new BotApiHandler();
        const event = {
            commonEventObject: {
                formInputs: {
                    'txt_bot_api_token': { stringInputs: { value: [sampleToken] } }
                }
            }
        };
        // Mock the getWebhookInfo API response
        const getWebhookInfoUrl = `https://api.telegram.org/bot${sampleToken}/getWebhookInfo`;
        UrlFetchAppStubConfiguration.when(getWebhookInfoUrl)
            .return(new HttpResponse()
                .setContentText(JSON.stringify({ result: true })));
        const actionResponse = BotApiHandler.View.FetchWebhook(event);
        expect(actionResponse).toBeDefined();
        const data = actionResponse.getData();
        expect(data).toBeDefined();
    });

    // deleteWebhook
    test('should handle deleteWebhookClick', () => {
        const handler = new BotApiHandler();
        const event = {
            commonEventObject: {
                formInputs: {
                    'txt_bot_api_token': { stringInputs: { value: [sampleToken] } }
                }
            },
            parameters: {
                current_webhook_url: 'https://example.com/webhook'
            }
        };

        // Mock the deleteWebhook API response
        const deleteWebhookUrl = `https://api.telegram.org/bot${sampleToken}/deleteWebhook`;
        UrlFetchAppStubConfiguration.when(deleteWebhookUrl)
            .return(new HttpResponse()
                .setContentText(JSON.stringify({ result: true })));
        const actionResponse = BotApiHandler.View.DeleteWebhook(event);
        expect(actionResponse).toBeDefined();
        const data = actionResponse.getData();
        expect(data).toBeDefined();
    });

    // setWebhook (url only)
    test('should handle setWebhookClick (url only)', () => {
        const handler = new BotApiHandler();
        const event = {
            commonEventObject: {
                formInputs: {
                    'txt_bot_api_token': { stringInputs: { value: [sampleToken] } },
                    'txt_webhook_url': { stringInputs: { value: ['https://example.com/webhook'] } }
                }
            }
        };
        // Mock the setWebhook API response
        const setWebhookUrl = `https://api.telegram.org/bot${sampleToken}/setWebhook`;
        UrlFetchAppStubConfiguration.when(setWebhookUrl)
            .return(new HttpResponse()
                .setContentText(JSON.stringify({ ok: true, result: true })));

        const actionResponse = BotApiHandler.View.SetWebhook(event);
        expect(actionResponse).toBeDefined();
        const data = actionResponse.getData();
        expect(data).toBeDefined();
    });

    // setWebhook (with options)
    test('should handle setWebhookClick (with options)', () => {
        const handler = new BotApiHandler();
        const event = {
            commonEventObject: {
                formInputs: {
                    'txt_bot_api_token': { stringInputs: { value: [sampleToken] } },
                    'txt_webhook_url': { stringInputs: { value: ['https://example.com/webhook'] } },
                    'drop_pending_updates_switch': { stringInputs: { value: ['true'] } },
                    'txt_ip_address': { stringInputs: { value: ['192.168.1.1'] } },
                    'txt_max_connections': { stringInputs: { value: ['40'] } }
                }
            }
        };

        // Mock the setWebhook API response
        const setWebhookUrl = `https://api.telegram.org/bot${sampleToken}/setWebhook`;
        UrlFetchAppStubConfiguration.when(setWebhookUrl)
            .return(new HttpResponse()
                .setContentText(JSON.stringify({ ok: true, result: true })));
        const actionResponse = BotApiHandler.View.SetWebhook(event);
        expect(actionResponse).toBeDefined();
        const data = actionResponse.getData();
        expect(data).toBeDefined();
    });

    // setWebhook (with max connections > 100) should throw error
    test('should handle setWebhookClick (with max connections > 100)', () => {
        const handler = new BotApiHandler();
        const event = {
            commonEventObject: {
                formInputs: {
                    'txt_bot_api_token': { stringInputs: { value: [sampleToken] } },
                    'txt_webhook_url': { stringInputs: { value: ['https://example.com/webhook'] } },
                    'txt_max_connections': { stringInputs: { value: ['150'] } }
                }
            }
        };
        const setWebhookUrl = `https://api.telegram.org/bot${sampleToken}/setWebhook`;
        UrlFetchAppStubConfiguration.when(setWebhookUrl)
            .return(new HttpResponse()
                .setContentText(JSON.stringify({ ok: true, result: true })));

        //expect(() => BotApiHandler.View.SetWebhook(event)).toThrow('Max connections must be between 1 and 100.');
        // response should contain error message
        const actionResponse = BotApiHandler.View.SetWebhook(event);
        expect(actionResponse).toBeDefined();
        const data = actionResponse.getData();
        expect(data).toBeDefined();
        expect(JSON.stringify(data)).toContain('Error:');
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
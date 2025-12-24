require('../../../../tests');
const { WebhookHandler } = require('./WebhookHandler');

describe('WebhookHandler', () => {
    const dummyToken = 'DUMMY_BOT_TOKEN';
    beforeEach(() => {
        UrlFetchAppStubConfiguration.reset();
        // Set dummy bot token in script properties
        PropertiesService.getScriptProperties().setProperty(EnvironmentModel.InputMeta.BOT_API_TOKEN, dummyToken);
    });

    it('should run doPost message handler', () => {
        const event = {
            postData: JSON.stringify({
                contents: {
                    message: {
                        from: { id: 5678, is_bot: false, first_name: 'Test User' },
                        chat: { id: 5678, first_name: 'Test User', type: 'private' },
                        date: 1700000000,
                        text: '/start'
                    }
                }
            })
        };

        const response = WebhookHandler.handlePostUpdateRequest(event.postData);
        expect(response).toBeDefined();
    });

    it('should run doPost callback_query handler', () => {
        const event = {
            postData: JSON.stringify({
                contents: {
                    callback_query: {
                        id: '1234567890',
                        from: {
                            id: 123456,
                            language_code: 'en'
                        },
                        data: 'button_clicked'
                    }
                }
            })
        };

        const sendMessgeUrl = `https://api.telegram.org/bot${dummyToken}/sendMessage`;

        // Mock the sendMessage API response
        UrlFetchAppStubConfiguration.when(sendMessgeUrl)
            .return(new HttpResponse()
                .setContentText(JSON.stringify({
                    result: {
                        message_id: 1,
                    }
                })));

        const response = WebhookHandler.handlePostUpdateRequest(event.postData);
        expect(response).toBeDefined();
    });

    it('should throw error for invalid message format', () => {
        const content = { message: {} };
        expect(() => WebhookHandler.handlePostUpdateRequest(content.postData)).toThrow('Invalid message format');
    });
});
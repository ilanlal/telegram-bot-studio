require('../../../../tests');
const { WebhookHandler } = require('./WebhookHandler');

describe('WebhookHandler', () => {
    const dummyToken = 'DUMMY_BOT_TOKEN';
    beforeEach(() => {
        UrlFetchAppStubConfiguration.reset();
    });

    it('should run doPost message handler', () => {
        const event = {
            postData: {
                contents: JSON.stringify({
                    message: {
                        from: {
                            id: 123456,
                            language_code: 'en'
                        },
                        text: 'Hello, world!'
                    }
                })
            }
        };

        const response = WebhookHandler.handlePostUpdateRequest(event.postData);
        expect(response).toBeDefined();
    });

    it('should run doPost callback_query handler', () => {
        const event = {
            postData: {
                contents: JSON.stringify({
                    inline_query: {
                        from: {
                            id: 123456,
                            language_code: 'en'
                        },
                        query: 'inline_query'
                    }
                })
            }
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
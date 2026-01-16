require('../../../tests');
const { Plugins } = require('../Plugins');

describe('Plugins.Webhook', () => {
    const sampleToken = '[FAKE_DUMMY_BOT_TOKEN]';
    beforeEach(() => {
        UrlFetchAppStubConfiguration.reset();
        PropertiesService.getUserProperties().setProperty('txt_bot_api_token', sampleToken);
    });

    // OnLoad test
    it('should create OnLoad', () => {
        // mock event parameters
        const e = {
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
                .setContentText(JSON.stringify({
                    ok: true,
                    result: {
                        url: ''
                    }
                })));

        // Call OnLoad without result
        const homeCard = Plugins.Webhook['OnLoad'](e);
        expect(homeCard).toBeDefined();
        const cardData = homeCard.getData();
        expect(cardData).toBeDefined();
        // No notification
        expect(cardData.notification).toBeUndefined();
    });

    // OnSetWebhook test
    it('should handle OnSetWebhook', () => {
        const webhookUrl = 'https://example.com/webhook';
        const event = {
            commonEventObject: {
                formInputs: {
                    'txt_bot_api_token': { stringInputs: { value: [sampleToken] } },
                    'txt_webhook_url': { stringInputs: { value: [webhookUrl] } },
                    'drop_pending_updates': { stringInputs: { value: ['false'] } }
                }
            }
        };
        // Mock the setWebhook API response
        const setWebhookUrl = `https://api.telegram.org/bot${sampleToken}/setWebhook`;
        UrlFetchAppStubConfiguration.when(setWebhookUrl)
            .return(new HttpResponse()
                .setContentText(JSON.stringify({ ok: true, result: true })));
        // Mock the getWebhookInfo API response
        const getWebhookInfoUrl = `https://api.telegram.org/bot${sampleToken}/getWebhookInfo`;
        UrlFetchAppStubConfiguration.when(getWebhookInfoUrl)
            .return(new HttpResponse()
                .setContentText(JSON.stringify({
                    ok: true,
                    result: {
                        url: webhookUrl,
                        has_custom_certificate: false,
                        pending_update_count: 0,
                        last_error_date: 0,
                        last_error_message: '',
                        max_connections: 40,
                        allowed_updates: []
                    }
                })));
        const result = Plugins.Webhook['OnSetWebhook'](event);
        expect(result).toBeDefined();
        const data = result.getData();
        expect(data).toBeDefined();
        // No 'error' string in notification
        expect(JSON.stringify(data.notification)).not.toMatch(/error/i);
    });

    // OnDeleteWebhook test
    it('should handle OnDeleteWebhook', () => {
        const event = {
            commonEventObject: {
                formInputs: {
                    'txt_bot_api_token': { stringInputs: { value: [sampleToken] } },
                    'drop_pending_updates': { stringInputs: { value: ['true'] } }
                }
            }
        };

        // Mock the deleteWebhook API response
        const deleteWebhookUrl = `https://api.telegram.org/bot${sampleToken}/deleteWebhook`;
        UrlFetchAppStubConfiguration.when(deleteWebhookUrl)
            .return(new HttpResponse()
                .setContentText(JSON.stringify({ ok: true, result: true })));
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
        const result = Plugins.Webhook['OnDeleteWebhook'](event);
        expect(result).toBeDefined();
        const data = result.getData();
        expect(data).toBeDefined();

        // No 'error' string in notification
        expect(JSON.stringify(data.notification)).not.toMatch(/error/i);
    });
});
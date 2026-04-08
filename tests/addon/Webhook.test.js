require('..');
const UrlFetchAppStubConfiguration = require('@ilanlal/gasmocks/src/url-fetch/classes/UrlFetchAppStubConfiguration');
const { Addon, Common } = require('../../src/Addon');
const PropertiesService = require('@ilanlal/gasmocks/src/properties/PropertiesService');
const HttpResponse = require('@ilanlal/gasmocks/src/url-fetch/classes/HttpResponse');

describe('Addon.Webhook', () => {
    const Controller = Addon.Webhook.Controller;
    const sampleToken = '[FAKE_DUMMY_BOT_TOKEN]';

    beforeEach(() => {
        UrlFetchAppStubConfiguration.reset();
        PropertiesService.getDocumentProperties().setProperty(Common.INPUT.TELEGRAM_BOT.BOT_API_TOKEN, sampleToken);
    });

    // Load test
    it('should create Load', () => {
        // mock event parameters
        const e = {
            commonEventObject: {
                formInputs: {
                    [Common.INPUT.TELEGRAM_BOT.BOT_API_TOKEN]: { stringInputs: { value: [sampleToken] } }
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

        // Call Load without result
        const homeCard = Controller['Load'](e);
        expect(homeCard).toBeDefined();
        const cardData = homeCard.getData();
        expect(cardData).toBeDefined();
        // No notification
        expect(cardData.notification).toBeUndefined();
    });

    // OnSetWebhook test
    it('should handle OnSetWebhook', () => {
        const webhookUrl = 'https://example.com/webhook';
        const e = {
            commonEventObject: {
                formInputs: {
                    [Common.INPUT.TELEGRAM_BOT.BOT_API_TOKEN]: { stringInputs: { value: [sampleToken] } },
                    [Common.INPUT.TELEGRAM_BOT.BOT_WEBHOOK_URL]: { stringInputs: { value: [webhookUrl] } },
                    [Common.INPUT.TELEGRAM_BOT.DROP_PENDING_UPDATES]: { stringInputs: { value: ['false'] } }
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
        const result = Controller['SetWebhook'](e);
        expect(result).toBeDefined();
        const data = result.getData();
        expect(data).toBeDefined();
        // no notification
        expect(data.notification).toBeUndefined();
    });

    // OnDeleteWebhook test
    it('should handle OnDeleteWebhook', () => {
        const e = {
            commonEventObject: {
                formInputs: {
                    [Common.INPUT.TELEGRAM_BOT.BOT_API_TOKEN]: { stringInputs: { value: [sampleToken] } },
                    [Common.INPUT.TELEGRAM_BOT.DROP_PENDING_UPDATES]: { stringInputs: { value: ['true'] } }
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
        const result = Controller['DeleteWebhook'](e);
        expect(result).toBeDefined();
        const data = result.getData();
        expect(data).toBeDefined();

        // no notification
        expect(data.notification).toBeUndefined();
    });
});
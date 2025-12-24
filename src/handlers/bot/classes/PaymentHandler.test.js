require('../../../../tests');

const { PaymentHandler } = require('./PaymentHandler');

describe('PaymentHandler', () => {
    beforeEach(() => {
        UrlFetchAppStubConfiguration.reset();
    });

    test('should create an instance of PaymentHandler', () => {
        const handler = new PaymentHandler();
        expect(handler).toBeInstanceOf(PaymentHandler);
    });

    test('should handle createInvoiceLinkClick', () => {
        
        const event = {
            commonEventObject: {
                formInputs: {
                    'invoice_title': { stringInputs: { value: ['Test Invoice'] } },
                    'invoice_description': { stringInputs: { value: ['This is a test invoice'] } },
                    'invoice_payload': { stringInputs: { value: ['payload_123'] } },
                    'provider_token': { stringInputs: { value: ['PROVIDER_TOKEN'] } },
                    'currency': { stringInputs: { value: ['USD'] } },
                    'prices': { stringInputs: { value: ['1000'] } },
                    'txt_bot_api_token': { stringInputs: { value: ['DUMMY_BOT_TOKEN'] } }
                }
            }
        }; // Mock event object
        const response = PaymentHandler.View.onCreateInvoiceLinkClick(event);
        expect(response).toBeDefined();
    });
});
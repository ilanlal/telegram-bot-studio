require('../../../tests');

const { BotModel } = require('./BotModel');
const { SheetModel } = require('./SheetModel');
const { EnvironmentModel } = require('./EnvironmentModel');
const { EMD } = require('../../config/EMD');

describe('BotModel', () => {
    /** @type {BotModel} */
    let model;
    const sampleToken = '[FAKE_DUMMY_BOT_TOKEN]';
    beforeEach(() => {
        UrlFetchAppStubConfiguration.reset();
        SpreadsheetStubConfiguration.reset();
        model = BotModel.create();
    });

    test('should create a BotModel instance', () => {
        expect(model).toBeInstanceOf(BotModel);
    });

    describe('webhook', () => {
        const deploymentId = 'AKfycbx...';
        const callbackUrl = `https://script.google.com/macros/s/${deploymentId}/exec`;

        // setWebhook
        test('should set webhook', () => {
            const setWebhookUri = `https://api.telegram.org/bot${sampleToken}/setWebhook?url=${callbackUrl}`;
            UrlFetchAppStubConfiguration.when(setWebhookUri)
                .return(new HttpResponse()
                    .setContentText(JSON.stringify({ result: true })));

            const result = model.setWebhook(sampleToken, deploymentId);

            expect(result).toBe(true);
        });

        // deleteWebhook
        test('should delete webhook', () => {
            const deleteWebhookUri = `https://api.telegram.org/bot${sampleToken}/deleteWebhook`;
            UrlFetchAppStubConfiguration.when(deleteWebhookUri)
                .return(new HttpResponse()
                    .setContentText(JSON.stringify({ result: true })));
            const result = model.deleteWebhook(sampleToken, deploymentId);
            expect(result).toBe(true);
        });
    });

    describe('set bot info', () => {
        // getMe
        test('should get bot info', () => {
            const apiUrl = `https://api.telegram.org/bot${sampleToken}/getMe`;
            UrlFetchAppStubConfiguration.when(apiUrl)
                .return(new HttpResponse()
                    .setContentText(JSON.stringify({ result: true })));
            const result = model.getMe(sampleToken);
            expect(result).toBe(true);
        });

        // setMyName
        test('should set bot name', () => {
            const apiUrl = `https://api.telegram.org/bot${sampleToken}/setMyName`;
            UrlFetchAppStubConfiguration.when(apiUrl)
                .return(new HttpResponse()
                    .setContentText(JSON.stringify({ result: true })));

            const result = model.setMyName(sampleToken, 'TestBot', 'en');
            expect(result).toBe(true);
        });

        // setMyDescription
        test('should set bot description', () => {
            const apiUrl = `https://api.telegram.org/bot${sampleToken}/setMyDescription`;
            UrlFetchAppStubConfiguration.when(apiUrl)
                .return(new HttpResponse()
                    .setContentText(JSON.stringify({ result: true })));

            const result = model.setMyDescription(sampleToken, 'This is a test bot', 'en');
            expect(result).toBe(true);
        });

        // setMyShortDescription
        test('should set bot short description', () => {
            const apiUrl = `https://api.telegram.org/bot${sampleToken}/setMyShortDescription`;
            UrlFetchAppStubConfiguration.when(apiUrl)
                .return(new HttpResponse()
                    .setContentText(JSON.stringify({ result: true })));

            const result = model.setMyShortDescription(sampleToken, 'Test bot', 'en');
            expect(result).toBe(true);
        });

        // setMyCommands
        test('should set bot commands', () => {
            const apiUrl = `https://api.telegram.org/bot${sampleToken}/setMyCommands`;
            UrlFetchAppStubConfiguration.when(apiUrl)
                .return(new HttpResponse()
                    .setContentText(JSON.stringify({ result: true })));

            const result = model.setMyCommands(sampleToken, [
                { command: 'start', description: 'Start the bot' },
                { command: 'help', description: 'Get help' }
            ], 'en');
            expect(result).toBe(true);
        });
    });
});
require("@ilanlal/gasmocks");

const { TelegramBotClient } = require('./TelegramBotClient');
describe("TelegramBotClient", () => {
    const sampleToken = '[DUMMY_BOT_TOKEN]';
    const telegramBotClient = new TelegramBotClient(sampleToken);

    beforeEach(() => {
        // Reset any configurations if needed before each test
        UrlFetchAppStubConfiguration.reset();
    });

    // getMe
    describe("getMe Tests", () => {
        test("getMe method should return status 200", () => {
            const contentText = `{
            "result": {
                "id": 123456789,
                "is_bot": true,
                "first_name": "Test",
                "last_name": "User",
                "username": "testuser",
                "language_code": "en"
            }
        }`;

            UrlFetchAppStubConfiguration.when(`https://api.telegram.org/bot${sampleToken}/getMe`)
                .return(new HttpResponse().setContentText(contentText));

            const response = telegramBotClient.getMe();

            expect(response.getResponseCode()).toBe(200);
            expect(response.getContentText()).toBe(contentText);
        });
    });


    describe("Webhook Tests", () => {
        // test getWebhookInfo execution
        test("getWebhookInfo method should return status 200", () => {
            /* @see https://core.telegram.org/bots/api#getwebhookinfo */
            const contentText = `{
            "result": {
                "url": "https://example.com/webhook",
                "has_custom_certificate": false,
                "pending_update_count": 0,
                "ip_address": "192.0.2.1",
                "last_error_date": 0,
                "last_error_message": "",
                "max_connections": 40,
                "allowed_updates": []
            }
        }`;

            UrlFetchAppStubConfiguration.when(`https://api.telegram.org/bot${sampleToken}/getWebhookInfo`)
                .return(new HttpResponse().setContentText(contentText));

            const response = telegramBotClient.getWebhookInfo();

            expect(response.getResponseCode()).toBe(200);
            expect(response.getContentText()).toBe(contentText);
        });

        // test setWebhook execution
        test("setWebhook method should return status 200", () => {
            /* @see https://core.telegram.org/bots/api#setwebhook */
            const contentText = `{
            "ok": true,
            "result": true
        }`;
            const webAppUrl = 'https://script.google.com/macros/s/AKfycbx.../exec';
            const callbackUrl = `https://api.telegram.org/bot${sampleToken}/setWebhook?url=${webAppUrl}`;
            UrlFetchAppStubConfiguration.when(callbackUrl)
                .return(new HttpResponse().setContentText(contentText));

            const response = telegramBotClient.setWebhook(webAppUrl);

            expect(response.getResponseCode()).toBe(200);
            expect(response.getContentText()).toBe(contentText);
        });

        // test deleteWebhook execution
        test("deleteWebhook method should return status 200", () => {
            /* @see https://core.telegram.org/bots/api#deletewebhook */
            const contentText = `{
            "result": true
        }`;
            const webAppUrl = 'https://script.google.com/macros/s/AKfycbx.../exec';
            const callbackUrl = `https://api.telegram.org/bot${sampleToken}/deleteWebhook`;

            UrlFetchAppStubConfiguration.when(callbackUrl)
                .return(new HttpResponse().setContentText(contentText));

            const response = telegramBotClient.deleteWebhook(webAppUrl);

            expect(response.getResponseCode()).toBe(200);
            expect(response.getContentText()).toBe(contentText);
        });
    });

    // setMyName, setMyDescription, setMyShortDescription, setMyCommands
    describe("TelegramBotClient setMyName, setMyDescription, setMyShortDescription Tests", () => {
        // test setMyName execution
        test("setMyName method should return status 200", () => {
            /* @see https://core.telegram.org/bots/api#setmyname */
            const contentText = `{
            "result": true
        }`;
            const name = "New Bot Name";
            const callbackUrl = `https://api.telegram.org/bot${sampleToken}/setMyName`;

            UrlFetchAppStubConfiguration.when(callbackUrl)
                .return(new HttpResponse().setContentText(contentText));

            const response = telegramBotClient.setMyName({
                name,
                language: 'en'
            });

            expect(response.getResponseCode()).toBe(200);
            expect(response.getContentText()).toBe(contentText);
        });

        // test setMyDescription execution
        test("setMyDescription method should return status 200", () => {
            /* @see https://core.telegram.org/bots/api#setmydescription */
            const contentText = `{
            "result": true
        }`;
            const description = "New Bot Description";
            const callbackUrl = `https://api.telegram.org/bot${sampleToken}/setMyDescription`;

            UrlFetchAppStubConfiguration.when(callbackUrl)
                .return(new HttpResponse().setContentText(contentText));

            const response = telegramBotClient.setMyDescription({
                description,
                language: 'en'
            });

            expect(response.getResponseCode()).toBe(200);
            expect(response.getContentText()).toBe(contentText);
        });

        // test setMyShortDescription execution
        test("setMyShortDescription method should return status 200", () => {
            /* @see https://core.telegram.org/bots/api#setmyshortdescription */
            const contentText = `{
            "result": true
        }`;
            const shortDescription = "New Short Description";
            const callbackUrl = `https://api.telegram.org/bot${sampleToken}/setMyShortDescription`;

            UrlFetchAppStubConfiguration.when(callbackUrl)
                .return(new HttpResponse().setContentText(contentText));

            const response = telegramBotClient.setMyShortDescription({
                short_description: shortDescription,
                language: 'en'
            });

            expect(response.getResponseCode()).toBe(200);
            expect(response.getContentText()).toBe(contentText);
        });

        // test setMyCommands execution
        test("setMyCommands method should return status 200", () => {
            /* @see https://core.telegram.org/bots/api#setmycommands */
            const contentText = `{
            "result": true
        }`;
            const commands = [
                {
                    command: "start",
                    scope: "Start the bot"
                },
                {
                    command: "help",
                    scope: "Get help"
                }
            ];
            const language = 'en';
            const scope = 'default';
            const callbackUrl = `https://api.telegram.org/bot${sampleToken}/setMyCommands`;

            UrlFetchAppStubConfiguration.when(callbackUrl)
                .return(new HttpResponse().setContentText(contentText));

            const response = telegramBotClient.setMyCommands({
                commands,
                language,
                scope
            });

            expect(response.getResponseCode()).toBe(200);
            expect(response.getContentText()).toBe(contentText);
        });
    });

});
require('..');
const PropertiesService = require('@ilanlal/gasmocks/src/properties/PropertiesService');
const { Addon, Common } = require('../../src/Addon.js');
const UrlFetchAppStubConfiguration = require('@ilanlal/gasmocks/src/url-fetch/classes/UrlFetchAppStubConfiguration');
// const HttpResponse = require('@ilanlal/gasmocks/src/url-fetch/classes/HttpResponse');
const SpreadsheetStubConfiguration = require('@ilanlal/gasmocks/src/spreadsheetapp/classes/SpreadsheetStubConfiguration');

describe('Addon.BotSetup', () => {
    // const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const dummyToken = 'DUMMY_BOT_TOKEN';
    beforeEach(() => {
        // Set up any necessary mocks or spies before each test
        PropertiesService.getScriptProperties().setProperty(Common.INPUT.TELEGRAM_BOT.BOT_API_TOKEN, dummyToken);
        UrlFetchAppStubConfiguration.reset();
        SpreadsheetStubConfiguration.reset();
    });

    // Controller
    describe('Controller', () => {
        it('should have required properties', () => {
            expect(Addon.BotSetup.id).toBeDefined();
            expect(Addon.BotSetup.name).toBeDefined();
        });

        // FetchCurrentInfo
        it('should fetch current bot info', () => {
            // Mock the getMe API response
            const getMeUrl = `https://api.telegram.org/bot${dummyToken}/getMe`;
            UrlFetchAppStubConfiguration.when(getMeUrl)
                .return({
                    getContentText: () => JSON.stringify({
                        ok: true,
                        result: { id: 123456789, is_bot: true, first_name: "TestBot", username: "test_bot" }
                    })
                });
            // Mock getMyName API response
            const getMyNameUrl = `https://api.telegram.org/bot${dummyToken}/getMyName?language_code=en`;
            UrlFetchAppStubConfiguration.when(getMyNameUrl)
                .return({
                    getContentText: () => JSON.stringify({
                        ok: true,
                        result: { name: "TestBot" }
                    })
                });

            // Mock getMyDescription API response
            const getMyDescriptionUrl = `https://api.telegram.org/bot${dummyToken}/getMyDescription?language_code=en`;
            UrlFetchAppStubConfiguration.when(getMyDescriptionUrl)
                .return({
                    getContentText: () => JSON.stringify({
                        ok: true,
                        result: { description: "Test description" }
                    })
                });

            // Mock getMyShortDescription API response
            const getMyShortDescriptionUrl = `https://api.telegram.org/bot${dummyToken}/getMyShortDescription?language_code=en`;
            UrlFetchAppStubConfiguration.when(getMyShortDescriptionUrl)
                .return({
                    getContentText: () => JSON.stringify({
                        ok: true,
                        result: { short_description: "Test short description" }
                    })
                });

            // Mock getMyProfilePhotos API response
            const getMyProfilePhotosUrl = `https://api.telegram.org/bot${dummyToken}/getMyProfilePhotos`;
            UrlFetchAppStubConfiguration.when(getMyProfilePhotosUrl)
                .return({
                    getContentText: () => JSON.stringify({
                        ok: true,
                        result: { photos: [] }
                    })
                });

            // Mock getMyCommands API response
            const getMyCommandsUrl = `https://api.telegram.org/bot${dummyToken}/getMyCommands?language_code=en`;
            UrlFetchAppStubConfiguration.when(getMyCommandsUrl)
                .return({
                    getContentText: () => JSON.stringify({
                        ok: true,
                        result: { commands: [] }
                    })
                });


            const e = { formInput: { language: 'en' } };
            const card = Addon.BotSetup.Controller['FetchCurrentInfo'](e);
            expect(card).toBeDefined();
            // Additional assertions can be added here to verify the card's content
        });
    });

    // View
    describe('View', () => {
        it('should create HomeCard', () => {
            // mock event parameters
            const e = { parameters: {} };
            const homeCard = Addon.BotSetup.View['HomeCard'](e);
            expect(homeCard).toBeDefined();
            const cardData = homeCard.getData();
            expect(cardData).toBeDefined();
            expect(cardData.name).toBe(Addon.BotSetup.id + '-Home');
        });
    });
});
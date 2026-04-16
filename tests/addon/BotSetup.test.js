require('..');
const PropertiesService = require('@ilanlal/gasmocks/src/properties/PropertiesService');
const { Addon, Common } = require('../../src/Addon.js');
const UrlFetchAppStubConfiguration = require('@ilanlal/gasmocks/src/url-fetch/classes/UrlFetchAppStubConfiguration');
// const HttpResponse = require('@ilanlal/gasmocks/src/url-fetch/classes/HttpResponse');
const SpreadsheetStubConfiguration = require('@ilanlal/gasmocks/src/spreadsheetapp/classes/SpreadsheetStubConfiguration');

describe('Addon.BotSetup', () => {
    // const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const dummyToken = 'DUMMY_BOT_TOKEN';
    const dummyApiKey = 'DUMMY_GEMINI_API_KEY';
    beforeEach(() => {
        // Set up any necessary mocks or spies before each test
        PropertiesService.getDocumentProperties().setProperty(Common.INPUT.TELEGRAM_BOT.BOT_API_TOKEN, dummyToken);
        PropertiesService.getDocumentProperties().setProperty(Common.INPUT.GEMINI.GEMINI_API_KEY, dummyApiKey);
        UrlFetchAppStubConfiguration.reset();
        SpreadsheetStubConfiguration.reset();
    });

    // Controller
    describe('Controller', () => {
        it('should have required properties', () => {
            expect(Addon.BotSetup.id).toBeDefined();
            expect(Addon.BotSetup.name).toBeDefined();
        });

        // PushHomeCard test
        it('should PushHomeCard', () => {
            // mock event parameters
            const e = {
                commonEventObject: {
                    formInputs: {
                    }
                }
            };
            const res = Addon.BotSetup.Controller['PushHomeCard'](e);
            expect(res).toBeDefined();
            const cardData = res.getData();
            // No notification
            expect(cardData.notification).toBeUndefined();
        });

        // // FetchCurrentInfo with no language test
        it('should fetch current bot info with no language', () => {
            // Mock the getMe API response
            // Mock getMyName API response
            const getMyNameUrl = `https://api.telegram.org/bot${dummyToken}/getMyName`;
            UrlFetchAppStubConfiguration.when(getMyNameUrl)
                .return({
                    getContentText: () => JSON.stringify({
                        ok: true,
                        result: { name: "TestBot" }
                    })
                });

            // Mock getMyDescription API response
            const getMyDescriptionUrl = `https://api.telegram.org/bot${dummyToken}/getMyDescription`;
            UrlFetchAppStubConfiguration.when(getMyDescriptionUrl)
                .return({
                    getContentText: () => JSON.stringify({
                        ok: true,
                        result: { description: "Test description" }
                    })
                });

            // Mock getMyShortDescription API response
            const getMyShortDescriptionUrl = `https://api.telegram.org/bot${dummyToken}/getMyShortDescription`;
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
            const getMyCommandsUrl = `https://api.telegram.org/bot${dummyToken}/getMyCommands`;
            UrlFetchAppStubConfiguration.when(getMyCommandsUrl)
                .return({
                    getContentText: () => JSON.stringify({
                        ok: true,
                        result: { commands: [] }
                    })
                });

            const e = { commonEventObject: { formInputs: { sourceLanguage: { stringInputs: { value: [''] } } } } };
            const card = Addon.BotSetup.Controller['FetchCurrentInfo'](e);
            expect(card).toBeDefined();
        });

        // FetchCurrentInfo for en language test
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


            const e = { commonEventObject: { formInputs: { sourceLanguage: { stringInputs: { value: ['en'] } } } } };
            const card = Addon.BotSetup.Controller['FetchCurrentInfo'](e);
            expect(card).toBeDefined();
            // Additional assertions can be added here to verify the card's content
            const cardData = card.getData();
            expect(cardData).toBeDefined();
            // No notification
            expect(cardData.notification).toBeUndefined();
        });

        // SuggestTranslation test
        it('should suggest translation', () => {
            const formInput = {
                name: { stringInputs: { value: ['TestBot'] } },
                description: { stringInputs: { value: ['Test description'] } },
                shortDescription: { stringInputs: { value: ['Test short description'] } },
                targetLanguage: { stringInputs: { value: ['es'] } },
                sourceLanguage: { stringInputs: { value: ['en'] } }
            };
            const e = { commonEventObject: { formInputs: formInput } };
            // Mock Gemini API response
            const geminiApiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent';
            UrlFetchAppStubConfiguration.when(geminiApiUrl)
                .return({
                    getResponseCode: () => 200,
                    getContentText: () => JSON.stringify({
                        candidates: [
                            {
                                content: {
                                    parts: [
                                        {
                                            text: JSON.stringify({
                                                name: 'Nombre sugerido',
                                                description: 'Descripción sugerida',
                                                shortDescription: 'Descripción corta sugerida',
                                                language_code: 'es'
                                            })
                                        }
                                    ]
                                }
                            }

                        ]
                    })
                });

            const res = Addon.BotSetup.Controller['SuggestTranslation'](e);
            expect(res).toBeDefined();
            const cardData = res.getData();
            expect(cardData).toBeDefined();
            // No notification
            expect(cardData.notification).toBeUndefined();
            // cardNavigations[0].pushCard.sections[0].widgets[0].items[1].selected should be true
            expect(cardData.cardNavigations[0].pushCard.sections[0].widgets[0].items[1].selected).toBe(true);
            
            // section index is 1 because the first section is for language selection and the second section is for suggestions
            // cardNavigations[0].pushCard.sections[0].widgets[1].value should be 'Nombre sugerido'
            expect(cardData.cardNavigations[0].pushCard.sections[1].widgets[0].value).toBe('Nombre sugerido');
            // cardNavigations[0].pushCard.sections[0].widgets[1].value should be 'Descripción sugerida'
            expect(cardData.cardNavigations[0].pushCard.sections[1].widgets[1].value).toBe('Descripción sugerida');
            // cardNavigations[0].pushCard.sections[0].widgets[2].value should be 'Descripción corta sugerida'
            expect(cardData.cardNavigations[0].pushCard.sections[1].widgets[2].value).toBe('Descripción corta sugerida');
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

        // SuggestedTranslationCard test
        it('should create SuggestedTranslationCard', () => {
            const data = {
                selectedLanguage: 'es',
                suggestions: {
                    name: 'Nombre sugerido',
                    description: 'Descripción sugerida',
                    shortDescription: 'Descripción corta sugerida',
                    profilePicture: 'https://example.com/suggested-profile-picture.jpg',
                    commands: []
                }
            };
            const suggestedTranslationCard = Addon.BotSetup.View['SuggestedTranslationCard'](data);
            expect(suggestedTranslationCard).toBeDefined();
            const cardData = suggestedTranslationCard.getData();
            expect(cardData).toBeDefined();
            expect(cardData.name).toBe(Addon.BotSetup.id + '-SuggestedTranslation');
            // No notification
            expect(cardData.notification).toBeUndefined();
        });
    });
});
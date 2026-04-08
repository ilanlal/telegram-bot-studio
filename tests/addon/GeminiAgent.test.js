require('..');
const PropertiesService = require('@ilanlal/gasmocks/src/properties/PropertiesService');
const { Addon, Common } = require('../../src/Addon.js');
const UrlFetchAppStubConfiguration = require('@ilanlal/gasmocks/src/url-fetch/classes/UrlFetchAppStubConfiguration');
const HttpResponse = require('@ilanlal/gasmocks/src/url-fetch/classes/HttpResponse');
const SpreadsheetStubConfiguration = require('@ilanlal/gasmocks/src/spreadsheetapp/classes/SpreadsheetStubConfiguration');

describe('Addon.GeminiAgent', () => {
    const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const geminiApiKey = 'test-gemini-api-key';
    const dummyToken = 'DUMMY_BOT_TOKEN';
    beforeEach(() => {
        // Set up any necessary mocks or spies
        Addon.Modules.GeminiAgent.saveApiKey(geminiApiKey);
        PropertiesService.getScriptProperties().setProperty(Common.INPUT.TELEGRAM_BOT.BOT_API_TOKEN, dummyToken);
        PropertiesService.getScriptProperties().setProperty(Common.INPUT.GEMINI.INSTRUCTION_CELL_REFERENCE, 'Sheet1!A3');
        UrlFetchAppStubConfiguration.reset();
        SpreadsheetStubConfiguration.reset();
    });

    const appendInstructionData = () => {
        // Add a sample instruction to the sheet for testing
        const customInstructions = {
            name: 'New Instructions',
            model: 'gemini-3-flash-preview',
            prompt: JSON.stringify([{
                systemInstruction: {
                    text: 'Test system instruction'
                }
            }])
        };

        // Add a sample instruction to the sheet for testing
        const instructionRow = [
            customInstructions.name,
            customInstructions.model,
            customInstructions.prompt
        ];

        const instructionsSheet = activeSpreadsheet.getSheetByName('Sheet1');
        // Initialize the Spreadsheet stub with the necessary sheets and data for the test
        instructionsSheet.appendRow(instructionRow);
        //instructionsSheet.setCurrentCell(instructionsSheet.getRange(1, 1));
    };

    const mockTelegramSendMessageResponse = (dummyToken) => {
        // Mock the sendMessage API response
        const sendMessgeUrl = `https://api.telegram.org/bot${dummyToken}/sendMessage`;
        UrlFetchAppStubConfiguration.when(sendMessgeUrl)
            .return(new HttpResponse()
                .setContentText(JSON.stringify({
                    "ok": true,
                    "result": {
                        "message_id": 1
                    }
                })));
    };

    const mockSetWebhookResponse = (dummyToken) => {
        const contentText = JSON.stringify({
            "ok": true,
            "result": {
                "url": "https://example.com/webhook",
                "has_custom_certificate": false,
                "pending_update_count": 0,
                "last_error_date": 0,
                "last_error_message": "",
                "max_connections": 40,
                "allowed_updates": []
            }
        });

        UrlFetchAppStubConfiguration.when(`https://api.telegram.org/bot${dummyToken}/getWebhookInfo`)
            .return(new HttpResponse().setContentText(contentText));
    }

    const mockGeminiApiResponse = () => {
        // Mock the Gemini API generateContent call
        const url = Addon.Modules.GeminiApiClient.API_ENDPOINT_URL + Addon.Modules.GeminiAgent.MODELS['gemini-3-flash-preview'] + ':generateContent';

        UrlFetchAppStubConfiguration.when(url)
            .return(new HttpResponse()
                .setContentText(
                    JSON.stringify({
                        candidates: [{
                            content: {
                                parts: [{
                                    'text': JSON.stringify({
                                        action: 'sendMessage',
                                        chat_id: 5678,
                                        text: 'Hello from Gemini API'
                                    })
                                }]
                            }
                        }]
                    })
                )
            );
    };

    describe('Controller', () => {
        const Controller = Addon.GeminiAgent.Controller;

        // PushHomeCard test
        it('should handle PushHomeCard', () => {
            const e = { parameters: {} };
            mockSetWebhookResponse(dummyToken);


            // Call the controller method expecte no errors and the response to contain the expected data
            let actionResponse = Controller.PushHomeCard(e);
            expect(actionResponse).toBeDefined();
            // Verify that the response contains a notification with the expected message (e.g., "Premium features activated!")
            let data = actionResponse.getData();
            if (!data.cardNavigations || data.cardNavigations.length === 0) {
                console.log(JSON.stringify(data, null, 2));
            }
            expect(data).toBeDefined();

            const cardData = data.cardNavigations[0].pushCard;
            expect(cardData).toBeDefined();
            expect(cardData.name).toBe(Addon.GeminiAgent.id + '-Setup');
        });

        // PushSetupCard test
        test('should handle PushSetupCard', () => {
            const e = { parameters: {} };
            mockSetWebhookResponse(dummyToken);
            // Call the controller method expecte no errors and the response to contain the expected data
            let actionResponse = Controller.PushSetupCard(e);
            expect(actionResponse).toBeDefined();

            // Verify that the response contains a notification with the expected message (e.g., "Premium features activated!")
            let data = actionResponse.getData();
            expect(data).toBeDefined();

            if (!data.cardNavigations || data.cardNavigations.length === 0) {
                console.log(JSON.stringify(data, null, 2));
            }
            // Expect cardNavigations to be defined
            expect(data.cardNavigations).toBeDefined();

            const cardData = data.cardNavigations[0].pushCard;
            expect(cardData).toBeDefined();
            expect(cardData.name).toBe(Addon.GeminiAgent.id + '-Setup');
        });

        // SaveSettings test
        test('should handle SaveSettings', () => {
            const e = { parameters: {} };
            // Call the controller method expecte no errors and the response to contain the expected data
            let actionResponse = Controller.Connect(e);
            expect(actionResponse).toBeDefined();
        });

        // ProcessEventObject test
        test('it should handle ProcessEventObject', () => {
            const e = { parameters: {} };
            const eventObject = {
                postData: {
                    contents: JSON.stringify({
                        message: {
                            from: { id: 5678, is_bot: false, first_name: 'Test User' },
                            chat: { id: 5678, first_name: 'Test User', type: 'private' },
                            date: 1700000000,
                        }
                    })
                }
            };

            appendInstructionData(activeSpreadsheet);
            // Set the current cell to contain the eventObject JSON for the controller to read
            const sheet1 = Addon.Modules.Sheet.getSheet(activeSpreadsheet, { name: 'Active Sheet' });
            sheet1.appendRow([JSON.stringify(eventObject)]); // Add an empty row to ensure there's a cell to set the value
            sheet1.setCurrentCell(
                sheet1.getRange('A3') // Set the current cell to the first cell (A1) where we will put the eventObject JSON
                    .setValue(JSON.stringify(eventObject)) // Set the value of the current cell to the JSON string of the eventObject
            );

            activeSpreadsheet.setActiveSheet(sheet1);
            mockTelegramSendMessageResponse(dummyToken);

            mockGeminiApiResponse();

            // Call the controller method expecte no errors and the response to contain the expected data
            let actionResponse = Controller.ProcessEventObject(e, activeSpreadsheet);
            expect(actionResponse).toBeDefined();
            const data = actionResponse.getData();
            expect(data).toBeDefined();
            expect(data.notification).toBeDefined();
            expect(data.notification.text).toContain('An error occurred while testing the agent');
        });
    });

    // View generation test
    describe('View Generation', () => {
        const View = Addon.GeminiAgent.View;

        // SetupCard test
        it('should build Gemini Assistant Setup Card', () => {
            const data = {};
            const card = View.SetupCard(data);
            expect(card).toBeDefined();
        });


        // _BuildModelSelectorSection test
        it('should build Model Selector Section for Home Card', () => {
            const data = {};
            const section = View._BuildModelSelectorSection(data);
            expect(section).toBeDefined();
        });

    });

    afterEach(() => {
        UrlFetchAppStubConfiguration.reset();
        SpreadsheetStubConfiguration.reset();
        PropertiesService.getScriptProperties().deleteAllProperties();
    });
});

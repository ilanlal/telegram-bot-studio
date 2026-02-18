require('..');
const { Plugins } = require('../../src/Plugins');
const controller = Plugins.GenerateContent.Controller;
const SpreadsheetApp = require('@ilanlal/gasmocks/src/spreadsheetapp/SpreadsheetApp');
const Sheet = require('@ilanlal/gasmocks/src/spreadsheetapp/classes/Sheet');
const Spreadsheet = require('@ilanlal/gasmocks/src/spreadsheetapp/classes/Spreadsheet');
const UrlFetchAppStubConfiguration = require('@ilanlal/gasmocks/src/url-fetch/classes/UrlFetchAppStubConfiguration');
const PropertiesService = require('@ilanlal/gasmocks/src/properties/PropertiesService');

describe('Plugins.GenerateContent.Controller', () => {
    const geminiModelSelector = 'gemini-2.0-flash';
    const geminiApiKeyValue = 'test-api-key';
    beforeEach(() => {
        // Reset UrlFetchApp stub configuration before each test
        UrlFetchAppStubConfiguration.reset();

        // Set up PropertiesService with default values for testing
        PropertiesService.getUserProperties().setProperty(Plugins.PROPERTIES.gemini_api_key, geminiApiKeyValue);
    });

    // Load test
    it('should handle Load', () => {
        // mock event parameters
        const e = { parameters: {} };
        const generateContentCard = controller.Load(e);
        expect(generateContentCard).toBeDefined();
        const cardData = generateContentCard.getData();
        expect(cardData).toBeDefined();

        // No notification
        expect(cardData.notification).toBeUndefined();

        // Check for card navigations and pushCard
        expect(cardData.cardNavigations).toBeDefined();
        expect(cardData.cardNavigations.length).toBeGreaterThan(0);
        expect(cardData.cardNavigations[0].pushCard).toBeDefined();
    });

    // GenerateContent test
    it('should handle GenerateContent', () => {
        // mock event parameters
        const e = {
            commonEventObject: {
                parameters: {
                    [Plugins.PROPERTIES.prompt_text_input]: 'Test prompt for content generation',
                    [Plugins.PROPERTIES.gemini_model_selector]: 'gemini-2.0-flash',
                }
            }
        };

        const prompt = 'What is the capital of France?';
        const expectedResponse = 'The capital of France is Paris.';

        const systemInstruction = {
            parts: [{
                text: 'You are a helpful assistant that provides concise and accurate answers to user questions.'
            }]
        };

        const generationConfig = {
            temperature: 1,
            topP: 0.95,
            topK: 40,
            responseMimeType: 'text/plain',
        };

        const payload = {
            systemInstruction,
            generationConfig,
            contents: [{
                parts: [{
                    text: prompt
                }]
            }]
        };

        // Mock the UrlFetchApp response for the Gemini API generateContent call
        const url = Plugins.Modules.GeminiAPI.API_ENDPOINT_URL + Plugins.Modules.GeminiAPI.MODELS['gemini-3-flash-preview'] + ':generateContent';

        UrlFetchAppStubConfiguration.when(url)
            .return(new HttpResponse()
                .setContentText(
                    JSON.stringify({
                        data: {
                            candidates: [{
                                content: {
                                    parts: [{ 'text': expectedResponse }]
                                }
                            }]
                        }
                    })
                )
            );

        const response = controller.GenerateContent(e);
        expect(response).toBeDefined();
        const responseData = response.getData();
        expect(responseData).toBeDefined();
    });
});
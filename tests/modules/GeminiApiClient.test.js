require('..');
const HttpResponse = require('@ilanlal/gasmocks/src/url-fetch/classes/HttpResponse');
const { Common } = require('../../src/Addon');
const UrlFetchAppStubConfiguration = require('@ilanlal/gasmocks/src/url-fetch/classes/UrlFetchAppStubConfiguration');
const PropertiesService = require('@ilanlal/gasmocks/src/properties/PropertiesService');
const GeminiApiClient = Common.Modules.GeminiApiClient;
const GeminiAgent = Common.Modules.GeminiAgent;

describe('Common.Modules.GeminiAPI', () => {
    const apiKey = 'test_api_key';
    beforeEach(() => {
        // Clear properties before each test
        PropertiesService.getScriptProperties().deleteAllProperties();
        PropertiesService.getUserProperties().deleteAllProperties();
        PropertiesService.getDocumentProperties().deleteAllProperties();

        // Set the API key in user properties for testing
        const userProperties = PropertiesService.getUserProperties();
        userProperties.setProperty(Common.INPUT.GEMINI.GEMINI_API_KEY, apiKey);

        // Reset the UrlFetchApp stub configuration before each test
        UrlFetchAppStubConfiguration.reset();
    });

    // generateContent test
    it('should generate content using Gemini API', () => {
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
        const url = GeminiApiClient.API_ENDPOINT_URL + GeminiAgent.MODELS['gemini-3-flash-preview'] + ':generateContent';

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

        const content = GeminiApiClient.generateContent(apiKey, GeminiAgent.MODELS['gemini-3-flash-preview'], payload);
        expect(content.data.candidates[0].content.parts[0].text).toBe(expectedResponse);
        //console.log('Generated content:', JSON.stringify(content, null, 2));
    });
});
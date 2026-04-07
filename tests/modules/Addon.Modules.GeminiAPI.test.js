require('..');
const { Addon } = require('../../src/Addon');
const GeminiAPI = Addon.Modules.GeminiAPI;

describe('Addon.Modules.GeminiAPI', () => {
    const apiKey = 'test_api_key';
    beforeEach(() => {
        // Clear properties before each test
        PropertiesService.getScriptProperties().deleteAllProperties();
        PropertiesService.getUserProperties().deleteAllProperties();
        PropertiesService.getDocumentProperties().deleteAllProperties();

        // Set the API key in user properties for testing
        const userProperties = PropertiesService.getDocumentProperties();
        userProperties.setProperty(Addon.INPUT.GEMINI.GEMINI_API_KEY, apiKey);

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
        const url = Addon.Modules.GeminiApiClient.API_ENDPOINT_URL + Addon.Modules.GeminiAgent.MODELS['gemini-3-flash-preview'] + ':generateContent';

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

        const content = Addon.Modules.GeminiApiClient.generateContent(apiKey, Addon.Modules.GeminiAgent.MODELS['gemini-3-flash-preview'], payload);
        expect(content.data.candidates[0].content.parts[0].text).toBe(expectedResponse);
        //console.log('Generated content:', JSON.stringify(content, null, 2));
    });
});
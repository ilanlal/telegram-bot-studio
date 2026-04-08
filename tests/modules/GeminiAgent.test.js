require('..');
const SpreadsheetStubConfiguration = require('@ilanlal/gasmocks/src/spreadsheetapp/classes/SpreadsheetStubConfiguration');
const { Common } = require('../../src/Addon');
const PropertiesService = require('@ilanlal/gasmocks/src/properties/PropertiesService');

describe('Common.Modules.GeminiAPI.SystemInstructions', () => {
    const apiKey = 'test_api_key';
    beforeEach(() => {
        // Clear properties before each test
        PropertiesService.getScriptProperties().deleteAllProperties();
        PropertiesService.getUserProperties().deleteAllProperties();
        PropertiesService.getDocumentProperties().deleteAllProperties();
        // Set the API key in user properties for testing
        const userProperties = PropertiesService.getUserProperties();
        userProperties.setProperty(Common.INPUT.GEMINI.GEMINI_API_KEY, apiKey);
        SpreadsheetStubConfiguration.reset();

    });

    // api key tests
    it('should save and retrieve API key correctly', () => {
        const testApiKey = 'my_test_api_key';
        Common.Modules.GeminiAgent.saveApiKey(testApiKey);
        const retrievedApiKey = Common.Modules.GeminiAgent.getApiKey();
        expect(retrievedApiKey).toBe(testApiKey);
    });

    // model tests
    it('should save and retrieve model correctly', () => {
        const testModel = 'gemini-3-flash-preview';
        Common.Modules.GeminiAgent.saveModel(testModel);
        const retrievedModel = Common.Modules.GeminiAgent.getModel();
        expect(retrievedModel).toBe(testModel);
    });
});
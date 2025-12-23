require('../../../../tests');
const SpreadsheetStubConfiguration = require('@ilanlal/gasmocks/src/spreadsheetapp/classes/SpreadsheetStubConfiguration');
const SpreadsheetApp = require('@ilanlal/gasmocks/src/spreadsheetapp/SpreadsheetApp');
const { AutomationHandler } = require('./AutomationHandler');
const { SheetModel } = require('../../../components/models/SheetModel');

describe('AutomationHandler', () => {
    /** @type {AutomationHandler} */
    let handler;
    const dummyToken = 'DUMMY_BOT_TOKEN';

    beforeEach(() => {
        SpreadsheetStubConfiguration.reset();
        // Set dummy bot token in user properties
        PropertiesService.getDocumentProperties().setProperty(EnvironmentModel.InputMeta.BOT_API_TOKEN, dummyToken);
        handler = AutomationHandler.create();
        SheetModel.create(SpreadsheetApp.getActiveSpreadsheet())
            .bindSheetSampleData(EMD.Spreadsheet.BasicAutomation({}));
    });

    test('should handle automation request', () => {
        const content = {
            query: '/start',
            chat_id: 12345,
            language_code: 'en'
        };

        const sendMessgeUrl = `https://api.telegram.org/bot${dummyToken}/sendMessage`;
        const sendPhotoUrl = `https://api.telegram.org/bot${dummyToken}/sendPhoto`;
        const editMessageReplyMarkupUrl = `https://api.telegram.org/bot${dummyToken}/editMessageReplyMarkup`;


        UrlFetchAppStubConfiguration.when(sendMessgeUrl)
            .return(new HttpResponse()
                .setContentText(JSON.stringify({
                    result: {
                        message_id: 1,
                    }
                })));

        UrlFetchAppStubConfiguration.when(sendPhotoUrl)
            .return(new HttpResponse()
                .setContentText(JSON.stringify({
                    result: true
                })));

        UrlFetchAppStubConfiguration.when(editMessageReplyMarkupUrl)
            .return(new HttpResponse()
                .setContentText(JSON.stringify({
                    result: true
                })));

        let response = handler.handleAutomationRequest(content);
        const responseObj = JSON.parse(response);
        expect(responseObj.actions_executed).toBeGreaterThan(0);
    });

    test('should throw error for invalid automation request', () => {
        const content = { invalid: 'data' };
        expect(() => handler.handleAutomationRequest(content)).toThrow('Invalid automation request format');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});
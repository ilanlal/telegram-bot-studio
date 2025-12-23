require('../../../../tests')
const { PostCallbackQueryHandler } = require('./PostCallbackQueryHandler');

describe('PostCallbackQueryHandler', () => {
    /** @type {PostCallbackQueryHandler} */
    let handler;
    const dummyToken = 'DUMMY_BOT_TOKEN';

    beforeEach(() => {
        UrlFetchAppStubConfiguration.reset();
        SpreadsheetStubConfiguration.reset();
        // Set dummy bot token in user properties
        PropertiesService.getDocumentProperties().setProperty(EnvironmentModel.InputMeta.BOT_API_TOKEN, dummyToken);
        handler = PostCallbackQueryHandler.create();
        SheetModel.create(SpreadsheetApp.getActiveSpreadsheet())
            .bindSheetSampleData(EMD.Spreadsheet.BasicAutomation({}));

    });

    test("PostCallbackQueryHandler should be defined", () => {
        expect(PostCallbackQueryHandler).toBeDefined();
    });

    test('should handle valid callback_query', () => {
        const content = {
            callback_query: {
                from: {
                    id: 123,
                    language_code: 'en'
                },
                data: '/home',
                message: {
                    message_id: 456
                }
            }
        };
        const sendMessgeUrl = `https://api.telegram.org/bot${dummyToken}/sendMessage`;
        const sendPhotoUrl = `https://api.telegram.org/bot${dummyToken}/sendPhoto`;
        const answerCallbackQueryUrl = `https://api.telegram.org/bot${dummyToken}/answerCallbackQuery`;
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
                    result: {
                        message_id: 1,
                    }
                })));
        UrlFetchAppStubConfiguration.when(answerCallbackQueryUrl)
            .return(new HttpResponse()
                .setContentText(JSON.stringify({
                    result: true
                })));

        UrlFetchAppStubConfiguration.when(editMessageReplyMarkupUrl)
            .return(new HttpResponse()
                .setContentText(JSON.stringify({
                    result: true
                })));

        const response = handler.handlePostCallbackQuery(content);
        expect(response).toBeDefined();
    });

    it('should throw error for invalid callback_query format', () => {
        const content = { callback_query: {} };
        expect(() => PostCallbackQueryHandler.create().handlePostCallbackQuery(content)).toThrow('Invalid callback_query format');
    });

});
require('../../../../tests');

const SpreadsheetStubConfiguration = require('@ilanlal/gasmocks/src/spreadsheetapp/classes/SpreadsheetStubConfiguration');
const RangeStubConfiguration = require('@ilanlal/gasmocks/src/spreadsheetapp/classes/RangeStubConfiguration');
const SpreadsheetApp = require('@ilanlal/gasmocks/src/spreadsheetapp/SpreadsheetApp');
const { PostMessageHandler } = require('./PostMessageHandler');
const { CustomerModel } = require('../../../components/models/CustomerModel');
const { EMD } = require('../../../config/EMD');

describe('PostMessageHandler', () => {
    /** @type {PostMessageHandler} */
    let handler;
    const dummyToken = 'DUMMY_BOT_TOKEN';

    beforeEach(() => {
        UrlFetchAppStubConfiguration.reset();
        SpreadsheetStubConfiguration.reset();
        RangeStubConfiguration.reset();
        // Set dummy bot token in user properties
        PropertiesService.getDocumentProperties().setProperty(EnvironmentModel.InputMeta.BOT_API_TOKEN, dummyToken);
        handler = PostMessageHandler.create(
            SpreadsheetApp.getActiveSpreadsheet(),
            PropertiesService.getDocumentProperties(),
            PropertiesService.getUserProperties(),
            PropertiesService.getScriptProperties()
        );
        SheetModel.create(SpreadsheetApp.getActiveSpreadsheet())
            .bindSheetSampleData(EMD.Spreadsheet.BasicAutomation({}));

    });

    test('should handle verifyTelegramUser call', () => {
        const content = {
            message: {
                chat: { id: 12345 },
                text: '/start',
                message_id: 1,
                entities: [{ type: 'bot_command', offset: 0, length: 6 }],
                from: { id: 12345, language_code: 'en', username: 'testuser', first_name: 'Test', last_name: 'User' }
            }
        };
        // first call to verifyTelegramUser should add the user response is array of user data
        // [timestamp, chat_id, is_bot, first_name, last_name, username, language_code]
        let response = handler.verifyTelegramUser(content.message);
        expect(Array.isArray(response)).toBe(true);

        // check if user is added to Users sheet
        const sheetName = EMD.Spreadsheet.Customer({}).name;
        const customerSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
        expect(customerSheet).not.toBeNull();
        let data = customerSheet.getDataRange().getValues();
        let addedUser = data.find(row => row[1] === content.message.from.id);
        expect(addedUser).toBeDefined();
        expect(addedUser[1]).toBe(content.message.from.id);
        expect(addedUser[3]).toBe(content.message.from.first_name);

        // call again to verify no duplicate user is added
        response = handler.verifyTelegramUser(content.message);
        expect(Array.isArray(response)).toBe(true);
        // check if only one user entry exists in Users sheet
        data = customerSheet.getDataRange().getValues();
        const users = data.filter(row => row[1] === content.message.from.id);
        expect(users.length).toBe(1);
    });

    describe('handleBotCommand', () => {
        const commands = ['/start', '/whoami', '/me', '/whoru', '/whoareyou', '/botinfo', '/help', '/about'];

        commands.forEach(cmd => {
            test(`should handle ${cmd} command`, () => {
                const content = {
                    message: {
                        chat: { id: 12345 },
                        text: cmd,
                        message_id: 1,
                        entities: [{ type: 'bot_command', offset: 0, length: cmd.length }],
                        from: { id: 12345, language_code: 'en', username: 'testuser', first_name: 'Test', last_name: 'User' }
                    }
                };
                const sendMessgeUrl = `https://api.telegram.org/bot${dummyToken}/sendMessage`;
                const sendPhotoUrl = `https://api.telegram.org/bot${dummyToken}/sendPhoto`;
                const sendInvoiceUrl = `https://api.telegram.org/bot${dummyToken}/sendInvoice`;
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

                UrlFetchAppStubConfiguration.when(sendInvoiceUrl)
                    .return(new HttpResponse()
                        .setContentText(JSON.stringify({
                            result: {
                                message_id: 1,
                            }
                        })));

                UrlFetchAppStubConfiguration.when(editMessageReplyMarkupUrl)
                    .return(new HttpResponse()
                        .setContentText(JSON.stringify({
                            result: {
                                message_id: 1,
                            }
                        })));
                        
                let response = handler.handleBotCommand(content.message.from.id, content.message);
                expect(response).toBeDefined();
                const responseObject = JSON.parse(response);
                expect(responseObject.status).toBe('dynamic_reply_handled');
            });
        });
    });

    describe('handlePostMessage', () => {
        const commands = ['/start', '/help', '/about'];
        commands.forEach(cmd => {
            test(`should handle ${cmd} message`, () => {
                const content = {
                    message: {
                        chat: { id: 12345 },
                        text: cmd,
                        message_id: 1,
                        entities: [{ type: 'bot_command', offset: 0, length: cmd.length }],
                        from: { id: 12345, language_code: 'en', username: 'testuser', first_name: 'Test', last_name: 'User' }
                    }
                };
                const sendMessgeUrl = `https://api.telegram.org/bot${dummyToken}/sendMessage`;
                const sendPhotoUrl = `https://api.telegram.org/bot${dummyToken}/sendPhoto`;
                const sendInvoiceUrl = `https://api.telegram.org/bot${dummyToken}/sendInvoice`;
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

                UrlFetchAppStubConfiguration.when(sendInvoiceUrl)
                    .return(new HttpResponse()
                        .setContentText(JSON.stringify({
                            result: {
                                message_id: 1,
                            }
                        })));

                UrlFetchAppStubConfiguration.when(editMessageReplyMarkupUrl)
                    .return(new HttpResponse()
                        .setContentText(JSON.stringify({
                            result: {
                                message_id: 1,
                            }
                        })));

                let response = handler.handlePostMessage(content.message);
                expect(response).toBe(true);
            });
        });
    });

    test('should throw error for invalid message format', () => {
        const content = { invalid: 'data' };
        expect(() => handler.handlePostMessage(content)).toThrow('Invalid message format');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});
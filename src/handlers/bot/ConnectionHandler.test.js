require('../../../tests');

const { ConnectionHandler } = require('./ConnectionHandler');

describe('ConnectionHandler', () => {
    beforeEach(() => {
        SpreadsheetStubConfiguration.reset();
    });

    it('should create an instance of ConnectionHandler', () => {
        const handler = new ConnectionHandler();
        expect(handler).toBeInstanceOf(ConnectionHandler);
    });

    // onCreateBotConnectionClick
    it('should handle onCreateBotConnectionClick', () => {
        const event = {
            commonEventObject: {
                formInputs: {
                    'txt_bot_api_token': { stringInputs: { value: ['[FAKE_DUMMY_BOT_TOKEN]'] } },
                    'display_name_input': { stringInputs: { value: ['Test Connection'] } }
                }
            }
        }; // Mock event object

        // new row should be added to the BotConnections sheet
        const sheet = SheetModel.create(SpreadsheetApp.getActiveSpreadsheet())
            .getSheet(EMD.Spreadsheet.BotConnections({}));

        const actionResponse = ConnectionHandler.ViewModel.onCreateBotConnectionClicked(event);
        expect(actionResponse).toBeDefined();
        const data = actionResponse.getData();
        expect(data).toBeDefined();
        // no 'error' string in data
        expect(JSON.stringify(data).toLowerCase()).not.toContain('error');



        const lastRow = sheet.getLastRow();
        // last row shuld be gtreater than 1
        expect(lastRow).toBeGreaterThan(1);
    });
});
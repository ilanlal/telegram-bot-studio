require('../../../tests');
const { AutomationModel } = require('./AutomationModel');
const SpreadsheetStubConfiguration = require('@ilanlal/gasmocks/src/spreadsheetapp/classes/SpreadsheetStubConfiguration');
const SpreadsheetApp = require('@ilanlal/gasmocks/src/spreadsheetapp/SpreadsheetApp');
const { SheetModel } = require('./SheetModel');
const { EMD } = require('../../config/EMD');

describe('AutomationModel', () => {
    beforeEach(() => {
        SpreadsheetStubConfiguration.reset();
        SheetModel.create(
            SpreadsheetApp.getActiveSpreadsheet()
        ).bindSheetSampleData(EMD.Spreadsheet.BasicAutomation({}));
    });

    it('should create an instance', () => {
        const model = AutomationModel.create();
        expect(model).toBeInstanceOf(AutomationModel);
    });

    describe('handleAutomation', () => {
        const model = AutomationModel.create();

        test('should find language column index', () => {
            const index = model.findLanguageColumnIndex('default');
            expect(index).toBe(1); // 'default' should be in the second column (index 1)
        });

        test('should list all replies keys', () => {
            const replies = model.listRepliesKeys();
            expect(replies.length).toBeGreaterThan(2);
        });

        test('should list all languages', () => {
            const languages = model.listLanguages();
            expect(languages.length).toBeGreaterThan(0);
        });

        test('should find data by key', () => {
            // reply is array of actions like {method: 'sendMessage', payload: {...}}
            const reply = model.findData('/start', 'default');
            const jsonReply = JSON.parse(reply);
            expect(Array.isArray(jsonReply)).toBe(true);
            expect(jsonReply.length).toBeGreaterThan(0);
        });

        test('should return null for non-existing key', () => {
            const reply = model.findData('[NON_EXISTING_KEY]', 'default');
            expect(reply).toBeNull();
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

});



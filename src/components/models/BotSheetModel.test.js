require('../../../tests');
const { BotSheetModel } = require('./BotSheetModel');
const SpreadsheetStubConfiguration = require('@ilanlal/gasmocks/src/spreadsheetapp/classes/SpreadsheetStubConfiguration');
const SpreadsheetApp = require('@ilanlal/gasmocks/src/spreadsheetapp/SpreadsheetApp');
const { SheetModel } = require('./SheetModel');
const { EMD } = require('../../config/EMD');

describe('BotSheetModel', () => {
    beforeEach(() => {
        SpreadsheetStubConfiguration.reset();
        SheetModel.create(SpreadsheetApp.getActiveSpreadsheet())
            .bindSheetSampleData(EMD.Spreadsheet.BotSetup({}));
    });

    it('should create an BotSheetModel', () => {
        const model = BotSheetModel.create();
        expect(model).toBeInstanceOf(BotSheetModel);
    });

    describe('model methods', () => {
        const model = BotSheetModel.create();

        test('should find language column index', () => {
            const index = model.findLanguageColumnIndex('default');
            expect(index).toBe(1); // 'default' should be in the second column (index 1)
        });

        test('should list all keys', () => {
            const keys = model.getKeys();
            expect(keys.length).toBeGreaterThan(2);
        });

        test('should list all languages', () => {
            const languages = model.getLanguages();
            expect(languages.length).toBeGreaterThan(6);
        });

        test('should find value by key', () => {
            // reply is array of actions like {method: 'sendMessage', payload: {...}}
            const text = model.getValue('name', 'es');
            expect(text).toBe(EMD.Spreadsheet.BotSetup({}).sample_data[1][3]); // Spanish name
        });

        test('should return null for non-existing key', () => {
            const reply = model.getValue('[NON_EXISTING_KEY]', 'en');
            expect(reply).toBeNull();
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

});



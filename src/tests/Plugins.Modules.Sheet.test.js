require('../../tests');
const { Plugins } = require('../Plugins');

describe('Plugins Modules Sheet', () => {
    beforeEach(() => {
        SpreadsheetStubConfiguration.reset();
    });

    it('should throw error when initializing Sheet module without name', () => {
        expect(() => {
            const sheetModule = Plugins.Modules.Sheet.initializeSheet(SpreadsheetApp.getActiveSpreadsheet(), {}); // No name provided
        }).toThrow(Plugins.Modules.Sheet.INVALID_MODEL_ERROR);
    });

    it('should create and initialize Sheet module correctly', () => {
        const sheetMeta = {
            name: 'TestSheet',
            columns: ['id', 'first_name', 'username'],
            sample_data: [
                [1, 'Test', 'testuser']
            ]
        };
        const sheet = Plugins.Modules.Sheet.initializeSheet(SpreadsheetApp.getActiveSpreadsheet(), sheetMeta);
        expect(sheet).toBeDefined();
        expect(sheet.getName()).toBe('TestSheet');
    });

    it('should dump object data to the specified sheet', () => {
        const data = {
            id: 123456,
            first_name: 'Test',
            username: 'testuser'
        };

        const sheetMeta = {
            name: 'TestSheet',
            columns: ['id', 'first_name', 'username']
        };
        const sheet = Plugins.Modules.Sheet.dumpObjectToSheet(SpreadsheetApp.getActiveSpreadsheet(), sheetMeta, 'Test Dump', data);
        expect(sheet).toBeDefined();
        expect(sheet.getName()).toBe('TestSheet');
    });

    it('should get the active sheet based on sheetMeta', () => {
        const sheetMeta = {
            name: 'ActiveSheet',
            columns: ['id', 'first_name', 'username'],
        };

        const activeSheet = Plugins.Modules.Sheet.getSheet(SpreadsheetApp.getActiveSpreadsheet(), sheetMeta);
        expect(activeSheet).toBeDefined();
        expect(activeSheet.getName()).toBe('ActiveSheet');
    });
});
require('..');
const SpreadsheetStubConfiguration = require('@ilanlal/gasmocks/src/spreadsheetapp/classes/SpreadsheetStubConfiguration');
const { Common } = require('../../src/Addon');

describe('Addon Modules Sheet', () => {
    beforeEach(() => {
        SpreadsheetStubConfiguration.reset();
    });

    it('should throw error when initializing Sheet module without name', () => {
        expect(() => {
            Common.Modules.Sheet.initializeSheet(SpreadsheetApp.getActiveSpreadsheet(), {}); // No name provided
        }).toThrow(Common.Modules.Sheet.INVALID_MODEL_ERROR);
    });

    it('should create and initialize Sheet module correctly', () => {
        const sheetMeta = {
            name: 'TestSheet',
            columns: ['id', 'first_name', 'username'],
            sample_data: [
                [1, 'Test', 'testuser']
            ]
        };
        const sheet = Common.Modules.Sheet.initializeSheet(SpreadsheetApp.getActiveSpreadsheet(), sheetMeta);
        expect(sheet).toBeDefined();
        expect(sheet.getName()).toBe('TestSheet');
    });

    it('should get the active sheet based on sheetMeta', () => {
        const sheetMeta = {
            name: 'ActiveSheet',
            columns: ['id', 'first_name', 'username'],
        };

        const activeSheet = Common.Modules.Sheet.getSheet(SpreadsheetApp.getActiveSpreadsheet(), sheetMeta);
        expect(activeSheet).toBeDefined();
        expect(activeSheet.getName()).toBe('ActiveSheet');
    });

    // dumpObjectToSheet test
    it('should dump object data to sheet correctly', () => {
        const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        const range = 'A2:C2';
        const report = [
            { a1n: 'A2', error: 'Invalid ID' },
            { a1n: 'B2', error: 'Name too short' }
        ];

        const sheet = Common.Modules.Sheet.dumpObjectToSheet(activeSpreadsheet,{"name":"dumpSheet"}, range, report);

        expect(sheet).toBeDefined();
        expect(sheet.getName()).toBe("dumpSheet");
    });

    // writeGeminiResponse test
    it('should write terminal output to the specified sheet', () => {
        const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        const eventObject = {
            type: 'test_event',
            data: {
                key: 'value'
            }
        };

        const sheet = Common.Modules.Sheet.writeGeminiResponse(
            activeSpreadsheet, eventObject, 'gemini-3-flash-preview', { sample: 'payload' }, { sample: 'response' });

        expect(sheet).toBeDefined();
        expect(sheet.getName()).toBe(Common.Modules.Sheet.TERMINAL_OUTPUT_SHEET_META.name);

        // Verify range length
        const lastRow = sheet.getLastRow();
        expect(lastRow).toBe(2); // Only 2 row should be added
    });

    // writeWebhookEvent test
    it('should write webhook event to the specified sheet', () => {
        const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        const eventObject = {
            type: 'webhook_event',
            data: {
                key: 'value'
            }
        };
        const sheet = Common.Modules.Sheet.writeWebhookEvent(activeSpreadsheet, eventObject);

        expect(sheet).toBeDefined();
        expect(sheet.getName()).toBe(Common.Modules.Sheet.WEBHOOK_EVENT_SHEET_META.name);
        // Verify range length
        const lastRow = sheet.getLastRow();
        expect(lastRow).toBe(2); // Only 2 row should be added
    });
});
require('..');
const SpreadsheetStubConfiguration = require('@ilanlal/gasmocks/src/spreadsheetapp/classes/SpreadsheetStubConfiguration');
const { Addon, Common } = require('../../src/Addon');
const PropertiesService = require('@ilanlal/gasmocks/src/properties/PropertiesService');

describe('Host.Modules.TerminalOutput', () => {
    beforeEach(() => {
        SpreadsheetStubConfiguration.reset();
        PropertiesService.getScriptProperties().setProperty(Common.INPUT.SYSTEM.ENABLE_EVENT_LOGGING, 'ON');
        PropertiesService.getScriptProperties().setProperty(Common.INPUT.SYSTEM.ENABLE_TERMINAL_OUTPUT, 'ON');
    });

    it('should write terminal output to the specified sheet', () => {
        const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        const eventObject = {
            type: 'test_event',
            data: {
                key: 'value'
            }
        };

        const sheet = Common.Modules.TerminalOutput.writeGeminiResponse(
            activeSpreadsheet, eventObject, 'gemini-3-flash-preview', { sample: 'payload' }, { sample: 'response' });

        expect(sheet).toBeDefined();
        expect(sheet.getName()).toBe(Common.Modules.TerminalOutput.SHEET_META.name);

        // Verify range length
        const lastRow = sheet.getLastRow();
        expect(lastRow).toBe(2); // Only 2 row should be added
    });
});
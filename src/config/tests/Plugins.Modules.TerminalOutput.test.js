require('../../../tests');
const { Plugins } = require('../Plugins');

describe('Plugins Modules TerminalOutput', () => {
    beforeEach(() => {
        SpreadsheetStubConfiguration.reset();
        PropertiesService.getUserProperties().setProperty('terminal_output_switch', 'ON');
        PropertiesService.getUserProperties().setProperty('focus_terminal_output', 'ON');
    });

    it('should write terminal output to the specified sheet', () => {
        const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        const source = 'TestSource';
        const message = 'This is a test message';
        const eventObject = { key: 'value' };
        const moreInfo1 = 'Additional Info 1';
        const moreInfo2 = { info: 'Additional Info 2' };
        const moreInfo3 = ['Additional', 'Info', 3];
        const sheet = Plugins.Modules.TerminalOutput.Write(
            activeSpreadsheet,
            {
                source,
                message,
                e: eventObject,
                param1: moreInfo1,
                param2: moreInfo2,
                param3: moreInfo3
            }
        );

        expect(sheet).toBeDefined();
        expect(sheet.getName()).toBe(Plugins.Modules.TerminalOutput.SHEET_META.name);

        // Verify rang lenth
        const lastRow = sheet.getLastRow();
        expect(lastRow).toBe(2); // Only 2 row should be added
    });
});
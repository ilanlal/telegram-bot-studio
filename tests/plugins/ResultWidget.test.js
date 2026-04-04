require('..');
const SpreadsheetStubConfiguration = require('@ilanlal/gasmocks/src/spreadsheetapp/classes/SpreadsheetStubConfiguration');
const { Plugins } = require('../../src/Plugins.js');

describe('Plugins.ResultWidget', () => {
    beforeEach(() => {
        SpreadsheetStubConfiguration.reset();
    });

    describe('ResultWidget Plugin', () => {
        it('should have required properties', () => {
            expect(Plugins.ResultWidget.id).toBeDefined();
            expect(Plugins.ResultWidget.name).toBeDefined();
        });

        // DumpResultToSheet test
        it('should handle DumpResultToSheet', () => {
            const data = {
                timestamp: new Date().toISOString(),
                bot: 'TestBot',
                action: 'getMe',
                object_data: { id: 123456789, is_bot: true, first_name: "TestBot", username: "test_bot" }
            };
            const e = {
                commonEventObject: {
                    parameters: {
                        sheetName: 'Dump',
                        action: 'getMe',
                        botName: 'TestBot',
                        data: JSON.stringify(data)
                    }
                }
            };
            const result = Plugins.ResultWidget.Controller['DumpResultToSheet'](e);
            expect(result).toBeDefined();
            const resultData = result.getData();
            expect(resultData).toBeDefined();
            // Expect notification to be defined
            expect(resultData.notification).toBeDefined();
        });
    });
});
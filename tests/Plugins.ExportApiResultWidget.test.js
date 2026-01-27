require('.');
const { Plugins } = require('../src/Plugins');

describe('Plugins.ExportApiResultWidget', () => {
    beforeEach(() => {
        SpreadsheetStubConfiguration.reset();
    });

    describe('ExportApiResultWidget Plugin', () => {
        it('should have required properties', () => {
            expect(Plugins.ExportApiResultWidget.id).toBeDefined();
            expect(Plugins.ExportApiResultWidget.name).toBeDefined();
        });

        // DumpApiResultToSheet test
        it('should handle DumpApiResultToSheet', () => {
            const data = {
                timestamp: new Date().toISOString(),
                bot: 'TestBot',
                action: 'getMe',
                object_data: { id: 123456789, is_bot: true, first_name: "TestBot", username: "test_bot" }
            };
            const event = {
                commonEventObject: {
                    parameters: {
                        sheetName: 'Dump',
                        action: 'getMe',
                        botName: 'TestBot',
                        data: JSON.stringify(data)
                    }
                }
            };
            const result = Plugins.ExportApiResultWidget.Controller['DumpApiResultToSheet'](event);
            expect(result).toBeDefined();
            const resultData = result.getData();
            expect(resultData).toBeDefined();
            // Expect notification to be defined
            expect(resultData.notification).toBeDefined();
        });
    });
});
require('../../../tests');
const { Plugins } = require('../Plugins');

describe('Plugins.Helpper', () => {
    describe('Helpper Plugin Controller', () => {
        // DumpApiResultToSheet test
        it('should handle OnDumpToSheet', () => {
            // mock event parameters
            const e = {
                commonEventObject: {
                    parameters: {
                        sheetName: 'TestDumpSheet',
                        bot: 'TestBot',
                        action: 'TestAction'
                    },
                    formInputs: {
                        txt_json_data: { stringInputs: { value: ['{"key1":"value1","key2":"value2"}'] } }
                    }
                }
            };

            const actionResponse = Plugins.Helper.Controller['DumpApiResultToSheet'](e);
            expect(actionResponse).toBeDefined();
            const data = actionResponse.getData();
            expect(data).toBeDefined();
        });
    });
});
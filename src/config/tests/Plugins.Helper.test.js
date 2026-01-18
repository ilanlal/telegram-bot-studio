require('../../../tests');
const { Plugins } = require('../Plugins');

describe('Plugins.Helpper', () => {
    describe('Helpper Plugin Controller', () => {
        // createStatusItem test
        it('should createStatusItem', () => {
            const statusItem = Plugins.Helper.View['createStatusItem']('Test Status', 'This is a test status item.');
            expect(statusItem).toBeDefined();
            const statusItemData = statusItem.getData();
            expect(statusItemData).toBeDefined();
            expect(statusItemData.title).toBe('Test Status');
        });
    });
});
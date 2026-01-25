require('../../tests');
const { Plugins } = require('../Plugins');

describe('Plugins.Helpper', () => {
    describe('Helpper Plugin Controller', () => {
        // createStatusItem test
        it('should createStatusItem', () => {
            let statusItem = Plugins.Helper.View['createBooleanItem']('Test Status', true);
            expect(statusItem).toBeDefined();
            let statusItemData = statusItem.getData();
            expect(statusItemData).toBeDefined();
            expect(statusItemData.title).toBe('🟢 Yes');

            statusItem = Plugins.Helper.View['createBooleanItem']('Test Status', false);
            expect(statusItem).toBeDefined();
            statusItemData = statusItem.getData();
            expect(statusItemData).toBeDefined();
            expect(statusItemData.title).toBe('🔘 No');
        });
    });
});
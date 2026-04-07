require('.');
const { Addon } = require('../src/Addon');

describe('Addon.Helpper', () => {
    describe('Helpper Plugin Controller', () => {
        // createStatusItem test
        it('should createStatusItem', () => {
            let statusItem = Addon.Helper.View['createBooleanItem']('Test Status', true);
            expect(statusItem).toBeDefined();
            let statusItemData = statusItem.getData();
            expect(statusItemData).toBeDefined();
            expect(statusItemData.title).toBe('🟢 Yes');

            statusItem = Addon.Helper.View['createBooleanItem']('Test Status', false);
            expect(statusItem).toBeDefined();
            statusItemData = statusItem.getData();
            expect(statusItemData).toBeDefined();
            expect(statusItemData.title).toBe('🔘 No');
        });
    });
});
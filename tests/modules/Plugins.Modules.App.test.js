require('..');
const { Addon, Common } = require('../../src/Addon');

describe('Addon.Modules.App', () => {
    beforeEach(() => {
        PropertiesService.getScriptProperties().deleteAllProperties();
        PropertiesService.getUserProperties().deleteAllProperties();
        PropertiesService.getDocumentProperties().deleteAllProperties();
    });

    // getData test
    it('should retrieve correct data from App module', () => {
        const data = Addon.Modules.App.getData();
        expect(data).toBeDefined();
        expect(data[Common.INPUT.SYSTEM.MEMBERSHIP.IS_PREMIUM]).toBe(false);
    });
});
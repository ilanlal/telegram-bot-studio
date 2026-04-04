require('.');
const { Plugins } = require('../src/Plugins');

describe('Plugins.Modules.App', () => {
    beforeEach(() => {
        PropertiesService.getScriptProperties().deleteAllProperties();
        PropertiesService.getUserProperties().deleteAllProperties();
        PropertiesService.getDocumentProperties().deleteAllProperties();
    });

    // getData test
    it('should retrieve correct data from App module', () => {
        const data = Plugins.Modules.App.getData();
        expect(data).toBeDefined();
        expect(data[Plugins.INPUT.SYSTEM.MEMBERSHIP.IS_PREMIUM]).toBe(false);
    });
});
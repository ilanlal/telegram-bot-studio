require('../../../tests');

const { MembershipHandler } = require('./MembershipHandler');

describe('Membership Handler', () => {
    beforeEach(() => {
        // Reset properties before each test
        PropertiesService.getDocumentProperties().deleteAllProperties();
        PropertiesService.getUserProperties().deleteAllProperties();
        PropertiesService.getScriptProperties().deleteAllProperties();
    });

    test('should create an instance of MembershipHandler', () => {
        const handler = new MembershipHandler();
        expect(handler).toBeInstanceOf(MembershipHandler);
    });

    // ActivatePremium
    it('should handle ActivatePremium', () => {
        const event = {}; // Mock event object
        const actionResponse = MembershipHandler.ViewModel.ActivatePremium(event);
        expect(actionResponse).toBeDefined();
        const data = actionResponse.getData();
        expect(data).toBeDefined();
        // no 'error' string in data
        expect(JSON.stringify(data).toLowerCase()).not.toContain('error');
    });

    // RevokeLicense
    it('should handle RevokeLicense', () => {
        const event = {}; // Mock event object
        const actionResponse = MembershipHandler.ViewModel.RevokeLicense(event);
        expect(actionResponse).toBeDefined();
        const data = actionResponse.getData();
        expect(data).toBeDefined();
        // no 'error' string in data
        expect(JSON.stringify(data).toLowerCase()).not.toContain('error');
    });

});
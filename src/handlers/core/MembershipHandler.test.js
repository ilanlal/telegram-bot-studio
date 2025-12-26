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
});
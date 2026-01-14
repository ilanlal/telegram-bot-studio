require('../../../tests');
const { Plugins } = require('../Plugins');

describe('Plugins.UserProfile', () => {
    describe('UserProfile Plugin', () => {
        it('should have required properties', () => {
            expect(Plugins.UserProfile.id).toBeDefined();
            expect(Plugins.UserProfile.name).toBeDefined();
        });

        // HomeCard test
        it('should create HomeCard', () => {
            // mock event parameters
            const e = { parameters: {} };
            const homeCard = Plugins.UserProfile['HomeCard'](e);
            expect(homeCard).toBeDefined();
            const cardData = homeCard.getData();
            expect(cardData).toBeDefined();
            expect(cardData.name).toBe(Plugins.UserProfile.id + '-Home');
        });

        // OnActivatePremium test
        it('should handle OnActivatePremium', () => {
            const event = {}; // Mock event object
            const actionResponse = Plugins.UserProfile['OnActivatePremium'](event);
            expect(actionResponse).toBeDefined();
            const data = actionResponse.getData();
            expect(data).toBeDefined();
            // no 'error' string in data
            expect(JSON.stringify(data).toLowerCase()).not.toContain('error');
        });

        // OnRevokeLicense test
        it('should handle OnRevokeLicense', () => {
            const event = {}; // Mock event object
            const actionResponse = Plugins.UserProfile['OnRevokeLicense'](event);
            expect(actionResponse).toBeDefined();
            const data = actionResponse.getData();
            expect(data).toBeDefined();
            // no 'error' string in data
            expect(JSON.stringify(data).toLowerCase()).not.toContain('error');
        });

        // OnLoad test
        it('should handle OnLoad', () => {
            // mock event parameters
            const e = { parameters: {} };
            const homeCard = Plugins.UserProfile.OnLoad(e);
            expect(homeCard).toBeDefined();
            const cardData = homeCard.getData();
            expect(cardData).toBeDefined();
            // no notification
            expect(cardData.notification).toBeUndefined();
        });
    });
});
require('.');
const { Addon } = require('../src/Addon');

describe('Addon.UserProfile', () => {
    describe('UserProfile Plugin', () => {
        it('should have required properties', () => {
            expect(Addon.UserProfile.id).toBeDefined();
            expect(Addon.UserProfile.name).toBeDefined();
        });

        // HomeCard test
        it('should create HomeCard', () => {
            // mock event parameters
            const e = { parameters: {} };
            const homeCard = Addon.UserProfile.View['HomeCard'](e);
            expect(homeCard).toBeDefined();
            const cardData = homeCard.getData();
            expect(cardData).toBeDefined();
            expect(cardData.name).toBe(Addon.UserProfile.id + '-Home');
        });

        // OnActivatePremium test
        it('should handle OnActivatePremium', () => {
            const event = {}; // Mock event object
            const actionResponse = Addon.UserProfile.Controller['ActivatePremium'](event);
            expect(actionResponse).toBeDefined();
            const data = actionResponse.getData();
            expect(data).toBeDefined();
            // no 'error' string in data
            expect(JSON.stringify(data).toLowerCase()).not.toContain('error:');
        });

        // OnRevokeLicense test
        it('should handle OnRevokeLicense', () => {
            const event = {}; // Mock event object
            const actionResponse = Addon.UserProfile.Controller['RevokeLicense'](event);
            expect(actionResponse).toBeDefined();
            const data = actionResponse.getData();
            expect(data).toBeDefined();
            // no 'error' string in data
            expect(JSON.stringify(data).toLowerCase()).not.toContain('error:');
        });

        // Load test
        it('should handle Load', () => {
            // mock event parameters
            const e = { parameters: {} };
            const homeCard = Addon.UserProfile.Controller['PushHomeCard'](e);
            expect(homeCard).toBeDefined();
            const cardData = homeCard.getData();
            expect(cardData).toBeDefined();
            // no notification
            expect(cardData.notification).toBeUndefined();
        });
    });
});
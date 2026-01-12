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
    });
});
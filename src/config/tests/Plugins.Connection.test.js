require('../../../tests');
const { Plugins } = require('../Plugins');

describe('Plugins.Connection', () => {
    describe('Connection Plugin', () => {
        it('should have required properties', () => {
            expect(Plugins.Connection.id).toBeDefined();
            expect(Plugins.Connection.name).toBeDefined();
        });

        // HomeCard test
        it('should create HomeCard', () => {
            // mock event parameters
            const e = { parameters: {} };
            const homeCard = Plugins.Connection['HomeCard'](e);
            expect(homeCard).toBeDefined();
            const cardData = homeCard.getData();
            expect(cardData).toBeDefined();
            expect(cardData.name).toBe(Plugins.Connection.id + '-Home');

            // No notification
            expect(cardData.notification).toBeUndefined();
        });
    });
});
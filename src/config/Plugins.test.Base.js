require('../../tests');
const { Plugins } = require('./Plugins');

describe('Plugins Base Class', () => {
    it('should have required properties', () => {
        expect(Plugins.id).toBeDefined();
        expect(Plugins.name).toBeDefined();
        expect(Plugins.description).toBeDefined();
        expect(Plugins.version).toBeDefined();
        expect(Plugins.imageUrl).toBeDefined();
    });

    it('should create HomeCard', () => {
        // mock event parameters
        const e = { parameters: {} };
        const homeCard = Plugins.HomeCard(e);
        expect(homeCard).toBeDefined();
        const cardData = homeCard.getData();
        expect(cardData).toBeDefined();
        expect(cardData.name).toBe(Plugins.id);
    });
});
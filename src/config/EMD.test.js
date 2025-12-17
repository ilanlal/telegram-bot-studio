require('../../tests');
const { EMD } = require('./EMD');

describe('EMD Configuration', () => {
    it('should have Home entity defined correctly with all properties', () => {
        expect(EMD.Cards.Home).toBeDefined();
        expect(EMD.Cards.Home({}).name).toBe('homeCard');

        const card = EMD.Cards.Home({ isActive: true, isAdmin: false });
        expect(card).toBeDefined();
        expect(card.name).toBe('homeCard');
        expect(card.header).toBeDefined();
        expect(card.sections).toBeDefined();
        expect(card.sections.length).toBeGreaterThan(0);
        expect(card.sections[0].widgets).toBeDefined();
        expect(card.sections[0].widgets.length).toBeGreaterThan(0);
    });
});
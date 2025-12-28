require('../../tests');
const { Plugins } = require('./Plugins');

describe('Plugins Configuration', () => {
    const pluginsToTest = [
        Plugins.GetMe,
        //Plugins.GetChat
    ];

    pluginsToTest.forEach((plugin) => {
        describe(`${plugin.name} Plugin`, () => {
            it('should have required properties', () => {
                expect(plugin.id).toBeDefined();
                expect(plugin.name).toBeDefined();
                expect(plugin.description).toBeDefined();
                expect(plugin.version).toBeDefined();
                expect(plugin.imageUrl).toBeDefined();
            });
            it('should create HomeCard', () => {
                // mock event parameters
                const e = { parameters: {} };

                const homeCard = plugin['HomeCard'](e);
                expect(homeCard).toBeDefined();
                const cardData = homeCard.getData();
                expect(cardData).toBeDefined();
                expect(cardData.name).toBe(plugin.name);
            });
        });
    });
});
require('..');
const { Plugins } = require('../../src/Plugins');

const view = Plugins.Settings.View;

describe('Plugins.Settings.View', () => {
    // Home card test
    it('should build Settings Card', () => {
    const data = Plugins.Modules.App.getData();
        const settingsCard = view.HomeCard(data);
        expect(settingsCard).toBeDefined();
        const cardData = settingsCard.getData();
        expect(cardData).toBeDefined();
        expect(cardData.name).toBe(Plugins.Settings.name + '-Home');
    });
});
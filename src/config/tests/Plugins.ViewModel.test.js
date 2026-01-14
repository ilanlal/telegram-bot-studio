require('../../../tests');
const { Plugins } = require('../Plugins');

describe('Plugins ViewModel', () => {
    it('should have required properties', () => {
        expect(Plugins.ViewModel.id).toBeDefined();
        expect(Plugins.ViewModel.name).toBeDefined();
        expect(Plugins.ViewModel.description).toBeDefined();
        expect(Plugins.ViewModel.version).toBeDefined();
        expect(Plugins.ViewModel.imageUrl).toBeDefined();
    });

    // AboutCard test
    it('should create AboutCard', () => {
        const aboutCard = Plugins.ViewModel.BuildAboutCard();
        expect(aboutCard).toBeDefined();
        const cardData = aboutCard.getData();
        expect(cardData).toBeDefined();
        expect(cardData.name).toBe(`${Plugins.ViewModel.id}-About`);
    });

    // HelpCard test
    it('should create HelpCard', () => {
        const helpCard = Plugins.ViewModel.BuildHelpCard();
        expect(helpCard).toBeDefined();
        const cardData = helpCard.getData();
        expect(cardData).toBeDefined();
        expect(cardData.name).toBe(`${Plugins.ViewModel.id}-Help`);
    });
});
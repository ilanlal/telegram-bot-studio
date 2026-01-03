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

    it('should create HomeCard', () => {
        // mock event parameters
        const e = { parameters: {} };
        const homeCard = Plugins.ViewModel.BuildHomeCard(e);
        expect(homeCard).toBeDefined();
        const cardData = homeCard.getData();
        expect(cardData).toBeDefined();
        expect(cardData.name).toBe(`${Plugins.ViewModel.id}-Home`);
        // check if sections exist
        expect(cardData.sections).toBeDefined();
        expect(cardData.sections.length).toBeGreaterThan(0);
    });

    // BuildLoginCard test
    it('should create LoginCard', () => {
        const loginCard = Plugins.ViewModel.BuildLoginCard();
        expect(loginCard).toBeDefined();
        const cardData = loginCard.getData();
        expect(cardData).toBeDefined();
        expect(cardData.name).toBe('LoginCard');
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

    // UserProfileCard test
    it('should create UserProfileCard', () => {
        const userProfileCard = Plugins.ViewModel.BuildUserProfileCard();
        expect(userProfileCard).toBeDefined();
        const cardData = userProfileCard.getData();
        expect(cardData).toBeDefined();
        expect(cardData.name).toBe(`${Plugins.ViewModel.id}-UserProfile`);
    });
});
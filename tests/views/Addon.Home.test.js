require('..');
const { Plugins } = require('../../src/Plugins');
const View = Plugins.Home.View;
describe('Plugins.Home.View build', () => {
    beforeEach(() => {
        // UrlFetchAppStubConfiguration.reset();
    });

    // HomeCard test
    it('should build HomeCard correctly', () => {
        const homeCard = View.HomeCard({ isPremium: false });
        expect(homeCard).toBeDefined();
        const cardData = homeCard.getData();
        expect(cardData).toBeDefined();
        expect(cardData.name).toBe(Plugins.Home.id + '-Home');
        expect(cardData.sections).toBeDefined();
        expect(cardData.sections.length).toBeGreaterThan(0);

        // Check for case when user is premium
        const premiumHomeCard = View.HomeCard({ isPremium: true });
        expect(premiumHomeCard).toBeDefined();
        const premiumCardData = premiumHomeCard.getData();
        expect(premiumCardData).toBeDefined();
        expect(premiumCardData.sections).toBeDefined();
        expect(premiumCardData.sections.length).toBeGreaterThan(0);
    });

    // HelpCard test
    it('should build HelpCard correctly', () => {
        const helpCard = View.HelpCard({});
        expect(helpCard).toBeDefined();
        const cardData = helpCard.getData();
        expect(cardData).toBeDefined();
        expect(cardData.name).toBe(Plugins.Home.id + '-Help');
        expect(cardData.sections).toBeDefined();
        expect(cardData.sections.length).toBeGreaterThan(0);
    });

    // AboutCard test
    it('should build AboutCard correctly', () => {
        const aboutCard = View.AboutCard({});
        expect(aboutCard).toBeDefined();
        const cardData = aboutCard.getData();
        expect(cardData).toBeDefined();
        expect(cardData.name).toBe(Plugins.Home.id + '-About');
        expect(cardData.sections).toBeDefined();
        expect(cardData.sections.length).toBeGreaterThan(0);
    });
});
require('../../tests');
const { Plugins } = require('./Plugins');

describe('Plugins Configuration', () => {
    it('should have plugins defined with required properties', () => {
        const pluginsToTest = [
            Plugins.GetMe,
            Plugins.GetChat
        ];
        pluginsToTest.forEach((plugin) => {
            expect(plugin).toBeDefined();
            expect(plugin.id).toBeDefined();
            expect(plugin.name).toBeDefined();
            expect(plugin.description).toBeDefined();
            expect(plugin.version).toBeDefined();
            expect(plugin.imageUrl).toBeDefined();
            const e = { parameters: {} };
            // Test WelcomeSection
            const welcomeSection = plugin['WelcomeSection'](e);
            expect(welcomeSection).toBeDefined();
            const sectionData = welcomeSection.getData();
            expect(sectionData).toBeDefined();

            // Test HomeCard
            const homeCard = plugin['HomeCard'](e);
            expect(homeCard).toBeDefined();
            const cardData = homeCard.getData();
            expect(cardData).toBeDefined();
            expect(cardData.name).toBe(plugin.name);

            // Test AboutCard
            const aboutCard = plugin['AboutCard'](e);
            expect(aboutCard).toBeDefined();
            const aboutCardData = aboutCard.getData();
            expect(aboutCardData).toBeDefined();
            expect(aboutCardData.name).toBe(`About ${plugin.name}`);

            // Test HelpCard
            const helpCard = plugin['HelpCard'](e);
            expect(helpCard).toBeDefined();
            const helpCardData = helpCard.getData();
            expect(helpCardData).toBeDefined();
            expect(helpCardData.name).toBe(`Help - ${plugin.name}`);
        });
    });
});
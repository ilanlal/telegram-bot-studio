require('../../tests');
const { Plugins } = require('./Plugins');

describe('Plugins.GetMe', () => {
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

            it('should create WelcomeSection', () => {
                const welcomeSection = plugin['WelcomeSection']();
                expect(welcomeSection).toBeDefined();
                const sectionData = welcomeSection.getData();
                expect(sectionData).toBeDefined();
                expect(sectionData.header).toBe('GetMe Extensions');
            });

            // AboutCard test
            it('should create AboutCard', () => {
                const aboutCard = plugin['AboutCard']();
                expect(aboutCard).toBeDefined();
                const cardData = aboutCard.getData();
                expect(cardData).toBeDefined();
                expect(cardData.name).toBe(`About ${plugin.name}`);
            });

            // HelpCard test
            it('should create HelpCard', () => {
                const helpCard = plugin['HelpCard']();
                expect(helpCard).toBeDefined();
                const cardData = helpCard.getData();
                expect(cardData).toBeDefined();
                expect(cardData.name).toBe(`Help - ${plugin.name}`);
            });

        });
    });
});
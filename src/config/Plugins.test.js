require('../../tests');
const { Plugins } = require('./Plugins');

describe('Plugins Configuration', () => {
    it('should have GetMe plugin defined with required properties', () => {
        const pluginsToTest = [
            Plugins.GetMe,
            Plugins.JsonTools
            //Plugins.GetChat
        ];
        pluginsToTest.forEach((plugin) => {
            expect(plugin).toBeDefined();
            expect(plugin.id).toBeDefined();
            expect(plugin.name).toBeDefined();
            expect(plugin.description).toBeDefined();
            expect(plugin.version).toBeDefined();
            expect(plugin.imageUrl).toBeDefined();

            // Test WelcomeSection
            const welcomeSection = plugin['WelcomeSection']();
            expect(welcomeSection).toBeDefined();
            const sectionData = welcomeSection.getData();
            expect(sectionData).toBeDefined();
        });
    });
});
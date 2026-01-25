require('../../tests');
const { Plugins } = require('../Plugins');

describe('Plugins JsonTools', () => {
    it('should have required properties', () => {
        expect(Plugins.JsonTools.id).toBeDefined();
        expect(Plugins.JsonTools.name).toBeDefined();
        expect(Plugins.JsonTools.description).toBeDefined();
        expect(Plugins.JsonTools.version).toBeDefined();
        expect(Plugins.JsonTools.imageUrl).toBeDefined();
    });

    // WelcomeSection test
    it('should create WelcomeSection', () => {
        const welcomeSection = Plugins.JsonTools['WelcomeSection']({});
        expect(welcomeSection).toBeDefined();
        const sectionData = welcomeSection.getData();
        expect(sectionData).toBeDefined();
        expect(sectionData.header).toBe('🪚 Useful JSON Tools');
    });
});
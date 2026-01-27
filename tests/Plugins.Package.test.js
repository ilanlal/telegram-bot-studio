require('.');
const { Plugins } = require('../src/Plugins');

describe('Plugins Package', () => {
    it('should have required properties', () => {
        expect(Plugins.Package.version).toBeDefined();
        expect(Plugins.Package.name).toBeDefined();
        expect(Plugins.Package.description).toBeDefined();
        expect(Plugins.Package.short_description).toBeDefined();
        expect(Plugins.Package.build).toBeDefined();
        expect(Plugins.Package.gitRepository).toBeDefined();
        expect(Plugins.Package.author).toBeDefined();
        expect(Plugins.Package.license).toBeDefined();
        expect(Plugins.Package.imageUrl).toBeDefined();
    });
});
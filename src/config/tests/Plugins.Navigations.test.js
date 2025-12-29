require('../../../tests');
const { Plugins } = require('../Plugins');

describe('Plugins Navigations', () => {
    it('should handle PushCard navigation', () => {
        // mock event parameters
        const e = { parameters: { path: 'Plugins.GetMe.HomeCard' } };

        const actionResponse = Plugins.Navigations.PushCard(e);
        expect(actionResponse).toBeDefined();
        const data = actionResponse.getData();
        expect(data).toBeDefined();
        expect(data.cardNavigations).toBeDefined();
        expect(data.cardNavigations.length).toBeGreaterThan(0);
        expect(data.cardNavigations[0].pushCard).toBeDefined();
    });

    it('should throw error for missing path parameter', () => {
        // mock event parameters without path
        const e = { parameters: {} };
        expect(() => {
            Plugins.Navigations.PushCard(e);
        }).toThrow('"path" parameter is required to navigate.');
    });

    it('should throw error for invalid path', () => {
        // mock event parameters with invalid path
        const e = { parameters: { path: 'Invalid.Path' } };
        expect(() => {
            Plugins.Navigations.PushCard(e);
        }).toThrow('Invalid plugin path format: "Invalid.Path". Expected format: "Plugins.PluginName.ActionName".');
    });
});
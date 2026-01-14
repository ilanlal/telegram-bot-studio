require('../../../tests');
const { Plugins } = require('../Plugins');

describe('Plugins ViewModel', () => {
    it('should have required properties', () => {
        expect(Plugins.ViewModel.id).toBeDefined();
        expect(Plugins.ViewModel.name).toBeDefined();
    });
});
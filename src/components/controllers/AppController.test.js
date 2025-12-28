require('../../../tests');
const { AppController } = require('./AppController');

describe('AppController', () => {
    beforeEach(() => {
        SpreadsheetStubConfiguration.reset();
    });
    it('should create an instance of AppController', () => {
        const controller = new AppController();
        expect(controller).toBeInstanceOf(AppController);
    });

    it('should get AppModel from AppController', () => {
        const controller = new AppController();
        const cardBuilder = controller.newCardBuilder({ name: 'Test Card' });
        expect(cardBuilder).toBeDefined();
        const data = cardBuilder.build().getData();
        expect(data).toBeDefined();
        expect(data.name).toBe('Test Card');
    });
});
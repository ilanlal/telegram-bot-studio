require('../../../tests');

const { EventHandler } = require('./EventHandler');

describe('EventHandler', () => {
    it('should create an instance of EventHandler', () => {
        const handler = new EventHandler();
        expect(handler).toBeInstanceOf(EventHandler);
    });

    it('should OpenHomeCard', () => {
        const event = {}; // Mock event object
        const actionResponse = EventHandler.ViewModel.OpenHomeCard(event);
        expect(actionResponse).toBeDefined();
        const data = actionResponse.getData();
        expect(data).toBeDefined();
        // not notification
        expect(data.notification).toBeUndefined();
        //{ cardNavigations: [ { pushCard: [Object] } ] }
        expect(data.cardNavigations).toBeDefined();
        expect(data.cardNavigations.length).toBeGreaterThan(0);
        expect(data.cardNavigations[0].pushCard).toBeDefined();
    });

    it('should handle OpenAccountCard', () => {
        const event = {}; // Mock event object
        const actionResponse = EventHandler.ViewModel.OpenAccountCard(event);
        expect(actionResponse).toBeDefined();
        const data = actionResponse.getData();
        expect(data).toBeDefined();

        // not notification
        expect(data.notification).toBeUndefined();
        //{ cardNavigations: [ { pushCard: [Object] } ] }
        expect(data.cardNavigations).toBeDefined();
        expect(data.cardNavigations.length).toBeGreaterThan(0);
        expect(data.cardNavigations[0].pushCard).toBeDefined();
    });

    it('should handle OpenAboutCard', () => {
        const event = {}; // Mock event object
        const actionResponse = EventHandler.ViewModel.OpenAboutCard(event);
        expect(actionResponse).toBeDefined();
        const data = actionResponse.getData();
        expect(data).toBeDefined();
        // not notification
        expect(data.notification).toBeUndefined();
        //{ cardNavigations: [ { pushCard: [Object] } ] }
        expect(data.cardNavigations).toBeDefined();
        expect(data.cardNavigations.length).toBeGreaterThan(0);
        expect(data.cardNavigations[0].pushCard).toBeDefined();
    });

    // onActivatePremiumClicked
    it('should handle onActivatePremiumClicked', () => {
        const event = {}; // Mock event object
        const actionResponse = EventHandler.ViewModel.ActivatePremiumClicked(event);
        expect(actionResponse).toBeDefined();
        const data = actionResponse.getData();
        expect(data).toBeDefined();
        // no 'error' string in data
        expect(JSON.stringify(data).toLowerCase()).not.toContain('error');
    });

    // onRevokeLicenseClicked
    it('should handle onRevokeLicenseClicked', () => {
        const event = {}; // Mock event object
        const actionResponse = EventHandler.ViewModel.RevokeLicenseClicked(event);
        expect(actionResponse).toBeDefined();
        const data = actionResponse.getData();
        expect(data).toBeDefined();
        // no 'error' string in data
        expect(JSON.stringify(data).toLowerCase()).not.toContain('error');
    });

    // Additional tests for other handlers can be added similarly
});
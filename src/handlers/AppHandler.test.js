require('../../tests');

const { AppHandler } = require('./AppHandler');

describe('AppHandler', () => {
    it('should create an instance of AppHandler', () => {
        const handler = new AppHandler();
        expect(handler).toBeInstanceOf(AppHandler);
    });

    it('should onOpenHomeCard', () => {
        const event = {}; // Mock event object
        const actionResponse = AppHandler.ViewModel.OpenHomeCard(event);
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

    it('should handle onUserProfileCardOpen', () => {
        const event = {}; // Mock event object
        const actionResponse = AppHandler.ViewModel.OpenUserProfileCard(event);
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

    it('should handle onAboutCardOpen', () => {
        const event = {}; // Mock event object
        const actionResponse = AppHandler.ViewModel.OpenAboutCard(event);
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

    // ActivatePremium
    it('should handle ActivatePremium', () => {
        const event = {}; // Mock event object
        const actionResponse = AppHandler.ViewModel.ActivatePremium(event);
        expect(actionResponse).toBeDefined();
        const data = actionResponse.getData();
        expect(data).toBeDefined();
        // no 'error' string in data
        expect(JSON.stringify(data).toLowerCase()).not.toContain('error');
    });

    // RevokeLicense
    it('should handle RevokeLicense', () => {
        const event = {}; // Mock event object
        const actionResponse = AppHandler.ViewModel.RevokeLicense(event);
        expect(actionResponse).toBeDefined();
        const data = actionResponse.getData();
        expect(data).toBeDefined();
        // no 'error' string in data
        expect(JSON.stringify(data).toLowerCase()).not.toContain('error');
    });

    // Additional tests for other handlers can be added similarly
});
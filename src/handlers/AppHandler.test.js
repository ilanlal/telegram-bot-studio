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

    // ToggleAction
    it('should handle ToggleAction', () => {
        const event = {
            commonEventObject: {
                parameters: {
                    actionName: 'debug_mode_switch',
                    isEnabled: 'true'
                }
            }
        };
        const actionResponse = AppHandler.ViewModel.ToggleAction(event);
        expect(actionResponse).toBeDefined();
        const data = actionResponse.getData();
        expect(data).toBeDefined();
    });
});
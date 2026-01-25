require('../../tests');
const { Plugins } = require('../Plugins');

describe('Plugins.Settings', () => {
    describe('Settings Plugin', () => {
        it('should have required properties', () => {
            expect(Plugins.Settings.id).toBeDefined();
            expect(Plugins.Settings.name).toBeDefined();
            expect(Plugins.Settings.short_description).toBeDefined();
            expect(Plugins.Settings.description).toBeDefined();
            expect(Plugins.Settings.version).toBeDefined();
        });


        // Load
        it('should handle Load', () => {
            // mock event parameters
            const e = { parameters: {} };
            const homeCard = Plugins.Settings.Controller.Load(e);
            expect(homeCard).toBeDefined();
            const cardData = homeCard.getData();
            expect(cardData).toBeDefined();
            // no notification
            expect(cardData.notification).toBeUndefined();
        });

        // OnSaveSettings
        it('should handle OnSaveSettings', () => {
            // mock event with form inputs
            const e = {
                formInput: {
                    txt_api_endpoint_url: 'https://api.telegram.org/',
                    terminal_output_switch: 'ON',
                    txt_secret_private_key: 'my_secret_key_123'
                }
            };

            const actionResponse = Plugins.Settings.Controller.SaveSettings(e);
            expect(actionResponse).toBeDefined();
            const data = actionResponse.getData();
            expect(data).toBeDefined();

            // not notification
            expect(data.notification).toBeUndefined();
        });

        // OnToggleAction
        it('should handle OnToggleAction', () => {
            // mock event parameters
            const e = {
                commonEventObject: {
                    parameters: {
                        actionName: 'terminal_output_switch'
                    },
                    formInputs: {
                        terminal_output_switch: { stringInputs: { value: ['OFF'] } }
                    }
                }
            };
            const actionResponse = Plugins.Settings.Controller.ToggleAction(e);
            expect(actionResponse).toBeDefined();
            const data = actionResponse.getData();
            expect(data).toBeDefined();

            // check notification text not contains 'error' string
            expect(data.notification).toBeDefined();
            expect(data.notification.text.toLowerCase()).not.toContain('error');
        });
    });
});
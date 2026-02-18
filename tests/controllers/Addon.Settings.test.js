require('..');
const { Plugins } = require('../../src/Plugins');

const controller = Plugins.Settings.Controller;

describe('Plugins.Settings.Controller', () => {
    beforeEach(() => {
        PropertiesService.getUserProperties().deleteAllProperties();
    });

    describe('Actions', () => {
        // Load test
        it('should handle Load', () => {
            // mock event parameters
            const e = { parameters: {} };
            const settingsCard = controller.Load(e);

            expect(settingsCard).toBeDefined();
            const cardData = settingsCard.getData();
            expect(cardData).toBeDefined();
            // no notification
            expect(cardData.notification).toBeUndefined();
        });

        // Save test
        it('should handle Save', () => {
            // mock event parameters
            const e = {
                commonEventObject: {
                    formInputs: {
                        [Plugins.PROPERTIES.indentation_spaces]: {
                            stringInputs: {
                                value: ['4']
                            }
                        },
                        [Plugins.PROPERTIES.show_errors_switch]: {
                            stringInputs: {
                                value: ['ON']
                            }
                        }
                    }
                }
            };
            const settingsCard = controller.SaveSettings(e);

            expect(settingsCard).toBeDefined();
            const cardData = settingsCard.getData();
            expect(cardData).toBeDefined();

            // no notification
            expect(cardData.notification).toBeUndefined();

            // verify properties were saved
            const userProperties = PropertiesService.getUserProperties();
            expect(userProperties.getProperty(Plugins.PROPERTIES.indentation_spaces)).toBe('4');
            expect(userProperties.getProperty(Plugins.PROPERTIES.show_errors_switch)).toBe('ON');
        });


    });
});
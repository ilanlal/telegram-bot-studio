require('../../../tests');
const { Plugins } = require('../Plugins');

describe('Plugins.Settings', () => {
    describe('Settings Plugin', () => {
        it('should have required properties', () => {
            expect(Plugins.Settings.id).toBeDefined();
            expect(Plugins.Settings.name).toBeDefined();
            expect(Plugins.Settings.description).toBeDefined();
            expect(Plugins.Settings.version).toBeDefined();
            expect(Plugins.Settings.imageUrl).toBeDefined();
        });

        // WelcomeSection
        it('should create WelcomeSection', () => {
            const welcomeSection = Plugins.Settings['WelcomeSection']();
            expect(welcomeSection).toBeDefined();
            const sectionData = welcomeSection.getData();
            expect(sectionData).toBeDefined();
        });

        // HomeCard test
        it('should create HomeCard', () => {
            // mock event parameters
            const e = { parameters: {} };
            const homeCard = Plugins.Settings['HomeCard'](e);
            expect(homeCard).toBeDefined();
            const cardData = homeCard.getData();
            expect(cardData).toBeDefined();
            expect(cardData.name).toBe(Plugins.Settings.name + '-Home');
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

            const actionResponse = Plugins.Settings.OnSaveSettings(e);
            expect(actionResponse).toBeDefined();
            const data = actionResponse.getData();
            expect(data).toBeDefined();

            // not notification
            expect(data.notification).toBeUndefined();
        });
    });
});
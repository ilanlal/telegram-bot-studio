require('../../../tests');
const { Plugins } = require('../Plugins');

describe('Plugins.Home', () => {
    beforeEach(() => {
        // UrlFetchAppStubConfiguration.reset();
    });

    describe('Home Plugin', () => {
        it('should have required properties', () => {
            expect(Plugins.Home.id).toBeDefined();
            expect(Plugins.Home.name).toBeDefined();
            expect(Plugins.Home.description).toBeDefined();
            expect(Plugins.Home.short_description).toBeDefined();
        });

        // OnLoad test
        it('should handle OnLoad', () => {
            // mock event parameters
            const e = { parameters: {} };
            const homeCard = Plugins.Home.Controller.Load(e);
            expect(homeCard).toBeDefined();
            const cardData = homeCard.getData();
            expect(cardData).toBeDefined();
            expect(cardData.cardNavigations).toBeDefined();
            expect(cardData.cardNavigations.length).toBeGreaterThan(0);
            expect(cardData.cardNavigations[0].pushCard).toBeDefined();
            // No notification
            expect(cardData.notification).toBeUndefined();

            // pushCard data
            const pushCardData = cardData.cardNavigations[0].pushCard;
            expect(pushCardData.name).toBe(Plugins.Home.id + '-Home');

        });

        // OnHelp test
        it('should handle OnHelp', () => {
            // mock event parameters
            const e = { parameters: {} };
            const helpCard = Plugins.Home.Controller.Help(e);
            expect(helpCard).toBeDefined();
            const cardData = helpCard.getData();
            expect(cardData).toBeDefined();
            // no notification
            expect(cardData.notification).toBeUndefined();
        });

        // OnAbout test
        it('should handle OnAbout', () => {
            // mock event parameters
            const e = { parameters: {} };
            const aboutCard = Plugins.Home.Controller.About(e);
            expect(aboutCard).toBeDefined();
            const cardData = aboutCard.getData();
            expect(cardData).toBeDefined();

            // no notification
            expect(cardData.notification).toBeUndefined();
        });
    });
});
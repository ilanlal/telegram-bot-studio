require('../../../tests');
const { Plugins } = require('../Plugins');

describe('Plugins.Home', () => {
    beforeEach(() => {
        // UrlFetchAppStubConfiguration.reset();
    });

    describe('Home Plugin', () => {
        // Load test
        it('should handle Load', () => {
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
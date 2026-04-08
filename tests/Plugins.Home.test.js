require('.');
const { Addon,Common } = require('../src/Addon');

describe('Addon.Home tests', () => {
    beforeEach(() => {
        // UrlFetchAppStubConfiguration.reset();
    });

    describe('Controller', () => {
        const Controller = Addon.Home.Controller;
        beforeEach(() => {
            // UrlFetchAppStubConfiguration.reset();
        });

        // PushHomeCard test
        it('should handle PushHomeCard', () => {
            // mock event parameters
            const e = { parameters: {} };
            const homeCard = Controller.PushHomeCard(e);
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
            expect(pushCardData.name).toBe(Addon.Home.id + '-Home');
        });

        // PushHelpCard test
        it('should handle PushHelpCard', () => {
            // mock event parameters
            const e = { parameters: {} };
            const helpCard = Controller.PushHelpCard(e);
            expect(helpCard).toBeDefined();
            const cardData = helpCard.getData();
            expect(cardData).toBeDefined();
            // no notification
            expect(cardData.notification).toBeUndefined();
        });

        // PushAboutCard test
        it('should handle PushAboutCard', () => {
            // mock event parameters
            const e = { parameters: {} };
            const aboutCard = Controller.PushAboutCard(e);
            expect(aboutCard).toBeDefined();
            const cardData = aboutCard.getData();
            expect(cardData).toBeDefined();
            // no notification
            expect(cardData.notification).toBeUndefined();
        });

    });

    describe('View', () => {
        const View = Addon.Home.View;

        beforeEach(() => {
            PropertiesService.getScriptProperties().deleteAllProperties();

            // UrlFetchAppStubConfiguration.reset();
        });

        describe('HomeCard', () => {
            // HomeCard test 1 - should build Home Card with Welcome to Gemini Assistant section if API key is not present
            it('should build Home Card with Welcome to Gemini Assistant section', () => {
                const data = Common.Modules.App.getData();

                const homeCard = View.HomeCard(data);
                expect(homeCard).toBeDefined();
                const cardData = homeCard.getData();
                expect(cardData).toBeDefined();
                expect(cardData.name).toBe(Addon.Home.id + '-Home');
            });
        });

        // HelpCard test
        it('should handle HelpCard', () => {
            // mock event parameters
            const data = {};
            const helpCard = View.HelpCard(data);

            expect(helpCard).toBeDefined();
            const cardData = helpCard.getData();
            expect(cardData).toBeDefined();
        });

        // AboutCard test
        it('should handle AboutCard', () => {
            // mock event parameters
            const data = {};
            const aboutCard = View.AboutCard(data);
            expect(aboutCard).toBeDefined();
            const cardData = aboutCard.getData();
            expect(cardData).toBeDefined();
            // check for more than 1 sections
            expect(cardData.sections.length).toBeGreaterThan(1);
        });
    });
});
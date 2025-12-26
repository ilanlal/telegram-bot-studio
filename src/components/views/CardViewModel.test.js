require('../../../tests');

const { EMD } = require('../../config/EMD');
const CardViewModel = require('./CardViewModel');

describe('CardViewModel', () => {
    const tests = [
        EMD.Cards.Home,
        EMD.Cards.Account,
        EMD.Cards.Help,
        EMD.Cards.About,
        EMD.Cards.CommonBotOperations,
        EMD.Cards.MembershipSubscription,
        EMD.Cards.ThankYou,
        EMD.Cards.CardSample];

    it('should create an view model instance.', () => {
        const viewModel = CardViewModel.create({
            cardService: CardService,
            documentProperties: PropertiesService.getDocumentProperties()
        });
        expect(viewModel).toBeDefined();
    });

    describe('Entity Metadata configuration', () => {
        tests.forEach((emd) => {
            const cardMeta = emd({});
            it(`should create a card from the "${cardMeta.name}" card method`, () => {
                const cardWeapper = CardViewModel.CardServiceWrapper.create(
                    CardService,
                    PropertiesService.getDocumentProperties()
                );

                // if emd[0].card is function
                if (!emd) null;
                const cardBuilder = cardWeapper
                    .newCardBuilder(cardMeta);

                expect(cardBuilder).toBeDefined();
                const builtCard = cardBuilder.build();
                const data = builtCard.getData();
                expect(data).toBeDefined();
                expect(data.name).toBe(cardMeta.name);
                expect(data.header).toBeDefined();
                expect(data.header.title).toBe(cardMeta.header.title);
                expect(data.header.subTitle).toBe(`${cardMeta.header.subTitle}`);
                expect(data.header.imageUrl).toBe(cardMeta.header.imageUrl);
                expect(data.header.imageStyle).toBe(cardMeta.header.imageStyle);
                expect(data.header.imageAltText).toBe(cardMeta.header.imageAltText);
                expect(data.sections).toBeDefined();
                expect(data.sections.length).toBe(cardMeta.sections.length);
            });
        });
    });

});
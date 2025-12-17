class CardController {
    static create(
        cardService = CardService,
        documentProperties = PropertiesService.getDocumentProperties(),
        userProperties = PropertiesService.getUserProperties(),
        scriptProperties = PropertiesService.getScriptProperties()
    ) {
        return new CardController(cardService, documentProperties, userProperties, scriptProperties);
    }

    constructor(cardService, documentProperties, userProperties, scriptProperties) {
        this.cardService = cardService;
        this.documentProperties = documentProperties;
        this.userProperties = userProperties;
        this.scriptProperties = scriptProperties;
    }

    pushCard(cardMeta = {}) {
        const cardModel = CardViewModel.CardServiceWrapper
            .create(this.cardService, this.documentProperties, this.userProperties, this.scriptProperties);

        const cardBuilder = cardModel.newCardBuilder(cardMeta);

        return this.cardService.newActionResponseBuilder()
            .setNavigation(
                this.cardService.newNavigation()
                    .pushCard(cardBuilder.build())
            );
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CardController };
}
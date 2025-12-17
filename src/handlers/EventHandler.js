class EventHandler {
    get documentProperties() {
        if (!this._documentProperties) {
            this._documentProperties = PropertiesService.getDocumentProperties();
        }
        return this._documentProperties;
    }

    constructor() {
        this._documentProperties = null;
    }
};

EventHandler.Addon = {
    onOpenHomeCard: (e) => {
        return new EventHandler
            .AddonWrapper(
                EventHandler.prototype.documentProperties)
            .handleOpenHomeCard(e);
    },
    onOpenAccountCard: (e) => {
        return new EventHandler
            .AddonWrapper(
                EventHandler.prototype.documentProperties)
            .handleOpenAccountCard(e);
    },
    onOpenAboutCard: (e) => {
        return new EventHandler
            .AddonWrapper(
                EventHandler.prototype.documentProperties)
            .handleOpenAboutCard(e);
    },
    onActivatePremiumClicked: (e) => {
        return new EventHandler
            .AddonWrapper(
                EventHandler.prototype.documentProperties)
            .handleActivatePremiumClicked(e);
    },
    onRevokeLicenseClicked: (e) => {
        return new EventHandler
            .AddonWrapper(
                EventHandler.prototype.documentProperties)
            .handleRevokeLicenseClicked(e);
    }
}
EventHandler.AddonWrapper = class {
    constructor(documentProperties) {
        this._documentProperties = documentProperties;
    }

    handleOpenHomeCard(e) {
        return CardHandler.Addon
                .onOpenCardClick({ parameters: { card: 'EMD.Cards.Home' } });
    }

    handleOpenAccountCard(e) {
        return CardHandler.Addon
                .onOpenCardClick({ parameters: { card: 'EMD.Cards.Account' } });
    }

    handleOpenAboutCard(e) {
        return CardHandler.Addon
                .onOpenCardClick({ parameters: { card: 'EMD.Cards.About' } });
    }

    handleActivatePremiumClicked(e) {
        try {
            // return "Not implemented yet" error
            throw new Error("Not implemented yet");
        } catch (error) {
            return this.handleError(error)
                .build();
        }
    }

    handleRevokeLicenseClicked(e) {
        try {
            // return "Not implemented yet" error
            throw new Error("Not implemented yet");
        } catch (error) {
            return this.handleError(error)
                .build();
        }
    }

    handleOperationSuccess(message) {
        // Show a success message to the user
        return CardService.newActionResponseBuilder()
            .setNotification(
                CardService.newNotification()
                    .setText(message));
    }

    handleError(error) {
        // Show an error message to the user
        return CardService.newActionResponseBuilder()
            .setNotification(
                CardService.newNotification()
                    .setText(
                        error.toString()));
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        EventHandler
    };
}
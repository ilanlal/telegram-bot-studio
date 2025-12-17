class EventHandler {
    get activeSpreadsheet() {
        if (!this._activeSpreadsheet) {
            this._activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        }
        return this._activeSpreadsheet;
    }

    get documentProperties() {
        if (!this._documentProperties) {
            this._documentProperties = PropertiesService.getDocumentProperties();
        }
        return this._documentProperties;
    }

    get userProperties() {
        if (!this._userProperties) {
            this._userProperties = PropertiesService.getUserProperties();
        }
        return this._userProperties;
    }

    get scriptProperties() {
        if (!this._scriptProperties) {
            this._scriptProperties = PropertiesService.getScriptProperties();
        }
        return this._scriptProperties;
    }

    constructor() {
        this._activeSpreadsheet = null;
        this._documentProperties = null;
        this._userProperties = null;
        this._scriptProperties = null;
    }
};

EventHandler.Controller = {
    onOpenHomeCard: (e) => {
        return new EventHandler
            .Wrapper(
                EventHandler.prototype.activeSpreadsheet, EventHandler.prototype.documentProperties, EventHandler.prototype.userProperties, EventHandler.prototype.scriptProperties)
            .handleOpenHomeCard(e);
    },
    onOpenAccountCard: (e) => {
        return new EventHandler
            .Wrapper(
                EventHandler.prototype.activeSpreadsheet, EventHandler.prototype.documentProperties, EventHandler.prototype.userProperties, EventHandler.prototype.scriptProperties)
            .handleOpenAccountCard(e);
    },
    onOpenAboutCard: (e) => {
        return new EventHandler
            .Wrapper(
                EventHandler.prototype.activeSpreadsheet, EventHandler.prototype.documentProperties, EventHandler.prototype.userProperties, EventHandler.prototype.scriptProperties)
            .handleOpenAboutCard(e);
    },
    onActivatePremiumClicked: (e) => {
        return new EventHandler
            .Wrapper(
                EventHandler.prototype.activeSpreadsheet, EventHandler.prototype.documentProperties, EventHandler.prototype.userProperties, EventHandler.prototype.scriptProperties)
            .handleActivatePremiumClicked(e);
    },
    onRevokeLicenseClicked: (e) => {
        return new EventHandler
            .Wrapper(
                EventHandler.prototype.activeSpreadsheet, EventHandler.prototype.documentProperties, EventHandler.prototype.userProperties, EventHandler.prototype.scriptProperties)
            .handleRevokeLicenseClicked(e);
    }
}
EventHandler.Wrapper = class {
    constructor(activeSpreadsheet, documentProperties, userProperties, scriptProperties) {
        this._activeSpreadsheet = activeSpreadsheet;
        this._documentProperties = documentProperties;
        this._userProperties = userProperties;
        this._scriptProperties = scriptProperties;
    }

    handleOpenHomeCard(e) {
        return NavigationHandler.ViewModel
                .onPushCardClick({ parameters: { template: 'EMD.Cards.Home' } });
    }

    handleOpenAccountCard(e) {
        return NavigationHandler.ViewModel
                .onPushCardClick({ parameters: { template: 'EMD.Cards.Account' } });
    }

    handleOpenAboutCard(e) {
        return NavigationHandler.ViewModel
                .onPushCardClick({ parameters: { template: 'EMD.Cards.About' } });
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
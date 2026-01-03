class MembershipHandler {
    get cardService() {
        if (!this._cardService) {
            this._cardService = CardService;
        }
        return this._cardService;
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
        // constructor implementation
        this._cardService = CardService;
        this._documentProperties = PropertiesService.getDocumentProperties();
        this._userProperties = PropertiesService.getUserProperties();
        this._scriptProperties = PropertiesService.getScriptProperties();
    }
}

MembershipHandler.ViewModel = {
    ActivatePremium: (e) => {
        return new MembershipHandler
            .ControllerWrapper(
                MembershipHandler.prototype.cardService, MembershipHandler.prototype.documentProperties, MembershipHandler.prototype.userProperties, MembershipHandler.prototype.scriptProperties)
            .handleActivatePremium(e);
    },
    RevokeLicense: (e) => {
        return new MembershipHandler
            .ControllerWrapper(
                MembershipHandler.prototype.cardService, MembershipHandler.prototype.documentProperties, MembershipHandler.prototype.userProperties, MembershipHandler.prototype.scriptProperties)
            .handleRevokeLicense(e);
    }
}

MembershipHandler.ControllerWrapper = class {
    constructor(cardService, documentProperties, userProperties, scriptProperties) {
        this._cardService = cardService;
        this._documentProperties = documentProperties;
        this._userProperties = userProperties;
        this._scriptProperties = scriptProperties;
    }

    handleActivatePremium(e) {
        try {
            // Simulate activation logic
            // In a real implementation, you would interact with a payment gateway or licensing server here
            const membership = {
                licenseKey: 'SAMPLE_LICENSE_KEY',
                type: 'premium',
                activatedAt: new Date().toISOString(),
                // Add one 90 days to the current date
                expiresAt: new Date(new Date().setDate(new Date().getDate() + 90)).toISOString(),
                balance: 0
            }

            // Save membership info to user properties
            this._userProperties.setProperty(AppModel.MEMBERSHIP_PROPERTY_KEY, JSON.stringify(membership));

            // popToRoot first
            return Plugins.Navigations.PopToRoot(e);
        } catch (error) {
            return this.handleOperationError(error);
        }
    }

    handleRevokeLicense(e) {
        try {
            // Simulate revocation logic
            this._userProperties.deleteProperty(AppModel.MEMBERSHIP_PROPERTY_KEY);
            return Plugins.Navigations.PopToRoot(e);
        } catch (error) {
            return this.handleOperationError(error);
        }
    }

    handleOperationSuccess(message) {
        // Show a success message to the user
        return CardService.newActionResponseBuilder()
            .setNotification(
                CardService.newNotification()
                    .setText(message))
            .build();
    }

    handleOperationError(error) {
        // Show an error message to the user
        return CardService.newActionResponseBuilder()
            .setNotification(
                CardService.newNotification()
                    .setText(
                        error.toString()))
            .build();
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        MembershipHandler
    };
}
class AppModel {
    static get MEMBERSHIP_PROPERTY_KEY() {
        return 'membership';
    }

    constructor(documentProperties, userProperties, scriptProperties) {
        this._documentProperties = documentProperties;
        this._userProperties = userProperties;
        this._scriptProperties = scriptProperties;
    }

    static create(documentProperties = PropertiesService.getDocumentProperties(), userProperties = PropertiesService.getUserProperties(), scriptProperties = PropertiesService.getScriptProperties()) {
        return new AppModel(documentProperties, userProperties, scriptProperties);
    }

    toJSON() {
        const rawData = this._userProperties.getProperty(AppModel.MEMBERSHIP_PROPERTY_KEY);
        const membershipInfo = rawData ? JSON.parse(rawData) : {};
        const expiresAt = membershipInfo.expiresAt ? new Date(membershipInfo.expiresAt) : null;
        const balance = membershipInfo.balance || 0;
        const isPremium = (expiresAt && expiresAt > new Date()) || balance > 0;

        return {
            // Membership Info
            isPremium: isPremium,
            balance: balance,
            expiresAt: expiresAt,
            // Package Info
            version: Config.getVersion(),
            build: Config.getBuild(),
            author: Config.getAuthor(),
            license: Config.getLicense(),
            gitRepository: Config.getRepository()
        }
    }

    toString() {
        return JSON.stringify(this.toJSON());
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AppModel };
}
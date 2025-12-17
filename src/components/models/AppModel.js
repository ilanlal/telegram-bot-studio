class AppModel {
    constructor(activeSpreadsheet, documentProperties, userProperties, scriptProperties) {
        this._documentProperties = documentProperties;
        this._userProperties = userProperties;
        this._scriptProperties = scriptProperties;
        this._activeSpreadsheet = activeSpreadsheet;
    }

    static create(
        activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet(),
        documentProperties = PropertiesService.getDocumentProperties(),
        userProperties = PropertiesService.getUserProperties(),
        scriptProperties = PropertiesService.getScriptProperties()
    ) {
        return new AppModel(activeSpreadsheet, documentProperties, userProperties, scriptProperties);
    }

    // Getters
    get state() {
        return {
            userInfo: {
                userEmail: Session.getActiveUser().getEmail(),
                userTimezone: Session.getScriptTimeZone()
            },
            appInfo: {
            }
        }
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AppModel };
}
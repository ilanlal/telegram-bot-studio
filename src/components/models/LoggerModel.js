class LoggerModel {
    static create(
        activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet(),
        documentProperties = PropertiesService.getDocumentProperties(),
        userProperties = PropertiesService.getUserProperties(),
        scriptProperties = PropertiesService.getScriptProperties()) {
        return new LoggerModel(activeSpreadsheet, documentProperties, userProperties, scriptProperties);
    }

    constructor(activeSpreadsheet, documentProperties, userProperties, scriptProperties) {
        this.debugMode = scriptProperties.getProperty('ENABLE_EVENT_LOGGING') || 'false';
        this.archiveSize = parseInt(scriptProperties.getProperty('LOG_ARCHIVE_SIZE'), 10) || 1000;
        this._activeSpreadsheet = activeSpreadsheet;
        this._documentProperties = documentProperties;
        this._userProperties = userProperties;
        this._scriptProperties = scriptProperties;
    }

    logEvent({ dc, action, chat_id, content, event, note = '' }) {
        if (this.debugMode !== 'true' && this.debugMode !== 'all') {
            return;
        }
        const sheetModel = SheetModel.create(this._activeSpreadsheet)
            .initializeSheet(EMD.Spreadsheet.Logger({}));

        const datestring = new Date().toISOString();
        sheetModel.appendRow([datestring, dc, action, chat_id, content, event, note]);
    }

    logError({ dc, action, chat_id, content, event, note = '' }) {
        if (this.debugMode !== 'true' && this.debugMode !== 'all' && this.debugMode !== 'errors' && this.debugMode !== 'error') {
            return;
        }
        const sheetModel = SheetModel.create(this._activeSpreadsheet)
            .initializeSheet(EMD.Spreadsheet.Logger({}));
        const datestring = new Date().toISOString();
        sheetModel.appendRow([datestring, dc, action, chat_id, content, event, note]);
    }

    archiveLog() {
        if (this.sheet.getLastRow() > this.archiveSize) {
            const timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd_HHmmss');
            const archiveSheetName = `${EMD.Spreadsheet.Logger({}).name}_${timestamp}`;
            this.sheetModel.copySheet(this.sheet, archiveSheetName);
            this.sheet.clearContents();
            this.sheet.appendRow([EMD.Spreadsheet.Logger({}).columns]);
        }
    }

}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        LoggerModel
    };
}
class LoggerModel {
    static create(scriptProperties = PropertiesService.getScriptProperties(), activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()) {
        return new LoggerModel(scriptProperties, activeSpreadsheet);
    }

    constructor(scriptProperties, activeSpreadsheet) {
        this.debugMode = scriptProperties
            .getProperty('ENABLE_EVENT_LOGGING') || 'false';
        this.archiveSize = parseInt(
            scriptProperties
                .getProperty('LOG_ARCHIVE_SIZE'), 10) || 1000;
        this.sheetModel = SheetModel.create(activeSpreadsheet);
        this.sheet = this.sheetModel.initializeSheet(EMD.Spreadsheet.Logger({}));
        // cause runtime error when archiveSize is invalid
        // this.archiveLog();
    }

    logEvent({ dc, action, chat_id, content, event, note = '' }) {
        if (this.debugMode !== 'true' && this.debugMode !== 'all') {
            return;
        }
        const datestring = new Date().toISOString();
        this.sheet.appendRow([datestring, dc, action, chat_id, content, event, note]);
    }

    logError({ dc, action, chat_id, content, event, note = '' }) {
        if (this.debugMode !== 'true' && this.debugMode !== 'all' && this.debugMode !== 'errors' && this.debugMode !== 'error') {
            return;
        }
        const datestring = new Date().toISOString();
        this.sheet.appendRow([datestring, dc, action, chat_id, content, event, note]);
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
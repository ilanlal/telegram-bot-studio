class AutomationModel {
    constructor(activeSpreadsheet) {
        this.sheetModel = SheetModel.create(activeSpreadsheet);
        this.sheet = this.sheetModel.initializeSheet(EMD.Spreadsheet.Automation({}));
    }

    static create(activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()) {
        return new AutomationModel(activeSpreadsheet);
    }

    findLanguageColumnIndex(language_code) {
        const range = this.sheet.getDataRange();
        const values = range.getValues();

        for (let col = 0; col < values[0].length; col++) {
            if (values[0][col] === language_code) {
                return col;
            }
        }
        return 1; // default to second column
    }

    listRepliesKeys() {
        const range = this.sheet.getDataRange();
        const values = range.getValues();
        const keys = [];
        for (let row = 1; row < values.length; row++) { // Skip header row
            const key = values[row][0];
            if (key && key.trim() !== '') {
                keys.push({ key, row });
            }
        }
        return keys;
    }

    listLanguages() {
        const range = this.sheet.getDataRange();
        const values = range.getValues();
        const languages = [];
        for (let col = 1; col < values[0].length; col++) { // Skip key column
            const lang = values[0][col];
            if (lang && lang.trim() !== '') {
                languages.push({
                    lang, col
                });
            }
        }
        return languages;
    }

    findData(key, language_code) {
        const range = this.sheet.getDataRange();
        const values = range.getValues() || [];
        let langColIndex = this.findLanguageColumnIndex(language_code);

        if (langColIndex === -1) {
            // throw new Error(`Language code "${language_code}" not found in Replies sheet.`);
            langColIndex = 1; // Default to second column if language not found
        }
        for (let row = 1; row < values.length; row++) { // Skip header row
            if (values[row][0] === key) {
                return values[row][langColIndex];
            }
        }
        return null;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AutomationModel
    };
}
class TerminalOutput {
    static Write(activeSpreadsheet, source, message, e, details) {
        const sheet = SheetModel.create(activeSpreadsheet)
            .getSheet(EMD.Spreadsheet.TerminalOutput({}));

        sheet.appendRow([
            // Created On as iso string
            new Date().toISOString(),
            // source
            source, // chat side
            // Message
            message,
            // Event Object
            JSON.stringify(e),
            // Details 
            details
        ]);
        const lastRow = sheet.getLastRow();

        const lastRowA1Notation = `A${lastRow}:E${lastRow}`;

        return sheet.setActiveSelection(lastRowA1Notation);
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        TerminalOutput
    };
}
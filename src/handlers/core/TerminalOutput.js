class TerminalOutput {
    static Write(activeSpreadsheet, source, message, e, param1, param2, param3) {

        const terminalOutputEnabled = PropertiesService.getUserProperties()
            .getProperty('terminal_output_switch') || 'OFF';
        const focusTerminalOutput = PropertiesService.getUserProperties()
            .getProperty('focus_terminal_output') || 'OFF';

        if (terminalOutputEnabled !== 'ON') {
            return;
        }

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
            param1 || '',
            param2 || '',
            param3 || ''
        ]);

        // Focus the last row if enabled
        if (focusTerminalOutput !== 'ON') {
            return sheet;
        }

        // Set active selection to the last row
        const lastRow = sheet.getLastRow();
        const lastRowA1Notation = `A${lastRow}:G${lastRow}`;
        return sheet.setActiveSelection(lastRowA1Notation);
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        TerminalOutput
    };
}
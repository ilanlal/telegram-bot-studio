class JsonHandler {
}

JsonHandler.View = {
    MinifyJson(e) {
        return new JsonHandler.Controller()
            .handleMinifyJsonRequest(e);
    },
    BeautifyJson(e) {
        return new JsonHandler.Controller()
            .handleBeautifyJsonRequest(e);
    },
    ValidateJson(e) {
        return new JsonHandler.Controller()
            .handleValidateJsonRequest(e);
    }
}

JsonHandler.Controller = class extends JsonHandler {
    constructor() {
        super();
    }

    handleMinifyJsonRequest(e) {
        // extract data from event object
        const formInputs = e && e.commonEventObject && e.commonEventObject.formInputs;
        const ignoreWhitespace = formInputs?.['json_ignore_whitespace']?.booleanInputs.value[0] || false;
        const highlightErrors = formInputs?.['json_highlight_errors']?.booleanInputs.value[0] || true;

        const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        // Returns the current cell in the active sheet or null if there is no current cell. 
        // The current cell is the cell that has focus in the Google Sheets UI, and is highlighted by a dark border. 
        // There is never more than one current cell. When a user selects one or more cell ranges, one of the cells in the selection is the current cell.
        const currentActiveCell = activeSpreadsheet.getCurrentCell();
        if (!currentActiveCell) {
            return this.handleOperationError(new Error('No active cell found. Please select a cell containing JSON to validate.'));
        }
        const inputJsonValue = currentActiveCell.getValue();
        try {
            const jsonObject = JSON.parse(inputJsonValue);
            const outputJsonValue = JSON.stringify(jsonObject);
            // Update the active cell with the minified JSON
            currentActiveCell.setValue(outputJsonValue);
            // Show success message to the user
            return this.handleOperationSuccess('👋 Successfully minified JSON in the active cell.');
        } catch (error) {
            if (highlightErrors) {
                // Add a comment to the cell indicating the JSON is invalid
                currentActiveCell.setNote('Invalid JSON: ' + error.message);
            }
            // Show error message to the user
            this.handleOperationError(error);
            throw error;
        }
    }

    handleBeautifyJsonRequest(e) {
        // extract data from event object
        const formInputs = e && e.commonEventObject && e.commonEventObject.formInputs;
        const indentSpaces = formInputs?.['json_indent_spaces']?.stringInputs.value[0] || '2';
        // const ignoreWhitespace = formInputs?.['json_ignore_whitespace']?.booleanInputs.value[0] || false;
        const highlightErrors = formInputs?.['json_highlight_errors']?.booleanInputs.value[0] || true;

        const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        // Returns the current cell in the active sheet or null if there is no current cell. 
        // The current cell is the cell that has focus in the Google Sheets UI, and is highlighted by a dark border. 
        // There is never more than one current cell. When a user selects one or more cell ranges, one of the cells in the selection is the current cell.
        const currentActiveCell = activeSpreadsheet.getCurrentCell();
        if (!currentActiveCell) {
            return this.handleOperationError(new Error('No active cell found. Please select a cell containing JSON to validate.'));
        }
        const inputJsonValue = currentActiveCell.getValue();
        const indent = parseInt(indentSpaces, 10);
        try {
            const jsonObject = JSON.parse(inputJsonValue);
            const outputJsonValue = JSON.stringify(jsonObject, null, indent);
            // Update the active cell with the beautified JSON
            currentActiveCell.setValue(outputJsonValue);
            // Show success message to the user
            return this.handleOperationSuccess('👋 Successfully beautified JSON in the active cell.');
        } catch (error) {
            if (highlightErrors) {
                // Add a comment to the cell indicating the JSON is invalid
                currentActiveCell.setNote('Invalid JSON: ' + error.message);
            }
            // Show error message to the user
            this.handleOperationError(error);
            throw error;
        }
    }

    handleValidateJsonRequest(e) {
        // extract data from event object
        const formInputs = e && e.commonEventObject && e.commonEventObject.formInputs;
        const ignoreWhitespace = formInputs?.['json_ignore_whitespace']?.booleanInputs.value[0] || false;
        const highlightErrors = formInputs?.['json_highlight_errors']?.booleanInputs.value[0] || true;

        const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        // Returns the current cell in the active sheet or null if there is no current cell. 
        // The current cell is the cell that has focus in the Google Sheets UI, and is highlighted by a dark border. 
        // There is never more than one current cell. When a user selects one or more cell ranges, one of the cells in the selection is the current cell.
        const currentActiveCell = activeSpreadsheet.getCurrentCell();
        if (!currentActiveCell) {
            return this.handleOperationError(new Error('No active cell found. Please select a cell containing JSON to validate.'));
        }
        const inputJsonValue = currentActiveCell.getValue();
        try {
            JSON.parse(inputJsonValue);
            // Show success message to the user
            return this.handleOperationSuccess('👋 JSON is valid.');
        } catch (error) {
            if (highlightErrors) {
                // Add a comment to the cell indicating the JSON is invalid
                currentActiveCell.setNote('Invalid JSON: ' + error.message);
            }
            // Show error message to the user
            this.handleOperationError(error);
            throw error;
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
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        JsonHandler
    };
}
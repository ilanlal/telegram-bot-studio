require('../../../tests');
const { JsonHandler } = require('./JsonHandler');
const SpreadsheetStubConfiguration = require('@ilanlal/gasmocks/src/spreadsheetapp/classes/SpreadsheetStubConfiguration');
const RangeStubConfiguration = require('@ilanlal/gasmocks/src/spreadsheetapp/classes/RangeStubConfiguration');
const SheetStubConfiguration = require('@ilanlal/gasmocks/src/spreadsheetapp/classes/SheetStubConfiguration');

describe('JsonHandler', () => {
    beforeEach(() => {
        // Reset any stubs or mocks if necessary
        SpreadsheetStubConfiguration.reset();
        RangeStubConfiguration.reset();
        SheetStubConfiguration.reset();
    });

    it('should create an instance of JsonHandler', () => {
        const handler = new JsonHandler();
        expect(handler).toBeInstanceOf(JsonHandler);
    });

    // onMinifyJsonClick
    it('should handle onMinifyJsonClick', () => {
        const event = {
            commonEventObject: {
                formInputs: {
                    'json_indent_spaces': { stringInputs: { value: ['4'] } },
                    'json_ignore_whitespace': { booleanInputs: { value: [true] } },
                    'json_highlight_errors': { booleanInputs: { value: [true] } }
                }
            }
        }; // Mock event object
        // stub for getCurrentCell
        SheetStubConfiguration.setCurrentCell(
            RangeStubConfiguration.setA1Notation('A1').setValue('{\n    "key": "value"\n}'));
        const actionResponse = JsonHandler.View.MinifyJson(event);
        expect(actionResponse).toBeDefined();
        const data = actionResponse.getData();
        expect(data).toBeDefined();
        // no 'error' string in data
        expect(JSON.stringify(data).toLowerCase()).not.toContain('error');
    });

    // onBeautifyJsonClick
    it('should handle onBeautifyJsonClick', () => {
        const event = {}; // Mock event object
        // stub for getCurrentCell
        SheetStubConfiguration.setCurrentCell(
            RangeStubConfiguration.setA1Notation('A1').setValue('{"key":"value"}'));
        const actionResponse = JsonHandler.View.BeautifyJson(event);
        expect(actionResponse).toBeDefined();
        const data = actionResponse.getData();
        expect(data).toBeDefined();
        // no 'error' string in data
        expect(JSON.stringify(data).toLowerCase()).not.toContain('error');
    });

    // onValidateJsonClick
    it('should handle onValidateJsonClick', () => {
        const event = {}; // Mock event object
        // stub for getCurrentCell
        SheetStubConfiguration.setCurrentCell(
            RangeStubConfiguration.setA1Notation('A1').setValue('{"key":"value"}'));
        const actionResponse = JsonHandler.View.ValidateJson(event);
        expect(actionResponse).toBeDefined();
        const data = actionResponse.getData();
        expect(data).toBeDefined();
        // no 'error' string in data
        expect(JSON.stringify(data).toLowerCase()).not.toContain('error');
    });

    // on active cell missing
    it('should handle missing active cell gracefully', () => {
        const event = {
            commonEventObject: {
                formInputs: {
                    'json_highlight_errors': { booleanInputs: { value: [true] } }
                }
            }
        }; // Mock event object
        
        // stub for getCurrentCell to return null
        SheetStubConfiguration.setCurrentCell(null);
        const actionResponse = JsonHandler.View.ValidateJson(event);
        expect(actionResponse).toBeDefined();
        const data = actionResponse.getData();
        expect(data).toBeDefined();
        // 'error' string should be in data
        expect(JSON.stringify(data).toLowerCase()).toContain('error');
    });
});
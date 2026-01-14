require('../../tests');
const { Plugins } = require('./Plugins');

describe('Plugins', () => {
    // getFormInputsStringValue
    describe('getFormInputsStringValue', () => {
        it('should return the string value from formInputs', () => {
            // mock event
            const e = {
                commonEventObject: {
                    formInputs: {
                        txt_example_input: { stringInputs: { value: ['example_value'] } }
                    }
                }
            };
            
            const result = Plugins.getFormInputsStringValue(e, 'txt_example_input');
            expect(result).toBe('example_value');
        });

        it('should return empty string if input not found', () => {
            // mock event
            const e = {
                commonEventObject: {
                    formInputs: {
                        txt_example_input: { stringInputs: { value: ['example_value'] } }
                    }
                }
            };
            
            const result = Plugins.getFormInputsStringValue(e, 'txt_nonexistent_input');
            expect(result).toBe('');
        });
    });
});
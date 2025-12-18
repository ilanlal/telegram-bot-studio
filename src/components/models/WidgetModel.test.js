require('../../../tests');
const { WidgetModel } = require('./WidgetModel');

describe('Widget', () => {
    test('should throw error if id is missing', () => {
        expect(() => WidgetModel.create({
            // missing id
            DecoratedText: {
                text: 'Sample Text',
                topLabel: 'Top Label',
            },
            value: 'Sample Value'
        }))
            .toThrow(WidgetModel.INVALID_ID_ERROR);
    });

});
require('../../../tests');
const { AppModel } = require('./AppModel');
const { SheetModel } = require('./SheetModel');
const { EMD } = require('../../config/EMD');

describe('AppModel', () => {
    /** @type {AppModel} */
    let model;
    
    beforeEach(() => {
        model = AppModel.create();
    });

    test('should create a AppModel instance', () => {
        expect(model).toBeInstanceOf(AppModel);
    });
});
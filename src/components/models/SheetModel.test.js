require('../../../tests');
const { SheetModel } = require('./SheetModel');
const SpreadsheetStubConfiguration = require('@ilanlal/gasmocks/src/spreadsheetapp/classes/SpreadsheetStubConfiguration');
const SpreadsheetApp = require('@ilanlal/gasmocks/src/spreadsheetapp/SpreadsheetApp');

describe('SheetModel', () => {
    beforeEach(() => {
        SpreadsheetStubConfiguration.reset();
    });

    it('should create an instance of SheetModel with new service instances', () => {
        const model = SheetModel.create(
            SpreadsheetApp.getActiveSpreadsheet()
        );
        expect(model).toBeDefined();
    });

    describe('SheetModel methods', () => {
        /** @type {SheetModel} */

        beforeEach(() => {
        });

        it('should get the active sheet based on sheetMeta', () => {
            const sheetMeta = {
                name: 'Test Sheet',
                columns: ['action', 'default', 'es', 'fr', 'ar', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko', 'he'],
            };
            const model = SheetModel.create(SpreadsheetApp.getActiveSpreadsheet());
            const activeSheet = model.getSheet(sheetMeta);
            expect(activeSheet).toBeDefined();
            expect(activeSheet.getName()).toBe('Test Sheet');

        });

        it('should bind sample data to the active sheet', () => {
            const sheetMeta = {
                name: 'Test Sheet',
                columns: ['action', 'default', 'es', 'fr', 'ar', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko', 'he'],
                sample_data: [
                    ['action1', 'default1', 'es1', 'fr1', 'ar1', 'de1', 'it1', 'pt1', 'ru1', 'zh1', 'ja1', 'ko1', 'he1'],
                    ['action2', 'default2', 'es2', 'fr2', 'ar2', 'de2', 'it2', 'pt2', 'ru2', 'zh2', 'ja2', 'ko2', 'he2'],
                ]
            };
            const model = SheetModel.create(SpreadsheetApp.getActiveSpreadsheet());
            model.bindSheetSampleData(sheetMeta);
            const activeSheet = model.getSheet(sheetMeta);
            const dataRange = activeSheet.getDataRange();
            const values = dataRange.getValues();
            expect(values.length).toBeGreaterThanOrEqual(2);
            expect(values[0]).toEqual(sheetMeta.columns);
            expect(values[1]).toEqual(sheetMeta.sample_data[0]);
            expect(values[2]).toEqual(sheetMeta.sample_data[1]);
        });

        // Static dumpObjectToSheet method
        it('should dump object data to the specified sheet', () => {
            const data = {
                id: 123456,
                first_name: 'Test',
                username: 'testuser'
            };
            const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
            const sheetName = 'Dumped Data';
            const sheet = SheetModel.dumpObjectToSheet(activeSpreadsheet, sheetName, data);
            expect(sheet).toBeDefined();
            expect(sheet.getName()).toBe(sheetName);

            const dataRange = sheet.getDataRange().getValues();
            expect(dataRange[0]).toEqual(Object.keys(data));
            expect(dataRange[1]).toEqual(Object.values(data));
        });
    });
});
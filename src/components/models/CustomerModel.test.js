require('../../../tests');
const RangeStubConfiguration = require('@ilanlal/gasmocks/src/spreadsheetapp/classes/RangeStubConfiguration');
const { CustomerModel } = require('./CustomerModel');
const SpreadsheetStubConfiguration = require('@ilanlal/gasmocks/src/spreadsheetapp/classes/SpreadsheetStubConfiguration');
const SpreadsheetApp = require('@ilanlal/gasmocks/src/spreadsheetapp/SpreadsheetApp');
const { SheetModel } = require('./SheetModel');
const { EMD } = require('../../config/EMD');

describe('CustomerModel', () => {
    beforeEach(() => {
        SpreadsheetStubConfiguration.reset();
        SheetModel.create(SpreadsheetApp.getActiveSpreadsheet())
            .initializeSheet(EMD.Customer.sheet({}));
    });

    it('should create an instance', () => {
        const model = CustomerModel.create();
        expect(model).toBeInstanceOf(CustomerModel);
    });

    describe('model methods', () => {
        const model = CustomerModel.create();

        it('should get customer by chat ID', () => {
            const chatId = '12345';
            const customer = model.getCustomerByChatId(chatId);
            expect(customer).toBeNull();
        });

        it('should add a new customer then get it by chat ID', () => {
            const newCustomer = {
                id: '12345',
                first_name: 'John',
                last_name: 'Doe',
                username: 'johndoe',
                language_code: 'en',
                is_bot: false
            };
            const addedCustomer = model.addNewCustomer(Object.values(newCustomer));
            expect(addedCustomer).toEqual(expect.arrayContaining([expect.any(String), ...Object.values(newCustomer)]));

            // ["2025-11-15T17:20:53.211Z", "12345", false, "John", "Doe", "johndoe", "en"]
            // RangeStubConfiguration.setValues([addedCustomer]);
            const fetchedCustomer = model.getCustomerByChatId(newCustomer.id);
            // expect(fetchedCustomer) to be an array;
            expect(Array.isArray(fetchedCustomer)).toBe(true);
            
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});
require('..');
const SpreadsheetStubConfiguration = require('@ilanlal/gasmocks/src/spreadsheetapp/classes/SpreadsheetStubConfiguration');
const { Common } = require('../../src/Addon');

describe('Common.Modules.CRM', () => {
    const CRM = Common.Modules.CRM;

    const chatId = '12345';
    beforeEach(() => {
        SpreadsheetStubConfiguration.reset();
    });

    // addNewCustomer test
    it('should add a new customer', () => {

        const newCustomer1 = {
            chat_id: chatId,
            username: 'testuser',
            first_name: 'Test',
            last_name: 'User',
            language_code: 'en',
            is_bot: false
        }
        const newRow = CRM.Customer.addNewCustomer(SpreadsheetApp.getActiveSpreadsheet(), newCustomer1);
        expect(newRow[1]).toBe(chatId);
        expect(newRow[2]).toBe('testuser');
        expect(newRow[3]).toBe('Test');
        expect(newRow[4]).toBe('User');
        expect(newRow[5]).toBe('en');
        expect(newRow[6]).toBe(false);

        // Adding the same customer again should not create a new entry
        const newCustomer2 = { ...newCustomer1, data: { extra: 'new data' } };
        const newRow2 = CRM.Customer.addNewCustomer(SpreadsheetApp.getActiveSpreadsheet(), newCustomer2);
        expect(newRow2[1]).toBe(newRow[1]);
    });

    // getCustomerByChatId test
    it('should get customer by chat_id', () => {
        const _chatId = '67890';
        const newCustomer = {
            chat_id: _chatId,
            username: 'testuser',
            first_name: 'Test',
            last_name: 'User',
            language_code: 'en',
            is_bot: false
        };
        CRM.Customer.addNewCustomer(SpreadsheetApp.getActiveSpreadsheet(), newCustomer);
        const customer = CRM.Customer.getCustomerByChatId(SpreadsheetApp.getActiveSpreadsheet(), _chatId);
        expect(customer).toBeDefined();
        expect(customer.chat_id).toBe(_chatId);
        expect(customer.username).toBe('testuser');
        expect(customer.first_name).toBe('Test');
        expect(customer.last_name).toBe('User');
        expect(customer.language_code).toBe('en');
        expect(customer.is_bot).toBe(false);
    });
});
class CustomerModel {
    static create(userProperties = PropertiesService.getDocumentProperties(), activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()) {
        return new CustomerModel(userProperties, activeSpreadsheet);
    }

    constructor(userProperties, activeSpreadsheet) {
        this.sheetModel = SheetModel.create(activeSpreadsheet);
        this.sheet = this.sheetModel.initializeSheet(EMD.Customer.sheet({}));
    }

    getCustomerByChatId(chat_id) {
        const range = this.sheet.getRange('B:B');
        const textFinder = range.createTextFinder(chat_id);
        const firstOccurrence = textFinder.findNext();
        if (firstOccurrence) {
            return firstOccurrence.getValues();
        }
        return null;
    }

    addNewCustomer(customer) {
        const range = this.sheet.getDataRange();
        const values = range.getValues() || [];
        // add createdOn in the first column as ISO string
        const newRow = [
            new Date().toISOString(),
            ...customer
        ];
        this.sheet.appendRow(newRow);
        return newRow;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CustomerModel };
}
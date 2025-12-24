class PaymentHandler {
    get documentProperties() {
        if (!this._documentProperties) {
            this._documentProperties = PropertiesService.getDocumentProperties();
        }
        return this._documentProperties;
    }

    get activeSpreadsheet() {
        if (!this._activeSpreadsheet) {
            this._activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        }
        return this._activeSpreadsheet;
    }

    get userProperties() {
        if (!this._userProperties) {
            this._userProperties = PropertiesService.getUserProperties();
        }
        return this._userProperties;
    }

    get scriptProperties() {
        if (!this._scriptProperties) {
            this._scriptProperties = PropertiesService.getScriptProperties();
        }
        return this._scriptProperties;
    }

    constructor() {
        this._documentProperties = null;
        this._userProperties = null;
        this._scriptProperties = null;
        this._activeSpreadsheet = null;
    }
}

PaymentHandler.View = {
    onCreateInvoiceLinkClick(e) {
        return new PaymentHandler.ControllerWrapper(
            PaymentHandler.prototype.activeSpreadsheet,
            PaymentHandler.prototype.documentProperties,
            PaymentHandler.prototype.userProperties,
            PaymentHandler.prototype.scriptProperties
        ).handleCreateInvoiceLinkClick(e);
    }
}

PaymentHandler.ControllerWrapper = class extends PaymentHandler {
    constructor(activeSpreadsheet, documentProperties, userProperties, scriptProperties) {
        super();
        this._documentProperties = documentProperties;
        this._userProperties = userProperties;
        this._scriptProperties = scriptProperties;
        this._activeSpreadsheet = activeSpreadsheet;
    }

    handleCreateInvoiceLinkClick(e) {
        try {
            // extract invoice data from event object
            const formInputs = e.commonEventObject.formInputs || {};
            const token = formInputs['txt_bot_api_token']?.stringInputs?.value[0] || null;
            if (!token) {
                throw new Error('Bot API token is required');
            }
            const pricesInput = formInputs['prices_text_input']?.stringInputs?.value[0] || '[]';
            const prices = JSON.parse(pricesInput);
            const createInvoiceLinkUrl = `https://api.telegram.org/bot${token}/createInvoiceLink`;

            const payload = {
                prices: prices
            };

            const response = UrlFetchApp.fetch(createInvoiceLinkUrl, {
                method: 'post',
                contentType: 'application/json',
                payload: JSON.stringify(payload)
            });

            const result = JSON.parse(response.getContentText());

            return CardService.newActionResponseBuilder()
                .setNavigation(CardService.newNavigation().updateCard(
                    CardService.newCardBuilder()
                        .setHeader(CardService.newCardHeader().setTitle('Invoice Link Created'))
                        .addSection(
                            CardService.newCardSection()
                                .addWidget(
                                    CardService.newTextParagraph().setText(`Invoice Link: ${result.result.invoice_link}`)
                                )
                        )
                        .build()
                ))
                .build();
        } catch (error) {
            return CardService.newActionResponseBuilder()
                .setNotification(CardService.newNotification().setText(`Error creating invoice link: ${error.message}`))
                .build();
        }
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PaymentHandler
    };
}
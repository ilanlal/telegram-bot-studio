class PaymentHandler {
    static create(activeSpreadsheet, documentProperties, userProperties, scriptProperties) {
        return new PaymentHandler(activeSpreadsheet, documentProperties, userProperties, scriptProperties);
    }

    constructor(activeSpreadsheet, documentProperties, userProperties, scriptProperties) {
        this.activeSpreadsheet = activeSpreadsheet;
        this.documentProperties = documentProperties;
        this.userProperties = userProperties;
        this.scriptProperties = scriptProperties;
    }

    handleCreateInvoiceLinkClick(e) {
        try {
            // extract invoice data from event object
            const formInputs = e.commonEventObject.formInputs || {};
            const token = formInputs['txt_bot_api_token']?.stringInputs?.value[0] || '';
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
}
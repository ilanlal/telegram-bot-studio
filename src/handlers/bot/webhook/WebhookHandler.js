class WebhookHandler {
    static handlePostUpdateRequest(postData = '{}') {
        const documentProperties = PropertiesService.getDocumentProperties();
        const userProperties = PropertiesService.getUserProperties();
        const scriptProperties = PropertiesService.getScriptProperties();
        const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        LoggerModel.create(activeSpreadsheet, documentProperties, userProperties, scriptProperties)
            .logEvent({
                dc: '@webhook_handler',
                action: 'handlePostUpdateRequest',
                chat_id: '0000',
                content: JSON.stringify(postData),
                event: 'request_received'
            });

        try {
            const contents = JSON.parse(postData.contents) || {};
            const chatId = contents?.message?.chat?.id || contents?.callback_query?.message?.chat?.id || '0000';
            const action = contents?.message?.text || contents?.callback_query?.data || 'unknown_action';
            const eventType = contents?.message ? 'message' : contents?.callback_query ? 'callback_query' : contents?.poll_answer ? 'poll_answer' : contents?.poll ? 'poll' : 'unknown event';

            LoggerModel.create(activeSpreadsheet, documentProperties, userProperties, scriptProperties)
                .logEvent({
                    dc: '@webhook_handler',
                    action: action,
                    chat_id: chatId,
                    content: JSON.stringify(postData),
                    event: eventType
                });

            if (contents.callback_query) {
                return PostCallbackQueryHandler.create(activeSpreadsheet, documentProperties, userProperties, scriptProperties)
                    .handlePostCallbackQuery(contents);

            } else if (contents.message) {
                return PostMessageHandler.create(activeSpreadsheet, documentProperties, userProperties, scriptProperties)
                    .handlePostMessage(contents.message);
            }
            else if (contents.poll_answer) {
                // Handle poll answers if needed
            }
            else if (contents.poll) {
                // Handle polls if needed
            }
            else {
                throw new Error('Invalid message format');
            }

            return JSON.stringify({ status: 'not_handled' });
        } catch (error) {
            LoggerModel.create(activeSpreadsheet, documentProperties, userProperties, scriptProperties)
                .logError({
                    dc: '@webhook_handler.error',
                    action: JSON.stringify(postData),
                    chat_id: '0000',
                    content: error.toString(),
                    event: error.stack
                });
            throw error;
        }
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        WebhookHandler
    };
}
class WebhookHandler {
    static handlePostUpdateRequest(contents) {
        const documentProperties = PropertiesService.getDocumentProperties();
        const userProperties = PropertiesService.getUserProperties();
        const scriptProperties = PropertiesService.getScriptProperties();
        const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        try {
            if (contents.callback_query) {
                LoggerModel.create(scriptProperties, activeSpreadsheet)
                    .logEvent({
                        dc: 'callback_query',
                        action: contents.callback_query.data || '_no_data_',
                        chat_id: contents.callback_query.from.id || '0000',
                        content: JSON.stringify(contents),
                        event: 'received_callback_query'
                    });

                return PostCallbackQueryHandler.create(activeSpreadsheet, documentProperties, userProperties, scriptProperties)
                    .handlePostCallbackQuery(contents);

            } else if (contents.message) {
                LoggerModel.create(scriptProperties, activeSpreadsheet)
                    .logEvent({
                        dc: 'message',
                        action: contents.message.text || '_no_text_',
                        chat_id: contents.message?.from?.id || '0000',
                        content: JSON.stringify(contents.message),
                        event: 'received_message'
                    });
                return PostMessageHandler.create(activeSpreadsheet, documentProperties, userProperties, scriptProperties)
                    .handlePostMessage(contents.message);
            }
            else if (contents.poll_answer) {
                LoggerModel.create(scriptProperties, activeSpreadsheet)
                    .logEvent({
                        dc: 'poll_answer',
                        action: contents.poll_answer.poll_id || '_no_poll_id_',
                        chat_id: contents.poll_answer?.user?.id || '0000',
                        content: JSON.stringify(contents.poll_answer),
                        event: 'received_poll_answer'
                    });

                //return PostPollAnswerHandler.create(userProperties, activeSpreadsheet)
                //.handlePostPollAnswer(contents.poll_answer);
            }
            else if (contents.poll) {
                LoggerModel.create(scriptProperties, activeSpreadsheet)
                    .logEvent({
                        dc: 'poll',
                        action: contents.poll.id || '_no_poll_id_',
                        chat_id: '0000',
                        content: JSON.stringify(contents.poll),
                        event: 'received_poll'
                    });
            }
            else {
                LoggerModel.create(scriptProperties, activeSpreadsheet)
                    .logEvent({
                        dc: 'unknown_update',
                        action: 'webhook_not_handled',
                        chat_id: '0000',
                        content: JSON.stringify(contents),
                        event: 'webhook_not_handled'
                    });
            }

            return JSON.stringify({ status: 'not_handled' });
        } catch (error) {
            LoggerModel.create(scriptProperties, activeSpreadsheet)
                .logError({
                    dc: 'error',
                    action: error.message || 'unknown_error',
                    chat_id: '0000',
                    content: JSON.stringify(contents),
                    event: error.message || 'unknown_error'
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
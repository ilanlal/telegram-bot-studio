class AutomationHandler {
    constructor(activeSpreadsheet, documentProperties, userProperties, scriptProperties) {
        this._automationModel = AutomationModel.create(activeSpreadsheet);
        const token = documentProperties.getProperty(EnvironmentModel.InputMeta.BOT_API_TOKEN);
        if (!token) {
            throw new Error('Bot token is not set in user properties');
        }
        this._telegramBotProxy = TelegramBotProxy.create(token);
        this._defaultLanguageCode = documentProperties.getProperty(EnvironmentModel.InputMeta.LANGUAGE_CODE) || 'default';
        this._documentProperties = documentProperties;
        this._userProperties = userProperties;
        this._scriptProperties = scriptProperties;
        this._activeSpreadsheet = activeSpreadsheet;
    }

    static create(
        activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet(),
        documentProperties = PropertiesService.getDocumentProperties(),
        userProperties = PropertiesService.getUserProperties(),
        scriptProperties = PropertiesService.getScriptProperties()
    ) {
        return new AutomationHandler(activeSpreadsheet, documentProperties, userProperties, scriptProperties);
    }

    handleAutomationRequest({ language_code, chat_id, query, reply_to_message_id = null, callback_query_id = null }) {
        if (!chat_id || !query) {
            throw new Error('Invalid automation request format');
        }

        // Find actions for the query
        const actions = this.findActionsForQuery(query, language_code);
        if (actions.length === 0) {
            return JSON.stringify({ status: 'no_actions_found', chat_id, query });
        }
        let localReplyToMessageId = reply_to_message_id;
        let lastActionResult = null;

        // Execute the reply actions
        actions.forEach((action, index) => {
            lastActionResult = this.executeAction(chat_id, action, localReplyToMessageId, callback_query_id);
            // Update localReplyToMessageId for chaining actions that depend on previous message
            const actionContent = JSON.parse(lastActionResult);
            localReplyToMessageId = actionContent.result?.message_id || localReplyToMessageId;

            // handle create actions separately
            if (action.method?.startsWith('create')) {
                const createActionResul = this.handlePostCreateAction({ language_code, chat_id, action, actionResponse: actionContent });
            }

            // handle get actions separately
            if (action.method?.startsWith('get')) {
                const getActionResul = this.handlePostGetAction({ chat_id, action, reply_to_message_id: localReplyToMessageId, callback_query_id });
            }
        });

        // For testing purposes, return a simple status        
        return JSON.stringify({ status: 'dynamic_reply_handled', chat_id, query, actions_executed: actions?.length || 0, last_action_result: lastActionResult });
    }

    handlePostGetAction({ chat_id, action, reply_to_message_id = null, callback_query_id = null }) {
        if (!chat_id || !action) {
            throw new Error('Invalid "get" action response format');
        }
        return JSON.stringify({ status: 'get_action_handled', chat_id, action });
    }

    handlePostCreateAction({ language_code, chat_id, method, actionResponse }) {
        if (!chat_id || !method || !actionResponse) {
            throw new Error('Invalid "create" action response format');
        }

        if (method.startsWith('createInvoiceLink')) {
            // response _invoice_link_result_ action with the link
            const linkActions = this.findActionsForQuery('_invoice_link_result_', language_code);
            if (linkActions.length > 0) {
                linkActions.forEach((linkActionResult) => {
                    // replace {{invoice_link}} in payload with actual link
                    if (linkActionResult.payload) {
                        for (const key in linkActionResult.payload) {
                            if (typeof linkActionResult.payload[key] === 'string') {
                                linkActionResult.payload[key] = linkActionResult.payload[key].replace('{{invoice_link}}', actionResponse.result || 'about:blank');
                            }
                        }
                    }
                    this.executeAction(chat_id, linkActionResult);
                });
            }

        }
        return JSON.stringify({ status: 'create_action_handled', chat_id, action });
    }

    executeAction(chat_id, action, reply_to_message_id, callback_query_id = null) {
        LoggerModel.create(this._scriptProperties, this._activeSpreadsheet)
            .logEvent({
                dc: 'automation_action',
                action: action.method || '_no_method_',
                chat_id: chat_id || '0000',
                content: JSON.stringify(action),
                event: 'executeAction',
                note: `reply_to_message_id: ${reply_to_message_id || 'none'} | callback_query_id: ${callback_query_id || 'none'}`
            });

        // Handle delay if specified
        if (action.delay_ms && !isNaN(action.delay_ms)) {
            Utilities?.sleep?.(action.delay_ms);
        }

        // Handle next action chaining
        if (action.next || action.task || action.sub_action) {
            // Chain the next action after a delay
            const summeryResponseText = this.handleAutomationRequest({
                language_code: this._defaultLanguageCode,
                chat_id,
                query: action.next || action.task || action.sub_action,
                reply_to_message_id,
                callback_query_id
            });

            return JSON.parse(summeryResponseText)?.last_action_result || "{}";
        }

        let payload = action.payload || null;
        const method = action.method || '';

        // Validate required parameters based on method
        if (!callback_query_id && method.startsWith('answerCallbackQuery')) {
            return JSON.stringify({ status: 'skipped_action_missing_callback_query_id', method, chat_id });
        }

        // If callback_query_id is provided and method is answerCallbackQuery, add it to payload
        if (callback_query_id && method.startsWith('answerCallbackQuery')) {
            payload = payload || {};
            payload.callback_query_id = callback_query_id;
        }


        // If it's an answerCallbackQuery, add callback_query_id to payload
        if (chat_id && !method.startsWith('answerCallbackQuery')) {
            payload = payload || {};
            payload.chat_id = chat_id;
        }

        // Skip action if message_id is required but not provided
        if ((method.startsWith('edit') || method.startsWith('delete')) && !reply_to_message_id) {
            return JSON.stringify({ status: 'skipped_action_missing_message_id', method, chat_id });
        }

        // if action.method is starting with 'edit' or 'delete', add message_id to payload
        if ((method.startsWith('edit') || method.startsWith('delete')) && reply_to_message_id) {
            payload = payload || {};
            payload.message_id = reply_to_message_id;
        }

        // Add reply_to_message_id if provided
        const uriAction = method;
        const response = this._telegramBotProxy.executeApiRequest(uriAction, payload);

        if (response?.getResponseCode() !== 200) {
            throw new Error(`Failed to execute action ${uriAction}: ${response?.getContentText() || 'No response'}`);
        }
        const responseContent = response.getContentText() || null;

        return responseContent;
    }

    findActionsForQuery(query, language_code = 'none') {
        // array of actions like [{method: 'sendMessage', payload: {...}}] to execute (as string)
        // Try to find actions for the given language code
        let apiActionsToDoList = this._automationModel.findData(query, language_code);

        // Fallback to default language if not found
        if (!apiActionsToDoList) {
            apiActionsToDoList = this._automationModel.findData(query, this._defaultLanguageCode);
        }

        // Fallback to '_action_not_found_' key if still not found
        if (!apiActionsToDoList) {
            apiActionsToDoList = this._automationModel.findData('_action_not_found_', language_code);
        }

        // Fallback to default language '_action_not_found_' if still not found
        if (!apiActionsToDoList) {
            apiActionsToDoList = this._automationModel.findData('_action_not_found_', this._defaultLanguageCode);
        }

        if (!apiActionsToDoList) {
            return [];
        }

        const actions = JSON.parse(apiActionsToDoList);
        return actions;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AutomationHandler };
}
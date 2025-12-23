class PostCallbackQueryHandler {
  constructor(activeSpreadsheet, documentProperties, userProperties, scriptProperties) {
    this._documentProperties = documentProperties;
    this._userProperties = userProperties;
    this._scriptProperties = scriptProperties;
    this._activeSpreadsheet = activeSpreadsheet;
  }

  static create(activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet(),
    documentProperties = PropertiesService.getDocumentProperties(),
    userProperties = PropertiesService.getUserProperties(),
    scriptProperties = PropertiesService.getScriptProperties()) {
    return new PostCallbackQueryHandler(activeSpreadsheet, documentProperties, userProperties, scriptProperties);
  }

  handlePostCallbackQuery(contents) {
    if (!contents.callback_query || !contents.callback_query.from) {
      throw new Error('Invalid callback_query format');
    }
    const chat_id = contents.callback_query.from.id;
    const language_code = contents.callback_query.from.language_code;
    const query = contents.callback_query.data;
    const message_id = contents.callback_query.message ? contents.callback_query.message.message_id : null;
    const automationHandler = AutomationHandler.create(this._activeSpreadsheet, this._documentProperties, this._userProperties, this._scriptProperties);

    if (query.startsWith('/echo ')) {
      const echoText = query.substring(6);
      return automationHandler.executeAction(
        chat_id,
        {
          method: 'answerCallbackQuery',
          payload: {
            text: `${echoText}`,
            show_alert: false
          }
        },
        message_id,
        contents.callback_query.id
      );
    }

    return automationHandler
      .handleAutomationRequest({
        language_code,
        chat_id,
        query,
        reply_to_message_id: message_id,
        callback_query_id: contents.callback_query.id
      });
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    PostCallbackQueryHandler
  };
}

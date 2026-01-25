# Enhance Plugins.Webhook Object

Your task is to enhance the Plugins.Webhook object to implement a professional feature that allows bot developers to set, view, or delete webhooks for their connected bots. Ensure that the implementation meets the specified constraints and requirements, including proper error handling, user feedback, and updating the card view after actions are performed. Follow best practices for Google Apps Script development and maintain code readability and maintainability.

Here are the specific constraints and requirements for the implementation:

1. if CardService.newIconImage().setMaterialIcon is used: the setFill is set to false like: CardService.newMaterialIcon().setFill(false)

2. don't use ScriptApp.getService() in the code

3. don't save the url (no need for this flow)

4. CardService.newSwitch(...).setFieldName(...).setTitle is not a function

5. set webhook include original input (ip_address,max_connections,drop_pending_updates,secret_token)

6. on set or delete webhook, after the action is done, update the current card view (Load) with update=true parameter. like: Plugins.Webhook.Load({ commonEventObject: { parameters: { update: 'true' } } });

7. On telegram api execute, check for error JSON.parse(response.getContentText()).ok === false and throw error with the getContentText() message

# Implement Plugins.Connection.HomeCard

Your task is to implement the Plugins.Connection.HomeCard function to create a professional and user-friendly home card for managing bot connections. Ensure that the implementation meets the specified constraints and requirements, including proper error handling, user feedback, and maintaining code readability and maintainability.

Here are the specific constraints and requirements for the implementation:

1. if CardService.newIconImage().setMaterialIcon is used: the setFill is set to false like: CardService.newMaterialIcon().setFill(false)

2. don't use ScriptApp.getService() in the code

3. don't save the url (no need for this flow)

4. CardService.newSwitch(...).setFieldName(...).setTitle is not a function

5. On telegram api execute, check for error JSON.parse(response.getContentText()).ok === false and throw error with the getContentText() message

6. In the Plugins.Connection.HomeCard function, ensure that the card includes the following elements:
   - A header section with the title "Bot Connection Management" and an appropriate icon.
   - A section displaying the current connection status of the bot (connected/disconnected).
   - Buttons for connecting and disconnecting the bot, with appropriate action handlers.
   - A section for displaying recent connection logs or activities.
   - Proper error handling and user feedback mechanisms for connection actions.
  
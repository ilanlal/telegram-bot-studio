# AI Playground (Common prompts for AI tasks)

This document contains common prompts used for AI tasks related to the Telegram Bot Studio project. These prompts are designed to guide the AI in enhancing and implementing features within the Google Sheets add-on for building and managing Telegram bots.
Here is the context of the files involved:
The src/appsscript.json file define the manifest for my google workspace addons.
The src/config/Plugins.js file is the code that implement that addons.

Additional Context:

Project Name: Telegram Bot Studio
Project Description: A Google Sheets add-on for building and managing Telegram bots using a visual interface.

## Expertise

You are an expert Google Apps Script developer. You have extensive experience working with Google Workspace Add-ons, particularly in building and enhancing features for Telegram Bot Studio. You are proficient in using the CardService to create interactive UIs within Google Sheets add-ons.

## Tasks

1. Code Enhancement and Implementation

   - Enhance the Plugins.Webhook object to implement a professional feature that allows bot developers to set, view, or delete webhooks for their connected bots.
   - Implement the Plugins.Connection object to create a professional and user-friendly flow with home (connection) card for managing bot connections.
  
2. Publish the Add-on to Google Workspace Marketplace

    - Ensure that the add-on meets all Google Workspace Marketplace requirements.
    - Prepare necessary documentation and promotional materials for the add-on listing.
    - Coordinate the submission and review process with Google to successfully publish the add-on.

Here are the specific constraints and requirements for code the implementation:

1. if CardService.newIconImage().setMaterialIcon is used: the setFill is set to false like: CardService.newMaterialIcon().setFill(false)

2. don't use ScriptApp.getService() in the code

3. don't save the url (no need for this flow)

4. CardService.newSwitch(...).setFieldName(...).setTitle is not a function

5. set webhook include original input (ip_address,max_connections,drop_pending_updates,secret_token)

6. on set or delete webhook, after the action is done, update the current card view (Load) with update=true parameter. like: Plugins.Webhook.Load({ commonEventObject: { parameters: { update: 'true' } } });

7. On telegram api execute, check for error JSON.parse(response.getContentText()).ok === false and throw error with the getContentText() message.
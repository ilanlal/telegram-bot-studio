# Telegram Bot Studio - Plugins.js Overview

The `Plugins.js` file serves as a comprehensive **UI and logic model** for a Google Workspace Add-on (likely for Sheets) called **Telegram Bot Studio**. It is designed using the Google Apps Script `CardService` to manage Telegram bot connections and plugin functionalities directly within the Google Workspace interface.

## Key Components of the Model

* **Plugin Architecture**: The `Plugins` class manages a collection of sub-plugins like `GetMe`, `GetChat`, and `Webhook`. It also defines a consistent color palette (`primary`, `secondary`, and `accent`) and various image assets for the UI.
* **ViewModel**: This central object handles the creation of primary interface cards:
* **Home Card**: Dynamically builds the main landing page, checking for premium status and bot connection.
* **Login/Connection Card**: Provides a dedicated UI for users to input their Telegram Bot token, including "Quick Tips" on how to get one from `@BotFather`.
* **User Profile & Membership**: Manages subscription states (Free vs. Premium) and license activation.

* **Navigation System**: The `Plugins.Navigations` object controls how users move between different views, supporting actions like `PushCard`, `UpdateCard`, `PopCard`, and `PopToRoot`.
* **Core Plugin Functionality (`GetMe`)**:
* Retrieves bot information using the Telegram Bot API via a `TelegramBotClient`.
* Displays results in structured sections (e.g., username, ID, and connection status).
* Includes built-in error handling and a "Terminal Output" log for debugging.

* **Settings Management**: The `Settings` plugin allows users to configure the Telegram API endpoint and toggle debugging features like terminal output logs.

### Technical Implementation Details

* **Data Persistence**: The add-on uses `PropertiesService.getUserProperties()` to securely store the bot's API token and other user-specific settings.
* **UI Framework**: It relies heavily on `CardService.newCardBuilder()` to construct the interface, utilizing widgets like `DecoratedText`, `TextInput`, and `FixedFooter`.
* **Extensibility**: The model is designed to be easily extendable by adding new objects to the `pluginList` array within the `Plugins` class.

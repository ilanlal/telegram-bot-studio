# Functional Specification Document (FSD) - Telegram Bot Studio Addon.Webhook

## 1. Feature Overview

| Metadata | Details |
| :--- | :--- |
| **Feature Name** | Telegram Bot Studio Setup Plugin |
| **Module** | [`src/Addon.js`](../../src/Addon.js) - `Addon.BotSetup` |
| **Priority** | High |
| **Status** | Draft |

### 1.1 Summary

The `Addon.BotSetup` object implements setup and configuration management for Telegram Bot Studio, a Google Workspace add-on. It allows users to configure bot information such as name, description, short description, commands, and profile picture.

---

## 2. User Stories & Rationale

**As a** Bot Developer  
**I want to** configure multiple language bot information like name, description, short description, profile picture and commands
**So that** I can provide a better user experience.

**As a** Google Workspace User  
**I want to** manage bot name, description, short description, profile picture and commands for different languages
**So that** I can customize the bot's appearance and information for users.

### 2.1 Acceptance Criteria

- [x] Support multiple languages for bot information.
- [x] Set/update bot information with options (name, description, short description, profile picture, commands) for each language.
- [x] Delete bot information with confirmation.
- [x] Display current bot information for each language.
- [x] Handle API errors and validations.

---

## 3. UI/UX Design (CardService)

The UI is built using Google Apps Script's CardService, rendering a configuration card. The plugin uses a single HomeCard with sections for status, config, and actions. Navigation pushes the card and updates on actions. Icons use Material Icons with `setFill(false)`. Colors are defined via `primaryColor()`, `secondaryColor()`, `accentColor()`.

### 3.1 Card Flow

1. **Entry Point:** User selects language from a dropdown list of supported languages.
2. **Fetch Current Info:** User fetch the current bot information for the selected language, then update card input fields (name, description, short description, profile picture, commands).
3. **Suggest Translation:** User select target language from the dropdown and click "Suggest Translation" to fetch suggested translations for the bot information.
4. **Except Translation:** User clicks "Except Translation" to send the new bot information for the selected language via API, or "Delete" to remove it with confirmation.

### 3.2 Widget Specifications

**Home Card (`Addon.BotSetup.View.HomeCard`):**

- **Header:** Title: "Bot Setup", Subtitle: "Manage bot information and settings", Image: Logo.
- **Section 1:** Language selection dropdown and "Fetch Current Info" button.
- **Section 2:** Input fields for bot name, description, short description, profile picture URL.
- **Section 3:** "Suggest Translation" button to fetch suggested translations for the bot information based on the selected language.
- **Section 4:** Input fields populated accordingly to the suggested translations.
- **Fixed Footer:** "Except Translation" button or "Delete" button with confirmation dialog.

---

## 4. Technical Implementation

### 4.1 Architecture (MVC Pattern)

- **Controller:** `Addon.BotSetup.Controller` with methods like `PushHomeCard(e)` for rendering/API calls, `FetchCurrentInfo(e)` for fetching current bot information, `SuggestTranslation(e)` for fetching suggested translations, `ExceptTranslation(e)` for sending new bot information, and `DeleteBotInfo(e)` for deleting bot information.
- **View:** `Addon.BotSetup.View` with `HomeCard(data)` for building the home card.
- **Service/Model:** Integrates with `Common.Modules.TelegramBotClient` for Telegram bot API calls and `PropertiesService` for token management.

### 4.2 Data Interactions

- **API Calls:** Uses `TelegramBotClient` to interact with Telegram Bot API for fetching and updating bot information.
- **PropertiesService:** Retrieves bot tokens securely for API authentication.

**Sheet Export:**

- Via `Addon.ResultWidget`.

---

## 5. Configuration & Security

### 5.1 AppScript Manifest (`appsscript.json`)

- **Scopes:** `https://www.googleapis.com/auth/script.external_request` for API calls.

### 5.2 Security Considerations

- Tokens retrieved securely from PropertiesService.

---

## 6. Edge Cases & Error Handling

- **No Token:** Throws error; prompts connection.
- **Invalid URL:** Shows notification; requires HTTPS.
- **API Errors:** Logs to TerminalOutput; shows notification.
- **Empty Fields:** Validates input; shows notification if required fields are empty.
- **Delete Confirmation:** Prompts user to confirm deletion of bot information.

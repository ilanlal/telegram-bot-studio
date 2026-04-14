# Functional Specification Document (FSD) - Telegram Bot Studio Addon.BotSetup

## 1. Feature Overview

| Metadata | Details |
| :--- | :--- |
| **Feature Name** | Telegram Bot Studio Bot Setup Plugin |
| **Module** | [`src/Addon.js`](../../src/Addon.js) - `Addon.BotSetup` |
| **Priority** | High |
| **Status** | Completed |

### 1.1 Summary

The `Addon.BotSetup` object implements a plugin for managing Telegram bot information, including name, description, profile picture, commands, and translations for different languages. It allows users to fetch current bot info, suggest translations using AI, and update or delete bot settings via Telegram API calls. The plugin integrates with Gemini for translation suggestions and uses CardService for UI.

---

## 2. User Stories & Rationale

**As a** Bot Developer  
**I want to** manage bot information and translations  
**So that** I can customize my bot for different languages and update its profile.

**As a** Google Workspace User  
**I want to** fetch current bot info and get AI-suggested translations  
**So that** I can easily localize my bot without manual effort.

### 2.1 Acceptance Criteria

- [x] Fetch bot info (name, description, short description, commands) for selected language.
- [x] Suggest translations using Gemini API for target languages.
- [x] Update bot info via Telegram API (setMyName, setMyDescription, etc.).
- [x] Delete bot info with confirmation.
- [x] UI with language dropdowns, input fields, and action buttons.
- [x] Error handling and notifications.

---

## 3. UI/UX Design (CardService)

The UI is built using Google Apps Script's CardService, rendering cards for bot setup and suggested translations. The HomeCard includes language selection, input fields, and buttons. SuggestedTranslationCard shows AI-generated translations. Navigation pushes cards and updates on actions. Icons use Material Icons with `setFill(false)`. Colors are defined via `primaryColor()`, `secondaryColor()`, `accentColor()`.

### 3.1 Card Flow

1. **Home Card:** User selects language, fetches info, inputs data, suggests translations.
2. **Suggested Translation Card:** Review and accept AI suggestions.
3. **Actions:** Update or delete with confirmations.

### 3.2 Widget Specifications

**Home Card (`Addon.BotSetup.View.HomeCard`):**

- **Header:** Title: "Bot Setup", Subtitle: "Manage bot information and settings", Image: HAVE_A_NICE_DAY_IMG_URL.
- **Section 1:** Language dropdown, Fetch button.
- **Section 2:** Input fields (name, description, short description, profile picture, commands).
- **Section 3:** Target language dropdown, Suggest button.
- **Footer:** Accept Translation, Delete buttons.

**Suggested Translation Card (`Addon.BotSetup.View.SuggestedTranslationCard`):**

- **Header:** Title: "Suggested Translation", Subtitle: "Review and accept suggested translations", Image: HAVE_A_NICE_DAY_IMG_URL.
- **Section 1:** Target language dropdown.
- **Section 2:** Suggested input fields (if available).
- **Footer:** Accept Translation, Delete Translation buttons.

---

## 4. Technical Implementation

### 4.1 Architecture (MVC Pattern)

- **Controller:** `Addon.BotSetup.Controller` with methods like `PushHomeCard(e)`, `FetchCurrentInfo(e)`, `SuggestTranslation(e)`, `ExceptTranslation(e)`, `DeleteBotInfo(e)`, `ConfirmDeleteBotInfo(e)` for handling actions, API calls, and navigation.
- **View:** `Addon.BotSetup.View` with `HomeCard(data)` and `SuggestedTranslationCard(data)` for building cards.
- **Service/Model:** Integrates with `Common.Modules.TelegramBotClient` for API, `Common.Modules.GeminiApiClient` for translations, `PropertiesService` for tokens.

### 4.2 Data Interactions

**Telegram API (`UrlFetchApp`):**

- Methods: `getMyName`, `setMyName`, `getMyDescription`, `setMyDescription`, `getMyShortDescription`, `setMyShortDescription`, `getMyCommands`, `setMyCommands`, `setMyProfilePhoto`.
- Payload: JSON for POST requests.

**Gemini API (`UrlFetchApp`):**

- For translation suggestions.

**Properties Service:**

- DocumentProperties: Bot token.

---

## 5. Configuration & Security

### 5.1 AppScript Manifest (`appsscript.json`)

- **Scopes:** `https://www.googleapis.com/auth/script.external_request` for API calls.

### 5.2 Security Considerations

- Tokens retrieved securely from PropertiesService.
- HTTPS for profile picture URLs.
- Confirmation for destructive actions (delete).

---

## 6. Edge Cases & Error Handling

- **No Token:** Throw error; prompt connection.
- **API Errors:** Parse responses; show notifications.
- **Invalid Language:** Use default or validate.
- **Translation Failures:** Fallback to manual input.
- **Network Errors:** Log and notify.
- **Confirmation Required:** For delete actions.

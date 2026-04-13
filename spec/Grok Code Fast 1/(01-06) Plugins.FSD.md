# Functional Specification Document (FSD) - Telegram Bot Studio Plugins

## 1. Feature Overview

| Metadata | Details |
| :--- | :--- |
| **Feature Name** | Telegram Bot Studio Plugins |
| **Module** | [`src/Addon.js`](../../src/Addon.js) |
| **Priority** | High |
| **Status** | Completed |

### 1.1 Summary

`Addon.js` implements a modular plugin system for Telegram Bot Studio, a Google Workspace add-on for managing Telegram bots. It provides plugins for bot connection, webhook management, API interactions (GetMe, GetChat), Gemini AI integration, settings, user profiles, and utility tools like JSON result export. The architecture uses MVC patterns with Controllers for logic, Views for CardService UI, and integrated services for Telegram API calls, sheet operations, and property storage. Plugins are organized under the `Addon` object, supporting extensibility and consistent structure.

---

## 2. User Stories & Rationale

**As a** Bot Developer  
**I want to** use a modular plugin system in Google Sheets  
**So that** I can easily connect, configure, manage bots, and perform API operations through a visual interface.

**As a** Google Workspace User  
**I want to** access plugins for bot setup, webhook config, chat inspection, AI assistance, and settings  
**So that** I can build and monitor bots without deep coding knowledge.

### 2.1 Acceptance Criteria

- [x] Plugins are organized in the `Addon` object with consistent structure (id, name, Controller, View).
- [x] Core plugins: Home, Settings, UserProfile, TelegramBotConnection, Webhook, GeminiAgent, GetMe, GetChat, ConfirmationCard, ResultWidget.
- [x] UI uses CardService for sidebar cards, with navigation via pushCard, updateCard, popCard.
- [x] API interactions via `TelegramBotClient` and `GeminiApiClient` for bot and AI operations.
- [x] Data persistence in `PropertiesService` (document/user/script properties).
- [x] Error handling with notifications, logging to sheets, and confirmation dialogs.
- [x] Premium features gated by membership status.

---

## 3. UI/UX Design (CardService)

The UI is built using Google Apps Script's CardService, rendering in the sidebar. Each plugin has a HomeCard for primary interaction, with sections for input, status, and actions. Navigation uses pushCard, updateCard, popCard. Icons use Material Icons with `setFill(false)`. Colors are defined via `primaryColor()`, `secondaryColor()`, `accentColor()`.

### 3.1 Card Flow

1. **Entry Point:** Home plugin loads the main dashboard, showing plugin list and connection status.
2. **Plugin Access:** User selects a plugin from the grid or sections.
3. **Interaction Cards:** Each plugin has a HomeCard for input/results, with footers for actions.
4. **Confirmation:** Destructive actions use `ConfirmationCard`.
5. **Results:** API responses displayed in `BuildResultSection` with grids and raw JSON.

### 3.2 Widget Specifications

**Home Card (`Addon.Home.View.HomeCard`):**

- **Header:** Title: "Telegram Bot Studio", Subtitle: LEDs status, Image: Logo.
- **Sections:** WelcomeSection (connection status), tool grid, quick access, premium CTA.
- **Footer:** None or premium upgrade.

**Connection Card (`Addon.TelegramBotConnection.View.HomeCard`):**

- **Header:** Title: "Bot Connection Management".
- **Sections:** Token input, storage options.
- **Footer:** Connect button.

**Webhook Card (`Addon.Webhook.View.HomeCard`):**

- **Header:** Title: "Webhook Configurator".
- **Sections:** Status, configuration inputs, raw data.
- **Footer:** Set/Update or Delete button.

**Gemini Agent Card (`Addon.GeminiAgent.View.SetupCard`):**

- **Header:** Title: "Gemini Agent Setup".
- **Sections:** API key input, model selector, instruction binding.
- **Footer:** Save button.

**GetMe/GetChat Cards:** Similar, with result sections.

**Settings Card (`Addon.Settings.View.HomeCard`):**

- **Header:** Title: "Settings".
- **Sections:** Network & security, developer tools.
- **Footer:** Save button.

**UserProfile Card (`Addon.UserProfile.View.HomeCard`):**

- **Header:** Title: "Account Overview".
- **Sections:** Membership, features.
- **Footer:** None.

**Confirmation Card (`Addon.ConfirmationCard.View.HomeCard`):**

- **Header:** Title: Custom, Image: Attention.
- **Sections:** Message.
- **Footer:** Confirm/Cancel buttons.

**Result Widget:** Embedded in other cards for export actions.

---

## 4. Technical Implementation

### 4.1 Architecture (MVC Pattern)

- **Controller:** Each plugin has a `Controller` object with methods like `Load(e)`, `Connect(e)`, handling form inputs, API calls, and navigation.
- **View:** `View` objects build CardService cards, using helpers like `BuildResultSection`, `BuildExportWidget`.
- **Service/Model:** Integrated via `TelegramBotClient`, `GeminiApiClient`, `Common.Modules` for sheets/logging, `PropertiesService` for storage.

### 4.2 Data Interactions

**Google Sheets (`SpreadsheetApp`):**

- **Read:** Properties for settings (e.g., tokens, keys).
- **Write:** Logs to "Terminal Output" or "Event Log" sheets via `TerminalOutput.write`, dumps via `Sheet.dumpObjectToSheet`.

**Telegram API (`UrlFetchApp`):**

- **Endpoints:** `getMe`, `getChat`, `getWebhookInfo`, `setWebhook`, `deleteWebhook`.
- **Payload:** JSON for POST requests.

**Gemini API (`UrlFetchApp`):**

- **Endpoint:** `https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent`.
- **Payload:** JSON with contents.

**Properties Service:**

- **DocumentProperties:** Bot tokens, API keys, settings.
- **UserProperties:** Membership info.
- **ScriptProperties:** Global flags.

---

## 5. Configuration & Security

### 5.1 AppScript Manifest (`appsscript.json`)

- **Scopes:** `https://www.googleapis.com/auth/script.external_request`, `https://www.googleapis.com/auth/spreadsheets.currentonly`.
- **UrlFetchWhitelist:** `https://api.telegram.org/`, `https://generativelanguage.googleapis.com/`.
- **Universal Actions:** Home plugin as entry point.

### 5.2 Security Considerations

- Tokens and keys stored in PropertiesService (user-specific).
- Input validation for URLs (HTTPS required), chat IDs.
- No sensitive data in logs; tokens masked in display.
- Confirmation dialogs for destructive actions.

---

## 6. Edge Cases & Error Handling

- **No Token/Key:** Plugins check properties; throw errors if missing.
- **API Errors:** Parse `ok: false`; show notifications with messages.
- **Network Failures:** `UrlFetchApp` exceptions logged and notified.
- **Invalid Inputs:** Form validation (e.g., URL format, numeric fields).
- **Sheet Access:** Errors logged; fallbacks to defaults.
- **Premium Checks:** Features gated by `isPremium` from membership.
- **Confirmation Required:** For disconnect, delete, revoke actions.

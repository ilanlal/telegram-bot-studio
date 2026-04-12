# Functional Specification Document (FSD) - Telegram Bot Studio Addon.Webhook

## 1. Feature Overview

| Metadata | Details |
| :--- | :--- |
| **Feature Name** | Telegram Bot Studio Setup Plugin |
| **Module** | [`src/Addon.js`](../../src/Addon.js) - `Addon.BotSetup` |
| **Priority** | High |
| **Status** | Completed |

### 1.1 Summary

The `Addon.BotSetup` object implements setup and configuration management for Telegram Bot Studio, a Google Workspace add-on. It allows users to configure bot information such as name, description, short description, and profile picture.

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
- [x] Set/update bot information with options (name, description, short description, profile picture) for each language.
- [x] Delete bot information with confirmation.
- [x] Display current bot information for each language.
- [x] Handle API errors and validations.

---

## 3. UI/UX Design (CardService)

The UI is built using Google Apps Script's CardService, rendering a configuration card. The plugin uses a single HomeCard with sections for status, config, and actions. Navigation pushes the card and updates on actions. Icons use Material Icons with `setFill(false)`. Colors are defined via `primaryColor()`, `secondaryColor()`, `accentColor()`.

### 3.1 Card Flow

1. **Entry Point:** User selects language from a list of supported languages.
2. **Configuration:** User inputs settings and sets/updates webhook.
3. **Status Updates:** Refresh shows current webhook info.
4. **Deletion:** Confirm and delete webhook.

### 3.2 Widget Specifications

**Home Card (`Addon.Webhook.View.HomeCard`):**

- **Header:** Title: "Webhook Configurator", Subtitle: "Manage bot webhooks and settings", Image: Logo.
- **Section 1:** Status (active/inactive, URL, pending updates, errors).
- **Section 2:** Configuration inputs (URL, IP, max connections, secret token, drop pending).
- **Section 3:** Raw JSON and export widget.
- **Footer:** Set/Update or Delete button.

---

## 4. Technical Implementation

### 4.1 Architecture (MVC Pattern)

- **Controller:** `Addon.Webhook.Controller` with methods like `Load(e)` for rendering/API calls, `SetWebhook(e)` for setting, `DeleteWebhook(e)` for removal.
- **View:** `Addon.Webhook.View` with `HomeCard(data, result)` for building the card.
- **Service/Model:** Integrates with `TelegramBotClient` for API, `PropertiesService` for tokens.

### 4.2 Data Interactions

**Telegram API (`UrlFetchApp`):**

- **Endpoints:** `https://api.telegram.org/bot<token>/getWebhookInfo`, `/setWebhook`, `/deleteWebhook`.
- **Payload:** JSON for setWebhook options.

**Sheet Export:**

- Via `Addon.ExportApiResultWidget`.

---

## 5. Configuration & Security

### 5.1 AppScript Manifest (`appsscript.json`)

- **Scopes:** `https://www.googleapis.com/auth/script.external_request` for API calls.

### 5.2 Security Considerations

- Tokens retrieved securely from PropertiesService.
- HTTPS URLs required for webhooks.
- Secret tokens for header validation.

---

## 6. Edge Cases & Error Handling

- **No Token:** Throws error; prompts connection.
- **Invalid URL:** Shows notification; requires HTTPS.
- **API Errors:** Logs to TerminalOutput; shows notification.
- **Pending Updates:** Option to drop on set/delete.
- **Network Failures:** Logged and notified.

# Functional Specification Document (FSD) - Telegram Bot Studio Plugins.Webhook

## 1. Feature Overview

| Metadata | Details |
| :--- | :--- |
| **Feature Name** | Telegram Bot Studio Webhook Plugin |
| **Module** | [`src/Plugins.js`](../../src/Plugins.js) - `Plugins.Webhook` |
| **Priority** | High |
| **Status** | Completed |

### 1.1 Summary

The `Plugins.Webhook` object implements webhook configuration and management for Telegram Bot Studio, a Google Workspace add-on. It allows users to set, update, and delete webhooks, view status, and handle pending updates via Telegram API calls.

---

## 2. User Stories & Rationale

**As a** Bot Developer  
**I want to** configure webhooks for real-time updates  
**So that** I can receive messages instantly without polling.

**As a** Google Workspace User  
**I want to** manage webhook settings and status  
**So that** I can troubleshoot and optimize bot performance.

### 2.1 Acceptance Criteria

- [x] Fetch webhook info via `getWebhookInfo`.
- [x] Set/update webhooks with options (URL, IP, max connections, secret token).
- [x] Delete webhooks with confirmation.
- [x] Display status, pending updates, and errors.
- [x] Handle API errors and validations.

---

## 3. UI/UX Design (CardService)

The UI is built using Google Apps Script's CardService, rendering a configuration card. The plugin uses a single HomeCard with sections for status, config, and actions. Navigation pushes the card and updates on actions. Icons use Material Icons with `setFill(false)`. Colors are defined via `primaryColor()`, `secondaryColor()`, `accentColor()`.

### 3.1 Card Flow

1. **Entry Point:** User selects Webhook; pushes card with status.
2. **Configuration:** User inputs settings and sets/updates webhook.
3. **Status Updates:** Refresh shows current webhook info.
4. **Deletion:** Confirm and delete webhook.

### 3.2 Widget Specifications

**Home Card (`Plugins.Webhook.View.HomeCard`):**

- **Header:** Title: "Webhook Configurator", Subtitle: "Manage bot webhooks and settings", Image: Logo.
- **Section 1:** Status (active/inactive, URL, pending updates, errors).
- **Section 2:** Configuration inputs (URL, IP, max connections, secret token, drop pending).
- **Section 3:** Raw JSON and export widget.
- **Footer:** Set/Update or Delete button.

---

## 4. Technical Implementation

### 4.1 Architecture (MVC Pattern)

- **Controller:** `Plugins.Webhook.Controller` with methods like `Load(e)` for rendering/API calls, `SetWebhook(e)` for setting, `DeleteWebhook(e)` for removal.
- **View:** `Plugins.Webhook.View` with `HomeCard(data, result)` for building the card.
- **Service/Model:** Integrates with `TelegramBotClient` for API, `PropertiesService` for tokens.

### 4.2 Data Interactions

**Telegram API (`UrlFetchApp`):**

- **Endpoints:** `https://api.telegram.org/bot<token>/getWebhookInfo`, `/setWebhook`, `/deleteWebhook`.
- **Payload:** JSON for setWebhook options.

**Sheet Export:**

- Via `Plugins.ExportApiResultWidget`.

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

# 15. Plugin-Specific FSD: Plugins.Webhook

## 15.1 Feature Overview

| Metadata | Details |
| :--- | :--- |
| **Feature Name** | Plugins.Webhook |
| **Module** | [`src/Plugins.js`](../../src/Plugins.js) |
| **Priority** | High |
| **Status** | Completed |

### 15.1.1 Summary

The `Plugins.Webhook` object implements the Webhook Configurator plugin for Telegram Bot Studio. It allows users to view current webhook status, set up new webhooks with advanced options (e.g., max connections, secret token), delete webhooks, and drop pending updates. It integrates with the Telegram `getWebhookInfo`, `setWebhook`, and `deleteWebhook` APIs.

---

## 15.2 User Stories & Rationale

**As a** Bot Developer  
**I want to** configure webhooks for real-time message handling  
**So that** my bot can receive updates instantly instead of polling.

**As a** Google Workspace User  
**I want to** manage webhook settings and troubleshoot issues  
**So that** I can ensure reliable bot operation.

### 15.2.1 Acceptance Criteria

- [x] HomeCard loads on plugin access, calls `getWebhookInfo` API.
- [x] Displays webhook URL, status, pending updates, and errors.
- [x] SetWebhook action configures webhook with URL, max connections, etc.
- [x] DeleteWebhook action removes webhook after confirmation.
- [x] DropPendingUpdates skips old messages.
- [x] Includes export widget and raw JSON section.
- [x] Refresh button to reload data.
- [x] Errors logged and shown as notifications.
- [x] Requires valid token; shows connection status.

---

## 15.3 UI/UX Design (CardService)

The UI uses CardService for a card with status, configuration inputs, and actions. Icons use Material Icons. Colors from `Plugins.primaryColor()`.

### 15.3.1 Card Flow

1. **Load:** Calls API, builds card with status.
2. **Set/Update:** User enters URL/options, clicks Set; updates webhook.
3. **Delete:** Shows confirmation, then deletes.
4. **Display:** Shows live status, pending updates, errors.
5. **Refresh:** Reloads data on button click.

### 15.3.2 Widget Specifications

**HomeCard (`Plugins.Webhook.View.HomeCard`):**

- **Header:** Title: "Webhook Configurator", Subtitle: short_description, Image: DEFAULT_IMAGE_URL.
- **Section 1:** `WelcomeSection` (connection status).
- **Section 2:** Status dashboard (URL, pending, errors).
- **Section 3:** Configuration inputs (URL, max connections, secret token, etc.).
- **Section 4:** `BuildResultSection` (raw JSON, export widget).
- **Footer:** Primary button "Set Webhook" or "Update".

---

## 15.4 Technical Implementation

### 15.4.1 Architecture (MVC Pattern)

- **Controller:** `Load(e)` calls `getWebhookInfo`, builds card; `SetWebhook(e)` configures via API; `DeleteWebhook(e)` removes after confirmation.
- **View:** `HomeCard(data, result)` constructs card.
- **Service/Model:** Uses `TelegramBotClient` for API; logs to TerminalOutput.

### 15.4.2 Data Interactions

- **Telegram API:** `getWebhookInfo`, `setWebhook`, `deleteWebhook`.
- **PropertiesService:** Reads token for API calls.
- **SpreadsheetApp:** Logs events; exports via widget.

---

## 15.5 Configuration & Security

- **Manifest:** Accessible via Home grid.
- **Security:** URLs must be HTTPS; secret tokens handled securely.

---

## 15.6 Edge Cases & Error Handling

- **No Token:** Shows error notification.
- **Invalid URL:** API returns error; shows notification.
- **No Webhook:** Card shows setup options.
- **Network Error:** Logged and notified.
- **Confirmation:** Delete requires user confirmation.

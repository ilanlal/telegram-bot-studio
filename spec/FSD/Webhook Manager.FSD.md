# Functional Specification Document (FSD) - Webhook Manager

## 1. Feature Overview

| Metadata | Details |
| :--- | :--- |
| **Feature Name** | Webhook Manager |
| **Module** | `Plugins.Webhook` |
| **Telegram API** | `setWebhook`, `deleteWebhook`, `getWebhookInfo` |
| **Priority** | High |
| **Status** | In Progress |

### 1.1 Summary

The Webhook Manager allows users to link their deployed Google Apps Script Web App to the Telegram Bot API. This connection is critical for the bot to receive real-time updates (messages, queries) directly into the `doPost()` trigger of the spreadsheet's script. Without this, the bot remains silent.

---

## 2. User Stories & Rationale

**As a** Bot Creator  
**I want to** configure my bot's webhook URL to point to my current Google Script deployment  
**So that** my bot responds to user messages automatically.

**As a** Developer  
**I want to** view the current webhook status and error logs  
**So that** I can debug why my bot isn't responding (e.g., verifying if the URL is correct or if there are pending updates).

### 2.1 Acceptance Criteria

- [ ] **Status Visibility:** The card displays the current webhook URL, whether a custom certificate is used, and the number of pending updates.
- [ ] **Set Action:** User can input a URL (or use the detected current script URL) and register it with Telegram via the `setWebhook` method.
- [ ] **Delete Action:** User can remove the webhook, effectively "pausing" the bot.
- [ ] **Error Handling:** If `getWebhookInfo` returns a `last_error_message`, it is displayed prominently in red.

---

## 3. UI/UX Design (CardService)

### 3.1 Card Flow

1. **Entry Point:** Home Dashboard -> "Webhook Settings".
2. **Display Card (Main):**
    - **Status Section:** Key indicators (Is Set? / Pending Updates).
    - **Actions Section:** Form to input URL + "Set Webhook", and a "Delete Webhook" button.
3. **Result Feedback:** Toast notifications for specific API responses ("Webhook was set", "Webhook deleted").

### 3.2 Widget Specifications

**Card: `Plugins.Webhook.View.ManagerCard`**

- **Header:** Title: "Webhook Configuration"
- **Section 1 (Current Status `getWebhookInfo` response):**
  - `DecoratedText`: "Status" -> "Active ✅" / "Inactive ❌"
  - `DecoratedText`: "Pending Updates" -> Integer count.
  - `TextParagraph` (Conditional): "Last Error: [error_message]" (Red text).
- **Section 2 (Configuration):**
  - `TextInput`:
    - Label: "Web App URL"
    - Value: `ScriptApp.getService().getUrl()` (Auto-detected if possible).
  - `SelectionInput` (Multi-select, Optional): Allowed Updates (message, callback_query).
- **Footer:**
  - `TextButton`: "Set Webhook" (Primary Color).
  - `TextButton`: "Delete Webhook" (Warning Color).
  - `TextButton`: "Refresh Info".

---

## 4. Technical Implementation

### 4.1 Architecture (MVC Pattern)

- **Controller:** `Plugins.Webhook.Controller`
  - `Load(e)`: Calls Service to get info, then renders View.
  - `Set(e)`: Validates URL input -> Calls Service `setWebhook` -> Re-renders card.
  - `Delete(e)`: Calls Service `deleteWebhook` -> Re-renders card.
  - `Refresh(e)`: Re-runs `Load`.

- **View:** `Plugins.Webhook.View`
  - `CreateManagerCard(webhookInfo)`: Logic to parse JSON from Telegram and display friendly status icons.

- **Service:** `TelegramBotClient` (or `Plugins.Webhook.Service`)
  - `getWebhookInfo()`: GET request.
  - `setWebhook(url, allowed_updates)`: POST request.
  - `deleteWebhook()`: POST request.

### 4.2 Data Interactions

- **ScriptApp:** Uses `ScriptApp.getService().getUrl()` to attempt to auto-fill the URL field for the user effectively reducing copy-paste errors.
- **Telegram API:**
  - `https://api.telegram.org/bot<token>/getWebhookInfo`
  - `https://api.telegram.org/bot<token>/setWebhook`

---

## 5. Configuration & Security

### 5.1 AppScript Manifest

- Requires `script.external_request` (Standard).
- No new scopes.

### 5.2 Settings / Properties

- **Dependency:** Requires a valid Bot Token in `UserProperties` (handled by Connection module).

---

## 6. Edge Cases & Error Handling

- **Web App Not Published:** `ScriptApp.getService().getUrl()` might fail or return a development URL (`/dev`) instead of exec (`/exec`). The UI should warn the user if the URL ends in `/dev` as Telegram does not support dev mode webhooks reliably involves authentication redirects.
- **HTTPS Requirement:** Telegram requires HTTPS. Google Apps Script URLs are always HTTPS, but if user types manually, validation is needed.
- **Rate Limiting:** Frequent webhook changes might trigger Telegram 429 errors.

# Functional Specification Document (FSD) - Telegram Bot Studio Plugins.Connection

## 1. Feature Overview

| Metadata | Details |
| :--- | :--- |
| **Feature Name** | Telegram Bot Studio Connection Plugin |
| **Module** | [`src/Plugins.js`](../../src/Plugins.js) - `Plugins.Connection` |
| **Priority** | High |
| **Status** | Completed |

### 1.1 Summary

The `Plugins.Connection` object implements the authentication and connection management for Telegram Bot Studio, a Google Workspace add-on. It handles bot token input, validation via the `getMe` API, connection status display, and secure disconnection. It integrates with PropertiesService for token persistence and uses CardService for UI rendering.

---

## 2. User Stories & Rationale

**As a** Bot Developer  
**I want to** securely connect my bot using a token  
**So that** I can authenticate and manage my Telegram bot in Google Sheets.

**As a** Google Workspace User  
**I want to** view connection status and disconnect if needed  
**So that** I can control bot access and troubleshoot issues.

### 2.1 Acceptance Criteria

- [x] Token input and validation via `getMe` API.
- [x] Secure storage in PropertiesService.
- [x] Status display (connected/disconnected) with bot details.
- [x] Confirmation dialogs for disconnection.
- [x] Error handling with notifications and logging.

---

## 3. UI/UX Design (CardService)

The UI is built using Google Apps Script's CardService, rendering in the sidebar. The Connection plugin provides a HomeCard for setup and a WelcomeSection for status. Navigation uses pushCard for connection flow. Icons use Material Icons with `setFill(false)`. Colors are defined via `primaryColor()`, `secondaryColor()`, `accentColor()`.

### 3.1 Card Flow

1. **Entry Point:** Home plugin displays WelcomeSection with connection status.
2. **Connection Setup:** User clicks "Link Bot" to push HomeCard for token input.
3. **Validation:** On connect, validate token and update status.
4. **Disconnection:** Confirm via dialog, then update status.
5. **Status Updates:** Refresh HomeCard on connect/disconnect.

### 3.2 Widget Specifications

**Home Card (`Plugins.Connection.View.HomeCard`):**

- **Header:** Title: "Bot Connection Management", Subtitle: Status-based, Image: Welcome.
- **Section 1:** Token input (`TextInput`), Help link to BotFather.
- **Section 2:** Token storage options (checkbox to export to sheet).
- **Footer:** Primary button for "Connect".

**WelcomeSection (`Plugins.Connection.View.WelcomeSection`):**

- **Widget:** DecoratedText with status (LIVE/OFFLINE), bot name/ID, and action button (Link/Unlink).
- **Conditional:** Token input hidden post-connection.

---

## 4. Technical Implementation

### 4.1 Architecture (MVC Pattern)

- **Controller:** `Plugins.Connection.Controller` with methods like `Load(e)` for rendering, `Connect(e)` for validation/API calls, `Disconnect(e)` for removal.
- **View:** `Plugins.Connection.View` with `HomeCard(data)`, `WelcomeSection(data)`, `BuildTokenTextInputWidget(token, hidden)`.
- **Service/Model:** Integrates with `TelegramBotClient` for `getMe`, `PropertiesService` for storage, `Plugins.Modules.TerminalOutput` for logging.

### 4.2 Data Interactions

**Properties Service:**

- **UserProperties:** Stores `txt_bot_api_token`, `txt_bot_friendly_name`, `txt_bot_username`.

**Telegram API (`UrlFetchApp`):**

- **Endpoints:** `https://api.telegram.org/bot<token>/getMe`.
- **Validation:** Checks `ok: true`; parses result for bot details.

**Sheet Export (Optional):**

- Dumps token to "🔐 Bot Tokens" sheet via `Sheet.dumpObjectToSheet`.

---

## 5. Configuration & Security

### 5.1 AppScript Manifest (`appsscript.json`)

- **Scopes:** `https://www.googleapis.com/auth/script.external_request` for API calls.

### 5.2 Security Considerations

- Tokens stored in UserProperties (user-specific).
- Input validation for token format.
- No token exposure in UI; masked in logs.

---

## 6. Edge Cases & Error Handling

- **Invalid Token:** API error; show notification, log to TerminalOutput.
- **No Token:** Disable plugin access; prompt connection.
- **Network Failures:** `UrlFetchApp` exceptions logged and notified.
- **Disconnection:** Confirmation required; clear properties on success.
- **Sheet Export:** Errors if sheet access fails; logged.

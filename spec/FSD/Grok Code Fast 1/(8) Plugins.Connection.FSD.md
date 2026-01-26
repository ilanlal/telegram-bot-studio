# 8. Plugin-Specific FSD: Plugins.Connection

## 8.1 Feature Overview

| Metadata | Details |
| :--- | :--- |
| **Feature Name** | Plugins.Connection |
| **Module** | [`src/Plugins.js`](../../../src/Plugins.js) |
| **Priority** | High |
| **Status** | Completed |

### 8.1.1 Summary

The `Plugins.Connection` object implements the Connection plugin for Telegram Bot Studio. It allows users to link and unlink their Telegram bot by managing the bot API token, test the connection via the `getMe` API, and display the connection status in the UI. It integrates with the Home plugin for status updates and uses CardService for sidebar UI.

---

## 8.2 User Stories & Rationale

**As a** Bot Developer  
**I want to** securely link my Telegram bot to the add-on using an API token  
**So that** I can authenticate and enable bot management features.

**As a** Google Workspace User  
**I want to** see my bot's connection status and easily connect or disconnect  
**So that** I can manage my bot's integration without technical hurdles.

**As a** New User  
**I want to** get guidance on obtaining a bot token from @BotFather  
**So that** I can set up my bot quickly.

### 8.2.1 Acceptance Criteria

- [x] HomeCard loads on plugin access, showing token input and connect button.
- [x] Connect action validates token with `getMe` API and stores it in PropertiesService.
- [x] Disconnect action removes the token after confirmation.
- [x] WelcomeSection displays connection status (LIVE/OFFLINE) with username.
- [x] Navigation updates Home card on connect/disconnect.
- [x] Errors are logged to TerminalOutput and shown as notifications.
- [x] Token input is hidden when connected; visible when not.

---

## 8.3 UI/UX Design (CardService)

The UI uses CardService for sidebar cards. HomeCard is the main interface; WelcomeSection is embedded in Home. Icons use Material Icons. Colors from `Plugins.primaryColor()`.

### 8.3.1 Card Flow

1. **HomeCard:** Loads on `Load(e)`, shows token input and connect action.
2. **Connect Flow:** User enters token, clicks Connect; on success, updates Home card.
3. **Disconnect Flow:** User clicks Unlink; shows ConfirmationCard, then disconnects and updates Home.
4. **Status Display:** WelcomeSection shows status in Home plugin.

### 8.3.2 Widget Specifications

**HomeCard (`Plugins.Connection.View.HomeCard`):**

- **Header:** Title: "Bot Connection Management", Subtitle: "Connected: @username" or "Setup Required", Image: WELCOME_IMG_URL.
- **Section 1:** `WelcomeSection` (status).
- **Section 2:** Token input (`TextInput`), hint about @BotFather.
- **Footer:** Primary button for Connect.

**WelcomeSection (`Plugins.Connection.View.WelcomeSection`):**

- **DecoratedText:** TopLabel: "Network Status", Text: "LIVE: friendlyName" or "OFFLINE: No Bot Linked", BottomLabel: "@username" or "Establish a secure connection...", StartIcon: sensors/sensors_off.
- **Button:** Link Bot or Unlink Bot (text or icon).
- **TextInput:** Token input (hidden when connected).

---

## 8.4 Technical Implementation

### 8.4.1 Architecture (MVC Pattern)

- **Controller:** `Load(e)` renders HomeCard; `Connect(e)` validates token via API, stores properties; `Disconnect(e)` removes token; `ConfirmDisconnect(e)` shows confirmation.
- **View:** `HomeCard(data)` and `WelcomeSection(data)` build cards; `BuildTokenTextInputWidget(token, hidden)` creates input.
- **Service/Model:** Uses `TelegramBotClient.getMe()` for validation; `PropertiesService` for token storage; `TerminalOutput.write` for logging.

### 8.4.2 Data Interactions

- **PropertiesService:** Stores `txt_bot_api_token`, `txt_bot_friendly_name`, `txt_bot_username`.
- **Telegram API:** `getMe` to validate token and fetch bot info.
- **SpreadsheetApp:** Logs events to Terminal Output sheet.
- **No Sheet Dumps:** Static UI, no data export.

---

## 8.5 Configuration & Security

- **Manifest:** Plugin accessible via Home grid.
- **Security:** Tokens stored securely in UserProperties; masked in logs (e.g., *** + last 6 chars); HTTPS validation for inputs.

---

## 8.6 Edge Cases & Error Handling

- **Invalid Token:** API returns `ok: false`; show error notification.
- **Empty Token:** Validation throws error.
- **Network Error:** UrlFetchApp exceptions logged and notified.
- **Already Connected:** Connect action updates properties without re-validation.
- **Disconnect Without Token:** No-op.
- **Confirmation:** Disconnect requires user confirmation via ConfirmationCard.

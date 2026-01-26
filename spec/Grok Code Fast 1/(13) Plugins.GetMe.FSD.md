# 13. Plugin-Specific FSD: Plugins.GetMe

## 13.1 Feature Overview

| Metadata | Details |
| :--- | :--- |
| **Feature Name** | Plugins.GetMe |
| **Module** | [`src/Plugins.js`](../../src/Plugins.js) |
| **Priority** | High |
| **Status** | Completed |

### 13.1.1 Summary

The `Plugins.GetMe` object implements the Get Me plugin for Telegram Bot Studio. It fetches and displays the bot's identity details using the Telegram `getMe` API, allowing users to verify connection and view capabilities like username, ID, and permissions.

---

## 13.2 User Stories & Rationale

**As a** Bot Developer  
**I want to** verify my bot's connection and view its identity  
**So that** I can confirm the bot is linked correctly and check its details.

**As a** Google Workspace User  
**I want to** see my bot's username and capabilities  
**So that** I can understand what the bot can do.

### 13.2.1 Acceptance Criteria

- [x] HomeCard loads on plugin access, calls `getMe` API.
- [x] Displays bot name, username, ID, and capabilities.
- [x] Includes export widget and raw JSON section.
- [x] Refresh button to reload data.
- [x] Errors logged and shown as notifications.
- [x] Requires valid token; shows connection status.

---

## 13.3 UI/UX Design (CardService)

The UI uses CardService for a card with identity profile, capabilities grid, and raw data. Icons use Material Icons. Colors from `Plugins.primaryColor()`.

### 13.3.1 Card Flow

1. **Load:** Calls API, builds card with results.
2. **Display:** Shows identity, capabilities, export, raw JSON.
3. **Refresh:** Reloads data on button click.

### 13.3.2 Widget Specifications

**HomeCard (`Plugins.GetMe.View.HomeCard`):**

- **Header:** Title: "Bot Dashboard", Subtitle: "Identity & Feature Configuration", Image: DEFAULT_IMAGE_URL.
- **Section 1:** Identity Profile (name, ID, username with link).
- **Section 2:** `BuildResultSection` (capabilities grid, raw JSON, export widget).
- **Footer:** Primary button "Refresh Data".

---

## 13.4 Technical Implementation

### 13.4.1 Architecture (MVC Pattern)

- **Controller:** `Load(e)` calls `TelegramBotClient.getMe()`, builds card with result.
- **View:** `HomeCard(data, result)` constructs card.
- **Service/Model:** Uses `TelegramBotClient` for API; logs to TerminalOutput.

### 13.4.2 Data Interactions

- **Telegram API:** `getMe` to fetch bot info.
- **PropertiesService:** Reads token for API call.
- **SpreadsheetApp:** Logs events; exports via widget.

---

## 13.5 Configuration & Security

- **Manifest:** Accessible via Home grid.
- **Security:** Token used securely; no sensitive data exposed.

---

## 13.6 Edge Cases & Error Handling

- **No Token:** Shows error notification.
- **API Failure:** Logs error, shows notification.
- **Invalid Response:** Handles missing fields gracefully.
- **No Result:** Card still loads with empty sections.

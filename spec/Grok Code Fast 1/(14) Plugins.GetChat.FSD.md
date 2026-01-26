# 14. Plugin-Specific FSD: Plugins.GetChat

## 14.1 Feature Overview

| Metadata | Details |
| :--- | :--- |
| **Feature Name** | Plugins.GetChat |
| **Module** | [`src/Plugins.js`](../../src/Plugins.js) |
| **Priority** | High |
| **Status** | Completed |

### 14.1.1 Summary

The `Plugins.GetChat` object implements the Get Chat plugin for Telegram Bot Studio. It fetches and displays detailed information about a specific chat (user, group, or channel) using the Telegram `getChat` API, allowing users to inspect chat properties and export data.

---

## 14.2 User Stories & Rationale

**As a** Bot Developer  
**I want to** retrieve details about a specific chat  
**So that** I can inspect user, group, or channel information for debugging or management.

**As a** Google Workspace User  
**I want to** search chats by ID or username  
**So that** I can easily access chat details without manual API calls.

### 14.2.1 Acceptance Criteria

- [x] HomeCard loads with search input for chat ID/username.
- [x] Search action calls `getChat` API and displays results.
- [x] Shows chat type, title/ID, username if available.
- [x] Includes export widget and raw JSON section.
- [x] Refresh button to reload data.
- [x] Errors logged and shown as notifications.
- [x] Requires valid token; shows connection status.

---

## 14.3 UI/UX Design (CardService)

The UI uses CardService for a card with search input, identity section, and raw data. Icons use Material Icons. Colors from `Plugins.primaryColor()`.

### 14.3.1 Card Flow

1. **Load:** Shows search input.
2. **Search:** Calls API, builds result sections.
3. **Display:** Shows identity, properties, export, raw JSON.
4. **Refresh:** Reloads data on button click.

### 14.3.2 Widget Specifications

**HomeCard (`Plugins.GetChat.View.HomeCard`):**

- **Header:** Title: "Chat Inspector", Subtitle: short_description, Image: DEFAULT_IMAGE_URL.
- **Section 1:** Search input for chat ID/username.
- **Section 2 (Conditional):** Identity Profile (type, title, ID, username).
- **Section 3 (Conditional):** `BuildResultSection` (properties grid, raw JSON, export widget).
- **Footer:** Primary button "Search Chat".

---

## 14.4 Technical Implementation

### 14.4.1 Architecture (MVC Pattern)

- **Controller:** `Load(e)` calls `TelegramBotClient.getChat()`, builds card with result.
- **View:** `HomeCard(data, result)` constructs card.
- **Service/Model:** Uses `TelegramBotClient` for API; logs to TerminalOutput.

### 14.4.2 Data Interactions

- **Telegram API:** `getChat` with chat ID/username.
- **PropertiesService:** Reads token for API call.
- **SpreadsheetApp:** Logs events; exports via widget.

---

## 14.5 Configuration & Security

- **Manifest:** Accessible via Home grid.
- **Security:** Token used securely; no sensitive data exposed.

---

## 14.6 Edge Cases & Error Handling

- **No Token:** Shows error notification.
- **Invalid Chat ID:** API returns error; shows notification.
- **No Result:** Card loads with empty sections.
- **Network Error:** Logged and notified.

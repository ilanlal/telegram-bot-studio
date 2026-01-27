# Functional Specification Document (FSD) - Telegram Bot Studio Plugins.GetChat

## 1. Feature Overview

| Metadata | Details |
| :--- | :--- |
| **Feature Name** | Telegram Bot Studio GetChat Plugin |
| **Module** | [`src/Plugins.js`](../../src/Plugins.js) - `Plugins.GetChat` |
| **Priority** | High |
| **Status** | Completed |

### 1.1 Summary

The `Plugins.GetChat` object implements chat inspection for Telegram Bot Studio, a Google Workspace add-on. It fetches and displays details about users, groups, or channels using the `getChat` API, providing identity and properties in a user-friendly interface.

---

## 2. User Stories & Rationale

**As a** Bot Developer  
**I want to** inspect chat details  
**So that** I can understand user/group/channel information.

**As a** Google Workspace User  
**I want to** view chat properties  
**So that** I can manage bot interactions effectively.

### 2.1 Acceptance Criteria

- [x] Fetches chat info via `getChat` API.
- [x] Displays identity (name, ID, type).
- [x] Shows properties in grids.
- [x] Includes export and search options.
- [x] Handles API errors gracefully.

---

## 3. UI/UX Design (CardService)

The UI is built using Google Apps Script's CardService, rendering a search and results card. The plugin uses a single HomeCard with sections for search and results. Navigation pushes the card and updates on search. Icons use Material Icons with `setFill(false)`. Colors are defined via `primaryColor()`, `secondaryColor()`, `accentColor()`.

### 3.1 Card Flow

1. **Entry Point:** User selects GetChat; pushes card.
2. **Search:** User enters chat ID/username.
3. **Display:** Shows chat identity and properties.
4. **Export:** Dumps results to sheet.

### 3.2 Widget Specifications

**Home Card (`Plugins.GetChat.View.HomeCard`):**

- **Header:** Title: "Chat Inspector", Subtitle: "User, Group & Channel details", Image: Logo.
- **Section 1:** Search input for chat ID/username.
- **Section 2:** Identity display (name, ID, type).
- **Section 3:** Properties grid.
- **Section 4:** Raw JSON and export widget.
- **Footer:** Search button.

---

## 4. Technical Implementation

### 4.1 Architecture (MVC Pattern)

- **Controller:** `Plugins.GetChat.Controller` with `Load(e)` for rendering and API calls.
- **View:** `Plugins.GetChat.View` with `HomeCard(data, result)` for building the card.
- **Service/Model:** Integrates with `TelegramBotClient` for `getChat`, `PropertiesService` for tokens.

### 4.2 Data Interactions

**Telegram API (`UrlFetchApp`):**

- **Endpoints:** `https://api.telegram.org/bot<token>/getChat`.
- **Response:** Parsed for chat details.

**Sheet Export:**

- Via `Plugins.ExportApiResultWidget`.

---

## 5. Configuration & Security

### 5.1 AppScript Manifest (`appsscript.json`)

- **Scopes:** `https://www.googleapis.com/auth/script.external_request` for API calls.

### 5.2 Security Considerations

- Tokens retrieved securely from PropertiesService.
- No sensitive data exposed in UI.

---

## 6. Edge Cases & Error Handling

- **No Token:** Throws error; prompts connection.
- **Invalid Chat ID:** API error; shows notification.
- **Network Failures:** Logged and notified.
- **No Results:** Shows search form only.

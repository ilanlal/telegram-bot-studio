# Functional Specification Document (FSD) - Telegram Bot Studio Plugins.GetMe

## 1. Feature Overview

| Metadata | Details |
| :--- | :--- |
| **Feature Name** | Telegram Bot Studio GetMe Plugin |
| **Module** | [`src/Plugins.js`](../../src/Plugins.js) - `Plugins.GetMe` |
| **Priority** | High |
| **Status** | Completed |

### 1.1 Summary

The `Plugins.GetMe` object implements bot identity verification and capability display for Telegram Bot Studio, a Google Workspace add-on. It fetches bot details via the `getMe` API and presents them in a user-friendly card interface.

---

## 2. User Stories & Rationale

**As a** Bot Developer  
**I want to** verify my bot's connection and view its details  
**So that** I can confirm the bot is set up correctly.

**As a** Google Workspace User  
**I want to** see bot identity and capabilities  
**So that** I can understand what my bot can do.

### 2.1 Acceptance Criteria

- [x] Fetches bot info via `getMe` API.
- [x] Displays identity (name, username, ID).
- [x] Shows capabilities in grids.
- [x] Includes export and refresh options.
- [x] Handles API errors gracefully.

---

## 3. UI/UX Design (CardService)

The UI is built using Google Apps Script's CardService, rendering a dashboard card. The plugin uses a single HomeCard with sections for identity and results. Navigation pushes the card and updates on refresh. Icons use Material Icons with `setFill(false)`. Colors are defined via `primaryColor()`, `secondaryColor()`, `accentColor()`.

### 3.1 Card Flow

1. **Entry Point:** User selects GetMe from home; pushes card.
2. **Display:** Shows bot identity and capabilities.
3. **Refresh:** Updates data in place.
4. **Export:** Dumps results to sheet.

### 3.2 Widget Specifications

**Home Card (`Plugins.GetMe.View.HomeCard`):**

- **Header:** Title: "Bot Dashboard", Subtitle: "Identity & Feature Configuration", Image: Logo.
- **Section 1:** Identity Profile (name, ID, username).
- **Section 2:** Capabilities grid.
- **Section 3:** Raw JSON and export widget.
- **Footer:** Refresh button.

---

## 4. Technical Implementation

### 4.1 Architecture (MVC Pattern)

- **Controller:** `Plugins.GetMe.Controller` with `Load(e)` for rendering and API calls.
- **View:** `Plugins.GetMe.View` with `HomeCard(data, result)` for building the card.
- **Service/Model:** Integrates with `TelegramBotClient` for `getMe`, `PropertiesService` for tokens.

### 4.2 Data Interactions

**Telegram API (`UrlFetchApp`):**

- **Endpoints:** `https://api.telegram.org/bot<token>/getMe`.
- **Response:** Parsed for bot details.

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
- **API Errors:** Logs to TerminalOutput; shows notification.
- **Invalid Response:** Parses and handles gracefully.
- **Network Failures:** Logged and notified.

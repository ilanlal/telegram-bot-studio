# Functional Specification Document (FSD) - Telegram Bot Studio Plugins.Settings

## 1. Feature Overview

| Metadata | Details |
| :--- | :--- |
| **Feature Name** | Telegram Bot Studio Settings Plugin |
| **Module** | [`src/Plugins.js`](../../src/Plugins.js) - `Plugins.Settings` |
| **Priority** | High |
| **Status** | Completed |

### 1.1 Summary

The `Plugins.Settings` object implements configuration management for Telegram Bot Studio, a Google Workspace add-on. It allows users to customize API endpoints, toggle developer tools like terminal output and JSON formatting, and save preferences securely. It integrates with PropertiesService for persistence and uses CardService for UI.

---

## 2. User Stories & Rationale

**As a** Bot Developer  
**I want to** adjust settings like API endpoints and logging  
**So that** I can customize the add-on behavior for my workflow.

**As a** Google Workspace User  
**I want to** enable/disable features like pretty JSON and terminal focus  
**So that** I can optimize performance and usability.

### 2.1 Acceptance Criteria

- [x] API endpoint URL input and validation.
- [x] Toggle switches for terminal output, focus, and JSON formatting.
- [x] Secure storage in PropertiesService.
- [x] UI with collapsible sections for organization.
- [x] Save action with navigation back to home.

---

## 3. UI/UX Design (CardService)

The UI is built using Google Apps Script's CardService, rendering a settings card. The plugin uses a single HomeCard with sections for network/security and developer tools. Navigation pushes the card and pops on save. Icons use Material Icons with `setFill(false)`. Colors are defined via `primaryColor()`, `secondaryColor()`, `accentColor()`.

### 3.1 Card Flow

1. **Entry Point:** User clicks Settings from Home; pushes Settings card.
2. **Configuration:** User adjusts inputs and toggles.
3. **Save:** Validates and saves settings, pops card to home.
4. **Feedback:** Notification on save or error.

### 3.2 Widget Specifications

**Home Card (`Plugins.Settings.View.HomeCard`):**

- **Header:** Title: "Settings", Subtitle: Short description, Image: Logo.
- **Section 1:** Network & Security (API endpoint input).
- **Section 2:** Developer Tools (toggles for terminal output, focus, JSON formatting).
- **Footer:** Primary button "Save Configuration" (saves and navigates).

---

## 4. Technical Implementation

### 4.1 Architecture (MVC Pattern)

- **Controller:** `Plugins.Settings.Controller` with methods like `Load(e)` for rendering, `SaveSettings(e)` for validation/storage, `ToggleAction(e)` for switches.
- **View:** `Plugins.Settings.View` with `HomeCard(data)` for building the card.
- **Service/Model:** Integrates with `PropertiesService` for user properties, `Plugins.Modules.App.getData()` for app info.

### 4.2 Data Interactions

**Properties Service:**

- **UserProperties:** Stores `txt_api_endpoint_url`, `terminal_output_switch`, `focus_terminal_output`, `praittfy_json`.

**Navigation:**

- Uses `CardService.newNavigation()` to push/pop cards.

---

## 5. Configuration & Security

### 5.1 AppScript Manifest (`appsscript.json`)

- **Scopes:** None additional; relies on existing.

### 5.2 Security Considerations

- Settings stored in UserProperties (user-specific).
- Input validation for URLs.
- No sensitive data exposed in UI.

---

## 6. Edge Cases & Error Handling

- **Invalid URL:** Throws error on save; shows notification.
- **Missing Inputs:** Defaults applied; logs to TerminalOutput.
- **Save Failure:** Logs error; shows notification.
- **Toggle Errors:** Handled via ToggleAction; notifications.

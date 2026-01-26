# 10. Plugin-Specific FSD: Plugins.Settings

## 10.1 Feature Overview

| Metadata | Details |
| :--- | :--- |
| **Feature Name** | Plugins.Settings |
| **Module** | [`src/Plugins.js`](../../src/Plugins.js) |
| **Priority** | Medium |
| **Status** | Completed |

### 10.1.1 Summary

The `Plugins.Settings` object implements the Settings plugin for Telegram Bot Studio. It provides a centralized interface for configuring bot-related preferences, including API endpoints, security keys, and developer tools like logging toggles and JSON formatting options. It uses CardService for UI and PropertiesService for persistence.

---

## 10.2 User Stories & Rationale

**As a** Bot Developer  
**I want to** customize API endpoints and enable debug logging  
**So that** I can troubleshoot and adapt the add-on to my environment.

**As a** Google Workspace User  
**I want to** toggle features like pretty printing JSON  
**So that** I can improve readability of API responses in logs.

### 10.2.1 Acceptance Criteria

- [x] HomeCard loads with current settings from PropertiesService.
- [x] SaveSettings action updates properties and navigates back to Home.
- [x] Toggles for terminal output, focus, and JSON formatting are functional.
- [x] UI includes text inputs for API URL and secret key.
- [x] Changes are persisted and reflected on reload.
- [x] Errors in saving are logged and notified.

---

## 10.3 UI/UX Design (CardService)

The UI uses CardService for a settings card with sections for network/security and developer tools. Inputs include TextInputs and Switches. Footer has a Save button.

### 10.3.1 Card Flow

1. **Load:** Pushes the settings card with current values.
2. **Edit:** User modifies inputs and toggles.
3. **Save:** Updates properties and pops to Home card.
4. **Cancel:** Not explicitly handled; save is required.

### 10.3.2 Widget Specifications

**HomeCard (`Plugins.Settings.View.HomeCard`):**

- **Header:** Title: "Settings", Subtitle: short_description, Image: WELCOME_IMG_URL.
- **Section 1:** Network & Security (API Endpoint URL input).
- **Section 2:** Developer Tools (switches for terminal output, focus, pretty JSON).
- **Footer:** Primary button "Save Configuration".

---

## 10.4 Technical Implementation

### 10.4.1 Architecture (MVC Pattern)

- **Controller:** `Load(e)` renders card; `SaveSettings(e)` saves to properties and navigates.
- **View:** `HomeCard(data)` builds the card with inputs and switches.
- **Service/Model:** Uses `PropertiesService` for storage; no API calls.

### 10.4.2 Data Interactions

- **PropertiesService:** Reads/writes `txt_api_endpoint_url`, `txt_secret_private_key`, `terminal_output_switch`, `focus_terminal_output`, `praittfy_json`.
- **No Sheet/API:** Static settings, no external data.

---

## 10.5 Configuration & Security

- **Manifest:** Accessible via Home quick actions.
- **Security:** Secret key stored securely; inputs validated implicitly.

---

## 10.6 Edge Cases & Error Handling

- **Missing Values:** Falls back to defaults (e.g., default API URL).
- **Invalid Inputs:** No specific validation; relies on user input.
- **Save Errors:** Logged if properties fail to update.
- **Navigation:** Pops to Home on save.

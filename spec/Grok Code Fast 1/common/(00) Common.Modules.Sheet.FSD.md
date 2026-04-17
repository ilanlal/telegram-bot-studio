# Functional Specification Document (FSD) - Telegram Bot Studio Common Modules Sheet

## 1. Feature Overview

| Metadata | Details |
| :--- | :--- |
| **Feature Name** | Telegram Bot Studio Common Modules Sheet |
| **Module** | [`src/Addon.js`](../../src/Addon.js) - `Common.Modules.Sheet` |
| **Priority** | High |
| **Status** | Completed |

### 1.1 Summary

The `Common.Modules.Sheet` object provides utilities for managing Google Sheets within Telegram Bot Studio. It includes methods for initializing sheets, dumping objects, logging webhook events, and writing Gemini API responses. This module enables consistent data persistence, logging, and sheet operations across plugins.

---

## 2. User Stories & Rationale

**As a** Developer  
**I want to** manage Google Sheets for logging and data storage  
**So that** I can persist bot events, API responses, and user data reliably.

**As a** User  
**I want to** automatic logging of webhook events and Gemini responses  
**So that** I can monitor bot activity and troubleshoot issues.

### 2.1 Acceptance Criteria

- [x] `Common.Modules.Sheet` object with version "2.0.0".
- [x] Sheet metadata: WEBHOOK_EVENT_SHEET_META and TERMINAL_OUTPUT_SHEET_META with names and columns.
- [x] Methods: initializeSheet, setActiveSheet, getSheet, bindSheetSampleData, dumpObjectToSheet, writeWebhookEvent, writeGeminiResponse.
- [x] Consistent sheet initialization and data appending.
- [x] Error handling for sheet operations.
- [x] Integration with PropertiesService for logging toggles.

---

## 3. UI/UX Design (CardService)

N/A - This is a backend module with no direct UI. Integrates with plugins for data export and logging.

---

## 4. Technical Implementation

### 4.1 Architecture (MVC Pattern)

- **Model/Service:** `Common.Modules.Sheet` provides services for sheet management, data persistence, and logging.
- **Integration:** Used by plugins like Addon.Webhook, Addon.GeminiAgent for logging and data export.

### 4.2 Data Interactions

**Google Sheets (`SpreadsheetApp`):**

- Initialize sheets with metadata (name, columns).
- Append rows for events, responses, and dumps.
- Read/write via methods like dumpObjectToSheet, writeWebhookEvent, writeGeminiResponse.

**Properties Service:**

- ScriptProperties: Enable/disable logging (ENABLE_EVENT_LOGGING, ENABLE_TERMINAL_OUTPUT).

---

## 5. Configuration & Security

### 5.1 AppScript Manifest (`appsscript.json`)

- Scopes: `https://www.googleapis.com/auth/spreadsheets.currentonly` for sheet operations.

### 5.2 Security Considerations

- Data in sheets is user-specific; no sensitive data exposed.
- Logging toggles prevent unauthorized access.
- HTTPS for any URLs; validation in methods.

---

## 6. Edge Cases & Error Handling

- **Sheet Not Found:** Initialize new sheet if missing.
- **Invalid Data:** JSON stringify objects before appending.
- **Large Data:** Handle via sheet limits; truncate if necessary.
- **Permission Issues:** Fallback to notifications.
- **Logging Disabled:** Skip operations when toggles are off.
- **Network Errors:** Log errors without failing operations

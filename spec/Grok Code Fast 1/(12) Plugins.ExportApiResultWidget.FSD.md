# Functional Specification Document (FSD) - Telegram Bot Studio Plugins.ExportApiResultWidget

## 1. Feature Overview

| Metadata | Details |
| :--- | :--- |
| **Feature Name** | Telegram Bot Studio Export API Result Widget Plugin |
| **Module** | [`src/Plugins.js`](../../src/Plugins.js) - `Plugins.ExportApiResultWidget` |
| **Priority** | High |
| **Status** | Completed |

### 1.1 Summary

The `Plugins.ExportApiResultWidget` object implements a reusable widget for exporting API result data to Google Sheets, enabling users to dump results for analysis and record-keeping. It integrates with PropertiesService for JSON formatting settings and uses CardService for UI.

---

## 2. User Stories & Rationale

**As a** Bot Developer  
**I want to** export API results to sheets  
**So that** I can analyze and store bot data offline.

**As a** Google Workspace User  
**I want to** dump JSON data easily  
**So that** I can work with bot responses in spreadsheets.

### 2.1 Acceptance Criteria

- [x] Exports API results to specified sheet.
- [x] Supports pretty-printed JSON based on settings.
- [x] Integrates with other plugins via BuildExportWidget.
- [x] Handles errors with notifications and logging.

---

## 3. UI/UX Design (CardService)

The UI is built using Google Apps Script's CardService, rendering a decorated text widget with an export button. It uses Material Icons and integrates into other cards. Navigation triggers export action. Colors are defined via `primaryColor()`, `secondaryColor()`, `accentColor()`.

### 3.1 Card Flow

1. **Display**: Widget appears in result sections of other plugins.
2. **Action**: User clicks "Export" to dump data.
3. **Feedback**: Notification on success or error.

### 3.2 Widget Specifications

**BuildExportWidget (DecoratedText):**

- **Top Label:** "📥 Export Data"
- **Text:** "Export to Sheet"
- **Bottom Label:** Action description.
- **Start Icon:** Save icon.
- **Button:** "Export" with onClickAction to DumpApiResultToSheet.

---

## 4. Technical Implementation

### 4.1 Architecture (MVC Pattern)

- **Controller:** `Plugins.ExportApiResultWidget.Controller` with `DumpApiResultToSheet(e)` for export logic.
- **View:** `Plugins.ExportApiResultWidget.View` with `BuildExportWidget(botName, apiAction, result)` for widget building.
- **Service/Model:** Integrates with `Plugins.Modules.Sheet.dumpObjectToSheet`, `PropertiesService` for settings.

### 4.2 Data Interactions

**Sheet Export:**

- Dumps to specified sheet (e.g., "📦 API Dumps").
- Includes timestamp, bot, action, raw data, and fields.

**Properties Service:**

- Retrieves `praittfy_json` for formatting.

---

## 5. Configuration & Security

### 5.1 AppScript Manifest (`appsscript.json`)

- **Scopes:** `https://www.googleapis.com/auth/spreadsheets.currentonly` for sheet access.

### 5.2 Security Considerations

- Data exported to user sheets; no external sharing.
- JSON formatting optional; raw data logged securely.

---

## 6. Edge Cases & Error Handling

- **Invalid Data:** Throws error; shows notification.
- **Sheet Access:** Errors logged to TerminalOutput.
- **Formatting Issues:** Falls back to raw JSON.
- **Large Data:** Handled by Sheet API limits.

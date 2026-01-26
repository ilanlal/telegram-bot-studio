# 12. Plugin-Specific FSD: Plugins.ExportApiResultWidget

## 12.1 Feature Overview

| Metadata | Details |
| :--- | :--- |
| **Feature Name** | Plugins.ExportApiResultWidget |
| **Module** | [`src/Plugins.js`](../../src/Plugins.js) |
| **Priority** | Medium |
| **Status** | Completed |

### 12.1.1 Summary

The `Plugins.ExportApiResultWidget` object implements a reusable widget for exporting API result data to Google Sheets. It provides a simple UI element that allows users to dump JSON responses from Telegram API calls (e.g., getMe, getChat) into a dedicated sheet for analysis and record-keeping. It integrates with the Sheet module for data persistence.

---

## 12.2 User Stories & Rationale

**As a** Bot Developer  
**I want to** export API responses to sheets  
**So that** I can analyze and archive bot data easily.

**As a** Google Workspace User  
**I want to** save API results with one click  
**So that** I can keep records without manual copying.

### 12.2.1 Acceptance Criteria

- [x] BuildExportWidget creates a DecoratedText with Export button.
- [x] DumpApiResultToSheet appends data to "📦 API Dumps" sheet.
- [x] Parameters include botName, action, data (JSON string).
- [x] Success shows notification; errors logged.
- [x] Widget appears in result sections of plugins like GetMe, GetChat.

---

## 12.3 UI/UX Design (CardService)

The UI is a small widget added to cards, using DecoratedText with a button. No full card; integrated into others.

### 12.3.1 Widget Flow

1. **Display:** Appears in result sections.
2. **Action:** User clicks Export; data dumped to sheet.
3. **Feedback:** Notification on success/failure.

### 12.3.2 Widget Specifications

**BuildExportWidget:**

- **DecoratedText:** TopLabel: "📥 Export Data", Text: "Export to Sheet", BottomLabel: action details, StartIcon: save_alt, Button: "Export".

---

## 12.4 Technical Implementation

### 12.4.1 Architecture (MVC Pattern)

- **Controller:** `DumpApiResultToSheet(e)` parses parameters, calls Sheet.dumpObjectToSheet.
- **View:** `BuildExportWidget(botName, action, result)` returns the widget.
- **Service/Model:** Uses Sheet module for dumping.

### 12.4.2 Data Interactions

- **Parameters:** botName, action, data (JSON).
- **Sheet:** Appends to "📦 API Dumps" with timestamp, bot, action, JSON.
- **No API:** Static export.

---

## 12.5 Configuration & Security

- **Manifest:** Integrated into other plugins.
- **Security:** No sensitive data; JSON is user-generated.

---

## 12.6 Edge Cases & Error Handling

- **Invalid JSON:** Catches parse errors.
- **Sheet Errors:** Logged if append fails.
- **No Data:** No-op if result empty.

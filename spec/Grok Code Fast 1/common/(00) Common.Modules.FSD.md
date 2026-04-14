# Functional Specification Document (FSD) - Telegram Bot Studio Common Modules

## 1. Feature Overview

| Metadata | Details |
| :--- | :--- |
| **Feature Name** | Telegram Bot Studio Common Modules |
| **Module** | [`src/Addon.js`](../../../src/Addon.js) - `Common` and `Common.Modules` |
| **Priority** | High |
| **Status** | Completed |

### 1.1 Summary

The `Common` object provides shared constants, input definitions, and utility modules for Telegram Bot Studio. It includes language codes, input property mappings, and modules for sheet operations, Telegram API interactions, Gemini AI, logging, and CRM. These modules enable consistent data handling, API calls, and integrations across plugins.

---

## 2. User Stories & Rationale

**As a** Developer  
**I want to** use shared modules for common tasks  
**So that** I can maintain consistency and reduce code duplication.

**As a** User  
**I want to** reliable API interactions and data persistence  
**So that** I can manage bots efficiently without errors.

### 2.1 Acceptance Criteria

- [x] `Common` object with LANGUAGE_CODES, INPUT mappings, and Modules.
- [x] Modules: Sheet, TelegramBotClient, TelegramBotSettings, TerminalOutput, LoggerModel, GeminiApiClient, GeminiAgent, CRM.
- [x] Consistent property storage via PropertiesService.
- [x] Error handling and logging in modules.
- [x] API clients for Telegram and Gemini.

---

## 3. UI/UX Design (CardService)

N/A - This is a backend module with no direct UI. Integrates with plugins for data display and actions.

---

## 4. Technical Implementation

### 4.1 Architecture (MVC Pattern)

- **Model/Service:** `Common.Modules` provide services for data persistence, API calls, and utilities.
- **Constants:** `Common.INPUT` and `Common.LANGUAGE_CODES` for standardized inputs.
- **Integration:** Used by plugins like Addon.Home, Addon.Webhook for API and sheet ops.

### 4.2 Data Interactions

**Properties Service:**

- DocumentProperties: Bot tokens, API keys, settings.
- UserProperties: Membership info.
- ScriptProperties: Global flags.

**Google Sheets (`SpreadsheetApp`):**

- Read/write via `Common.Modules.Sheet` for logs, dumps, initialization.

**Telegram API (`UrlFetchApp`):**

- Via `Common.Modules.TelegramBotClient` for getMe, getChat, setWebhook, etc.

**Gemini API (`UrlFetchApp`):**

- Via `Common.Modules.GeminiApiClient` for content generation.

**CRM (`Common.Modules.CRM`):**

- Customer, Product, Membership management with sheet storage.

---

## 5. Configuration & Security

### 5.1 AppScript Manifest (`appsscript.json`)

- Scopes: external_request, spreadsheets.currentonly.
- Whitelist: api.telegram.org, generativelanguage.googleapis.com.

### 5.2 Security Considerations

- Tokens/keys in PropertiesService (user-specific).
- HTTPS for URLs; validation in clients.
- No sensitive data in logs; masking where needed.
- Controlled access to CRM data.

---

## 6. Edge Cases & Error Handling

- **Missing Tokens/Keys:** Throw errors; prompt setup.
- **API Failures:** Parse responses; log errors.
- **Sheet Access Issues:** Fallbacks; notify.
- **Invalid Inputs:** Validation in modules.
- **Network Errors:** Retry or notify.
- **Large Data:** Limits handled by API/sheets.

# Functional Specification Document (FSD) - Telegram Bot Studio Plugins

## 1. Feature Overview

| Metadata | Details |
| :--- | :--- |
| **Feature Name** | Telegram Bot Studio Plugins |
| **Module** | [`src/Plugins.js`](../../../src/Plugins.js) |
| **Priority** | High |
| **Status** | Completed |

### 1.1 Summary

The `Plugins.js` file implements the core plugin architecture for Telegram Bot Studio, a Google Workspace add-on for managing Telegram bots. It provides a modular system of plugins (e.g., Connection, GetMe, Webhook) that handle bot authentication, API interactions, UI rendering via CardService, and data persistence. The architecture supports MVC patterns, with Controllers for logic, Views for UI, and integrated services for Telegram API calls and sheet operations.

---

## 2. User Stories & Rationale

**As a** Bot Developer  
**I want to** use a modular plugin system in Google Sheets  
**So that** I can easily connect, configure, and manage my Telegram bots through a visual interface.

**As a** Google Workspace User  
**I want to** access bot management features like webhook setup and chat inspection  
**So that** I can build and monitor bots without deep coding knowledge.

### 2.1 Acceptance Criteria

- [x] Plugins are organized in a `Plugins` object with consistent structure (id, name, Controller, View).
- [x] Core modules (App, Sheet, TerminalOutput) handle data and logging.
- [x] UI uses CardService for sidebar cards, with navigation and actions.
- [x] API interactions via `TelegramBotClient` for methods like `getMe`, `getChat`, `setWebhook`.
- [x] Properties stored in `PropertiesService` for persistence.
- [x] Error handling with notifications and logging to sheets.

---

## 3. UI/UX Design (CardService)

The UI is built using Google Apps Script's CardService, rendering in the sidebar. Each plugin has a HomeCard for primary interaction, with sections for input, status, and actions. Navigation uses pushCard, updateCard, and popToRoot. Icons use Material Icons with `setFill(false)`. Colors are defined via `primaryColor()`, `secondaryColor()`, `accentColor()`.

### 3.1 Card Flow

1. **Entry Point:** Home plugin loads the main dashboard, showing plugin list and connection status.
2. **Plugin Access:** User selects a plugin (e.g., GetMe, Webhook) from the grid.
3. **Interaction Cards:** Each plugin has a HomeCard for input/results, with footers for actions.
4. **Confirmation:** Destructive actions (e.g., disconnect, delete webhook) use `ConfirmationCard`.
5. **Results:** API responses displayed in `BuildResultSection` with grids and raw JSON.

### 3.2 Widget Specifications

**Home Card (`Plugins.Home.View.HomeCard`):**

- **Header:** Title: "Telegram Bot Studio", Subtitle: Package short_description, Image: Logo.
- **Section 1:** `WelcomeSection` (connection status).
- **Section 2:** Grid of plugin buttons (e.g., GetMe, GetChat, Webhook).
- **Section 3:** Quick actions (Settings, Help, About).
- **Section 4 (Conditional):** Premium CTA if not premium.

**Connection Card (`Plugins.Connection.View.HomeCard`):**

- **Header:** Title: "Connection", Image: Welcome.
- **Section 1:** Token input (`TextInput`), Connect button.
- **Footer:** Primary button for Connect.

**Webhook Card (`Plugins.Webhook.View.HomeCard`):**

- **Header:** Title: "Webhook Configurator".
- **Section 1:** Status (URL, pending updates).
- **Section 2:** Form inputs (URL, max connections, etc.).
- **Footer:** Set/Update or Delete button.

**GetMe/GetChat Cards:** Similar, with result sections showing API data in grids.

---

## 4. Technical Implementation

### 4.1 Architecture (MVC Pattern)

- **Controller:** Each plugin has a `Controller` object with methods like `Load(e)` for rendering, handling form inputs, and API calls.
- **View:** `View` objects build CardService cards, using helpers like `BuildResultSection`.
- **Service/Model:** Integrated via `TelegramBotClient` for API, `Plugins.Modules` for sheets/logging, `PropertiesService` for storage.

### 4.2 Data Interactions

**Google Sheets (`SpreadsheetApp`):**

- **Read:** User properties for settings (e.g., `txt_bot_api_token`).
- **Write:** Logs to "Terminal Output" sheet via `TerminalOutput.write`, dumps API results to sheets via `Sheet.dumpObjectToSheet`.

**Telegram API (`UrlFetchApp`):**

- **Endpoints:** `https://api.telegram.org/bot<token>/getMe`, `/getChat`, `/getWebhookInfo`, `/setWebhook`, `/deleteWebhook`.
- **Payload:** JSON for POST requests (e.g., setWebhook with URL, options).

**Properties Service:**

- **UserProperties:** Stores tokens, settings (e.g., `txt_bot_api_token`, `terminal_output_switch`).
- **ScriptProperties:** For global config (e.g., logging flags).

---

## 5. Configuration & Security

### 5.1 AppScript Manifest (`appsscript.json`)

- **Scopes:** `https://www.googleapis.com/auth/script.external_request` for API calls, `https://www.googleapis.com/auth/spreadsheets.currentonly` for sheet access.
- **UrlFetchWhitelist:** `https://api.telegram.org/`.
- **Universal Actions:** Home plugin as entry point.

### 5.2 Security Considerations

- Tokens stored in UserProperties (user-specific, not shared).
- Input validation for URLs (HTTPS required).
- No sensitive data in logs; tokens masked in display.

---

## 6. Edge Cases & Error Handling

- **No Token:** Plugins check `txt_bot_api_token`; throw error if missing.
- **API Errors:** Parse `ok: false`; show notification with message.
- **Network Failures:** `UrlFetchApp` exceptions logged and notified.
- **Invalid Inputs:** Form validation (e.g., URL must start with HTTPS).
- **Sheet Access:** Errors if sheet not found; logged to Terminal Output.
- **Premium Checks:** Features gated by `isPremium` from App.getData().

## 7. Plugin-Specific FSD: Plugins.Home

### 7.1 Feature Overview

| Metadata | Details |
| :--- | :--- |
| **Feature Name** | Plugins.Home |
| **Module** | [`src/Plugins.js`](../../../src/Plugins.js) |
| **Priority** | High |
| **Status** | Completed |

#### 7.1.1 Summary

The `Plugins.Home` object implements the main dashboard plugin for Telegram Bot Studio. It serves as the entry point, displaying connection status, available plugins, quick actions, and premium prompts. It includes sub-cards for About and Help, built using CardService for Google Workspace sidebar UI.

---

### 7.2 User Stories & Rationale

**As a** Bot Developer  
**I want to** access a central dashboard when opening the add-on  
**So that** I can quickly check my bot's connection, navigate to plugins, and access settings or help.

**As a** Google Workspace User  
**I want to** view my bot's status and available tools in one place  
**So that** I can efficiently manage my Telegram bot without navigating multiple menus.

**As a** New User  
**I want to** see getting started guidance and links to documentation  
**So that** I can learn how to use the add-on effectively.

#### 7.2.1 Acceptance Criteria

- [x] HomeCard loads on add-on open, showing connection status, plugin grid, and quick actions.
- [x] AboutCard displays app info, version, and useful links.
- [x] HelpCard provides a getting started guide with steps.
- [x] Navigation uses CardService pushCard for About/Help.
- [x] Premium CTA appears if user is not premium.
- [x] Data from `Plugins.Modules.App.getData()` is used for status.
- [x] Logging via `TerminalOutput.write` for debugging.

---

### 7.3 UI/UX Design (CardService)

The UI uses CardService for sidebar cards. HomeCard is the root; About and Help are pushed cards. Icons use Material Icons. Colors from `Plugins.primaryColor()` etc.

#### 7.3.1 Card Flow

1. **HomeCard:** Loads on `Load(e)`, shows status and plugins.
2. **AboutCard:** Pushed via `About(e)`, displays metadata and links.
3. **HelpCard:** Pushed via `Help(e)`, shows guide and FAQ.

#### 7.3.2 Widget Specifications

**HomeCard (`Plugins.Home.View.HomeCard`):**

- **Header:** Title: Package.name, Subtitle: Package.short_description, Image: Package.imageUrl.
- **Section 1:** `Plugins.Connection.View.WelcomeSection` (status).
- **Section 2:** Grid of plugin buttons (GetMe, GetChat, Webhook).
- **Section 3:** ButtonSet for Settings, Help, About.
- **Section 4 (Conditional):** Premium CTA if not premium.

**AboutCard (`Plugins.Home.View.AboutCard`):**

- **Header:** Title: "About " + Package.name, Image: Media.BIG_TIME_IMG_URL.
- **Section 1:** TextParagraphs for name, version, build, description, developer.
- **Section 2:** TextButtons for Documentation and Report Issues (open links).

**HelpCard (`Plugins.Home.View.HelpCard`):**

- **Header:** Title: "Help & Support", Image: Media.YES_IMG_URL.
- **Section 1:** Getting Started with steps (DecoratedText).

---

### 7.4 Technical Implementation

#### 7.4.1 Architecture (MVC Pattern)

- **Controller:** `Load(e)` builds HomeCard with app data; `About(e)` and `Help(e)` push respective cards.
- **View:** `HomeCard(data)`, `AboutCard(data)`, `HelpCard(data)` construct cards using CardService.
- **Service/Model:** Uses `App.getData()` for premium/status; logs to TerminalOutput.

#### 7.4.2 Data Interactions

- **PropertiesService:** Reads `txt_bot_api_token` for connection status.
- **SpreadsheetApp:** Logs events to Terminal Output sheet.
- **No API Calls:** Static UI, no Telegram API.

---

### 7.5 Configuration & Security

- **Manifest:** Universal action points to Home.Controller.Load.
- **Security:** No sensitive data; links are external but safe.

---

### 7.6 Edge Cases & Error Handling

- **No Data:** Falls back to defaults (e.g., empty token).
- **Premium Check:** Shows CTA if `!data.isPremium`.
- **Navigation:** Handles refresh parameter in `Load(e)`.
- **Errors:** Logged if app data fails to load.
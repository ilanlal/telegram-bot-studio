# 7. Plugin-Specific FSD: Plugins.Home

## 7.1 Feature Overview

| Metadata | Details |
| :--- | :--- |
| **Feature Name** | Plugins.Home |
| **Module** | [`src/Plugins.js`](../../src/Plugins.js) |
| **Priority** | High |
| **Status** | Completed |

### 7.1.1 Summary

The `Plugins.Home` object implements the main dashboard plugin for Telegram Bot Studio. It serves as the entry point, displaying connection status, available plugins, quick actions, and premium prompts. It includes sub-cards for About and Help, built using CardService for Google Workspace sidebar UI.

---

## 7.2 User Stories & Rationale

**As a** Bot Developer  
**I want to** access a central dashboard when opening the add-on  
**So that** I can quickly check my bot's connection, navigate to plugins, and access settings or help.

**As a** Google Workspace User  
**I want to** view my bot's status and available tools in one place  
**So that** I can efficiently manage my Telegram bot without navigating multiple menus.

**As a** New User  
**I want to** see getting started guidance and links to documentation  
**So that** I can learn how to use the add-on effectively.

### 7.2.1 Acceptance Criteria

- [x] HomeCard loads on add-on open, showing connection status, plugin grid, and quick actions.
- [x] AboutCard displays app info, version, and useful links.
- [x] HelpCard provides a getting started guide with steps.
- [x] Navigation uses CardService pushCard for About/Help.
- [x] Premium CTA appears if user is not premium.
- [x] Data from `Plugins.Modules.App.getData()` is used for status.
- [x] Logging via `TerminalOutput.write` for debugging.

---

## 7.3 UI/UX Design (CardService)

The UI uses CardService for sidebar cards. HomeCard is the root; About and Help are pushed cards. Icons use Material Icons. Colors from `Plugins.primaryColor()` etc.

### 7.3.1 Card Flow

1. **HomeCard:** Loads on `Load(e)`, shows status and plugins.
2. **AboutCard:** Pushed via `About(e)`, displays metadata and links.
3. **HelpCard:** Pushed via `Help(e)`, shows guide and FAQ.

### 7.3.2 Widget Specifications

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

## 7.4 Technical Implementation

### 7.4.1 Architecture (MVC Pattern)

- **Controller:** `Load(e)` builds HomeCard with app data; `About(e)` and `Help(e)` push respective cards.
- **View:** `HomeCard(data)`, `AboutCard(data)`, `HelpCard(data)` construct cards using CardService.
- **Service/Model:** Uses `App.getData()` for premium/status; logs to TerminalOutput.

### 7.4.2 Data Interactions

- **PropertiesService:** Reads `txt_bot_api_token` for connection status.
- **SpreadsheetApp:** Logs events to Terminal Output sheet.
- **No API Calls:** Static UI, no Telegram API.

---

## 7.5 Configuration & Security

- **Manifest:** Universal action points to Home.Controller.Load.
- **Security:** No sensitive data; links are external but safe.

---

## 7.6 Edge Cases & Error Handling

- **No Data:** Falls back to defaults (e.g., empty token).
- **Premium Check:** Shows CTA if `!data.isPremium`.
- **Navigation:** Handles refresh parameter in `Load(e)`.
- **Errors:** Logged if app data fails to load.

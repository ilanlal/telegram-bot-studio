# Functional Specification Document (FSD) - Telegram Bot Studio Plugins.Home

## 1. Feature Overview

| Metadata | Details |
| :--- | :--- |
| **Feature Name** | Telegram Bot Studio Home Plugin |
| **Module** | [`src/Plugins.js`](../../src/Plugins.js) - `Plugins.Home` |
| **Priority** | High |
| **Status** | Completed |

### 1.1 Summary

The `Plugins.Home` object implements the entry-point dashboard for Telegram Bot Studio, a Google Workspace add-on. It provides a central hub for navigating to other plugins (e.g., GetMe, GetChat, Webhook), displaying bot connection status, and offering quick actions like settings and help. It integrates with the MVC pattern, using Controllers for logic, Views for CardService UI, and services for data persistence and logging.

---

## 2. User Stories & Rationale

**As a** Bot Developer  
**I want to** access a central dashboard in Google Sheets  
**So that** I can quickly navigate to bot management features and check connection status.

**As a** Google Workspace User  
**I want to** see an overview of available plugins and my premium status  
**So that** I can efficiently manage my Telegram bots without deep navigation.

### 2.1 Acceptance Criteria

- [x] Home plugin loads as the main entry point with connection status and plugin grid.
- [x] Displays available plugins (GetMe, GetChat, Webhook) with buttons to navigate.
- [x] Includes quick actions for Settings, Help, and About.
- [x] Shows premium CTA if not premium.
- [x] Integrates with PropertiesService for token checks and App.getData() for membership.

---

## 3. UI/UX Design (CardService)

The UI is built using Google Apps Script's CardService, rendering the sidebar dashboard. The Home plugin uses a single HomeCard with sections for status, plugins, and actions. Navigation pushes/pops cards for other plugins. Icons use Material Icons with `setFill(false)`. Colors are defined via `primaryColor()`, `secondaryColor()`, `accentColor()`.

### 3.1 Card Flow

1. **Entry Point:** Home plugin loads the main dashboard on add-on open.
2. **Status Display:** Shows connection status (connected/disconnected) with token info.
3. **Plugin Navigation:** Grid of buttons to push cards for GetMe, GetChat, Webhook.
4. **Quick Actions:** Buttons to push Help, About, or Settings cards.
5. **Premium Check:** Conditional CTA section if not premium.

### 3.2 Widget Specifications

**Home Card (`Plugins.Home.View.HomeCard`):**

- **Header:** Title: "Telegram Bot Studio", Subtitle: Package short_description, Image: Logo.
- **Section 1:** `WelcomeSection` (connection status via `Plugins.Connection.View.WelcomeSection`).
- **Section 2:** Grid of plugin buttons (e.g., GetMe, GetChat, Webhook) as DecoratedText with Open buttons.
- **Section 3:** Quick actions (Settings, Help, About) as ButtonSet.
- **Section 4 (Conditional):** Premium CTA if not premium.
- **Fixed Footer (Conditional):** "Upgrade to Premium" button if not premium.

---

## 4. Technical Implementation

### 4.1 Architecture (MVC Pattern)

- **Controller:** `Plugins.Home.Controller` with methods like `Load(e)` for rendering the HomeCard, `About()` and `Help()` for pushing related cards.
- **View:** `Plugins.Home.View` with `HomeCard(data)`, `AboutCard(data)`, `HelpCard(data)` for building cards.
- **Service/Model:** Integrates with `Plugins.Modules.App.getData()` for membership, `PropertiesService` for tokens, and `Plugins.Connection.View.WelcomeSection` for status.

### 4.2 Data Interactions

**Properties Service:**

- **UserProperties:** Retrieves `txt_bot_api_token`, `txt_bot_username`, etc., for connection status.

**App Module:**

- **getData():** Fetches membership info (isPremium, balance, expiresAt) for conditional UI.

**Navigation:**

- Uses `CardService.newNavigation()` to push/pop cards for plugins and actions.

---

## 5. Configuration & Security

### 5.1 AppScript Manifest (`appsscript.json`)

- **Universal Actions:** Home plugin as entry point.

### 5.2 Security Considerations

- No sensitive data displayed; tokens are checked but not exposed in UI.
- Premium checks ensure gated features are handled securely.

---

## 6. Edge Cases & Error Handling

- **No Token:** Connection status shows "OFFLINE"; plugin buttons disabled.
- **Premium Check:** CTA shown only if `isPremium` is false.
- **Navigation Errors:** Handled by CardService; logs via TerminalOutput if issues arise.
- **Data Fetching:** Falls back to defaults if properties are missing.

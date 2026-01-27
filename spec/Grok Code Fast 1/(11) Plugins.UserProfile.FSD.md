# Functional Specification Document (FSD) - Telegram Bot Studio Plugins.UserProfile

## 1. Feature Overview

| Metadata | Details |
| :--- | :--- |
| **Feature Name** | Telegram Bot Studio User Profile Plugin |
| **Module** | [`src/Plugins.js`](../../src/Plugins.js) - `Plugins.UserProfile` |
| **Priority** | High |
| **Status** | Completed |

### 1.1 Summary

The `Plugins.UserProfile` object implements account and membership management for Telegram Bot Studio, a Google Workspace add-on. It displays user details, handles premium upgrades, and manages subscription revocation. It integrates with PropertiesService for membership data and uses CardService for UI.

---

## 2. User Stories & Rationale

**As a** Bot Developer  
**I want to** manage my account and premium status  
**So that** I can access advanced features and track my subscription.

**As a** Google Workspace User  
**I want to** upgrade to premium or cancel my subscription  
**So that** I can control my access to paid features.

### 2.1 Acceptance Criteria

- [x] Displays user email and membership status.
- [x] Allows premium activation with 90-day trial.
- [x] Supports subscription revocation with confirmation.
- [x] Integrates with PropertiesService for membership storage.
- [x] Shows feature comparison for premium benefits.

---

## 3. UI/UX Design (CardService)

The UI is built using Google Apps Script's CardService, rendering a profile card. The plugin uses a single HomeCard with sections for membership and features. Navigation pushes the card and pops on actions. Icons use Material Icons with `setFill(false)`. Colors are defined via `primaryColor()`, `secondaryColor()`, `accentColor()`.

### 3.1 Card Flow

1. **Entry Point:** User clicks upgrade or accesses profile; pushes UserProfile card.
2. **Display:** Shows account info and membership status.
3. **Actions:** Upgrade or cancel subscription with confirmations.
4. **Feedback:** Notifications on success or error.

### 3.2 Widget Specifications

**Home Card (`Plugins.UserProfile.View.HomeCard`):**

- **Header:** Title: "Account Overview", Subtitle: User email, Image: Avatar.
- **Section 1:** Membership status (premium/free) with upgrade/cancel buttons.
- **Section 2:** Feature comparison (premium features list).
- **Footer:** None (actions in sections).

**buildMembershipSection (`Plugins.UserProfile.View.buildMembershipSection`):**

- **Widget:** DecoratedText for status, TextButton for actions.

---

## 4. Technical Implementation

### 4.1 Architecture (MVC Pattern)

- **Controller:** `Plugins.UserProfile.Controller` with methods like `Load(e)` for rendering, `ActivatePremium(e)` for upgrades, `RevokeLicense(e)` for cancellations.
- **View:** `Plugins.UserProfile.View` with `HomeCard(data)`, `buildMembershipSection(data)`.
- **Service/Model:** Integrates with `PropertiesService` for membership, `Session.getActiveUser()` for email.

### 4.2 Data Interactions

**Properties Service:**

- **UserProperties:** Stores `membership` JSON (type, expiresAt, balance).

**Session:**

- Retrieves active user email.

---

## 5. Configuration & Security

### 5.1 AppScript Manifest (`appsscript.json`)

- **Scopes:** None additional; relies on existing.

### 5.2 Security Considerations

- Membership data stored securely in UserProperties.
- No sensitive data exposed in UI.

---

## 6. Edge Cases & Error Handling

- **No Membership:** Defaults to free tier.
- **Activation Errors:** Logs to TerminalOutput; shows notification.
- **Revocation Errors:** Confirmation required; handles failures.
- **Session Errors:** Falls back to generic user info.

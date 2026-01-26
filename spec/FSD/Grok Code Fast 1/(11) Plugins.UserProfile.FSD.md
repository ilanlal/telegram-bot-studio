# 11. Plugin-Specific FSD: Plugins.UserProfile

## 11.1 Feature Overview

| Metadata | Details |
| :--- | :--- |
| **Feature Name** | Plugins.UserProfile |
| **Module** | [`src/Plugins.js`](../../../src/Plugins.js) |
| **Priority** | Medium |
| **Status** | Completed |

### 11.1.1 Summary

The `Plugins.UserProfile` object implements the User Profile plugin for Telegram Bot Studio. It allows users to view their account details, manage membership status, activate premium features with a trial, and revoke licenses. It integrates with the App module for premium checks and uses CardService for UI.

---

## 11.2 User Stories & Rationale

**As a** Google Workspace User  
**I want to** view my account status and membership details  
**So that** I can understand my current plan and access premium features.

**As a** New User  
**I want to** activate a free premium trial  
**So that** I can explore advanced bot tools without cost.

### 11.2.1 Acceptance Criteria

- [x] HomeCard loads with user email, membership status, and feature list.
- [x] ActivatePremium simulates a 90-day trial and updates properties.
- [x] RevokeLicense removes premium access after confirmation.
- [x] Membership section shows premium/free status with expiration.
- [x] Feature comparison lists premium benefits.
- [x] Errors logged to TerminalOutput and notified.

---

## 11.3 UI/UX Design (CardService)

The UI uses CardService for a profile card with sections for membership and features. Icons use Material Icons. Colors from `Plugins.primaryColor()`.

### 11.3.1 Card Flow

1. **Load:** Pushes the profile card with current data.
2. **Activate:** User clicks to start trial; updates status.
3. **Revoke:** Shows confirmation, then revokes.
4. **View:** Static display of features and status.

### 11.3.2 Widget Specifications

**HomeCard (`Plugins.UserProfile.View.HomeCard`):**

- **Header:** Title: "Account Overview", Subtitle: userEmail, Image: YOU_GOT_IT_IMG_URL.
- **Section 1:** `buildMembershipSection` (status and actions).
- **Section 2:** Feature comparison grid.

**buildMembershipSection:**

- **DecoratedText:** Plan badge (PREMIUM or FREE).
- **Button:** Activate or Revoke based on status.

---

## 11.4 Technical Implementation

### 11.4.1 Architecture (MVC Pattern)

- **Controller:** `Load(e)` renders card; `ActivatePremium(e)` sets trial; `RevokeLicense(e)` removes after confirmation.
- **View:** `HomeCard(data)` builds card; `buildMembershipSection(data)` creates status section.
- **Service/Model:** Uses `App.getData()` for status; `PropertiesService` for membership storage.

### 11.4.2 Data Interactions

- **PropertiesService:** Stores membership info (expiresAt, balance).
- **Session:** Gets user email.
- **No API:** Static UI, no external calls.

---

## 11.5 Configuration & Security

- **Manifest:** Accessible via premium CTA.
- **Security:** User-specific properties; no sensitive data.

---

## 11.6 Edge Cases & Error Handling

- **No Membership:** Shows free tier.
- **Expired Trial:** Reverts to free.
- **Revoke Without Premium:** No-op.
- **Confirmation:** Revoke requires user confirmation.
- **Errors:** Logged if property updates fail.
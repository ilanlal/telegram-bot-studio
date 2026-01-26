# 9. Plugin-Specific FSD: Plugins.ConfirmationCard

## 9.1 Feature Overview

| Metadata | Details |
| :--- | :--- |
| **Feature Name** | Plugins.ConfirmationCard |
| **Module** | [`src/Plugins.js`](../../src/Plugins.js) |
| **Priority** | Medium |
| **Status** | Completed |

### 9.1.1 Summary

The `Plugins.ConfirmationCard` object implements a reusable confirmation dialog plugin for Telegram Bot Studio. It standardizes user confirmations for destructive actions (e.g., disconnecting a bot, deleting a webhook) by displaying a modal-like card with a title, message, and Confirm/Cancel buttons. It dynamically executes a specified function on confirmation, using CardService for UI.

---

## 9.2 User Stories & Rationale

**As a** Bot Developer  
**I want to** confirm critical actions before execution  
**So that** I avoid accidental changes like disconnecting my bot or deleting webhooks.

**As a** Google Workspace User  
**I want to** see a clear dialog for confirmations  
**So that** I can safely proceed or cancel without unintended consequences.

### 9.2.1 Acceptance Criteria

- [x] Load action pushes a confirmation card with custom title, message, and buttons.
- [x] Confirm action executes the specified function with parameters.
- [x] Cancel action pops the card without changes.
- [x] Parameters passed via event object (title, message, onClickFunctionName, onClickParameters).
- [x] Errors in function execution are handled and logged.
- [x] UI uses PAY_ATTENTION_IMG_URL and standardized layout.

---

## 9.3 UI/UX Design (CardService)

The UI is a simple confirmation card built with CardService, pushed over the current card. It uses a header with image, a text paragraph for the message, and a fixed footer with Confirm (primary) and Cancel (secondary) buttons. Icons use Material Icons.

### 9.3.1 Card Flow

1. **Trigger:** Another plugin calls `ConfirmationCard.Controller.Load(e)` with parameters.
2. **Display:** Pushes the confirmation card.
3. **User Action:** Confirm executes the function; Cancel pops the card.
4. **Resolution:** On confirm, the function runs and may update navigation; on cancel, returns to previous card.

### 9.3.2 Widget Specifications

**HomeCard (`Plugins.ConfirmationCard.View.HomeCard`):**

- **Header:** Title: Custom (e.g., "Confirm Action"), Image: PAY_ATTENTION_IMG_URL.
- **Section 1:** TextParagraph with custom message.
- **Footer:** Primary button "Confirm" (calls Confirm action), Secondary button "Cancel" (calls Cancel action).

---

## 9.4 Technical Implementation

### 9.4.1 Architecture (MVC Pattern)

- **Controller:** `Load(e)` pushes the card; `Confirm(e)` resolves and executes the function; `Cancel(e)` pops the card.
- **View:** `HomeCard(data)` builds the card with parameters.
- **Service/Model:** No direct API calls; uses dynamic function execution via string path.

### 9.4.2 Data Interactions

- **Event Parameters:** Receives `title`, `message`, `onClickFunctionName`, `onClickParameters` from `e.commonEventObject.parameters`.
- **Function Execution:** Parses `onClickFunctionName` (e.g., "Plugins.Connection.Controller.Disconnect") and calls it with parameters.
- **No Sheet/API:** Static UI, no data persistence or external calls.

---

## 9.5 Configuration & Security

- **Manifest:** Accessible via other plugins' controllers.
- **Security:** Function names are validated implicitly; parameters are JSON-stringified for passing.

---

## 9.6 Edge Cases & Error Handling

- **Missing Parameters:** Throws error if `onClickFunctionName` is missing.
- **Invalid Function:** Catches execution errors, throws with message.
- **No Parameters:** Defaults to empty object.
- **Navigation:** Pops card on cancel; function handles its own navigation on confirm.

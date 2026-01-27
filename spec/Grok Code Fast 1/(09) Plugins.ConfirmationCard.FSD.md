# Functional Specification Document (FSD) - Telegram Bot Studio Plugins.ConfirmationCard

## 1. Feature Overview

| Metadata | Details |
| :--- | :--- |
| **Feature Name** | Telegram Bot Studio Confirmation Card Plugin |
| **Module** | [`src/Plugins.js`](../../src/Plugins.js) - `Plugins.ConfirmationCard` |
| **Priority** | High |
| **Status** | Completed |

### 1.1 Summary

The `Plugins.ConfirmationCard` object implements a reusable confirmation dialog for Telegram Bot Studio, a Google Workspace add-on. It standardizes user confirmations for destructive actions (e.g., disconnection, webhook deletion), using dynamic parameters for title, message, and action callbacks. It integrates with CardService for UI rendering and supports MVC patterns.

---

## 2. User Stories & Rationale

**As a** Bot Developer  
**I want to** confirm destructive actions before execution  
**So that** I avoid accidental changes to my bot configuration.

**As a** Google Workspace User  
**I want to** see clear confirmation prompts for risky operations  
**So that** I can proceed with confidence or cancel safely.

### 2.1 Acceptance Criteria

- [x] Displays customizable title, message, and buttons.
- [x] Executes specified function on confirm; cancels on dismiss.
- [x] Integrates with other plugins for actions like disconnect or delete.
- [x] Handles errors in action execution gracefully.

---

## 3. UI/UX Design (CardService)

The UI is built using Google Apps Script's CardService, rendering a modal-like confirmation dialog. The plugin uses a single HomeCard with dynamic content. Navigation pushes the card and pops on action. Icons use Material Icons with `setFill(false)`. Colors are defined via `primaryColor()`, `secondaryColor()`, `accentColor()`.

### 3.1 Card Flow

1. **Trigger**: Other plugins call `Load` with parameters for title, message, and action.
2. **Display**: Pushes confirmation card with confirm/cancel buttons.
3. **Confirm**: Executes the specified function with parameters.
4. **Cancel**: Pops the card without action.
5. **Result**: Returns to caller or shows notification.

### 3.2 Widget Specifications

**Home Card (`Plugins.ConfirmationCard.View.HomeCard`):**

- **Header:** Title: Dynamic (e.g., "Confirm Action"), Image: PayAttention icon.
- **Section 1:** TextParagraph with dynamic message.
- **Footer:** Primary button "Confirm" (executes action), Secondary button "Cancel" (pops card).

---

## 4. Technical Implementation

### 4.1 Architecture (MVC Pattern)

- **Controller:** `Plugins.ConfirmationCard.Controller` with methods like `Load(e)` for rendering with parameters, `Confirm(e)` for executing actions, `Cancel(e)` for dismissal.
- **View:** `Plugins.ConfirmationCard.View` with `HomeCard(data)` for building the dialog.
- **Service/Model:** Integrates with other plugins via dynamic function resolution and `PropertiesService` if needed.

### 4.2 Data Interactions

**Parameters:**

- **Input:** `title`, `message`, `onClickFunctionName`, `onClickParameters` via event object.
- **Execution:** Resolves `onClickFunctionName` to function and calls with parameters.

**Navigation:**

- Uses `CardService.newNavigation()` to push/pop cards.

---

## 5. Configuration & Security

### 5.1 AppScript Manifest (`appsscript.json`)

- **Scopes:** None additional; relies on existing.

### 5.2 Security Considerations

- Function execution is controlled; only predefined plugins can be called.
- No sensitive data in UI; parameters are validated.

---

## 6. Edge Cases & Error Handling

- **Invalid Function:** Throws error if `onClickFunctionName` cannot be resolved.
- **Missing Parameters:** Throws error for required fields.
- **Execution Errors:** Logs to TerminalOutput; shows notification.
- **Cancel:** No action taken; card pops safely.

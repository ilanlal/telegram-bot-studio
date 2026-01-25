# Functional Specification Document (FSD) - Feature Template

## 1. Feature Overview

| Metadata | Details |
| :--- | :--- |
| **Feature Name** | [e.g., Broadcast Message Wizard] |
| **Module** | [e.g., Plugins.Broadcast](../../../src/Plugins.js) |
| **Priority** | [High / Medium / Low] |
| **Status** | [Draft / In Progress / Completed] |

### 1.1 Summary

[Brief description of the feature. What does it do and why is it needed for Telegram Bot Studio?]

---

## 2. User Stories & Rationale

**As a** [Telegram Bot Creator]  
**I want to** [perform specific action in the sidebar]  
**So that** [benefit/outcome, e.g., I can send updates to all subscribers]

### 2.1 Acceptance Criteria

- [ ] User can access the feature from [Home Menu / Specific Context].
- [ ] The UI renders correctly in the sidebar.
- [ ] Successful execution results in [Expected Output].
- [ ] Errors are handled gracefully (e.g., Invalid Token toast).

---

## 3. UI/UX Design (CardService)

*Describe the visual interface constructed using `CardService`.*

### 3.1 Card Flow

1. **Entry Point:** [e.g., "Broadcast" Button on Homepage]
2. **Input Card:** [Form fields for message content]
3. **Confirmation Card:** [Summary of recipients]
4. **Result Card:** [Success message]

### 3.2 Widget Specifications

**Card: [Input_Form_Card]**

- **Header:** Title: "Send Broadcast", Subtitle: "Select audience"
- **Section 1 (Filters):**
  - `SelectionInput` (Dropdown): Select Sheet Column for User IDs.
  - `TextInput`: Filter criteria (optional).
- **Section 2 (Content):**
  - `TextInput` (Multiline): Message body.
- **Footer:**
  - `TextButton`: "Preview" (validation action).
  - `TextButton`: "Send" (submit action).

---

## 4. Technical Implementation

### 4.1 Architecture (MVC Pattern)

Based on `src/Plugins.js` structure:

- **Controller:** `Plugins.[Feature].Controller.Load()`
  - *Responsibility: Handle navigation, parse form inputs, route to business logic.*
- **View:** `Plugins.[Feature].View.CreateCard(data)`
  - *Responsibility: Build CardService objects.*
- **Service:** `Plugins.[Feature].Service.ExecuteAction(params)`
  - *Responsibility: Interact with Telegram API or SpreadsheetApp.*

### 4.2 Data Interactions

**Google Sheets (`SpreadsheetApp`):**

- **Read:** [Which columns? e.g., "Reads User IDs from Column A"]
- **Write:** [Which cells? e.g., "Writes Status to Column D"]

**Telegram API (`UrlFetchApp`):**

- **Endpoint:** `https://api.telegram.org/bot<token>/[method]`
- **Payload:** JSON structure required.

---

## 5. Configuration & Security

### 5.1 AppScript Manifest (`appsscript.json`)

Does this feature require modifying the manifest?

- [ ] **Scopes:** existing `spreadsheets.currentonly` is sufficient? Or need `spreadsheets` (all files)?
- [ ] **UrlFetchWhitelist:** Is a new domain being accessed? (Current: `api.telegram.org`)
- [ ] **Universal Actions:** Should this appear in the universal menu?

### 5.2 Settings / Properties

- Does this feature rely on `PropertiesService` (e.g., saved bot token)?

---

## 6. Edge Cases & Error Handling

- **Empty Sheet:** What if the active sheet has no data? -> *Display notification.*
- **Rate Limiting:** Telegram has limits (30 msg/sec). -> *Implement batching/sleep?*
- **User Permissions:** Is the user allowed to edit the sheet?

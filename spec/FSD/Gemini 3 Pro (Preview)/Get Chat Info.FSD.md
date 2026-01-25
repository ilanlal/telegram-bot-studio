# Functional Specification Document (FSD) - Get Chat Info

## 1. Feature Overview

| Metadata | Details |
| :--- | :--- |
| **Feature Name** | Get Chat Information (Inspector) |
| **Module** | [`Plugins.GetChat`](../../../src/Plugins.js) |
| **Telegram API** | `getChat` |
| **Priority** | Medium |
| **Status** | Draft |

### 1.1 Summary

The "Get Chat" feature serves as a diagnostic tool for bot developers. It allows the user to input a specific `chat_id` (or username like `@channelname`) and retrieve current metadata about that chat directly from the Telegram API. This is essential for debugging permissions, retrieving descriptions, or verifying chat types.

---

## 2. User Stories & Rationale

**As a** Bot Administrator
**I want to** check the details of a specific Chat ID or Channel Username
**So that** I can verify if my bot has access to it and view details like the chat title, description, and type.

### 2.1 Acceptance Criteria

- [ ] User can input a `chat_id` (integer) or `username` (string).
- [ ] Clicking "Search" triggers the `getChat` API method.
- [ ] **Success State:** A new card displays the JSON result in a readable format (Title, Type, Description, Photo ID).
- [ ] **Error State:** If the bot usually cannot find the chat (e.g., bot not a member of the private group), a clear error message is shown.

---

## 3. UI/UX Design (CardService)

*The interface is a sub-section of the "Tools" or "Home" menu.*

### 3.1 Card Flow

1. **Entry Point:** Dashboard -> "Tools" -> "Get Chat Info".
2. **Query Card:**
    - Displays an input field for the Chat ID.
    - "Get Info" Action button.
3. **Result Card:**
    - Shows a summary header (Chat Title).
    - Shows a Key-Value list of returned properties.
    - "Back" button to return to search.

### 3.2 Widget Specifications

**Card: `Plugins.GetChat.View.SearchCard`**

- **Header:** "Chat Inspector"
- **Section 1 (Input):**
  - `TextInput`:
    - Label: "Chat ID or Username"
    - Hint: "e.g., -100123456789 or @mychannel"
- **Footer:**
  - `TextButton`: "Search" (Action: `Plugins.GetChat.Controller.Execute`)

**Card: `Plugins.GetChat.View.ResultCard`**

- **Section 1 (Summary):**
  - `DecoratedText`:
    - TopLabel: [Chat Type] (e.g., "supergroup")
    - Text: [Chat Title]
    - BottomLabel: `id: [chat_id]`
- **Section 2 (Details):**
  - Grid or TextParagraph showing:
    - Description
    - Invite Link (if available)
    - Pinned Message ID (if available)

---

## 4. Technical Implementation

### 4.1 Architecture (MVC Pattern)

- **Controller:** `Plugins.GetChat.Controller`
  - `Load(e)`: Renders the SearchCard.
  - `Execute(e)`:
        1. Reads `chat_id` from form input.
        2. Validates input (not empty).
        3. Calls `Service.GetChatInfo(chat_id)`.
        4. If success: Pushes `ResultCard`.
        5. If fail: Returns Notification with error.

- **Service:** `Plugins.GetChat.Service` (or `TelegramBotClient`)
  - Method: `getChat(params)`
  - **API Endpoint:** `https://api.telegram.org/bot<token>/getChat`
  - **Payload:** `{ chat_id: <input_value> }`

- **View:** `Plugins.GetChat.View`
  - `CreateSearchCard()`: Builds the input form.
  - `CreateResultCard(jsonResponse)`: Parses the successful API response and builds the display card.

### 4.2 Data Interactions

- **Read:** No Sheet data required; purely an API lookup tool.
- **Write:** N/A (Read-only operation).

---

## 5. Configuration & Security

### 5.1 AppScript Manifest

- Requires `script.external_request` (existing).
- No additional scopes needed beyond standard bot connection.

---

## 6. Edge Cases & Error Handling

- **Bot Kicked/Not Member:** Telegram API often returns `Bad Request: chat not found` if the bot hasn't interacted with the chat before (for users) or isn't a member (for groups).
  - *Handling:* Catch specific 400 errors and display "Chat not found or Bot is not a member."
- **Invalid ID Format:** User enters non-numeric ID without @.
  - *Handling:* API returns error; display raw API error message (e.g., "Bad Request: chat_id is empty").

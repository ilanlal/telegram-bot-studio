# Functional Specification Document (FSD) - Bot Connection Flow

## 1. Feature Overview

| Metadata | Details |
| :--- | :--- |
| **Feature Name** | Bot Connection & Authentication Manager |
| **Module** | [`Plugins.Connection`](../../../src/Plugins.js) |
| **Priority** | High |
| **Status** | In Progress |

### 1.1 Summary

The Bot Connection module provides the interface for users to authenticate their Telegram Bots within the Google Workspace Add-on. It allows users to securely input their Bot API Token, validates the token against the Telegram API (`getMe`), and persists the session using `PropertiesService`. It serves as the prerequisite gateway for all other add-on functionalities (Webhooks, Chat Info, etc.).

---

## 2. User Stories & Rationale

**As a** Telegram Bot Creator  
**I want to** easily connect and disconnect my bot using the API Token provided by BotFather  
**So that** I can start managing my bot's settings and data directly from Google Sheets without manual script configuration.

### 2.1 Acceptance Criteria

- [ ] **Initial State:** If no token is saved, the Home/Connection card prompts the user to enter a token.
- [ ] **Validation:** Clicking "Connect" validates the token via a real `getMe` API call.
- [ ] **Feedback:**
  - **Success:** Visual confirmation (Green status/Checkmark), bot username displayed, and navigation updates to the Dashboard.
  - **Failure:** Error notification (Toast) if the token is invalid or the API request fails.
- [ ] **Persistence:** The token is securely stored in `UserProperties` so the user remains logged in across sessions.
- [ ] **Disconnection:** Users can unlink the current bot, which clears the stored token and returns the UI to the "Setup" state.
- [ ] **Guidance:** Includes a link to `@BotFather` for users who don't have a token yet.

---

## 3. UI/UX Design (CardService)

The UI is constructed using the `Plugins.Connection.View` object in `src/Plugins.js`.

### 3.1 Card Flow

1. **Entry Point:**
    - **Global:** If `txt_bot_api_token` property is missing, the Main Home Card defaults to a "Connect Bot" primary action.
    - **Menu:** User installs/opens the add-on -> "Connection" section.
2. **Connection Card (Disconnected):**
    - Displays input field for token.
    - "Connect" button (Primary).
    - "Need help?" section pointing to Telegram support.
3. **Connection Card (Connected):**
    - Displays "Connected as @username".
    - "Disconnect" button (Destructive/Secondary).
4. **Confirmation (On Disconnect):**
    - Interstitital card asking "Are you sure?" via `Plugins.ConfirmationCard`.

### 3.2 Widget Specifications

**Card: `Plugins.Connection.View.HomeCard`**

- **Header:**
  - Title: "Bot Connection Management"
  - Subtitle: Dynamic ("Connected: @botname" or "Setup Required")
  - Image: Connection Icon (`Plugins.Connection.imageUrl`)

- **Section 1 (Action & Status):**
  - **Widget:** `TextInput`
    - `FieldName`: "txt_bot_api_token"
    - `Title`: "🤖 Your Bot Token"
    - `Hint`: "123456:ABC-..."
  - **Widget:** `DecoratedText` (Help)
    - `Text`: "Need a Token?"
    - `Button`: "Open BotFather" (`OpenLink`)
- **Footer:**
  - **Button:** `TextButton` "Connect"
  - **Action:** Triggers `Plugins.Connection.Controller.Connect`
  - **Constraint:** `addRequiredWidget("txt_bot_api_token")`

---

## 4. Technical Implementation

### 4.1 Architecture (MVC Pattern)

- **Controller:** [`Plugins.Connection.Controller`](../../../src/Plugins.js)
  - `Load(e)`: Renders the HomeCard.
  - `Connect(e)`:
        1. Extracts token from form inputs.
        2. Instantiates `TelegramBotClient`.
        3. Calls `getMe()`.
        4. If valid, saves properties (`txt_bot_api_token`, `txt_bot_username`).
        5. Updates card.
    - `ConfirmDisconnect(e)`: Pushes `Plugins.ConfirmationCard`.
    - `Disconnect(e)`: Clears properties and reloads view.

- **View:** [`Plugins.Connection.View`](../../../src/Plugins.js)
  - `HomeCard(data)`: Builds the form.
  - `WelcomeSection(data)`: Reusable widget for other plugins (Home, Webhook) to show small status banner.
  - `BuildTokenTextInputWidget(token, hidden)`: Helper for the input field.

- **Service:** [`TelegramBotClient`](../../../src/lib/TelegramBotClient.js)
- `getMe()`: Used for validation.

### 4.2 Data Interactions

**Properties Service (`UserProperties`):**

- **Write keys:**
  - `txt_bot_api_token`: The API Key.
  - `txt_bot_username`: Cache for display.
  - `txt_bot_friendly_name`: Cache for display.
- **Read keys:** Used by all other plugins to authenticate requests.

**Telegram API:**

- **Endpoint:** `https://api.telegram.org/bot<token>/getMe`
- **Method:** GET/POST

---

## 5. Configuration & Security

### 5.1 AppScript Manifest

- **Scopes:** `https://www.googleapis.com/auth/script.external_request` is required for `UrlFetchApp`.
- **Whitelist:** `https://api.telegram.org/` must be in `urlFetchWhitelist`.

### 5.2 Security Considerations

- **Token Storage:** Token is stored in `UserProperties`, which is private to the specific Google user running the add-on. It is *not* stored in `ScriptProperties` or `DocumentProperties` (which might be shared).
- **Input Masking:** `TextInput` in CardService does not strictly support password masking (dots), so the token is visible during entry (Standard Apps Script limitation).

---

## 6. Edge Cases & Error Handling

- **Empty Input:** `Connect` action checks `if (!inputToken)` -> throw Error "Token cannot be empty".
- **Invalid Token:** API returns `ok: false`. Controller catches error -> returns `CardService.newNotification()` with "Invalid Token".
- **Network Failure:** `UrlFetchApp` exception -> Log to Terminal Output -> Show Toast to user.

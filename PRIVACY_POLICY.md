# Privacy Policy for Telegram Bot Studio

Last Updated: January 20, 2026

1. Introduction
Telegram Bot Studio ("we," "our," or "the Add-on") is a Google Workspace Add-on designed to help users manage Telegram Bots directly from Google Sheets. This Privacy Policy explains how we handle your data, specifically focusing on the permissions required to operate the service.
2. Data We Collect and How We Use It
The Add-on requires specific permissions to function. Here is a breakdown of what data we access and why:
Telegram Bot Tokens:
Collection: We collect the Telegram Bot API Token that you manually input into the "Connection" card.
Storage: This token is stored locally within your Google account's PropertiesService.getUserProperties(). It is never sent to our servers or any third-party server other than the official Telegram API (api.telegram.org) for the purpose of authentication.
Usage: The token is used strictly to make authorized requests to Telegram (e.g., getMe, getChat, setWebhook) on your behalf.
Google Sheets Data:
Access: The Add-on requests the spreadsheets.currentonly scope. This means it can only access and modify the specific spreadsheet where you have activated the Add-on.
Usage: We use this permission to write execution logs and API responses to a sheet named "💻 Terminal Output" for your debugging purposes. We do not read or analyze the content of your other cells unless explicitly triggered by an action you perform.
User Identity:
Access: We access your email address via Session.getActiveUser().getEmail().
Usage: This is displayed on the "User Profile" card solely to confirm which account is currently signed in. We do not store or share your email address for marketing purposes.
3. Data Sharing and Third-Party Services
Telegram API: The Add-on communicates directly with <https://api.telegram.org> to fetch bot data and manage webhooks. Your Bot Token and any data you choose to send (e.g., message content) are transmitted securely to Telegram.
Google Services: The Add-on runs on Google Apps Script infrastructure. Google collects operational data (like execution logs) as per the Google Cloud Privacy Notice.
No Other Third Parties: We do not sell, trade, or transfer your data to outside parties.
4. Data Retention
Bot Tokens: Your Bot Token remains stored in your User Properties until you explicitly click the "Disconnect" button in the Add-on, which deletes the property.
Logs: Data written to the "💻 Terminal Output" sheet remains in your Google Sheet until you manually delete the rows or the sheet itself.
5. User Rights and Control
Revoke Access: You can revoke the Add-on's access to your Google Account at any time via the Google Security Checkup.
Delete Data: You can delete your stored Bot Token by using the "Disconnect" feature within the Add-on's "Connection" card.
6. Changes to This Policy
We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
7. Contact Us
If you have any questions about this Privacy Policy, please contact us at:
Developer: Ilan Laloum
Website: <https://easyadm.com>
GitHub Repository: <https://github.com/ilanlal/telegram-bot-studio>

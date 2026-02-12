/**
 * @version 4.0.0
 * @file TelegramBotClient.gs
 * @author Ilan Laloum <ilanlal@gmail.com> (https://github.com/ilanlal)
 * @license MIT
 * 
 * @see https://github.com/ilanlal/telegram-bot-studio
 */

class TelegramBotClient {
  constructor(botToken = '[YOUR_BOT_TOKEN]') {
    this.telegramEnpBaseUrl = "https://api.telegram.org/bot" + botToken;
  }

  setMyName({ name, language_code }) {
    const data = {
      'method': "post",
      'payload': {
        'name': name,
        'language_code': language_code ?? ''
      }
    };
    const url = this.getApiBaseUrl() + "/setMyName";
    return UrlFetchApp.fetch(url, data);

  }

  setMyDescription({ description, language_code }) {
    const data = {
      'method': "post",
      'payload': {
        'description': description,
        'language_code': language_code
      }
    };
    const url = this.getApiBaseUrl() + "/setMyDescription";
    return UrlFetchApp.fetch(url, data);
  }

  setMyShortDescription({ short_description, language_code }) {
    const data = {
      'method': "post",
      'payload': {
        'short_description': short_description,
        'language_code': language_code
      }
    };
    const url = this.getApiBaseUrl() + "/setMyShortDescription";
    return UrlFetchApp.fetch(url, data);
  }

  /**
  * Set the list of the bot's commands. See https://core.telegram.org/bots/api#botcommand for details on the command structure.
  * @param {Object} params - The parameters for setting the bot's commands.
  * @param {Array} params.commands - The list of commands to set.
  * @param {string} [params.language_code] - The language code for the commands.
  * @param {Object} [params.scope] - The scope of the commands.
  * @see https://core.telegram.org/bots/api#setmycommands
  * @throws {Error} If the commands parameter is empty.
  * @returns {HTTPResponse} The response from the API.
  *
  */
  setMyCommands({ commands = [], language_code, scope }) {
    if (commands.length === 0) {
      throw new Error("commands is required!");
    }
    const data = {
      'method': "post",
      'payload': {
        //'scope': scope,
        'commands': JSON.stringify(commands),
        'language_code': language_code
      }
    };
    const url = this.getApiBaseUrl() + "/setMyCommands";
    return UrlFetchApp.fetch(url, data);
  }

  getMe() {
    const url = this.getApiBaseUrl() + "/getMe";
    return UrlFetchApp.fetch(url);
  }

  getApiBaseUrl() {
    return this.telegramEnpBaseUrl;
  }

  /**
   * @see https://core.telegram.org/bots/api#getwebhookinfo
   **/
  getWebhookInfo() {
    const url = this.getApiBaseUrl() + "/getWebhookInfo";

    return UrlFetchApp.fetch(url);
  }

  /**
   * @see https://core.telegram.org/bots/api#setwebhook
   **/
  setWebhook(webAppUrl, payload) {
    if (!webAppUrl) {
      throw new Error("webAppUrl parameter is null or empty!");
    }

    // Simple setWebhook without extra payload
    if (!payload) {
      const url = this.getApiBaseUrl() + "/setWebhook?url=" + webAppUrl;
      return UrlFetchApp.fetch(url);
    }

    // setWebhook with extra payload
    const url = this.getApiBaseUrl() + "/setWebhook";
    const data = {
      'method': "post",
      'payload': {
        ...payload,
        // re-write url parameter if exists within payload
        'url': webAppUrl
      }
    };
    return UrlFetchApp.fetch(url, data);
  }

  /**
   * @see https://core.telegram.org/bots/api#deletewebhook
   **/
  deleteWebhook(drop_pending_updates = false) {
    const url = this.getApiBaseUrl() + "/deleteWebhook";
    const data = {
      'method': "post",
      'payload': {
        'drop_pending_updates': drop_pending_updates
      }
    };
    return UrlFetchApp.fetch(url, data);
  }

  getChat(chat_id) {
    const url = `${this.getApiBaseUrl()}/getChat?chat_id=${chat_id}`;
    return UrlFetchApp.fetch(url);
  }

  /**
   * @see https://core.telegram.org/bots/api#getbusinessconnection
   **/
  getBusinessConnection(business_connection_id) {
    const url = `${this.getApiBaseUrl()}/getBusinessConnection?business_connection_id=${business_connection_id}`;
    return UrlFetchApp.fetch(url);
  }

  /**
   * Executes a custom API request to the Telegram Bot API.
   * @param {string} uriAction - The API method to call.
   * @param {Object} [payload] - The payload for the API request.
   * @returns {HTTPResponse} The response from the API.
   **/
  executeApiRequest(uriAction, payload) {
    const url = this.apiBaseUrl + '/' + uriAction;

    // If no payload, do a simple GET request
    if (!payload) {
      return UrlFetchApp.fetch(url);
    }

    // Otherwise, do a POST request with JSON payload
    const options = {
      'method': 'post',
      'contentType': 'application/json',
      'payload': JSON.stringify(payload)
    };

    return UrlFetchApp.fetch(url, options);
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    TelegramBotClient
  };
}

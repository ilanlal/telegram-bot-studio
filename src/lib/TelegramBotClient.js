/**
 * @version 1.0.0-remastered
 * @file TelegramBotClient.gs
 * @author Ilan Laloum <ilanlal@gmail.com> (https://github.com/ilanlal)
 * @license MIT
 * 
 * This class provides methods to interact with the Telegram Bot API, allowing you to send messages, photos, and other media to users via a Telegram bot.
 * 
 * @example
 * const botToken = '[YOUR_BOT_TOKEN]';
 * const chat_id = '[YOUR_CHAT_ID]';
 * const botClient = new TelegramBotClient(botToken);
 * 
 * botClient.sendMessage({
 *  chat_id: chat_id,
 *  text: "Hi.. this is test"
 * });
 * 
 * @see https://github.com/ilanlal/basic-telegram-bot-remastered
 */

class TelegramBotClient {
  /**
   * @param {string} botToken The bot token from the Telegram Bot API.
   * @constructor
   * @example
   * const botToken = [YOUR_BOT_TOKEN];
   * const botClient = new TelegramBotClient(botToken);
   */
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
   * @see https://core.telegram.org/bots/api#setmycommands
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
   * V8.2
   * Use this method to get current webhook status. Requires no parameters. On success, returns a WebhookInfo object. If the bot is using getUpdates, will return an object with the url field empty.
   * @see https://core.telegram.org/bots/api#getwebhookinfo
   * @returns {object} The response from the API endpoint.
   **/
  getWebhookInfo() {
    const url = this.getApiBaseUrl() + "/getWebhookInfo";

    return UrlFetchApp.fetch(url);
  }

  /**
   * V8.2
   * Use this method to set a new webhook for the bot. Requires the URL to be set. Returns True on success.
   * @see https://core.telegram.org/bots/api#setwebhook
   * @param {string} webAppUrl The URL of the web app.
   * @returns {Response|} The response from the API endpoint.
   **/
  setWebhook(webAppUrl) {
    if (webAppUrl) {
      const url = this.getApiBaseUrl() + "/setWebhook?url=" + webAppUrl;
      return UrlFetchApp.fetch(url);
    }
    else {
      throw new Error("webAppUrl paramter is null or empty!");
    }
  }

  /**
   * V8.2
   * Use this method to delete the webhook for the bot. Requires no parameters. Returns True on success.
   * @see https://core.telegram.org/bots/api#deletewebhook
   * @param {string} webAppUrl The URL of the web app.
   * 
   * @returns {object} The response from the API endpoint.
   **/
  deleteWebhook(webAppUrl) {
    if (webAppUrl) {
      const url = this.getApiBaseUrl() + "/deleteWebhook?url=" + webAppUrl;
      const response = UrlFetchApp.fetch(url);
      return response;
    }
    else {
      throw new Error("webAppUrl paramter is null or empty!");
    }
  }

  getChat(chat_id) {
    const url = `${this.getApiBaseUrl()}/getChat?chat_id=${chat_id}`;
    return UrlFetchApp.fetch(url);
  }

  getBusinessConnection(business_connection_id) {
    const url = `${this.getApiBaseUrl()}/getBusinessConnection?business_connection_id=${business_connection_id}`;
    return UrlFetchApp.fetch(url);
  }
}

TelegramBotClient.newClient = function (token = '[YOUR_BOT_TOKEN]') {
  return new TelegramBotClient(token);
};

class TelegramBotClientFactory {

  constructor() {
    this.token = '[YOUR_BOT_TOKEN]';
  }

  withToken(token = '[YOUR_BOT_TOKEN]') {
    this.token = token;
    return this;
  }

  create() {
    return new TelegramBotClient(this.token);
  }

  static newTelegramBotClientFactory() {
    return new TelegramBotClientFactory();
  }
}


if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    TelegramBotClient,
    TelegramBotClientFactory
  };
}

// src/config/Plugins.js
class Plugins {
    static primaryColor() {
        return '#1976d2';
    }

    static secondaryColor() {
        return '#0f9d58';
    }

    static accentColor() {
        return '#f4b400';
    }
};

Plugins.Media = {
    DEFAULT_IMAGE_URL: 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/google-workspace-marketplace/220x220.png',
    WELCOME_IMG_URL: 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/google-workspace-marketplace/480x480_welcome.png',
    MATH_IMG_URL: 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/bitmoji-math.webp',
    THANK_YOU_IMG_URL: 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/bitmoji-thank-you.webp',
    YOU_GOT_IT_IMG_URL: 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/bitmoji-you-got-it.webp',
    BIG_TIME_IMG_URL: 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/bitmoji-big-time.webp',
    PEACH_IMG_URL: 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/bitmoji-peach.webp',
    HAVE_A_NICE_DAY_IMG_URL: 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/bitmoji-have-a-nice-day.webp',
    I_AM_THINKING_IMG_URL: 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/bitmoji-i-am-thinking.webp',
    WAIT_FOR_IT_IMG_URL: 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/bitmoji-wait-for-it.webp',
    YES_IMG_URL: 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/bitmoji-yes.webp',
    PAY_ATTENTION_IMG_URL: 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/bitmoji-pay-attention.webp',
    KISS_IMG_URL: 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/bitmoji-kiss.webp',
    CHEERS_IMG_URL: 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/bitmoji-cheers.webp',
    BLINK_IMG_URL: 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/bitmoji-blink.webp',
    LOGO_PNG_URL: 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/google-workspace-marketplace/128x128.png'
};

Plugins.Package = {
    name: 'Telegram Bot Studio (TBS)',
    short_description: 'A suite of tools for building Telegram Bots on Google Workspace.',
    description: 'A collection of plugins for building Telegram Bots using Telegram Bot Studio on Google Workspace.',
    version: '1.1.0',
    build: '20260404.232000',
    author: 'Ilan Laloum',
    license: 'MIT',
    imageUrl: Plugins.Media.LOGO_PNG_URL,
    gitRepository: 'https://github.com/ilanlal/telegram-bot-studio'
};

Plugins.INPUT = {
    get SYSTEM() {
        return {
            get LANGUAGE_CODE() {
                return 'language_code';
            },
            get MEMBERSHIP() {
                return {
                    get MEMBERSHIP_KEY() {
                        return 'membership';
                    },
                    get IS_PREMIUM() {
                        return 'IS_PREMIUM';
                    },
                    get BALANCE() {
                        return 'BALANCE';
                    },
                    get EXPIRES_AT() {
                        return 'EXPIRES_AT';
                    },
                }
            }
        }
    },
    get GEMINI() {
        return {
            get GEMINI_API_KEY() {
                return 'GEMINI_API_KEY';
            },
            get GEMINI_MODEL() {
                return 'GEMINI_MODEL';
            },
            get GEMINI_TEMPERATURE() {
                return 'GEMINI_TEMPERATURE';
            },
            get GEMINI_MOOD() {
                return 'GEMINI_MOOD';
            },
            get THINKING_LEVEL() {
                return 'THINKING_LEVEL';
            },
            get THINKING_BUDGET() {
                return 'THINKING_BUDGET';
            },
            get INSTRUCTION_CELL_REFERENCE() {
                return 'INSTRUCTION_CELL_REFERENCE';
            }
        };
    },
    get TELEGRAM_BOT() {
        return {
            get BOT_API_TOKEN() {
                return 'BOT_API_TOKEN';
            },
            get CHAT_ID() {
                return 'CHAT_ID';
            },
            get BOT_FRIENDLY_NAME() {
                return 'BOT_FRIENDLY_NAME';
            },
            get BOT_USERNAME() {
                return 'BOT_USERNAME';
            },
            get BOT_API_ENDPOINT_URL() {
                return 'BOT_API_ENDPOINT_URL';
            },
            get BOT_WEBHOOK_URL() {
                return 'BOT_WEBHOOK_URL';
            },
            get BOT_IP_ADDRESS() {
                return 'BOT_IP_ADDRESS';
            },
            get BOT_MAX_CONNECTIONS() {
                return 'BOT_MAX_CONNECTIONS';
            },
            get BOT_SECRET_TOKEN() {
                return 'BOT_SECRET_TOKEN';
            },
            get DROP_PENDING_UPDATES() {
                return 'DROP_PENDING_UPDATES';
            },
        };
    },
    get MCP() {
        return {
            get MCP_API_KEY() {
                return 'MCP_API_KEY';
            }
        }
    }
};

Plugins.PROPERTIES = {
    get enable_event_logging() {
        return 'enable_event_logging';
    },

    get indentation_spaces() {
        return 'indentation_spaces';
    },
    get show_errors_switch() {
        return 'show_errors_switch';
    },
    get highlight_color() {
        return 'highlight_color';
    },
    get terminal_output_switch() {
        return 'terminal_output_switch';
    },
    get focus_terminal_output() {
        return 'focus_terminal_output';
    },
    get ignore_whitespace_switch() {
        return 'ignore_whitespace_switch';
    },
    get chk_export_token_to_sheet() {
        return 'chk_export_token_to_sheet';
    },
    get txt_secret_private_key() {
        return 'txt_secret_private_key';
    },
    get praittfy_json() {
        return 'praittfy_json';
    },
    get txt_search_chat_id() {
        return 'txt_search_chat_id';
    },
    get drop_pending_updates() {
        return 'drop_pending_updates';
    }
};

Plugins.Modules = {
    App: {
        getData() {
            const INP = Plugins.PROPERTIES;
            const MDL = Plugins.Modules;
            const userProperties = PropertiesService.getDocumentProperties();
            const membershipInfo = Plugins.Modules.CRM.Membership.getMembershipInfo() || {};

            const expiresAt = membershipInfo[Plugins.INPUT.SYSTEM.MEMBERSHIP.EXPIRES_AT] ? new Date(membershipInfo[Plugins.INPUT.SYSTEM.MEMBERSHIP.EXPIRES_AT]) : null;
            const balance = membershipInfo[Plugins.INPUT.SYSTEM.MEMBERSHIP.BALANCE] || 0;
            const isPremium = (expiresAt && expiresAt > new Date()) || balance > 0;
            const indentationSpaces = userProperties.getProperty(INP.indentation_spaces) || '4';
            const showErrorsSwitch = userProperties.getProperty(INP.show_errors_switch) || 'OFF';
            const highlightColor = userProperties.getProperty(INP.highlight_color) || '#FFFF00';
            const terminalOutputSwitch = userProperties.getProperty(INP.terminal_output_switch) || 'ON';
            const focusTerminalOutput = 'OFF';
            const ignoreWhitespaceSwitch = userProperties.getProperty(INP.ignore_whitespace_switch) || 'ON';
            const geminiApiKey = MDL.GeminiAgent.getApiKey();
            const apiResponseModel = MDL.GeminiAgent.getModel();
            const instructionCellReference = PropertiesService.getDocumentProperties().getProperty(Plugins.INPUT.GEMINI.INSTRUCTION_CELL_REFERENCE) || '';
            const botApiToken = Plugins.Modules.TelegramBotSettings.getUserApiKey();

            let result = { ok: false, description: 'Not connected. Please enter your bot token to fetch webhook info.' };
            if (botApiToken) {
                const telegramBotClient = new Plugins.Modules.TelegramBotClient(botApiToken);
                const response = telegramBotClient.getWebhookInfo();

                if (JSON.parse(response.getContentText()).ok !== true) {
                    result = { error: 'Unable to fetch webhook info. Please check your bot token and connection.' };
                } else {
                    // Parse the result
                    result = JSON.parse(response.getContentText()).result;
                }
            }

            const leds = Plugins.Modules.App.getLeds({
                telegramApiKeySet: !!botApiToken,
                geminiApiKeySet: !!geminiApiKey,
                llmModelSet: !!apiResponseModel,
                webhookSet: !!result.url,
                instructionCellSet: !!instructionCellReference,
                isPremium: isPremium,
            });

            return {
                indentation_spaces: parseInt(indentationSpaces, 10),
                show_errors_switch: showErrorsSwitch,
                highlight_color: highlightColor,
                terminal_output_switch: terminalOutputSwitch,
                focus_terminal_output: focusTerminalOutput,
                ignore_whitespace_switch: ignoreWhitespaceSwitch,
                // Telegram Bot Info
                [Plugins.INPUT.TELEGRAM_BOT.BOT_API_TOKEN]: botApiToken,
                // Gemini API Info
                [Plugins.INPUT.GEMINI.GEMINI_API_KEY]: geminiApiKey,
                [Plugins.INPUT.GEMINI.GEMINI_MODEL]: apiResponseModel,
                // Membership Info
                [Plugins.INPUT.SYSTEM.MEMBERSHIP.MEMBERSHIP_KEY]: membershipInfo,
                [Plugins.INPUT.SYSTEM.MEMBERSHIP.IS_PREMIUM]: isPremium,
                [Plugins.INPUT.SYSTEM.MEMBERSHIP.BALANCE]: balance,
                [Plugins.INPUT.SYSTEM.MEMBERSHIP.EXPIRES_AT]: expiresAt,
                // Gemini Instruction Cell Reference
                [Plugins.INPUT.GEMINI.INSTRUCTION_CELL_REFERENCE]: instructionCellReference,
                // Package Info
                package: Plugins.Package,
                leds: leds,
                webhookInfo: result
            };
        },
        getLeds(params = {
            telegramApiKeySet: false,
            geminiApiKeySet: false,
            llmModelSet: false,
            webhookSet: false,
            instructionCellSet: false,
            isPremium: false,
        }) {
            const ledsMap = [
                params.telegramApiKeySet ? '🟢' : '🔴',
                params.geminiApiKeySet ? '🟢' : '🔴',
                params.llmModelSet ? '🟢' : '🔴',
                params.webhookSet ? '🟢' : '🔴',
                params.instructionCellSet ? '🟢' : '🔴',
                params.isPremium ? '🟢' : '🔴',
            ];

            // Return string of leds.
            return ledsMap.join(' ');
        }
    },
    Sheet: {
        INVALID_MODEL_ERROR: 'Sheet model must have a valid name property',
        DUMP_SHEET_NAME: '📥 Data',

        initializeSheet(activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet(), sheetMeta = {}) {
            if (!sheetMeta.name) {
                throw new Error(Plugins.Modules.Sheet.INVALID_MODEL_ERROR);
            }

            let sheet = activeSpreadsheet.getSheetByName(sheetMeta.name);
            if (!sheet) {
                sheet = activeSpreadsheet.insertSheet(sheetMeta.name);

                if ((sheetMeta.columns || []).length > 0) {
                    sheet.appendRow(sheetMeta.columns);
                }
            }

            return sheet;
        },

        setActiveSheet(activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet(), sheetMeta = {}) {
            return activeSpreadsheet
                .setActiveSheet(this.getSheet(activeSpreadsheet, sheetMeta));
        },

        getSheet(activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet(), sheetMeta = {}) {
            return this._sheet = this.initializeSheet(activeSpreadsheet, sheetMeta);
        },

        bindSheetSampleData(activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet(), sheetMeta = {}) {
            const sampleData = sheetMeta.sample_data || [];
            if (sampleData.length === 0) {
                return;
            }

            const sheet = this.getSheet(activeSpreadsheet, sheetMeta);
            const existingValues = sheet.getDataRange().getValues() || [];

            // merge existing values with sample data (existing values first)
            const mergedValues = existingValues.concat(sampleData);

            // pad rows to match columns length
            const columnsLength = (sheetMeta.columns || []).length;
            for (let row = 0; row < mergedValues.length; row++) {
                while (mergedValues[row].length < columnsLength) {
                    mergedValues[row].push('');
                }
            }

            // set the merged values back to the sheet
            sheet.getRange(1, 1, mergedValues.length, mergedValues[0].length)
                .setValues(mergedValues);

            return sheet;
        },

        dumpObjectToSheet(activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet(), sheetMeta = {}, bot = '', action = '.', obj = {}, praittfyJson = false) {
            const sheet = this.getSheet(activeSpreadsheet, sheetMeta);
            const values = Object.values(obj);
            values.forEach((val, idx) => {
                // stringify objects and arrays
                if (typeof val === 'object') {
                    values[idx] = praittfyJson ? JSON.stringify(val, null, 2) : JSON.stringify(val);
                }
            });
            const row_data = [
                new Date().toISOString(),   // timestamp
                bot,                        // bot
                action,                     // action
                praittfyJson ? JSON.stringify(obj, null, 2) : JSON.stringify(obj),        // raw object data
                ...values                   // individual data fields
            ]
            // append data as a new row
            sheet.appendRow(row_data);

            // Set active selection to the last row
            const lastRow = sheet.getLastRow();
            const lastRowA1Notation = `A${lastRow}:E${lastRow}`;
            sheet.setActiveSelection(lastRowA1Notation);

            return sheet;
        }
    },
    TelegramBotClient: class {
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
            const url = this.getApiBaseUrl() + '/' + uriAction;

            // If no payload, do a simple GET request
            if (!payload) {
                return Plugins.Modules.TelegramBotClient.fetchApi(url);
            }

            // Otherwise, do a POST request with JSON payload
            const options = {
                'method': 'post',
                'contentType': 'application/json',
                'payload': JSON.stringify(payload)
            };

            return Plugins.Modules.TelegramBotClient.fetchApi(url, options);
        }

        static fetchApi(url, options) {
            if (!options) {
                return UrlFetchApp.fetch(url);
            }
            return UrlFetchApp.fetch(url, options);
        }
    },
    TelegramBotSettings: {
        getScriptApiKey() {
            return PropertiesService.getScriptProperties().getProperty(Plugins.INPUT.TELEGRAM_BOT.BOT_API_TOKEN);
        },
        setUserApiKey(apiKey) {
            PropertiesService.getDocumentProperties().setProperty(Plugins.INPUT.TELEGRAM_BOT.BOT_API_TOKEN, apiKey);
        },
        getUserApiKey() {
            return PropertiesService.getDocumentProperties().getProperty(Plugins.INPUT.TELEGRAM_BOT.BOT_API_TOKEN);
        },
        clearUserApiKey() {
            PropertiesService.getDocumentProperties().deleteProperty(Plugins.INPUT.TELEGRAM_BOT.BOT_API_TOKEN);
        }
    },
    TerminalOutput: class {
        static get SHEET_META() {
            return {
                name: '💻 Terminal Output',
                columns: ['Timestamp', 'Event', 'Model', 'Payload', 'Response', 'Prompt', 'Model Version', 'Generated Text', 'Total Tokens', 'Prompt Tokens', 'Thoughts Tokens', 'Cached Content Tokens', 'Candidates Tokens', 'Tool Use Prompt Tokens']
            };
        }

        static write(
            activeSpreadsheet, e, source, message, param1, param2, param3) {

            // Check if terminal output is enabled
            const terminalOutputEnabled = PropertiesService.getDocumentProperties()
                .getProperty(Plugins.PROPERTIES.terminal_output_switch) || 'OFF';

            // Check if terminal output is enabled
            const focusTerminalOutput = PropertiesService.getDocumentProperties()
                .getProperty(Plugins.PROPERTIES.focus_terminal_output) || 'OFF';

            if (terminalOutputEnabled !== 'ON') {
                return;
            }

            const sheet = Plugins.Modules.Sheet
                .getSheet(activeSpreadsheet, Plugins.Modules.TerminalOutput.SHEET_META);

            sheet.appendRow([
                // Created On as iso string
                new Date().toISOString(),
                // source
                source, // chat side
                // Message
                (typeof message === 'object' || Array.isArray(message)) ? JSON.stringify(message) : String(message || ''),
                // Event Object
                (typeof e === 'object' || Array.isArray(e)) ? JSON.stringify(e) : String(e || ''),
                // Details 
                (typeof param1 === 'object' || Array.isArray(param1)) ? JSON.stringify(param1) : String(param1 || ''),
                (typeof param2 === 'object' || Array.isArray(param2)) ? JSON.stringify(param2) : String(param2 || ''),
                (typeof param3 === 'object' || Array.isArray(param3)) ? JSON.stringify(param3) : String(param3 || '')
            ]);

            return sheet;
        }

        static writeGeminiResponse(
            activeSpreadsheet, eventObject, model, payload, response) {

            // Check if terminal output is enabled
            const terminalOutputEnabled = PropertiesService.getDocumentProperties()
                .getProperty(Plugins.PROPERTIES.terminal_output_switch) || 'ON';

            // Check if terminal output is enabled
            if (terminalOutputEnabled !== 'ON') {
                return;
            }

            const sheet = Plugins.Modules.Sheet
                .getSheet(activeSpreadsheet, this.SHEET_META);
            const genratedText = response?.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
            sheet.appendRow([
                // Created On as iso string
                new Date().toISOString(),
                // Event Object
                (typeof eventObject === 'object' || Array.isArray(eventObject)) ? JSON.stringify(eventObject) : String(eventObject || ''),
                // Mode (e.g., "gemini-3-flash-preview")
                model,
                // Payload
                (typeof payload === 'object' || Array.isArray(payload)) ? JSON.stringify(payload) : String(payload || ''),
                // Response
                (typeof response === 'object' || Array.isArray(response)) ? JSON.stringify(response) : String(response || ''),
                // Prompt (if available in payload)
                payload?.contents?.[0]?.parts?.[0]?.text || '',
                // Model Version (if available in response, otherwise use input model or default to 'unknown')
                response?.modelVersion || 'unknown',
                // Generated Text (if available in response) ({"candidates":[{"content":{"parts":[{"text": "generated text here"}]}}]})
                JSON.stringify(genratedText),
                // Total Token Count (if available in response.usageMetadata)
                response?.usageMetadata?.totalTokenCount || 0,
                // Prompt Token Count (if available in response.usageMetadata)
                response?.usageMetadata?.promptTokenCount || 0,
                // Thoughts Token Count (if available in response.usageMetadata)
                response?.usageMetadata?.thoughtsTokenCount || 0,
                // cachedContentTokenCount (if available in response.usageMetadata)
                response?.usageMetadata?.cachedContentTokenCount || 0,
                // candidatesTokenCount (if available in response.usageMetadata)
                response?.usageMetadata?.candidatesTokenCount || 0,
                // toolUsePromptTokenCount (if available in response.usageMetadata)
                response?.usageMetadata?.toolUsePromptTokenCount || 0
            ]);

            return sheet;
        }
    },
    LoggerModel: class {
        static get SHEET_META() {
            return {
                name: '📑 Event Log',
                columns: ['Timestamp', 'Source', 'Message', 'Event Object', 'More Info']
            };
        }

        static write(
            activeSpreadsheet, source, message, chatId, e, param1, param2, param3) {

            // Check if webhook event logging is enabled
            const webhookEventLoggingEnabled = PropertiesService.getDocumentProperties()
                .getProperty(Plugins.PROPERTIES.enable_event_logging) || 'OFF';

            if (webhookEventLoggingEnabled !== 'ON') {
                return;
            }

            const sheet = Plugins.Modules.Sheet
                .getSheet(activeSpreadsheet, Plugins.Modules.LoggerModel.SHEET_META);

            sheet.appendRow([
                // Created On as iso string
                new Date().toISOString(),
                // source
                source,
                // Message
                (typeof message === 'object' || Array.isArray(message)) ? JSON.stringify(message) : String(message || ''),
                // Event Object
                (typeof e === 'object' || Array.isArray(e)) ? JSON.stringify(e) : String(e || ''),
                // Chat ID
                chatId,
                // Details 
                (typeof param1 === 'object' || Array.isArray(param1)) ? JSON.stringify(param1) : String(param1 || ''),
                (typeof param2 === 'object' || Array.isArray(param2)) ? JSON.stringify(param2) : String(param2 || ''),
                (typeof param3 === 'object' || Array.isArray(param3)) ? JSON.stringify(param3) : String(param3 || '')
            ]);

            return sheet;
        }
    },
    JsonStudio: class {
        static get MAX_PROCESS_CELLS() {
            return 100;
        }

        static beautifyActiveRange(activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet(), indentationSpaces = 2, ignoreWhitespace = true) {
            const activeRange = activeSpreadsheet.getActiveSheet().getActiveRange();
            const report = [];

            // Ensure we do not exceed max process cells
            if (activeRange.getNumRows() * activeRange.getNumColumns() > this.MAX_PROCESS_CELLS) {
                throw new Error(`Selected range exceeds the maximum allowed cells (${this.MAX_PROCESS_CELLS}). Please select a smaller range.`);
            }

            // for each cell in range, beautify JSON
            activeRange.getValues().forEach((row, i) => {
                row.forEach((cell, j) => {
                    try {
                        // if cell is empty after cleaning, skip
                        if (ignoreWhitespace && this.trimValue(cell) === '') {
                            return; // Skip empty cells
                        }
                        const beautifiedJson = JSON.stringify(
                            JSON.parse(cell),
                            null,
                            indentationSpaces
                        );
                        activeRange.getCell(i + 1, j + 1).setValue(beautifiedJson);
                    } catch (error) {
                        // Handle JSON parsing error if needed
                        report.push({
                            a1n: activeRange.getCell(i + 1, j + 1).getA1Notation(),
                            sheetName: activeSpreadsheet.getActiveSheet().getName(),
                            error: error.message
                        });
                    }
                });
            });

            return { range: activeRange, report };
        }

        static minifyActiveRange(activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet(), ignoreWhitespace = true) {
            const activeRange = activeSpreadsheet.getActiveSheet().getActiveRange();
            const report = [];
            // Ensure we do not exceed max process cells
            if (activeRange.getNumRows() * activeRange.getNumColumns() > this.MAX_PROCESS_CELLS) {
                throw new Error(`Selected range exceeds the maximum allowed cells (${this.MAX_PROCESS_CELLS}). Please select a smaller range.`);
            }
            // for each cell in range, minify JSON
            activeRange.getValues().forEach((row, i) => {
                row.forEach((cell, j) => {
                    try {
                        // if cell is empty after cleaning, skip
                        if (ignoreWhitespace && this.trimValue(cell) === '') {
                            return; // Skip empty cells
                        }
                        const minifiedJson = JSON.stringify(JSON.parse(cell));
                        activeRange.getCell(i + 1, j + 1).setValue(minifiedJson);
                    } catch (error) {
                        // Handle JSON parsing error if needed
                        report.push({
                            a1n: activeRange.getCell(i + 1, j + 1).getA1Notation(),
                            sheetName: activeSpreadsheet.getActiveSheet().getName(),
                            error: error.message
                        });
                    }
                });
            });

            return { range: activeRange, report };
        }

        static validateActiveRange(activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet(), ignoreWhitespace = true) {
            const activeRange = activeSpreadsheet.getActiveSheet().getActiveRange();
            const report = [];
            // Ensure we do not exceed max process cells
            if (activeRange.getNumRows() * activeRange.getNumColumns() > this.MAX_PROCESS_CELLS) {
                throw new Error(`Selected range exceeds the maximum allowed cells (${this.MAX_PROCESS_CELLS}). Please select a smaller range.`);
            }
            // for each cell in range, validate JSON
            activeRange.getValues().forEach((row, i) => {
                row.forEach((cell, j) => {
                    try {
                        // if cell is empty after cleaning, skip
                        if (ignoreWhitespace && this.trimValue(cell) === '') {
                            return; // Skip empty cells
                        }
                        JSON.parse(cell);
                    } catch (error) {
                        report.push({
                            a1n: activeRange.getCell(i + 1, j + 1).getA1Notation(),
                            sheetName: activeSpreadsheet.getActiveSheet().getName(),
                            error: error.message
                        });
                    }
                });
            });

            return { range: activeRange, report };
        }

        static trimValue(value) {
            if (typeof value === 'string') {
                return value.trim()
                    .replace(/^\uFEFF/, '') // Remove BOM if present
                    .replace(/\n/g, '') // Remove newlines
                    .replace(/\s+/g, ''); // Remove all whitespace
            }
            return value;
        }
    },
    GeminiApiClient: {

        get API_ENDPOINT_URL() {
            return 'https://generativelanguage.googleapis.com/v1beta/models/';
        },
        /**
         * Generates content using the Gemini API.
         * @param {string} apiKey - The API key for authentication.
         * @param {string} model - The model name to use for content generation.
         * @param {{}} payload - The payload to send in the request.
         * @returns {{}} - The response content from the Gemini API.
         * @throws {Error} - If the API request fails.
         */
        generateContent(apiKey, model, payload) {
            const url = `${this.API_ENDPOINT_URL}${model}:generateContent`;
            const options = {
                method: 'POST',
                contentType: 'application/json',
                headers: {
                    'x-goog-api-key': apiKey,
                },
                payload: JSON.stringify(payload)
            };

            let response;
            try {
                response = UrlFetchApp.fetch(url, options);
                // Log the full response for debugging purposes

                if (response && response.getResponseCode() === 200) {
                    const responseData = JSON.parse(response.getContentText());
                    Plugins.Modules.TerminalOutput.writeGeminiResponse(SpreadsheetApp.getActiveSpreadsheet(), options, model, payload, responseData);
                    return responseData;
                } else if (response) {
                    throw new Error(`GeminiApiClient request failed with status ${response.getResponseCode()}: ${response.getContentText()}`);
                } else {
                    throw new Error('GeminiApiClient request failed with no response');
                }
            } catch (error) {
                // Log the error for debugging purposes
                Plugins.Modules.TerminalOutput.writeGeminiResponse(
                    SpreadsheetApp.getActiveSpreadsheet(),
                    { url, options },
                    model,
                    payload,
                    { error: error.message }
                );
                throw error;
            }


        }
    },
    GeminiAgent: {
        get MODELS() {
            return {
                'gemini-3-flash-preview': 'gemini-3-flash-preview',
                'gemini-2.5-pro': 'gemini-2.5-pro'
            };
        },
        get DEFAULT_MODEL() {
            return this.MODELS["gemini-3-flash-preview"];
        },
        get THINKING_LEVEL_OPTIONS() {
            return ['MINIMAL', 'LOW', 'MEDIUM', 'HIGH'];
        },
        get MOOD_OPTIONS() {
            return ['Helpful and concise', 'Professional and detailed', 'Creative and imaginative', 'Friendly and casual', 'Formal and respectful', 'Enthusiastic and energetic', 'Calm and reassuring', 'Neutral'];
        },
        getScriptApiKey() {
            return PropertiesService.getScriptProperties()
                .getProperty(Plugins.INPUT.GEMINI.GEMINI_API_KEY);
        },
        getScriptModel() {
            return PropertiesService.getScriptProperties().getProperty(Plugins.INPUT.GEMINI.GEMINI_MODEL) || this.DEFAULT_MODEL;
        },
        saveApiKey(apiKey) {
            PropertiesService.getDocumentProperties()
                .setProperty(Plugins.INPUT.GEMINI.GEMINI_API_KEY, apiKey);
        },
        getApiKey() {
            return PropertiesService.getDocumentProperties()
                .getProperty(Plugins.INPUT.GEMINI.GEMINI_API_KEY);
        },
        clearApiKey() {
            PropertiesService.getDocumentProperties()
                .deleteProperty(Plugins.INPUT.GEMINI.GEMINI_API_KEY);
        },
        saveModel(model) {
            PropertiesService.getDocumentProperties().setProperty(Plugins.INPUT.GEMINI.GEMINI_MODEL, model);
        },
        getModel() {
            return PropertiesService.getDocumentProperties().getProperty(Plugins.INPUT.GEMINI.GEMINI_MODEL) || this.DEFAULT_MODEL;
        },
        clearModel() {
            PropertiesService.getDocumentProperties().deleteProperty(Plugins.INPUT.GEMINI.GEMINI_MODEL);
        },
        _fromRow(row = []) {
            // Convert row array into instruction object based on column order
            return {
                name: row?.[0] || 'New Agent',
                model: row?.[1] || this.DEFAULT_MODEL,
                prompt: row?.[2] || ''
            };

        },
        _toRow(agent_meta = {}) {
            // Convert instruction object into row array based on column order
            return [
                agent_meta.name || 'New Agent',
                agent_meta.model || this.DEFAULT_MODEL,
                agent_meta.prompt || ''
            ];
        },
    },
    CRM: {
        // Inner Customer class
        Customer: {
            get COLUMNS() {
                return {
                    created_on: 'Created on',
                    chat_id: 'Chat ID',
                    username: 'Username',
                    first_name: 'First Name',
                    last_name: 'Last Name',
                    language_code: 'Language Code',
                    is_bot: 'Is Bot',
                    data: 'Data'
                };
            },
            get CUSTOMERS_SHEET_META() {
                return {
                    name: '👥  Members',
                    columns: Object.values(this.COLUMNS)
                };
            },

            verifyTelegramUser(activeSpreadsheet, message) {
                const chatId = message.from.id;
                const existingCustomer = this.getCustomerByChatId(activeSpreadsheet, chatId);
                if (existingCustomer) {
                    // Customer already exists, no need to update
                    return existingCustomer;
                }

                const customer = {
                    chat_id: message.from.id,
                    username: message.from.username || '',
                    first_name: message.from.first_name,
                    last_name: message.from.last_name || '',
                    language_code: message.from.language_code || '',
                    is_bot: message.from.is_bot || false,
                    message: JSON.stringify(message)
                }

                return this.addNewCustomer(activeSpreadsheet, customer);
            },

            getCustomerByChatId(activeSpreadsheet, chat_id) {
                const sheet = Plugins.Modules.Sheet.getSheet(activeSpreadsheet, this.CUSTOMERS_SHEET_META);
                const range = sheet.getRange('B:B');
                const textFinder = range.createTextFinder(chat_id);
                const firstOccurrence = textFinder.findNext();
                if (firstOccurrence) {
                    const values = firstOccurrence.getValues();
                    return this._fromRow(values[values.length - 1]);
                }
                return null;
            },

            addNewCustomer(activeSpreadsheet, customer = {}) {
                const sheet = Plugins.Modules.Sheet.getSheet(activeSpreadsheet, this.CUSTOMERS_SHEET_META);
                const range = sheet.getDataRange();
                const values = range.getValues() || [];

                // add createdOn in the first column as ISO string
                const newRow = this._toRow(customer);
                sheet.appendRow(newRow);
                return newRow;
            },

            _fromRow(row = []) {
                return {
                    created_on: row?.[0] || '',
                    chat_id: row?.[1] || '',
                    username: row?.[2] || '',
                    first_name: row?.[3] || '',
                    last_name: row?.[4] || '',
                    language_code: row?.[5] || '',
                    is_bot: row?.[6] || false,
                    data: row?.[7] || ''
                };
            },

            _toRow(customer = {}) {
                return [
                    new Date().toISOString(),
                    customer.chat_id || '',
                    customer.username || '',
                    customer.first_name || '',
                    customer.last_name || '',
                    customer.language_code || '',
                    customer.is_bot || false,
                    JSON.stringify(customer)
                ];
            },
        },

        // Product class.
        Product: {
            get PRODUCTS_SHEET_META() {
                return {
                    name: '🛒  Products',
                    columns: ['sn', 'category', 'subcategory', 'name', 'description', 'tags', 'price', 'unit', 'image', 'rating', 'Data']
                };
            },

            addProduct(activeSpreadsheet, product = {}) {
                const sheet = Plugins.Modules.Sheet.getSheet(activeSpreadsheet, this.PRODUCTS_SHEET_META);
                const range = sheet.getDataRange();

                // add product as a new row
                const newRow = this._toRow(product);
                sheet.appendRow(this._toRow(product));
                return newRow;
            },

            getProductBySN(activeSpreadsheet, sn) {
                const sheet = Plugins.Modules.Sheet.getSheet(activeSpreadsheet, this.PRODUCTS_SHEET_META);

                // Search for the product by SN in the first column
                const range = sheet.getRange('A:A');
                const textFinder = range.createTextFinder(sn);
                const firstOccurrence = textFinder.findNext();
                if (firstOccurrence) {
                    const values = firstOccurrence.getValues();
                    return this._fromRow(values[0]);
                }
                return null;
            },

            listProducts(activeSpreadsheet, category = '', subcategory = '', limit = 100, offset = 0) {
                const sheet = Plugins.Modules.Sheet.getSheet(activeSpreadsheet, this.PRODUCTS_SHEET_META);
                const range = sheet.getDataRange();
                const values = range.getValues() || [];
                const products = [];

                // Assuming the first row is headers, we start from index 1
                for (let i = offset + 1; (i < values.length || i < offset + limit); i++) {
                    const row = values[i];

                    const product = this._fromRow(row);
                    if (product && (category === '' || product.category === category) &&
                        (subcategory === '' || product.subcategory === subcategory)) {
                        products.push(product);
                    }
                }

                return products;
            },

            listCategories(activeSpreadsheet) {
                const sheet = Plugins.Modules.Sheet.getSheet(activeSpreadsheet, this.PRODUCTS_SHEET_META);
                const range = sheet.getDataRange();
                const values = range.getValues() || [];
                const categories = new Set();

                // Assuming the first row is headers, we start from index 1
                for (let i = 1; i < values.length; i++) {
                    const category = values[i][1];
                    if (category) {
                        categories.add(category);
                    }
                }
                return Array.from(categories);
            },

            _fromRow(row = []) {
                if (!row || row.length < 4) {
                    return null;
                }
                return {
                    sn: row[0],
                    category: row[1],
                    subcategory: row[2],
                    name: row[3],
                    description: row?.[4] || '',
                    tags: row?.[5] ? row[5].split(',').map(tag => tag.trim()) : [],
                    price: row?.[6] || 0.0,
                    unit: row?.[7] || '',
                    image: row?.[8] || '',
                    rating: row?.[9] || 0.0,
                    data: row?.[10] ? JSON.parse(row[10]) : {}
                };
            },

            _toRow(product = {}) {
                return [
                    product.sn || '',
                    product.category || '',
                    product.subcategory || '',
                    product.name || '',
                    product.description || '',
                    product.tags ? product.tags.join(',') : '',
                    product.price || 0.0,
                    product.unit || '',
                    product.image || '',
                    product.rating || 0.0,
                    JSON.stringify(product)
                ];
            },
        },

        Membership: {
            get DEFAULT_LICENSE_KEY() {
                return "TRIAL";
            },

            get DEFAULT_TRIAL_DAYS() {
                return 90;
            },
            get DEFAULT_TRIAL_BALANCE() {
                return 5000;
            },
            activate(days = this.DEFAULT_TRIAL_DAYS, balance = this.DEFAULT_TRIAL_BALANCE, licenseKey = this.DEFAULT_LICENSE_KEY) {
                // Create membership info with specified parameters
                const membershipInfo = this.createMembershipInfo(days, balance, licenseKey);
                // Save membership info to user properties
                this.setMembershipInfo(membershipInfo);
                return membershipInfo;
            },

            revoke() {
                // Simulate revocation logic
                PropertiesService.getUserProperties().deleteProperty(Plugins.INPUT.SYSTEM.MEMBERSHIP.MEMBERSHIP_KEY);
                return true;
            },

            createMembershipInfo(days = this.DEFAULT_TRIAL_DAYS, balance = this.DEFAULT_TRIAL_BALANCE, licenseKey = this.DEFAULT_LICENSE_KEY) {
                const membership = {
                    [Plugins.INPUT.SYSTEM.MEMBERSHIP.CREATED_ON]: new Date().toISOString(),
                    [Plugins.INPUT.SYSTEM.MEMBERSHIP.LICENSE_KEY]: licenseKey,
                    // Add the specified number of days to the current date
                    [Plugins.INPUT.SYSTEM.MEMBERSHIP.EXPIRES_AT]: new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString(),
                    [Plugins.INPUT.SYSTEM.MEMBERSHIP.BALANCE]: balance,
                    type: licenseKey === this.DEFAULT_LICENSE_KEY ? 'trial' : 'paid'
                }
                return membership;
            },

            getMembershipInfo() {
                const membershipData = PropertiesService.getUserProperties().getProperty(Plugins.INPUT.SYSTEM.MEMBERSHIP.MEMBERSHIP_KEY);
                if (!membershipData) {
                    return null;
                }

                try {
                    const {
                        [Plugins.INPUT.SYSTEM.MEMBERSHIP.LICENSE_KEY]: licenseKey,
                        type,
                        [Plugins.INPUT.SYSTEM.MEMBERSHIP.CREATED_ON]: createdOn,
                        [Plugins.INPUT.SYSTEM.MEMBERSHIP.EXPIRES_AT]: expiresAt,
                        [Plugins.INPUT.SYSTEM.MEMBERSHIP.BALANCE]: balance = 0
                    } = JSON.parse(membershipData);
                    return {
                        [Plugins.INPUT.SYSTEM.MEMBERSHIP.LICENSE_KEY]: licenseKey,
                        type,
                        [Plugins.INPUT.SYSTEM.MEMBERSHIP.CREATED_ON]: createdOn,
                        [Plugins.INPUT.SYSTEM.MEMBERSHIP.EXPIRES_AT]: expiresAt,
                        [Plugins.INPUT.SYSTEM.MEMBERSHIP.BALANCE]: balance
                    };
                } catch (error) {
                    console.error('Error parsing membership info:', error);
                    return null;
                }
            },

            setMembershipInfo(membershipInfo = {}) {
                PropertiesService.getUserProperties().setProperty(Plugins.INPUT.SYSTEM.MEMBERSHIP.MEMBERSHIP_KEY, JSON.stringify(membershipInfo));
                return membershipInfo;
            }
        },
    }
};

Plugins.MCP = {
    Host: {
        handleWebhookEvent(activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet(), e = {}) {
            if (!e.postData || !e.postData.contents) {
                throw new Error('Invalid webhook event: missing postData or contents');
            }

            const contents = JSON.parse(e.postData.contents);


            const mcpServer = new Plugins.MCP.Server({
                "name": 'Telegram Bot Server',
                "description": 'Handles incoming Telegram updates, processes them using the Gemini API, and responds appropriately using the Telegram Bot API.',
                "version": '1.0.0',
                "resources": [],
                "prompt": {
                    "name": "telegram_bot_assistant_prompt",
                    "title": "Telegram Bot Assistant",
                    "description": "You are a helpful assistant for responding to Telegram messages using the Telegram Bot API. You receive incoming Telegram update events, and your task is to generate appropriate responses based on the event data and the conversation context. You can use the callTelegramApi tool to send messages back to users via the Telegram Bot API. Always ensure that your responses adhere to the Telegram Bot API requirements and that you provide clear and concise messages to users.",
                    "arguments": [
                        { "name": "event", "type": "string", "required": true, "description": "The incoming Telegram update event data as a JSON string." }
                    ]
                },
                "tools": [{
                    "name": "callTelegramApi",
                    "description": "Call the Telegram Bot API to send a message or perform an action in response to an incoming Telegram update. The input should be a JSON object containing the 'action' field specifying the Telegram API method to call (e.g., sendMessage, editMessageText, sendPhoto, editMessageMedia, answerCallbackQuery), the 'chat_id' field specifying the chat ID to send the message to, and other necessary fields based on the action (e.g., 'text' for sendMessage). Ensure that the generated JSON adheres to the Telegram Bot API requirements for the specified action.",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "uri": {
                                "type": "string",
                                "description": "The URI of the Telegram Bot API endpoint to call (e.g., /sendMessage). This will be appended to the base URL (https://api.telegram.org/bot<token>/) to construct the full API endpoint URL. If 'uri' is provided, it will be used for the API call instead of constructing the URL based on the 'action' field."
                            },
                            "options": {
                                "type": "object",
                                "properties": {
                                    "method": {
                                        "type": "string",
                                        "description": "The HTTP method to use for the API call (e.g., GET, POST). Default is POST.",
                                        "enum": ["GET", "POST"]
                                    },
                                    "contentType": {
                                        "type": "string",
                                        "description": "The content type of the request payload (e.g., application/json). Default is application/json.",
                                        "enum": ["application/json", "application/x-www-form-urlencoded"]
                                    },
                                    "payload": {
                                        "type": "object",

                                        "properties": {
                                            "chat_id": {
                                                "type": "string",
                                                "description": "The chat ID to send the message back to."
                                            },
                                            "caption": {
                                                "type": "string",
                                                "description": "Photo caption (may also be used when resending photos by file_id), 0-1024 characters after entities parsing"
                                            },
                                            "text": {
                                                "type": "string",
                                                "description": "Text of the message to be sent, 1-4096 characters after entities parsing"
                                            },
                                            "photo": {
                                                "type": "string",
                                                "description": "Photo to send. Pass a file_id as String to send a photo that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a photo from the Internet. The photo must be at most 10 MB in size. The photo's width and height must not exceed 10000 in total. Width and height ratio must be at most 20"
                                            },
                                            "inline_keyboard": {
                                                "type": "array",
                                                "description": "Array of button rows, each represented by an Array of InlineKeyboardButton objects. ",
                                                "items": {
                                                    "type": "array",
                                                    "items": {
                                                        "type": "object",
                                                        "description": "This object represents one button of an inline keyboard. Exactly one of the fields other than text, icon_custom_emoji_id, and style must be used to specify the type of the button."
                                                    }
                                                }
                                            }
                                        },
                                        "required": ["chat_id", "text"]
                                    }
                                },
                                "required": ["method", "contentType", "payload"]
                            },
                            "required": ["uri", "options"]
                        }
                    }
                }]
            });
            // Generate prompt for Gemini based on the incoming Telegram update and available data sources defined in MCP Client Roots
            const prompt = Plugins.MCP.Host.assembleInstructionPrompt(activeSpreadsheet, contents);
            // Call the Gemini API to generate content based on the prompt and retrieve the generated response, which should include the necessary information to call the Telegram Bot API (e.g., action, chat_id, text, etc.).
            const generatedContentJson = Plugins.MCP.Host.generateContent(activeSpreadsheet, prompt);

            // Execute the generated response action using the Telegram Bot API tools defined in MCP Server and return the result
            let telegramApiResponse;
            if (generatedContentJson.action && generatedContentJson.chat_id) {
                telegramApiResponse = Plugins.MCP.Host.callTelegramApi(generatedContentJson);
            } else if (generatedContentJson.uri) {
                telegramApiResponse = Plugins.MCP.Host.executeTelegramApi(generatedContentJson);
            } else {
                throw new Error('Generated content is missing required fields for Telegram API call. Expected at least "action" and "chat_id", or a "uri" for direct API call.');
            }

            // TODO: For better security and performance, instead of transmitting the entire event data through MCP Server, 
            // we can generate a unique identifier for the event, store the event data in a temporary storage (like CacheService or PropertiesService), 
            // and then pass only the identifier to the MCP Server. 
            // The MCP Server can then retrieve the event data using the identifier when needed. 
            // This way, we avoid transmitting large event data through MCP and also add a layer of security by not exposing sensitive event data directly in the prompt.
            // -------------------------------- //

            //const serverTransport = new Plugins.MCP.StdioServerTransport();
            //mcpServer.connect(serverTransport);
            //return serverTransport.transmit(e);

            // Return the final response as a JSON string containing the status, action taken, and the response from the Telegram API
            const finalResponse = JSON.stringify({
                'status': 'success',
                'event': contents,
                'generatedContent': generatedContentJson,
                'response': telegramApiResponse
            });
            return finalResponse;
        },
        assembleInstructionPrompt(activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet(), contents = {}) {
            const cellReference = PropertiesService.getScriptProperties().getProperty(Plugins.INPUT.GEMINI.INSTRUCTION_CELL_REFERENCE);
            if (!cellReference) {
                throw new Error(`Instruction cell reference is not set. Please set ${Plugins.INPUT.GEMINI.INSTRUCTION_CELL_REFERENCE} property to the cell containing the instruction prompt template.`);
            }

            const sheetName = cellReference.split('!')[0];
            const cellA1Notation = cellReference.split('!')[1];
            const sheet = activeSpreadsheet.getSheetByName(sheetName);
            if (!sheet) {
                throw new Error(`Sheet "${sheetName}" not found in the active spreadsheet. Please check the ${Plugins.INPUT.GEMINI.INSTRUCTION_CELL_REFERENCE} property.`);
            }
            const cell = sheet.getRange(cellA1Notation);
            const value = cell.getValue();
            if (!value) {
                throw new Error(`No instruction prompt found in cell ${cellReference}. Please ensure the cell contains a valid JSON string for the prompt template.`);
            }
            const _prompt = JSON.parse(value); // Assuming the prompt is in the specified cell as a JSON string. The prompt should have a structure that includes a "contents" field which is an array of message objects.

            // For simplicity, we are replacing the contents with the incoming event data. In a more complex implementation, you might want to merge this with existing prompt contents or structure it differently.
            if (_prompt?.contents || !Array.isArray(_prompt.contents)) {
                _prompt.contents = [];
            }

            const content =
            {
                "role": "user",
                "parts": [
                    {
                        text: "Here is the incoming event data: " + JSON.stringify({ event: contents }) + ". Please generate an appropriate response action based on this event data and the instruction provided in the sheet. Remember to follow the Telegram Bot API requirements when generating your response."
                    }
                ]
            };


            _prompt.contents = [content];


            return _prompt;
        },
        generateContent: (activeSpreadsheet, payload) => {
            // Retrieve the Gemini API key from script properties. 
            // If the API key is not set, throw an error to inform the user to set it up before using the Gemini integration. 
            // This ensures that we have the necessary credentials to authenticate with the Gemini API and generate content based on the provided prompt.
            const geminiApiKey = Plugins.Modules.GeminiAgent.getScriptApiKey();
            if (!geminiApiKey) {
                throw new Error(`Gemini API key is not set. Please set ${Plugins.INPUT.GEMINI.GEMINI_API_KEY} property.`);
            }

            // Determine which Gemini model to use based on user selection in the sheet or default to the predefined model. 
            // This allows for flexibility in choosing different models for different types of prompts or experiments.
            const model = Plugins.Modules.GeminiAgent.getScriptModel() || Plugins.Modules.GeminiAgent.DEFAULT_MODEL;

            // Call the Gemini API client to generate content based on the provided prompt and selected model. 
            // The response is expected to contain the generated content in a specific format, which we will parse and return as a JSON object. 
            // We also log the prompt, model, and response for debugging purposes.
            const response = Plugins.Modules.GeminiApiClient.generateContent(geminiApiKey, model, payload);

            // Parse the Gemini response to extract the generated content. 
            const generatedContent = response?.candidates?.[0]?.content?.parts?.[0]?.text;
            const generatedContentJson = generatedContent ? JSON.parse(generatedContent) : {};
            // Log the prompt and model being sent to Gemini API for debugging purposes
            Plugins.MCP.Host.writeGeminiResponse(activeSpreadsheet, generatedContentJson, model, payload, response);
            return generatedContentJson;
        },
        executeTelegramApi(generatedJson = {}) {
            // Validate that the generated JSON contains the necessary fields to make a Telegram API call.
            if (!generatedJson.uri || !generatedJson.options || !generatedJson.options.payload) {
                throw new Error('Generated JSON is missing required fields for Telegram API call. Expected "uri" and "options.payload".');
            }

            // Retrieve the Telegram API key from script properties. If the API key is not set, throw an error to inform the user to set it up before using the Telegram API integration. This ensures that we have the necessary credentials to authenticate with the Telegram API and execute the desired actions based on the Gemini response.
            const telegramApiKey = Plugins.Modules.TelegramBotSettings.getScriptApiKey();
            if (!telegramApiKey) {
                throw new Error(`Telegram API key is not set. Please set ${Plugins.INPUT.TELEGRAM_BOT.BOT_API_TOKEN} property.`);
            }

            // Validate that the generated JSON contains the necessary fields to make a Telegram API call. We need at least the "uri" to know which Telegram API endpoint to call, and "options.payload" to have the necessary data for the API request. If these fields are missing, we throw an error to indicate that the Gemini response is not in the expected format for making a Telegram API call.
            if (!generatedJson.uri || !generatedJson.options || !generatedJson.options.payload) {
                throw new Error('Generated JSON is missing required fields for Telegram API call. Expected "uri" and "options.payload".');
            }

            // Initialize the Telegram client with the retrieved API key. This client will be used to make API calls to Telegram based on the generated JSON from Gemini.
            const telegramClient = new Plugins.Modules.TelegramBotClient(telegramApiKey);

            // Execute the Telegram API call using the generated JSON from Gemini. The "uri" field specifies which Telegram API endpoint to call (e.g., /sendMessage), and the "options" field contains the necessary parameters for the API call, including the payload with details like chat_id, text, etc. We also log the generated JSON and the response from Telegram for debugging purposes.
            const telegramResponse = telegramClient.executeApiRequest(generatedJson.uri, generatedJson.options);


            // Plugins.Modules.TerminalOutput.write(activeSpreadsheet, e, responseJson, responseText, 'Executing Telegram API request based on Gemini response');
            if (JSON.parse(responseText).ok !== true) {
                throw new Error(`Telegram API request failed: ${responseText}`);
            }
            return responseText;
        },
        writeGeminiResponse(activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet(), eventObject, model, payload, response) {
            // Check if terminal output is enabled
            const terminalOutputEnabled = PropertiesService.getDocumentProperties()
                .getProperty(Plugins.PROPERTIES.terminal_output_switch) || 'ON';

            // Check if terminal output is enabled
            if (terminalOutputEnabled !== 'ON') {
                return;
            }

            const sheet = Plugins.Modules.Sheet.getSheet(activeSpreadsheet, Plugins.Modules.TerminalOutput.SHEET_META);
            const generatedText = response?.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
            sheet.appendRow([
                // Created On as iso string
                new Date().toISOString(),
                // Event Object
                (typeof eventObject === 'object' || Array.isArray(eventObject)) ? JSON.stringify(eventObject) : String(eventObject || ''),
                // Mode (e.g., "gemini-3-flash-preview")
                model,
                // Payload
                (typeof payload === 'object' || Array.isArray(payload)) ? JSON.stringify(payload) : String(payload || ''),
                // Response
                (typeof response === 'object' || Array.isArray(response)) ? JSON.stringify(response) : String(response || ''),
                // Prompt (if available in payload)
                payload?.contents?.[0]?.parts?.[0]?.text || '',
                // Model Version (if available in response, otherwise use input model or default to 'unknown')
                response?.modelVersion || 'unknown',
                // Generated Text (if available in response) ({"candidates":[{"content":{"parts":[{"text": "generated text here"}]}}]})
                JSON.stringify(generatedText),
                // Total Token Count (if available in response.usageMetadata)
                response?.usageMetadata?.totalTokenCount || 0,
                // Prompt Token Count (if available in response.usageMetadata)
                response?.usageMetadata?.promptTokenCount || 0,
                // Thoughts Token Count (if available in response.usageMetadata)
                response?.usageMetadata?.thoughtsTokenCount || 0,
                // cachedContentTokenCount (if available in response.usageMetadata)
                response?.usageMetadata?.cachedContentTokenCount || 0,
                // candidatesTokenCount (if available in response.usageMetadata)
                response?.usageMetadata?.candidatesTokenCount || 0,
                // toolUsePromptTokenCount (if available in response.usageMetadata)
                response?.usageMetadata?.toolUsePromptTokenCount || 0
            ]);

            return sheet;
        },
        callTelegramApi(generatedJson = { action: 'sendMessage', chat_id: '', text: '' }) {
            const telegramApiKey = Plugins.Modules.TelegramBotSettings.getScriptApiKey();
            if (!telegramApiKey) {
                throw new Error(`Telegram API key is not set. Please set ${Plugins.INPUT.TELEGRAM_BOT.BOT_API_TOKEN} property.`);
            }
            const telegramClient = new Plugins.Modules.TelegramBotClient(telegramApiKey);

            // Execute Tool/Action via Telegram API

            // Map Gemini generated JSON to Telegram API call
            const action = generatedJson.action || 'sendMessage';
            generatedJson.parse_mode = 'HTML'; // Ensure Telegram parses the message as HTML for formatting

            // If the response includes an inline keyboard definition, we need to move it into the reply_markup field as per Telegram API requirements
            if (generatedJson.inline_keyboard) {
                generatedJson.reply_markup = {
                    inline_keyboard: generatedJson.inline_keyboard
                };

                delete generatedJson['inline_keyboard']; // Remove inline_keyboard from the root level if it exists
            }

            // Handle special cases for sendPhoto and editMessageMedia where the text should be sent as caption and photo URL/file_id should be specified
            if (action === 'sendPhoto' || action === 'editMessageMedia') {
                // For sendPhoto and editMessageMedia, the 'text' field should be sent as 'caption' and we need to specify the photo URL or file_id in the 'photo' field
                generatedJson.caption = generatedJson.caption || generatedJson.text || '';
                delete generatedJson['text']; // Remove text field for sendPhoto and editMessageMedia actions
            }

            const telegramResponse = telegramClient.executeApiRequest(action, generatedJson);
            const responseText = telegramResponse.getContentText();
            // Plugins.Modules.TerminalOutput.write(activeSpreadsheet, e, responseJson, responseText, 'Executing Telegram API request based on Gemini response');

            if (JSON.parse(responseText).ok !== true) {
                throw new Error(`Telegram API request failed: ${responseText}`);
            }
            return responseText;
        }
    },
    Server: class {
        constructor({ name = '', version = '1.0.0', description = '', prompt = {}, resources = [] } = {}) {
            this.name = name;
            this.version = version;
            this.description = description;
            this.resources = resources;
            this.prompt = prompt;
            this.tools = [];
        }

        connect(serverTransport = new Plugins.MCP.StdioServerTransport()) {
            serverTransport.Server = this; // Pass reference of MCP Server to the transport layer
        }

        // This handler will be called by the transport layer when a request is received. The request will contain information about which tool to call and the input parameters for that tool. The handler will then execute the appropriate logic based on the tool being called and return the result back through the transport layer.                
        callToolsHandler(request) {
            if (!request || !request.tool || !request.tool.name) {
                throw new Error('Invalid request');
            }
            const toolName = request.tool.name;
            if (toolName === 'callTelegramApi') {
                const payload = request.tool.input || {};
            }
        }

        listToolsHandler() {
            // Return the list of tools available on the server for the client to use. This can be used by the client to understand what actions it can request the server to perform.
            return this.tools;
        }
    },
    Client: class {
        /**
         * Roots allow clients to specify which directories servers should focus on, communicating intended scope through a coordination mechanism.
         */
        get Roots() {
            return [
                {
                    "uri": "file:///Users/agent/travel-planning",
                    "name": "Travel Planning Workspace"
                }
            ]
        }
        /**
         * Sampling allows servers to request LLM completions through the client, enabling an agentic workflow. This approach puts the client in complete control of user permissions and security measures.
         */
        get Sampling() {
            return [];
        }
        /**
         * Elicitation enables servers to request specific information from users during interactions, creating more dynamic and responsive workflows.
         */
        get Elicitation() {
            return [];
        }
    },
    StdioServerTransport: class {
        set Server(server) {
            this._server = server;
        }

        constructor() {
            this._server = null;
        }

        transmit(e = {}) {
            if (!this._server) {
                throw new Error('Server not set');
            }
            const requestData = JSON.parse(e.postData.contents || '{}');
            if (requestData.tool) {
                return this._server.callToolsHandler(requestData);
            }
            return JSON.stringify({ status: 'no_tool_called', requestData });
        }
    }
};

Plugins.Helper = {
    Controller: {},
    View: {
        BuildResultSection: (botName = '', action = '.', result = {}) => {
            const newSection = CardService.newCardSection()
                .setHeader('📝 API Response')
                .setCollapsible(true)
                .setNumUncollapsibleWidgets(2);

            // Add divider
            newSection.addWidget(CardService.newDivider());

            // --- Section B: Capabilities (Grid Layout) ---
            // Shows what the bot is allowed to do based on BotFather settings
            const settingsGrid = CardService.newGrid()
                .setTitle('⚙️ Capabilities & Privacy')
                .setNumColumns(2);

            // add other properties dynamically if needed
            Object.keys(result).forEach(key => {
                const value = result[key];
                if (typeof value === 'boolean') {
                    settingsGrid.addItem(
                        Plugins.Helper.View.createBooleanItem(key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), value));
                }
                if (typeof value === 'number') {
                    settingsGrid.addItem(
                        Plugins.Helper.View.createNumberItem(key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), value));
                }
            });

            newSection.addWidget(settingsGrid);

            // Raw JSON view
            // Add divider
            newSection.addWidget(CardService.newDivider());

            // Add Raw title
            newSection.addWidget(
                CardService.newTextParagraph()
                    .setText('📄 Raw Response JSON:'));

            // Add divider
            newSection.addWidget(CardService.newDivider());

            // Add raw result text paragraph
            newSection.addWidget(
                CardService.newTextParagraph()
                    .setMaxLines(1)
                    .setText(JSON.stringify(result, null, 2)));

            // Add Export to Sheet widget
            newSection.addWidget(
                Plugins.ResultWidget.View.BuildExportWidget(botName, action, result)
            );

            // Build the execution result card
            return newSection;
        },
        // Helper to create a boolean status grid item
        createBooleanItem: (title, isEnabled) => {
            return CardService.newGridItem()
                .setTitle(isEnabled ? '🟢 Yes' : '🔘 No')
                .setSubtitle(title)
                .setTextAlignment(CardService.HorizontalAlignment.START)
                .setLayout(CardService.GridItemLayout.TEXT_BELOW);
            // Note: GridItems do not support setMaterialIcon directly in all contexts,
            // so we rely on the text status. If icons were needed here, 
            // we would switch to DecoratedText widgets in a Section.
        },
        createNumberItem: (title, number) => {
            return CardService.newGridItem()
                .setTitle(String(number))
                .setSubtitle(title)
                .setTextAlignment(CardService.HorizontalAlignment.START)
                .setLayout(CardService.GridItemLayout.TEXT_BELOW);
        }
    }
};

Plugins.Home = {
    id: 'HomePlugin',
    name: 'Telegram Bot Studio',
    short_description: 'A suite of tools for Telegram Bots',
    description: 'A collection of plugins for building Telegram Bots using Telegram Bot Studio on Google Workspace.',
    version: '1.0.0',
    listOfTools: [
        {   // Gemini Assistant Tool
            name: 'Gemini Assistant',
            emoji: '💫',
            description: 'Create new content using AI.',
            icon: 'auto_awesome',
            action: 'Plugins.GeminiAgent.Controller.PushHomeCard',
            requires: [
                Plugins.INPUT.TELEGRAM_BOT.BOT_API_TOKEN
            ]
        }
    ],
    Controller: {
        Load: (e) => {
            const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
            // Log the event for debugging
            //Plugins.Modules.TerminalOutput.write(activeSpreadsheet, e, 'Controller.Home', 'Load', 'Loading Home Card with AppModel data.');

            // Build and return the Home Card
            const appModelData = Plugins.Modules.App.getData();

            // Build and return the Home Card
            const homeCard = Plugins.Home.View.HomeCard(appModelData);

            let cardNavigation;
            if (e.parameters && e.parameters.refresh === 'true') {
                cardNavigation = CardService.newNavigation()
                    .updateCard(homeCard);
            } else {
                cardNavigation = CardService.newNavigation()
                    .pushCard(homeCard);
            }

            // Return action response to update card
            return CardService.newActionResponseBuilder()
                .setNavigation(cardNavigation)
                .build();
        },
        PushHomeCard: (e) => {
            // Build and return the Home Card
            const data = Plugins.Modules.App.getData();

            // Return action response to update card
            return CardService.newActionResponseBuilder()
                .setNavigation(
                    CardService.newNavigation()
                        .pushCard(
                            Plugins.Home.View.HomeCard(data)))
                .build();
        },
        UpdateHomeCard: (e) => {
            // Build and return the Home Card
            const data = Plugins.Modules.App.getData();

            // Return action response to update card
            return CardService.newActionResponseBuilder()
                .setNavigation(
                    CardService.newNavigation()
                        .updateCard(
                            Plugins.Home.View.HomeCard(data)))
                .build();
        },
        PushAboutCard: (e) => {
            // Build and return the About Card
            const data = Plugins.Modules.App.getData();
            return CardService.newActionResponseBuilder()
                .setNavigation(
                    CardService.newNavigation()
                        .pushCard(Plugins.Home.View.AboutCard(data))
                ).build();
        },
        PushHelpCard: (e) => {
            // Build and return the Help Card
            const data = Plugins.Modules.App.getData();
            return CardService.newActionResponseBuilder()
                .setNavigation(
                    CardService.newNavigation()
                        .pushCard(Plugins.Home.View.HelpCard(data))
                ).build();
        },
        _HandleResultNavigation: (e, result) => {
            const formInputs = e?.commonEventObject?.formInputs || {};
            const showErrorsState = formInputs?.[Plugins.PROPERTIES.show_errors_switch]?.stringInputs?.value[0] || "OFF";
            if (result.report.length > 0) {
                if (showErrorsState === 'ON') {
                    // Build and return the result card
                    return CardService.newActionResponseBuilder()
                        .setNavigation(
                            CardService.newNavigation()
                                .pushCard(
                                    Plugins.ResultWidget.View
                                        .BuildResultCard(result))
                        ).build();
                }
                else {
                    return CardService.newActionResponseBuilder()
                        .setNotification(
                            CardService.newNotification()
                                .setText('⚠️ Completed with ' + result.report.length + ' error(s). \n\nEnable "Show Errors" in Advanced Settings to view details.'))
                        .build();
                }
            }

            // show notification if no errors or if show errors is off
            return CardService.newActionResponseBuilder()
                .setNotification(
                    CardService.newNotification()
                        .setText('✅ All JSON entries are valid!'))
                .build();
        }
    },
    View: {
        HomeCard: (data = {}) => {
            data.isConnected = !!data[Plugins.INPUT.TELEGRAM_BOT.BOT_API_TOKEN];

            const cardBuilder = CardService.newCardBuilder()
                .setName(Plugins.Home.id + '-Home')
                .setHeader(CardService.newCardHeader()
                    .setTitle(Plugins.Package.name)
                    .setSubtitle(data.leds)
                    .setImageStyle(CardService.ImageStyle.SQUARE)
                    .setImageUrl(Plugins.Package.imageUrl)
                    .setImageAltText('Telegram Bot Studio Logo'));

            // Build connection list section
            Plugins.Home.View._AddConecctionListSections(cardBuilder, data);

            // Add sections for each available tool
            Plugins.Home.listOfTools.forEach(tool => {
                cardBuilder.addSection(
                    Plugins.Home.View._BuildToolSection(data, tool));
            });

            // Quick Access Section
            cardBuilder.addSection(Plugins.Home.View._BuildQuickAccessSection(data));

            // Premium Membership Section
            if (!data[Plugins.INPUT.SYSTEM.MEMBERSHIP.IS_PREMIUM]) {
                cardBuilder.addSection(Plugins.Home.View._BuildPremiumMembershipSection(data));
                cardBuilder.setFixedFooter(CardService.newFixedFooter()
                    .setPrimaryButton(CardService.newTextButton()
                        .setText('💎 Upgrade to Premium')
                        .setBackgroundColor(Plugins.primaryColor())
                        .setOnClickAction(CardService.newAction()
                            .setFunctionName('Plugins.UserProfile.Controller.PushHomeCard'))));
            }

            return cardBuilder.build();
        },
        AboutCard: (data = {}) => {
            const cardBuilder = CardService.newCardBuilder()
                .setName(Plugins.Home.id + '-About')
                .setHeader(CardService.newCardHeader()
                    .setTitle('About ' + Plugins.Package.name)
                    .setSubtitle(Plugins.Package.short_description)
                    .setImageStyle(CardService.ImageStyle.SQUARE)
                    .setImageUrl(Plugins.Media.BIG_TIME_IMG_URL)
                    .setImageAltText('Card Image'))
                .addSection(
                    CardService.newCardSection()
                        .setHeader('App Information')
                        .addWidget(
                            CardService.newTextParagraph()
                                .setText(`Name: ${Plugins.Package.name}`))
                        .addWidget(
                            CardService.newTextParagraph()
                                .setText(`Version: ${Plugins.Package.version}`))
                        .addWidget(
                            CardService.newTextParagraph()
                                .setText(`Build: ${Plugins.Package.build}`))
                        .addWidget(
                            CardService.newTextParagraph()
                                .setText(`Description: ${Plugins.Package.description}`))
                        .addWidget(
                            CardService.newTextParagraph()
                                .setText(`Developed by Easy ADM (https://easyadm.com).`)));


            // Add useful links section
            cardBuilder.addSection(
                CardService.newCardSection()
                    .setHeader('🔗 Useful Links')
                    .addWidget(
                        CardService.newTextButton()
                            .setText('📄 Documentation')
                            .setOpenLink(
                                CardService.newOpenLink()
                                    .setUrl(`${Plugins.Package.gitRepository}#readme`)))
                    .addWidget(
                        CardService.newTextButton()
                            .setText('📢 Report Issues')
                            .setOpenLink(
                                CardService.newOpenLink()
                                    .setUrl(`${Plugins.Package.gitRepository}/issues`))));

            return cardBuilder.build();
        },
        HelpCard: (data = {}) => {
            const cardBuilder = CardService.newCardBuilder()
                .setName(Plugins.Home.id + '-Help')
                .setHeader(CardService.newCardHeader()
                    .setTitle('Help & Support')
                    .setSubtitle(Plugins.Home.short_description)
                    .setImageStyle(CardService.ImageStyle.SQUARE)
                    .setImageUrl(Plugins.Media.YES_IMG_URL)
                    .setImageAltText('Help Image'));

            // 1. Getting Started Guide Section
            cardBuilder.addSection(CardService.newCardSection()
                .setHeader('🚀 Getting Started')
                .addWidget(CardService.newTextParagraph()
                    .setText('To start building your bot, follow these simple steps:'))
                .addWidget(CardService.newDecoratedText()
                    .setTopLabel('Step 1')
                    .setText('Connect your bot using a token from @BotFather.')
                    .setWrapText(true))
                .addWidget(CardService.newDecoratedText()
                    .setTopLabel('Step 2')
                    .setText('Use the "Get Me" plugin to verify your connection.')
                    .setWrapText(true))
                .addWidget(CardService.newDecoratedText()
                    .setTopLabel('Step 3')
                    .setText('Set up a Webhook to start receiving messages in real-time.')
                    .setWrapText(true)));

            // 2. Common Issues / FAQ Section
            cardBuilder.addSection(CardService.newCardSection()
                .setHeader('💡 Quick Troubleshooting')
                .setCollapsible(true)
                .setNumUncollapsibleWidgets(1)
                .addWidget(CardService.newDecoratedText()
                    .setTopLabel('Invalid Token?')
                    .setText('Ensure there are no extra spaces in your bot token.')
                    .setWrapText(true))
                .addWidget(CardService.newDecoratedText()
                    .setTopLabel('Webhook not working?')
                    .setText('Check if your Google Sheet is published to the web or has the correct permissions.')
                    .setWrapText(true)));

            // 3. Useful Links & Support Section
            cardBuilder.addSection(CardService.newCardSection()
                .setHeader('🔗 Resources')
                .addWidget(CardService.newTextButton()
                    .setText('📄 Read Documentation')
                    .setOpenLink(CardService.newOpenLink()
                        .setUrl(`${Plugins.Package.gitRepository}#readme`)))
                .addWidget(CardService.newTextButton()
                    .setText('📢 Report a Bug')
                    .setOpenLink(CardService.newOpenLink()
                        .setUrl(`${Plugins.Package.gitRepository}/issues`))));
            return cardBuilder.build();
        },
        _AddConecctionListSections: (cardBuilder, data = {}) => {
            // Telegram Bot Connection & Status Section (Pinned to Top)
            cardBuilder.addSection(
                Plugins.TelegramBotConnection.View.WelcomeSection(data));

            // Gemini Assistant Connection & Status Section (Pinned to Top)
            cardBuilder.addSection(
                Plugins.GeminiAgent.View.WelcomeSection(data));

            cardBuilder.addSection(
                Plugins.Webhook.View.WelcomeSection(data));



        },
        _BuildToolSection: (data = {}, tool = {}) => {
            // Check if tool has requirements and if they are met
            const requirementsMet = !tool.requires || tool.requires.every(req => data[req]);

            const section = CardService.newCardSection()
                //.setHeader(`${tool.emoji} ${tool.name}`)
                .setCollapsible(true)
                .setNumUncollapsibleWidgets(1);

            // Build the decorated text with a button for the tool
            const decoratedText = CardService.newDecoratedText()
                .setText(`${tool.emoji} ${tool.name}`)
                .setBottomLabel(tool.description)
                .setWrapText(true)
                .setButton(
                    CardService.newTextButton()
                        // Disable button if requirements are not met
                        .setDisabled(!requirementsMet)
                        .setText(tool.name)
                        .setAltText(`${tool.name} JSON within selected cells`)
                        .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
                        .setMaterialIcon(
                            CardService.newMaterialIcon()
                                .setName(tool.icon)
                                .setFill(false)
                        )
                        .setOnClickAction(
                            CardService.newAction()
                                .setFunctionName(`${tool.action}`)
                        )
                );

            // Add the decorated text to the section
            section.addWidget(decoratedText);

            // If requirements are not met, show a warning and disable the button
            if (!requirementsMet) {
                // Determine which requirements are not met for the warning message
                const unmetRequirements = tool.requires.filter(req => !data[req]);
                const requirementMessages = {
                    [Plugins.INPUT.SYSTEM.MEMBERSHIP.IS_PREMIUM]: 'Premium Membership required',
                    [Plugins.INPUT.GEMINI.GEMINI_API_KEY]: 'Gemini API Key required',
                    [Plugins.INPUT.GEMINI.GEMINI_MODEL]: 'Gemini Model selection required',
                    [Plugins.INPUT.TELEGRAM_BOT.BOT_API_TOKEN]: 'Telegram Bot API Token required'
                };
                const unmetMessages = unmetRequirements.map(req => requirementMessages[req] || 'Unknown requirement').join(' & ');
                section.addWidget(CardService.newDecoratedText()
                    .setText(`⚠️ ${unmetMessages}`)
                    .setWrapText(true)
                    .setStartIcon(CardService.newIconImage().setMaterialIcon(
                        CardService.newMaterialIcon().setName('warning')
                    )));
            }

            return section;
        },
        _BuildQuickAccessSection: (data = {}) => {
            return CardService.newCardSection()
                .setHeader('⚙️ Quick Access')
                .setCollapsible(true)
                // add divider
                .addWidget(CardService.newDivider())
                .addWidget(CardService.newButtonSet()
                    .addButton(CardService.newTextButton()
                        .setText('Settings')
                        .setOnClickAction(CardService.newAction()
                            .setFunctionName('Plugins.Settings.Controller.PushHomeCard')))
                    .addButton(CardService.newTextButton()
                        .setText('Help & Support')
                        .setOnClickAction(CardService.newAction()
                            .setFunctionName('Plugins.Home.Controller.PushHelpCard')))
                    .addButton(CardService.newTextButton()
                        .setText('About')
                        .setOnClickAction(CardService.newAction()
                            .setFunctionName('Plugins.Home.Controller.PushAboutCard')))
                );
        },
        _BuildPremiumMembershipSection: (data = {}) => {
            const membershipSection = CardService.newCardSection()
                .setHeader('💎 Premium Membership')
                .setCollapsible(false)
                .addWidget(CardService.newDecoratedText()
                    .setTopLabel('Membership Status')
                    .setText(data[Plugins.INPUT.SYSTEM.MEMBERSHIP.IS_PREMIUM] ? 'Premium Member' : 'Free Member')
                    .setStartIcon(CardService.newIconImage().setMaterialIcon(
                        CardService.newMaterialIcon().setName('workspace_premium')))
                    .setBottomLabel(data[Plugins.INPUT.SYSTEM.MEMBERSHIP.IS_PREMIUM]
                        ? `Expires on: ${data[Plugins.INPUT.SYSTEM.MEMBERSHIP.EXPIRES_AT] ? new Date(data[Plugins.INPUT.SYSTEM.MEMBERSHIP.EXPIRES_AT]).toDateString() : 'N/A'} | Balance: $${data[Plugins.INPUT.SYSTEM.MEMBERSHIP.BALANCE].toFixed(2)}`
                        : 'Upgrade to unlock advanced AI tools.'));
            return membershipSection;
        }
    }
};

Plugins.ConfirmationCard = {
    id: 'ConfirmationCardPlugin',
    name: 'Confirmation Card',
    short_description: 'Standardized confirmation dialog',
    description: 'A reusable confirmation dialog plugin to standardize user confirmations across various actions within the Telegram Bot Studio environment.',
    version: '1.0.0',
    imageUrl: Plugins.Media.PAY_ATTENTION_IMG_URL,
    Controller: {
        Load: (e = {}) => {
            const title = e?.commonEventObject?.parameters?.title || 'Confirm Action';
            const message = e?.commonEventObject?.parameters?.message || 'Are you sure you want to proceed?';
            const onClickFunctionName = e?.commonEventObject?.parameters?.onClickFunctionName || null;
            const onClickParameters = e?.commonEventObject?.parameters?.onClickParameters || {};

            if (!onClickFunctionName) {
                throw new Error('Missing required parameters: message, onClickFunctionName');
            }

            // Push the confirmation card
            return CardService.newActionResponseBuilder()
                .setNavigation(
                    CardService.newNavigation()
                        .pushCard(
                            Plugins.ConfirmationCard.View.HomeCard({
                                title: title,
                                message: message,
                                onClickFunctionName: onClickFunctionName,
                                onClickParameters: onClickParameters
                            })
                        )
                )
                .build();
        },
        Confirm: (e) => {
            // extract parameters from event object onClickFunctionName = 'Plugins['Name'].Controller['Function']', onClickParameters={}
            const onClickFunctionName = e?.commonEventObject?.parameters?.onClickFunctionName || null;
            const onClickParameters = e?.commonEventObject?.parameters?.onClickParameters || {};

            if (!onClickFunctionName) {
                throw new Error('Missing required parameters: message, onClickFunctionName');
            }

            // Resolve the function from the string name 
            // onClickFunctionName = 'Plugins.Name.Controller.Function'
            const functionPathParts = onClickFunctionName.split('.');
            let actionResult = null;
            try {
                let func = Plugins;
                for (let i = 1; i < functionPathParts.length; i++) {
                    func = func[functionPathParts[i]];
                }
                actionResult = func(e);
            } catch (error) {
                // Todp: 
            }

            return actionResult;
        },
        Cancel: (e) => {
            // Simply pop the card on cancel
            return CardService.newActionResponseBuilder()
                .setNavigation(CardService.newNavigation().popCard())
                .build();
        },
    },
    View: {
        HomeCard: (data = {}) => {
            // Build the Confirmation Card.
            const cardBuilder = CardService.newCardBuilder()
                .setName(Plugins.ConfirmationCard.id + '-Home')
                .setHeader(CardService.newCardHeader()
                    .setTitle(data.title || 'Confirm Action')
                    .setImageStyle(CardService.ImageStyle.SQUARE)
                    .setImageUrl(Plugins.ConfirmationCard.imageUrl)
                    .setImageAltText('Confirmation Image'));

            // Build the main section
            const mainSection = CardService.newCardSection()
                .addWidget(
                    CardService.newTextParagraph()
                        .setText(data.message || 'Are you sure you want to proceed?'));

            cardBuilder.addSection(mainSection);

            // Add Confirm and Cancel buttons to the footer
            cardBuilder.setFixedFooter(
                CardService.newFixedFooter()
                    .setPrimaryButton(
                        CardService.newTextButton()
                            .setText('Confirm')
                            .setOnClickAction(CardService.newAction()
                                .setFunctionName('Plugins.ConfirmationCard.Controller.Confirm')
                                .setParameters({ onClickFunctionName: data.onClickFunctionName, onClickParameters: JSON.stringify(data.onClickParameters || {}) })))
                    .setSecondaryButton(
                        CardService.newTextButton()
                            .setText('Cancel')
                            .setOnClickAction(CardService.newAction()
                                .setFunctionName('Plugins.ConfirmationCard.Controller.Cancel'))));

            return cardBuilder.build();
        }
    }
};

Plugins.Settings = {
    id: 'SettingsPlugin',
    name: 'Settings',
    short_description: 'Manage bot settings and preferences',
    description: 'The Settings card allows you to manage and configure settings for your Telegram bot add-on. You can adjust preferences, set up integrations, and customize the behavior of your bot to suit your needs.',
    version: '1.0.0',
    imageUrl: Plugins.Media.WELCOME_IMG_URL,
    Controller: {
        PushHomeCard: (e) => {
            // Build and return the Settings Home Card
            const appModelData = Plugins.Modules.App.getData();
            return CardService.newActionResponseBuilder()
                .setNavigation(
                    CardService.newNavigation()
                        .pushCard(Plugins.Settings.View.HomeCard({ ...appModelData }))
                ).build();
        },
        SaveSettings: (e) => {
            // extract and save API endpoint URL
            const apiEndpointUrl = e?.commonEventObject?.formInputs?.[Plugins.INPUT.TELEGRAM_BOT.BOT_API_ENDPOINT_URL]?.stringInputs?.value?.[0] || '';
            if (apiEndpointUrl) {
                PropertiesService.getDocumentProperties().setProperty(Plugins.INPUT.TELEGRAM_BOT.BOT_API_ENDPOINT_URL, apiEndpointUrl);
            }
            // extract and save secret private key
            const secretPrivateKey = e?.commonEventObject?.formInputs?.[Plugins.INPUT.TELEGRAM_BOT.BOT_SECRET_TOKEN]?.stringInputs?.value?.[0] || '';
            if (secretPrivateKey) {
                PropertiesService.getDocumentProperties().setProperty(Plugins.INPUT.TELEGRAM_BOT.BOT_SECRET_TOKEN, secretPrivateKey);
            }

            // focus_terminal_output
            const focusTerminalOutput = e?.commonEventObject?.formInputs?.[Plugins.PROPERTIES.focus_terminal_output]?.stringInputs?.value?.[0] || 'ON';
            PropertiesService.getDocumentProperties().setProperty(Plugins.PROPERTIES.focus_terminal_output, focusTerminalOutput === 'ON' ? 'ON' : 'OFF');

            // terminal_output_switch
            const terminalOutputSwitch = e?.commonEventObject?.formInputs?.[Plugins.PROPERTIES.terminal_output_switch]?.stringInputs?.value?.[0] || 'ON';
            PropertiesService.getDocumentProperties().setProperty(Plugins.PROPERTIES.terminal_output_switch, terminalOutputSwitch === 'ON' ? 'ON' : 'OFF');

            // praittfy_json
            const praittfyJson = e?.commonEventObject?.formInputs?.[Plugins.PROPERTIES.praittfy_json]?.stringInputs?.value?.[0] || 'ON';
            PropertiesService.getDocumentProperties().setProperty(Plugins.PROPERTIES.praittfy_json, praittfyJson === 'ON' ? 'ON' : 'OFF');

            // enable_event_logging
            const enableEventLogging = e?.commonEventObject?.formInputs?.[Plugins.PROPERTIES.enable_event_logging]?.stringInputs?.value?.[0] || 'OFF';
            PropertiesService.getDocumentProperties().setProperty(Plugins.PROPERTIES.enable_event_logging, enableEventLogging === 'ON' ? 'ON' : 'OFF');

            // indentation_spaces
            const indentationSpaces = e?.commonEventObject?.formInputs?.[Plugins.PROPERTIES.indentation_spaces]?.stringInputs?.value?.[0] || '2';
            PropertiesService.getDocumentProperties().setProperty(Plugins.PROPERTIES.indentation_spaces, ['1', '2', '4', '6', '8'].includes(indentationSpaces) ? indentationSpaces : '2');

            // show_errors_switch
            const showErrorsSwitch = e?.commonEventObject?.formInputs?.[Plugins.PROPERTIES.show_errors_switch]?.stringInputs?.value?.[0] || 'ON';
            PropertiesService.getDocumentProperties().setProperty(Plugins.PROPERTIES.show_errors_switch, showErrorsSwitch === 'ON' ? 'ON' : 'OFF');

            // gemini_api_key
            const geminiApiKey = e?.commonEventObject?.formInputs?.[Plugins.INPUT.GEMINI.GEMINI_API_KEY]?.stringInputs?.value?.[0] || '[YOUR GEMINI API KEY]';
            PropertiesService.getDocumentProperties().setProperty(Plugins.INPUT.GEMINI.GEMINI_API_KEY, geminiApiKey);

            // gemini_model_selector
            const geminiModel = e?.commonEventObject?.formInputs?.[Plugins.INPUT.GEMINI.GEMINI_MODEL]?.stringInputs?.value?.[0] || 'gemini-3-flash-preview';
            PropertiesService.getDocumentProperties().setProperty(Plugins.INPUT.GEMINI.GEMINI_MODEL, geminiModel);

            // Build and return the Home Card
            const appModelData = Plugins.Modules.App.getData();
            return CardService.newActionResponseBuilder()
                .setNavigation(
                    CardService.newNavigation()
                        .popToRoot()
                        .updateCard(Plugins.Home.View.HomeCard({ ...appModelData }))
                ).build();
        },
        ToggleAction(e) {
            try {
                const actionName = e?.commonEventObject?.parameters?.actionName;
                // actionName like: 'debug_mode_switch' or 'form_input_switch_key'
                const preState = e?.commonEventObject?.formInputs?.[actionName]?.stringInputs?.value?.[0];
                // store the new state within user properties or perform necessary actions
                PropertiesService.getDocumentProperties().setProperty(actionName, preState === 'ON' ? 'ON' : 'OFF');
                // return success notification
                return CardService.newActionResponseBuilder()
                    .setNotification(
                        CardService.newNotification()
                            .setText(`${actionName} set to ${preState}`))
                    .build();
            } catch (error) {
                // log error to terminal output
                Plugins.Modules.TerminalOutput.write(SpreadsheetApp.getActiveSpreadsheet(),
                    e,
                    'Settings.ToggleAction',
                    'ERROR',
                    error.toString(),
                    error.stack);

                return CardService.newActionResponseBuilder()
                    .setNotification(
                        CardService.newNotification()
                            .setText(
                                error.toString()))
                    .build();
            }
        }
    },
    View: {
        HomeCard: (data = {}) => {
            // Data Initialization
            // Create a random demo key if none exists (for display purposes)
            const privateKeyDemo = Array(65).fill(0).map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');

            // Fetch properties with robust fallbacks
            data[Plugins.INPUT.TELEGRAM_BOT.BOT_API_ENDPOINT_URL] = PropertiesService.getDocumentProperties().getProperty(Plugins.INPUT.TELEGRAM_BOT.BOT_API_ENDPOINT_URL) || 'https://api.telegram.org/';
            data.terminal_output_switch = PropertiesService.getDocumentProperties().getProperty(Plugins.PROPERTIES.terminal_output_switch) || 'OFF';
            data.focus_terminal_output = PropertiesService.getDocumentProperties().getProperty(Plugins.PROPERTIES.focus_terminal_output) || 'OFF';
            data.praittfy_json = PropertiesService.getDocumentProperties().getProperty(Plugins.PROPERTIES.praittfy_json) || 'OFF';
            data.txt_secret_private_key = PropertiesService.getDocumentProperties().getProperty(Plugins.INPUT.TELEGRAM_BOT.BOT_SECRET_TOKEN) || privateKeyDemo;
            data.enable_event_logging = PropertiesService.getDocumentProperties().getProperty(Plugins.PROPERTIES.enable_event_logging) || 'OFF';
            data.indentation_spaces = PropertiesService.getDocumentProperties().getProperty(Plugins.PROPERTIES.indentation_spaces) || '2';
            data.show_errors_switch = PropertiesService.getDocumentProperties().getProperty(Plugins.PROPERTIES.show_errors_switch) || 'OFF';

            const cardBuilder = CardService.newCardBuilder()
                .setName(Plugins.Settings.name + '-Home')
                .setHeader(CardService.newCardHeader()
                    .setTitle(Plugins.Settings.name)
                    .setSubtitle(Plugins.Settings.short_description)
                    .setImageStyle(CardService.ImageStyle.SQUARE)
                    .setImageUrl(Plugins.Settings.imageUrl)
                    .setImageAltText('Settings Logo'));

            // Network & Security Section (Compact Grouping)
            // Groups the API URL and Secret Key together as they are both core config items
            const configSection = CardService.newCardSection()
                .setHeader('🌐 Network & Security')
                .setCollapsible(false);

            // API Endpoint Input
            configSection.addWidget(
                CardService.newTextInput()
                    .setFieldName(Plugins.INPUT.TELEGRAM_BOT.BOT_API_ENDPOINT_URL)
                    .setTitle('API Endpoint URL')
                    .setValue(data[Plugins.INPUT.TELEGRAM_BOT.BOT_API_ENDPOINT_URL] || '')
                    .setHint('Default: https://api.telegram.org/')
                    .setMultiline(false)
            );

            cardBuilder.addSection(configSection);

            // Developer Tools Section
            // Isolated section for toggles and switches
            const devSection = CardService.newCardSection()
                .setHeader('🛠️ Developer Tools');

            // Gemini API Key Input
            devSection.addWidget(
                CardService.newTextInput()
                    .setFieldName(Plugins.INPUT.GEMINI.GEMINI_API_KEY)
                    .setTitle('Gemini API Key')
                    .setValue(data.gemini_api_key || '')
                    .setHint('Enter your Gemini API key')
                    .setMultiline(false)
            );

            // Gemini Model Selector
            // Add a dropdown to select the Gemini model
            const geminiModelSelector =
                CardService.newSelectionInput()
                    .setType(CardService.SelectionInputType.DROPDOWN)
                    // Enable for premium users
                    .setTitle('🤖 Gemini Model')
                    .setFieldName(Plugins.INPUT.GEMINI.GEMINI_MODEL);
            // Add available Gemini models as options
            const geminiModels = Plugins.Modules.GeminiApiClient.MODELS;
            // Loop through the models and add them as options to the selector
            for (const modelKey in geminiModels) {
                if (Object.prototype.hasOwnProperty.call(geminiModels, modelKey)) {
                    const modelName = geminiModels[modelKey];
                    geminiModelSelector.addItem(modelName, modelKey, data.gemini_model_selector === modelKey);
                }
            }
            // Add the Gemini model selector to the developer section
            devSection.addWidget(geminiModelSelector);

            // Event Log Switch
            devSection.addWidget(
                CardService.newDecoratedText()
                    .setTopLabel('Event Log')
                    .setText('Enable Event Logging')
                    .setBottomLabel('Toggle logging of events for debugging purposes.')
                    .setStartIcon(CardService.newIconImage().setMaterialIcon(
                        CardService.newMaterialIcon().setName('event_note').setFill(false)))
                    .setSwitchControl(
                        CardService.newSwitch()
                            .setFieldName(Plugins.PROPERTIES.enable_event_logging)
                            .setValue('ON')
                            .setSelected(data.enable_event_logging === 'ON')
                            .setControlType(CardService.SwitchControlType.CHECK_BOX)
                    )
            );

            // praittfy_json Switch
            devSection.addWidget(
                CardService.newDecoratedText()
                    .setTopLabel('Response Formatting')
                    .setText('Pretty Print JSON')
                    .setBottomLabel('Format API JSON responses for better readability in logs.')
                    .setStartIcon(CardService.newIconImage().setMaterialIcon(
                        CardService.newMaterialIcon().setName('format_align_left').setFill(false)))
                    .setSwitchControl(
                        CardService.newSwitch()
                            .setFieldName(Plugins.PROPERTIES.praittfy_json)
                            .setValue('ON')
                            .setSelected(data.praittfy_json === 'ON')
                            .setControlType(CardService.SwitchControlType.CHECK_BOX)
                    )
            );

            cardBuilder.addSection(devSection);

            // Professional Fixed Footer
            // High-contrast primary button for the "Save" action
            const fixedFooter = CardService.newFixedFooter()
                .setPrimaryButton(
                    CardService.newTextButton()
                        .setText('Save Configuration')
                        .setBackgroundColor(Plugins.primaryColor())
                        //.setTextButtonStyle(CardService.TextButtonStyle.FILLED)
                        .setMaterialIcon(CardService.newMaterialIcon().setName('save'))
                        .setOnClickAction(
                            CardService.newAction()
                                .setFunctionName('Plugins.Settings.Controller.SaveSettings')
                        )
                );

            cardBuilder.setFixedFooter(fixedFooter);

            return cardBuilder.build();
        }
    }
};

Plugins.UserProfile = {
    id: 'UserProfilePlugin',
    name: 'User Profile',
    short_description: 'Manage your account and membership',
    description: 'The User Profile plugin allows you to manage your account information, view your membership status, and upgrade to premium features. You can easily access your profile details and make changes to your subscription directly from this card.',
    version: '1.0.0',
    imageUrl: Plugins.Media.YOU_GOT_IT_IMG_URL,
    Controller: {
        PushHomeCard(e) {
            try {
                const data = Plugins.Modules.App.getData();
                return CardService.newActionResponseBuilder()
                    .setNavigation(
                        CardService.newNavigation()
                            .pushCard(Plugins.UserProfile.View.HomeCard(data))
                    ).build();
            } catch (error) {
                return this.handleOperationError(error);
            }
        },
        ActivatePremium(e) {
            try {
                // Simulate activation logic
                Plugins.Modules.CRM.Membership.activate(
                    Plugins.Modules.CRM.Membership.DEFAULT_TRIAL_DAYS,
                    Plugins.Modules.CRM.Membership.DEFAULT_TRIAL_BALANCE,
                    'trial');

                // Build and return the Home Card
                const data = Plugins.Modules.App.getData();
                return CardService.newActionResponseBuilder()
                    .setNavigation(
                        CardService.newNavigation()
                            .popToRoot()
                            .updateCard(
                                Plugins.Home.View.HomeCard(data))
                    ).build();
            } catch (error) {
                return this.handleOperationError(error);
            }
        },
        ConfirmRevokeLicense(e) {
            // Show confirmation card before revoking license
            const title = 'Cancel Subscription';
            const message = 'Are you sure you want to cancel your premium subscription? You will lose access to premium features.';
            const onClickFunctionName = 'Plugins.UserProfile.Controller.RevokeLicense';
            const onClickParameters = e?.commonEventObject?.parameters || {};

            // Push Confirmation Card
            return Plugins.ConfirmationCard.Controller.Confirm({
                commonEventObject: {
                    parameters: { title, message, onClickFunctionName, onClickParameters }
                }
            });
        },
        RevokeLicense(e) {
            try {
                // Simulate license revocation logic
                Plugins.Modules.CRM.Membership.revoke();

                // Build and return the Home Card
                const data = Plugins.Modules.App.getData();
                return CardService.newActionResponseBuilder()
                    .setNavigation(
                        CardService.newNavigation()
                            .popToRoot()
                            .updateCard(
                                Plugins.Home.View.HomeCard(data))
                    ).build();
            } catch (error) {
                // Return error notification
                return this.handleOperationError(error);
            }
        },
        handleOperationError(error) {
            // Show an error message to the user
            return CardService.newActionResponseBuilder()
                .setNotification(
                    CardService.newNotification()
                        .setText(
                            error.toString()))
                .build();
        }
    },
    View: {
        HomeCard: (data = {}) => {
            const cardBuilder = CardService.newCardBuilder()
                .setName(Plugins.UserProfile.id + '-Home')
                .setHeader(CardService.newCardHeader()
                    .setTitle('Account Overview')
                    .setSubtitle('Manage your profile & membership')
                    .setImageStyle(CardService.ImageStyle.SQUARE)
                    .setImageUrl(Plugins.Media.YOU_GOT_IT_IMG_URL)
                    .setImageAltText('User Profile Avatar'));

            // 1. Membership Status & details Section            
            cardBuilder.addSection(Plugins.UserProfile.View._BuildMembershipSection(data));

            // 2. Feature Comparison Section (Professional Touch)
            const featureSection = CardService.newCardSection()
                .setHeader('🚀 Premium Features')
                .setCollapsible(true)
                .setNumUncollapsibleWidgets(1);

            const features = [
                { name: 'Unlimited Webhooks', premium: true },
                { name: 'Real-time Log Monitoring', premium: true },
                { name: 'Priority Support', premium: true },
                { name: 'Ad-free Experience', premium: true }
            ];

            features.forEach(f => {
                featureSection.addWidget(CardService.newDecoratedText()
                    .setText(f.name)
                    .setStartIcon(CardService.newIconImage().setMaterialIcon(
                        CardService.newMaterialIcon().setName('check_circle').setFill(false)))
                    .setBottomLabel(data?.[Plugins.INPUT.SYSTEM.MEMBERSHIP.IS_PREMIUM] ? 'Active' : 'Premium Only'));
            });

            cardBuilder.addSection(featureSection);

            return cardBuilder.build();
        },
        _BuildMembershipSection: (data = {}, membershipData = {}) => {
            const isPremium = data?.[Plugins.INPUT.SYSTEM.MEMBERSHIP.IS_PREMIUM] || false;

            const newSection = CardService.newCardSection()
                .setHeader('Membership & Billing');

            // Professional Membership Badge
            newSection.addWidget(CardService.newDecoratedText()
                .setTopLabel('Current Plan')
                .setText(isPremium ? '💎 PREMIUM ACCESS' : '🆓 FREE TIER')
                .setStartIcon(CardService.newIconImage().setMaterialIcon(
                    CardService.newMaterialIcon()
                        .setName(isPremium ? 'workspace_premium' : 'person')
                        .setFill(false)))
                .setBottomLabel(isPremium ? 'Your pro subscription is active.' : 'Upgrade to unlock advanced tools.')
                .setWrapText(true));

            if (isPremium) {
                // Calculate days left until expiration
                const expiresAt = membershipData?.[Plugins.INPUT.SYSTEM.MEMBERSHIP.EXPIRES_AT] ? new Date(membershipData[Plugins.INPUT.SYSTEM.MEMBERSHIP.EXPIRES_AT]) : null;
                const daysLeft = expiresAt ? Math.ceil((expiresAt - new Date()) / (1000 * 60 * 60 * 24)) : null;

                // Display days left until expiration if available
                newSection.addWidget(CardService.newDecoratedText()
                    .setTopLabel(`Membership Expiration`)
                    .setText(expiresAt ? expiresAt.toDateString() : 'N/A')
                    .setStartIcon(CardService.newIconImage().setMaterialIcon(
                        CardService.newMaterialIcon().setName('event').setFill(false)))
                    .setBottomLabel(typeof daysLeft === 'number' ? `${daysLeft} day(s) left` : '')
                    .setWrapText(true));

                // Display balance if available
                newSection.addWidget(CardService.newDecoratedText()
                    .setTopLabel('Balance')
                    .setText(`${membershipData?.[Plugins.INPUT.SYSTEM.MEMBERSHIP.BALANCE] || 0}`)
                    .setStartIcon(CardService.newIconImage().setMaterialIcon(
                        CardService.newMaterialIcon().setName('account_balance_wallet').setFill(false)))
                    .setWrapText(true));

                // Add a "Cancel Subscription" button for premium users
                newSection.addWidget(CardService.newTextButton()
                    .setText('Cancel Subscription')
                    .setTextButtonStyle(CardService.TextButtonStyle.TEXT)
                    .setOnClickAction(CardService.newAction()
                        .setFunctionName('Plugins.UserProfile.Controller.ConfirmRevokeLicense')));
            } else {
                newSection.addWidget(CardService.newTextButton()
                    .setText('💎 Upgrade Now')
                    .setBackgroundColor(Plugins.primaryColor())
                    .setTextButtonStyle(CardService.TextButtonStyle.TEXT)
                    .setMaterialIcon(CardService.newMaterialIcon().setName('bolt'))
                    .setOnClickAction(CardService.newAction()
                        .setFunctionName('Plugins.UserProfile.Controller.ActivatePremium')));
            }

            return newSection;
        }
    }
};

Plugins.TelegramBotConnection = {
    id: 'ConnectionPlugin',
    name: 'Connection',
    short_description: 'Manage bot connection settings',
    description: 'The Connection plugin allows you to manage and configure the connection settings for your Telegram bot. You can set up your bot token, test the connection, and ensure that your bot is properly connected to the Telegram API.',
    version: '1.0.0',
    imageUrl: Plugins.Media.WELCOME_IMG_URL,
    Controller: {
        Load: (e) => {
            const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
            try {
                // Log the event for debugging
                // Plugins.Modules.TerminalOutput.write(activeSpreadsheet, e, 'Connection.Load', 'INFO', 'Loading Connection plugin...');
                const data = e?.commonEventObject?.parameters || {};

                return Plugins.TelegramBotConnection.View.HomeCard(data);
            }
            catch (error) {
                Plugins.Modules.TerminalOutput.write(activeSpreadsheet, e, 'Connection.Load', 'ERROR', error.toString(), error.stack);
                // Return notification of error
                return CardService.newActionResponseBuilder()
                    .setNotification(
                        CardService.newNotification()
                            .setText(
                                error.toString()))
                    .build();
            }
        },
        Connect(e) {
            const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
            try {
                // extract parameters from event object if needed

                const inputToken = e?.commonEventObject?.formInputs?.[Plugins.INPUT.TELEGRAM_BOT.BOT_API_TOKEN]?.stringInputs?.value?.[0] || '';

                if (!inputToken) {
                    throw new Error('Bot API Token cannot be empty.');
                }

                // getme to validate token
                const client = new Plugins.Modules.TelegramBotClient(inputToken);
                const response = client.getMe();
                // Check for errors in response
                if (JSON.parse(response.getContentText()).ok !== true) {
                    throw new Error(`Error fetching bot info: ${response.getResponseCode()} - ${response.getContentText()}`);
                }

                const result = JSON.parse(response.getContentText()).result;

                // Log the response to Terminal Output sheet
                // Plugins.Modules.TerminalOutput.write(activeSpreadsheet, e, 'Connection.Connect', 'Success', result, `Retrieved bot info for token: ${inputToken}`);

                // execute chk_export_token_to_sheet if needed
                const exportTokenToSheet = e?.commonEventObject?.formInputs?.chk_export_token_to_sheet?.stringInputs?.value?.[0] === 'export_token';
                if (exportTokenToSheet) {
                    // Export the token to a designated sheet
                    const sheet = Plugins.Modules.Sheet;
                    const sheetMeta = {
                        name: '🔐 Bot Tokens',
                        columns: ['Timestamp', 'Bot Token', 'Bot Username', 'getMe Response']
                    };

                    sheet.dumpObjectToSheet(activeSpreadsheet, sheetMeta, inputToken, result.username, result);
                }

                // on success, store the token in user properties or user properties as needed
                PropertiesService.getDocumentProperties().setProperty(Plugins.INPUT.TELEGRAM_BOT.BOT_API_TOKEN, inputToken);
                PropertiesService.getDocumentProperties().setProperty(Plugins.INPUT.TELEGRAM_BOT.BOT_FRIENDLY_NAME, result.first_name);
                PropertiesService.getDocumentProperties().setProperty(Plugins.INPUT.TELEGRAM_BOT.BOT_USERNAME, result.username);
                e.parameters = {
                    refresh: 'true'
                };
                // Build and return the Home Card
                const appModelData = Plugins.Modules.App.getData();
                return CardService.newActionResponseBuilder()
                    .setNavigation(
                        CardService.newNavigation()
                            .popToRoot()
                            .updateCard(Plugins.Home.View.HomeCard(appModelData))
                    ).build();
            } catch (error) {
                Plugins.Modules.TerminalOutput.write(activeSpreadsheet, e, 'Connection.Connect', 'ERROR', error.toString(), error.stack);
                return this.handleError(error)
                    .build();
            }
        },
        ConfirmDisconnect(e) {
            // Show confirmation card before disconnecting
            const title = 'Disconnect Bot';
            const message = 'Are you sure you want to disconnect your bot? This will remove the stored bot token.';
            const onClickFunctionName = 'Plugins.TelegramBotConnection.Controller.Disconnect';
            const onClickParameters = e?.commonEventObject?.parameters || {};

            // Push Confirmation Card
            return Plugins.ConfirmationCard.Controller.Load({
                commonEventObject: {
                    parameters: { title, message, onClickFunctionName, onClickParameters }
                }
            });
        },
        Disconnect(e) {
            const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
            try {
                // Show confirmation card before disconnecting
                const title = 'Disconnect Bot';
                const message = 'Are you sure you want to disconnect your bot? This will remove the stored bot token.';
                const onClickFunctionName = 'Plugins.TelegramBotConnection.Controller.Disconnect';
                const onClickParameters = e?.commonEventObject?.parameters || {};

                // Push Confirmation Card
                const confirmationCard = Plugins.ConfirmationCard.Controller.Load({
                    commonEventObject: {
                        parameters: { title, message, onClickFunctionName, onClickParameters }
                    }
                });

                // Clear the stored token from document properties
                PropertiesService.getDocumentProperties().deleteProperty(Plugins.INPUT.TELEGRAM_BOT.BOT_API_TOKEN);
                PropertiesService.getDocumentProperties().deleteProperty(Plugins.INPUT.TELEGRAM_BOT.BOT_FRIENDLY_NAME);
                PropertiesService.getDocumentProperties().deleteProperty(Plugins.INPUT.TELEGRAM_BOT.BOT_USERNAME);
                // Build and return the Home Card
                const appModelData = Plugins.Modules.App.getData();
                return CardService.newActionResponseBuilder()
                    .setNavigation(
                        CardService.newNavigation()
                            .popToRoot()
                            .updateCard(Plugins.Home.View.HomeCard({ ...appModelData }))
                    ).build();
            } catch (error) {
                Plugins.Modules.TerminalOutput.write(
                    this._activeSpreadsheet,
                    e,
                    'Connection.Disconnect',
                    'ERROR', error.toString(), error.stack);
                return this.handleError(error)
                    .build();
            }
        },
        handleError(error) {
            // Show an error message to the user
            return CardService.newActionResponseBuilder()
                .setNotification(
                    CardService.newNotification()
                        .setText(
                            error.toString()));
        }
    },
    View: {
        WelcomeSection: (data = {}) => {
            // Professional Status Section
            const statusSection = CardService.newCardSection()
                .setCollapsible(true)
                .setNumUncollapsibleWidgets(1); // Keep the status visible when collapsed

            const token = data?.[Plugins.INPUT.TELEGRAM_BOT.BOT_API_TOKEN];
            const isConnected = !!token;

            const username = PropertiesService.getDocumentProperties().getProperty(Plugins.INPUT.TELEGRAM_BOT.BOT_USERNAME) || 'unknown_bot';
            const friendlyName = PropertiesService.getDocumentProperties().getProperty(Plugins.INPUT.TELEGRAM_BOT.BOT_FRIENDLY_NAME) || 'Telegram Bot';

            let executeAction;
            if (isConnected) {
                // Disconnect action
                executeAction = CardService.newAction()
                    .setFunctionName('Plugins.TelegramBotConnection.Controller.ConfirmDisconnect');
            } else {
                // Connect action
                executeAction = CardService.newAction()
                    .setParameters({
                        path: 'Plugins.TelegramBotConnection.View.HomeCard'
                    })
                    .setFunctionName('Plugins.TelegramBotConnection.Controller.Load');
            }

            let xButton;

            if (isConnected) {
                xButton = CardService.newTextButton()
                    .setAltText('Unlink Bot')
                    //.setTextButtonStyle(CardService.TextButtonStyle.TEXT)
                    .setMaterialIcon(
                        CardService.newMaterialIcon()
                            .setName('link_off')
                            .setFill(false))
                    .setOnClickAction(executeAction);
            } else {
                xButton = CardService.newTextButton()
                    .setText('Link Bot')
                    .setBackgroundColor(Plugins.primaryColor())
                    .setOnClickAction(executeAction);
            }

            statusSection.addWidget(CardService.newDecoratedText()
                .setTopLabel('Telegram Bot State:')
                .setText(isConnected ? `LIVE: ${friendlyName}` : 'OFFLINE: No Bot Linked')
                .setBottomLabel(isConnected ? `@${username}` : 'Establish a secure connection to start.')
                .setStartIcon(
                    CardService.newIconImage()
                        .setMaterialIcon(
                            CardService.newMaterialIcon()
                                .setName(isConnected ? 'check_circle' : 'cancel')
                                .setFill(false)))
                .setButton(
                    xButton));

            return statusSection;
        },
        /**
         * Main Connection Management Interface
         */
        HomeCard: (data = {}) => {
            // Fetch Properties
            const token = data?.[Plugins.INPUT.TELEGRAM_BOT.BOT_API_TOKEN];
            const isConnected = !!token;
            const username = 'Unknown';

            // 1. Card Header
            const cardBuilder = CardService.newCardBuilder()
                .setName(Plugins.TelegramBotConnection.id + '-Home')
                .setHeader(CardService.newCardHeader()
                    .setTitle('Bot Connection Management')
                    .setSubtitle(isConnected ? `Connected: @${username}` : 'Setup Required')
                    .setImageStyle(CardService.ImageStyle.SQUARE)
                    .setImageUrl(Plugins.TelegramBotConnection.imageUrl));

            // 2. Welcome & Status Section
            const actionSection = CardService.newCardSection()
                .setHeader(isConnected ? '⚙️ Actions' : '🔑 Authentication');

            // Connect Flow: Input + Button
            actionSection.addWidget(Plugins.TelegramBotConnection.View.BuildTokenTextInputWidget(token, false));

            // Help Hint
            actionSection.addWidget(CardService.newDecoratedText()
                .setText('Need a Token?')
                .setBottomLabel('Ask @BotFather on Telegram.')
                .setButton(CardService.newTextButton()
                    .setText('Open BotFather')
                    .setOpenLink(CardService.newOpenLink().setUrl('https://t.me/BotFather')))
            );

            cardBuilder.addSection(actionSection);

            // Add decorated text with check box to save the token to sheet for advanced users
            const storeToken = CardService.newCardSection()
                .setHeader('💾 Token Storage Options')
                .addWidget(
                    CardService.newDecoratedText()
                        .setTopLabel('Save Token')
                        .setText('Save bot token to Sheet')
                        .setBottomLabel('Save the bot token to a designated Google Sheet for advanced management.')
                        .setStartIcon(CardService.newIconImage().setMaterialIcon(
                            CardService.newMaterialIcon().setName('save')))
                        .setSwitchControl(
                            CardService.newSwitch()
                                .setFieldName(Plugins.PROPERTIES.chk_export_token_to_sheet)
                                .setValue('export_token')
                                .setSelected(false)
                                .setControlType(CardService.SwitchControlType.CHECK_BOX)
                        )
                );
            cardBuilder.addSection(storeToken);

            const footer = CardService.newFixedFooter()
                .setPrimaryButton(CardService.newTextButton()
                    .setText('Connect')
                    //.setTextButtonStyle(CardService.TextButtonStyle.FILLED)
                    .setBackgroundColor(Plugins.primaryColor())
                    .setOnClickAction(CardService.newAction()
                        .setFunctionName('Plugins.TelegramBotConnection.Controller.Connect')
                        .addRequiredWidget([Plugins.INPUT.TELEGRAM_BOT.BOT_API_TOKEN])));

            cardBuilder.setFixedFooter(footer);

            return cardBuilder.build();
        },
        BuildTokenTextInputWidget: (token, hidden = true) => {
            // Bot Token input
            return CardService.newTextInput()
                .setVisibility(hidden ? CardService.Visibility.HIDDEN : CardService.Visibility.VISIBLE)
                .setValue(token || '')
                .setId(Plugins.INPUT.TELEGRAM_BOT.BOT_API_TOKEN)
                .setFieldName(Plugins.INPUT.TELEGRAM_BOT.BOT_API_TOKEN)
                .setTitle('🤖 Your Bot Token')
                .setHint('Enter your Bot Token, get it from @BotFather, for example: 123456789:ABCDefGhIJKlmNoPQRsTUVwxyZ, keep it secret!');
        }
    }
};

Plugins.Webhook = {
    id: 'WebhookPlugin',
    name: 'Webhook Configurator',
    imageUrl: Plugins.Media.DEFAULT_IMAGE_URL,
    description: 'Configure and manage your bot webhooks with advanced options.',
    short_description: 'Manage bot webhooks and settings',
    Controller: {
        /**
         * Entry Point
         */
        Load: (e) => {
            const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
            const data = e?.commonEventObject?.parameters || {};

            try {
                // Log start of execution
                //Plugins.Modules.TerminalOutput.write(activeSpreadsheet,e, 'Webhook.Load', 'INFO', 'Loading Webhook Manager');

                const input_token = Plugins.Modules.TelegramBotSettings.getUserApiKey();
                if (!input_token) {
                    throw new Error('Bot API Token is missing. Please connect your bot in the Connection tab first.');
                }

                const isUpdate = data.update === 'true';
                const isPop = data.popCard === 'true';

                // Fetch bot current bot name for logging purposes
                data.currentBotName = (PropertiesService.getDocumentProperties().getProperty(Plugins.INPUT.TELEGRAM_BOT.BOT_USERNAME) || 'unknown_bot') + '_***' + input_token.slice(-6);

                // Logic: Fetch Data if Token Exists
                const telegramBotClient = new Plugins.Modules.TelegramBotClient(input_token);
                // 1. API Call: getWebhookInfo
                const response = telegramBotClient.getWebhookInfo();
                // Log response for debugging
                // Plugins.Modules.TerminalOutput.write(activeSpreadsheet, e, 'Webhook.Load', 'DEBUG', data, `getWebhookInfo Response: ${response.getContentText()}`);
                if (JSON.parse(response.getContentText()).ok !== true) {
                    throw new Error(`API Error ${response.getResponseCode()}: ${response.getContentText()}`);
                }

                // Parse the result
                const result = JSON.parse(response.getContentText()).result;

                // 2. Navigation Handling
                let navigation = CardService.newNavigation();
                if (isPop) {
                    navigation.popCard();
                }
                if (isUpdate) {
                    // Update the existing card in place
                    navigation.updateCard(
                        Plugins.Webhook.View.HomeCard(data, result));
                }
                else {
                    // Push a new card onto the stack
                    navigation.pushCard(
                        Plugins.Webhook.View.HomeCard(data, result));
                }

                // Return the navigation response
                return CardService.newActionResponseBuilder()
                    .setNavigation(navigation)
                    .build();
            } catch (error) {
                Plugins.Modules.TerminalOutput.write(activeSpreadsheet, e, 'Webhook.Load', 'ERROR', error.toString());
                // Return notification of error
                return CardService.newActionResponseBuilder()
                    .setNotification(
                        CardService.newNotification()
                            .setText(
                                error.toString()))
                    .build();
            }
        },

        /**
         * ACTION: Set Webhook with Full Options
         */
        SetWebhook: (e) => {
            const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
            try {
                // Log start of execution
                // Plugins.Modules.TerminalOutput.write(activeSpreadsheet, e, 'Webhook.SetWebhook', 'INFO', 'Setting Webhook...');
                const token = Plugins.Modules.TelegramBotSettings.getUserApiKey();
                const inputs = e?.commonEventObject?.formInputs || {};

                // Extract Inputs
                const urlInput = inputs[Plugins.INPUT.TELEGRAM_BOT.BOT_WEBHOOK_URL]?.stringInputs?.value?.[0];
                const ipInput = inputs[Plugins.INPUT.TELEGRAM_BOT.BOT_IP_ADDRESS]?.stringInputs?.value?.[0];
                const maxConnInput = inputs[Plugins.INPUT.TELEGRAM_BOT.BOT_MAX_CONNECTIONS]?.stringInputs?.value?.[0];
                const secretInput = inputs[Plugins.INPUT.TELEGRAM_BOT.BOT_SECRET_TOKEN]?.stringInputs?.value?.[0];
                const dropPending = inputs[Plugins.INPUT.TELEGRAM_BOT.DROP_PENDING_UPDATES]?.stringInputs?.value?.[0] === 'true';

                // Validation
                if (!urlInput || !urlInput.startsWith('https://')) {
                    return CardService.newActionResponseBuilder()
                        .setNotification(CardService.newNotification().setText("❌ Valid HTTPS URL required."))
                        .build();
                }

                const client = new Plugins.Modules.TelegramBotClient(token);

                // Build Options Object
                const options = {
                    drop_pending_updates: dropPending
                };

                if (ipInput) options.ip_address = ipInput;
                if (secretInput) options.secret_token = secretInput;

                if (maxConnInput) {
                    const maxConn = parseInt(maxConnInput, 10);
                    if (!isNaN(maxConn) && maxConn >= 1 && maxConn <= 100) {
                        options.max_connections = maxConn;
                    }
                }

                // Call API
                const response = client.setWebhook(urlInput, options);
                if (JSON.parse(response.getContentText()).ok !== true) {
                    throw new Error(`API Error ${response.getResponseCode()}: ${response.getContentText()}`);
                }
                // Log response for debugging
                // Plugins.Modules.TerminalOutput.write(activeSpreadsheet, e, 'Webhook.SetWebhook', 'DEBUG', `setWebhook Response: ${response.getContentText()}`);
                return Plugins.Webhook.Controller.Load({ commonEventObject: { parameters: { update: 'true' } } });
            } catch (error) {
                // Log error for debugging
                Plugins.Modules.TerminalOutput.write(activeSpreadsheet, e, 'Webhook.SetWebhook', 'ERROR', error.toString(), error.stack);
                return CardService.newActionResponseBuilder()
                    .setNotification(CardService.newNotification().setText(`❌ Error: ${error.message}`))
                    .build();
            }
        },

        ConfirmDeleteWebhook: (e) => {
            // Show confirmation card before disconnecting
            const title = 'Confirm Webhook Deletion';
            const message = 'Are you sure you want to delete the webhook? This will switch the bot to Long Polling mode.';
            const onClickFunctionName = 'Plugins.Webhook.Controller.DeleteWebhook';
            const onClickParameters = {};

            // Push Confirmation Card
            return Plugins.ConfirmationCard.Controller.Load({
                commonEventObject: {
                    parameters: { title, message, onClickFunctionName, onClickParameters }
                }
            });
        },

        /**
        * ACTION: Delete Webhook
        */
        DeleteWebhook: (e) => {
            const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
            try {
                const data = e?.commonEventObject?.parameters || {};
                // Log start of execution
                // Plugins.Modules.TerminalOutput.write(activeSpreadsheet, e, 'Webhook.DeleteWebhook', 'INFO', 'Deleting Webhook...');

                const token = Plugins.Modules.TelegramBotSettings.getUserApiKey();
                const dropPending = e?.commonEventObject?.formInputs?.[Plugins.INPUT.TELEGRAM_BOT.DROP_PENDING_UPDATES]?.stringInputs?.value?.[0] === 'true';

                const client = new Plugins.Modules.TelegramBotClient(token);
                const response = client.deleteWebhook(dropPending);

                if (JSON.parse(response.getContentText()).ok !== true) {
                    throw new Error(`API Error ${response.getResponseCode()}: ${response.getContentText()}`);
                }

                // Log response for debugging
                // Plugins.Modules.TerminalOutput.write(activeSpreadsheet, e, 'Webhook.DeleteWebhook', 'DEBUG', `deleteWebhook Response: ${response.getContentText()}`);

                const result = JSON.parse(response.getContentText()).result;
                return Plugins.Webhook.Controller.Load({ commonEventObject: { parameters: { update: 'true', popCard: 'true' } } });
            } catch (error) {
                // Log error for debugging
                Plugins.Modules.TerminalOutput.write(activeSpreadsheet, e, 'Webhook.DeleteWebhook', 'ERROR', error.toString(), error.stack);
                return CardService.newActionResponseBuilder()
                    .setNotification(CardService.newNotification().setText(`❌ Error: ${error.message}`))
                    .build();
            }
        },

        DropPendingUpdates: (e) => {
            const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
            try {
                // Log start of execution
                // Plugins.Modules.TerminalOutput.write(activeSpreadsheet, e, 'Webhook.DropPendingUpdates', 'INFO', 'DropPendingUpdates');
                const token = Plugins.Modules.TelegramBotSettings.getUserApiKey();
                const inputs = e?.commonEventObject?.formInputs || {};

                // Extract Inputs
                const urlInput = inputs[Plugins.INPUT.TELEGRAM_BOT.BOT_WEBHOOK_URL]?.stringInputs?.value?.[0];
                const ipInput = inputs[Plugins.INPUT.TELEGRAM_BOT.BOT_IP_ADDRESS]?.stringInputs?.value?.[0];
                const maxConnInput = inputs[Plugins.INPUT.TELEGRAM_BOT.BOT_MAX_CONNECTIONS]?.stringInputs?.value?.[0];
                const secretInput = inputs[Plugins.INPUT.TELEGRAM_BOT.BOT_SECRET_TOKEN]?.stringInputs?.value?.[0];
                const dropPending = true;

                // Validation
                if (!urlInput || !urlInput.startsWith('https://')) {
                    return CardService.newActionResponseBuilder()
                        .setNotification(CardService.newNotification().setText("❌ Valid HTTPS URL required."))
                        .build();
                }

                const client = new Plugins.Modules.TelegramBotClient(token);

                // Build Options Object
                const options = {
                    drop_pending_updates: dropPending
                };

                if (maxConnInput) {
                    const maxConn = parseInt(maxConnInput, 10);
                    if (!isNaN(maxConn) && maxConn >= 1 && maxConn <= 100) {
                        options.max_connections = maxConn;
                    }
                }

                // Call API
                const response = client.setWebhook(urlInput, options);
                if (JSON.parse(response.getContentText()).ok !== true) {
                    throw new Error(`API Error ${response.getResponseCode()}: ${response.getContentText()}`);
                }
                // Log response for debugging

                // Plugins.Modules.TerminalOutput.write(activeSpreadsheet, e, 'Webhook.SetWebhook', 'DEBUG', `setWebhook Response: ${response.getContentText()}`);
                return Plugins.Webhook.Controller.Load({ commonEventObject: { parameters: { update: 'true' } } });
            } catch (error) {
                // Log error for debugging
                Plugins.Modules.TerminalOutput.write(activeSpreadsheet, e, 'Webhook.SetWebhook', 'ERROR', error.toString(), error.stack);
                return CardService.newActionResponseBuilder()
                    .setNotification(CardService.newNotification().setText(`❌ Error: ${error.message}`))
                    .build();
            }
        }
    },

    View: {
        /**
         * Main Interface Card
         */
        HomeCard: (data = {}, result = {}) => {
            const cardBuilder = CardService.newCardBuilder()
                .setName(Plugins.Webhook.id + '-Home')
                .setHeader(CardService.newCardHeader()
                    .setTitle(Plugins.Webhook.name)
                    .setSubtitle(Plugins.Webhook.short_description)
                    .setImageStyle(CardService.ImageStyle.SQUARE)
                    .setImageUrl(Plugins.Webhook.imageUrl));

            // --- 1. Connection Header ---
            cardBuilder.addSection(Plugins.TelegramBotConnection.View.WelcomeSection(data));

            // Action Buttons
            const footer = CardService.newFixedFooter()
                .setPrimaryButton(CardService.newTextButton()
                    .setMaterialIcon(CardService.newMaterialIcon()
                        .setName(result.url ? 'update' : 'add')
                        .setFill(false))
                    .setText(result.url ? 'Update' : 'Set Webhook')
                    //.setTextButtonStyle(CardService.TextButtonStyle.FILLED)
                    .setBackgroundColor(Plugins.primaryColor())
                    .setOnClickAction(CardService.newAction()
                        .setFunctionName('Plugins.Webhook.Controller.SetWebhook')
                        // Collect all inputs
                        .addRequiredWidget([Plugins.INPUT.TELEGRAM_BOT.BOT_WEBHOOK_URL])
                        .addRequiredWidget([Plugins.INPUT.TELEGRAM_BOT.BOT_MAX_CONNECTIONS])));

            // --- 2. Live Status Logic ---
            if (result.url !== '') {
                // Delete Button (Only if active)
                footer.setSecondaryButton(CardService.newTextButton()
                    .setMaterialIcon(CardService.newMaterialIcon()
                        .setName('delete')
                        .setFill(false))
                    .setText('Delete')
                    .setOnClickAction(CardService.newAction()
                        .setFunctionName('Plugins.Webhook.Controller.ConfirmDeleteWebhook')));
            }

            // --- Section A: Status Dashboard ---
            const statusSection = Plugins.Webhook.View.WelcomeSection(data, result);
            cardBuilder.addSection(statusSection);

            // --- Section B: Input Parameters for setWebhook ---
            const configSection = CardService.newCardSection()
                .setHeader('⚙️ Webhook Configuration')
                .setCollapsible(true)
                .setNumUncollapsibleWidgets(2); // Collapsible to save space if not needed

            // Webhook URL (Constraint 5)
            configSection.addWidget(CardService.newTextInput()
                .setFieldName(Plugins.INPUT.TELEGRAM_BOT.BOT_WEBHOOK_URL)
                .setTitle('Webhook URL (Required)')
                .setHint('https://your-script-url/exec')
                .setValue(String(result.url))); // Defaults to current live URL

            // Drop Pending Updates (Constraint 4 & 5)
            configSection.addWidget(CardService.newDecoratedText()
                .setText('Drop Pending Updates')
                .setBottomLabel('Skip old messages in queue upon setting webhook.')
                .setSwitchControl(CardService.newSwitch()
                    .setFieldName(Plugins.INPUT.TELEGRAM_BOT.DROP_PENDING_UPDATES)
                    .setValue('true')
                    .setControlType(CardService.SwitchControlType.CHECK_BOX)));

            // IP Address (Constraint 5)
            configSection.addWidget(CardService.newTextInput()
                .setFieldName(Plugins.INPUT.TELEGRAM_BOT.BOT_IP_ADDRESS)
                .setTitle('Custom IP Address (Optional)')
                .setHint('Bypass DNS resolution with specific IP')
                .setValue(''));

            // Max Connections (Constraint 5)
            configSection.addWidget(CardService.newTextInput()
                .setFieldName(Plugins.INPUT.TELEGRAM_BOT.BOT_MAX_CONNECTIONS)
                .setTitle('Max Connections (1-100)')
                .setHint('Default: 40')
                .setValue(result.max_connections ? result.max_connections.toString() : '40'));

            // Secret Token (Constraint 5)
            configSection.addWidget(CardService.newTextInput()
                .setFieldName(Plugins.INPUT.TELEGRAM_BOT.BOT_SECRET_TOKEN)
                .setTitle('Secret Token (Optional)')
                .setHint('X-Telegram-Bot-Api-Secret-Token header')
                .setValue('')); // We don't get this back from API for security, so leave empty

            cardBuilder.addSection(configSection);

            // --- Section: Raw Data (Debug) ---
            const botName = PropertiesService.getDocumentProperties().getProperty(Plugins.INPUT.TELEGRAM_BOT.BOT_USERNAME) || 'unknown_bot';
            cardBuilder.addSection(
                Plugins.Helper.View
                    .BuildResultSection(botName, 'getWebhookInfo', result));

            // --- 3. Footer Refresh ---

            cardBuilder.setFixedFooter(footer);

            return cardBuilder.build();
        },
        WelcomeSection: (data = {}) => {
            const result = data.webhookInfo || {};
            // --- Section A: Status Dashboard ---
            const statusSection = CardService.newCardSection()
                .setCollapsible(true)
                .setNumUncollapsibleWidgets(1); // Keep the status visible when collapsed
            const openWebhookCardButton = CardService.newTextButton()
                .setAltText('Open Webhook Manager')
                .setMaterialIcon(CardService.newMaterialIcon()
                    .setName('open_in_new')
                    .setFill(false))
                .setBackgroundColor(Plugins.primaryColor())
                .setOnClickAction(CardService.newAction()
                    .setFunctionName('Plugins.Webhook.Controller.Load'));

            // --- 2. Live Status Logic ---
            if (result.url !== '') {
                // Active Status
                statusSection.addWidget(CardService.newDecoratedText()
                    .setTopLabel('📡 Webhook Status')
                    .setText('🟢 Active')
                    .setBottomLabel(String(result.url).length > 25 ? String(result.url).slice(0, 15) + '...' + String(result.url).slice(-10) : String(result.url))
                    .setStartIcon(CardService.newIconImage().setMaterialIcon(
                        CardService.newMaterialIcon()
                            .setName('cloud_done')
                            .setFill(false))) // Constraint 1
                    .setWrapText(true)
                    .setButton(openWebhookCardButton)
                )
            }
            else {
                // Inactive Status
                statusSection.addWidget(CardService.newDecoratedText()
                    .setTopLabel('📡 Webhook Status')
                    .setText('🔘 Inactive')
                    .setBottomLabel('Bot is using Long Polling (no webhook).')
                    .setStartIcon(CardService.newIconImage().setMaterialIcon(
                        CardService.newMaterialIcon()
                            .setName('cloud_off')
                            .setFill(false))) // Constraint 1
                    .setWrapText(true)
                    .setButton(openWebhookCardButton)
                );
            }

            // Traffic/Pending Info
            if (result.pending_update_count > 0) {
                // add divider
                statusSection.addWidget(CardService.newDivider());
                statusSection.addWidget(CardService.newDecoratedText()
                    .setTopLabel('Queue')
                    .setText(`${result.pending_update_count} Pending Updates`)
                    .setStartIcon(CardService.newIconImage().setMaterialIcon(
                        CardService.newMaterialIcon()
                            .setName('hourglass_empty')
                            .setFill(false)))
                    .setWrapText(true)
                    .setButton(
                        CardService.newTextButton()
                            .setText('Drop')
                            .setDisabled(result.url === '')
                            .setOnClickAction(
                                CardService.newAction()
                                    .setFunctionName('Plugins.Webhook.Controller.DropPendingUpdates')
                            )
                    ));
            }

            // Error Info
            if (result.last_error_message) {
                const errorDate = result.last_error_date
                    ? new Date(result.last_error_date * 1000).toLocaleTimeString()
                    : 'Unknown Time';

                // add divider
                statusSection.addWidget(CardService.newDivider());

                statusSection.addWidget(CardService.newDecoratedText()
                    .setTopLabel(`Last Error (${errorDate})`)
                    .setText(`⚠️ ${result.last_error_message}`)
                    .setStartIcon(CardService.newIconImage().setMaterialIcon(
                        CardService.newMaterialIcon()
                            .setName('error_outline')
                            .setFill(false))) // Constraint 1
                    .setWrapText(true));
            }

            // add divider
            statusSection.addWidget(CardService.newDivider());

            const botName = PropertiesService.getDocumentProperties().getProperty(Plugins.INPUT.TELEGRAM_BOT.BOT_USERNAME) || 'unknown_bot';

            // Add dump to result to sheet widget
            statusSection.addWidget(
                Plugins.ResultWidget.View.BuildExportWidget(botName, 'getWebhookInfo', result));

            return statusSection;
        }
    }
};

Plugins.GeminiAgent = {
    id: 'GeminiAgentPlugin',
    name: 'Gemini Agent',
    short_description: 'Set instructions for your Gemini AI agent',
    description: 'Get intelligent suggestions and improvements for your JSON data using Gemini AI. This plugin analyzes your JSON and provides recommendations for optimization, error correction, and best practices.',
    version: '1.0.0',
    imageUrl: Plugins.Media.BIG_TIME_IMG_URL,
    Controller: {
        PushHomeCard(e) {
            try {
                // Extract any necessary data from the event object if needed
                // const formInputs = e?.commonEventObject?.formInputs || {};
                const data = Plugins.Modules.App.getData();

                return CardService.newActionResponseBuilder()
                    .setNavigation(
                        CardService.newNavigation()
                            .pushCard(
                                Plugins.GeminiAgent.View.SetupCard(data))
                    ).build();
            }
            catch (error) {
                return CardService.newActionResponseBuilder()
                    .setNotification(CardService.newNotification()
                        .setText('An error occurred while loading Gemini Setup agent. ' + error.toString()))
                    .build();
            }
        },
        PushSetupCard(e) {
            try {
                const data = Plugins.Modules.App.getData();

                return CardService.newActionResponseBuilder()
                    .setNavigation(
                        CardService.newNavigation()
                            .pushCard(
                                Plugins.GeminiAgent.View.SetupCard(data))
                    ).build();
            }
            catch (error) {
                return CardService.newActionResponseBuilder()
                    .setNotification(CardService.newNotification()
                        .setText('An error occurred while loading Gemini API settings. ' + error.toString()))
                    .build();
            }
        },
        ProcessEventObject(e, activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()) {
            try {
                // Returns the current cell in the active sheet or null if there is no current cell.
                const sheet = activeSpreadsheet.getActiveSheet();

                const currentCell = sheet.getCurrentCell();
                if (!currentCell) {
                    throw new Error('No active cell found. Please select a cell with JSON content to test the agent.');
                }
                // Attempt to parse the cell value as JSON to ensure it's valid before sending it to the agent.
                const cellValue = currentCell.getValue(); // Get the value of the current cell
                const eventObject = JSON.parse(cellValue); // Parse the JSON value
                // If parsing is successful, we can set this JSON as the input for the agent to test it.
                // For testing purposes, we can directly call the DoPost function of the Webhook handler with this JSON as if it were an incoming message.
                Plugins.Handlers.Webhook.DoPost(eventObject, activeSpreadsheet);

                return CardService.newActionResponseBuilder()
                    .setNotification(CardService.newNotification()
                        .setText('Agent test executed. Check the terminal output for details.'))
                    .build();
            }
            catch (error) {
                Plugins.Modules.TerminalOutput.write(this._activeSpreadsheet, e, error, 'ERROR', error.toString(), error.toString());
                return CardService.newActionResponseBuilder()
                    .setNotification(CardService.newNotification()
                        .setText('An error occurred while testing the agent ->' + error.toString()))
                    .build();
            }
        },
        Connect(e) {
            const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
            try {
                const formInputs = e?.commonEventObject?.formInputs || {};
                // Extract the Gemini API key from the form inputs
                const apiKey = formInputs?.[Plugins.INPUT.GEMINI.GEMINI_API_KEY]?.stringInputs?.value[0];
                // Extract the Gemini model from the form inputs
                const model = formInputs?.[Plugins.INPUT.GEMINI.GEMINI_MODEL]?.stringInputs?.value[0];

                // Save the Gemini API key
                Plugins.Modules.GeminiAgent.saveApiKey(apiKey);
                // Save the Gemini model selection
                Plugins.Modules.GeminiAgent.saveModel(model);

                // Push Setup Card to show the connected status and allow the user to test the connection or set instructions.
                const data = Plugins.Modules.App.getData();
                return CardService.newActionResponseBuilder()
                    .setNavigation(
                        CardService.newNavigation()
                            .popToRoot()
                            .updateCard(
                                Plugins.Home.View.HomeCard(data))
                    ).build();
            } catch (error) {
                Plugins.Modules.TerminalOutput.write(this._activeSpreadsheet, e, error, 'ERROR', error.toString(), error.toString());
                return CardService.newActionResponseBuilder()
                    .setNotification(CardService.newNotification()
                        .setText('An error occurred while connecting to Gemini API. ' + error.toString()))
                    .build();
            }
        },
        ConfirmDisconnect(e) {
            // Show confirmation card before disconnecting
            const title = 'Disconnect Gemini API';
            const message = 'Are you sure you want to disconnect your Gemini API? This will remove the stored API key.';
            const onClickFunctionName = 'Plugins.GeminiAgent.Controller.Disconnect';
            const onClickParameters = e?.commonEventObject?.parameters || {};

            // Push Confirmation Card
            return Plugins.ConfirmationCard.Controller.Load({
                commonEventObject: {
                    parameters: { title, message, onClickFunctionName, onClickParameters }
                }
            });
        },
        Disconnect(e) {
            const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
            try {
                // Show confirmation card before disconnecting
                const onClickParameters = e?.commonEventObject?.parameters || {};

                // Push Confirmation Card
                const confirmationCard = Plugins.ConfirmationCard.Controller.Load(e);

                // Log the event for debugging
                // Plugins.Modules.TerminalOutput.write(activeSpreadsheet, e, 'Connection.Disconnect', 'INFO', 'Disconnecting bot');

                // Clear the stored token from user properties
                Plugins.Modules.GeminiAgent.clearApiKey();
                Plugins.Modules.GeminiAgent.clearModel();
                // Build and return the Home Card
                const data = Plugins.Modules.App.getData();
                return CardService.newActionResponseBuilder()
                    .setNavigation(
                        CardService.newNavigation()
                            .popToRoot()
                            .updateCard(Plugins.Home.View.HomeCard(data))
                    ).build();
            } catch (error) {
                Plugins.Modules.TerminalOutput.write(this._activeSpreadsheet, e, error, 'ERROR', error.toString(), error.toString());
                return CardService.newActionResponseBuilder()
                    .setNotification(CardService.newNotification()
                        .setText('An error occurred while disconnecting from Gemini API. ' + error.toString()))
                    .build();
            }
        },
        SetCurrentCellAsInstruction(e) {
            const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
            try {
                const currentCell = activeSpreadsheet.getActiveSheet().getCurrentCell();
                if (!currentCell) {
                    throw new Error('No active cell found. Please select a cell with JSON content to bind as instruction.');
                }
                const a1Notation = currentCell.getA1Notation();
                const sheetName = currentCell.getSheet().getName();
                const cellReference = `${sheetName}!${a1Notation}`;

                // Store the cell reference in script properties or user properties for later retrieval when generating suggestions. This allows the agent to access the content of this cell as part of its context when providing suggestions.
                PropertiesService.getDocumentProperties().setProperty(Plugins.INPUT.GEMINI.INSTRUCTION_CELL_REFERENCE, cellReference);

                // Show a notification to the user confirming that the cell has been bound as an instruction.
                return CardService.newActionResponseBuilder()
                    .setNotification(CardService.newNotification()
                        .setText(`Current cell ${cellReference} has been bound as instruction for the Gemini Agent. You must set this value manually at Document Properties -> ${Plugins.INPUT.GEMINI.INSTRUCTION_CELL_REFERENCE} to make it work with webhooks. This is a limitation of the current implementation.`))
                    .build();
            } catch (error) {
                Plugins.Modules.TerminalOutput.write(this._activeSpreadsheet, e, error, 'ERROR', error.toString(), error.toString());
                return CardService.newActionResponseBuilder()
                    .setNotification(CardService.newNotification()
                        .setText('An error occurred while binding the current cell as instruction. ' + error.toString()))
                    .build();
            }
        }
    },

    View: {
        WelcomeSection: (data = {}) => {
            const geminiApiKey = data[Plugins.INPUT.GEMINI.GEMINI_API_KEY] || '';
            const maskedApiKey = geminiApiKey ? '****' + geminiApiKey.slice(-4) : 'No API Key';
            const isConnected = !!geminiApiKey;

            // Professional Status Section
            const section = CardService.newCardSection()
                .setCollapsible(true)
                .setNumUncollapsibleWidgets(1); // Keep the status visible when collapsed

            if (!isConnected) {
                section.addWidget(CardService.newTextParagraph()
                    .setText('Welcome! Please enter your Gemini API key in the settings to get started.'));
            }

            let executeAction;
            if (isConnected) {
                // Disconnect action
                executeAction = CardService.newAction()
                    .setFunctionName('Plugins.GeminiAgent.Controller.ConfirmDisconnect');
            } else {
                // Connect action
                executeAction = CardService.newAction()
                    .setFunctionName('Plugins.GeminiAgent.Controller.PushSetupCard');
            }

            let xButton;

            if (isConnected) {
                xButton = CardService.newTextButton()
                    .setAltText('Unlink Api Key')
                    //.setTextButtonStyle(CardService.TextButtonStyle.TEXT)
                    .setMaterialIcon(
                        CardService.newMaterialIcon()
                            .setName('link_off')
                            .setFill(false))
                    .setOnClickAction(executeAction);
            } else {
                xButton = CardService.newTextButton()
                    .setText('Link API Key')
                    .setBackgroundColor(Plugins.primaryColor())
                    .setOnClickAction(executeAction);
            }

            section.addWidget(CardService.newDecoratedText()
                .setTopLabel('Gemini API State:')
                .setText(isConnected ? `LIVE: ${maskedApiKey}` : 'OFFLINE: No API Key set')
                .setBottomLabel(isConnected ? `@${geminiApiKey}` : 'Establish a secure connection to start.')
                .setStartIcon(
                    CardService.newIconImage()
                        .setMaterialIcon(
                            CardService.newMaterialIcon()
                                .setName(isConnected ? 'check_circle' : 'cancel')
                                .setFill(false)))
                .setButton(
                    xButton));

            return section;
        },
        SetupCard: (data = {}) => {
            const cardBuilder = CardService.newCardBuilder()
                .setName(Plugins.GeminiAgent.id + '-Setup');

            // Add a section for Gemini API key input
            cardBuilder.addSection(
                Plugins.GeminiAgent.View
                    ._BuildGeminiApiKeyInputSection(data));

            // Add a section for selecting Gemini model
            cardBuilder.addSection(
                Plugins.GeminiAgent.View
                    ._BuildModelSelectorSection(data));

            // Add a button to save Gemini API settings
            cardBuilder.addSection(
                CardService.newCardSection()
                    .addWidget(CardService.newTextButton()
                        .setText('Save Gemini API Settings')
                        .setOnClickAction(CardService.newAction()
                            .setFunctionName('Plugins.GeminiAgent.Controller.Connect')
                            .addRequiredWidget(Plugins.INPUT.GEMINI.GEMINI_API_KEY)
                            .addRequiredWidget(Plugins.INPUT.GEMINI.GEMINI_MODEL))));

            // Add button to bind current cell as instruction for the agent (to provide context-aware suggestions based on the content of the current cell in the sheet)
            cardBuilder.addSection(
                CardService.newCardSection()
                    .addWidget(
                        CardService.newDecoratedText()
                            .setTopLabel('Bind Current Cell as Instruction')
                            .setWrapText(true)
                            .setText(`${data[Plugins.INPUT.GEMINI.INSTRUCTION_CELL_REFERENCE] || 'No instruction cell bound.'}`)
                            .setBottomLabel('Use the content of the currently selected cell as the system instruction for the Gemini Agent.')
                            .setStartIcon(
                                CardService.newIconImage()
                                    .setMaterialIcon(CardService.newMaterialIcon()
                                        .setName('cell_wifi')
                                        .setFill(false))
                            )
                            .setButton(
                                CardService.newTextButton()
                                    .setAltText('Bind Current Cell')
                                    .setMaterialIcon(CardService.newMaterialIcon().setName('link').setFill(false))
                                    .setBackgroundColor(Plugins.primaryColor())
                                    .setOnClickAction(CardService.newAction()
                                        .setFunctionName('Plugins.GeminiAgent.Controller.SetCurrentCellAsInstruction'))))
            );


            return cardBuilder.build();
        },
        _BuildModelSelectorSection(data = {}) {
            const section = CardService.newCardSection();

            // Add a dropdown to select the Gemini model
            const geminiModelSelector = CardService.newSelectionInput()
                .setType(CardService.SelectionInputType.DROPDOWN)
                .setTitle('Select Gemini Model')
                .setFieldName(Plugins.INPUT.GEMINI.GEMINI_MODEL);

            // Loop through the available Gemini models and add them as options to the selector
            const geminiModels = Plugins.Modules.GeminiAgent.MODELS;
            for (const modelKey in geminiModels) {
                const model = geminiModels[modelKey];
                geminiModelSelector.addItem(model, modelKey, data[Plugins.INPUT.GEMINI.GEMINI_MODEL] === modelKey);
            }

            section.addWidget(geminiModelSelector);

            return section;
        },
        _BuildMoodSelectorSection(data = {}) {
            const section = CardService.newCardSection();

            // Add a dropdown to select the mood for the Gemini Assistant's responses
            const moodSelector = CardService.newSelectionInput()
                .setType(CardService.SelectionInputType.DROPDOWN)
                .setTitle('Select Response Mood')
                .setFieldName(Plugins.INPUT.GEMINI.GEMINI_MOOD);
            // Loop through the available mood options and add them as options to the selector
            const moodOptions = Plugins.Modules.GeminiAgent.MOOD_OPTIONS;
            for (const mood of moodOptions) {
                moodSelector.addItem(mood, mood, data[Plugins.INPUT.GEMINI.GEMINI_MOOD] === mood);
            }

            section.addWidget(moodSelector);

            return section;
        },
        _BuildGeminiApiKeyInputSection(data = {}) {
            return CardService.newCardSection()
                .setHeader('Gemini API Key Configuration')
                // Add divider
                .addWidget(CardService.newDivider())
                // Add text input for Gemini API key
                .addWidget(CardService.newTextInput()
                    .setFieldName(Plugins.INPUT.GEMINI.GEMINI_API_KEY)
                    .setTitle('Gemini API Key')
                    .setHint('Enter your Gemini API key')
                    .setValue(data[Plugins.INPUT.GEMINI.GEMINI_API_KEY] || ''));
        },
        _BuildTemperatureInputSection(data = {}) {
            return CardService.newCardSection()
                .setHeader('Temperature Configuration')
                // Add divider
                .addWidget(CardService.newDivider())
                // Add text input for temperature
                .addWidget(CardService.newTextInput()
                    .setFieldName(Plugins.INPUT.GEMINI.GEMINI_TEMPERATURE)
                    .setTitle('Temperature (0.0 - 2.0)')
                    .setHint('Controls the randomness of the output. Default is 1.0')
                    .setValue(data[Plugins.INPUT.GEMINI.GEMINI_TEMPERATURE] || '1.0'));

        },
        _BuildThinkingLevelSelectorSection(data = {}) {
            const section = CardService.newCardSection();

            // Add a dropdown to select the thinking level for the Gemini Assistant's responses
            const thinkingLevelSelector = CardService.newSelectionInput()
                .setType(CardService.SelectionInputType.DROPDOWN)
                .setTitle('Select Thinking Level')
                .setFieldName(Plugins.INPUT.GEMINI.THINKING_LEVEL);
            // Loop through the available thinking level options and add them as options to the selector
            const thinkingLevelOptions = Plugins.Modules.GeminiAgent.THINKING_LEVEL_OPTIONS;
            for (const level of thinkingLevelOptions) {
                thinkingLevelSelector.addItem(level, level, data[Plugins.INPUT.GEMINI.THINKING_LEVEL] === level);
            }
            section.addWidget(thinkingLevelSelector);
            return section;
        },
        _BuildThinkingBudgetInputSection(data = {}) {
            return CardService.newCardSection()
                .setHeader('Thinking Budget Configuration')
                // Add divider
                .addWidget(CardService.newDivider())
                // Add text input for thinking budget
                .addWidget(CardService.newTextInput()
                    .setFieldName(Plugins.INPUT.GEMINI.THINKING_BUDGET)
                    .setTitle('Thinking Budget (in tokens)')
                    .setHint('Controls the amount of "thinking" the AI does before responding. Default is 100 tokens.')
                    .setValue(data[Plugins.INPUT.GEMINI.THINKING_BUDGET] || '100'));
        },
        /**
         * Builds the "Advanced Actions" section of the Gemini Assistant Home Card, which includes buttons for creating and editing custom system instructions. This section allows users to customize how the Gemini Assistant analyzes sheet data and generates JSON content by providing their own instructions, enhancing the AI's performance and tailoring it to their specific use cases and preferences.
         */
        _BuildAdvancedActionsSection(data = {}) {
            const section = CardService.newCardSection()
                .setHeader('Advanced Actions');

            // Add set of buttons for advanced actions.
            const buttonSet = CardService.newButtonSet()
                // The "New Instruction" button allows users to create a new custom system instruction for the Gemini Assistant, which can help tailor the AI's behavior to better suit their specific use case or preferences when generating JSON content based on sheet data.
                .addButton(CardService.newTextButton()
                    .setText('New Instruction')
                    .setMaterialIcon(CardService.newMaterialIcon().setName('add'))
                    .setOnClickAction(CardService.newAction()
                        .setFunctionName('Plugins.GeminiAgent.Controller.PushInstructionsCard')))
                // The "Edit Instruction" button allows users to edit their existing custom system instruction for the Gemini Assistant, providing an opportunity to refine and improve the AI's performance in analyzing sheet data and generating JSON content according to their evolving needs and preferences.
                .addButton(CardService.newTextButton()
                    .setText('Edit Instruction')
                    .setMaterialIcon(CardService.newMaterialIcon().setName('edit'))
                    .setOnClickAction(CardService.newAction()
                        .setFunctionName('Plugins.GeminiAgent.Controller.PushInstructionsCard')
                        .setParameters({
                            bindCell: 'true'
                        })
                    ));

            section.addWidget(buttonSet);


            return section;
        }
    }
};

Plugins.GetMe = {
    id: 'GetMePlugin',
    name: 'Get Me',
    imageUrl: Plugins.Media.DEFAULT_IMAGE_URL, // Falls back to default if specific icon isn't set
    description: 'Verify your bot connection and view identity details.',
    short_description: 'Bot identity & capabilities',
    Controller: {

        /**
         * Entry point for the Get Me plugin
         */
        Load: (e) => {
            const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
            try {
                // Log the event for debugging
                const data = e?.commonEventObject?.parameters || {};

                // Optional: Check if we are forcing a refresh via parameters
                const isUpdate = data.update === 'true';

                const input_token = PropertiesService.getDocumentProperties().getProperty(Plugins.INPUT.TELEGRAM_BOT.BOT_API_TOKEN);
                if (!input_token) {
                    throw new Error('Bot API Token is not set. Please connect your bot first.');
                }

                // Fetch bot current bot name for logging purposes
                data.currentBotName = (PropertiesService.getDocumentProperties().getProperty(Plugins.INPUT.TELEGRAM_BOT.BOT_USERNAME) || 'unknown_bot') + '_***' + input_token.slice(-6);

                // Initialize Telegram Bot Client
                const telegramBotClient = new Plugins.Modules.TelegramBotClient(input_token);
                // 1. API Call: getMe
                const response = telegramBotClient.getMe();
                // Log the raw response for debugging
                Plugins.Modules.TerminalOutput.write(activeSpreadsheet, 'GetMe.Load', 'DEBUG', data, `getMe Response: ${response.getContentText()}`);

                // Check for errors in response
                if (JSON.parse(response.getContentText()).ok !== true) {
                    throw new Error(`API Error ${response.getResponseCode()}: ${response.getContentText()}`);
                }

                // Parse the result
                const result = JSON.parse(response.getContentText()).result;

                // 2. Navigation Handling
                let navigation = CardService.newNavigation();

                if (isUpdate) {
                    // Update the existing card in place
                    navigation.updateCard(
                        Plugins.GetMe.View.HomeCard(data, result));
                } else {
                    // Push a new card onto the stack
                    navigation.pushCard(
                        Plugins.GetMe.View.HomeCard(data, result));
                }

                return CardService.newActionResponseBuilder()
                    .setNavigation(navigation)
                    .build();
            }
            catch (error) {
                Plugins.Modules.TerminalOutput.write(activeSpreadsheet, 'GetMe.Load', 'ERROR', e, error.toString(), error.stack);
                // Return notification of error
                return CardService.newActionResponseBuilder()
                    .setNotification(
                        CardService.newNotification()
                            .setText(
                                error.toString()))
                    .build();
            }
        }
    },
    View: {
        /**
         * Builds the main interface card
         */
        HomeCard: (data = {}, result = {}) => {
            // 1. Data Initialization
            const cardBuilder = CardService.newCardBuilder()
                .setName(Plugins.GetMe.id + '-Home')
                .setHeader(CardService.newCardHeader()
                    .setTitle('Bot Dashboard')
                    .setSubtitle('Identity & Feature Configuration')
                    .setImageStyle(CardService.ImageStyle.SQUARE)
                    .setImageUrl(Plugins.GetMe.imageUrl));

            // 1. Main Section: Bot Identity & Capabilities
            // --- Section A: Identity Profile ---
            const profileSection = CardService.newCardSection()
                .setHeader('🤖 Identity Profile');

            // Display Name & ID
            profileSection.addWidget(CardService.newDecoratedText()
                .setTopLabel('Display Name')
                .setText(`<b>${result.first_name}${result.last_name ? ' ' + result.last_name : ''}</b>`)
                .setBottomLabel(`Bot ID: ${result.id}`)
                .setStartIcon(CardService.newIconImage().setMaterialIcon(
                    CardService.newMaterialIcon().setName('badge').setFill(false)))
                .setWrapText(true));

            // Username & Link
            profileSection.addWidget(CardService.newDecoratedText()
                .setTopLabel('Username')
                .setText(`@${result.username}`)
                .setStartIcon(CardService.newIconImage().setMaterialIcon(
                    CardService.newMaterialIcon().setName('alternate_email').setFill(false)))
                .setButton(CardService.newTextButton()
                    .setText('Open Chat')
                    .setOpenLink(CardService.newOpenLink()
                        .setUrl(`https://t.me/${result.username}`))));

            cardBuilder.addSection(profileSection);

            // --- Section: Debug/Raw Data ---
            cardBuilder.addSection(
                Plugins.Helper.View.BuildResultSection(data.currentBotName, 'getMe', result));


            // 2. Footer: Refresh Action
            const footer = CardService.newFixedFooter()
                .setPrimaryButton(CardService.newTextButton()
                    .setText('Refresh Data')
                    .setMaterialIcon(CardService.newMaterialIcon()
                        .setName('refresh')
                        .setFill(false)) // Constraint check: setFill(false)
                    .setOnClickAction(CardService.newAction()
                        .setFunctionName('Plugins.GetMe.Controller.Load')
                        .setParameters({ update: 'true' })));

            cardBuilder.setFixedFooter(footer);

            return cardBuilder.build();
        }
    }
};

Plugins.GetChat = {
    id: 'GetChatPlugin',
    name: 'Chat Inspector',
    imageUrl: Plugins.Media.DEFAULT_IMAGE_URL,
    description: 'Retrieve detailed information about users, groups, or channels your bot interacts with.',
    short_description: 'User, Group & Channel details',
    Controller: {
        /**
         * Entry Point
         */
        Load: (e) => {
            const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
            try {
                // Log start of execution
                Plugins.Modules.TerminalOutput.write(activeSpreadsheet, 'GetChat.Load', 'Start', e, 'Loading Chat Info');

                const data = e?.commonEventObject?.parameters || {};
                const isUpdate = data.update === 'true';
                const input_token = PropertiesService.getDocumentProperties().getProperty(Plugins.INPUT.TELEGRAM_BOT.BOT_API_TOKEN);
                if (!input_token) {
                    throw new Error('Bot API Token is not set. Please connect your bot first.');
                }

                // Fetch bot current bot name for logging purposes
                data.currentBotName = (PropertiesService.getDocumentProperties().getProperty(Plugins.INPUT.TELEGRAM_BOT.BOT_USERNAME) || 'unknown_bot') + '_***' + input_token.slice(-6);

                // Extract Chat ID from form inputs if available (user clicked Search)
                // or fall back to parameters/properties
                const searchChatId = e?.commonEventObject?.formInputs?.txt_search_chat_id?.stringInputs?.value?.[0] || '';
                if (searchChatId) {
                    data.txt_search_chat_id = searchChatId;

                    // 1. API Call: getChat
                    const client = new TelegramBotClient(input_token);
                    // API Call: getChat
                    const response = client.getChat(searchChatId);

                    if (JSON.parse(response.getContentText()).ok !== true) {
                        throw new Error(`Telegram API Error: ${response.getContentText()}`);
                    }

                    const result = JSON.parse(response.getContentText()).result;

                    // 2. Navigation Handling
                    let navigation = CardService.newNavigation();

                    if (isUpdate) {
                        // Update the existing card in place
                        navigation.updateCard(
                            Plugins.GetChat.View.HomeCard(data, result));
                    }
                    else {
                        // Push a new card onto the stack
                        navigation.pushCard(
                            Plugins.GetChat.View.HomeCard(data, result));
                    }

                    return CardService.newActionResponseBuilder()
                        .setNavigation(navigation)
                        .build();
                }

                // No search ID provided, just show the Home Card
                return CardService.newActionResponseBuilder()
                    .setNavigation(
                        CardService.newNavigation().pushCard(
                            Plugins.GetChat.View.HomeCard(data, null)))
                    .build();
            } catch (error) {
                Plugins.Modules.TerminalOutput.write(activeSpreadsheet, 'GetChat.Load', 'ERROR', e, error.toString(), error.stack);

                // Return notification of error
                return CardService.newActionResponseBuilder()
                    .setNotification(
                        CardService.newNotification()
                            .setText(
                                error.toString()))
                    .build();
            }
        }
    },

    View: {
        /**
         * Main Interface Builder
         */
        HomeCard: (data = {}, result = null) => {
            // 1. Data Initialization
            const searchId = data.txt_search_chat_id || '';

            const cardBuilder = CardService.newCardBuilder()
                .setName(Plugins.GetChat.id + '-Home')
                .setHeader(CardService.newCardHeader()
                    .setTitle(Plugins.GetChat.name)
                    .setSubtitle(Plugins.GetChat.short_description)
                    .setImageStyle(CardService.ImageStyle.SQUARE)
                    .setImageUrl(Plugins.GetChat.imageUrl));

            // --- Search Section ---
            const searchSection = CardService.newCardSection()
                .setHeader('🔍 Target Selector');

            searchSection.addWidget(CardService.newTextInput()
                .setFieldName(Plugins.PROPERTIES.txt_search_chat_id)
                .setTitle('Chat ID or Username')
                .setHint('Enter the Chat ID (e.g., -1001234567890) or Username (e.g., @channelusername)')
                .setValue(data.txt_search_chat_id || ''));

            cardBuilder.addSection(searchSection);

            // --- Footer Actions ---
            const footer = CardService.newFixedFooter()
                .setPrimaryButton(CardService.newTextButton()
                    .setText('Search Chat')
                    .setMaterialIcon(CardService.newMaterialIcon()
                        .setName('search')
                        .setFill(false)) // Constraint: setFill(false)
                    .setOnClickAction(CardService.newAction()
                        .setFunctionName('Plugins.GetChat.Controller.Load')
                        .setParameters({ update: 'true' })
                        .addRequiredWidget([Plugins.PROPERTIES.txt_search_chat_id])));

            cardBuilder.setFixedFooter(footer);

            // ---  ---
            if (!result) {
                return cardBuilder.build();
            }

            // --- Section A: Identity Header ---
            // Determine icon based on chat type
            let typeIcon = 'help_outline'; // default
            if (result.type === 'private') typeIcon = 'person';
            else if (result.type === 'channel') typeIcon = 'campaign'; // broadcast
            else if (result.type.includes('group')) typeIcon = 'groups';

            // Determine Display Title (User vs Chat)
            const title = result.title || `${result.first_name} ${result.last_name || ''}`.trim();

            const identitySection = CardService.newCardSection();

            identitySection.addWidget(CardService.newDecoratedText()
                .setTopLabel(result.type.toUpperCase())
                .setText(`<b>${title}</b>`)
                .setBottomLabel(`ID: ${result.id}`)
                .setStartIcon(CardService.newIconImage().setMaterialIcon(
                    CardService.newMaterialIcon()
                        .setName(typeIcon)
                        .setFill(false))) // Constraint: setFill(false)
                .setWrapText(true));

            // add divider
            identitySection.addWidget(CardService.newDivider());

            if (result.username) {
                // Username & Link
                identitySection.addWidget(CardService.newDecoratedText()
                    .setText(`@${result.username}`)
                    .setStartIcon(CardService.newIconImage().setMaterialIcon(
                        CardService.newMaterialIcon()
                            .setName('alternate_email')
                            .setFill(false)))
                    .setButton(CardService.newTextButton()
                        .setText('Open')
                        .setOpenLink(CardService.newOpenLink()
                            .setUrl(`https://t.me/${result.username}`))));

                // add divider
                identitySection.addWidget(CardService.newDivider());
            }

            // Add dump to result to sheet widget
            identitySection.addWidget(
                Plugins.ExportApiResultWidget.View.BuildExportWidget(data.currentBotName, 'getChat', result));

            cardBuilder.addSection(identitySection);

            // --- Section B: Detailed Properties ---
            cardBuilder.addSection(
                Plugins.Helper.View.BuildResultSection(data.currentBotName, 'getChat', result));

            return cardBuilder.build();
        }
    }
};

Plugins.MCPCard = {
    id: 'MCPCard',
    name: 'MCP Manager',
    short_description: 'Manage your MCP Host, Clients and Servers in one place',
    description: 'Manage your MCP Host, Clients and Servers in one place. Get real-time insights into server status, connected clients, and easily configure your MCP setup without leaving Google Sheets.',
    version: '1.0.0',
    imageUrl: Plugins.Media.BIG_TIME_IMG_URL,
    Controller: {
        PushHomeCard(e) {
            try {
                // Extract any necessary data from the event object if needed
                // const formInputs = e?.commonEventObject?.formInputs || {};
                let data = Plugins.Modules.App.getData();
                return CardService.newActionResponseBuilder()
                    .setNavigation(
                        CardService.newNavigation()
                            .pushCard(
                                Plugins.MCPServerCard.View.HomeCard(data))
                    ).build();
            } catch (error) {
                return CardService.newActionResponseBuilder()
                    .setNotification(CardService.newNotification()
                        .setText('An error occurred while loading MCP Server Manager.'))
                    .build();
            }
        },
        PushClientManagementCard(e) {
            let data = Plugins.Modules.App.getData();
            return CardService.newActionResponseBuilder()
                .setNavigation(
                    CardService.newNavigation()
                        .pushCard(
                            Plugins.MCPServerCard.View.ClientManagementCard(data))
                ).build();
        },
        PushServerManagementCard(e) {
            let data = Plugins.Modules.App.getData();
            return CardService.newActionResponseBuilder()
                .setNavigation(
                    CardService.newNavigation()
                        .pushCard(
                            Plugins.MCPServerCard.View.ServerManagementCard(data))
                ).build();
        },
        PushMCPSettingsCard(e) {
            let data = Plugins.Modules.App.getData();
            return CardService.newActionResponseBuilder()
                .setNavigation(
                    CardService.newNavigation()
                        .pushCard(
                            Plugins.MCPServerCard.View.MCPSettingsCard(data))
                ).build();
        }
    },
    View: {
        HomeCard: (data = {}) => {
            const cardBuilder = CardService.newCardBuilder()
                .setName(Plugins.MCPServerCard.id + '-Home')
                .setHeader(CardService.newCardHeader()
                    .setTitle(Plugins.MCPServerCard.name)
                    .setSubtitle(Plugins.MCPServerCard.short_description)
                    .setImageStyle(CardService.ImageStyle.SQUARE)
                    .setImageUrl(Plugins.MCPServerCard.imageUrl)
                    .setImageAltText('MCP Server Manager Logo'));

            // Add sections and widgets to display MCP Server status, connected clients, and management actions here.
            const statusSection = CardService.newCardSection()
                .setHeader('MCP Server Status');
            // Example widget to show server status (replace with actual status data)
            statusSection.addWidget(CardService.newDecoratedText()
                .setText('Server is running')
                .setStartIcon(CardService.newIconImage().setMaterialIcon(
                    CardService.newMaterialIcon()
                        .setName('check_circle')
                        .setFill(false)))
            );
            cardBuilder.addSection(statusSection);

            // Add more sections/widgets for connected clients and management actions as needed.
            return cardBuilder.build();
        },
        ClientManagementCard: (data = {}) => {
            const cardBuilder = CardService.newCardBuilder()
                .setName(Plugins.MCPServerCard.id + '-ClientManagement');
            // Build the Client Management Card UI here, showing a list of connected clients and actions to manage them.
            return cardBuilder.build();
        },
        ServerManagementCard: (data = {}) => {
            const cardBuilder = CardService.newCardBuilder()
                .setName(Plugins.MCPServerCard.id + '-ServerManagement');
            // Build the Server Management Card UI here, showing a list of servers and actions to manage them.
            return cardBuilder.build();
        },
        MCPSettingsCard: (data = {}) => {
            const cardBuilder = CardService.newCardBuilder()
                .setName(Plugins.MCPServerCard.id + '-Settings');
            // Build the MCP Settings Card UI here, allowing users to configure their MCP setup.
            return cardBuilder.build();
        }
    }

};

Plugins.ResultWidget = {
    id: 'ResultWidget',
    name: 'Result Exporter',
    short_description: 'Export operation results to Google Sheets',
    description: 'A widget that allows users to export JSON operation results directly to a Google Sheets spreadsheet for further analysis and record-keeping.',
    version: '1.0.0',
    imageUrl: Plugins.Media.YOU_GOT_IT_IMG_URL,
    Controller: {
        Load: (e) => {
            try {
                const result = e?.commonEventObject?.parameters?.result ? JSON.parse(e.commonEventObject.parameters.result) : {};
                return CardService.newActionResponseBuilder()
                    .setNavigation(
                        CardService.newNavigation()
                            .pushCard(Plugins.ResultWidget.View.BuildResultCard(result))
                    ).build();
            } catch (error) {
                return CardService.newActionResponseBuilder()
                    .setNotification(
                        CardService.newNotification()
                            .setText(`❌ Error loading result card: ${error.toString()}`))
                    .build();
            }
        },
        DumpResultToSheet: (e) => {
            const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();

            try {
                // extract parameters
                const a1n = e?.commonEventObject?.parameters?.a1n || 'A1';
                const sheetName = e?.commonEventObject?.parameters?.sheetName || Plugins.Modules.Sheet.DUMP_SHEET_NAME;
                const botName = e?.commonEventObject?.parameters?.botName || '[Unknown Bot]';
                const report = e?.commonEventObject?.parameters?.report || '{}';

                // Dump data to sheet
                Plugins.Modules.Sheet
                    .dumpObjectToSheet(
                        activeSpreadsheet, { name: sheetName }, botName, a1n, JSON.parse(report), false);

                // Return action response with notification
                return CardService.newActionResponseBuilder()
                    .setNotification(
                        CardService.newNotification()
                            .setText(`✅ Data dumped to sheet "${sheetName}" successfully at range "${a1n}".`))
                    .build();
            }
            catch (error) {
                return CardService.newActionResponseBuilder()
                    .setNotification(
                        CardService.newNotification()
                            .setText(`❌ Error dumping data to sheet: ${error.toString()}`))
                    .build();
            }
        },
        HighlightRange: (e) => {
            const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
            try {
                // extract parameters
                const a1n = e?.commonEventObject?.parameters?.a1n || 'A1';
                const sheetName = e?.commonEventObject?.parameters?.sheetName || activeSpreadsheet.getActiveSheet().getName();
                const sheet = activeSpreadsheet.getSheetByName(sheetName);
                const range = sheet.getRange(a1n);
                // Highlight the range with a yellow background
                const hightlightColor = PropertiesService.getDocumentProperties().getProperty(Plugins.PROPERTIES.highlight_color) || '#FFFF00';
                range.setBackground(hightlightColor);

                // Return action response with notification
                return CardService.newActionResponseBuilder()
                    .setNotification(
                        CardService.newNotification()
                            .setText(`✅ Highlighted range "${a1n}" in sheet "${sheetName}".`))
                    .build();
            }
            catch (error) {
                return CardService.newActionResponseBuilder()
                    .setNotification(
                        CardService.newNotification()
                            .setText(`⚠️ Error highlighting range: ${error.toString()}`))
                    .build();
            }
        }
    },
    View: {
        HomeCard: (result = {}) => {
            const cardBuilder = CardService.newCardBuilder()
                .setName(Plugins.ResultWidget.id + '-ResultCard')
                .setHeader(CardService.newCardHeader()
                    .setTitle('Operation Result')
                    .setSubtitle('View and export operation results')
                    .setImageStyle(CardService.ImageStyle.SQUARE)
                    .setImageUrl(Plugins.ResultWidget.imageUrl)
                    .setImageAltText('Result Image'));

            // Add Result Summary Section
            cardBuilder.addSection(
                Plugins.ResultWidget.View
                    .BuildResultSummarySection(result.range, result.report)
            );

            // Add Detailed Result Widgets
            const detailSection = CardService.newCardSection()
                .setHeader('📋 Detailed Results')
                .setCollapsible(true)
                .setNumUncollapsibleWidgets(4);

            // Iterate over each report item and add a widget
            result.report.forEach(reportItem => {
                detailSection.addWidget(
                    Plugins.ResultWidget.View
                        // Add a widget for each detailed result item
                        .BuildResultWidget(reportItem)
                );
            });

            cardBuilder.addSection(detailSection);

            // Add Export Widget
            cardBuilder.addSection(
                CardService.newCardSection()
                    .addWidget(
                        Plugins.ResultWidget.View
                            .BuildExportWidget(result.range.getSheet().getName(), result.range, result.report)
                    )
            );
            return cardBuilder.build();
        },
        BuildResultCard: (result = {}) => {
            return Plugins.ResultWidget.View.HomeCard(result);
        },
        BuildResultSummarySection: (range, report) => {
            return CardService.newCardSection()
                .setHeader('📊 Failures Report')
                .addWidget(
                    CardService.newDecoratedText()
                        .setTopLabel('Affected Range')
                        .setText(range.getA1Notation())
                        .setStartIcon(
                            CardService.newIconImage()
                                .setMaterialIcon(
                                    CardService.newMaterialIcon()
                                        .setName('grid_on'))))
                .addWidget(
                    CardService.newDecoratedText()
                        .setTopLabel('Summary')
                        .setText(`Total: ${range.getNumRows() * range.getNumColumns()}`
                            + ` | Successes: ${report.filter(item => !item.error).length}`
                            + ` | Failures: ${report.filter(item => item.error).length}`)
                        .setWrapText(true)
                        .setStartIcon(
                            CardService.newIconImage()
                                .setMaterialIcon(
                                    CardService.newMaterialIcon()
                                        .setName('assessment'))));
        },
        BuildResultWidget: (reportItem = {}) => {
            return CardService.newDecoratedText()
                //.setTopLabel(`${reportItem.a1n}`)
                .setText(`⚠️ ${reportItem.a1n}`)
                .setWrapText(true)
                .setBottomLabel(`${reportItem.error}`)
                .setButton(
                    CardService.newTextButton()
                        .setAltText('Highlight')
                        .setMaterialIcon(
                            CardService.newMaterialIcon()
                                .setName('highlight'))
                        .setOnClickAction(
                            CardService.newAction()
                                .setFunctionName('Plugins.ResultWidget.Controller.HighlightRange')
                                .setParameters({
                                    a1n: reportItem.a1n,
                                    sheetName: reportItem.sheetName || ''
                                })
                        )
                );
        },
        BuildExportWidget: (botName, a1n, result) => {
            return CardService.newDecoratedText()
                .setTopLabel('📥 Export Data')
                .setText('Export to Sheet')
                .setWrapText(true)
                .setBottomLabel(`Export the operation results to a Google Sheets spreadsheet for further analysis.`)
                .setStartIcon(
                    CardService.newIconImage()
                        .setMaterialIcon(
                            CardService.newMaterialIcon()
                                .setName('save_alt')))
                .setButton(
                    CardService.newTextButton()
                        .setText('Export')
                        .setOnClickAction(
                            CardService.newAction()
                                .setFunctionName('Plugins.ResultWidget.Controller.DumpResultToSheet')
                                .setParameters({
                                    a1n: a1n,
                                    botName: botName,
                                    report: JSON.stringify(result)
                                })
                        )
                );
        }
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Plugins
    };
};
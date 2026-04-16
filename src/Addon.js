/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// src/Addon.js
class Addon {
    static primaryColor() {
        return '#1976d2';
    }

    static secondaryColor() {
        return '#0f9d58';
    }

    static accentColor() {
        return '#f4b400';
    }

    static getData() {
        const documentProperties = PropertiesService.getDocumentProperties();
        const membershipInfo = Common.Modules.CRM.Membership.getMembershipInfo() || {};

        const expiresAt = membershipInfo[Common.INPUT.SYSTEM.MEMBERSHIP.EXPIRES_AT] ? new Date(membershipInfo[Common.INPUT.SYSTEM.MEMBERSHIP.EXPIRES_AT]) : null;
        const balance = membershipInfo[Common.INPUT.SYSTEM.MEMBERSHIP.BALANCE] || 0;
        const isPremium = (expiresAt && expiresAt > new Date()) || balance > 0;
        const indentationSpaces = '4';
        const showErrorsSwitch = documentProperties.getProperty(Common.INPUT.SYSTEM.DISPLAY_ERROR_CARD) || 'OFF';
        const highlightColor = '#FFFF00';
        const terminalOutputSwitch = documentProperties.getProperty(Common.INPUT.SYSTEM.ENABLE_TERMINAL_OUTPUT) || 'ON';
        const ignoreWhitespaceSwitch = documentProperties.getProperty(Common.INPUT.SYSTEM.IGNORE_WHITE_SPACE) || 'ON';
        const geminiApiKey = Common.Modules.GeminiAgent.getApiKey();
        const apiResponseModel = Common.Modules.GeminiAgent.getModel();
        const instructionCellReference = PropertiesService.getDocumentProperties().getProperty(Common.INPUT.GEMINI.INSTRUCTION_CELL_REFERENCE) || '';
        const botApiToken = Common.Modules.TelegramBotSettings.getUserApiKey();
        const botApiEndpoint = PropertiesService.getDocumentProperties().getProperty(Common.INPUT.TELEGRAM_BOT.BOT_API_ENDPOINT_URL)

        let result = { ok: false, description: 'Not connected. Please enter your bot token to fetch webhook info.' };
        if (botApiToken) {
            const telegramBotClient = new Common.Modules.TelegramBotClient(botApiToken);
            const response = telegramBotClient.getWebhookInfo();

            if (JSON.parse(response.getContentText()).ok !== true) {
                result = { error: 'Unable to fetch webhook info. Please check your bot token and connection.' };
            } else {
                // Parse the result
                result = JSON.parse(response.getContentText()).result;
            }
        }

        const leds = Addon.getLeds({
            telegramApiKeySet: !!botApiToken,
            geminiApiKeySet: !!geminiApiKey,
            llmModelSet: !!apiResponseModel,
            webhookSet: !!result.url,
            instructionCellSet: !!instructionCellReference,
            isPremium: isPremium,
        });

        return {
            indentation_spaces: parseInt(indentationSpaces, 10),
            [Common.INPUT.SYSTEM.DISPLAY_ERROR_CARD]: showErrorsSwitch,
            highlight_color: highlightColor,
            [Common.INPUT.SYSTEM.ENABLE_TERMINAL_OUTPUT]: terminalOutputSwitch,
            [Common.INPUT.SYSTEM.IGNORE_WHITE_SPACE]: ignoreWhitespaceSwitch,
            // Telegram Bot Info
            [Common.INPUT.TELEGRAM_BOT.BOT_API_TOKEN]: botApiToken,
            // Gemini API Info
            [Common.INPUT.GEMINI.GEMINI_API_KEY]: geminiApiKey,
            [Common.INPUT.GEMINI.GEMINI_MODEL]: apiResponseModel,
            // Membership Info
            [Common.INPUT.SYSTEM.MEMBERSHIP.MEMBERSHIP_KEY]: membershipInfo,
            [Common.INPUT.SYSTEM.MEMBERSHIP.IS_PREMIUM]: isPremium,
            [Common.INPUT.SYSTEM.MEMBERSHIP.BALANCE]: balance,
            [Common.INPUT.SYSTEM.MEMBERSHIP.EXPIRES_AT]: expiresAt,
            // Gemini Instruction Cell Reference
            [Common.INPUT.GEMINI.INSTRUCTION_CELL_REFERENCE]: instructionCellReference,
            // Package Info
            package: Addon.Package,
            leds: leds,
            webhookInfo: result
        };
    }

    static getLeds(params = {
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
};

class Common {
    static get LANGUAGE_CODES() {
        return {
            en: { name: 'English', nativeName: 'English' },
            es: { name: 'Spanish', nativeName: 'Español' },
            fr: { name: 'French', nativeName: 'Français' },
            ar: { name: 'Arabic', nativeName: 'العربية' },
            de: { name: 'German', nativeName: 'Deutsch' },
            it: { name: 'Italian', nativeName: 'Italiano' },
            pt: { name: 'Portuguese', nativeName: 'Português' },
            ru: { name: 'Russian', nativeName: 'Русский' },
            zh: { name: 'Chinese', nativeName: '中文' },
            ja: { name: 'Japanese', nativeName: '日本語' },
            ko: { name: 'Korean', nativeName: '한국어' },
            he: { name: 'Hebrew', nativeName: 'עברית' },
            fa: { name: 'Persian', nativeName: 'فارسی' },
            hi: { name: 'Hindi', nativeName: 'हिन्दी' },
            bn: { name: 'Bengali', nativeName: 'বাংলা' },
            tr: { name: 'Turkish', nativeName: 'Türkçe' },
            vi: { name: 'Vietnamese', nativeName: 'Tiếng Việt' },
            th: { name: 'Thai', nativeName: 'ไทย' },
            ms: { name: 'Malay', nativeName: 'Bahasa Melayu' },
            id: { name: 'Indonesian', nativeName: 'Bahasa Indonesia' }
        };
    }
};

Common.INPUT = {
    version: '1.1.0',
    get SYSTEM() {
        return {
            get IGNORE_WHITE_SPACE() {
                return 'ignore_white_space';
            },
            get EXPORT_TOKEN() {
                return 'EXPORT_TOKEN'
            },
            get PRAITY_JSON() {
                return 'PRAITY_JSON'
            },
            get DISPLAY_ERROR_CARD() {
                return 'DISPLAY_ERROR_CARD';
            },
            get ENABLE_EVENT_LOGGING() {
                return 'enable_event_logging';
            },
            get ENABLE_TERMINAL_OUTPUT() {
                return 'enable_terminal_output';
            },
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
                    }
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
            get SETUP() {
                return {
                    get BOT_COMMANDS() {
                        return 'BOT_COMMANDS';
                    },
                    get BOT_NAME() {
                        return 'BOT_NAME';
                    },
                    get BOT_SHORT_DESCRIPTION() {
                        return 'BOT_SHORT_DESCRIPTION';
                    },
                    get BOT_DESCRIPTION() {
                        return 'BOT_DESCRIPTION';
                    },
                    get BOT_PROFILE_IMAGE() {
                        return 'BOT_PROFILE_IMAGE';
                    },
                    get DEFAULT_BOT_LANGUAGE() {
                        return 'DEFAULT_BOT_LANGUAGE';
                    }
                }
            },
            get WEBHOOK() {
                return {
                    get WEBHOOK_URL() {
                        return 'WEBHOOK_URL';
                    },
                    get WEBHOOK_IP_ADDRESS() {
                        return 'WEBHOOK_IP_ADDRESS';
                    },
                    get WEBHOOK_MAX_CONNECTIONS() {
                        return 'WEBHOOK_MAX_CONNECTIONS';
                    },
                    get WEBHOOK_SECRET_TOKEN() {
                        return 'WEBHOOK_SECRET_TOKEN';
                    },
                    get DROP_PENDING_UPDATES() {
                        return 'DROP_PENDING_UPDATES';
                    }
                };
            },
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
            }
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

Common.Modules = {
    Sheet: {
        version: "2.0.0",
        get WEBHOOK_EVENT_SHEET_META() {
            return {
                name: "📑 Event Log",
                columns: [
                    "Timestamp",
                    "Source",
                    "Message",
                    "Event Object",
                    "More Info"
                ]
            };
        },
        /// End of Webhook Event Sheet Metadata
        get TERMINAL_OUTPUT_SHEET_META() {
            return {
                name: "💻 Terminal Output",
                columns: [
                    "Timestamp", "Event",
                    "Model", "Payload", "Prompt",
                    "Response", "Generated Text", "Usage",
                    "Total Tokens", "Prompt Tokens",
                    "Thoughts Tokens",
                    "Cached Content Tokens",
                    "Candidates Tokens",
                    "Tool Use Prompt Tokens"
                ]
            };
        },
        initializeSheet(activeSpreadsheet, sheetMeta = {}) {
            if (!sheetMeta.name) {
                throw new Error("Sheet model must have a valid name property");
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
        getSheet(activeSpreadsheet, sheetMeta = {}) {
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
        },
        writeWebhookEvent(activeSpreadsheet, source, message, chatId, e, param1, param2, param3) {
            // Check if webhook event logging is enabled
            const webhookEventLoggingEnabled = PropertiesService.getScriptProperties()
                .getProperty(Common.INPUT.SYSTEM.ENABLE_EVENT_LOGGING) || 'ON';

            if (webhookEventLoggingEnabled !== 'ON') {
                return;
            }

            const sheet = Common.Modules.Sheet
                .getSheet(activeSpreadsheet, Common.Modules.Sheet.WEBHOOK_EVENT_SHEET_META);

            sheet.appendRow([
                // Created On as iso string
                new Date().toISOString(),
                // source
                source,
                // Message
                (typeof message === 'object' || Array.isArray(message) || String(message).startsWith('{')) ? JSON.stringify(message) : message,
                // Event Object
                (typeof e === 'object' || Array.isArray(e) || String(e).startsWith('{')) ? JSON.stringify(e) : e,
                // Chat ID
                chatId,
                // Details 
                (typeof param1 === 'object' || Array.isArray(param1) || String(param1).startsWith('{')) ? JSON.stringify(param1) : param1,
                (typeof param2 === 'object' || Array.isArray(param2) || String(param2).startsWith('{')) ? JSON.stringify(param2) : param2,
                (typeof param3 === 'object' || Array.isArray(param3) || String(param3).startsWith('{')) ? JSON.stringify(param3) : param3
            ]);

            return sheet;
        },
        writeGeminiResponse(activeSpreadsheet, eventObject, model, payload, response) {
            // Check if terminal output is enabled
            const terminalOutputEnabled = PropertiesService.getScriptProperties()
                .getProperty(Common.INPUT.SYSTEM.ENABLE_TERMINAL_OUTPUT) || 'ON';

            // Check if terminal output is enabled
            if (terminalOutputEnabled !== 'ON') {
                return;
            }

            const sheet = Common.Modules.Sheet
                .getSheet(activeSpreadsheet, this.TERMINAL_OUTPUT_SHEET_META);
            const genratedText = response?.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
            sheet.appendRow([
                // Created On as iso string
                new Date().toISOString(),
                // Event Object
                (typeof eventObject === 'object' || Array.isArray(eventObject) || String(eventObject).startsWith('{')) ? JSON.stringify(eventObject) : eventObject,
                // Mode (e.g., "gemini-3-flash-preview")
                model,
                // Payload
                (typeof payload === 'object' || Array.isArray(payload) || String(payload).startsWith('{')) ? JSON.stringify(payload) : payload,
                // Prompt (if available in payload)
                payload?.contents?.[0]?.parts?.[0]?.text || '',
                // Response
                (typeof response === 'object' || Array.isArray(response) || String(response).startsWith('{')) ? JSON.stringify(response) : response,
                // Generated Text (if available in response) ({"candidates":[{"content":{"parts":[{"text": "generated text here"}]}}]})
                genratedText,
                // Usage Metadata (stringified if available in response.usageMetadata)
                response?.usageMetadata ? JSON.stringify(response.usageMetadata) : '{}',
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
    TelegramBotClient: class {
        constructor(botToken = '[YOUR_BOT_TOKEN]') {
            this.telegramEnpBaseUrl = "https://api.telegram.org/bot" + botToken;
        }

        getMyName({ language_code = '' }) {
            let url = this.getApiBaseUrl() + "/getMyName";
            if (language_code) {
                url += "?language_code=" + language_code;
            }
            return UrlFetchApp.fetch(url);
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

        getMyDescription({ language_code }) {
            let url = this.getApiBaseUrl() + "/getMyDescription";
            if (language_code) {
                url += "?language_code=" + language_code;
            }
            return UrlFetchApp.fetch(url);
        }

        setMyDescription({ description, language_code }) {
            const data = {
                'method': "post",
                'payload': {
                    'description': description,
                    'language_code': language_code ?? ''
                }
            };
            const url = this.getApiBaseUrl() + "/setMyDescription";
            return UrlFetchApp.fetch(url, data);
        }

        getMyShortDescription({ language_code }) {
            let url = this.getApiBaseUrl() + "/getMyShortDescription";
            if (language_code) {
                url += "?language_code=" + language_code;
            }

            return UrlFetchApp.fetch(url);
        }

        setMyShortDescription({ short_description, language_code }) {
            const data = {
                'method': "post",
                'payload': {
                    'short_description': short_description,
                    'language_code': language_code ?? ''
                }
            };
            const url = this.getApiBaseUrl() + "/setMyShortDescription";
            return UrlFetchApp.fetch(url, data);
        }

        getMyCommands({ language_code }) {
            let url = this.getApiBaseUrl() + "/getMyCommands";
            if (language_code) {
                url += "?language_code=" + language_code;
            }

            return UrlFetchApp.fetch(url);
        }

        /**
        * Set the list of the bot's commands. See https://core.telegram.org/bots/api#botcommand for details on the command structure.
        * @see https://core.telegram.org/bots/api#setmycommands
        */
        setMyCommands({ commands = [], language_code }) {
            if (commands.length === 0) {
                throw new Error("commands is required!");
            }
            const data = {
                'method': "post",
                'payload': {
                    //'scope': scope,
                    'commands': JSON.stringify(commands),
                    'language_code': language_code ?? ''
                }
            };
            const url = this.getApiBaseUrl() + "/setMyCommands";
            return UrlFetchApp.fetch(url, data);
        }

        getMyProfilePhoto() {
            const url = this.getApiBaseUrl() + "/getMyProfilePhoto";
            return UrlFetchApp.fetch(url);
        }

        setMyProfilePhoto({ photo }) {
            if (!photo) {
                throw new Error("photo is required!");
            }
            const data = {
                'method': "post",
                'payload': {
                    'photo': photo
                }
            };
            const url = this.getApiBaseUrl() + "/setMyProfilePhoto";
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
                return this.fetchApi(url);
            }

            // Otherwise, do a POST request with JSON payload
            const options = {
                'method': 'post',
                'contentType': 'application/json',
                'payload': JSON.stringify(payload)
            };

            return this.fetchApi(url, options);
        }

        fetchApi(url, options) {
            if (!options) {
                return UrlFetchApp.fetch(url);
            }
            return UrlFetchApp.fetch(url, options);
        }
    },
    TelegramBotSettings: {
        getScriptApiKey() {
            return PropertiesService.getScriptProperties().getProperty(Common.INPUT.TELEGRAM_BOT.BOT_API_TOKEN);
        },
        setUserApiKey(apiKey) {
            PropertiesService.getDocumentProperties().setProperty(Common.INPUT.TELEGRAM_BOT.BOT_API_TOKEN, apiKey);
        },
        getUserApiKey() {
            return PropertiesService.getDocumentProperties().getProperty(Common.INPUT.TELEGRAM_BOT.BOT_API_TOKEN);
        },
        clearUserApiKey() {
            PropertiesService.getDocumentProperties().deleteProperty(Common.INPUT.TELEGRAM_BOT.BOT_API_TOKEN);
        }
    },
    GeminiApiClient: {
        version: '1.0.0',
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
                    Common.Modules.Sheet.writeGeminiResponse(SpreadsheetApp.getActiveSpreadsheet(), options, model, payload, responseData);
                    return responseData;
                } else if (response) {
                    throw new Error(`GeminiApiClient request failed with status ${response.getResponseCode()}: ${response.getContentText()}`);
                } else {
                    throw new Error('GeminiApiClient request failed with no response');
                }
            } catch (error) {
                // Log the error for debugging purposes
                Common.Modules.Sheet.writeGeminiResponse(
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
        version: '1.0.0',
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
                .getProperty(Common.INPUT.GEMINI.GEMINI_API_KEY);
        },
        getScriptModel() {
            return PropertiesService.getScriptProperties().getProperty(Common.INPUT.GEMINI.GEMINI_MODEL) || this.DEFAULT_MODEL;
        },
        saveApiKey(apiKey) {
            PropertiesService.getDocumentProperties()
                .setProperty(Common.INPUT.GEMINI.GEMINI_API_KEY, apiKey);
        },
        getApiKey() {
            return PropertiesService.getDocumentProperties()
                .getProperty(Common.INPUT.GEMINI.GEMINI_API_KEY);
        },
        clearApiKey() {
            PropertiesService.getDocumentProperties()
                .deleteProperty(Common.INPUT.GEMINI.GEMINI_API_KEY);
        },
        saveModel(model) {
            PropertiesService.getDocumentProperties().setProperty(Common.INPUT.GEMINI.GEMINI_MODEL, model);
        },
        getModel() {
            return PropertiesService.getDocumentProperties().getProperty(Common.INPUT.GEMINI.GEMINI_MODEL) || this.DEFAULT_MODEL;
        },
        clearModel() {
            PropertiesService.getDocumentProperties().deleteProperty(Common.INPUT.GEMINI.GEMINI_MODEL);
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
        }
    },
    CRM: {
        version: '1.0.1',
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
                const sheet = Common.Modules.Sheet.getSheet(activeSpreadsheet, this.CUSTOMERS_SHEET_META);
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
                const sheet = Common.Modules.Sheet.getSheet(activeSpreadsheet, this.CUSTOMERS_SHEET_META);

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
            }
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
                const sheet = Common.Modules.Sheet.getSheet(activeSpreadsheet, this.PRODUCTS_SHEET_META);

                // add product as a new row
                const newRow = this._toRow(product);
                sheet.appendRow(this._toRow(product));
                return newRow;
            },
            getProductBySN(activeSpreadsheet, sn) {
                const sheet = Common.Modules.Sheet.getSheet(activeSpreadsheet, this.PRODUCTS_SHEET_META);

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
                const sheet = Common.Modules.Sheet.getSheet(activeSpreadsheet, this.PRODUCTS_SHEET_META);
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
                const sheet = Common.Modules.Sheet.getSheet(activeSpreadsheet, this.PRODUCTS_SHEET_META);
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
            }
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
                PropertiesService.getUserProperties().deleteProperty(Common.INPUT.SYSTEM.MEMBERSHIP.MEMBERSHIP_KEY);
                return true;
            },
            createMembershipInfo(days = this.DEFAULT_TRIAL_DAYS, balance = this.DEFAULT_TRIAL_BALANCE, licenseKey = this.DEFAULT_LICENSE_KEY) {
                const membership = {
                    [Common.INPUT.SYSTEM.MEMBERSHIP.CREATED_ON]: new Date().toISOString(),
                    [Common.INPUT.SYSTEM.MEMBERSHIP.LICENSE_KEY]: licenseKey,
                    // Add the specified number of days to the current date
                    [Common.INPUT.SYSTEM.MEMBERSHIP.EXPIRES_AT]: new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString(),
                    [Common.INPUT.SYSTEM.MEMBERSHIP.BALANCE]: balance,
                    type: licenseKey === this.DEFAULT_LICENSE_KEY ? 'trial' : 'paid'
                }
                return membership;
            },
            getMembershipInfo() {
                const membershipData = PropertiesService.getUserProperties().getProperty(Common.INPUT.SYSTEM.MEMBERSHIP.MEMBERSHIP_KEY);
                if (!membershipData) {
                    return null;
                }

                try {
                    const {
                        [Common.INPUT.SYSTEM.MEMBERSHIP.LICENSE_KEY]: licenseKey,
                        type,
                        [Common.INPUT.SYSTEM.MEMBERSHIP.CREATED_ON]: createdOn,
                        [Common.INPUT.SYSTEM.MEMBERSHIP.EXPIRES_AT]: expiresAt,
                        [Common.INPUT.SYSTEM.MEMBERSHIP.BALANCE]: balance = 0
                    } = JSON.parse(membershipData);
                    return {
                        [Common.INPUT.SYSTEM.MEMBERSHIP.LICENSE_KEY]: licenseKey,
                        type,
                        [Common.INPUT.SYSTEM.MEMBERSHIP.CREATED_ON]: createdOn,
                        [Common.INPUT.SYSTEM.MEMBERSHIP.EXPIRES_AT]: expiresAt,
                        [Common.INPUT.SYSTEM.MEMBERSHIP.BALANCE]: balance
                    };
                } catch (error) {
                    console.error('Error parsing membership info:', error);
                    return null;
                }
            },
            setMembershipInfo(membershipInfo = {}) {
                PropertiesService.getUserProperties().setProperty(Common.INPUT.SYSTEM.MEMBERSHIP.MEMBERSHIP_KEY, JSON.stringify(membershipInfo));
                return membershipInfo;
            }
        }
    }
};

Addon.Media = {
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

Addon.Package = {
    name: 'Telegram Bot Studio (TBS)',
    short_description: 'A suite of tools for building Telegram Bots on Google Workspace.',
    description: 'A collection of plugins for building Telegram Bots using Telegram Bot Studio on Google Workspace.',
    version: '1.2.0',
    build: '20260409.090000',
    author: 'Ilan Laloum',
    license: 'MIT',
    imageUrl: Addon.Media.LOGO_PNG_URL,
    gitRepository: 'https://github.com/ilanlal/telegram-bot-studio'
};

Addon.Helper = {
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
                        Addon.Helper.View.createBooleanItem(key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), value));
                }
                if (typeof value === 'number') {
                    settingsGrid.addItem(
                        Addon.Helper.View.createNumberItem(key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), value));
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
                Addon.ResultWidget.View.BuildExportWidget(botName, action, result)
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

Addon.Home = {
    id: 'HomePlugin',
    name: 'Telegram Bot Studio',
    short_description: 'A suite of tools for Telegram Bots',
    description: 'A collection of plugins for building Telegram Bots using Telegram Bot Studio on Google Workspace.',
    version: '2.0.0',
    listOfTools: [
        { name: 'Gemini Assistant', emoji: '💫', description: 'Create new content using AI.', icon: 'auto_awesome', action: 'Addon.GeminiAgent.Controller.PushHomeCard', requires: [Common.INPUT.TELEGRAM_BOT.BOT_API_TOKEN] },
        { name: 'Bot Setup', emoji: '⚙️', description: 'Configure your Telegram Bot and set up your webhook.', icon: 'settings', action: 'Addon.BotSetup.Controller.PushHomeCard', requires: [Common.INPUT.TELEGRAM_BOT.BOT_API_TOKEN] },
        { name: 'Get Chat', emoji: '💬', description: 'Fetch details about a Telegram chat using its ID.', icon: 'chat', action: 'Addon.GetChat.Controller.Load', requires: [Common.INPUT.TELEGRAM_BOT.BOT_API_TOKEN] },
        { name: 'Get Me', emoji: '🤖', description: 'Fetch details about your Telegram Bot.', icon: 'account_circle', action: 'Addon.GetMe.Controller.Load', requires: [Common.INPUT.TELEGRAM_BOT.BOT_API_TOKEN] }
    ],
    Controller: {
        PushHomeCard: (e) => {
            // Build and return the Home Card
            const data = Addon.getData();

            // Return action response to update card
            return CardService.newActionResponseBuilder()
                .setNavigation(
                    CardService.newNavigation()
                        .pushCard(
                            Addon.Home.View.HomeCard(data)))
                .build();
        },
        UpdateHomeCard: (e) => {
            // Build and return the Home Card
            const data = Addon.getData();
            return CardService.newActionResponseBuilder()
                .setNavigation(CardService.newNavigation()
                    .updateCard(Addon.Home.View.HomeCard(data)))
                .build();
        },
        PushAboutCard: (e) => {
            // Build and return the About Card
            const data = Addon.getData();
            return CardService.newActionResponseBuilder()
                .setNavigation(CardService.newNavigation()
                    .pushCard(Addon.Home.View.AboutCard(data)))
                .build();
        },
        PushHelpCard: (e) => {
            // Build and return the Help Card
            const data = Addon.getData();
            return CardService.newActionResponseBuilder()
                .setNavigation(CardService.newNavigation()
                    .pushCard(Addon.Home.View.HelpCard(data))).
                build();
        },
        _HandleResultNavigation: (e, result) => {
            const formInputs = e?.commonEventObject?.formInputs || {};
            const showErrorsState = formInputs?.[Common.INPUT.SYSTEM.DISPLAY_ERROR_CARD]?.stringInputs?.value[0] || "OFF";
            if (result.report.length > 0) {
                if (showErrorsState === 'ON') {
                    // Build and return the result card
                    return CardService.newActionResponseBuilder()
                        .setNavigation(
                            CardService.newNavigation()
                                .pushCard(
                                    Addon.ResultWidget.View
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
            data.isConnected = !!data[Common.INPUT.TELEGRAM_BOT.BOT_API_TOKEN];

            const cardBuilder = CardService.newCardBuilder()
                .setName(Addon.Home.id + '-Home')
                .setHeader(CardService.newCardHeader()
                    .setTitle(Addon.Package.name)
                    .setSubtitle(data.leds)
                    .setImageStyle(CardService.ImageStyle.SQUARE)
                    .setImageUrl(Addon.Package.imageUrl)
                    .setImageAltText('Telegram Bot Studio Logo'));

            // Build connection list section
            Addon.Home.View._AddConecctionListSections(cardBuilder, data);

            // Add sections for each available tool
            Addon.Home.listOfTools.forEach(tool => {
                cardBuilder.addSection(Addon.Home.View._BuildToolSection(data, tool));
            });

            // Quick Access Section
            cardBuilder.addSection(Addon.Home.View._BuildQuickAccessSection(data));

            // Premium Membership Section
            if (!data[Common.INPUT.SYSTEM.MEMBERSHIP.IS_PREMIUM]) {
                cardBuilder.addSection(Addon.Home.View._BuildPremiumMembershipSection(data));
                cardBuilder.setFixedFooter(CardService.newFixedFooter()
                    .setPrimaryButton(CardService.newTextButton()
                        .setText('💎 Upgrade to Premium')
                        .setBackgroundColor(Addon.primaryColor())
                        .setOnClickAction(CardService.newAction()
                            .setFunctionName('Addon.UserProfile.Controller.PushHomeCard'))));
            }

            return cardBuilder.build();
        },
        AboutCard: (data = {}) => {
            const cardBuilder = CardService.newCardBuilder()
                .setName(Addon.Home.id + '-About')
                .setHeader(CardService.newCardHeader()
                    .setTitle('About ' + Addon.Package.name)
                    .setSubtitle(Addon.Package.short_description)
                    .setImageStyle(CardService.ImageStyle.SQUARE)
                    .setImageUrl(Addon.Media.BIG_TIME_IMG_URL)
                    .setImageAltText('Card Image'))
                .addSection(
                    CardService.newCardSection()
                        .setHeader('App Information')
                        .addWidget(
                            CardService.newTextParagraph()
                                .setText(`Name: ${Addon.Package.name}`))
                        .addWidget(
                            CardService.newTextParagraph()
                                .setText(`Version: ${Addon.Package.version}`))
                        .addWidget(
                            CardService.newTextParagraph()
                                .setText(`Build: ${Addon.Package.build}`))
                        .addWidget(
                            CardService.newTextParagraph()
                                .setText(`Description: ${Addon.Package.description}`))
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
                                    .setUrl(`${Addon.Package.gitRepository}#readme`)))
                    .addWidget(
                        CardService.newTextButton()
                            .setText('📢 Report Issues')
                            .setOpenLink(
                                CardService.newOpenLink()
                                    .setUrl(`${Addon.Package.gitRepository}/issues`))));
            return cardBuilder.build();
        },
        HelpCard: (data = {}) => {
            const cardBuilder = CardService.newCardBuilder()
                .setName(Addon.Home.id + '-Help')
                .setHeader(CardService.newCardHeader()
                    .setTitle('Help & Support')
                    .setSubtitle(Addon.Home.short_description)
                    .setImageStyle(CardService.ImageStyle.SQUARE)
                    .setImageUrl(Addon.Media.YES_IMG_URL)
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
                        .setUrl(`${Addon.Package.gitRepository}#readme`)))
                .addWidget(CardService.newTextButton()
                    .setText('📢 Report a Bug')
                    .setOpenLink(CardService.newOpenLink()
                        .setUrl(`${Addon.Package.gitRepository}/issues`))));
            return cardBuilder.build();
        },
        _AddConecctionListSections: (cardBuilder, data = {}) => {
            // Telegram Bot Connection & Status Section (Pinned to Top)
            cardBuilder.addSection(
                Addon.TelegramBotConnection.View.WelcomeSection(data));

            // Gemini Assistant Connection & Status Section (Pinned to Top)
            cardBuilder.addSection(
                Addon.GeminiAgent.View.WelcomeSection(data));

            cardBuilder.addSection(
                Addon.Webhook.View.WelcomeSection(data));



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
                    [Common.INPUT.SYSTEM.MEMBERSHIP.IS_PREMIUM]: 'Premium Membership required',
                    [Common.INPUT.GEMINI.GEMINI_API_KEY]: 'Gemini API Key required',
                    [Common.INPUT.GEMINI.GEMINI_MODEL]: 'Gemini Model selection required',
                    [Common.INPUT.TELEGRAM_BOT.BOT_API_TOKEN]: 'Telegram Bot API Token required'
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
                            .setFunctionName('Addon.Settings.Controller.PushHomeCard')))
                    .addButton(CardService.newTextButton()
                        .setText('Help & Support')
                        .setOnClickAction(CardService.newAction()
                            .setFunctionName('Addon.Home.Controller.PushHelpCard')))
                    .addButton(CardService.newTextButton()
                        .setText('About')
                        .setOnClickAction(CardService.newAction()
                            .setFunctionName('Addon.Home.Controller.PushAboutCard')))
                );
        },
        _BuildPremiumMembershipSection: (data = {}) => {
            const membershipSection = CardService.newCardSection()
                .setHeader('💎 Premium Membership')
                .setCollapsible(false)
                .addWidget(CardService.newDecoratedText()
                    .setTopLabel('Membership Status')
                    .setText(data[Common.INPUT.SYSTEM.MEMBERSHIP.IS_PREMIUM] ? 'Premium Member' : 'Free Member')
                    .setStartIcon(CardService.newIconImage().setMaterialIcon(
                        CardService.newMaterialIcon().setName('workspace_premium')))
                    .setBottomLabel(data[Common.INPUT.SYSTEM.MEMBERSHIP.IS_PREMIUM]
                        ? `Expires on: ${data[Common.INPUT.SYSTEM.MEMBERSHIP.EXPIRES_AT] ? new Date(data[Common.INPUT.SYSTEM.MEMBERSHIP.EXPIRES_AT]).toDateString() : 'N/A'} | Balance: $${data[Common.INPUT.SYSTEM.MEMBERSHIP.BALANCE].toFixed(2)}`
                        : 'Upgrade to unlock advanced AI tools.'));
            return membershipSection;
        }
    }
};

Addon.Settings = {
    id: 'SettingsPlugin',
    name: 'Settings',
    short_description: 'Manage bot settings and preferences',
    description: 'The Settings card allows you to manage and configure settings for your Telegram bot add-on. You can adjust preferences, set up integrations, and customize the behavior of your bot to suit your needs.',
    version: '2.0.1',
    imageUrl: Addon.Media.WELCOME_IMG_URL,
    Controller: {
        PushHomeCard: (e) => {
            // Build and return the Settings Home Card
            const appModelData = Addon.getData();
            return CardService.newActionResponseBuilder()
                .setNavigation(
                    CardService.newNavigation()
                        .pushCard(Addon.Settings.View.HomeCard({ ...appModelData }))
                ).build();
        },
        SaveSettings: (e) => {
            // extract and save API endpoint URL
            const apiEndpointUrl = e?.commonEventObject?.formInputs?.[Common.INPUT.TELEGRAM_BOT.BOT_API_ENDPOINT_URL]?.stringInputs?.value?.[0] || '';
            if (apiEndpointUrl) {
                PropertiesService.getDocumentProperties().setProperty(Common.INPUT.TELEGRAM_BOT.BOT_API_ENDPOINT_URL, apiEndpointUrl);
            }
            // extract and save secret private key
            const secretPrivateKey = e?.commonEventObject?.formInputs?.[Common.INPUT.TELEGRAM_BOT.BOT_SECRET_TOKEN]?.stringInputs?.value?.[0] || '';
            if (secretPrivateKey) {
                PropertiesService.getDocumentProperties().setProperty(Common.INPUT.TELEGRAM_BOT.BOT_SECRET_TOKEN, secretPrivateKey);
            }

            // Common.INPUT.SYSTEM.ENABLE_TERMINAL_OUTPUT
            const terminalOutputSwitch = e?.commonEventObject?.formInputs?.[Common.INPUT.SYSTEM.ENABLE_TERMINAL_OUTPUT]?.stringInputs?.value?.[0] || 'ON';
            PropertiesService.getDocumentProperties().setProperty(Common.INPUT.SYSTEM.ENABLE_TERMINAL_OUTPUT, terminalOutputSwitch === 'ON' ? 'ON' : 'OFF');

            // Common.INPUT.SYSTEM.ENABLE_EVENT_LOGGING
            const enableEventLogging = e?.commonEventObject?.formInputs?.[Common.INPUT.SYSTEM.ENABLE_EVENT_LOGGING]?.stringInputs?.value?.[0] || 'OFF';
            PropertiesService.getDocumentProperties().setProperty(Common.INPUT.SYSTEM.ENABLE_EVENT_LOGGING, enableEventLogging === 'ON' ? 'ON' : 'OFF');


            // Display error card after json error
            const showErrorsSwitch = e?.commonEventObject?.formInputs?.[Common.INPUT.SYSTEM.DISPLAY_ERROR_CARD]?.stringInputs?.value?.[0] || 'ON';
            PropertiesService.getDocumentProperties().setProperty(Common.INPUT.SYSTEM.DISPLAY_ERROR_CARD, showErrorsSwitch === 'ON' ? 'ON' : 'OFF');

            // gemini_api_key
            const geminiApiKey = e?.commonEventObject?.formInputs?.[Common.INPUT.GEMINI.GEMINI_API_KEY]?.stringInputs?.value?.[0] || '[YOUR GEMINI API KEY]';
            PropertiesService.getDocumentProperties().setProperty(Common.INPUT.GEMINI.GEMINI_API_KEY, geminiApiKey);

            // gemini_model_selector
            const geminiModel = e?.commonEventObject?.formInputs?.[Common.INPUT.GEMINI.GEMINI_MODEL]?.stringInputs?.value?.[0] || 'gemini-3-flash-preview';
            PropertiesService.getDocumentProperties().setProperty(Common.INPUT.GEMINI.GEMINI_MODEL, geminiModel);

            // Build and return the Home Card
            const appModelData = Addon.getData();
            return CardService.newActionResponseBuilder()
                .setNavigation(
                    CardService.newNavigation()
                        .popToRoot()
                        .updateCard(Addon.Home.View.HomeCard({ ...appModelData }))
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
            const cardBuilder = CardService.newCardBuilder()
                .setName(Addon.Settings.name + '-Home')
                .setHeader(CardService.newCardHeader()
                    .setTitle(Addon.Settings.name)
                    .setSubtitle(Addon.Settings.short_description)
                    .setImageStyle(CardService.ImageStyle.SQUARE)
                    .setImageUrl(Addon.Settings.imageUrl)
                    .setImageAltText('Settings Logo'));

            // Network & Security Section (Compact Grouping)
            // Groups the API URL and Secret Key together as they are both core config items
            const configSection = CardService.newCardSection()
                .setHeader('🌐 Network & Security')
                .setCollapsible(false);

            // API Endpoint Input
            configSection.addWidget(
                CardService.newTextInput()
                    .setFieldName(Common.INPUT.TELEGRAM_BOT.BOT_API_ENDPOINT_URL)
                    .setTitle('API Endpoint URL')
                    .setValue(data[Common.INPUT.TELEGRAM_BOT.BOT_API_ENDPOINT_URL] || '')
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
                    .setFieldName(Common.INPUT.GEMINI.GEMINI_API_KEY)
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
                    .setFieldName(Common.INPUT.GEMINI.GEMINI_MODEL);
            // Add available Gemini models as options
            const geminiModels = Common.Modules.GeminiAgent.MODELS;
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
                            .setFieldName(Common.INPUT.SYSTEM.ENABLE_EVENT_LOGGING)
                            .setValue('ON')
                            .setSelected(data[Common.INPUT.SYSTEM.ENABLE_EVENT_LOGGING] === 'ON')
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
                            .setFieldName(Common.INPUT.SYSTEM.PRAITY_JSON)
                            .setValue('ON')
                            .setSelected(data[Common.INPUT.SYSTEM.PRAITY_JSON] === 'ON')
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
                        .setBackgroundColor(Addon.primaryColor())
                        //.setTextButtonStyle(CardService.TextButtonStyle.FILLED)
                        .setMaterialIcon(CardService.newMaterialIcon().setName('save'))
                        .setOnClickAction(
                            CardService.newAction()
                                .setFunctionName('Addon.Settings.Controller.SaveSettings')
                        )
                );

            cardBuilder.setFixedFooter(fixedFooter);

            return cardBuilder.build();
        }
    }
};

Addon.UserProfile = {
    id: 'UserProfilePlugin',
    name: 'User Profile',
    short_description: 'Manage your account and membership',
    description: 'The User Profile plugin allows you to manage your account information, view your membership status, and upgrade to premium features. You can easily access your profile details and make changes to your subscription directly from this card.',
    version: '2.0.0',
    imageUrl: Addon.Media.YOU_GOT_IT_IMG_URL,
    Controller: {
        PushHomeCard(e) {
            try {
                const data = Addon.getData();
                return CardService.newActionResponseBuilder()
                    .setNavigation(
                        CardService.newNavigation()
                            .pushCard(Addon.UserProfile.View.HomeCard(data))
                    ).build();
            } catch (error) {
                return this.handleOperationError(error);
            }
        },
        ActivatePremium(e) {
            try {
                // Simulate activation logic
                Common.Modules.CRM.Membership.activate(
                    Common.Modules.CRM.Membership.DEFAULT_TRIAL_DAYS,
                    Common.Modules.CRM.Membership.DEFAULT_TRIAL_BALANCE,
                    'trial');

                // Build and return the Home Card
                const data = Addon.getData();
                return CardService.newActionResponseBuilder()
                    .setNavigation(
                        CardService.newNavigation()
                            .popToRoot()
                            .updateCard(
                                Addon.Home.View.HomeCard(data))
                    ).build();
            } catch (error) {
                return this.handleOperationError(error);
            }
        },
        ConfirmRevokeLicense(e) {
            // Show confirmation card before revoking license
            const title = 'Cancel Subscription';
            const message = 'Are you sure you want to cancel your premium subscription? You will lose access to premium features.';
            const onClickFunctionName = 'Addon.UserProfile.Controller.RevokeLicense';
            const onClickParameters = e?.commonEventObject?.parameters || {};

            // Push Confirmation Card
            return Addon.ConfirmationCard.Controller.Confirm({
                commonEventObject: {
                    parameters: { title, message, onClickFunctionName, onClickParameters }
                }
            });
        },
        RevokeLicense(e) {
            try {
                // Simulate license revocation logic
                Common.Modules.CRM.Membership.revoke();

                // Build and return the Home Card
                const data = Addon.getData();
                return CardService.newActionResponseBuilder()
                    .setNavigation(
                        CardService.newNavigation()
                            .popToRoot()
                            .updateCard(
                                Addon.Home.View.HomeCard(data))
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
                .setName(Addon.UserProfile.id + '-Home')
                .setHeader(CardService.newCardHeader()
                    .setTitle('Account Overview')
                    .setSubtitle('Manage your profile & membership')
                    .setImageStyle(CardService.ImageStyle.SQUARE)
                    .setImageUrl(Addon.Media.YOU_GOT_IT_IMG_URL)
                    .setImageAltText('User Profile Avatar'));

            // 1. Membership Status & details Section            
            cardBuilder.addSection(Addon.UserProfile.View._BuildMembershipSection(data));

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
                    .setBottomLabel(data?.[Common.INPUT.SYSTEM.MEMBERSHIP.IS_PREMIUM] ? 'Active' : 'Premium Only'));
            });

            cardBuilder.addSection(featureSection);

            return cardBuilder.build();
        },
        _BuildMembershipSection: (data = {}, membershipData = {}) => {
            const isPremium = data?.[Common.INPUT.SYSTEM.MEMBERSHIP.IS_PREMIUM] || false;

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
                const expiresAt = membershipData?.[Common.INPUT.SYSTEM.MEMBERSHIP.EXPIRES_AT] ? new Date(membershipData[Common.INPUT.SYSTEM.MEMBERSHIP.EXPIRES_AT]) : null;
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
                    .setText(`${membershipData?.[Common.INPUT.SYSTEM.MEMBERSHIP.BALANCE] || 0}`)
                    .setStartIcon(CardService.newIconImage().setMaterialIcon(
                        CardService.newMaterialIcon().setName('account_balance_wallet').setFill(false)))
                    .setWrapText(true));

                // Add a "Cancel Subscription" button for premium users
                newSection.addWidget(CardService.newTextButton()
                    .setText('Cancel Subscription')
                    .setTextButtonStyle(CardService.TextButtonStyle.TEXT)
                    .setOnClickAction(CardService.newAction()
                        .setFunctionName('Addon.UserProfile.Controller.ConfirmRevokeLicense')));
            } else {
                newSection.addWidget(CardService.newTextButton()
                    .setText('💎 Upgrade Now')
                    .setBackgroundColor(Addon.primaryColor())
                    .setTextButtonStyle(CardService.TextButtonStyle.TEXT)
                    .setMaterialIcon(CardService.newMaterialIcon().setName('bolt'))
                    .setOnClickAction(CardService.newAction()
                        .setFunctionName('Addon.UserProfile.Controller.ActivatePremium')));
            }

            return newSection;
        }
    }
};

Addon.TelegramBotConnection = {
    id: 'ConnectionPlugin',
    name: 'Connection',
    short_description: 'Manage bot connection settings',
    description: 'The Connection plugin allows you to manage and configure the connection settings for your Telegram bot. You can set up your bot token, test the connection, and ensure that your bot is properly connected to the Telegram API.',
    version: '1.0.0',
    imageUrl: Addon.Media.WELCOME_IMG_URL,
    Controller: {
        Load: (e) => {
            const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
            try {
                // Log the event for debugging
                const data = e?.commonEventObject?.parameters || {};

                return Addon.TelegramBotConnection.View.HomeCard(data);
            }
            catch (error) {
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

                const inputToken = e?.commonEventObject?.formInputs?.[Common.INPUT.TELEGRAM_BOT.BOT_API_TOKEN]?.stringInputs?.value?.[0] || '';

                if (!inputToken) {
                    throw new Error('Bot API Token cannot be empty.');
                }

                // getme to validate token
                const client = new Common.Modules.TelegramBotClient(inputToken);
                const response = client.getMe();
                // Check for errors in response
                if (JSON.parse(response.getContentText()).ok !== true) {
                    throw new Error(`Error fetching bot info: ${response.getResponseCode()} - ${response.getContentText()}`);
                }

                const result = JSON.parse(response.getContentText()).result;

                // Log the response to Terminal Output sheet

                // execute chk_export_token_to_sheet if needed
                const exportTokenToSheet = e?.commonEventObject?.formInputs?.chk_export_token_to_sheet?.stringInputs?.value?.[0] === 'export_token';
                if (exportTokenToSheet) {
                    // Export the token to a designated sheet
                    const sheet = Common.Modules.Sheet;
                    const sheetMeta = {
                        name: '🔐 Bot Tokens',
                        columns: ['Timestamp', 'Bot Token', 'Bot Username', 'getMe Response']
                    };

                    sheet.dumpObjectToSheet(activeSpreadsheet, sheetMeta, inputToken, result.username, result);
                }

                // on success, store the token in user properties or user properties as needed
                PropertiesService.getDocumentProperties().setProperty(Common.INPUT.TELEGRAM_BOT.BOT_API_TOKEN, inputToken);
                PropertiesService.getDocumentProperties().setProperty(Common.INPUT.TELEGRAM_BOT.BOT_FRIENDLY_NAME, result.first_name);
                PropertiesService.getDocumentProperties().setProperty(Common.INPUT.TELEGRAM_BOT.BOT_USERNAME, result.username);
                e.parameters = {
                    refresh: 'true'
                };
                // Build and return the Home Card
                const appModelData = Addon.getData();
                return CardService.newActionResponseBuilder()
                    .setNavigation(
                        CardService.newNavigation()
                            .popToRoot()
                            .updateCard(Addon.Home.View.HomeCard(appModelData))
                    ).build();
            } catch (error) {
                return this.handleError(error)
                    .build();
            }
        },
        ConfirmDisconnect(e) {
            // Show confirmation card before disconnecting
            const title = 'Disconnect Bot';
            const message = 'Are you sure you want to disconnect your bot? This will remove the stored bot token.';
            const onClickFunctionName = 'Addon.TelegramBotConnection.Controller.Disconnect';
            const onClickParameters = e?.commonEventObject?.parameters || {};

            // Push Confirmation Card
            return Addon.ConfirmationCard.Controller.Load({
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
                const onClickFunctionName = 'Addon.TelegramBotConnection.Controller.Disconnect';
                const onClickParameters = e?.commonEventObject?.parameters || {};

                // Push Confirmation Card
                const confirmationCard = Addon.ConfirmationCard.Controller.Load({
                    commonEventObject: {
                        parameters: { title, message, onClickFunctionName, onClickParameters }
                    }
                });

                // Clear the stored token from document properties
                PropertiesService.getDocumentProperties().deleteProperty(Common.INPUT.TELEGRAM_BOT.BOT_API_TOKEN);
                PropertiesService.getDocumentProperties().deleteProperty(Common.INPUT.TELEGRAM_BOT.BOT_FRIENDLY_NAME);
                PropertiesService.getDocumentProperties().deleteProperty(Common.INPUT.TELEGRAM_BOT.BOT_USERNAME);
                // Build and return the Home Card
                const appModelData = Addon.getData();
                return CardService.newActionResponseBuilder()
                    .setNavigation(
                        CardService.newNavigation()
                            .popToRoot()
                            .updateCard(Addon.Home.View.HomeCard({ ...appModelData }))
                    ).build();
            } catch (error) {
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

            const token = data?.[Common.INPUT.TELEGRAM_BOT.BOT_API_TOKEN];
            const isConnected = !!token;

            const username = PropertiesService.getDocumentProperties().getProperty(Common.INPUT.TELEGRAM_BOT.BOT_USERNAME) || 'unknown_bot';
            const friendlyName = PropertiesService.getDocumentProperties().getProperty(Common.INPUT.TELEGRAM_BOT.BOT_FRIENDLY_NAME) || 'Telegram Bot';

            let executeAction;
            if (isConnected) {
                // Disconnect action
                executeAction = CardService.newAction()
                    .setFunctionName('Addon.TelegramBotConnection.Controller.ConfirmDisconnect');
            } else {
                // Connect action
                executeAction = CardService.newAction()
                    .setParameters({
                        path: 'Addon.TelegramBotConnection.View.HomeCard'
                    })
                    .setFunctionName('Addon.TelegramBotConnection.Controller.Load');
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
                    .setBackgroundColor(Addon.primaryColor())
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
            const token = data?.[Common.INPUT.TELEGRAM_BOT.BOT_API_TOKEN];
            const isConnected = !!token;
            const username = 'Unknown';

            // 1. Card Header
            const cardBuilder = CardService.newCardBuilder()
                .setName(Addon.TelegramBotConnection.id + '-Home')
                .setHeader(CardService.newCardHeader()
                    .setTitle('Bot Connection Management')
                    .setSubtitle(isConnected ? `Connected: @${username}` : 'Setup Required')
                    .setImageStyle(CardService.ImageStyle.SQUARE)
                    .setImageUrl(Addon.TelegramBotConnection.imageUrl));

            // 2. Welcome & Status Section
            const actionSection = CardService.newCardSection()
                .setHeader(isConnected ? '⚙️ Actions' : '🔑 Authentication');

            // Connect Flow: Input + Button
            actionSection.addWidget(Addon.TelegramBotConnection.View.BuildTokenTextInputWidget(token, false));

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
                                .setFieldName(Common.INPUT.SYSTEM.EXPORT_TOKEN)
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
                    .setBackgroundColor(Addon.primaryColor())
                    .setOnClickAction(CardService.newAction()
                        .setFunctionName('Addon.TelegramBotConnection.Controller.Connect')
                        .addRequiredWidget([Common.INPUT.TELEGRAM_BOT.BOT_API_TOKEN])));

            cardBuilder.setFixedFooter(footer);

            return cardBuilder.build();
        },
        BuildTokenTextInputWidget: (token, hidden = true) => {
            // Bot Token input
            return CardService.newTextInput()
                .setVisibility(hidden ? CardService.Visibility.HIDDEN : CardService.Visibility.VISIBLE)
                .setValue(token || '')
                .setId(Common.INPUT.TELEGRAM_BOT.BOT_API_TOKEN)
                .setFieldName(Common.INPUT.TELEGRAM_BOT.BOT_API_TOKEN)
                .setTitle('🤖 Your Bot Token')
                .setHint('Enter your Bot Token, get it from @BotFather, for example: 123456789:ABCDefGhIJKlmNoPQRsTUVwxyZ, keep it secret!');
        }
    }
};

Addon.Webhook = {
    id: 'WebhookConfigurator',
    name: 'Webhook Configurator',
    imageUrl: Addon.Media.DEFAULT_IMAGE_URL,
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
                const input_token = Common.Modules.TelegramBotSettings.getUserApiKey();
                if (!input_token) {
                    throw new Error('Bot API Token is missing. Please connect your bot in the Connection tab first.');
                }

                const isUpdate = data.update === 'true';
                const isPop = data.popCard === 'true';

                // Fetch bot current bot name for logging purposes
                data.currentBotName = (PropertiesService.getDocumentProperties().getProperty(Common.INPUT.TELEGRAM_BOT.BOT_USERNAME) || 'unknown_bot') + '_***' + input_token.slice(-6);

                // Logic: Fetch Data if Token Exists
                const telegramBotClient = new Common.Modules.TelegramBotClient(input_token);
                // 1. API Call: getWebhookInfo
                const response = telegramBotClient.getWebhookInfo();
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
                        Addon.Webhook.View.HomeCard(data, result));
                }
                else {
                    // Push a new card onto the stack
                    navigation.pushCard(
                        Addon.Webhook.View.HomeCard(data, result));
                }

                // Return the navigation response
                return CardService.newActionResponseBuilder()
                    .setNavigation(navigation)
                    .build();
            } catch (error) {
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
                const token = Common.Modules.TelegramBotSettings.getUserApiKey();
                const inputs = e?.commonEventObject?.formInputs || {};

                // Extract Inputs
                const urlInput = inputs[Common.INPUT.TELEGRAM_BOT.WEBHOOK.WEBHOOK_URL]?.stringInputs?.value?.[0];
                const ipInput = inputs[Common.INPUT.TELEGRAM_BOT.WEBHOOK.WEBHOOK_IP_ADDRESS]?.stringInputs?.value?.[0];
                const maxConnInput = inputs[Common.INPUT.TELEGRAM_BOT.WEBHOOK.WEBHOOK_MAX_CONNECTIONS]?.stringInputs?.value?.[0];
                const secretInput = inputs[Common.INPUT.TELEGRAM_BOT.WEBHOOK.WEBHOOK_SECRET_TOKEN]?.stringInputs?.value?.[0];
                const dropPending = inputs[Common.INPUT.TELEGRAM_BOT.WEBHOOK.DROP_PENDING_UPDATES]?.stringInputs?.value?.[0] === 'true';

                // Validation
                if (!urlInput || !urlInput.startsWith('https://')) {
                    return CardService.newActionResponseBuilder()
                        .setNotification(CardService.newNotification().setText("❌ Valid HTTPS URL required."))
                        .build();
                }

                const client = new Common.Modules.TelegramBotClient(token);

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
                return Addon.Webhook.Controller.Load({ commonEventObject: { parameters: { update: 'true' } } });
            } catch (error) {
                // Log error for debugging
                return CardService.newActionResponseBuilder()
                    .setNotification(CardService.newNotification().setText(`❌ Error: ${error.message}`))
                    .build();
            }
        },

        ConfirmDeleteWebhook: (e) => {
            // Show confirmation card before disconnecting
            const title = 'Confirm Webhook Deletion';
            const message = 'Are you sure you want to delete the webhook? This will switch the bot to Long Polling mode.';
            const onClickFunctionName = 'Addon.Webhook.Controller.DeleteWebhook';
            const onClickParameters = {};

            // Push Confirmation Card
            return Addon.ConfirmationCard.Controller.Load({
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

                const token = Common.Modules.TelegramBotSettings.getUserApiKey();
                const dropPending = e?.commonEventObject?.formInputs?.[Common.INPUT.TELEGRAM_BOT.WEBHOOK.DROP_PENDING_UPDATES]?.stringInputs?.value?.[0] === 'true';

                const client = new Common.Modules.TelegramBotClient(token);
                const response = client.deleteWebhook(dropPending);

                if (JSON.parse(response.getContentText()).ok !== true) {
                    throw new Error(`API Error ${response.getResponseCode()}: ${response.getContentText()}`);
                }

                const result = JSON.parse(response.getContentText()).result;
                return Addon.Webhook.Controller.Load({ commonEventObject: { parameters: { update: 'true', popCard: 'true' } } });
            } catch (error) {
                return CardService.newActionResponseBuilder()
                    .setNotification(CardService.newNotification().setText(`❌ Error: ${error.message}`))
                    .build();
            }
        },

        DropPendingUpdates: (e) => {
            const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
            try {
                const token = Common.Modules.TelegramBotSettings.getUserApiKey();
                const inputs = e?.commonEventObject?.formInputs || {};

                // Extract Inputs
                const urlInput = inputs[Common.INPUT.TELEGRAM_BOT.WEBHOOK.WEBHOOK_URL]?.stringInputs?.value?.[0];
                const ipInput = inputs[Common.INPUT.TELEGRAM_BOT.WEBHOOK.WEBHOOK_IP_ADDRESS]?.stringInputs?.value?.[0];
                const maxConnInput = inputs[Common.INPUT.TELEGRAM_BOT.WEBHOOK.WEBHOOK_MAX_CONNECTIONS]?.stringInputs?.value?.[0];
                const secretInput = inputs[Common.INPUT.TELEGRAM_BOT.WEBHOOK.WEBHOOK_SECRET_TOKEN]?.stringInputs?.value?.[0];
                const dropPending = true;

                // Validation
                if (!urlInput || !urlInput.startsWith('https://')) {
                    return CardService.newActionResponseBuilder()
                        .setNotification(CardService.newNotification().setText("❌ Valid HTTPS URL required."))
                        .build();
                }

                const client = new Common.Modules.TelegramBotClient(token);

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

                return Addon.Webhook.Controller.Load({ commonEventObject: { parameters: { update: 'true' } } });
            } catch (error) {
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
                .setName(Addon.Webhook.id + '-Home')
                .setHeader(CardService.newCardHeader()
                    .setTitle(Addon.Webhook.name)
                    .setSubtitle(Addon.Webhook.short_description)
                    .setImageStyle(CardService.ImageStyle.SQUARE)
                    .setImageUrl(Addon.Webhook.imageUrl));

            // --- 1. Connection Header ---
            cardBuilder.addSection(Addon.TelegramBotConnection.View.WelcomeSection(data));

            // Action Buttons
            const footer = CardService.newFixedFooter()
                .setPrimaryButton(CardService.newTextButton()
                    .setMaterialIcon(CardService.newMaterialIcon()
                        .setName(result.url ? 'update' : 'add')
                        .setFill(false))
                    .setText(result.url ? 'Update' : 'Set Webhook')
                    //.setTextButtonStyle(CardService.TextButtonStyle.FILLED)
                    .setBackgroundColor(Addon.primaryColor())
                    .setOnClickAction(CardService.newAction()
                        .setFunctionName('Addon.Webhook.Controller.SetWebhook')
                        // Collect all inputs
                        .addRequiredWidget([Common.INPUT.TELEGRAM_BOT.WEBHOOK.WEBHOOK_URL])
                        .addRequiredWidget([Common.INPUT.TELEGRAM_BOT.WEBHOOK.WEBHOOK_MAX_CONNECTIONS])));

            // --- 2. Live Status Logic ---
            if (result.url !== '') {
                // Delete Button (Only if active)
                footer.setSecondaryButton(CardService.newTextButton()
                    .setMaterialIcon(CardService.newMaterialIcon()
                        .setName('delete')
                        .setFill(false))
                    .setText('Delete')
                    .setOnClickAction(CardService.newAction()
                        .setFunctionName('Addon.Webhook.Controller.ConfirmDeleteWebhook')));
            }

            // --- Section A: Status Dashboard ---
            const statusSection = Addon.Webhook.View.WelcomeSection(data, result);
            cardBuilder.addSection(statusSection);

            // --- Section B: Input Parameters for setWebhook ---
            const configSection = CardService.newCardSection()
                .setHeader('⚙️ Webhook Configuration')
                .setCollapsible(true)
                .setNumUncollapsibleWidgets(2); // Collapsible to save space if not needed

            // Webhook URL (Constraint 5)
            configSection.addWidget(CardService.newTextInput()
                .setFieldName(Common.INPUT.TELEGRAM_BOT.WEBHOOK.WEBHOOK_URL)
                .setTitle('Webhook URL (Required)')
                .setHint('https://your-script-url/exec')
                .setValue(String(result.url))); // Defaults to current live URL

            // Drop Pending Updates (Constraint 4 & 5)
            configSection.addWidget(CardService.newDecoratedText()
                .setText('Drop Pending Updates')
                .setBottomLabel('Skip old messages in queue upon setting webhook.')
                .setSwitchControl(CardService.newSwitch()
                    .setFieldName(Common.INPUT.TELEGRAM_BOT.WEBHOOK.DROP_PENDING_UPDATES)
                    .setValue('true')
                    .setControlType(CardService.SwitchControlType.CHECK_BOX)));

            // IP Address (Constraint 5)
            configSection.addWidget(CardService.newTextInput()
                .setFieldName(Common.INPUT.TELEGRAM_BOT.WEBHOOK.WEBHOOK_IP_ADDRESS)
                .setTitle('Custom IP Address (Optional)')
                .setHint('Bypass DNS resolution with specific IP')
                .setValue(''));

            // Max Connections (Constraint 5)
            configSection.addWidget(CardService.newTextInput()
                .setFieldName(Common.INPUT.TELEGRAM_BOT.WEBHOOK.WEBHOOK_MAX_CONNECTIONS)
                .setTitle('Max Connections (1-100)')
                .setHint('Default: 40')
                .setValue(result.max_connections ? result.max_connections.toString() : '40'));

            // Secret Token (Constraint 5)
            configSection.addWidget(CardService.newTextInput()
                .setFieldName(Common.INPUT.TELEGRAM_BOT.WEBHOOK.WEBHOOK_SECRET_TOKEN)
                .setTitle('Secret Token (Optional)')
                .setHint('X-Telegram-Bot-Api-Secret-Token header')
                .setValue('')); // We don't get this back from API for security, so leave empty

            cardBuilder.addSection(configSection);

            // --- Section: Raw Data (Debug) ---
            const botName = PropertiesService.getDocumentProperties().getProperty(Common.INPUT.TELEGRAM_BOT.BOT_USERNAME) || 'unknown_bot';
            cardBuilder.addSection(
                Addon.Helper.View
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
                .setBackgroundColor(Addon.primaryColor())
                .setOnClickAction(CardService.newAction()
                    .setFunctionName('Addon.Webhook.Controller.Load'));

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
                                    .setFunctionName('Addon.Webhook.Controller.DropPendingUpdates')
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

            const botName = PropertiesService.getDocumentProperties().getProperty(Common.INPUT.TELEGRAM_BOT.BOT_USERNAME) || 'unknown_bot';

            // Add dump to result to sheet widget
            statusSection.addWidget(
                Addon.ResultWidget.View.BuildExportWidget(botName, 'getWebhookInfo', result));

            return statusSection;
        }
    }
};

Addon.GeminiAgent = {
    id: 'GeminiAgentPlugin',
    name: 'Gemini Agent',
    short_description: 'Set instructions for your Gemini AI agent',
    description: 'Get intelligent suggestions and improvements for your JSON data using Gemini AI. This plugin analyzes your JSON and provides recommendations for optimization, error correction, and best practices.',
    version: '1.1.0',
    imageUrl: Addon.Media.BIG_TIME_IMG_URL,
    Controller: {
        PushHomeCard(e) {
            try {
                // Extract any necessary data from the event object if needed
                // const formInputs = e?.commonEventObject?.formInputs || {};
                const data = Addon.getData();

                return CardService.newActionResponseBuilder()
                    .setNavigation(
                        CardService.newNavigation()
                            .pushCard(
                                Addon.GeminiAgent.View.SetupCard(data))
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
                const data = Addon.getData();

                return CardService.newActionResponseBuilder()
                    .setNavigation(
                        CardService.newNavigation()
                            .pushCard(
                                Addon.GeminiAgent.View.SetupCard(data))
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
                Addon.Handlers.Webhook.DoPost(eventObject, activeSpreadsheet);

                return CardService.newActionResponseBuilder()
                    .setNotification(CardService.newNotification()
                        .setText('Agent test executed. Check the terminal output for details.'))
                    .build();
            }
            catch (error) {
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
                const apiKey = formInputs?.[Common.INPUT.GEMINI.GEMINI_API_KEY]?.stringInputs?.value[0];
                // Extract the Gemini model from the form inputs
                const model = formInputs?.[Common.INPUT.GEMINI.GEMINI_MODEL]?.stringInputs?.value[0];

                // Save the Gemini API key
                Common.Modules.GeminiAgent.saveApiKey(apiKey);
                // Save the Gemini model selection
                Common.Modules.GeminiAgent.saveModel(model);

                // Push Setup Card to show the connected status and allow the user to test the connection or set instructions.
                const data = Addon.getData();
                return CardService.newActionResponseBuilder()
                    .setNavigation(
                        CardService.newNavigation()
                            .popToRoot()
                            .updateCard(
                                Addon.Home.View.HomeCard(data))
                    ).build();
            } catch (error) {
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
            const onClickFunctionName = 'Addon.GeminiAgent.Controller.Disconnect';
            const onClickParameters = e?.commonEventObject?.parameters || {};

            // Push Confirmation Card
            return Addon.ConfirmationCard.Controller.Load({
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
                const confirmationCard = Addon.ConfirmationCard.Controller.Load(e);

                // Clear the stored token from user properties
                Common.Modules.GeminiAgent.clearApiKey();
                Common.Modules.GeminiAgent.clearModel();
                // Build and return the Home Card
                const data = Addon.getData();
                return CardService.newActionResponseBuilder()
                    .setNavigation(
                        CardService.newNavigation()
                            .popToRoot()
                            .updateCard(Addon.Home.View.HomeCard(data))
                    ).build();
            } catch (error) {
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
                PropertiesService.getDocumentProperties().setProperty(Common.INPUT.GEMINI.INSTRUCTION_CELL_REFERENCE, cellReference);

                // Show a notification to the user confirming that the cell has been bound as an instruction.
                return CardService.newActionResponseBuilder()
                    .setNotification(CardService.newNotification()
                        .setText(`Current cell ${cellReference} has been bound as instruction for the Gemini Agent. You must set this value manually at Document Properties -> ${Common.INPUT.GEMINI.INSTRUCTION_CELL_REFERENCE} to make it work with webhooks. This is a limitation of the current implementation.`))
                    .build();
            } catch (error) {
                return CardService.newActionResponseBuilder()
                    .setNotification(CardService.newNotification()
                        .setText('An error occurred while binding the current cell as instruction. ' + error.toString()))
                    .build();
            }
        }
    },

    View: {
        WelcomeSection: (data = {}) => {
            const geminiApiKey = data[Common.INPUT.GEMINI.GEMINI_API_KEY] || '';
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
                    .setFunctionName('Addon.GeminiAgent.Controller.ConfirmDisconnect');
            } else {
                // Connect action
                executeAction = CardService.newAction()
                    .setFunctionName('Addon.GeminiAgent.Controller.PushSetupCard');
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
                    .setBackgroundColor(Addon.primaryColor())
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
                .setName(Addon.GeminiAgent.id + '-Setup');

            // Add a section for Gemini API key input
            cardBuilder.addSection(
                Addon.GeminiAgent.View
                    ._BuildGeminiApiKeyInputSection(data));

            // Add a section for selecting Gemini model
            cardBuilder.addSection(
                Addon.GeminiAgent.View
                    ._BuildModelSelectorSection(data));

            // Add a button to save Gemini API settings
            cardBuilder.addSection(
                CardService.newCardSection()
                    .addWidget(CardService.newTextButton()
                        .setText('Save Gemini API Settings')
                        .setOnClickAction(CardService.newAction()
                            .setFunctionName('Addon.GeminiAgent.Controller.Connect')
                            .addRequiredWidget(Common.INPUT.GEMINI.GEMINI_API_KEY)
                            .addRequiredWidget(Common.INPUT.GEMINI.GEMINI_MODEL))));

            // Add button to bind current cell as instruction for the agent (to provide context-aware suggestions based on the content of the current cell in the sheet)
            cardBuilder.addSection(
                CardService.newCardSection()
                    .addWidget(
                        CardService.newDecoratedText()
                            .setTopLabel('Bind Current Cell as Instruction')
                            .setWrapText(true)
                            .setText(`${data[Common.INPUT.GEMINI.INSTRUCTION_CELL_REFERENCE] || 'No instruction cell bound.'}`)
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
                                    .setBackgroundColor(Addon.primaryColor())
                                    .setOnClickAction(CardService.newAction()
                                        .setFunctionName('Addon.GeminiAgent.Controller.SetCurrentCellAsInstruction'))))
            );


            return cardBuilder.build();
        },
        _BuildModelSelectorSection(data = {}) {
            const section = CardService.newCardSection();

            // Add a dropdown to select the Gemini model
            const geminiModelSelector = CardService.newSelectionInput()
                .setType(CardService.SelectionInputType.DROPDOWN)
                .setTitle('Select Gemini Model')
                .setFieldName(Common.INPUT.GEMINI.GEMINI_MODEL);

            // Loop through the available Gemini models and add them as options to the selector
            const geminiModels = Common.Modules.GeminiAgent.MODELS;
            for (const modelKey in geminiModels) {
                const model = geminiModels[modelKey];
                geminiModelSelector.addItem(model, modelKey, data[Common.INPUT.GEMINI.GEMINI_MODEL] === modelKey);
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
                .setFieldName(Common.INPUT.GEMINI.GEMINI_MOOD);
            // Loop through the available mood options and add them as options to the selector
            const moodOptions = Common.Modules.GeminiAgent.MOOD_OPTIONS;
            for (const mood of moodOptions) {
                moodSelector.addItem(mood, mood, data[Common.INPUT.GEMINI.GEMINI_MOOD] === mood);
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
                    .setFieldName(Common.INPUT.GEMINI.GEMINI_API_KEY)
                    .setTitle('Gemini API Key')
                    .setHint('Enter your Gemini API key')
                    .setValue(data[Common.INPUT.GEMINI.GEMINI_API_KEY] || ''));
        },
        _BuildTemperatureInputSection(data = {}) {
            return CardService.newCardSection()
                .setHeader('Temperature Configuration')
                // Add divider
                .addWidget(CardService.newDivider())
                // Add text input for temperature
                .addWidget(CardService.newTextInput()
                    .setFieldName(Common.INPUT.GEMINI.GEMINI_TEMPERATURE)
                    .setTitle('Temperature (0.0 - 2.0)')
                    .setHint('Controls the randomness of the output. Default is 1.0')
                    .setValue(data[Common.INPUT.GEMINI.GEMINI_TEMPERATURE] || '1.0'));

        },
        _BuildThinkingLevelSelectorSection(data = {}) {
            const section = CardService.newCardSection();

            // Add a dropdown to select the thinking level for the Gemini Assistant's responses
            const thinkingLevelSelector = CardService.newSelectionInput()
                .setType(CardService.SelectionInputType.DROPDOWN)
                .setTitle('Select Thinking Level')
                .setFieldName(Common.INPUT.GEMINI.THINKING_LEVEL);
            // Loop through the available thinking level options and add them as options to the selector
            const thinkingLevelOptions = Common.Modules.GeminiAgent.THINKING_LEVEL_OPTIONS;
            for (const level of thinkingLevelOptions) {
                thinkingLevelSelector.addItem(level, level, data[Common.INPUT.GEMINI.THINKING_LEVEL] === level);
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
                    .setFieldName(Common.INPUT.GEMINI.THINKING_BUDGET)
                    .setTitle('Thinking Budget (in tokens)')
                    .setHint('Controls the amount of "thinking" the AI does before responding. Default is 100 tokens.')
                    .setValue(data[Common.INPUT.GEMINI.THINKING_BUDGET] || '100'));
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
                        .setFunctionName('Addon.GeminiAgent.Controller.PushInstructionsCard')))
                // The "Edit Instruction" button allows users to edit their existing custom system instruction for the Gemini Assistant, providing an opportunity to refine and improve the AI's performance in analyzing sheet data and generating JSON content according to their evolving needs and preferences.
                .addButton(CardService.newTextButton()
                    .setText('Edit Instruction')
                    .setMaterialIcon(CardService.newMaterialIcon().setName('edit'))
                    .setOnClickAction(CardService.newAction()
                        .setFunctionName('Addon.GeminiAgent.Controller.PushInstructionsCard')
                        .setParameters({
                            bindCell: 'true'
                        })
                    ));

            section.addWidget(buttonSet);


            return section;
        }
    }
};

Addon.GetMe = {
    id: 'GetMePlugin',
    name: 'Get Me',
    imageUrl: Addon.Media.DEFAULT_IMAGE_URL, // Falls back to default if specific icon isn't set
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

                const input_token = PropertiesService.getDocumentProperties().getProperty(Common.INPUT.TELEGRAM_BOT.BOT_API_TOKEN);
                if (!input_token) {
                    throw new Error('Bot API Token is not set. Please connect your bot first.');
                }

                // Fetch bot current bot name for logging purposes
                data.currentBotName = (PropertiesService.getDocumentProperties().getProperty(Common.INPUT.TELEGRAM_BOT.BOT_USERNAME) || 'unknown_bot') + '_***' + input_token.slice(-6);

                // Initialize Telegram Bot Client
                const telegramBotClient = new Common.Modules.TelegramBotClient(input_token);
                // 1. API Call: getMe
                const response = telegramBotClient.getMe();

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
                        Addon.GetMe.View.HomeCard(data, result));
                } else {
                    // Push a new card onto the stack
                    navigation.pushCard(
                        Addon.GetMe.View.HomeCard(data, result));
                }

                return CardService.newActionResponseBuilder()
                    .setNavigation(navigation)
                    .build();
            }
            catch (error) {
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
                .setName(Addon.GetMe.id + '-Home')
                .setHeader(CardService.newCardHeader()
                    .setTitle('Bot Dashboard')
                    .setSubtitle('Identity & Feature Configuration')
                    .setImageStyle(CardService.ImageStyle.SQUARE)
                    .setImageUrl(Addon.GetMe.imageUrl));

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

            // Add dump to result to sheet widget
            profileSection.addWidget(
                Addon.ResultWidget.View.BuildExportWidget(data.currentBotName, 'getMe', result));

            cardBuilder.addSection(profileSection);

            // --- Section: Debug/Raw Data ---
            cardBuilder.addSection(
                Addon.Helper.View.BuildResultSection(data.currentBotName, 'getMe', result));


            // 2. Footer: Refresh Action
            const footer = CardService.newFixedFooter()
                .setPrimaryButton(CardService.newTextButton()
                    .setText('Refresh Data')
                    .setMaterialIcon(CardService.newMaterialIcon()
                        .setName('refresh')
                        .setFill(false)) // Constraint check: setFill(false)
                    .setOnClickAction(CardService.newAction()
                        .setFunctionName('Addon.GetMe.Controller.Load')
                        .setParameters({ update: 'true' })));

            cardBuilder.setFixedFooter(footer);

            return cardBuilder.build();
        }
    }
};

Addon.GetChat = {
    id: 'GetChatPlugin',
    name: 'Chat Inspector',
    imageUrl: Addon.Media.DEFAULT_IMAGE_URL,
    description: 'Retrieve detailed information about users, groups, or channels your bot interacts with.',
    short_description: 'User, Group & Channel details',
    Controller: {
        /**
         * Entry Point
         */
        Load: (e) => {
            const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
            try {
                const data = e?.commonEventObject?.parameters || {};
                const isUpdate = data.update === 'true';
                const input_token = PropertiesService.getDocumentProperties().getProperty(Common.INPUT.TELEGRAM_BOT.BOT_API_TOKEN);
                if (!input_token) {
                    throw new Error('Bot API Token is not set. Please connect your bot first.');
                }

                // Fetch bot current bot name for logging purposes
                data.currentBotName = (PropertiesService.getDocumentProperties().getProperty(Common.INPUT.TELEGRAM_BOT.BOT_USERNAME) || 'unknown_bot') + '_***' + input_token.slice(-6);

                // Extract Chat ID from form inputs if available (user clicked Search)
                // or fall back to parameters/properties
                const searchChatId = e?.commonEventObject?.formInputs?.[Common.INPUT.TELEGRAM_BOT.CHAT_ID]?.stringInputs?.value?.[0] || '';
                if (searchChatId) {
                    data[Common.INPUT.TELEGRAM_BOT.CHAT_ID] = searchChatId;

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
                            Addon.GetChat.View.HomeCard(data, result));
                    }
                    else {
                        // Push a new card onto the stack
                        navigation.pushCard(
                            Addon.GetChat.View.HomeCard(data, result));
                    }

                    return CardService.newActionResponseBuilder()
                        .setNavigation(navigation)
                        .build();
                }

                // No search ID provided, just show the Home Card
                return CardService.newActionResponseBuilder()
                    .setNavigation(
                        CardService.newNavigation().pushCard(
                            Addon.GetChat.View.HomeCard(data, null)))
                    .build();
            } catch (error) {
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
            const searchId = data[Common.INPUT.TELEGRAM_BOT.CHAT_ID] || '';

            const cardBuilder = CardService.newCardBuilder()
                .setName(Addon.GetChat.id + '-Home')
                .setHeader(CardService.newCardHeader()
                    .setTitle(Addon.GetChat.name)
                    .setSubtitle(Addon.GetChat.short_description)
                    .setImageStyle(CardService.ImageStyle.SQUARE)
                    .setImageUrl(Addon.GetChat.imageUrl));

            // --- Search Section ---
            const searchSection = CardService.newCardSection()
                .setHeader('🔍 Target Selector');

            searchSection.addWidget(CardService.newTextInput()
                .setFieldName(Common.INPUT.TELEGRAM_BOT.CHAT_ID)
                .setTitle('Chat ID or Username')
                .setHint('Enter the Chat ID (e.g., -1001234567890) or Username (e.g., @channelusername)')
                .setValue(data[Common.INPUT.TELEGRAM_BOT.CHAT_ID] || ''));

            cardBuilder.addSection(searchSection);

            // --- Footer Actions ---
            const footer = CardService.newFixedFooter()
                .setPrimaryButton(CardService.newTextButton()
                    .setText('Search Chat')
                    .setMaterialIcon(CardService.newMaterialIcon()
                        .setName('search')
                        .setFill(false)) // Constraint: setFill(false)
                    .setOnClickAction(CardService.newAction()
                        .setFunctionName('Addon.GetChat.Controller.Load')
                        .setParameters({ update: 'true' })
                        .addRequiredWidget([Common.INPUT.TELEGRAM_BOT.CHAT_ID])));

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
                Addon.ExportApiResultWidget.View.BuildExportWidget(data.currentBotName, 'getChat', result));

            cardBuilder.addSection(identitySection);

            // --- Section B: Detailed Properties ---
            cardBuilder.addSection(
                Addon.Helper.View.BuildResultSection(data.currentBotName, 'getChat', result));

            return cardBuilder.build();
        }
    }
};

Addon.ConfirmationCard = {
    id: 'ConfirmationCardPlugin',
    name: 'Confirmation Card',
    short_description: 'Standardized confirmation dialog',
    description: 'A reusable confirmation dialog plugin to standardize user confirmations across various actions within the Telegram Bot Studio environment.',
    version: '2.0.1',
    imageUrl: Addon.Media.PAY_ATTENTION_IMG_URL,
    Controller: {
        Load: (e = {}) => {
            const p = e?.commonEventObject?.parameters || {};
            const title = p.title || 'Confirm Action';
            const message = p.message || 'Are you sure you want to proceed?';
            const onClickFunctionName = p.onClickFunctionName || null;
            const onClickParameters = p.onClickParameters || {};

            if (!onClickFunctionName) {
                throw new Error('Missing required parameters: message, onClickFunctionName');
            }

            // Push the confirmation card
            return CardService.newActionResponseBuilder()
                .setNavigation(
                    CardService.newNavigation()
                        .pushCard(
                            Addon.ConfirmationCard.View.HomeCard({
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
            // extract parameters from event object onClickFunctionName = 'Addon['Name'].Controller['Function']', onClickParameters={}
            const onClickFunctionName = e?.commonEventObject?.parameters?.onClickFunctionName || null;
            const onClickParameters = e?.commonEventObject?.parameters?.onClickParameters || {};

            if (!onClickFunctionName) {
                throw new Error('Missing required parameters: message, onClickFunctionName');
            }

            // Resolve the function from the string name 
            // onClickFunctionName = 'Addon.Name.Controller.Function'
            const functionPathParts = onClickFunctionName.split('.');
            let actionResult = null;
            try {
                let func = Addon;
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
                .setName(Addon.ConfirmationCard.id + '-Home')
                .setHeader(CardService.newCardHeader()
                    .setTitle(data.title || 'Confirm Action')
                    .setImageStyle(CardService.ImageStyle.SQUARE)
                    .setImageUrl(Addon.ConfirmationCard.imageUrl)
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
                                .setFunctionName('Addon.ConfirmationCard.Controller.Confirm')
                                .setParameters({ onClickFunctionName: data.onClickFunctionName, onClickParameters: JSON.stringify(data.onClickParameters || {}) })))
                    .setSecondaryButton(
                        CardService.newTextButton()
                            .setText('Cancel')
                            .setOnClickAction(CardService.newAction()
                                .setFunctionName('Addon.ConfirmationCard.Controller.Cancel'))));

            return cardBuilder.build();
        }
    }
};

Addon.ResultWidget = {
    id: 'ResultWidget',
    name: 'Result Exporter',
    short_description: 'Export operation results to Google Sheets',
    description: 'A widget that allows users to export JSON operation results directly to a Google Sheets spreadsheet for further analysis and record-keeping.',
    version: '1.1.0',
    imageUrl: Addon.Media.YOU_GOT_IT_IMG_URL,
    Controller: {
        Load: (e) => {
            try {
                const result = e?.commonEventObject?.parameters?.result ? JSON.parse(e.commonEventObject.parameters.result) : {};
                return CardService.newActionResponseBuilder()
                    .setNavigation(
                        CardService.newNavigation()
                            .pushCard(Addon.ResultWidget.View.BuildResultCard(result))
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
                const sheetName = e?.commonEventObject?.parameters?.sheetName || Common.Modules.Sheet.DUMP_SHEET_NAME;
                const botName = e?.commonEventObject?.parameters?.botName || '[Unknown Bot]';
                const report = e?.commonEventObject?.parameters?.report || '{}';

                // Dump data to sheet
                Common.Modules.Sheet
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
                const hightlightColor = '#FFFF00';
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
                .setName(Addon.ResultWidget.id + '-ResultCard')
                .setHeader(CardService.newCardHeader()
                    .setTitle('Operation Result')
                    .setSubtitle('View and export operation results')
                    .setImageStyle(CardService.ImageStyle.SQUARE)
                    .setImageUrl(Addon.ResultWidget.imageUrl)
                    .setImageAltText('Result Image'));

            // Add Result Summary Section
            cardBuilder.addSection(
                Addon.ResultWidget.View
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
                    Addon.ResultWidget.View
                        // Add a widget for each detailed result item
                        .BuildResultWidget(reportItem)
                );
            });

            cardBuilder.addSection(detailSection);

            // Add Export Widget
            cardBuilder.addSection(
                CardService.newCardSection()
                    .addWidget(
                        Addon.ResultWidget.View
                            .BuildExportWidget(result.range.getSheet().getName(), result.range, result.report)
                    )
            );
            return cardBuilder.build();
        },
        BuildResultCard: (result = {}) => {
            return Addon.ResultWidget.View.HomeCard(result);
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
                                .setFunctionName('Addon.ResultWidget.Controller.HighlightRange')
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
                                .setFunctionName('Addon.ResultWidget.Controller.DumpResultToSheet')
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

Addon.BotSetup = {
    id: 'BotSetupPlugin',
    name: 'Bot Setup',
    short_description: 'Configure bot information and translations',
    description: 'A plugin to manage your Telegram bot information, including name, description, profile picture, commands, and translations for different languages.',
    version: '1.0.0',
    Controller: {
        PushHomeCard: function (e) {
            // Render the home card for bot setup
            const data = {}; // Fetch or initialize data
            const card = Addon.BotSetup.View.HomeCard(data);
            return CardService.newActionResponseBuilder()
                .setNavigation(CardService.newNavigation().pushCard(card))
                .build();
        },
        FetchCurrentInfo: function (e) {
            try {
                const formInput = e.commonEventObject?.formInputs || {};
                const sourceLanguage = formInput.sourceLanguage?.stringInputs?.value?.[0] || '';
                const token = PropertiesService.getDocumentProperties().getProperty(Common.INPUT.TELEGRAM_BOT.BOT_API_TOKEN);
                if (!token) throw new Error('Bot token not found');
                const botClient = new Common.Modules.TelegramBotClient(token);
                // Note: Telegram API does not have a single getBotInfo; fetching individual fields if available
                const nameResponse = botClient.getMyName({ language_code: sourceLanguage });
                if (JSON.parse(nameResponse.getContentText()).ok !== true) {
                    throw new Error('Failed to fetch bot name');
                }

                const descriptionResponse = botClient.getMyDescription({ language_code: sourceLanguage });
                if (JSON.parse(descriptionResponse.getContentText()).ok !== true) {
                    throw new Error('Failed to fetch bot description');
                }

                const shortDescriptionResponse = botClient.getMyShortDescription({ language_code: sourceLanguage });
                if (JSON.parse(shortDescriptionResponse.getContentText()).ok !== true) {
                    throw new Error('Failed to fetch bot short description');
                }

                const commandsResponse = botClient.getMyCommands({ language_code: sourceLanguage });
                if (JSON.parse(commandsResponse.getContentText()).ok !== true) {
                    throw new Error('Failed to fetch bot commands');
                }
                const parsedCommands = JSON.parse(commandsResponse.getContentText()).result.commands;
                // Construct info object
                const info = {
                    name: JSON.parse(nameResponse.getContentText()).result.name,
                    description: JSON.parse(descriptionResponse.getContentText()).result.description,
                    shortDescription: JSON.parse(shortDescriptionResponse.getContentText()).result.short_description,
                    commands: JSON.stringify(parsedCommands, null, 2) // Format commands for display
                };

                // Update card with fetched data
                const card = Addon.BotSetup.View.HomeCard({ ...info, selectedLanguage: sourceLanguage });
                return CardService.newActionResponseBuilder()
                    .setNavigation(CardService.newNavigation().updateCard(card))
                    .build();
            } catch (error) {
                // Log the error for debugging
                if (typeof console !== 'undefined') {
                    console.error('Error in FetchCurrentInfo:', error);
                }
                return CardService.newActionResponseBuilder()
                    .setNotification(CardService.newNotification().setText('Error fetching info: ' + error.message))
                    .build();
            }
        },
        SuggestTranslation: function (e) {
            try {
                const formInput = e.commonEventObject?.formInputs || {};
                const sourceLanguage = formInput.sourceLanguage?.stringInputs?.value?.[0] || '';
                const targetLanguage = formInput.targetLanguage?.stringInputs?.value?.[0] || '';
                const name = formInput.name?.stringInputs?.value?.[0] || '';
                const description = formInput.description?.stringInputs?.value?.[0] || '';
                const shortDescription = formInput.shortDescription?.stringInputs?.value?.[0] || '';
                const commands = formInput.commands?.stringInputs?.value?.[0] || '';
                const geminiApiKey = Common.Modules.GeminiAgent.getApiKey();
                if (!geminiApiKey) {
                    throw new Error('Gemini API key not found. Please set it up in the configuration.');
                }
                const aiModel = Common.Modules.GeminiAgent
                    .MODELS["gemini-3-flash-preview"];

                const userPrompt = `Please provide SEO-optimized translations for the following Telegram bot information from ${sourceLanguage} to ${targetLanguage}:\n\n` +
                    `Name: "${name}"\n` +
                    `Short Description: "${shortDescription}"\n` +
                    `Description: "${description}"\n\n` +
                    // `Commands: ${commands}\n\n` +
                    `\n------\nEnsure that the translations are concise, relevant, and culturally appropriate for users in the target language.`;

                const payload = {
                    "systemInstruction": {
                        "parts": [
                            {
                                "text": "You are a SEO expert and helpful translation assistant that provides suggestions for the name, description, and short description of a Telegram bot based on the given language. Your suggestions should aim to improve the bot's appeal and clarity for users in the specified language. Please ensure that your recommendations are concise, relevant, and tailored to the target audience. Consider cultural nuances and language-specific preferences when providing your suggestions."
                            }
                        ]
                    },
                    "generationConfig": {
                        "responseMimeType": "application/json",
                        "thinkingConfig": {
                            "thinkingLevel": "low"
                        },
                        "maxOutputTokens": 3000,
                        "temperature": 1.0,
                        "responseJsonSchema": {
                            "type": "object",
                            "description": "The suggested translations for the Telegram bot information.",
                            "properties": {
                                "name": {
                                    "type": "string",
                                    "description": "Name (0-64 characters)."
                                },
                                "description": {
                                    "type": "string",
                                    "description": "Description (0-512 characters), which is shown in the chat with the bot if the chat is empty."
                                },
                                "shortDescription": {
                                    "type": "string",
                                    "description": "Short description (0-120 characters), which is shown on the bot's profile page and is sent together with the link when users share the bot."
                                },
                                "language_code": {
                                    "type": "string",
                                    "description": "Language code (ISO 639-1 two-letter code) for which the translations are provided."
                                }
                            },
                            "required": [
                                "name",
                                "description",
                                "shortDescription",
                                "language_code"
                            ]
                        }
                    },
                    "contents": [
                        {
                            "role": "user",
                            "parts": [
                                {
                                    "text": userPrompt
                                }
                            ]
                        }
                    ]
                };
                const generatedContent = Common.Modules.GeminiApiClient
                    .generateContent(geminiApiKey, aiModel, payload);
                const translation = JSON.parse(generatedContent.candidates?.[0]?.content?.parts?.[0]?.text || '{}');

                const card = Addon.BotSetup.View
                    .SuggestedTranslationCard(translation);
                return CardService.newActionResponseBuilder()
                    .setNavigation(CardService.newNavigation().pushCard(card))
                    .build();
            } catch (error) {
                // Log the error for debugging
                if (typeof console !== 'undefined') {
                    console.error('Error in SuggestTranslation:', error);
                }
                return CardService.newActionResponseBuilder()
                    .setNotification(CardService.newNotification().setText('Error suggesting translation: ' + error.message))
                    .build();
            }
        },
        AcceptTranslation: function (e) {
            try {
                const formInput = e.commonEventObject?.formInputs || {};
                const language = formInput.targetLanguage?.stringInputs?.value?.[0] || '';
                const name = formInput.suggestedName?.stringInputs?.value?.[0] || '';
                const description = formInput.suggestedDescription?.stringInputs?.value?.[0] || '';
                const shortDescription = formInput.suggestedShortDescription?.stringInputs?.value?.[0] || '';

                //const commands = formInput.commands?.stringInputs?.value?.[0] || '';
                const token = PropertiesService.getDocumentProperties().getProperty(Common.INPUT.TELEGRAM_BOT.BOT_API_TOKEN);
                if (!token) throw new Error('Bot token not found');
                const botClient = new Common.Modules.TelegramBotClient(token);
                // Call appropriate API methods
                if (name) botClient.setMyName({ name: name, language_code: language });
                if (description) botClient.setMyDescription({ description: description, language_code: language });
                if (shortDescription) botClient.setMyShortDescription({ short_description: shortDescription, language_code: language });
                // if (commands) botClient.setMyCommands({ commands: JSON.parse(commands), language_code: language });
                // Show success notification
                return CardService.newActionResponseBuilder()
                    .setNavigation(CardService.newNavigation().popCard())
                    .build();
            } catch (error) {
                return CardService.newActionResponseBuilder()
                    .setNotification(CardService.newNotification().setText('Error updating bot info: ' + error.message))
                    .build();
            }
        },
        DeleteBotInfo: function (e) {
            // Use confirmation card for deletion
            const formInput = e.commonEventObject?.formInputs || {};
            const language = formInput.language?.stringInputs?.value?.[0] || '';
            const title = 'Delete Bot Info';
            const message = `Are you sure you want to delete bot information for language: ${language}?`;
            const onClickFunctionName = 'Addon.BotSetup.Controller.ConfirmDeleteBotInfo';
            const onClickParameters = { language: language };
            return Addon.ConfirmationCard.Controller.Load({
                commonEventObject: {
                    parameters: { title, message, onClickFunctionName, onClickParameters }
                }
            });
        },
        ConfirmDeleteBotInfo: function (e) {
            try {
                const formInput = e.commonEventObject?.formInputs || {};
                const language = formInput.language?.stringInputs?.value?.[0] || '';
                const token = PropertiesService.getDocumentProperties().getProperty(Common.INPUT.TELEGRAM_BOT.BOT_API_TOKEN);
                const botClient = new Common.Modules.TelegramBotClient(token);
                // Implement deletion logic; Telegram API may not support direct deletion, so reset to defaults
                // For example, set empty strings
                botClient.setMyName({ name: '', language_code: language });
                botClient.setMyDescription({ description: '', language_code: language });
                botClient.setMyShortDescription({ short_description: '', language_code: language });
                return CardService.newActionResponseBuilder()
                    .setNotification(CardService.newNotification().setText('Bot info deleted successfully'))
                    .build();
            } catch (error) {
                return CardService.newActionResponseBuilder()
                    .setNotification(CardService.newNotification().setText('Error deleting bot info: ' + error.message))
                    .build();
            }
        }
    },

    View: {
        HomeCard: function (data = {}) {
            const card = CardService.newCardBuilder()
                .setName(Addon.BotSetup.id + '-Home')
                .setHeader(CardService.newCardHeader()
                    .setTitle('Bot Setup')
                    .setSubtitle('Manage bot information and settings')
                    .setImageUrl(Addon.Media.HAVE_A_NICE_DAY_IMG_URL));

            // Section 1: Language selection
            const languageDropdown = CardService.newSelectionInput()
                .setType(CardService.SelectionInputType.DROPDOWN)
                .setTitle('Select Language')
                .setFieldName('sourceLanguage');

            // Add default option for primary language (no code)
            languageDropdown.addItem('*', '', data.selectedLanguage === '' || !data.selectedLanguage);
            // Populate dropdown with supported languages
            for (const code in Common.LANGUAGE_CODES) {
                const lang = Common.LANGUAGE_CODES[code];
                languageDropdown.addItem(lang.name + ' (' + lang.nativeName + ')', code, data.selectedLanguage === code);
            }

            card.addSection(CardService.newCardSection()
                .addWidget(languageDropdown));

            // Section 2: Input fields
            const nameInput = CardService.newTextInput()
                .setTitle('Bot Name')
                .setFieldName('name')
                .setValue(data.name || '');

            const descInput = CardService.newTextInput()
                .setTitle('Description')
                .setFieldName('description')
                .setValue(data.description || '')
                .setMultiline(true);

            const shortDescInput = CardService.newTextInput()
                .setTitle('Short Description')
                .setFieldName('shortDescription')
                .setValue(data.shortDescription || '');

            const picInput = CardService.newTextInput()
                .setTitle('Profile Picture URL')
                .setFieldName('profilePicture')
                .setValue(data.profilePicture || '');

            const commandsInput = CardService.newTextInput()
                .setTitle('Commands (JSON array)')
                .setFieldName('commands')
                .setValue(data.commands || '[]')
                .setMultiline(true);

            card.addSection(CardService.newCardSection()
                .addWidget(nameInput)
                .addWidget(descInput)
                .addWidget(shortDescInput)
                .addWidget(picInput)
                .addWidget(commandsInput));
            // Section 3: Target Language Translation
            const targetLangDropdown = CardService.newSelectionInput()
                .setType(CardService.SelectionInputType.DROPDOWN)
                .setTitle('Target Language')
                .setFieldName('targetLanguage');

            for (const code in Common.LANGUAGE_CODES) {
                const lang = Common.LANGUAGE_CODES[code];
                targetLangDropdown.addItem(lang.name + ' (' + lang.nativeName + ')', code, data.selectedLanguage === code);
            }
            const deleteButton = CardService.newTextButton()
                .setText('Delete')
                .setOnClickAction(CardService.newAction().setFunctionName('Addon.BotSetup.Controller.DeleteBotInfo'));
            const suggestButton = CardService.newTextButton()
                .setText('Suggest Translation')
                .setOnClickAction(CardService.newAction().setFunctionName('Addon.BotSetup.Controller.SuggestTranslation'));

            card.addSection(CardService.newCardSection()
                .addWidget(targetLangDropdown)
                .addWidget(suggestButton));

            const fetchButton = CardService.newTextButton()
                .setText('Fetch Current Info')
                .setOnClickAction(CardService.newAction().setFunctionName('Addon.BotSetup.Controller.FetchCurrentInfo'));

            card.setFixedFooter(CardService.newFixedFooter()
                .setPrimaryButton(fetchButton)
                .setSecondaryButton(deleteButton));

            return card.build();
        },
        SuggestedTranslationCard: function (translation = {}) {
            const card = CardService.newCardBuilder()
                .setName(Addon.BotSetup.id + '-SuggestedTranslation')
                .setHeader(CardService.newCardHeader()
                    .setTitle('Suggested Translation')
                    .setSubtitle('Review and accept suggested translations')
                    .setImageUrl(Addon.Media.HAVE_A_NICE_DAY_IMG_URL));

            // Similar structure to HomeCard but focused on displaying suggestions and accepting them
            // Section 1: Target Language Translation
            const targetLangDropdown = CardService.newSelectionInput()
                .setType(CardService.SelectionInputType.DROPDOWN)
                .setTitle('Target Language')
                .setFieldName('targetLanguage');

            for (const code in Common.LANGUAGE_CODES) {
                const lang = Common.LANGUAGE_CODES[code];
                targetLangDropdown.addItem(lang.name + ' (' + lang.nativeName + ')', code, translation.language_code === code);
            }

            card.addSection(CardService.newCardSection()
                .addWidget(targetLangDropdown));

            // Section 2: Suggested inputs (populated if suggestions available)
            const suggestedNameInput = CardService.newTextInput()
                .setTitle('Suggested Bot Name')
                .setFieldName('suggestedName')
                .setValue(translation.name || '');
            // Add other suggested fields similarly
            const suggestedDescInput = CardService.newTextInput()
                .setTitle('Suggested Description')
                .setFieldName('suggestedDescription')
                .setMultiline(true)
                .setValue(translation.description || '');
            const suggestedShortDescInput = CardService.newTextInput()
                .setTitle('Suggested Short Description')
                .setFieldName('suggestedShortDescription')
                .setMultiline(true)
                .setValue(translation.shortDescription || '');

            card.addSection(CardService.newCardSection()
                .addWidget(suggestedNameInput)
                .addWidget(suggestedDescInput)
                .addWidget(suggestedShortDescInput));

            // Fixed Footer
            const acceptButton = CardService.newTextButton()
                .setText('Accept Translation')
                .setOnClickAction(CardService.newAction().setFunctionName('Addon.BotSetup.Controller.AcceptTranslation'));

            card.setFixedFooter(CardService.newFixedFooter()
                .setPrimaryButton(acceptButton));

            return card.build();
        }
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Addon, Common
    };
}
// src/config/Plugins.js
class Plugins {
    get pluginList() {
        return [
            'Plugins.GetMe',
            'Plugins.GetChat',
            'Plugins.Webhook'
            //Plugins.JsonTools
        ];
    }

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
    DEFAULT_IMAGE_URL: 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/google-workspace-marketplace/120x120.png',
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
    name: 'Telegram Bot Studio',
    short_description: 'A suite of plugins for building Telegram Bots on Google Workspace.',
    description: 'A collection of plugins for building Telegram Bots using Telegram Bot Studio on Google Workspace.',
    version: '1.0.0',
    build: '20260123.230000',
    author: 'Ilan Laloum',
    license: 'MIT',
    imageUrl: Plugins.Media.LOGO_PNG_URL,
    gitRepository: 'https://github.com/ilanlal/telegram-bot-studio'
};

Plugins.Modules = {
    App: {
        get MEMBERSHIP_PROPERTY_KEY() {
            return 'membership';
        },
        getData() {
            const rawData = PropertiesService.getUserProperties().getProperty(Plugins.Modules.App.MEMBERSHIP_PROPERTY_KEY);
            const membershipInfo = rawData ? JSON.parse(rawData) : {};
            const expiresAt = membershipInfo.expiresAt ? new Date(membershipInfo.expiresAt) : null;
            const balance = membershipInfo.balance || 0;
            const isPremium = (expiresAt && expiresAt > new Date()) || balance > 0;

            return {
                // Membership Info
                isPremium: isPremium,
                balance: balance,
                expiresAt: expiresAt,
                // Package Info
                version: Plugins.Package.version,
                build: Plugins.Package.build,
                author: Plugins.Package.author,
                license: Plugins.Package.license,
                gitRepository: Plugins.Package.gitRepository
            }
        }
    },
    Sheet: {
        INVALID_MODEL_ERROR: 'Sheet model must have a valid name property',

        initializeSheet(activeSpreadsheet, sheetMeta = {}) {
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

        setActiveSheet(activeSpreadsheet, sheetMeta = {}) {
            return activeSpreadsheet
                .setActiveSheet(this.getSheet(activeSpreadsheet, sheetMeta));
        },

        getSheet(activeSpreadsheet, sheetMeta = {}) {
            return this._sheet = this.initializeSheet(activeSpreadsheet, sheetMeta);
        },

        bindSheetSampleData(activeSpreadsheet, sheetMeta = {}) {
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

        dumpObjectToSheet(activeSpreadsheet, sheetMeta = {}, bot = '', action = '.', obj = {}) {
            const sheet = this.getSheet(activeSpreadsheet, sheetMeta);
            const values = Object.values(obj);
            values.forEach((val, idx) => {
                // stringify objects and arrays
                if (typeof val === 'object') {
                    values[idx] = JSON.stringify(val);
                }
            });
            const row_data = [
                new Date().toISOString(),   // timestamp
                bot,                        // bot
                action,                     // action
                JSON.stringify(obj),        // raw object data
                ...values                   // individual data fields
            ]
            // append data as a new row
            sheet.appendRow(row_data);

            // Set active selection to the last row
            const lastRow = sheet.getLastRow();
            const lastRowA1Notation = `A${lastRow}:G${lastRow}`;
            sheet.setActiveSelection(lastRowA1Notation);

            return sheet;
        }
    },
    TerminalOutput: class {
        static get SHEET_META() {
            return {
                name: '💻 Terminal Output',
                columns: ['Timestamp', 'Source', 'Message', 'Event Object', 'More Info']
            };
        }

        static write(
            activeSpreadsheet, source, message, e, param1, param2, param3) {

            const terminalOutputEnabled = PropertiesService.getUserProperties()
                .getProperty('terminal_output_switch') || 'OFF';
            const focusTerminalOutput = PropertiesService.getUserProperties()
                .getProperty('focus_terminal_output') || 'OFF';

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

            // Focus the last row if enabled
            if (focusTerminalOutput !== 'ON') {
                return sheet;
            }

            // Set active selection to the last row
            const lastRow = sheet.getLastRow();
            const lastRowA1Notation = `A${lastRow}:G${lastRow}`;
            sheet.setActiveSelection(lastRowA1Notation);
            return sheet;
        }
    }
};

Plugins.Helper = {
    Controller: {
    },
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
                Plugins.ExportApiResultWidget.View.BuildExportWidget(botName, action, result)
            );

            // Build the execution result card
            return newSection;
        },
        BuildActivatePremiumWithCallToActionSection: (data = {}) => {
            const newSection = CardService.newCardSection()
                .setHeader('💎 Upgrade to Premium Membership')
                .setCollapsible(true)
                .setNumUncollapsibleWidgets(1);

            // todo: show message like 'obtain your 90-day premium membership now!'
            newSection.addWidget(
                CardService.newDecoratedText()
                    .setTopLabel('Free Membership')
                    .setText('90-day free trial available.')
                    .setBottomLabel('Upgrade to premium to unlock all features and enhance your experience.')
                    .setWrapText(true)
            );

            // Add upgrade button
            newSection.addWidget(
                CardService.newTextButton()
                    .setText('Upgrade to Premium')
                    .setAltText('Upgrade to Premium Membership')
                    .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
                    .setMaterialIcon(
                        CardService.newMaterialIcon()
                            .setName('upgrade')
                            .setFill(true)
                            .setWeight(300)
                            .setGrade(0)
                    )
                    .setOnClickAction(
                        CardService.newAction()
                            .setFunctionName('Plugins.UserProfile.Controller.Load')
                    )
            );
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
    Controller: {
        Load: (e) => {
            const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
            // Log the event for debugging
            Plugins.Modules.TerminalOutput.write(activeSpreadsheet, 'Controller.Home', 'Load', e, 'Loading Home Card with AppModel data.');

            // Build and return the Home Card
            const appModelData = Plugins.Modules.App.getData();

            // Build and return the Home Card
            const homeCard = Plugins.Home.View.HomeCard({ ...appModelData });

            let cardNavigation = null;
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
        About: (e) => {
            // Build and return the About Card
            const appModelData = Plugins.Modules.App.getData();
            return CardService.newActionResponseBuilder()
                .setNavigation(
                    CardService.newNavigation()
                        .pushCard(Plugins.Home.View.AboutCard({ ...appModelData }))
                ).build();
        },
        Help: (e) => {
            // Build and return the Help Card
            const appModelData = Plugins.Modules.App.getData();
            return CardService.newActionResponseBuilder()
                .setNavigation(
                    CardService.newNavigation()
                        .pushCard(Plugins.Home.View.HelpCard({ ...appModelData }))
                ).build();
        }
    },
    View: {
        HomeCard: (data = {}) => {
            data.txt_bot_api_token = PropertiesService.getUserProperties().getProperty('txt_bot_api_token') || '';
            data.isConnected = !!data.txt_bot_api_token;

            const cardBuilder = CardService.newCardBuilder()
                .setName(Plugins.Home.id + '-Home')
                .setHeader(CardService.newCardHeader()
                    .setTitle(Plugins.Home.name)
                    .setSubtitle(Plugins.Home.short_description)
                    .setImageStyle(CardService.ImageStyle.SQUARE)
                    .setImageUrl(Plugins.Media.WELCOME_IMG_URL)
                    .setImageAltText('Telegram Bot Studio Logo'));

            // 1. Connection & Status Section (Pinned to Top)
            cardBuilder.addSection(
                Plugins.Connection.View.WelcomeSection(data));

            // 2. Main Plugin Hub - Professional Grid-like feel
            const pluginHub = CardService.newCardSection()
                .setHeader('🛠️ Available Plugins')
                .setCollapsible(false);

            [
                'Plugins.GetMe',
                'Plugins.GetChat',
                'Plugins.Webhook'
                //Plugins.JsonTools
            ].forEach((PluginPath) => {
                const plugin = Plugins[PluginPath.split('.')[1]];
                const decoratedText = CardService.newDecoratedText()
                    .setText(plugin.name)
                    .setBottomLabel(plugin.short_description)
                    .setStartIcon(CardService.newIconImage().setIconUrl(plugin.imageUrl))
                    .setWrapText(true)
                    .setButton(
                        CardService.newTextButton()
                            .setText('Open')
                            .setDisabled(!data.isConnected)
                            .setOnClickAction(
                                CardService.newAction()
                                    .setFunctionName(`${PluginPath}.Controller.Load`)
                            )
                    );

                pluginHub.addWidget(decoratedText);
            });

            cardBuilder.addSection(pluginHub);

            // 3. System Quick Actions (Professional Footer Section)
            cardBuilder.addSection(CardService.newCardSection()
                .setHeader('⚙️ Quick Access')
                .setCollapsible(true)
                .addWidget(CardService.newButtonSet()
                    .addButton(CardService.newTextButton()
                        .setText('Settings')
                        .setOnClickAction(CardService.newAction()
                            .setFunctionName('Plugins.Settings.Controller.Load')))
                    .addButton(CardService.newTextButton()
                        .setText('Help')
                        .setOnClickAction(CardService.newAction()
                            .setFunctionName('Plugins.Home.Controller.Help')))
                    .addButton(CardService.newTextButton()
                        .setText('About')
                        .setOnClickAction(CardService.newAction()
                            .setFunctionName('Plugins.Home.Controller.About')))
                ));

            // 4. Premium Call-to-Action (Only if not premium)
            if (!data.isPremium) {
                const premiumSection = CardService.newCardSection()
                    .addWidget(CardService.newDecoratedText()
                        .setTopLabel('Premium Status')
                        .setText('Free Membership')
                        .setStartIcon(CardService.newIconImage().setMaterialIcon(
                            CardService.newMaterialIcon().setName('workspace_premium')))
                        .setBottomLabel('Upgrade to unlock automation & priority support.'));

                cardBuilder.addSection(premiumSection);

                cardBuilder.setFixedFooter(CardService.newFixedFooter()
                    .setPrimaryButton(CardService.newTextButton()
                        .setText('💎 Upgrade to Premium')
                        .setBackgroundColor(Plugins.primaryColor())
                        //.setTextButtonStyle(CardService.TextButtonStyle.FILLED)
                        .setOnClickAction(CardService.newAction()
                            .setFunctionName('Plugins.UserProfile.Controller.Load')))
                );
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
        Load: (e) => {
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
                throw new Error(`Error executing function "${onClickFunctionName}": ${error.message}`);
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

Plugins.ExportApiResultWidget = {
    id: 'ExportApiResultWidget',
    name: 'Export Widget',
    short_description: 'Widget to export API results to Google Sheets',
    description: 'A reusable widget that allows users to export API result data to a Google Sheet for further analysis and record-keeping.',
    version: '1.0.0',
    imageUrl: Plugins.Media.YOU_GOT_IT_IMG_URL,
    Controller: {
        DumpApiResultToSheet: (e) => {
            const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
            // extract parameters
            const sheetName = e?.commonEventObject?.parameters?.sheetName || 'Dump';
            const action = e?.commonEventObject?.parameters?.action || 'Dump';
            const botName = e?.commonEventObject?.parameters?.botName || 'Unknown Bot';
            const data = e?.commonEventObject?.parameters?.data || '{}';
            const result = JSON.parse(data);

            const columns = ['timestamp', 'bot', 'action', 'object_data'];
            // Dump data to sheet
            Plugins.Modules.Sheet.dumpObjectToSheet(activeSpreadsheet,
                { name: sheetName, columns }, botName, action, result);

            // Return action response with notification
            return CardService.newActionResponseBuilder()
                .setNotification(
                    CardService.newNotification()
                        .setText(`✅ Data dumped to sheet "${sheetName}" successfully.`))
                .build();
        }
    },
    View: {
        BuildExportWidget: (botName = '', apiAction = '.', result = {}) => {
            return CardService.newDecoratedText()
                .setTopLabel('📥 Export Data')
                .setText('Export to Sheet')
                .setWrapText(true)
                .setBottomLabel(`${apiAction}: execution result.`)
                .setStartIcon(CardService.newIconImage().setMaterialIcon(
                    CardService.newMaterialIcon().setName('save_alt')))
                .setButton(
                    CardService.newTextButton()
                        .setText('Export')
                        .setOnClickAction(
                            CardService.newAction()
                                .setFunctionName('Plugins.ExportApiResultWidget.Controller.DumpApiResultToSheet')
                                .setParameters({
                                    sheetName: '📦 API Dumps',
                                    botName: botName,
                                    action: apiAction,
                                    data: JSON.stringify(result)
                                })
                        )
                );
        }
    }
};

Plugins.Connection = {
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
                Plugins.Modules.TerminalOutput.write(activeSpreadsheet, 'Connection.Load', 'INFO', e, 'Loading Connection plugin...');
                const data = e?.commonEventObject?.parameters || {};

                return Plugins.Connection.View.HomeCard(data);
            }
            catch (error) {
                Plugins.Modules.TerminalOutput.write(activeSpreadsheet, 'Connection.Load', 'ERROR', e, error.toString(), error.stack);
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
                // Log the event for debugging
                Plugins.Modules.TerminalOutput.write(activeSpreadsheet,
                    'Connection.Connect',
                    'INFO',
                    e,
                    'Attempting to connect with provided Bot API Token.');

                // extract parameters from event object if needed
                // txt_bot_api_token
                const inputToken = e?.commonEventObject?.formInputs?.txt_bot_api_token?.stringInputs?.value?.[0] || '';

                if (!inputToken) {
                    throw new Error('Bot API Token cannot be empty.');
                }

                // getme to validate token
                const client = new TelegramBotClient(inputToken);
                const response = client.getMe();
                // Check for errors in response
                if (JSON.parse(response.getContentText()).ok !== true) {
                    throw new Error(`Error fetching bot info: ${response.getResponseCode()} - ${response.getContentText()}`);
                }

                const result = JSON.parse(response.getContentText()).result;

                // Log the response to Terminal Output sheet
                Plugins.Modules.TerminalOutput.write(activeSpreadsheet, 'Connection.Connect', 'Success', result, `Retrieved bot info for token: ${inputToken}`);

                // on success, store the token in user properties or user properties as needed
                PropertiesService.getUserProperties().setProperty('txt_bot_api_token', inputToken);
                PropertiesService.getUserProperties().setProperty('txt_bot_friendly_name', result.first_name);
                PropertiesService.getUserProperties().setProperty('txt_bot_username', result.username);
                e.parameters = {
                    refresh: 'true'
                };
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
                    activeSpreadsheet,
                    'Connection.Connect',
                    'ERROR', e, error.toString(), error.stack);
                return this.handleError(error)
                    .build();
            }
        },
        ConfirmDisconnect(e) {
            // Show confirmation card before disconnecting
            const title = 'Disconnect Bot';
            const message = 'Are you sure you want to disconnect your bot? This will remove the stored bot token.';
            const onClickFunctionName = 'Plugins.Connection.Controller.Disconnect';
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
                const onClickFunctionName = 'Plugins.Connection.Controller.Disconnect';
                const onClickParameters = e?.commonEventObject?.parameters || {};

                // Push Confirmation Card
                const confirmationCard = Plugins.ConfirmationCard.Controller.Load({
                    commonEventObject: {
                        parameters: { title, message, onClickFunctionName, onClickParameters }
                    }
                });

                // Log the event for debugging
                Plugins.Modules.TerminalOutput.write(activeSpreadsheet, 'Connection.Disconnect', 'INFO', e, 'Disconnecting bot');

                // Clear the stored token from user properties
                PropertiesService.getUserProperties().deleteProperty('txt_bot_api_token');
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
                    'Connection.Disconnect',
                    'ERROR', e, error.toString(), error.stack);
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
            const token = PropertiesService.getUserProperties().getProperty('txt_bot_api_token') || '';
            const isConnected = !!token;
            const username = PropertiesService.getUserProperties().getProperty('txt_bot_username') || 'unknown_bot';
            const friendlyName = PropertiesService.getUserProperties().getProperty('txt_bot_friendly_name') || 'Telegram Bot';

            // Professional Status Section
            const statusSection = CardService.newCardSection();
            let executeAction;
            if (isConnected) {
                // Disconnect action
                executeAction = CardService.newAction()
                    .setFunctionName('Plugins.Connection.Controller.ConfirmDisconnect');
            } else {
                // Connect action
                executeAction = CardService.newAction()
                    .setParameters({
                        path: 'Plugins.Connection.View.HomeCard'
                    })
                    .setFunctionName('Plugins.Connection.Controller.Load');
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
                .setTopLabel('Network Status')
                .setText(isConnected ? `LIVE: ${friendlyName}` : 'OFFLINE: No Bot Linked')
                .setBottomLabel(isConnected ? `@${username}` : 'Establish a secure connection to start.')
                .setStartIcon(
                    CardService.newIconImage()
                        .setMaterialIcon(
                            CardService.newMaterialIcon()
                                .setName(isConnected ? 'sensors' : 'sensors_off')
                                .setFill(false)))
                .setButton(
                    xButton));

            // Bot Token Input Widget (hidden for post-connection)
            statusSection.addWidget(Plugins.Connection.View.BuildTokenTextInputWidget(token, true));

            return statusSection;
        },
        /**
         * Main Connection Management Interface
         */
        HomeCard: (data = {}) => {
            // Fetch Properties
            const userProps = PropertiesService.getUserProperties();
            const token = userProps.getProperty('txt_bot_api_token') || '';
            const isConnected = !!token;
            const username = userProps.getProperty('txt_bot_username') || 'Unknown';

            // 1. Card Header
            const cardBuilder = CardService.newCardBuilder()
                .setName(Plugins.Connection.id + '-Home')
                .setHeader(CardService.newCardHeader()
                    .setTitle('Bot Connection Management')
                    .setSubtitle(isConnected ? `Connected: @${username}` : 'Setup Required')
                    .setImageStyle(CardService.ImageStyle.SQUARE)
                    .setImageUrl(Plugins.Connection.imageUrl));

            // 2. Welcome & Status Section
            const actionSection = CardService.newCardSection()
                .setHeader(isConnected ? '⚙️ Actions' : '🔑 Authentication');

            // Connect Flow: Input + Button
            actionSection.addWidget(Plugins.Connection.View.BuildTokenTextInputWidget(token, false));

            // Help Hint
            actionSection.addWidget(CardService.newDecoratedText()
                .setText('Need a Token?')
                .setBottomLabel('Ask @BotFather on Telegram.')
                .setButton(CardService.newTextButton()
                    .setText('Open BotFather')
                    .setOpenLink(CardService.newOpenLink().setUrl('https://t.me/BotFather')))
            );

            cardBuilder.addSection(actionSection);

            const footer = CardService.newFixedFooter()
                .setPrimaryButton(CardService.newTextButton()
                    .setText('Connect')
                    //.setTextButtonStyle(CardService.TextButtonStyle.FILLED)
                    .setBackgroundColor(Plugins.primaryColor())
                    .setOnClickAction(CardService.newAction()
                        .setFunctionName('Plugins.Connection.Controller.Connect')
                        .addRequiredWidget(['txt_bot_api_token'])));

            cardBuilder.setFixedFooter(footer);

            return cardBuilder.build();
        },
        BuildTokenTextInputWidget: (token, hidden = true) => {
            // Bot Token input
            return CardService.newTextInput()
                .setVisibility(hidden ? CardService.Visibility.HIDDEN : CardService.Visibility.VISIBLE)
                .setValue(token || '')
                .setId('txt_bot_api_token')
                .setFieldName('txt_bot_api_token')
                .setTitle('🤖 Your Bot Token')
                .setHint('Enter your Bot Token, get it from @BotFather, for example: 123456789:ABCDefGhIJKlmNoPQRsTUVwxyZ, keep it secret!');
        }
    }
};

Plugins.Settings = {
    id: 'SettingsPlugin',
    name: 'Settings',
    short_description: 'Manage add-on settings',
    description: 'The Settings card allows you to manage and configure settings for your Telegram bot add-on. You can adjust preferences, set up integrations, and customize the behavior of your bot to suit your needs.',
    version: '1.0.0',
    imageUrl: Plugins.Media.YOU_GOT_IT_IMG_URL,
    Controller: {
        Load: (e) => {
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
            const apiEndpointUrl = e?.commonEventObject?.formInputs?.txt_api_endpoint_url?.stringInputs?.value?.[0] || '';
            if (apiEndpointUrl) {
                PropertiesService.getUserProperties().setProperty('txt_api_endpoint_url', apiEndpointUrl);
            }
            // extract and save secret private key
            const secretPrivateKey = e?.commonEventObject?.formInputs?.txt_secret_private_key?.stringInputs?.value?.[0] || '';
            if (secretPrivateKey) {
                PropertiesService.getUserProperties().setProperty('txt_secret_private_key', secretPrivateKey);
            }

            // focus_terminal_output
            const focusTerminalOutput = e?.commonEventObject?.formInputs?.focus_terminal_output?.stringInputs?.value?.[0] || 'OFF';
            PropertiesService.getUserProperties().setProperty('focus_terminal_output', focusTerminalOutput === 'ON' ? 'ON' : 'OFF');

            // terminal_output_switch
            const terminalOutputSwitch = e?.commonEventObject?.formInputs?.terminal_output_switch?.stringInputs?.value?.[0] || 'OFF';
            PropertiesService.getUserProperties().setProperty('terminal_output_switch', terminalOutputSwitch === 'ON' ? 'ON' : 'OFF');

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
                Plugins.Modules.TerminalOutput.write(SpreadsheetApp.getActiveSpreadsheet(),
                    'Settings.ToggleAction',
                    'INFO',
                    e,
                    `-------------------------`);
                const actionName = e?.commonEventObject?.parameters?.actionName;
                // actionName like: 'debug_mode_switch' or 'form_input_switch_key'
                const preState = e?.commonEventObject?.formInputs?.[actionName]?.stringInputs?.value?.[0];
                // store the new state within user properties or perform necessary actions
                PropertiesService.getUserProperties().setProperty(actionName, preState === 'ON' ? 'ON' : 'OFF');
                // return success notification
                return CardService.newActionResponseBuilder()
                    .setNotification(
                        CardService.newNotification()
                            .setText(`${actionName} set to ${preState}`))
                    .build();
            } catch (error) {
                // log error to terminal output
                Plugins.Modules.TerminalOutput.write(SpreadsheetApp.getActiveSpreadsheet(),
                    'Settings.ToggleAction',
                    'ERROR',
                    e,
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
            // 1. Data Initialization
            // Create a random demo key if none exists (for display purposes)
            const privateKeyDemo = Array(65).fill(0).map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');

            // Fetch properties with robust fallbacks
            data.txt_api_endpoint_url = PropertiesService.getUserProperties().getProperty('txt_api_endpoint_url') || 'https://api.telegram.org/';
            data.terminal_output_switch = PropertiesService.getUserProperties().getProperty('terminal_output_switch') || 'OFF';
            data.focus_terminal_output = PropertiesService.getUserProperties().getProperty('focus_terminal_output') || 'OFF';
            data.txt_secret_private_key = PropertiesService.getUserProperties().getProperty('txt_secret_private_key') || privateKeyDemo;

            const cardBuilder = CardService.newCardBuilder()
                .setName(Plugins.Settings.name + '-Home')
                .setHeader(CardService.newCardHeader()
                    .setTitle('System Configuration')
                    .setSubtitle('Manage endpoints, security keys, and debugging')
                    .setImageStyle(CardService.ImageStyle.SQUARE)
                    .setImageUrl(Plugins.Settings.imageUrl)
                    .setImageAltText('Settings Logo'));

            // 2. Network & Security Section (Compact Grouping)
            // Groups the API URL and Secret Key together as they are both core config items
            const configSection = CardService.newCardSection()
                .setHeader('🌐 Network & Security')
                .setCollapsible(false);

            // API Endpoint Input
            configSection.addWidget(
                CardService.newTextInput()
                    .setFieldName('txt_api_endpoint_url')
                    .setTitle('API Endpoint URL')
                    .setValue(data.txt_api_endpoint_url)
                    .setHint('Default: https://api.telegram.org/')
                    .setMultiline(false)
            );

            // Secret Key Input with Validation
            configSection.addWidget(
                CardService.newTextInput()
                    .setFieldName('txt_secret_private_key')
                    .setTitle('Secret Private Key')
                    .setValue(data.txt_secret_private_key)
                    .setHint('Enter your secure 256-char private key')
                    .setValidation(
                        CardService.newValidation()
                            .setCharacterLimit(256)
                            .setInputType(CardService.InputType.TEXT))
            );

            cardBuilder.addSection(configSection);

            // 3. Developer Tools Section
            // Isolated section for toggles and switches
            const devSection = CardService.newCardSection()
                .setHeader('🛠️ Developer Console');

            // Terminal Output Switch (Pro Style)
            devSection.addWidget(
                CardService.newDecoratedText()
                    .setTopLabel('Debug Mode')
                    .setText('Terminal Logs')
                    .setBottomLabel('Write execution logs to the active spreadsheet.')
                    .setStartIcon(CardService.newIconImage().setMaterialIcon(
                        CardService.newMaterialIcon().setName('terminal').setFill(false)))
                    .setSwitchControl(
                        CardService.newSwitch()
                            .setFieldName('terminal_output_switch')
                            .setValue('ON')
                            .setSelected(data.terminal_output_switch === 'ON')
                            .setControlType(CardService.SwitchControlType.CHECK_BOX)
                    )
            );

            // Focus Terminal Output Switch
            devSection.addWidget(
                CardService.newDecoratedText()
                    .setVisibility(data.terminal_output_switch === 'ON' ? CardService.Visibility.VISIBLE : CardService.Visibility.HIDDEN)
                    .setTopLabel('Debug Mode')
                    .setText('Focus Terminal Output')
                    .setBottomLabel('Focus the terminal output on the last log entry.')
                    .setStartIcon(CardService.newIconImage().setMaterialIcon(
                        CardService.newMaterialIcon().setName('center_focus_strong').setFill(false)))
                    .setSwitchControl(
                        CardService.newSwitch()
                            .setFieldName('focus_terminal_output')
                            .setValue('ON')
                            .setSelected(data.focus_terminal_output === 'ON')
                            .setControlType(CardService.SwitchControlType.CHECK_BOX)
                    )
            );

            cardBuilder.addSection(devSection);

            // 4. Professional Fixed Footer
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
        Load(e) {
            try {
                const membershipStr = PropertiesService.getUserProperties().getProperty('membership') || null;
                const membership = membershipStr ? JSON.parse(membershipStr) : null;
                const isPremium = membership && membership.type === 'premium' && new Date(membership.expiresAt) > new Date();

                const appModelData = Plugins.Modules.App.getData();
                return CardService.newActionResponseBuilder()
                    .setNavigation(
                        CardService.newNavigation()
                            .pushCard(Plugins.UserProfile.View.HomeCard({ ...appModelData, isPremium }))
                    ).build();
            } catch (error) {
                return this.handleOperationError(error);
            }
        },
        ActivatePremium(e) {
            try {
                // Simulate activation logic
                // In a real implementation, you would interact with a payment gateway or licensing server here
                const membership = {
                    licenseKey: 'SAMPLE_LICENSE_KEY',
                    type: 'premium',
                    activatedAt: new Date().toISOString(),
                    // Add one 90 days to the current date
                    expiresAt: new Date(new Date().setDate(new Date().getDate() + 90)).toISOString(),
                    balance: 0
                }

                // Save membership info to user properties
                PropertiesService.getUserProperties().setProperty('membership', JSON.stringify(membership));

                // Build and return the Home Card
                const appModelData = Plugins.Modules.App.getData();
                return CardService.newActionResponseBuilder()
                    .setNavigation(
                        CardService.newNavigation()
                            .popToRoot()
                            .updateCard(Plugins.Home.View.HomeCard({ ...appModelData }))
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
            return Plugins.ConfirmationCard.Controller.Load({
                commonEventObject: {
                    parameters: { title, message, onClickFunctionName, onClickParameters }
                }
            });
        },
        RevokeLicense(e) {
            const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
            try {
                // Log the event for debugging
                Plugins.Modules.TerminalOutput.write(activeSpreadsheet, 'UserProfile.RevokeLicense', 'INFO', e, 'Revoking premium membership');
                // Simulate revocation logic
                PropertiesService.getUserProperties().deleteProperty('membership');
                // Build and return the Home Card
                const appModelData = Plugins.Modules.App.getData();
                return CardService.newActionResponseBuilder()
                    .setNavigation(
                        CardService.newNavigation()
                            .popToRoot()
                            .updateCard(Plugins.Home.View.HomeCard({ ...appModelData }))
                    ).build();
            } catch (error) {
                // Log the error for debugging
                Plugins.Modules.TerminalOutput.write(activeSpreadsheet, 'UserProfile.RevokeLicense', 'ERROR', error, 'Error revoking premium membership');
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
            const userEmail = Session.getActiveUser().getEmail();
            const cardBuilder = CardService.newCardBuilder()
                .setName(Plugins.UserProfile.id + '-Home')
                .setHeader(CardService.newCardHeader()
                    .setTitle('Account Overview')
                    .setSubtitle(userEmail)
                    .setImageStyle(CardService.ImageStyle.SQUARE)
                    .setImageUrl(Plugins.Media.YOU_GOT_IT_IMG_URL)
                    .setImageAltText('User Profile Avatar'));

            // 1. Membership Status Section
            cardBuilder.addSection(Plugins.UserProfile.View.buildMembershipSection(data));

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
                    .setBottomLabel(data.isPremium ? 'Active' : 'Premium Only'));
            });

            cardBuilder.addSection(featureSection);

            return cardBuilder.build();
        },
        buildMembershipSection: (data = {}) => {
            const isPremium = data.isPremium ?? false;

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
                .setBottomLabel(isPremium ? 'Your pro subscription is active.' : 'Upgrade to unlock advanced bot tools.')
                .setWrapText(true));

            if (isPremium) {
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
                Plugins.Modules.TerminalOutput.write(activeSpreadsheet, 'GetMe.Load', 'INFO', e, 'Loading GetMe plugin...');
                const data = e?.commonEventObject?.parameters || {};

                // Optional: Check if we are forcing a refresh via parameters
                const isUpdate = data.update === 'true';

                const input_token = PropertiesService.getUserProperties().getProperty('txt_bot_api_token');
                if (!input_token) {
                    throw new Error('Bot API Token is not set. Please connect your bot first.');
                }

                // Fetch bot current bot name for logging purposes
                data.currentBotName = PropertiesService.getUserProperties().getProperty('txt_bot_username') || 'unknown_bot';

                // Initialize Telegram Bot Client
                const telegramBotClient = new TelegramBotClient(input_token);
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

            // Add dump to result to sheet widget
            profileSection.addWidget(
                Plugins.ExportApiResultWidget.View.BuildExportWidget(data.currentBotName, 'getMe', result));

            cardBuilder.addSection(profileSection);

            // --- Section: Debug/Raw Data ---
            cardBuilder.addSection(
                Plugins.Helper.View.BuildResultSection(result.username, 'getMe', result));


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
                const input_token = PropertiesService.getUserProperties().getProperty('txt_bot_api_token');
                if (!input_token) {
                    throw new Error('Bot API Token is not set. Please connect your bot first.');
                }

                // Fetch bot current bot name for logging purposes
                data.currentBotName = PropertiesService.getUserProperties().getProperty('txt_bot_username') || 'unknown_bot';

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

                    // Log response for debugging
                    Plugins.Modules.TerminalOutput.write(activeSpreadsheet, 'GetChat.Load', 'INFO', data, `getChat Response: ${response.getContentText()}`);

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
                .setFieldName('txt_search_chat_id')
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
                        .addRequiredWidget(['txt_search_chat_id'])));

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

            const identitySection = CardService.newCardSection()
                .setHeader('📋 Result Profile');

            identitySection.addWidget(CardService.newDecoratedText()
                .setTopLabel(result.type.toUpperCase())
                .setText(`<b>${title}</b>`)
                .setBottomLabel(`ID: ${result.id}`)
                .setStartIcon(CardService.newIconImage().setMaterialIcon(
                    CardService.newMaterialIcon()
                        .setName(typeIcon)
                        .setFill(false))) // Constraint: setFill(false)
                .setWrapText(true));

            if (result.username) {
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
            }

            // Add dump to result to sheet widget
            identitySection.addWidget(
                Plugins.ExportApiResultWidget.View.BuildExportWidget(data.currentBotName, 'getMe', result));

            cardBuilder.addSection(identitySection);

            // --- Section B: Detailed Properties ---
            cardBuilder.addSection(
                Plugins.Helper.View.BuildResultSection(data.currentBotName, 'getChat', result));

            return cardBuilder.build();
        }
    }
};

Plugins.Webhook = {
    id: 'WebhookPlugin',
    name: 'Webhook Manager',
    imageUrl: Plugins.Media.DEFAULT_IMAGE_URL,
    description: 'Advanced configuration for Bot Webhooks.',
    short_description: 'Manage Bot Webhook',
    Controller: {
        /**
         * Entry Point
         */
        Load: (e) => {
            const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
            const data = e?.commonEventObject?.parameters || {};

            try {
                // Log start of execution
                Plugins.Modules.TerminalOutput.write(activeSpreadsheet, 'Webhook.Load', 'INFO', e, 'Loading Webhook Manager');

                const input_token = PropertiesService.getUserProperties().getProperty('txt_bot_api_token');
                const isUpdate = data.update === 'true';
                const isPop = data.popCard === 'true';

                if (!input_token) {
                    throw new Error('Bot API Token is not set. Please connect your bot first.');
                }

                // Fetch bot current bot name for logging purposes
                data.currentBotName = PropertiesService.getUserProperties().getProperty('txt_bot_username') || 'unknown_bot';

                // Logic: Fetch Data if Token Exists
                const telegramBotClient = new TelegramBotClient(input_token);
                // 1. API Call: getWebhookInfo
                const response = telegramBotClient.getWebhookInfo();
                // Log response for debugging
                Plugins.Modules.TerminalOutput.write(activeSpreadsheet, 'Webhook.Load', 'DEBUG', data, `getWebhookInfo Response: ${response.getContentText()}`);
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

                return CardService.newActionResponseBuilder()
                    .setNavigation(navigation)
                    .build();
            } catch (error) {
                Plugins.Modules.TerminalOutput.write(activeSpreadsheet, 'Webhook.Load', 'ERROR', e, error.toString());
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
                Plugins.Modules.TerminalOutput.write(activeSpreadsheet, 'Webhook.SetWebhook', 'INFO', e, 'Setting Webhook...');
                const token = PropertiesService.getUserProperties().getProperty('txt_bot_api_token');
                const inputs = e?.commonEventObject?.formInputs || {};

                // Extract Inputs
                const urlInput = inputs.txt_webhook_url?.stringInputs?.value?.[0];
                const ipInput = inputs.txt_ip_address?.stringInputs?.value?.[0];
                const maxConnInput = inputs.txt_max_connections?.stringInputs?.value?.[0];
                const secretInput = inputs.txt_secret_token?.stringInputs?.value?.[0];
                const dropPending = inputs.drop_pending_updates?.stringInputs?.value?.[0] === 'true';

                // Validation
                if (!urlInput || !urlInput.startsWith('https://')) {
                    return CardService.newActionResponseBuilder()
                        .setNotification(CardService.newNotification().setText("❌ Valid HTTPS URL required."))
                        .build();
                }

                const client = new TelegramBotClient(token);

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

                Plugins.Modules.TerminalOutput.write(activeSpreadsheet, 'Webhook.SetWebhook', 'DEBUG', e, `setWebhook Response: ${response.getContentText()}`);
                return Plugins.Webhook.Controller.Load({ commonEventObject: { parameters: { update: 'true' } } });
            } catch (error) {
                // Log error for debugging
                Plugins.Modules.TerminalOutput.write(activeSpreadsheet, 'Webhook.SetWebhook', 'ERROR', e, error.toString(), error.stack);
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
                Plugins.Modules.TerminalOutput.write(activeSpreadsheet, 'Webhook.DeleteWebhook', 'INFO', e, 'Deleting Webhook...');

                const token = PropertiesService.getUserProperties().getProperty('txt_bot_api_token');
                const dropPending = e?.commonEventObject?.formInputs?.drop_pending_updates?.stringInputs?.value?.[0] === 'true';

                const client = new TelegramBotClient(token);
                const response = client.deleteWebhook(dropPending);

                if (JSON.parse(response.getContentText()).ok !== true) {
                    throw new Error(`API Error ${response.getResponseCode()}: ${response.getContentText()}`);
                }

                // Log response for debugging
                Plugins.Modules.TerminalOutput.write(activeSpreadsheet, 'Webhook.DeleteWebhook', 'DEBUG', e, `deleteWebhook Response: ${response.getContentText()}`);

                const result = JSON.parse(response.getContentText()).result;
                return Plugins.Webhook.Controller.Load({ commonEventObject: { parameters: { update: 'true', popCard: 'true' } } });
            } catch (error) {
                // Log error for debugging
                Plugins.Modules.TerminalOutput.write(activeSpreadsheet, 'Webhook.DeleteWebhook', 'ERROR', e, error.toString(), error.stack);
                return CardService.newActionResponseBuilder()
                    .setNotification(CardService.newNotification().setText(`❌ Error: ${error.message}`))
                    .build();
            }
        },

        DropPendingUpdates: (e) => {
            const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
            try {
                // Log start of execution
                Plugins.Modules.TerminalOutput.write(activeSpreadsheet, 'Webhook.DropPendingUpdates', 'INFO', e, 'DropPendingUpdates');
                const token = PropertiesService.getUserProperties().getProperty('txt_bot_api_token');
                const inputs = e?.commonEventObject?.formInputs || {};

                // Extract Inputs
                const urlInput = inputs.txt_webhook_url?.stringInputs?.value?.[0];
                const ipInput = inputs.txt_ip_address?.stringInputs?.value?.[0];
                const maxConnInput = inputs.txt_max_connections?.stringInputs?.value?.[0];
                const secretInput = inputs.txt_secret_token?.stringInputs?.value?.[0];
                const dropPending = true;

                // Validation
                if (!urlInput || !urlInput.startsWith('https://')) {
                    return CardService.newActionResponseBuilder()
                        .setNotification(CardService.newNotification().setText("❌ Valid HTTPS URL required."))
                        .build();
                }

                const client = new TelegramBotClient(token);

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

                Plugins.Modules.TerminalOutput.write(activeSpreadsheet, 'Webhook.SetWebhook', 'DEBUG', e, `setWebhook Response: ${response.getContentText()}`);
                return Plugins.Webhook.Controller.Load({ commonEventObject: { parameters: { update: 'true' } } });
            } catch (error) {
                // Log error for debugging
                Plugins.Modules.TerminalOutput.write(activeSpreadsheet, 'Webhook.SetWebhook', 'ERROR', e, error.toString(), error.stack);
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
                    .setTitle('Webhook Console')
                    .setSubtitle('Manage Real-time Updates')
                    .setImageStyle(CardService.ImageStyle.SQUARE)
                    .setImageUrl(Plugins.Webhook.imageUrl));

            // --- 1. Connection Header ---
            cardBuilder.addSection(Plugins.Connection.View.WelcomeSection(data));
            // --- Section A: Status Dashboard ---
            const statusSection = CardService.newCardSection()
                .setHeader('📡 Webhook Status');

            // Action Buttons
            const buttonSet = CardService.newButtonSet();
            const footer = CardService.newFixedFooter()
                .setPrimaryButton(CardService.newTextButton()
                    .setText('Refresh Status')
                    .setMaterialIcon(CardService.newMaterialIcon()
                        .setName('refresh')
                        .setFill(false)) // Constraint 1
                    .setOnClickAction(CardService.newAction()
                        .setFunctionName('Plugins.Webhook.Controller.Load')
                        .setParameters({ update: 'true' })));

            // --- 2. Live Status Logic ---
            if (result.url !== '') {
                // Delete Button (Only if active)
                footer.setSecondaryButton(CardService.newTextButton()
                    .setText('Delete Webhook')
                    .setOnClickAction(CardService.newAction()
                        .setFunctionName('Plugins.Webhook.Controller.ConfirmDeleteWebhook')));

                // Active Status
                statusSection.addWidget(CardService.newDecoratedText()
                    .setTopLabel('Status')
                    .setText('Active')
                    .setBottomLabel(String(result.url))
                    .setStartIcon(CardService.newIconImage().setMaterialIcon(
                        CardService.newMaterialIcon()
                            .setName('cloud_done')
                            .setFill(false))) // Constraint 1
                    .setWrapText(true));
            }
            else {
                // Inactive Status
                statusSection.addWidget(CardService.newDecoratedText()
                    .setTopLabel('Status')
                    .setText('Inactive')
                    .setBottomLabel('Bot is using Long Polling (no webhook).')
                    .setStartIcon(CardService.newIconImage().setMaterialIcon(
                        CardService.newMaterialIcon()
                            .setName('cloud_off')
                            .setFill(false)))); // Constraint 1
            }

            // Set/Update Button
            footer.setPrimaryButton(CardService.newTextButton()
                .setText(result.url ? 'Update Settings' : 'Set Webhook')
                //.setTextButtonStyle(CardService.TextButtonStyle.FILLED)
                .setBackgroundColor(Plugins.primaryColor())
                .setOnClickAction(CardService.newAction()
                    .setFunctionName('Plugins.Webhook.Controller.SetWebhook')
                    // Collect all inputs
                    .addRequiredWidget(['txt_webhook_url'])
                    .addRequiredWidget(['txt_max_connections'])));

            // Traffic/Pending Info
            if (result.pending_update_count > 0) {
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

                statusSection.addWidget(CardService.newDecoratedText()
                    .setTopLabel(`Last Error (${errorDate})`)
                    .setText(`⚠️ ${result.last_error_message}`)
                    .setStartIcon(CardService.newIconImage().setMaterialIcon(
                        CardService.newMaterialIcon()
                            .setName('error_outline')
                            .setFill(false))) // Constraint 1
                    .setWrapText(true));
            }

            // Add dump to result to sheet widget
            statusSection.addWidget(
                Plugins.ExportApiResultWidget.View.BuildExportWidget(data.currentBotName, 'getWebhookInfo', result));

            cardBuilder.addSection(statusSection);

            // --- Section B: Configuration Form ---
            const configSection = CardService.newCardSection()
                .setHeader('🛠️ Configuration')
                .setCollapsible(true); // Collapsible to save space if not needed

            // 1. Webhook URL (Constraint 5)
            configSection.addWidget(CardService.newTextInput()
                .setFieldName('txt_webhook_url')
                .setTitle('Webhook URL (Required)')
                .setHint('https://your-script-url/exec')
                .setValue(String(result.url))); // Defaults to current live URL

            // 2. IP Address (Constraint 5)
            configSection.addWidget(CardService.newTextInput()
                .setFieldName('txt_ip_address')
                .setTitle('Custom IP Address (Optional)')
                .setHint('Bypass DNS resolution with specific IP')
                .setValue(result.ip_address || ''));

            // 3. Max Connections (Constraint 5)
            configSection.addWidget(CardService.newTextInput()
                .setFieldName('txt_max_connections')
                .setTitle('Max Connections (1-100)')
                .setHint('Default: 40')
                .setValue(result.max_connections ? result.max_connections.toString() : '40'));

            // 4. Secret Token (Constraint 5)
            configSection.addWidget(CardService.newTextInput()
                .setFieldName('txt_secret_token')
                .setTitle('Secret Token (Optional)')
                .setHint('X-Telegram-Bot-Api-Secret-Token header')
                .setValue('')); // We don't get this back from API for security, so leave empty

            // 5. Drop Pending Updates (Constraint 4 & 5)
            // Fix: Using DecoratedText to label the switch
            configSection.addWidget(CardService.newDecoratedText()
                .setText('Drop Pending Updates')
                .setBottomLabel('Skip old messages in queue upon setting webhook.')
                .setSwitchControl(CardService.newSwitch()
                    .setFieldName('drop_pending_updates')
                    .setValue('true')
                    .setControlType(CardService.SwitchControlType.CHECK_BOX)));

            cardBuilder.addSection(configSection);

            // --- Section: Raw Data (Debug) ---
            cardBuilder.addSection(Plugins.Helper.View.BuildResultSection(data.currentBotName, 'getWebhookInfo', result));

            // --- 3. Footer Refresh ---

            cardBuilder.setFixedFooter(footer);

            return cardBuilder.build();
        }
    }
};

Plugins.JsonTools = {
    id: 'JsonToolsPlugin',
    name: 'JSON Tools Plugin',
    description: 'A set of tools to make working with JSON data easier.',
    version: '1.1.0',
    imageUrl: 'https://raw.githubusercontent.com/ilanlal/ss-json-editor/main/assets/logo120.png',
    WelcomeSection: (data = {}) => {
        return CardService.newCardSection()
            .setHeader('🪚 Useful JSON Tools')
            .setCollapsible(true)
            .setNumUncollapsibleWidgets(2)
            // Add decorated text widget
            .addWidget(CardService.newDecoratedText()
                .setTopLabel(Plugins.JsonTools.version)
                .setText(Plugins.JsonTools.name + ':')
                .setBottomLabel(Plugins.JsonTools.description)
                .setWrapText(false))
            // Add button set for JSON Tools
            .addWidget(CardService.newTextButton()
                .setText('🎨 Beautify')
                .setOnClickAction(
                    CardService.newAction()
                        .setFunctionName('JsonHandler.View.BeautifyJson')
                ))
            // Add Minify JSON button
            .addWidget(CardService.newTextButton()
                .setText('🗜️ Minify')
                .setOnClickAction(
                    CardService.newAction()
                        .setFunctionName('JsonHandler.View.MinifyJson')
                ))
            // Add Validate JSON button
            .addWidget(CardService.newTextButton()
                .setText('✅ Validate')
                .setOnClickAction(
                    CardService.newAction()
                        .setFunctionName('JsonHandler.View.ValidateJson')
                )
                // Add basic help about JSON Tools plugin
            ).addWidget(
                CardService.newTextParagraph()
                    .setMaxLines(2)
                    .setText('Use these tools to beautify, minify, or validate your JSON data easily within Google Workspace.\n\n'
                        + 'Simply click on the desired action button to get started.'
                    )
            );
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Plugins
    };
};

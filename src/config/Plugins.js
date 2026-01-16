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
        return '#8a46d8';
    }

    static secondaryColor() {
        return '#0a7fad';
    }

    static accentColor() {
        return '#ff5722';
    }

    static getFormInputsStringValue(e, key, defaultValue = '') {
        const formInputs = e?.commonEventObject?.formInputs;
        return formInputs?.[key]?.stringInputs?.value?.[0] || defaultValue;
    }
};

Plugins.DEFAULT_IMAGE_URL = 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/google-workspace-marketplace/120x120.png';
Plugins.WELCOME_IMG_URL = 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/google-workspace-marketplace/480x480_welcome.png';
Plugins.MATH_IMG_URL = 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/bitmoji-math.webp';
Plugins.THANK_YOU_IMG_URL = 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/bitmoji-thank-you.webp';
Plugins.YOU_GOT_IT_IMG_URL = 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/bitmoji-you-got-it.webp';
Plugins.BIG_TIME_IMG_URL = 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/bitmoji-big-time.webp';
Plugins.PEACH_IMG_URL = 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/bitmoji-peach.webp';
Plugins.HAVE_A_NICE_DAY_IMG_URL = 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/bitmoji-have-a-nice-day.webp';
Plugins.I_AM_THINKING_IMG_URL = 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/bitmoji-i-am-thinking.webp';
Plugins.WAIT_FOR_IT_IMG_URL = 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/bitmoji-wait-for-it.webp';
Plugins.YES_IMG_URL = 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/bitmoji-yes.webp';
Plugins.PAY_ATTENTION_IMG_URL = 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/bitmoji-pay-attention.webp';
Plugins.KISS_IMG_URL = 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/bitmoji-kiss.webp';
Plugins.CHEERS_IMG_URL = 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/bitmoji-cheers.webp';
Plugins.BLINK_IMG_URL = 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/bitmoji-blink.webp';
Plugins.LOGO_PNG_URL = 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/google-workspace-marketplace/240x240.png';
Plugins.GIT_REPO_URL = 'https://github.com/ilanlal/telegram-bot-studio';

Plugins.ViewModel = {
    id: 'AppModelPlugin',
    name: 'Telegram Bot Studio',
    short_description: 'Plugins for Telegram Bots',
    description: 'A collection of plugins for building Telegram Bots using Telegram Bot Studio on Google Workspace.',
    version: '1.0.2',
    imageUrl: Plugins.DEFAULT_IMAGE_URL,
    BuildDumpToSheetWidget: (apiAction = '.', result = {}) => {
        return CardService.newDecoratedText()
            .setText('📥 Export to Sheet')
            .setWrapText(true)
            .setBottomLabel(`Click to export the ${apiAction} response data to a Google Sheet.`)
            .setStartIcon(CardService.newIconImage().setMaterialIcon(
                CardService.newMaterialIcon().setName('save_alt')))
            .setButton(
                CardService.newTextButton()
                    .setText('Export')
                    .setOnClickAction(
                        CardService.newAction()
                            .setFunctionName('Plugins.ViewModel.OnDumpToSheet')
                            .setParameters({
                                sheetName: '📦 API Dumps',
                                title: apiAction,
                                data: JSON.stringify(result)
                            })
                    )
            );
    },
    BuildResultSectionPlaceholder: () => {
        return CardService.newCardSection()
            .setHeader('☑️ Execution Result')
            // add placeholder decorated text widget
            .addWidget(
                CardService.newTextParagraph()
                    .setText('Execution result will be displayed here.')
            )
            // add divider
            .addWidget(CardService.newDivider());
    },
    BuildResultSection: (title = '.', result = {}) => {
        const newSection = CardService.newCardSection()
            .setHeader('✅ Execution Result')
            .setCollapsible(true)
            .setNumUncollapsibleWidgets(0);

        // Add dump to sheet widget
        newSection.addWidget(
            Plugins.ViewModel.BuildDumpToSheetWidget(title, result));

        // Add Preview title
        newSection.addWidget(
            CardService.newTextParagraph()
                .setText('Response: [Preview]')
        );

        // Add divider
        newSection.addWidget(CardService.newDivider());

        // Add each property from result to the section as decorated text
        Object.keys(result)
            .forEach((key) => {
                newSection.addWidget(
                    CardService.newDecoratedText()
                        .setText(key + ":")
                        .setWrapText(true)
                        .setBottomLabel(JSON.stringify(result[key])));
            });

        // Raw JSON view
        // Add divider
        newSection.addWidget(CardService.newDivider());

        // Add Raw title
        newSection.addWidget(
            CardService.newTextParagraph()
                .setText('Response: [Raw JSON]'));

        // Add divider
        newSection.addWidget(CardService.newDivider());

        // Add raw result text paragraph
        newSection.addWidget(
            CardService.newTextParagraph()
                .setMaxLines(1)
                .setText(JSON.stringify(result)));

        // Build the execution result card
        return newSection;
    },
    BuildErrorSection: (error = {}) => {
        return CardService.newCardSection()
            .setHeader('📛 Error')
            // add divider
            .addWidget(CardService.newDivider())
            // add error header
            .addWidget(
                CardService.newTextParagraph()
                    .setText('An error occurred during execution:')
            )
            // add error message
            .addWidget(
                CardService.newTextParagraph()
                    .setText(error.toString())
            );
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
                        .setFunctionName('Plugins.UserProfile.OnLoad')
                )
        );
        return newSection;
    },
    GetFormInputValue: (e, key, defaultValue = '') => {
        const formInputs = e?.commonEventObject?.formInputs;
        return formInputs?.[key]?.stringInputs?.value?.[0] || defaultValue;
    },
    OnDumpToSheet: (e) => {
        // extract parameters
        const sheetName = e.parameters?.sheetName || 'Dump';
        const title = e.parameters?.title || 'Dump';
        const data = e.parameters?.data || '{}';
        const result = JSON.parse(data);
        // Create SheetModel instance
        const sheetModel = SheetModel.create(SpreadsheetApp.getActiveSpreadsheet());
        const columns = ['timestamp', 'title', 'data'];
        // Dump data to sheet
        sheetModel.dumpObjectToSheet(
            { name: sheetName, columns }, title, result);

        // Return action response with notification
        return CardService.newActionResponseBuilder()
            .setNotification(
                CardService.newNotification()
                    .setText(`✅ Data dumped to sheet "${sheetName}" successfully.`))
            .build();
    },
    // Helper to generate consistent grid items with outlined icons
    createStatusItem: (label, isEnabled) => {
        return CardService.newGridItem()
            .setTitle(label)
            .setSubtitle(isEnabled ? 'Enabled' : 'Disabled')
            .setTextAlignment(CardService.HorizontalAlignment.START)
            .setLayout(CardService.GridItemLayout.TEXT_BELOW);
        // Note: GridItems do not support setMaterialIcon directly in all contexts,
        // so we rely on the text status. If icons were needed here, 
        // we would switch to DecoratedText widgets in a Section.
    }
};

Plugins.Home = {
    id: 'HomePlugin',
    name: 'Telegram Bot Studio',
    short_description: 'A suite of tools for Telegram Bots',
    description: 'A collection of plugins for building Telegram Bots using Telegram Bot Studio on Google Workspace.',
    version: '1.0.3',
    HomeCard: (data = {}) => {
        data.txt_bot_api_token = PropertiesService.getUserProperties().getProperty('txt_bot_api_token') || '';
        data.isConnected = !!data.txt_bot_api_token;

        const cardBuilder = CardService.newCardBuilder()
            .setName(Plugins.Home.id + '-Home')
            .setHeader(CardService.newCardHeader()
                .setTitle(Plugins.Home.name)
                .setSubtitle(Plugins.Home.short_description)
                .setImageStyle(CardService.ImageStyle.SQUARE)
                .setImageUrl(Plugins.WELCOME_IMG_URL)
                .setImageAltText('Telegram Bot Studio Logo'));

        // 1. Connection & Status Section (Pinned to Top)
        cardBuilder.addSection(
            Plugins.Connection.WelcomeSection(data));

        // 2. Main Plugin Hub - Professional Grid-like feel
        const pluginHub = CardService.newCardSection()
            .setHeader('🛠️ Available Plugins')
            .setCollapsible(false);

        Plugins.prototype.pluginList.forEach((PluginPath) => {
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
                                .setFunctionName(`${PluginPath}.OnLoad`)
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
                        .setFunctionName('Plugins.Settings.OnLoad')))
                .addButton(CardService.newTextButton()
                    .setText('Help')
                    .setOnClickAction(CardService.newAction()
                        .setFunctionName('Plugins.Home.OnHelp')))
                .addButton(CardService.newTextButton()
                    .setText('About')
                    .setOnClickAction(CardService.newAction()
                        .setFunctionName('Plugins.Home.OnAbout')))
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
                        .setFunctionName('Plugins.UserProfile.OnLoad')))
            );
        }

        return cardBuilder.build();
    },
    AboutCard: (data = {}) => {
        const cardBuilder = CardService.newCardBuilder()
            .setName(Plugins.Home.id + '-About')
            .setHeader(CardService.newCardHeader()
                .setTitle('About ' + Plugins.Home.name)
                .setSubtitle(Plugins.Home.short_description)
                .setImageStyle(CardService.ImageStyle.SQUARE)
                .setImageUrl(Plugins.BIG_TIME_IMG_URL)
                .setImageAltText('Card Image'))
            .addSection(
                CardService.newCardSection()
                    .setHeader('App Information')
                    .addWidget(
                        CardService.newTextParagraph()
                            .setText(`Name: ${Plugins.Home.name}`))
                    .addWidget(
                        CardService.newTextParagraph()
                            .setText(`Version: ${Plugins.Home.version}`))
                    .addWidget(
                        CardService.newTextParagraph()
                            .setText(`Info: ${Plugins.Home.description}`))
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
                                .setUrl(`${Plugins.GIT_REPO_URL}#readme`)))
                .addWidget(
                    CardService.newTextButton()
                        .setText('📢 Report Issues')
                        .setOpenLink(
                            CardService.newOpenLink()
                                .setUrl(`${Plugins.GIT_REPO_URL}/issues`))));

        return cardBuilder.build();
    },
    HelpCard: (data = {}) => {
        const cardBuilder = CardService.newCardBuilder()
            .setName(Plugins.Home.id + '-Help')
            .setHeader(CardService.newCardHeader()
                .setTitle('Help & Support')
                .setSubtitle(Plugins.Home.short_description)
                .setImageStyle(CardService.ImageStyle.SQUARE)
                .setImageUrl(Plugins.YES_IMG_URL)
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
                    .setUrl(`${Plugins.GIT_REPO_URL}#readme`)))
            .addWidget(CardService.newTextButton()
                .setText('📢 Report a Bug')
                .setOpenLink(CardService.newOpenLink()
                    .setUrl(`${Plugins.GIT_REPO_URL}/issues`))));

        return cardBuilder.build();
    },
    OnLoad: (e) => {
        const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        // Log the event for debugging
        TerminalOutput.Write(activeSpreadsheet,
            'Plugins.Home',
            'OnLoad',
            e,
            'Loading Home Card with AppModel data.');

        // Build and return the Home Card
        const appModelData = AppModel.create()
            .toJSON();

        // Build and return the Home Card
        const homeCard = Plugins.Home.HomeCard({ ...appModelData });

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
    OnAbout: (e) => {
        // Build and return the About Card
        const appModelData = AppModel.create()
            .toJSON();
        return CardService.newActionResponseBuilder()
            .setNavigation(
                CardService.newNavigation()
                    .pushCard(Plugins.Home.AboutCard({ ...appModelData }))
            ).build();
    },
    OnHelp: (e) => {
        // Build and return the Help Card
        const appModelData = AppModel.create()
            .toJSON();
        return CardService.newActionResponseBuilder()
            .setNavigation(
                CardService.newNavigation()
                    .pushCard(Plugins.Home.HelpCard({ ...appModelData }))
            ).build();
    }
}

Plugins.Navigations = {
    PushCard: (e) => {
        TerminalOutput.Write(SpreadsheetApp.getActiveSpreadsheet(),
            'Plugins.Navigations',
            'PushCard',
            e,
            `Pushing card with path: ${e.parameters?.path || 'N/A'}`);
        // extract parameters from event
        const path = e.parameters?.path || null;
        if (!path) {
            throw new Error('"path" parameter is required to navigate.');
        }

        // path = 'Plugins.GetMe.HomeCard', 'Plugins.GetChat.HomeCard', etc.
        const splitPath = path.split('.');
        if (splitPath.length !== 3) {
            throw new Error(`Invalid plugin path format: "${path}". Expected format: "Plugins.PluginName.ActionName".`);
        }
        const plugin = splitPath[1];
        const action = splitPath[2];

        if (Plugins[plugin] && typeof Plugins[plugin][action] === 'function') {
            const appModelData = AppModel.create()
                .toJSON();
            // Call the plugin action to get the card
            return Plugins[plugin][action](e);

        }

        throw new Error(`Plugin path "${path}" not found.`);
    },
    UpdateCard: (e) => {
        TerminalOutput.Write(SpreadsheetApp.getActiveSpreadsheet(),
            'Plugins.Navigations',
            'UpdateCard',
            e,
            `Updating card with path: ${e.parameters?.path || 'N/A'}`);
        // extract parameters from event
        const path = e.parameters?.path || null;
        if (!path) {
            throw new Error('"path" parameter is required to navigate.');
        }

        // path = 'Plugins.GetMe.HomeCard', 'Plugins.GetChat.HomeCard', etc.
        const splitPath = path.split('.');
        if (splitPath.length !== 3) {
            throw new Error(`Invalid plugin path format: "${path}". Expected format: "Plugins.PluginName.ActionName".`);
        }

        const plugin = splitPath[1];
        const action = splitPath[2];

        if (Plugins[plugin] && typeof Plugins[plugin][action] === 'function') {
            // Call the plugin action to get the card
            return CardService.newActionResponseBuilder()
                .setNavigation(
                    CardService.newNavigation()
                        .updateCard(Plugins[plugin][action](e))
                ).build();
        }

        throw new Error(`Plugin path "${path}" not found.`);
    },
    PopCard: (e) => {
        return CardService.newActionResponseBuilder()
            .setNavigation(
                CardService.newNavigation()
                    .popCard()
            ).build();
    },
    PopToRoot: (e) => {
        // extract parameters from event
        const path = e.parameters?.path || null;
        if (!path) {
            throw new Error('"path" parameter is required to navigate.');
        }

        // path = 'Plugins.GetMe.HomeCard', 'Plugins.GetChat.HomeCard', etc.
        const splitPath = path.split('.');
        if (splitPath.length !== 3) {
            throw new Error(`Invalid plugin path format: "${path}". Expected format: "Plugins.PluginName.ActionName".`);
        }
        const plugin = splitPath[1];
        const action = splitPath[2];

        return CardService.newActionResponseBuilder()
            .setNavigation(
                CardService.newNavigation()
                    .popToRoot()
            ).build();
    }
};

Plugins.Connection = {
    id: 'ConnectionPlugin',
    name: 'Connection',
    short_description: 'Manage bot connection settings',
    description: 'The Connection plugin allows you to manage and configure the connection settings for your Telegram bot. You can set up your bot token, test the connection, and ensure that your bot is properly connected to the Telegram API.',
    version: '1.0.0',
    imageUrl: Plugins.WELCOME_IMG_URL,
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
                .setFunctionName('Plugins.Connection.OnDisconnect');
        } else {
            // Connect action
            executeAction = CardService.newAction()
                .setParameters({
                    path: 'Plugins.Connection.HomeCard'
                })
                .setFunctionName('Plugins.Navigations.PushCard');
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
                .setBackgroundColor(Plugins.secondaryColor())
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
        statusSection.addWidget(Plugins.ViewModel.BuildTokenTextInputWidget(token, true));

        return statusSection;
    },
    HomeCard: (data = {}) => {
        data.txt_bot_api_token = PropertiesService.getUserProperties().getProperty('txt_bot_api_token') || '';
        // Build the Home Card for Connection Plugin
        // Professional Footer with a high-visibility 'Connect' action
        const newFixedFooter = CardService.newFixedFooter()
            .setPrimaryButton(
                CardService.newTextButton()
                    .setDisabled(!!data.txt_bot_api_token)
                    .setText('Connect')
                    .setBackgroundColor(Plugins.secondaryColor())
                    .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
                    .setMaterialIcon(CardService.newMaterialIcon().setName('check_circle'))
                    .setOnClickAction(
                        CardService.newAction()
                            .addRequiredWidget(['txt_bot_api_token'])
                            .setFunctionName('Plugins.Connection.OnConnect')))
            .setSecondaryButton(
                CardService.newTextButton()
                    .setAltText('Forget & Disconnect')
                    .setText('Forget')
                    .setMaterialIcon(
                        CardService.newMaterialIcon()
                            .setName('link_off')
                            .setFill(false)
                    )
                    .setOnClickAction(
                        CardService.newAction()
                            .setFunctionName('Plugins.Connection.OnDisconnect')));

        // 1. Instruction Section: Visual and Brief
        const instructionSection = CardService.newCardSection()
            .addWidget(CardService.newTextParagraph()
                .setText('To link your Telegram Bot to this Google Sheet, please enter your unique API token below.'))
            .addWidget(CardService.newDecoratedText()
                .setText('Secure Connection')
                .setBottomLabel('Your token is stored locally in your User Properties.')
                .setStartIcon(
                    CardService.newIconImage()
                        .setMaterialIcon(
                            CardService.newMaterialIcon()
                                .setName('lock')
                                .setFill(false).setWeight(300).setGrade(0))));

        // 2. Input Section: Professional Text Field
        const inputSection = CardService.newCardSection()
            .setHeader('Bot Authentication')
            .addWidget(Plugins.ViewModel.BuildTokenTextInputWidget(data.txt_bot_api_token, false))
            .addWidget(CardService.newTextParagraph()
                .setText('<font color="#757575"><i>Example: 123456789:ABCDefGh...</i></font>'));

        // 3. Educational Helper Section (Collapsible)
        const guideSection = CardService.newCardSection()
            .setHeader('How to get a Token')
            .setCollapsible(true)
            .setNumUncollapsibleWidgets(0)
            .addWidget(CardService.newDecoratedText()
                .setTopLabel('Step 1')
                .setText('Message @BotFather on Telegram')
                .setStartIcon(
                    CardService.newIconImage()
                        .setMaterialIcon(
                            CardService.newMaterialIcon()
                                .setName('chat'))))
            .addWidget(CardService.newDecoratedText()
                .setTopLabel('Step 2')
                .setText('Send /newbot and follow instructions')
                .setStartIcon(CardService.newIconImage().setMaterialIcon(
                    CardService.newMaterialIcon().setName('add_circle'))))
            .addWidget(CardService.newDecoratedText()
                .setTopLabel('Step 3')
                .setText('Copy the API Token provided')
                .setStartIcon(CardService.newIconImage().setMaterialIcon(
                    CardService.newMaterialIcon().setName('content_copy'))))
            .addWidget(CardService.newTextButton()
                .setText('Open @BotFather')
                .setOpenLink(CardService.newOpenLink().setUrl('https://t.me/BotFather')));

        const cardBuilder = CardService.newCardBuilder()
            .setName(Plugins.Connection.id + '-Home')
            .setHeader(CardService.newCardHeader()
                .setTitle('Bot Configuration')
                .setSubtitle('Establish a secure link with Telegram')
                .setImageStyle(CardService.ImageStyle.CIRCLE)
                .setImageUrl(Plugins.WELCOME_IMG_URL))
            .addSection(instructionSection)
            .addSection(inputSection)
            .addSection(guideSection)
            .setFixedFooter(newFixedFooter);

        return cardBuilder.build();
    },
    OnConnect(e) {
        const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        // extract parameters from event object if needed
        // txt_bot_api_token
        const inputToken = Plugins.getFormInputsStringValue(e, 'txt_bot_api_token', '').trim();

        if (!inputToken) {
            throw new Error('Bot API Token cannot be empty.');
        }

        try {
            // getme to validate token
            const client = new TelegramBotClient(inputToken);
            const response = client.getMe();
            // Check for errors in response
            if (JSON.parse(response.getContentText()).ok !== true) {
                throw new Error(`Error fetching bot info: ${response.getResponseCode()} - ${response.getContentText()}`);
            }

            const result = JSON.parse(response.getContentText()).result;

            // Log the response to Terminal Output sheet
            TerminalOutput.Write(activeSpreadsheet, 'Plugins.Connection.OnConnect', 'Success', result, `Retrieved bot info for token: ${inputToken}`);

            // on success,
            // Store the token in user properties or user properties as needed
            PropertiesService.getUserProperties().setProperty('txt_bot_api_token', inputToken);
            PropertiesService.getUserProperties().setProperty('txt_bot_friendly_name', result.first_name);
            PropertiesService.getUserProperties().setProperty('txt_bot_username', result.username);
            e.parameters = {
                refresh: 'true'
            };
            // Build and return the Home Card
            const appModelData = AppModel.create()
                .toJSON();
            return CardService.newActionResponseBuilder()
                .setNavigation(
                    CardService.newNavigation()
                        .popToRoot()
                        .updateCard(Plugins.Home.HomeCard({ ...appModelData }))
                ).build();
        } catch (error) {
            TerminalOutput.Write(
                activeSpreadsheet,
                'Plugins.Connection.OnConnect',
                'ERROR', e, error.toString(), error.stack);
            return this.handleError(error)
                .build();
        }
    },
    OnDisconnect(e) {
        try {
            // Clear the stored token from user properties
            PropertiesService.getUserProperties().deleteProperty('txt_bot_api_token');
            // Build and return the Home Card
            const appModelData = AppModel.create()
                .toJSON();
            return CardService.newActionResponseBuilder()
                .setNavigation(
                    CardService.newNavigation()
                        .popToRoot()
                        .updateCard(Plugins.Home.HomeCard({ ...appModelData }))
                ).build();
        } catch (error) {
            TerminalOutput.Write(
                this._activeSpreadsheet,
                'BotApiHandler.Logout',
                'ERROR', e, error.toString());
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
};

Plugins.Settings = {
    id: 'SettingsPlugin',
    name: 'Settings',
    short_description: 'Manage add-on settings',
    description: 'The Settings card allows you to manage and configure settings for your Telegram bot add-on. You can adjust preferences, set up integrations, and customize the behavior of your bot to suit your needs.',
    version: '1.0.0',
    imageUrl: Plugins.YOU_GOT_IT_IMG_URL,
    WelcomeSection: (data = {}) => {
        return CardService.newCardSection()
            //.setHeader('Settings Extensions')
            .setCollapsible(true)
            .setNumUncollapsibleWidgets(1)
            // add main decorated text widget
            .addWidget(
                CardService.newDecoratedText()
                    .setStartIcon(
                        CardService.newIconImage().setMaterialIcon(
                            CardService.newMaterialIcon().setName('settings')))
                    .setText(Plugins.Settings.name)
                    .setBottomLabel(Plugins.Settings.short_description)
                    .setWrapText(false)
                    .setButton(
                        CardService.newTextButton()
                            .setAltText('Open Settings Plugin')
                            .setMaterialIcon(
                                CardService.newMaterialIcon()
                                    .setName('settings')
                                    .setFill(false)
                                    .setWeight(300)
                                    .setGrade(0)
                            )
                            .setOnClickAction(
                                CardService.newAction()
                                    .setFunctionName('Plugins.Settings.OnLoad')
                            )
                    )
            );
    },
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
                .setImageStyle(CardService.ImageStyle.CIRCLE)
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
                        .setControlType(CardService.SwitchControlType.SWITCH)
                        .setOnChangeAction(
                            CardService.newAction()
                                .setFunctionName('Plugins.Settings.OnToggleAction')
                                .setParameters({ actionName: 'terminal_output_switch' })
                        )
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
                        .setControlType(CardService.SwitchControlType.SWITCH)
                        .setOnChangeAction(
                            CardService.newAction()
                                .setFunctionName('Plugins.Settings.OnToggleAction')
                                .setParameters({ actionName: 'focus_terminal_output' })
                        )
                )
        );

        cardBuilder.addSection(devSection);

        // 4. Professional Fixed Footer
        // High-contrast primary button for the "Save" action
        const fixedFooter = CardService.newFixedFooter()
            .setPrimaryButton(
                CardService.newTextButton()
                    .setText('Save Configuration')
                    .setBackgroundColor(Plugins.secondaryColor())
                    .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
                    .setMaterialIcon(CardService.newMaterialIcon().setName('save'))
                    .setOnClickAction(
                        CardService.newAction()
                            .setFunctionName('Plugins.Settings.OnSaveSettings')
                    )
            );

        cardBuilder.setFixedFooter(fixedFooter);

        return cardBuilder.build();
    },
    OnLoad: (e) => {
        // Build and return the Settings Home Card
        const appModelData = AppModel.create()
            .toJSON();
        return CardService.newActionResponseBuilder()
            .setNavigation(
                CardService.newNavigation()
                    .pushCard(Plugins.Settings.HomeCard({ ...appModelData }))
            ).build();
    },
    OnSaveSettings: (e) => {
        // save api endpoint url
        const apiEndpointUrl = Plugins.getFormInputsStringValue(e, 'txt_api_endpoint_url', '');
        if (apiEndpointUrl) {
            PropertiesService.getUserProperties().setProperty('txt_api_endpoint_url', apiEndpointUrl);
        }
        // sace secret private key
        const secretPrivateKey = Plugins.getFormInputsStringValue(e, 'txt_secret_private_key', '');
        if (secretPrivateKey) {
            PropertiesService.getUserProperties().setProperty('txt_secret_private_key', secretPrivateKey);
        }

        // Build and return the Home Card
        const appModelData = AppModel.create()
            .toJSON();
        return CardService.newActionResponseBuilder()
            .setNavigation(
                CardService.newNavigation()
                    .popToRoot()
                    .updateCard(Plugins.Home.HomeCard({ ...appModelData }))
            ).build();
    },
    OnToggleAction(e) {
        try {
            TerminalOutput.Write(SpreadsheetApp.getActiveSpreadsheet(),
                'Plugins.Settings.OnToggleAction',
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
            TerminalOutput.Write(SpreadsheetApp.getActiveSpreadsheet(),
                'Plugins.Settings.OnToggleAction',
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
};

Plugins.UserProfile = {
    id: 'UserProfilePlugin',
    name: 'User Profile',
    short_description: 'Manage your account and membership',
    description: 'The User Profile plugin allows you to manage your account information, view your membership status, and upgrade to premium features. You can easily access your profile details and make changes to your subscription directly from this card.',
    version: '1.0.0',
    imageUrl: Plugins.YOU_GOT_IT_IMG_URL,
    HomeCard: (data = {}) => {
        const userEmail = Session.getActiveUser().getEmail();
        const cardBuilder = CardService.newCardBuilder()
            .setName(Plugins.UserProfile.id + '-Home')
            .setHeader(CardService.newCardHeader()
                .setTitle('Account Overview')
                .setSubtitle(userEmail)
                .setImageStyle(CardService.ImageStyle.CIRCLE)
                .setImageUrl(Plugins.YOU_GOT_IT_IMG_URL)
                .setImageAltText('User Profile Avatar'));

        // 1. Membership Status Section
        cardBuilder.addSection(Plugins.UserProfile.buildMembershipSection(data));

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
        const statusColor = isPremium ? Plugins.secondaryColor() : '#757575';

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
                .setText('Manage / Cancel Subscription')
                .setTextButtonStyle(CardService.TextButtonStyle.TEXT)
                .setOnClickAction(CardService.newAction()
                    .setFunctionName('Plugins.UserProfile.OnRevokeLicense')));
        } else {
            newSection.addWidget(CardService.newTextButton()
                .setText('💎 Upgrade Now')
                .setBackgroundColor(Plugins.secondaryColor())
                .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
                .setMaterialIcon(CardService.newMaterialIcon().setName('bolt'))
                .setOnClickAction(CardService.newAction()
                    .setFunctionName('Plugins.UserProfile.OnActivatePremium')));
        }

        return newSection;
    },
    OnLoad(e) {
        try {
            const membershipStr = PropertiesService.getUserProperties().getProperty('membership') || null;
            const membership = membershipStr ? JSON.parse(membershipStr) : null;
            const isPremium = membership && membership.type === 'premium' && new Date(membership.expiresAt) > new Date();

            const appModelData = AppModel.create()
                .toJSON();
            return CardService.newActionResponseBuilder()
                .setNavigation(
                    CardService.newNavigation()
                        .pushCard(Plugins.UserProfile.HomeCard({ ...appModelData, isPremium }))
                ).build();
        } catch (error) {
            return this.handleOperationError(error);
        }
    },
    OnActivatePremium(e) {
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
            const appModelData = AppModel.create()
                .toJSON();
            return CardService.newActionResponseBuilder()
                .setNavigation(
                    CardService.newNavigation()
                        .popToRoot()
                        .updateCard(Plugins.Home.HomeCard({ ...appModelData }))
                ).build();
        } catch (error) {
            return this.handleOperationError(error);
        }
    },
    OnRevokeLicense(e) {
        try {
            // Simulate revocation logic
            PropertiesService.getUserProperties().deleteProperty('membership');
            // Build and return the Home Card
            const appModelData = AppModel.create()
                .toJSON();
            return CardService.newActionResponseBuilder()
                .setNavigation(
                    CardService.newNavigation()
                        .popToRoot()
                        .updateCard(Plugins.Home.HomeCard({ ...appModelData }))
                ).build();
        } catch (error) {
            return this.handleOperationError(error);
        }
    },
    handleOperationSuccess(message) {
        // Show a success message to the user
        return CardService.newActionResponseBuilder()
            .setNotification(
                CardService.newNotification()
                    .setText(message))
            .build();
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
};

Plugins.GetMe = {
    id: 'GetMePlugin',
    name: 'Get Me',
    imageUrl: Plugins.DEFAULT_IMAGE_URL, // Falls back to default if specific icon isn't set
    description: 'Verify your bot connection and view identity details.',
    short_description: 'Bot identity & capabilities',

    /**
     * Entry point for the Get Me plugin
     */
    OnLoad: (e) => {
        const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        // Log the event for debugging
        TerminalOutput.Write(activeSpreadsheet, 'Plugins.GetMe.OnLoad', 'INFO', e, 'Loading GetMe plugin...');
        const data = e?.commonEventObject?.parameters || {};

        // Optional: Check if we are forcing a refresh via parameters
        const isUpdate = data.update === 'true';

        const input_token = PropertiesService.getUserProperties().getProperty('txt_bot_api_token');
        if (!input_token) {
            throw new Error('Bot API Token is not set. Please connect your bot first.');
        }

        // Logic: Fetch Data if Token Exists
        try {
            const telegramBotClient = new TelegramBotClient(input_token);
            // 1. API Call: getMe
            const response = telegramBotClient.getMe();

            // Log the raw response for debugging
            TerminalOutput.Write(activeSpreadsheet, 'Plugins.GetMe.OnLoad', 'DEBUG', data, `getMe Response: ${response.getContentText()}`);

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
                    Plugins.GetMe.HomeCard(data, result));
            } else {
                // Push a new card onto the stack
                navigation.pushCard(
                    Plugins.GetMe.HomeCard(data, result));
            }

            return CardService.newActionResponseBuilder()
                .setNavigation(navigation)
                .build();
        }
        catch (error) {
            TerminalOutput.Write(activeSpreadsheet, 'Plugins.GetMe.OnLoad', 'ERROR', data, error.toString());
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
     * Builds the main interface card
     */
    HomeCard: (data = {}, result = {}) => {
        // 1. Data Initialization
        const cardBuilder = CardService.newCardBuilder()
            .setName(Plugins.GetMe.id + '-Home')
            .setHeader(CardService.newCardHeader()
                .setTitle('Bot Dashboard')
                .setSubtitle('Identity & Feature Configuration')
                .setImageStyle(CardService.ImageStyle.CIRCLE)
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

        // --- Section B: Capabilities (Grid Layout) ---
        // Shows what the bot is allowed to do based on BotFather settings
        const settingsGrid = CardService.newGrid()
            .setTitle('⚙️ Capabilities & Privacy')
            .setNumColumns(2);

        // add other properties dynamically if needed
        Object.keys(result).forEach(key => {
            if (!['id', 'username'].includes(key)) {
                const value = result[key];
                if (typeof value === 'boolean') {
                    settingsGrid.addItem(
                        Plugins.ViewModel.createStatusItem(key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), value ? 'Yes' : 'No'));
                }
            }
        });

        cardBuilder.addSection(CardService.newCardSection().addWidget(settingsGrid));

        // --- Section: Debug/Raw Data ---
        cardBuilder.addSection(
            Plugins.ViewModel.BuildResultSection('getMe', result));


        // 2. Footer: Refresh Action
        const footer = CardService.newFixedFooter()
            .setPrimaryButton(CardService.newTextButton()
                .setText('Refresh Data')
                .setMaterialIcon(CardService.newMaterialIcon()
                    .setName('refresh')
                    .setFill(false)) // Constraint check: setFill(false)
                .setOnClickAction(CardService.newAction()
                    .setFunctionName('Plugins.GetMe.OnLoad')
                    .setParameters({ update: 'true' })));

        cardBuilder.setFixedFooter(footer);

        return cardBuilder.build();
    }
};

Plugins.GetChat = {
    id: 'GetChatPlugin',
    name: 'Get Chat Info',
    imageUrl: Plugins.DEFAULT_IMAGE_URL,
    description: 'Inspect details for users, groups, or channels.',
    short_description: 'Chat & User Inspector',

    /**
     * Entry Point
     */
    OnLoad: (e) => {
        const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        // Log start of execution
        TerminalOutput.Write(activeSpreadsheet, 'Plugins.GetChat.OnLoad', 'Start', e, 'Loading Chat Info');

        const data = e?.commonEventObject?.parameters || {};
        const isUpdate = data.update === 'true';
        const input_token = PropertiesService.getUserProperties().getProperty('txt_bot_api_token');
        if (!input_token) {
            throw new Error('Bot API Token is not set. Please connect your bot first.');
        }

        // Extract Chat ID from form inputs if available (user clicked Search)
        // or fall back to parameters/properties
        const searchChatId = e?.commonEventObject?.formInputs?.txt_search_chat_id?.stringInputs?.value?.[0] || '';
        if (searchChatId) {
            data.txt_search_chat_id = searchChatId;
            try {
                // 1. API Call: getChat
                const client = new TelegramBotClient(input_token);
                // API Call: getChat
                const response = client.getChat(searchChatId);

                // Log response for debugging
                TerminalOutput.Write(activeSpreadsheet, 'Plugins.GetChat.OnLoad', 'INFO', data, `getChat Response: ${response.getContentText()}`);

                if (JSON.parse(response.getContentText()).ok !== true) {
                    throw new Error(`Telegram API Error: ${response.getContentText()}`);
                }
                const result = JSON.parse(response.getContentText()).result;

                // 2. Navigation Handling
                let navigation = CardService.newNavigation();

                if (isUpdate) {
                    // Update the existing card in place
                    navigation.updateCard(
                        Plugins.GetChat.HomeCard(data, result));
                }
                else {
                    // Push a new card onto the stack
                    navigation.pushCard(
                        Plugins.GetChat.HomeCard(data, result));
                }

                return CardService.newActionResponseBuilder()
                    .setNavigation(navigation)
                    .build();
            } catch (error) {
                TerminalOutput.Write(activeSpreadsheet, 'Plugins.GetChat.OnLoad', 'ERROR', data, error.toString());

                // Return notification of error
                return CardService.newActionResponseBuilder()
                    .setNotification(
                        CardService.newNotification()
                            .setText(
                                error.toString()))
                    .build();
            }
        }

        // No search ID provided, just show the Home Card
        return CardService.newActionResponseBuilder()
            .setNavigation(
                CardService.newNavigation().pushCard(
                    Plugins.GetChat.HomeCard(data, null)))
            .build();
    },

    /**
     * Main Interface Builder
     */
    HomeCard: (data = {}, result = null) => {
        // 1. Data Initialization
        const searchId = data.txt_search_chat_id || '';

        const cardBuilder = CardService.newCardBuilder()
            .setName(Plugins.GetChat.id + '-Home')
            .setHeader(CardService.newCardHeader()
                .setTitle('Chat Inspector')
                .setSubtitle('View details for Users, Groups, and Channels')
                .setImageStyle(CardService.ImageStyle.CIRCLE)
                .setImageUrl(Plugins.GetChat.imageUrl));

        // --- Search Section ---
        const searchSection = CardService.newCardSection()
            .setHeader('🔍 Target Selector');

        searchSection.addWidget(CardService.newTextInput()
            .setFieldName('txt_search_chat_id')
            .setTitle('Chat ID or Username')
            .setHint('e.g., @mychannel or 123456789')
            .setValue(searchId));

        cardBuilder.addSection(searchSection);

        // --- Footer Actions ---
        const footer = CardService.newFixedFooter()
            .setPrimaryButton(CardService.newTextButton()
                .setText('Search Chat')
                .setMaterialIcon(CardService.newMaterialIcon()
                    .setName('search')
                    .setFill(false)) // Constraint: setFill(false)
                .setOnClickAction(CardService.newAction()
                    .setFunctionName('Plugins.GetChat.OnLoad')
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

        cardBuilder.addSection(identitySection);

        const settingsGrid = CardService.newGrid()
            .setTitle('⚙️ Capabilities & Privacy')
            .setNumColumns(2);

        // add other properties dynamically if needed
        Object.keys(result).forEach(key => {
            if (!['id', 'username', 'type', 'invite_link', 'pinned_message'].includes(key)) {
                const value = result[key];
                if (typeof value === 'boolean') {
                    settingsGrid.addItem(
                        Plugins.ViewModel.createStatusItem(key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), value ? 'Yes' : 'No'));
                }
            }
        });

        cardBuilder.addSection(CardService.newCardSection().addWidget(settingsGrid));
        // --- Section C: Raw Data (Debug) ---
        cardBuilder.addSection(
            Plugins.ViewModel.BuildResultSection('getChat', result));

        return cardBuilder.build();
    }
};

Plugins.Webhook = {
    id: 'WebhookPlugin',
    name: 'Webhook Manager',
    imageUrl: Plugins.DEFAULT_IMAGE_URL,
    description: 'Advanced configuration for Bot Webhooks.',
    short_description: 'Manage Bot Webhook',

    /**
     * Entry Point
     */
    OnLoad: (e) => {
        const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        const data = e?.commonEventObject?.parameters || {};
        const input_token = PropertiesService.getUserProperties().getProperty('txt_bot_api_token');
        const isUpdate = data.update === 'true';
        try {
            // Log start of execution
            TerminalOutput.Write(activeSpreadsheet, 'Plugins.Webhook.OnLoad', 'INFO', e, 'Loading Webhook Manager');

            if (!input_token) {
                throw new Error('Bot API Token is not set. Please connect your bot first.');
            }

            // Logic: Fetch Data if Token Exists
            const telegramBotClient = new TelegramBotClient(input_token);
            // 1. API Call: getWebhookInfo
            const response = telegramBotClient.getWebhookInfo();
            // Log response for debugging
            TerminalOutput.Write(activeSpreadsheet, 'Plugins.Webhook.OnLoad', 'DEBUG', data, `getWebhookInfo Response: ${response.getContentText()}`);
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
                    Plugins.Webhook.HomeCard(data, result));
            }
            else {
                // Push a new card onto the stack
                navigation.pushCard(
                    Plugins.Webhook.HomeCard(data, result));
            }

            return CardService.newActionResponseBuilder()
                .setNavigation(navigation)
                .build();
        } catch (error) {
            TerminalOutput.Write(activeSpreadsheet, 'Plugins.Webhook.OnLoad', 'ERROR', e, error.toString());
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
     * Main Interface Card
     */
    HomeCard: (data = {}, result = {}) => {
        const cardBuilder = CardService.newCardBuilder()
            .setName(Plugins.Webhook.id + '-Home')
            .setHeader(CardService.newCardHeader()
                .setTitle('Webhook Console')
                .setSubtitle('Manage Real-time Updates')
                .setImageStyle(CardService.ImageStyle.CIRCLE)
                .setImageUrl(Plugins.Webhook.imageUrl));

        // --- 1. Connection Header ---
        cardBuilder.addSection(Plugins.Connection.WelcomeSection(data));
        // --- Section A: Status Dashboard ---
        const statusSection = CardService.newCardSection()
            .setHeader('📡 Live Status');

        // Action Buttons
        const buttonSet = CardService.newButtonSet();

        // --- 2. Live Status Logic ---
        if (result.url !== '') {
            // Delete Button (Only if active)
            buttonSet.addButton(CardService.newTextButton()
                .setText('Delete Webhook')
                .setOnClickAction(CardService.newAction()
                    .setFunctionName('Plugins.Webhook.OnDeleteWebhook')));

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
        buttonSet.addButton(CardService.newTextButton()
            .setText(result.url ? 'Update Settings' : 'Set Webhook')
            //.setTextButtonStyle(CardService.TextButtonStyle.FILLED)
            .setBackgroundColor(Plugins.secondaryColor())
            .setOnClickAction(CardService.newAction()
                .setFunctionName('Plugins.Webhook.OnSetWebhook')
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
                        .setFill(false)))); // Constraint 1
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

        configSection.addWidget(buttonSet);
        cardBuilder.addSection(configSection);

        // --- Section: Raw Data (Debug) ---
        cardBuilder.addSection(Plugins.ViewModel.BuildResultSection('getWebhookInfo', result));

        // --- 3. Footer Refresh ---
        const footer = CardService.newFixedFooter()
            .setPrimaryButton(CardService.newTextButton()
                .setText('Refresh Status')
                .setMaterialIcon(CardService.newMaterialIcon()
                    .setName('refresh')
                    .setFill(false)) // Constraint 1
                .setOnClickAction(CardService.newAction()
                    .setFunctionName('Plugins.Webhook.OnLoad')
                    .setParameters({ update: 'true' })));

        cardBuilder.setFixedFooter(footer);

        return cardBuilder.build();
    },

    /**
     * ACTION: Set Webhook with Full Options
     */
    OnSetWebhook: (e) => {
        const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        try {
            // Log start of execution
            TerminalOutput.Write(activeSpreadsheet, 'Plugins.Webhook.OnSetWebhook', 'INFO', e, 'Setting Webhook...');
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

            TerminalOutput.Write(activeSpreadsheet, 'Plugins.Webhook.OnSetWebhook', 'DEBUG', e, `setWebhook Response: ${response.getContentText()}`);

            return Plugins.Webhook.OnLoad(e);
        } catch (error) {
            // Log error for debugging
            TerminalOutput.Write(activeSpreadsheet, 'Plugins.Webhook.OnSetWebhook', 'ERROR', e, error.toString(), error.stack);
            return CardService.newActionResponseBuilder()
                .setNotification(CardService.newNotification().setText(`❌ Error: ${error.message}`))
                .build();
        }
    },

    /**
     * ACTION: Delete Webhook
     */
    OnDeleteWebhook: (e) => {
        const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        const data = e?.commonEventObject?.parameters || {};
        // Log start of execution
        TerminalOutput.Write(activeSpreadsheet, 'Plugins.Webhook.OnDeleteWebhook', 'INFO', e, 'Deleting Webhook...');
        try {
            const token = PropertiesService.getUserProperties().getProperty('txt_bot_api_token');
            const dropPending = e?.commonEventObject?.formInputs?.drop_pending_updates?.stringInputs?.value?.[0] === 'true';

            const client = new TelegramBotClient(token);
            const response = client.deleteWebhook(dropPending);

            if (JSON.parse(response.getContentText()).ok !== true) {
                throw new Error(`API Error ${response.getResponseCode()}: ${response.getContentText()}`);
            }

            // Log response for debugging
            TerminalOutput.Write(activeSpreadsheet, 'Plugins.Webhook.OnDeleteWebhook', 'DEBUG', e, `deleteWebhook Response: ${response.getContentText()}`);

            const result = JSON.parse(response.getContentText()).result;

            return Plugins.Webhook.OnLoad(e);

        } catch (error) {
            // Log error for debugging
            TerminalOutput.Write(activeSpreadsheet, 'Plugins.Webhook.OnDeleteWebhook', 'ERROR', e, error.toString(), error.stack);
            return CardService.newActionResponseBuilder()
                .setNotification(CardService.newNotification().setText(`❌ Error: ${error.message}`))
                .build();
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

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
    version: '1.0.0',
    imageUrl: Plugins.DEFAULT_IMAGE_URL,
    BuildAboutCard: (data = {}) => {
        const cardBuilder = CardService.newCardBuilder()
            .setName(Plugins.ViewModel.id + '-About')
            .setHeader(CardService.newCardHeader()
                .setTitle('About ' + Plugins.ViewModel.name)
                .setSubtitle(Plugins.ViewModel.description)
                .setImageStyle(CardService.ImageStyle.SQUARE)
                .setImageUrl(Plugins.BIG_TIME_IMG_URL)
                .setImageAltText('Card Image'))
            .addSection(
                CardService.newCardSection()
                    .setHeader('App Information')
                    .addWidget(
                        CardService.newTextParagraph()
                            .setText(`Name: ${Plugins.ViewModel.name}`)
                    )
                    .addWidget(
                        CardService.newTextParagraph()
                            .setText(`Version: ${Plugins.ViewModel.version}`))
                    .addWidget(
                        CardService.newTextParagraph()
                            .setText(`Info: ${Plugins.ViewModel.description}`))
                    .addWidget(
                        CardService.newTextParagraph()
                            .setText(`Developed by Telegram Bot Studio.`)));


        // Add useful links section
        cardBuilder.addSection(
            CardService.newCardSection()
                .setHeader('🔗 Useful Links')
                .addWidget(
                    CardService.newTextButton()
                        .setText('📄 Documentation')
                        .setOpenLink(
                            CardService.newOpenLink()
                                .setUrl('https://github.com/ilanlal/telegram-bot-studio#readme')))
                .addWidget(
                    CardService.newTextButton()
                        .setText('📢 Report Issues')
                        .setOpenLink(
                            CardService.newOpenLink()
                                .setUrl('https://github.com/ilanlal/telegram-bot-studio/issues'))));

        return cardBuilder.build();
    },
    BuildHelpCard: (data = {}) => {
        const cardBuilder = CardService.newCardBuilder()
            .setName(Plugins.ViewModel.id + '-Help')
            .setHeader(CardService.newCardHeader()
                .setTitle('Help & Support')
                .setSubtitle('Everything you need to get started')
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
                    .setUrl('https://github.com/ilanlal/telegram-bot-studio#readme')))
            .addWidget(CardService.newTextButton()
                .setText('📢 Report a Bug')
                .setOpenLink(CardService.newOpenLink()
                    .setUrl('https://github.com/ilanlal/telegram-bot-studio/issues')))
            .addWidget(CardService.newTextButton()
                .setText('✉️ Contact Support')
                .setOpenLink(CardService.newOpenLink()
                    .setUrl('mailto:support@example.com'))));

        return cardBuilder.build();
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
    BuildResultSection: (result = {}) => {
        const newSection = CardService.newCardSection()
            .setHeader('✅ Execution Result')
            .setCollapsible(true)
            .setNumUncollapsibleWidgets(0);

        // Add Preview title
        newSection.addWidget(
            CardService.newTextParagraph()
                .setText('Response: [Preview]')
        );

        // Add divider
        newSection.addWidget(CardService.newDivider());

        // Add each property from result to the section as decorated text
        Object.keys(result).forEach((key) => {
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
    }
};

Plugins.HomeCard = {
    id: 'HomeCardPlugin',
    name: 'Home Card',
    short_description: 'Main Home Card',
    description: 'The main home card for the Telegram Bot Studio application.',
    version: '1.0.0',
    imageUrl: Plugins.WELCOME_IMG_URL,
    OnLoad: (e) => {
        const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        // Log the event for debugging
        TerminalOutput.Write(activeSpreadsheet,
            'Plugins.HomeCard',
            'OnLoad',
            e,
            'Loading Home Card with AppModel data.');

        // Build and return the Home Card
        const appModelData = AppModel.create()
            .toJSON();

        // Build and return the Home Card
        const homeCard = Plugins.HomeCard.HomeCard({ ...appModelData });

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
    HomeCard: (data = {}) => {
        data.txt_bot_api_token = PropertiesService.getUserProperties().getProperty('txt_bot_api_token') || '';
        data.isConnected = !!data.txt_bot_api_token;

        const cardBuilder = CardService.newCardBuilder()
            .setName(Plugins.ViewModel.id + '-Home')
            .setHeader(CardService.newCardHeader()
                .setTitle(Plugins.ViewModel.name)
                .setSubtitle('Complete Toolkit for Telegram Bot Management')
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
                        .setFunctionName('Plugins.Navigations.PushCard')
                        .setParameters({ path: 'Plugins.Settings.HomeCard' })))
                .addButton(CardService.newTextButton()
                    .setText('Help')
                    .setOnClickAction(CardService.newAction()
                        .setFunctionName('Plugins.Navigations.PushCard')
                        .setParameters({ path: 'Plugins.ViewModel.BuildHelpCard' })))
                .addButton(CardService.newTextButton()
                    .setText('About')
                    .setOnClickAction(CardService.newAction()
                        .setFunctionName('Plugins.Navigations.PushCard')
                        .setParameters({ path: 'Plugins.ViewModel.BuildAboutCard' })))
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
                    .setBackgroundColor(Plugins.secondaryColor())
                    .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
                    .setOnClickAction(CardService.newAction()
                        .setFunctionName('AppHandler.ViewModel.OpenUserProfileCard')))
            );
        }

        return cardBuilder.build();
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

        statusSection.addWidget(CardService.newDecoratedText()
            .setTopLabel('Network Status')
            .setText(isConnected ? `LIVE: ${friendlyName}` : 'OFFLINE: No Bot Linked')
            .setBottomLabel(isConnected ? `@${username}` : 'Establish a secure connection to start.')
            .setStartIcon(CardService.newIconImage().setMaterialIcon(
                CardService.newMaterialIcon()
                    .setName(isConnected ? 'sensors' : 'sensors_off')
                    .setFill(false)))
            .setButton(CardService.newTextButton()
                .setText(isConnected ? 'Unlink Bot' : 'Link Bot')
                // Use a 'FILLED' style for the primary action when disconnected
                .setTextButtonStyle(isConnected ? CardService.TextButtonStyle.TEXT : CardService.TextButtonStyle.FILLED)
                .setBackgroundColor(Plugins.secondaryColor())
                .setOnClickAction(executeAction)));

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
                        .updateCard(Plugins.HomeCard.HomeCard({ ...appModelData }))
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
                        .updateCard(Plugins.HomeCard.HomeCard({ ...appModelData }))
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
                                .setFunctionName('AppHandler.ViewModel.ToggleAction')
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
                                .setFunctionName('AppHandler.ViewModel.ToggleAction')
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
                    .updateCard(Plugins.HomeCard.HomeCard({ ...appModelData }))
            ).build();
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
                        .updateCard(Plugins.HomeCard.HomeCard({ ...appModelData }))
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
                        .updateCard(Plugins.HomeCard.HomeCard({ ...appModelData }))
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
    short_description: 'Retrieve Telegram bot information',
    description: 'The GetMe plugin allows you to retrieve information about your Telegram bot using the Bot API. Simply provide your bot token to get started.',
    version: '1.0.0',
    stars: '⭐',
    imageUrl: Plugins.I_AM_THINKING_IMG_URL,
    HomeCard: (data = {}, result = null) => {
        const input_token = data.txt_bot_api_token || null;
        const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();

        // Log the request to Terminal Output sheet
        TerminalOutput.Write(activeSpreadsheet, 'Plugins.GetMe.HomeCard', 'Start', data, `Request to get bot info with token: ${input_token}`);

        // Build the GetMe plugin card
        const cardBuilder = CardService.newCardBuilder()
            .setName(Plugins.GetMe.name)
            .setHeader(CardService.newCardHeader()
                .setTitle(Plugins.GetMe.name)
                .setSubtitle(Plugins.GetMe.short_description)
                .setImageStyle(CardService.ImageStyle.SQUARE)
                .setImageUrl(Plugins.GetMe.imageUrl)
                .setImageAltText('Card Image'));

        cardBuilder.addSection(Plugins.Connection.WelcomeSection(data));

        // If token is provided, call getMe API
        if (input_token) {
            TerminalOutput.Write(activeSpreadsheet, 'Plugins.GetMe.HomeCard', 'Submit', data, `Request to get bot info with token: ${input_token}`);

            try {
                // Call Telegram Bot API getMe method
                const telegramBotClient = new TelegramBotClient(input_token);
                const response = telegramBotClient.getMe();

                // Check for errors in response
                if (response.getResponseCode() !== 200) {
                    throw new Error(`Error fetching bot info: ${response.getResponseCode()} - ${response.getContentText()}`);
                }

                const result = JSON.parse(response.getContentText()).result;

                // Log the response to Terminal Output sheet
                TerminalOutput.Write(activeSpreadsheet, 'Plugins.GetMe.HomeCard', 'Response', result, `Retrieved bot info for token: ${input_token}`);

                cardBuilder.addSection(
                    Plugins.GetMe.buildHighlightResultSection(data, result));

                // add hidden input field to store last successful bot chat_id
                cardBuilder.addSection(
                    CardService.newCardSection()
                        .addWidget(
                            CardService.newTextInput()
                                .setVisibility(CardService.Visibility.HIDDEN)
                                .setValue(result.id.toString())
                                .setId('txt_chat_id')
                                .setFieldName('txt_chat_id')
                        )
                );

                // Add result section
                cardBuilder.addSection(
                    Plugins.ViewModel.BuildResultSection(result));
            } catch (error) {
                TerminalOutput.Write(activeSpreadsheet, 'Plugins.GetMe.HomeCard', 'ERROR', data, error.toString());
                cardBuilder.addSection(Plugins.ViewModel.BuildErrorSection(error));
            }
        }
        else {
            // Placeholder section for "Result" section when no token is provided
            cardBuilder.addSection(Plugins.ViewModel.BuildResultSectionPlaceholder());
        }

        // Help & Support text
        cardBuilder.addSection(
            CardService.newCardSection()
                .setHeader('Help & Support')
                .setCollapsible(true)
                .setNumUncollapsibleWidgets(0)

                // add description
                .addWidget(
                    CardService.newTextParagraph()
                        .setText(Plugins.GetMe.description)
                )
                // add separator
                .addWidget(CardService.newDivider())
                // Help button
                .addWidget(
                    CardService.newTextButton()
                        .setAltText('Get more help about GetMe plugin')
                        //.setBackgroundColor('#E7EA55')
                        .setTextButtonStyle(CardService.TextButtonStyle.TEXT)
                        .setText('Need Help?')
                        .setMaterialIcon(
                            CardService.newMaterialIcon()
                                .setName('help')
                                .setFill(true)
                                .setWeight(0)
                                .setGrade(0)
                        )
                        .setOnClickAction(
                            CardService.newAction()
                                .setFunctionName('Plugins.Navigations.PushCard')
                                .setParameters({ path: 'Plugins.GetMe.HelpCard' }))
                )
                // About button
                .addWidget(
                    CardService.newTextButton()
                        .setAltText('About GetMe plugin')
                        //.setBackgroundColor('#E7EA55')
                        .setTextButtonStyle(CardService.TextButtonStyle.TEXT)
                        .setText('About GetMe')
                        .setMaterialIcon(
                            CardService.newMaterialIcon()
                                .setName('developer_guide')
                                .setFill(true)
                                .setWeight(0)
                                .setGrade(0)
                        )
                        .setOnClickAction(
                            CardService.newAction()
                                .setFunctionName('Plugins.Navigations.PushCard')
                                .setParameters({ path: 'Plugins.GetMe.AboutCard' }))
                )
        );

        // Add fixed footer with Send button
        cardBuilder.setFixedFooter(
            CardService.newFixedFooter()
                // Set Send button
                .setPrimaryButton(
                    CardService.newTextButton()
                        .setAltText('Refresh Bot Info')
                        .setMaterialIcon(
                            CardService.newMaterialIcon()
                                .setName('refresh')
                                .setFill(true)
                                .setWeight(0)
                                .setGrade(200)
                        )
                        .setText('Refresh')
                        .setOnClickAction(
                            CardService.newAction()
                                // List of widget IDs whose values are required for this action to be executed
                                .addRequiredWidget(['txt_bot_api_token'])
                                .setParameters({ refresh: 'true' })
                                .setFunctionName('Plugins.GetMe.OnLoad'))
                )
                // Set secondary Get Chat button
                .setSecondaryButton(
                    CardService.newTextButton()
                        .setAltText('Get Chat Info')
                        .setDisabled(!!!input_token)
                        .setMaterialIcon(
                            CardService.newMaterialIcon()
                                .setName('chat')
                                .setFill(true)
                                .setWeight(300)
                                .setGrade(0)
                        )
                        .setText('Get Chat')
                        .setOnClickAction(
                            CardService.newAction()
                                .setFunctionName('Plugins.GetChat.OnLoad'))
                )
        );

        return cardBuilder.build();
    },
    AboutCard: (data = {}) => {
        const cardBuilder = CardService.newCardBuilder()
            .setName('About ' + Plugins.GetMe.name)
            .setHeader(CardService.newCardHeader()
                .setTitle('About ' + Plugins.GetMe.name)
                .setSubtitle(Plugins.GetMe.short_description)
                .setImageStyle(CardService.ImageStyle.SQUARE)
                .setImageUrl(Plugins.GetMe.imageUrl)
                .setImageAltText('Card Image'))
            .addSection(CardService.newCardSection()
                .setHeader('About')
                .setCollapsible(false)
                .setNumUncollapsibleWidgets(0)
                // Add about wellcome text
                .addWidget(
                    CardService.newTextParagraph()
                        .setText('Welcome to the GetMe plugin! This plugin allows you to retrieve information about your Telegram bot using the Bot API. Simply enter your bot token and click "Get Bot Info" to see details about your bot, including its username, first name, and more.'))
                // Add about details text
                .addWidget(
                    CardService.newTextParagraph()
                        .setText(Plugins.GetMe.description)))
            // Add plugin info section
            .addSection(CardService.newCardSection()
                .setHeader('Plugin Info')
                .setCollapsible(false)
                .setNumUncollapsibleWidgets(0)
                // Add plugin details
                .addWidget(
                    // About plugin details in Grid format
                    CardService.newGrid()
                        .setNumColumns(2)
                        .addItem(
                            CardService.newGridItem()
                                .setTitle('Plugin Name')
                                .setSubtitle(Plugins.GetMe.name))
                        .addItem(
                            CardService.newGridItem()
                                .setTitle('Description')
                                .setSubtitle(Plugins.GetMe.short_description))
                        .addItem(
                            CardService.newGridItem()
                                .setTitle('Version')
                                .setSubtitle(Plugins.GetMe.version))
                        .addItem(
                            CardService.newGridItem()
                                .setTitle('Rating')
                                .setSubtitle(Plugins.GetMe.stars))
                )
            );

        return cardBuilder.build();
    },
    HelpCard: (data = {}) => {
        const cardBuilder = CardService.newCardBuilder()
            .setName('Help - ' + Plugins.GetMe.name)
            .setHeader(CardService.newCardHeader()
                .setTitle('Help about ' + Plugins.GetMe.name)
                .setSubtitle(Plugins.GetMe.short_description)
                .setImageStyle(CardService.ImageStyle.SQUARE)
                .setImageUrl(Plugins.GetMe.imageUrl)
                .setImageAltText('Help Image'))
            .addSection(CardService.newCardSection()
                .addWidget(
                    CardService.newTextParagraph()
                        .setText(Plugins.GetMe.description + '\n\nFor further assistance, please refer to the links below.')));

        // Add useful links section
        cardBuilder.addSection(
            CardService.newCardSection()
                .setHeader('🔗 Useful Links')
                .addWidget(
                    CardService.newTextButton()
                        .setText('📄 Documentation')
                        .setOpenLink(
                            CardService.newOpenLink()
                                .setUrl('https://github.com/ilanlal/telegram-bot-studio#readme')))
                .addWidget(
                    CardService.newTextButton()
                        .setText('📢 Report Issues')
                        .setOpenLink(
                            CardService.newOpenLink()
                                .setUrl('https://github.com/ilanlal/telegram-bot-studio/issues'))));


        return cardBuilder.build();
    },
    buildHighlightResultSection: (data = {}, result) => {
        const newSection = CardService.newCardSection()
            .setHeader('🔎 Bot Information')
            .setCollapsible(true)
            .setNumUncollapsibleWidgets(5);
        // add divider
        newSection.addWidget(CardService.newDivider());

        // Add API Token info
        newSection.addWidget(
            CardService.newDecoratedText()
                .setStartIcon(
                    CardService.newIconImage()
                        .setMaterialIcon(
                            CardService.newMaterialIcon().setName('vpn_key'))

                )
                .setTopLabel('API Token')
                .setText(data.txt_bot_api_token)
                .setWrapText(true)
        );

        // add username open link button
        newSection.addWidget(
            CardService.newDecoratedText()
                .setStartIcon(
                    CardService.newIconImage()
                        .setMaterialIcon(
                            CardService.newMaterialIcon().setName('alternate_email')))
                .setTopLabel('Username')
                .setText(`t.me/${result.username}`)
                .setWrapText(false)
                .setButton(
                    CardService.newTextButton()
                        .setAltText(`Open @${result.username} on Telegram`)
                        .setMaterialIcon(
                            CardService.newMaterialIcon()
                                .setName('open_in_new')
                                .setFill(true)
                                .setWeight(500)
                                .setGrade(0)
                        )
                        //.setTextButtonStyle(CardService.TextButtonStyle.TEXT)
                        .setOpenLink(
                            CardService.newOpenLink()
                                .setUrl(`https://t.me/${result.username}`)
                        )
                )
        );

        // Add first name info
        newSection.addWidget(
            CardService.newDecoratedText()
                .setStartIcon(
                    CardService.newIconImage()
                        .setMaterialIcon(
                            CardService.newMaterialIcon().setName('badge')))
                .setTopLabel('Name')
                .setText(result.first_name || 'N/A')
                .setWrapText(true)
        );

        // add id info
        newSection.addWidget(
            CardService.newDecoratedText()
                .setStartIcon(
                    CardService.newIconImage()
                        .setMaterialIcon(
                            CardService.newMaterialIcon().setName('fingerprint')))
                .setTopLabel('Bot ID')
                .setText(result.id ? result.id.toString() : 'N/A')
                .setWrapText(true)
        );

        const grid = CardService.newGrid()
            .setTitle('More Bot Capabilities')
            .setNumColumns(2);

        // add can_join_groups info
        grid.addItem(
            CardService.newGridItem()
                .setTitle(result.can_join_groups ? '🟢 Yes' : '🔴 No')
                .setSubtitle('Can Join Groups?')
        );

        // add is_bot info
        grid.addItem(
            CardService.newGridItem()
                .setTitle(result.is_bot ? '🟢 Yes' : '🔴 No')
                .setSubtitle('Is Bot?')
        );

        // add supports_inline_queries info
        grid.addItem(
            CardService.newGridItem()
                .setTitle(result.supports_inline_queries ? '🟢 Yes' : '🔴 No')
                .setSubtitle('Supports Inline Queries?')
                .setLayout(CardService.GridItemLayout.TEXT_BELOW)
                .setTextAlignment(CardService.HorizontalAlignment.START)
        );

        // add can_connect_to_business
        grid.addItem(
            CardService.newGridItem()
                .setTitle(result.can_connect_to_business ? '🟢 Yes' : '🔴 No')
                .setSubtitle('Can Connect to Business?')
                .setLayout(CardService.GridItemLayout.TEXT_ABOVE)
                .setTextAlignment(CardService.HorizontalAlignment.START)
        );

        // has_main_web_app
        grid.addItem(
            CardService.newGridItem()
                .setTitle(result.has_main_web_app ? '🟢 Yes' : '🔴 No')
                .setSubtitle('Has Main Web App?')
                .setLayout(CardService.GridItemLayout.TEXT_ABOVE)
                .setTextAlignment(CardService.HorizontalAlignment.START)
        );

        newSection.addWidget(grid);

        return newSection;
    },
    OnLoad: (e) => {
        const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        try {
            // Log the submit action to Terminal Output sheet
            TerminalOutput.Write(activeSpreadsheet, 'Plugins.GetMe.OnLoad', 'Start', e, 'User submitted GetMe request');

            // extract bot api token from form inputs
            const input_token = Plugins.getFormInputsStringValue(e, 'txt_bot_api_token', null);

            // Call Telegram Bot API getMe method
            const telegramBotClient = new TelegramBotClient(input_token);
            const response = telegramBotClient.getMe();

            // Log the response to Terminal Output sheet
            TerminalOutput.Write(activeSpreadsheet, 'Plugins.GetMe.OnLoad', 'Response', response, `Received response for GetMe with token: ..${input_token.slice(-4)}`);

            // Check for errors in response
            if (response.getResponseCode() !== 200) {
                throw new Error(`Error fetching bot info: ${response.getResponseCode()} - ${response.getContentText()}`);
            }
            const result = JSON.parse(response.getContentText()).result;
            // Build the home card with result
            const homeCard = Plugins.GetMe.HomeCard(
                {
                    txt_bot_api_token: input_token
                }, result);

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
        } catch (error) {
            // Log the error to Terminal Output sheet
            TerminalOutput.Write(activeSpreadsheet, 'Plugins.GetMe.OnLoad', 'ERROR', e, error.toString());
            // Show an error message to the user
            return CardService.newActionResponseBuilder()
                .setNotification(
                    CardService.newNotification()
                        .setText(
                            error.toString()))
                .build();
        }
    }
};

Plugins.GetChat = {
    id: 'GetChatPlugin',
    name: 'Get Chat',
    short_description: 'Retrieve Telegram chat information',
    description: 'The Get Chat plugin allows you to retrieve information about a Telegram chat (channel, group, or user) using the Bot API. Provide your bot token and the chat ID to get started.',
    version: '1.0.0',
    stars: '⭐',
    imageUrl: Plugins.PEACH_IMG_URL,
    HomeCard: (data = {}, result) => {
        const input_token = data.txt_bot_api_token || '';
        const chatId = data.txt_chat_id || '';
        const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        // Log the request to Terminal Output sheet
        TerminalOutput.Write(activeSpreadsheet, 'Plugins.GetChat.HomeCard', 'Start', data, `Request to get chat info with token: ..${input_token.slice(-4)}, chat ID: ${chatId}`);
        // Build the GetChat plugin card
        const cardBuilder = CardService.newCardBuilder()
            .setName(Plugins.GetChat.id + '-HomeCard')
            .setHeader(CardService.newCardHeader()
                .setTitle(Plugins.GetChat.name)
                .setSubtitle(Plugins.GetChat.short_description)
                .setImageStyle(CardService.ImageStyle.SQUARE)
                .setImageUrl(Plugins.GetChat.imageUrl)
                .setImageAltText('Card Image'));

        cardBuilder.addSection(Plugins.Connection.WelcomeSection(data));

        // Add section for inputs (chat id)
        const topSection = CardService.newCardSection()
            .setCollapsible(false)
            .setNumUncollapsibleWidgets(3)
            // add divider
            .addWidget(CardService.newDivider())
            // Chat ID input
            .addWidget(
                CardService.newTextInput()
                    .setValue(chatId || '')
                    .setId('txt_chat_id')
                    .setFieldName('txt_chat_id')
                    .setTitle('🆔 Chat ID')
                    .setHint('Enter the Chat ID to get information'));

        cardBuilder.addSection(topSection);

        // Add result section if token is provided
        if (result) {
            // Add highlight section
            cardBuilder.addSection(
                Plugins.GetChat.buildHighlightResultSection(data, result));
            // Add result section
            cardBuilder.addSection(
                Plugins.ViewModel.BuildResultSection(result));
        }
        else {
            // Placeholder section for "Result" section when no token/chat ID is provided
            cardBuilder.addSection(Plugins.ViewModel.BuildResultSectionPlaceholder());
        }

        // Help & Support text
        cardBuilder.addSection(
            Plugins.GetChat.buildQuickHelpSection());

        // Add fixed footer with Get Chat Info button;
        cardBuilder.setFixedFooter(
            CardService.newFixedFooter()
                .setPrimaryButton(
                    CardService.newTextButton()
                        .setText('Send Request')
                        .setAltText('Send Request to get chat info')
                        .setMaterialIcon(
                            CardService.newMaterialIcon()
                                .setName('send')
                                .setFill(false)
                                .setWeight(300)
                                .setGrade(0)
                        )
                        .setOnClickAction(
                            CardService.newAction()
                                .addRequiredWidget(['txt_bot_api_token'])
                                .addRequiredWidget(['txt_chat_id'])
                                .setParameters({ "refresh": "true" })
                                .setFunctionName('Plugins.GetChat.OnLoad'))
                ));

        return cardBuilder.build();
    },
    AboutCard: (data = {}) => {
        const cardBuilder = CardService.newCardBuilder()
            .setName('About ' + Plugins.GetChat.name)
            .setHeader(CardService.newCardHeader()
                .setTitle('About ' + Plugins.GetChat.name)
                .setSubtitle(Plugins.GetChat.short_description)
                .setImageStyle(CardService.ImageStyle.SQUARE)
                .setImageUrl(Plugins.GetChat.imageUrl)
            );
        cardBuilder.addSection(CardService.newCardSection()
            .setHeader('About')
            .setCollapsible(false)
            .setNumUncollapsibleWidgets(0)
            // Add about wellcome text
            .addWidget(
                CardService.newTextParagraph()
                    .setText('Welcome to the Get Chat plugin! This plugin allows you to retrieve information about a Telegram chat (channel, group, or user) using the Bot API. Simply enter your bot token and the chat ID to see details about the chat, including its title, type, and more.'))
            // Add about details text
            .addWidget(
                CardService.newTextParagraph()
                    .setText(Plugins.GetChat.description)))
            // Add plugin info section
            .addSection(CardService.newCardSection()
                .setHeader('Plugin Info')
                .setCollapsible(false)
                .setNumUncollapsibleWidgets(0)
                // Add plugin details
                .addWidget(
                    // About plugin details in Grid format
                    CardService.newGrid()
                        .setNumColumns(2)
                        .addItem(
                            CardService.newGridItem()
                                .setTitle('Plugin Name')
                                .setSubtitle(Plugins.GetChat.name))
                        .addItem(
                            CardService.newGridItem()
                                .setTitle('Description')
                                .setSubtitle(Plugins.GetChat.short_description))
                        .addItem(
                            CardService.newGridItem()
                                .setTitle('Version')
                                .setSubtitle(Plugins.GetChat.version))
                        .addItem(
                            CardService.newGridItem()
                                .setTitle('Rating')
                                .setSubtitle(Plugins.GetChat.stars))
                )
            );


        return cardBuilder.build();
    },
    HelpCard: (data = {}) => {
        const cardBuilder = CardService.newCardBuilder()
            .setName('Help - ' + Plugins.GetChat.name)
            .setHeader(
                CardService.newCardHeader()
                    .setTitle('Help - ' + Plugins.GetChat.name));
        // Add Help decorated header widget
        cardBuilder.addSection(CardService.newCardSection()
            .addWidget(
                CardService.newDecoratedText()
                    .setTopLabel('Need Help?')
                    .setText(`The ${Plugins.GetChat.name} plugin allows you to retrieve information about a Telegram chat (channel, group, or user) using the Bot API. Provide your bot token and the chat ID to get started.`)
            ));

        cardBuilder.addSection(CardService.newCardSection()
            .addWidget(
                CardService.newTextParagraph()
                    .setText(Plugins.GetChat.description)));

        return cardBuilder.build();
    },
    buildQuickHelpSection: () => {
        return CardService.newCardSection()
            .setHeader('Help & Support')
            .setCollapsible(true)
            .setNumUncollapsibleWidgets(0)
            // More info text
            .addWidget(
                CardService.newTextParagraph()
                    .setText(Plugins.GetChat.description)
            )
            // add separator
            .addWidget(CardService.newDivider())
            // add example chat IDs
            .addWidget(
                CardService.newTextParagraph()
                    .setText('Example Chat IDs:\n- For a user: `@username` or user ID like `123456789`\n- For a group: `-1001234567890`\n- For a channel: `-1001234567890`')
            )
            .addWidget(
                CardService.newTextParagraph()
                    .setText('Example try to use 93372553 (@BotFather Telegram\'s official account) as Chat ID to see the result.')
            )
            // add separator
            .addWidget(CardService.newDivider())
            // Help button
            .addWidget(
                CardService.newTextButton()
                    .setAltText('Get more help about Get Chat plugin')
                    //.setBackgroundColor('#E7EA55')
                    .setTextButtonStyle(CardService.TextButtonStyle.TEXT)
                    .setText('Need Help?')
                    .setMaterialIcon(
                        CardService.newMaterialIcon()
                            .setName('help')
                            .setFill(true)
                            .setWeight(0)
                            .setGrade(0)
                    )
                    .setOnClickAction(
                        CardService.newAction()
                            .setFunctionName('Plugins.Navigations.PushCard')
                            .setParameters({ path: 'Plugins.GetChat.HelpCard' }))
            )
            // About button
            .addWidget(
                CardService.newTextButton()
                    .setAltText('About ' + Plugins.GetChat.name + ' plugin')
                    //.setBackgroundColor('#E7EA55')
                    .setTextButtonStyle(CardService.TextButtonStyle.TEXT)
                    .setText('About ' + Plugins.GetChat.name)
                    .setMaterialIcon(
                        CardService.newMaterialIcon()
                            .setName('developer_guide')
                            .setFill(true)
                            .setWeight(0)
                            .setGrade(0)
                    )
                    .setOnClickAction(
                        CardService.newAction()
                            .setFunctionName('Plugins.Navigations.PushCard')
                            .setParameters({ path: 'Plugins.GetChat.AboutCard' }))
            );
    },
    buildHighlightResultSection: (data = {}, result) => {
        const newSection = CardService.newCardSection()
            .setHeader('🔎 Chat Information')
            .setCollapsible(true)
            .setNumUncollapsibleWidgets(4);

        // add divider
        newSection.addWidget(CardService.newDivider());
        // add username and link info
        if (result.username) {
            const usernameLink = `https://t.me/${result.username}`;
            newSection.addWidget(
                CardService.newDecoratedText()
                    .setStartIcon(
                        CardService.newIconImage()
                            .setMaterialIcon(
                                CardService.newMaterialIcon().setName('alternate_email')))
                    .setTopLabel('Username')
                    .setText('@' + result.username)
                    .setWrapText(true)
                    .setButton(
                        CardService.newTextButton()
                            .setTextButtonStyle(CardService.TextButtonStyle.TEXT)
                            .setText(`t.me/${result.username}`)
                            .setOpenLink(
                                CardService.newOpenLink()
                                    .setUrl(usernameLink)
                            )
                    )
            );
        }
        // Add title info
        if (result.title) {
            newSection.addWidget(
                CardService.newDecoratedText()
                    .setStartIcon(
                        CardService.newIconImage()
                            .setMaterialIcon(
                                CardService.newMaterialIcon().setName('chat')))
                    .setTopLabel('💬 Chat Title')
            );
        }
        // add first_name and last_name info
        else if (result.first_name) {
            newSection.addWidget(
                CardService.newDecoratedText()
                    .setStartIcon(
                        CardService.newIconImage()
                            .setMaterialIcon(
                                CardService.newMaterialIcon().setName('person')))
                    .setTopLabel('First Name')
                    .setText(result.first_name)
                    .setWrapText(true)
            );
            // add last_name info
            if (result.last_name) {
                newSection.addWidget(
                    CardService.newDecoratedText()
                        .setStartIcon(
                            CardService.newIconImage()
                                .setMaterialIcon(
                                    CardService.newMaterialIcon().setName('person')))
                        .setTopLabel('Last Name')
                        .setText(result.last_name)
                        .setWrapText(true)
                );
            }
        }

        // add chat ID info
        newSection.addWidget(
            CardService.newDecoratedText()
                .setStartIcon(
                    CardService.newIconImage()
                        .setMaterialIcon(
                            CardService.newMaterialIcon().setName('fingerprint')))
                .setTopLabel('Chat ID')
                .setText(result.id ? result.id.toString() : 'N/A')
                .setWrapText(true)
        );

        const grid = CardService.newGrid()
            .setTitle('More Chat Details')
            .setNumColumns(2);

        // add type info
        grid.addItem(
            CardService.newGridItem()
                .setTitle(result.type || 'N/A')
                .setSubtitle('Type:')
        );

        // Add id can_send_gift
        grid.addItem(
            CardService.newGridItem()
                .setTitle(result.can_send_gift ? '🟢 Yes' : '🔴 No')
                .setSubtitle('Can send gifts ?')
        );

        // add has_private_forwards
        if (result.has_private_forwards !== undefined) {
            grid.addItem(
                CardService.newGridItem()
                    .setTitle(result.has_private_forwards ? '🟢 Yes' : '🔴 No')
                    .setSubtitle('Has private forwards ?')
            );
        }

        // add max_reaction_count
        if (result.max_reaction_count !== undefined) {
            grid.addItem(
                CardService.newGridItem()
                    .setTitle(result.max_reaction_count ? result.max_reaction_count.toString() : 'N/A')
                    .setSubtitle('Maximum allowed reaction count')
            );
        }

        newSection.addWidget(grid);

        return newSection;
    },
    OnLoad: (e) => {
        const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        try {
            // Log the submit action to Terminal Output sheet
            TerminalOutput.Write(activeSpreadsheet,
                'Plugins.GetChat.OnLoad',
                'Start',
                e,
                'User submitted Get Chat request');

            const input_token = Plugins.getFormInputsStringValue(e, 'txt_bot_api_token', '')
                .trim();
            if (input_token === '') {
                throw new Error('Bot API Token is required.');
            }
            const chatId = Plugins.getFormInputsStringValue(e, 'txt_chat_id', '')
                .trim();

            let result = null;
            if (chatId !== '') {
                // Log the request to Terminal Output sheet
                TerminalOutput.Write(activeSpreadsheet,
                    'Plugins.GetChat.OnLoad',
                    'Request',
                    e,
                    `Requesting chat info with token: ..${input_token.slice(-4)} and chat ID: ${chatId}`);
                // Call Telegram Bot API getChat method
                const telegramBotClient = new TelegramBotClient(input_token);
                const response = telegramBotClient.getChat(encodeURIComponent(chatId));

                // Log the response to Terminal Output sheet
                TerminalOutput.Write(activeSpreadsheet,
                    'Plugins.GetChat.OnLoad',
                    'Response',
                    response,
                    `Received response for GetChat with token: ..${input_token.slice(-4)} and chat ID: ${chatId}`);

                // Check for errors in response
                if (JSON.parse(response.getContentText()).ok !== true) {
                    throw new Error(`Failed to get chat info: ${response.getContentText()}`);
                }

                // Parse result
                result = JSON.parse(response.getContentText()).result;
            }

            // Build the home card with result
            const homeCard = Plugins.GetChat.HomeCard(
                data = {
                    txt_bot_api_token: input_token,
                    txt_chat_id: chatId,
                },
                result);

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
        } catch (error) {
            // Log the error to Terminal Output sheet
            TerminalOutput.Write(activeSpreadsheet,
                'Plugins.GetChat.OnGetChatSubmit',
                'ERROR',
                e,
                error.toString());
            // Show an error message to the user
            return CardService.newActionResponseBuilder()
                .setNotification(
                    CardService.newNotification()
                        .setText(
                            error.toString()))
                .build();
        }
    }
};

Plugins.Webhook = {
    id: 'WebhookPlugin',
    name: 'Webhook',
    short_description: 'Manage Telegram bot webhooks',
    description: 'The Webhook plugin allows you to set, get, and delete webhooks for your Telegram bot using the Bot API. Manage your bot\'s webhook settings easily by providing your bot token and the desired webhook URL.',
    version: '1.0.0',
    stars: '⭐✨',
    imageUrl: Plugins.BIG_TIME_IMG_URL,
    HomeCard: (data = {}, result = null) => {
        const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();

        const newFixedFooter = CardService.newFixedFooter()
            // set search as default primary button
            .setPrimaryButton(
                CardService.newTextButton()
                    .setAltText('Refresh Webhook Status')
                    .setMaterialIcon(
                        CardService.newMaterialIcon()
                            .setName('refresh')
                            .setFill(false)
                    )
                    .setText('Refresh')
                    .setOnClickAction(
                        CardService.newAction()
                            .addRequiredWidget(['txt_bot_api_token'])
                            .setParameters({ refresh: 'true' })
                            .setFunctionName('Plugins.Webhook.OnLoad'))
            );
        // Build the getWebhookInfo plugin card
        const cardBuilder = CardService.newCardBuilder()
            .setName(Plugins.Webhook.name)
            .setHeader(CardService.newCardHeader()
                .setTitle(Plugins.Webhook.name)
                .setSubtitle(Plugins.Webhook.short_description)
                .setImageStyle(CardService.ImageStyle.SQUARE)
                .setImageUrl(Plugins.Webhook.imageUrl)
                .setImageAltText('Card Image'));

        // Top section
        cardBuilder.addSection(Plugins.Connection.WelcomeSection(data));

        // If result is available
        if (result) {
            // Add webhook state section
            cardBuilder.addSection(
                Plugins.Webhook.buildWebhookSection(data, result));

            // when webhook is set
            if (result.url !== '') {
                // Add result section
                cardBuilder.addSection(
                    Plugins.ViewModel.BuildResultSection(result))
            }
            else { // when webhook is not set
                // Add input parameter section
                cardBuilder.addSection(Plugins.Webhook.buildInputSection(data));

                // Set webhook button in footer
                newFixedFooter.setPrimaryButton(
                    CardService.newTextButton()
                        .setAltText('Set Webhook for the bot')
                        .setMaterialIcon(
                            CardService.newMaterialIcon()
                                .setName('webhook')
                                .setFill(true)
                                .setWeight(0)
                                .setGrade(200)
                        )
                        .setText('Set Webhook')
                        .setOnClickAction(
                            CardService.newAction()
                                // List of widget IDs whose values are required for this action to be executed
                                .addRequiredWidget(['txt_bot_api_token'])
                                .addRequiredWidget(['txt_webhook_url'])
                                .setFunctionName('Plugins.Webhook.OnSetWebhook'))
                );
            }
        }


        // Add result section if available
        // Add quick help section
        cardBuilder.addSection(Plugins.Webhook.buildQuickHelpSection());

        // Add fixed footer with About and Help buttons
        cardBuilder.setFixedFooter(newFixedFooter);

        return cardBuilder.build();
    },
    AboutCard: (data = {}) => {
        const cardBuilder = CardService.newCardBuilder()
            .setName('About ' + Plugins.Webhook.name)
            .setHeader(CardService.newCardHeader()
                .setTitle('About ' + Plugins.Webhook.name)
                .setSubtitle(Plugins.Webhook.short_description)
                .setImageStyle(CardService.ImageStyle.SQUARE)
                .setImageUrl(Plugins.Webhook.imageUrl)
                .setImageAltText('Card Image'))
            .addSection(CardService.newCardSection()
                .setHeader('About')
                .setCollapsible(false)
                .setNumUncollapsibleWidgets(0)
                // Add about wellcome text
                .addWidget(
                    CardService.newTextParagraph()
                        .setText('Welcome to the GetMe plugin! This plugin allows you to retrieve information about your Telegram bot using the Bot API. Simply enter your bot token and click "Get Bot Info" to see details about your bot, including its username, first name, and more.'))
                // Add about details text
                .addWidget(
                    CardService.newTextParagraph()
                        .setText(Plugins.Webhook.description)))
            // Add plugin info section
            .addSection(CardService.newCardSection()
                .setHeader('Plugin Info')
                .setCollapsible(false)
                .setNumUncollapsibleWidgets(0)
                // Add plugin details
                .addWidget(
                    // About plugin details in Grid format
                    CardService.newGrid()
                        .setNumColumns(2)
                        .addItem(
                            CardService.newGridItem()
                                .setTitle('Plugin Name')
                                .setSubtitle(Plugins.Webhook.name))
                        .addItem(
                            CardService.newGridItem()
                                .setTitle('Description')
                                .setSubtitle(Plugins.Webhook.short_description))
                        .addItem(
                            CardService.newGridItem()
                                .setTitle('Version')
                                .setSubtitle(Plugins.Webhook.version))
                        .addItem(
                            CardService.newGridItem()
                                .setTitle('Rating')
                                .setSubtitle(Plugins.Webhook.stars))
                )
            );

        return cardBuilder.build();
    },
    HelpCard: (data = {}) => {
        const cardBuilder = CardService.newCardBuilder()
            .setName('Help - ' + Plugins.Webhook.name)
            .setHeader(CardService.newCardHeader()
                .setTitle('Help about ' + Plugins.Webhook.name)
                .setSubtitle(Plugins.Webhook.short_description)
                .setImageStyle(CardService.ImageStyle.SQUARE)
                .setImageUrl(Plugins.Webhook.imageUrl)
                .setImageAltText('Help Image'))
            .addSection(CardService.newCardSection()
                .addWidget(
                    CardService.newTextParagraph()
                        .setText(Plugins.Webhook.description + '\n\nFor further assistance, please refer to the links below.')));

        // Add useful links section
        cardBuilder.addSection(
            CardService.newCardSection()
                .setHeader('🔗 Useful Links')
                .addWidget(
                    CardService.newTextButton()
                        .setText('📄 Documentation')
                        .setOpenLink(
                            CardService.newOpenLink()
                                .setUrl('https://github.com/ilanlal/telegram-bot-studio#readme')))
                .addWidget(
                    CardService.newTextButton()
                        .setText('📢 Report Issues')
                        .setOpenLink(
                            CardService.newOpenLink()
                                .setUrl('https://github.com/ilanlal/telegram-bot-studio/issues'))));

        return cardBuilder.build();
    },
    buildWebhookWidget: (result) => {
        if (result?.url === '') {
            return CardService.newDecoratedText()
                .setStartIcon(
                    CardService.newIconImage().setMaterialIcon(
                        CardService.newMaterialIcon().setName('webhook')))
                .setTopLabel('🔘 Webhook Inactive')
                .setText('Inactive Webhook URL')
                .setBottomLabel('Set a webhook URL to start receiving updates.')
                .setWrapText(true);
        }

        return CardService.newDecoratedText()
            .setStartIcon(
                CardService.newIconImage().setMaterialIcon(
                    CardService.newMaterialIcon().setName('webhook')))
            .setTopLabel(`🟢 Webhook Active`)
            .setText('URL:')
            .setBottomLabel(`${result.url.slice(0, 20)}...${result.url.slice(-16)}`)
            .setWrapText(true);
    },
    buildWebhookSection: (data, result) => {
        const section = CardService.newCardSection()
            .addWidget(
                Plugins.Webhook.buildWebhookWidget(result));

        // If there is a last error, show it
        if (result.last_error_date) {
            // add warning for pending updates
            section
                // add divider
                .addWidget(CardService.newDivider()
                )
                // add last error info
                .addWidget(
                    CardService.newDecoratedText()
                        .setStartIcon(
                            CardService.newIconImage().setMaterialIcon(
                                CardService.newMaterialIcon().setName('error')))
                        .setTopLabel(`⚠️ Warning: pending updates: ${result.pending_update_count}`)
                        .setText(result.last_error_date ? new Date(result.last_error_date * 1000).toLocaleString() : 'N/A')
                        .setBottomLabel(result.last_error_message || 'N/A')
                        .setWrapText(false)
                );
        }

        // if webhook is set, add delete webhook button
        if (result.url !== '') {
            // Add delete webhook button
            section
                // add divider
                .addWidget(
                    CardService.newDivider()
                )
                //  drop_pending_updates_switch switch input
                .addWidget(
                    CardService.newDecoratedText()
                        .setText('Drop Pending Updates?')
                        .setBottomLabel('Check to drop all pending updates')
                        .setWrapText(true)
                        .setSwitchControl(
                            CardService.newSwitch()
                                .setFieldName('drop_pending_updates_switch')
                                .setSelected(data.drop_pending_updates_switch === 'ON')
                                .setValue('ON')
                                .setControlType(CardService.SwitchControlType.CHECK_BOX)
                        )
                )
                // add delete webhook button
                .addWidget(
                    CardService.newTextButton()
                        //.setBackgroundColor('#8a46d8')
                        //.setTextButtonStyle(CardService.TextButtonStyle.TEXT)
                        .setAltText('Delete the current webhook')
                        .setMaterialIcon(
                            CardService.newMaterialIcon()
                                .setName('delete')
                                .setFill(false)
                                .setWeight(300)
                                .setGrade(0)
                        )
                        .setText('Delete Webhook')
                        .setOnClickAction(
                            CardService.newAction()
                                // List of widget IDs whose values are required for this action to be executed
                                .addRequiredWidget(['txt_bot_api_token'])
                                .setFunctionName('Plugins.Webhook.OnDeleteWebhook')
                        )
                );
        }

        return section;
    },
    buildInputSection: (data = {}) => {
        return CardService.newCardSection()
            .setCollapsible(true)
            .setNumUncollapsibleWidgets(2)
            // Add Bot Token input as default input
            // txt_webhook_url input
            .addWidget(
                CardService.newTextInput()
                    //.setVisibility((result.url !== '') ? CardService.Visibility.HIDDEN : CardService.Visibility.VISIBLE)
                    .setValue(data.txt_webhook_url || '')
                    .setId('txt_webhook_url')
                    .setFieldName('txt_webhook_url')
                    .setTitle('🌐 Webhook URL')
                    .setHint('Enter the HTTPS URL to send updates to. Use an IP address if you don\'t have a domain.')
            )
            //  drop_pending_updates_switch switch input
            .addWidget(
                CardService.newDecoratedText()
                    .setText('Drop Pending Updates?')
                    .setBottomLabel('Check to drop all pending updates')
                    .setWrapText(true)
                    .setSwitchControl(
                        CardService.newSwitch()
                            .setFieldName('drop_pending_updates_switch')
                            .setSelected(data.drop_pending_updates_switch === 'ON')
                            .setValue('ON')
                            .setControlType(CardService.SwitchControlType.CHECK_BOX)
                    )
            )
            // txt_secret_token input
            .addWidget(
                CardService.newTextInput()
                    .setValue(data.txt_secret_token || '')
                    .setId('txt_secret_token')
                    .setFieldName('txt_secret_token')
                    .setTitle('🔒 Secret Token (optional)')
                    .setHint('A secret token to be sent in a header “X-Telegram-Bot-Api-Secret-Token” in every webhook request, 1-256 characters. Only characters A-Z, a-z, 0-9, _ and - are allowed.')
                    .setValidation(
                        CardService.newValidation()
                            .setCharacterLimit('256')
                            .setInputType(
                                CardService.InputType.TEXT))
            )
            // txt_ip_address
            .addWidget(
                CardService.newTextInput()
                    .setValue(data.txt_ip_address || '')
                    .setId('txt_ip_address')
                    .setFieldName('txt_ip_address')
                    .setTitle('💻 IP Address (optional)')
                    .setHint('Enter the The fixed IP address which will be used to send webhook requests instead of the IP address resolved through DNS')
            )
            // txt_max_connections input
            .addWidget(
                CardService.newTextInput()
                    .setValue('40')
                    .setId('txt_max_connections')
                    .setFieldName('txt_max_connections')
                    .setTitle('🔢 Max Connections (optional)')
                    .setHint('Enter the The maximum allowed number of simultaneous HTTPS connections to the webhook for update delivery, 1-100. Defaults to 40.')
                    .setValidation(
                        CardService.newValidation()
                            .setInputType(
                                CardService.InputType.INTEGER))
            )
            // allowed_updates multi select input
            //.addWidget(
            //Plugins.ViewModel.BuildAllowedUpdatesMultiSelectWidget(data.allowed_updates_multiselect || [])
            //)
            ;
    },
    buildQuickHelpSection: () => {
        return CardService.newCardSection()
            .setHeader('🔹 Quick Help:')
            .setCollapsible(true)
            .setNumUncollapsibleWidgets(0)
            // Help & Support text
            .addWidget(
                CardService.newTextParagraph()
                    .setText(Plugins.Webhook.description)
            )
            // add separator
            .addWidget(CardService.newDivider())
            // Help button
            .addWidget(
                CardService.newTextButton()
                    .setAltText('Get more help about Webhook plugin')
                    //.setBackgroundColor('#E7EA55')
                    .setTextButtonStyle(CardService.TextButtonStyle.TEXT)
                    .setText('Need Help?')
                    .setMaterialIcon(
                        CardService.newMaterialIcon()
                            .setName('help')
                            .setFill(false)
                            .setWeight(300)
                            .setGrade(0)
                    )
                    .setOnClickAction(
                        CardService.newAction()
                            .setFunctionName('Plugins.Navigations.PushCard')
                            .setParameters({ path: 'Plugins.Webhook.HelpCard' }))
            )
            // About button
            .addWidget(
                CardService.newTextButton()
                    .setAltText('About Webhook plugin')
                    //.setBackgroundColor('#E7EA55')
                    .setTextButtonStyle(CardService.TextButtonStyle.TEXT)
                    .setText('About Webhook')
                    .setMaterialIcon(
                        CardService.newMaterialIcon()
                            .setName('developer_guide')
                            .setFill(false)
                            .setWeight(300)
                            .setGrade(0)
                    )
                    .setOnClickAction(
                        CardService.newAction()
                            .setFunctionName('Plugins.Navigations.PushCard')
                            .setParameters({ path: 'Plugins.Webhook.AboutCard' }))
            )
    },
    OnLoad(e) {
        const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        try {
            // Log the fetch action to Terminal Output sheet
            TerminalOutput.Write(activeSpreadsheet, 'Plugins.Webhook.OnLoad',
                'Start', e, 'User requested to fetch webhook info');

            const input_token = Plugins.getFormInputsStringValue(e, 'txt_bot_api_token', '')
                .trim();

            if (input_token === '') {
                throw new Error('Bot API Token is required to fetch webhook info.');
            }

            // Call Telegram Bot API getMe method
            const telegramBotClient = new TelegramBotClient(input_token);
            const httpResponse = telegramBotClient.getWebhookInfo();
            const telegramApiResponse = JSON.parse(httpResponse.getContentText());

            // Log the raw response to Terminal Output sheet
            TerminalOutput.Write(activeSpreadsheet, 'Plugins.Webhook.OnLoad', 'Response', httpResponse, `Raw response for token: ...${input_token.slice(0, -8)}`);
            // Check for errors in response
            if (telegramApiResponse.ok !== true) {
                throw new Error(`Error fetching bot apiResponseText: ${JSON.stringify(telegramApiResponse)}`);
            }

            // Extract result
            const result = telegramApiResponse.result;
            // Build updated card with result
            const homeCard = Plugins.Webhook.HomeCard(
                data = {
                    txt_bot_api_token: input_token
                },
                result);

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
        } catch (error) {
            TerminalOutput.Write(activeSpreadsheet,
                'Plugins.Webhook.OnLoad',
                'ERROR', e, error.toString(), error.stack);
            return this.handleError(error).build();
        }
    },
    OnDeleteWebhook(e) {
        const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        try {
            // drop_pending_updates_switch
            const dropPendingUpdates = Plugins.getFormInputsStringValue(e, 'drop_pending_updates_switch', '') === 'ON';

            // extract token
            const inputToken = Plugins.getFormInputsStringValue(e, 'txt_bot_api_token', '').trim();

            if (!inputToken) {
                throw new Error('Bot API token is required to delete webhook.');
            }

            const client = new TelegramBotClient(inputToken);
            const response = client.deleteWebhook(dropPendingUpdates);
            // Log the raw response to Terminal Output sheet
            TerminalOutput.Write(activeSpreadsheet,
                'Plugins.Webhook.OnDeleteWebhook',
                'Response',
                response,
                `Raw response for token: ...${inputToken.slice(0, -8)}`);

            if (JSON.parse(response.getContentText()).ok !== true) {
                throw new Error(`deleteWebhook api failure: ${response.getContentText()}`);
            }

            e.parameters = { refresh: 'true' };

            return Plugins.Webhook.OnLoad(e);
        } catch (error) {
            TerminalOutput.Write(activeSpreadsheet,
                'Plugins.Webhook.OnDeleteWebhook',
                'ERROR',
                e,
                error.toString());
            return this.handleError(error)
                .build();
        }
    },
    OnSetWebhook(e) {
        const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        try {
            // Log the set webhook action to Terminal Output sheet
            TerminalOutput.Write(activeSpreadsheet,
                'Plugins.Webhook.OnSetWebhook',
                'Start',
                e,
                'User requested to set webhook');

            // extract token
            const inputToken = Plugins.getFormInputsStringValue(e, 'txt_bot_api_token', '').trim();

            if (!inputToken) {
                throw new Error('Bot API token is required to set webhook.');
            }

            // extract webhook_url
            const webhookUrl = Plugins.getFormInputsStringValue(e, 'txt_webhook_url', '').trim();

            if (!webhookUrl) {
                throw new Error('Webhook URL is required to set webhook.');
            }

            const maxConnections = Plugins.getFormInputsStringValue(e, 'txt_max_connections', '40').trim();
            const maxConnInt = parseInt(maxConnections, 10);

            if (isNaN(maxConnInt) || maxConnInt < 1 || maxConnInt > 100) {
                throw new Error('Max Connections must be an integer between 1 and 100.');
            }

            const ipAddress = Plugins.getFormInputsStringValue(e, 'txt_ip_address', '').trim();
            const secretToken = Plugins.getFormInputsStringValue(e, 'txt_secret_token', '').trim();
            const dropPendingUpdates = Plugins.getFormInputsStringValue(e, 'drop_pending_updates_switch', '') === 'ON';

            // create telegram bot client
            const client = new TelegramBotClient(inputToken);

            // set webhook
            const response = client.setWebhook(webhookUrl, {
                max_connections: parseInt(maxConnections, 10),
                ip_address: ipAddress,
                secret_token: secretToken,
                drop_pending_updates: dropPendingUpdates
            });

            // Log the raw response to Terminal Output sheet
            TerminalOutput.Write(activeSpreadsheet,
                'Plugins.Webhook.OnSetWebhook',
                'Response',
                response,
                `Raw response for token: ...${inputToken.slice(0, -8)}`);

            if (JSON.parse(response.getContentText()).ok !== true) {
                throw new Error(`setWebhook api failure: ${response.getContentText()}`);
            }
            e.parameters = { refresh: 'true' };
            return Plugins.Webhook.OnLoad(e);
        } catch (error) {
            TerminalOutput.Write(
                activeSpreadsheet,
                'Plugins.Webhook.OnSetWebhook',
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

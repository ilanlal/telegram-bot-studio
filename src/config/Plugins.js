class Plugins {
    get pluginList() {
        return [
            Plugins.GetMe,
            Plugins.GetChat,
            Plugins.Webhook
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
}

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
    imageUrl: 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/google-workspace-marketplace/120x120.png',
    BuildHomeCard: (data = {}) => {
        data.txt_bot_api_token = PropertiesService.getUserProperties().getProperty('txt_bot_api_token') || '';
        data.isConnected = !!data.txt_bot_api_token;

        const cardBuilder = CardService.newCardBuilder()
            .setName(Plugins.ViewModel.id + '-Home')
            .setHeader(CardService.newCardHeader()
                .setTitle(Plugins.ViewModel.name)
                .setSubtitle('Complete Toolkit for Telegram Bot Management')
                .setImageStyle(CardService.ImageStyle.CIRCLE)
                .setImageUrl(Plugins.LOGO_PNG_URL)
                .setImageAltText('Telegram Bot Studio Logo'));

        // 1. Connection & Status Section (Pinned to Top)
        cardBuilder.addSection(
            Plugins.Connection.WelcomeSection(data));

        // 2. Main Plugin Hub - Professional Grid-like feel
        const pluginHub = CardService.newCardSection()
            .setHeader('🛠️ Available Plugins')
            .setCollapsible(false);

        Plugins.prototype.pluginList.forEach((plugin) => {
            pluginHub.addWidget(
                CardService.newDecoratedText()
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
                                    .setFunctionName('Plugins.Navigations.PushCard')
                                    .setParameters({ path: `Plugins.${plugin.name.replace(/\s+/g, '')}.HomeCard` })
                            )
                    )
            );
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
                    .setBackgroundColor(Plugins.primaryColor())
                    .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
                    .setOnClickAction(CardService.newAction()
                        .setFunctionName('AppHandler.ViewModel.OpenUserProfileCard')))
            );
        }

        return cardBuilder.build();
    },
    BuildLoginCard: (data = {}) => {
        const newFixedFooter = CardService.newFixedFooter()
            .setPrimaryButton(
                CardService.newTextButton()
                    .setAltText('Connect with Bot Token')
                    .setMaterialIcon(
                        CardService.newMaterialIcon()
                            .setName('login')
                            .setFill(true)
                            .setWeight(300)
                            .setGrade(0))

                    .setText('Connect')
                    .setOnClickAction(
                        CardService.newAction()
                            // List of widget IDs whose values are required for this action to be executed
                            .addRequiredWidget(['txt_bot_api_token'])
                            .setFunctionName('BotApiHandler.View.Login')));

        const newInputSection = CardService.newCardSection()
            .addWidget(
                // add bot token input widget (hidden if token exists)
                Plugins.ViewModel.BuildTokenTextInputWidget(''));

        const newQuickTipsSection = CardService.newCardSection()
            .setHeader('Quick Tips to Get Your Bot Token')
            .setCollapsible(true)
            .setNumUncollapsibleWidgets(0)
            .addWidget(
                CardService.newTextParagraph()
                    .setText('You can create a new bot and get your bot token from the BotFather on Telegram.')
            )
            // Quick steps
            .addWidget(
                CardService.newTextParagraph()
                    .setText('1. Open Telegram and search for @BotFather.\n2. Start a chat and send the command /newbot.\n3. Follow the instructions to set a name and username for your bot.\n4. After creating the bot, BotFather will provide you with a bot token. Copy this token to use in the app.'))
            // add divider
            .addWidget(CardService.newDivider())
            .addWidget(
                CardService.newTextParagraph()
                    .setText('💡 Make sure to keep your bot token secure and do not share it with others.'))


        const cardBuilder = CardService.newCardBuilder()
            .setName('SetupBotConnectionCard')
            .setHeader(CardService.newCardHeader()
                .setTitle('Connect Your Bot')
                .setSubtitle('Set up your Telegram Bot connection')
                .setImageStyle(CardService.ImageStyle.SQUARE)
                .setImageUrl(Plugins.WELCOME_IMG_URL)
                .setImageAltText('Setup Bot Connection Image'))
            .addSection(newInputSection)
            .addSection(newQuickTipsSection)
            .setFixedFooter(newFixedFooter);
        return cardBuilder.build();
    },
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
    BuildUserProfileCard: (data = {}) => {
        const cardBuilder = CardService.newCardBuilder()
            .setName(Plugins.ViewModel.id + '-UserProfile')
            .setHeader(CardService.newCardHeader()
                .setTitle('Profile - ' + Plugins.ViewModel.name)
                .setSubtitle('User Profile')
                .setImageStyle(CardService.ImageStyle.SQUARE)
                .setImageUrl(Plugins.YOU_GOT_IT_IMG_URL)
                .setImageAltText('Profile Image'))
            .addSection(CardService.newCardSection()
                .addWidget(
                    CardService.newTextParagraph()
                        .setText('This is the profile section for the App Model plugin. Here you can view and edit your profile information.')));

        // 1. membership section
        cardBuilder.addSection(
            Plugins.ViewModel.BuildMembershipSection(data));

        return cardBuilder.build();
    },
    BuildMembershipSection: (data = {}) => {
        const isPremium = data.isPremium ?? false;

        const newSection = CardService.newCardSection()
            .setHeader('Membership Subscription')
            .setCollapsible(true)
            .setNumUncollapsibleWidgets(isPremium ? 1 : 2);

        // Add membership status widget
        newSection.addWidget(CardService.newDecoratedText()
            .setTopLabel('Membership Status')
            .setText(isPremium ? '💎 Premium Member' : '🆓 Free Member')
            .setBottomLabel(isPremium ? 'Thank you for being a premium member!' : 'Upgrade to premium for more features.')
            .setWrapText(false));

        // Create button based on membership status
        if (isPremium) {
            // add membership expiry date if premium

            newSection.addWidget(
                CardService.newTextButton()
                    .setText('❌ Cancel Subscription')
                    .setOnClickAction(
                        CardService.newAction()
                            .setFunctionName('AppHandler.ViewModel.RevokeLicense'))
            );
        }
        else {
            newSection.addWidget(
                CardService.newTextButton()
                    .setAltText('Upgrade to Premium Membership')
                    .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
                    .setText('Upgrade to Premium')
                    .setMaterialIcon(
                        CardService.newMaterialIcon()
                            .setName('upgrade')
                            .setFill(true)
                            .setWeight(300)
                            .setGrade(0)
                    )
                    .setOnClickAction(
                        CardService.newAction()
                            .setFunctionName('AppHandler.ViewModel.ActivatePremium'))
            );
        }


        return newSection;
    },
    BuildDataSection: (data = {}) => {
        const newSection = CardService.newCardSection()
            .setHeader('App Data')
            .setCollapsible(true)
            .setNumUncollapsibleWidgets(0)
            .addWidget(
                CardService.newTextParagraph()
                    .setMaxLines(35)
                    .setText(JSON.stringify(data, null, 2))
            );

        return newSection;
    },
    BuildResultSectionPlaceholder: () => {
        return CardService.newCardSection()
            // add placeholder decorated text widget
            .addWidget(
                Plugins.ViewModel.BuildHeadDecoratedTextWidget(
                    '🔘 No Result',
                    'Send the action to see the result here.'
                )
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
    BuildErrorSection: (error) => {
        return CardService.newCardSection()
            //.setHeader('📛 Error')
            // add error header
            .addWidget(
                Plugins.ViewModel.BuildHeadDecoratedTextWidget(
                    '📛 Error',
                    error.toString()
                )
            )
            // add divider
            .addWidget(CardService.newDivider());
    },
    BuildErrorWidget: (error) => {
        return Plugins.ViewModel.BuildHeadDecoratedTextWidget(
            '📛 Error',
            error.toString()
        );
    },
    BuildTokenTextInputWidget: (token) => {
        // Bot Token input
        return CardService.newTextInput()
            .setVisibility(token ? CardService.Visibility.HIDDEN : CardService.Visibility.VISIBLE)
            .setValue(token || '')
            .setId('txt_bot_api_token')
            .setFieldName('txt_bot_api_token')
            .setTitle('🤖 Your Bot Token')
            .setHint('Enter your Bot Token, get it from @BotFather, for example: 123456789:ABCDefGhIJKlmNoPQRsTUVwxyZ, keep it secret!');
    },
    BuildHeadDecoratedTextWidget: (title, subtitle) => {
        return CardService.newDecoratedText()
            .setText(title)
            .setBottomLabel(subtitle)
            .setWrapText(true);
    },
    BuildConnectionWidget: (token) => {
        if (!token) {
            return CardService.newDecoratedText()
                .setStartIcon(
                    CardService.newIconImage().setMaterialIcon(
                        CardService.newMaterialIcon().setName('smart_toy')))
                .setTopLabel('Welcome to Telegram Bot Studio!')
                .setText('Getting started is easy.')
                .setBottomLabel('Set up your bot connection to get started.')
                .setWrapText(true)
                .setButton(
                    CardService.newTextButton()
                        .setAltText('Add Bot Token')
                        .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
                        .setBackgroundColor('#009c41')
                        .setMaterialIcon(
                            CardService.newMaterialIcon()
                                .setName('power_settings_new')
                                .setFill(true)
                                .setWeight(300)
                                .setGrade(0))
                        .setOnClickAction(
                            CardService.newAction()
                                .setFunctionName('Plugins.Navigations.PushCard')
                                .setParameters({ path: 'Plugins.ViewModel.BuildLoginCard' })
                        )
                );
        }
        const friendlyName = PropertiesService.getUserProperties().getProperty('txt_bot_friendly_name') || 'Unknown Name';
        const username = PropertiesService.getUserProperties().getProperty('txt_bot_username') || 'unknown_bot';
        return CardService.newDecoratedText()
            .setStartIcon(
                CardService.newIconImage().setMaterialIcon(
                    CardService.newMaterialIcon().setName('smart_toy')))
            .setTopLabel(`Connected as ${friendlyName}`)
            .setText(`@${username}`)
            //.setBottomLabel(`${token.slice(0, 11)}****${token.slice(-16)}`)
            .setWrapText(false)
            .setButton(
                CardService.newTextButton()
                    .setAltText(`Forget @${username} Bot Connection (Delete Token)`)
                    .setMaterialIcon(
                        CardService.newMaterialIcon()
                            .setName('cancel')
                            .setFill(false)
                            .setWeight(300)
                            .setGrade(0))
                    .setOnClickAction(
                        CardService.newAction()
                            .setFunctionName('BotApiHandler.View.Logout')
                    )
            );
    },
    BuildConnectionSection: (token) => {
        return CardService.newCardSection()
            //.setHeader('Connection Status')
            .addWidget(
                Plugins.ViewModel.BuildConnectionWidget(token)
            )
            // add bot token input widget (hidden if token exists)
            .addWidget(
                Plugins.ViewModel.BuildTokenTextInputWidget(token)
            );
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
                        .setFunctionName('Plugins.Navigations.PushCard')
                        .setParameters({ path: 'Plugins.ViewModel.BuildUserProfileCard' })
                )
        );
        return newSection;
    }
};

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
            const formInputs = e.commonEventObject?.formInputs || {};
            const data = {
                ...appModelData,
                // You can add more data extraction logic here if needed
                developer_mode_switch: PropertiesService.getUserProperties().getProperty('developer_mode_switch') || 'OFF',
                txt_bot_api_token: PropertiesService.getUserProperties().getProperty('txt_bot_api_token') || ''
            };

            Object.keys(formInputs).forEach((key) => {
                const input = formInputs[key];
                if (input.stringInputs) {
                    data[key] = input.stringInputs.value[0];
                }
            });

            // Call the plugin action to get the card
            return CardService.newActionResponseBuilder()
                .setNavigation(
                    CardService.newNavigation()
                        .pushCard(Plugins[plugin][action](data))
                ).build();

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
            const formInputs = e.commonEventObject?.formInputs || {};
            // create data object from form inputs
            const data = {
                ...AppModel.create().toJSON(),
                developer_mode_switch: PropertiesService.getUserProperties().getProperty('developer_mode_switch') || 'OFF',
                txt_bot_api_token: PropertiesService.getUserProperties().getProperty('txt_bot_api_token') || ''
            };
            Object.keys(formInputs).forEach((key) => {
                const input = formInputs[key];
                if (input.stringInputs) {
                    data[key] = input.stringInputs.value[0];
                }
            });
            // Call the plugin action to get the card
            return CardService.newActionResponseBuilder()
                .setNavigation(
                    CardService.newNavigation()
                        .updateCard(Plugins[plugin][action](data))
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
        const formInputs = e.commonEventObject?.formInputs || {};
        // create data object from form inputs
        const data = {
            ...AppModel.create().toJSON(),
            // developer_mode_switch: PropertiesService.getUserProperties().getProperty('developer_mode_switch') || 'OFF'
        };
        Object.keys(formInputs).forEach((key) => {
            const input = formInputs[key];
            if (input.stringInputs) {
                data[key] = input.stringInputs.value[0];
            }
        });
        return CardService.newActionResponseBuilder()
            .setNavigation(
                CardService.newNavigation()
                    .popToRoot()
                    .updateCard(Plugins.ViewModel.BuildHomeCard(data))
            ).build();
    }
};

Plugins.Connection = {
    id: 'ConnectionPlugin',
    name: 'Connection',
    short_description: 'Manage bot connection settings',
    description: 'The Connection plugin allows you to manage and configure the connection settings for your Telegram bot. You can set up your bot token, test the connection, and ensure that your bot is properly connected to the Telegram API.',
    version: '1.0.0',
    imageUrl: 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/google-workspace-marketplace/120x120.png',
    WelcomeSection: (data = {}) => {
        const token = PropertiesService.getUserProperties().getProperty('txt_bot_api_token') || '';
        if (!token) {
            return Plugins.Connection.BuildDisconnectedSection(data);
        }
        else {
            return Plugins.Connection.BuildConnectedSection({ txt_bot_api_token: token, ...data });
        }
    },
    HomeCard: (data = {}) => {
        const newFixedFooter = CardService.newFixedFooter()
            .setPrimaryButton(
                CardService.newTextButton()
                    .setAltText('Connect with Bot Token')
                    .setMaterialIcon(
                        CardService.newMaterialIcon()
                            .setName('login')
                            .setFill(true)
                            .setWeight(300)
                            .setGrade(0))

                    .setText('Connect')
                    .setOnClickAction(
                        CardService.newAction()
                            // List of widget IDs whose values are required for this action to be executed
                            .addRequiredWidget(['txt_bot_api_token'])
                            .setFunctionName('BotApiHandler.View.Login')));

        const newInputSection = CardService.newCardSection()
            .addWidget(
                // add bot token input widget (hidden if token exists)
                Plugins.ViewModel.BuildTokenTextInputWidget(''));

        const newQuickTipsSection = CardService.newCardSection()
            .setHeader('Quick Tips to Get Your Bot Token')
            .setCollapsible(true)
            .setNumUncollapsibleWidgets(0)
            .addWidget(
                CardService.newTextParagraph()
                    .setText('You can create a new bot and get your bot token from the BotFather on Telegram.')
            )
            // Quick steps
            .addWidget(
                CardService.newTextParagraph()
                    .setText('1. Open Telegram and search for @BotFather.\n2. Start a chat and send the command /newbot.\n3. Follow the instructions to set a name and username for your bot.\n4. After creating the bot, BotFather will provide you with a bot token. Copy this token to use in the app.'))
            // add divider
            .addWidget(CardService.newDivider())
            .addWidget(
                CardService.newTextParagraph()
                    .setText('💡 Make sure to keep your bot token secure and do not share it with others.'))


        const cardBuilder = CardService.newCardBuilder()
            .setName('SetupBotConnectionCard')
            .setHeader(
                CardService.newCardHeader()
                    .setTitle('Connect Your Bot')
                    .setSubtitle('Set up your Telegram Bot connection')
                    .setImageStyle(CardService.ImageStyle.SQUARE)
                    .setImageUrl(Plugins.WELCOME_IMG_URL)
                    .setImageAltText('Setup Bot Connection Image'))
            .addSection(newInputSection)
            .addSection(newQuickTipsSection)
            .setFixedFooter(newFixedFooter);
        return cardBuilder.build();
    },
    BuildDisconnectedSection: (data = {}) => {
        return CardService.newCardSection()
            //.setHeader('No Bot Connection')
            .addWidget(
                CardService.newDecoratedText()
                    .setStartIcon(
                        CardService.newIconImage().setMaterialIcon(
                            CardService.newMaterialIcon().setName('smart_toy')))
                    .setTopLabel('Start Here!')
                    .setText('Getting started is easy.')
                    .setBottomLabel('Click the button to set up your bot connection.')
                    .setWrapText(true)
                    .setButton(
                        CardService.newTextButton()
                            .setAltText('Set Up Bot Connection')
                            .setTextButtonStyle(CardService.TextButtonStyle.TEXT)
                            .setBackgroundColor(Plugins.primaryColor())
                            .setMaterialIcon(
                                CardService.newMaterialIcon()
                                    .setName('power_settings_new')
                                    .setFill(true)
                                    .setWeight(500)
                                    .setGrade(0))
                            .setOnClickAction(
                                CardService.newAction()
                                    .setFunctionName('Plugins.Navigations.PushCard')
                                    .setParameters({ path: 'Plugins.ViewModel.BuildLoginCard' })
                            )
                    ));
    },
    BuildConnectedSection: (data = {}) => {
        const token = data.txt_bot_api_token;
        const friendlyName = PropertiesService.getUserProperties().getProperty('txt_bot_friendly_name') || 'Unknown Name';
        const username = PropertiesService.getUserProperties().getProperty('txt_bot_username') || 'unknown_bot';

        return CardService.newCardSection()
            .setHeader('🤖 @' + username)
            .setCollapsible(true)
            .setNumUncollapsibleWidgets(0)
            .addWidget(
                CardService.newDecoratedText()
                    .setStartIcon(
                        CardService.newIconImage().setMaterialIcon(
                            CardService.newMaterialIcon().setName('smart_toy')))
                    .setTopLabel(`Connected as ${friendlyName}`)
                    .setText(`@${username}`)
                    //.setBottomLabel(`${token.slice(0, 11)}****${token.slice(-16)}`)
                    .setWrapText(false)
                    .setButton(
                        CardService.newTextButton()
                            .setAltText(`Forget @${username} (Delete Token) Bot Connection`)
                            .setBackgroundColor(Plugins.accentColor())
                            .setTextButtonStyle(CardService.TextButtonStyle.TEXT)
                            .setMaterialIcon(
                                CardService.newMaterialIcon()
                                    .setName('cancel')
                                    .setFill(true)
                                    .setWeight(300)
                                    .setGrade(0))
                            .setOnClickAction(
                                CardService.newAction()
                                    .setFunctionName('BotApiHandler.View.Logout')
                            )
                    ))
            .addWidget(
                Plugins.ViewModel.BuildTokenTextInputWidget(token)
            );
    }
};

Plugins.Settings = {
    id: 'SettingsPlugin',
    name: 'Settings',
    short_description: 'Manage add-on settings',
    description: 'The Settings card allows you to manage and configure settings for your Telegram bot add-on. You can adjust preferences, set up integrations, and customize the behavior of your bot to suit your needs.',
    version: '1.0.0',
    imageUrl: 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/google-workspace-marketplace/120x120.png',
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
                                    .setFunctionName('Plugins.Navigations.PushCard')
                                    .setParameters({ path: 'Plugins.Settings.HomeCard' })
                            )
                    )
            );
    },
    HomeCard: (data = {}) => {
        // create random secret for demonstration purposes (64 characters)
        const privateKeyDemo = Array(65).fill(0).map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
        data.txt_api_endpoint_url = PropertiesService.getUserProperties().getProperty('txt_api_endpoint_url') || 'https://api.telegram.org/';
        data.terminal_output_switch = PropertiesService.getUserProperties().getProperty('terminal_output_switch') || 'ON';
        data.txt_secret_private_key = PropertiesService.getUserProperties().getProperty('txt_secret_private_key') || privateKeyDemo;

        const cardBuilder = CardService.newCardBuilder()
            .setName(Plugins.Settings.name + '-Home')
            .setHeader(CardService.newCardHeader()
                .setTitle(Plugins.Settings.name)
                .setSubtitle(Plugins.Settings.short_description)
                .setImageStyle(CardService.ImageStyle.SQUARE)
                .setImageUrl(Plugins.Settings.imageUrl)
                .setImageAltText('Card Image'));

        // add api endpoint section
        const apiEndpointSection = CardService.newCardSection()
            .setHeader('API Endpoint Settings')
            .addWidget(
                CardService.newTextParagraph()
                    .setText('Configure the API endpoint settings for your Telegram bot.'));

        apiEndpointSection.addWidget(
            CardService.newTextInput()
                .setTitle('API Endpoint URL')
                .setFieldName('txt_api_endpoint_url')
                .setValue(data.txt_api_endpoint_url)
                .setHint('Enter the API endpoint URL for your Telegram bot. Default is https://api.telegram.org/'));

        cardBuilder.addSection(apiEndpointSection);

        const topSettingsSection = CardService.newCardSection()
            .setHeader('General Settings')
            .addWidget(
                CardService.newTextParagraph()
                    .setText('Manage general settings for your Telegram bot add-on.'));
        // Terminal Output toggle
        topSettingsSection.addWidget(
            CardService.newDecoratedText()
                .setTopLabel('Terminal Output')
                .setText('View the terminal output logs for debugging and monitoring.')
                .setWrapText(true)
                .setSwitchControl(
                    CardService.newSwitch()
                        .setFieldName('terminal_output_switch')
                        .setSelected(data.terminal_output_switch === 'ON')
                        .setValue('ON')
                        .setOnChangeAction(
                            CardService.newAction()
                                .setFunctionName('AppHandler.ViewModel.ToggleAction')
                                .setParameters({
                                    actionName: 'terminal_output_switch'
                                })
                        )
                )
        );
        cardBuilder.addSection(topSettingsSection);

        // Secret private key section
        const keySecretsSection = CardService.newCardSection()
            .setHeader('Key Secrets')
            .addWidget(
                CardService.newTextParagraph()
                    .setText('Manage your secret keys securely.'));
        // Text input for secret private key
        keySecretsSection.addWidget(
            CardService.newTextInput()
                .setValidation(
                    CardService.newValidation()
                        .setCharacterLimit('256')
                        .setInputType(
                            CardService.InputType.TEXT))
                .setTitle('Secret Private Key')
                .setFieldName('txt_secret_private_key')
                .setValue(data.txt_secret_private_key)
                .setHint('Enter your secret private key here. Keep it secure!'));

        cardBuilder.addSection(keySecretsSection);

        // add fixed footer with save button
        const newFixedFooter = CardService.newFixedFooter()
            .setPrimaryButton(
                CardService.newTextButton()
                    .setAltText('Save Settings')
                    .setMaterialIcon(
                        CardService.newMaterialIcon()
                            .setName('save')
                            .setFill(true)
                            .setWeight(700)
                            .setGrade(200))
                    .setText('Save')
                    .setOnClickAction(
                        CardService.newAction()
                            .setFunctionName('Plugins.Settings.OnSaveSettings')
                    )
            );
        cardBuilder.setFixedFooter(newFixedFooter);

        return cardBuilder.build();
    },
    OnSaveSettings: (e) => {
        const formInputs = e.commonEventObject?.formInputs || {};
        // save api endpoint url
        const apiEndpointUrlInput = formInputs['txt_api_endpoint_url'];
        if (apiEndpointUrlInput && apiEndpointUrlInput.stringInputs) {
            const apiEndpointUrl = apiEndpointUrlInput.stringInputs.value[0];
            PropertiesService.getUserProperties().setProperty('txt_api_endpoint_url', apiEndpointUrl);
        }
        // sace secret private key
        const secretPrivateKeyInput = formInputs['txt_secret_private_key'];
        if (secretPrivateKeyInput && secretPrivateKeyInput.stringInputs) {
            const secretPrivateKey = secretPrivateKeyInput.stringInputs.value[0];
            PropertiesService.getUserProperties().setProperty('txt_secret_private_key', secretPrivateKey);
        }

        // update current card to reflect saved settings
        return Plugins.Navigations.UpdateCard({
            ...e,
            parameters: {
                path: 'Plugins.Settings.HomeCard'
            }
        });
    }
};

Plugins.GetMe = {
    id: 'GetMePlugin',
    name: 'Get Me',
    short_description: 'Retrieve Telegram bot information',
    description: 'The GetMe plugin allows you to retrieve information about your Telegram bot using the Bot API. Simply provide your bot token to get started.',
    version: '1.0.0',
    stars: '⭐',
    imageUrl: 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/google-workspace-marketplace/120x120.png',
    WelcomeSection: (data = {}) => {
        return CardService.newCardSection()
            //.setHeader('GetMe Extensions')
            .setCollapsible(true)
            .setNumUncollapsibleWidgets(1)
            // add main decorated text widget
            .addWidget(CardService.newDecoratedText()
                .setTopLabel(`Version ${Plugins.GetMe.version} ${Plugins.GetMe.stars}`)
                .setText(Plugins.GetMe.name)
                .setBottomLabel(Plugins.GetMe.short_description)
                .setWrapText(false)
                .setButton(
                    CardService.newTextButton()
                        .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
                        .setBackgroundColor(Plugins.secondaryColor())
                        .setDisabled(!!!data.isConnected)
                        //.setText('Show')
                        .setAltText('Open Get Me Plugin')
                        .setMaterialIcon(
                            CardService.newMaterialIcon()
                                .setName('smart_toy')
                                .setFill(false)
                                .setWeight(300)
                                .setGrade(0)
                        )
                        .setOnClickAction(
                            CardService.newAction()
                                .setFunctionName('Plugins.Navigations.PushCard')
                                .setParameters({ path: 'Plugins.GetMe.HomeCard' })
                        )
                )
            )
            // add more description below
            .addWidget(CardService.newTextParagraph()
                .setText(Plugins.GetMe.description)
            )
            // add separator
            .addWidget(CardService.newDivider())
            // add  open button
            .addWidget(
                CardService.newTextButton()
                    .setDisabled(!!!data.isConnected)
                    .setAltText('Open Get Me Plugin')
                    .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
                    .setText('Open Get Me')
                    .setMaterialIcon(
                        CardService.newMaterialIcon()
                            .setName('smart_toy')
                            .setFill(true)
                            .setWeight(700)
                            .setGrade(200)
                    )
                    .setOnClickAction(
                        CardService.newAction()
                            .setFunctionName('Plugins.Navigations.PushCard')
                            .setParameters({ path: 'Plugins.GetMe.HomeCard' })
                    )
            )
            // add help button
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
            // add about button
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
            );
    },
    HomeCard: (data = {}) => {
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
                    Plugins.GetMe.BuildHighlightResultSection(data, result));

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
                                .setFunctionName('BotApiHandler.View.GetMe'))
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
                                .setFunctionName('Plugins.Navigations.PushCard')
                                .setParameters({ path: 'Plugins.GetChat.HomeCard' }))
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


        // Add usful tools section
        cardBuilder.addSection(
            Plugins.JsonTools.WelcomeSection(data)
        );
        //Plugins.JsonTools.WelcomeSection(),
        return cardBuilder.build();
    },
    BuildHighlightResultSection: (data = {}, result) => {
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
    }
}

Plugins.GetChat = {
    id: 'GetChatPlugin',
    name: 'Get Chat',
    short_description: 'Retrieve Telegram chat information',
    description: 'The Get Chat plugin allows you to retrieve information about a Telegram chat (channel, group, or user) using the Bot API. Provide your bot token and the chat ID to get started.',
    version: '1.0.0',
    stars: '⭐',
    imageUrl: 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/google-workspace-marketplace/120x120.png',
    WelcomeSection: (data = {}) => {
        return CardService.newCardSection()
            //.setHeader('GetChat Extensions')
            .setCollapsible(true)
            .setNumUncollapsibleWidgets(1)
            // add main widget
            .addWidget(CardService.newDecoratedText()
                .setTopLabel(`Version ${Plugins.GetChat.version} ${Plugins.GetChat.stars}`)
                .setText(Plugins.GetChat.name)
                .setBottomLabel(Plugins.GetChat.short_description)
                .setWrapText(true)
                .setButton(
                    CardService.newTextButton()
                        .setTextButtonStyle(CardService.TextButtonStyle.TEXT)
                        .setBackgroundColor(Plugins.secondaryColor())
                        .setDisabled(!!!data.isConnected)
                        .setAltText('Open Get Chat Plugin')
                        .setMaterialIcon(
                            CardService.newMaterialIcon()
                                .setName('chat_info')
                                .setFill(true)
                                .setWeight(300)
                                .setGrade(-25)
                        )
                        .setOnClickAction(
                            CardService.newAction()
                                .setFunctionName('Plugins.Navigations.PushCard')
                                .setParameters({ path: 'Plugins.GetChat.HomeCard' })
                        )
                )
            )
            // add more description below
            .addWidget(CardService.newTextParagraph()
                .setText(Plugins.GetChat.description)
            )
            // add separator
            .addWidget(CardService.newDivider())
            // add open button
            .addWidget(
                CardService.newTextButton()
                    .setDisabled(!!!data.isConnected)
                    .setAltText('Open Get Chat Plugin')
                    .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
                    .setText('Open Get Chat')
                    .setMaterialIcon(
                        CardService.newMaterialIcon()
                            .setName('chat_info')
                            .setFill(true)
                            .setWeight(700)
                            .setGrade(200)
                    )
                    .setOnClickAction(
                        CardService.newAction()
                            .setFunctionName('Plugins.Navigations.PushCard')
                            .setParameters({ path: 'Plugins.GetChat.HomeCard' })
                    )
            )
            // add help button
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
            // add about button
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
    HomeCard: (data = {}) => {
        const input_token = data.txt_bot_api_token || '';
        const chatId = data.txt_chat_id || '';
        const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        // Log the request to Terminal Output sheet
        TerminalOutput.Write(activeSpreadsheet, 'Plugins.GetChat.HomeCard', 'Start', data, `Request to get chat info with token: ${input_token}, chat ID: ${chatId}`);
        // Build the GetChat plugin card
        const cardBuilder = CardService.newCardBuilder()
            .setName(Plugins.GetChat.name)
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
        if (input_token !== '' && chatId !== '') {
            TerminalOutput.Write(activeSpreadsheet, 'Plugins.GetChat.HomeCard', 'Submit', data, `Request to get chat info with token: ${input_token}, chat ID: ${chatId}`);
            try {
                const telegramBotClient = new TelegramBotClient(input_token);
                const response = telegramBotClient.getChat(encodeURIComponent(chatId));

                if (response.getResponseCode() !== 200) {
                    throw new Error(`Failed to get chat info: ${response.getContentText()}`);
                }
                const result = JSON.parse(response.getContentText()).result;

                // Log the response to Terminal Output sheet
                TerminalOutput.Write(activeSpreadsheet, 'Plugins.GetChat', 'Response', result, `Retrieved chat info for token: ${input_token} and chat ID: ${chatId}`);
                // Add highlight section
                cardBuilder.addSection(
                    Plugins.GetChat.BuildHighlightResultSection(data, result));
                // Add result section
                cardBuilder.addSection(
                    Plugins.ViewModel.BuildResultSection(result));
            } catch (error) {
                TerminalOutput.Write(activeSpreadsheet, 'Plugins.GetChat', 'ERROR', data, `Exception while getting chat info for token: ${input_token}, chat ID: ${chatId} - ${error.toString()}`);
                cardBuilder.addSection(
                    Plugins.ViewModel.BuildErrorSection(error));

            }
        }
        else {
            // Placeholder section for "Result" section when no token/chat ID is provided
            cardBuilder.addSection(Plugins.ViewModel.BuildResultSectionPlaceholder());
        }

        // Help & Support text
        cardBuilder.addSection(
            Plugins.GetChat.BuildQuickHelpSection());

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
                                .setFunctionName('BotApiHandler.View.GetChat')
                        )));

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
                Plugins.ViewModel.BuildHeadDecoratedTextWidget(
                    'Help about ' + Plugins.GetChat.name,
                    Plugins.GetChat.short_description
                )));

        cardBuilder.addSection(CardService.newCardSection()
            .addWidget(
                CardService.newTextParagraph()
                    .setText(Plugins.GetChat.description)));

        // Add useful tools section
        cardBuilder.addSection(
            Plugins.JsonTools.WelcomeSection(data)
        );

        return cardBuilder.build();
    },
    BuildQuickHelpSection: () => {
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
    BuildHighlightResultSection: (data = {}, result) => {
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
    }
};

Plugins.Webhook = {
    id: 'WebhookPlugin',
    name: 'Webhook',
    short_description: 'Manage Telegram bot webhooks',
    description: 'The Webhook plugin allows you to set, get, and delete webhooks for your Telegram bot using the Bot API. Manage your bot\'s webhook settings easily by providing your bot token and the desired webhook URL.',
    version: '1.0.0',
    stars: '⭐✨',
    imageUrl: 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/google-workspace-marketplace/120x120.png',
    WelcomeSection: (data = {}) => {
        return CardService.newCardSection()
            //.setHeader('GetMe Extensions')
            .setCollapsible(true)
            .setNumUncollapsibleWidgets(1)
            // add main decorated text widget
            .addWidget(
                CardService.newDecoratedText()
                    .setTopLabel(`Version ${Plugins.Webhook.version} ${Plugins.Webhook.stars} ${data.isPremium ? '' : '🏆 PREMIUM'}`)
                    .setText(Plugins.Webhook.name)
                    .setBottomLabel(Plugins.Webhook.short_description)
                    .setWrapText(false)
                    .setButton(
                        CardService.newTextButton()
                            .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
                            .setDisabled(!!!data.isPremium || !!!data.isConnected)
                            .setBackgroundColor(Plugins.secondaryColor())
                            .setAltText(data.isPremium ? 'Open Webhook Plugin' : 'Upgrade to Premium to access Webhook Plugin')
                            //.setText('Show')
                            .setMaterialIcon(
                                CardService.newMaterialIcon()
                                    .setName('webhook')
                                    .setFill(true)
                                    .setWeight(300)
                                    .setGrade(-25)
                            )
                            .setOnClickAction(
                                CardService.newAction()
                                    .setFunctionName('Plugins.Navigations.PushCard')
                                    .setParameters({ path: 'Plugins.Webhook.HomeCard' })
                            )
                    )
            )
            // add more description below
            .addWidget(CardService.newTextParagraph()
                .setText(Plugins.Webhook.description)
            )
            // add separator
            .addWidget(CardService.newDivider())
            // add open button
            .addWidget(
                CardService.newTextButton()
                    .setDisabled(!!!data.isPremium || !!!data.isConnected)
                    .setAltText(data.isPremium ? 'Open Webhook Plugin' : 'Upgrade to Premium to access Webhook Plugin')
                    .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
                    .setText('Open Webhook Plugin')
                    .setMaterialIcon(
                        CardService.newMaterialIcon()
                            .setName('webhook')
                            .setFill(true)
                            .setWeight(700)
                            .setGrade(200)
                    )
                    .setOnClickAction(
                        CardService.newAction()
                            .setFunctionName('Plugins.Navigations.PushCard')
                            .setParameters({ path: 'Plugins.Webhook.HomeCard' })
                    )
            )
            // add help button
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
                            .setParameters({ path: 'Plugins.Webhook.HelpCard' }))
            )
            // add about button
            .addWidget(
                CardService.newTextButton()
                    .setAltText('About Webhook plugin')
                    //.setBackgroundColor('#E7EA55')
                    .setTextButtonStyle(CardService.TextButtonStyle.TEXT)
                    .setText('About Webhook')
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
                            .setParameters({ path: 'Plugins.Webhook.AboutCard' }))
            );
    },
    HomeCard: (data = {}) => {
        const input_token = data.txt_bot_api_token || null;
        const input_webhook_url = data.txt_webhook_url || null;
        const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();

        // Log the request to Terminal Output sheet
        TerminalOutput.Write(activeSpreadsheet, 'Plugins.Webhook.HomeCard', 'Start', data, `Request to get bot info with token: ${input_token}`);

        let newResultSection = null;

        const newFixedFooter = CardService.newFixedFooter()
            // set search as default primary button
            .setPrimaryButton(
                CardService.newTextButton()
                    .setAltText('Refresh Bot Info')
                    .setMaterialIcon(
                        CardService.newMaterialIcon()
                            .setName('refresh')
                            .setFill(true)
                            .setWeight(300)
                            .setGrade(0)
                    )
                    .setText('Refresh')
                    .setOnClickAction(
                        CardService.newAction()
                            .addRequiredWidget(['txt_bot_api_token'])
                            .setFunctionName('BotApiHandler.View.FetchWebhook'))
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

        // If token is provided, call getWebhookInfo API
        if (input_token) {
            TerminalOutput.Write(activeSpreadsheet, 'Plugins.Webhook.HomeCard', 'Submit', data, `Request to get bot info with token: ${input_token}`);
            try {
                // Call Telegram Bot API getMe method
                const telegramBotClient = new TelegramBotClient(input_token);
                const response = telegramBotClient.getWebhookInfo();

                // Check for errors in response
                if (response.getResponseCode() !== 200) {
                    throw new Error(`Error fetching bot info: ${response.getResponseCode()} - ${response.getContentText()}`);
                }

                const result = JSON.parse(response.getContentText()).result;

                // Log the response to Terminal Output sheet
                TerminalOutput.Write(activeSpreadsheet, 'Plugins.Webhook.HomeCard', 'Response', result, `Retrieved bot info for token: ${input_token}`);

                // Add webhook state section
                cardBuilder.addSection(
                    Plugins.Webhook.BuildWebhookSection(data, result));

                // when webhook is set
                if (result.url !== '') {
                    // Add result section
                    cardBuilder.addSection(
                        Plugins.ViewModel.BuildResultSection(result))
                }
                else { // when webhook is not set
                    // Add input parameter section
                    cardBuilder.addSection(Plugins.Webhook.BuildInputSection(data));

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
                                    .setFunctionName('BotApiHandler.View.SetWebhook'))
                    );
                }
            } catch (error) {
                TerminalOutput.Write(activeSpreadsheet, 'Plugins.Webhook', 'ERROR', data, error.toString());

                cardBuilder.addSection(
                    Plugins.ViewModel.BuildErrorSection(error));
            }
        }


        // Add result section if available
        // Add quick help section
        cardBuilder.addSection(Plugins.Webhook.BuildQuickHelpSection());

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


        // Add usful tools section
        cardBuilder.addSection(
            Plugins.JsonTools.WelcomeSection(data)
        );
        //Plugins.JsonTools.WelcomeSection(),
        return cardBuilder.build();
    },
    BuildWebhookWidget: (result) => {
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
    BuildWebhookSection: (data, result) => {
        const section = CardService.newCardSection()
            .addWidget(
                Plugins.Webhook.BuildWebhookWidget(result));

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
                                .setFunctionName('BotApiHandler.View.DeleteWebhook')
                        )
                );
        }

        return section;
    },
    BuildInputSection: (data = {}) => {
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
    BuildQuickHelpSection: () => {
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
    }
}

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
}


if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Plugins
    };
};

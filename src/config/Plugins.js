class Plugins {
    get pluginList() {
        return [
            Plugins.GetMe,
            Plugins.GetChat,
            //Plugins.JsonTools
        ];
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
    description: 'All-in-one for Telegram Bot',
    version: '1.2.0',
    imageUrl: 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/google-workspace-marketplace/120x120.png',
    BuildHomeCard: (data = {}) => {
        data.developer_mode_switch = PropertiesService.getUserProperties().getProperty('developer_mode_switch') || 'OFF';

        // Build the App Model plugin card
        const cardBuilder = CardService.newCardBuilder()
            .setName(Plugins.ViewModel.id + '-Home')
            .setHeader(CardService.newCardHeader()
                .setTitle(Plugins.ViewModel.name)
                .setSubtitle(Plugins.ViewModel.description)
                .setImageStyle(CardService.ImageStyle.SQUARE)
                .setImageUrl(Plugins.ViewModel.imageUrl)
                .setImageAltText(Plugins.ViewModel.name + ' Image'));

        // for each plugin, add a section
        Plugins.prototype.pluginList.forEach((plugin) => {
            cardBuilder.addSection(
                plugin.WelcomeSection({ isPremium: data.isPremium })
            );
        });

        // Add data section
        if (data.developer_mode_switch === 'ON') {
            cardBuilder.addSection(
                Plugins.ViewModel.BuildDataSection(data)
            );
        }

        // Add fixed footer
        if (data.isPremium) {
            cardBuilder.setFixedFooter(
                CardService.newFixedFooter()
                    .setPrimaryButton(
                        CardService.newTextButton()
                            .setText('Explore More Features')
                            .setOnClickAction(
                                CardService.newAction()
                                    .setFunctionName('AppHandler.ViewModel.OpenAboutCard')))
            );
        }
        else {
            cardBuilder.setFixedFooter(
                CardService.newFixedFooter()
                    .setPrimaryButton(
                        CardService.newTextButton()
                            .setText('Upgrade to Premium')
                            .setOnClickAction(
                                CardService.newAction()
                                    .setFunctionName('AppHandler.ViewModel.OpenUserProfileCard')))
                    .setSecondaryButton(
                        CardService.newTextButton()
                            .setText('Help')
                            .setOnClickAction(
                                CardService.newAction()
                                    .setFunctionName('AppHandler.ViewModel.OpenHelpCard')))
            );
        }

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
            .addSection(CardService.newCardSection()
                .addWidget(
                    CardService.newTextParagraph()
                        .setText(`**${Plugins.ViewModel.name}** v${Plugins.ViewModel.version}\n\n${Plugins.ViewModel.description}\n\nDeveloped by Telegram Bot Studio.`)));
        return cardBuilder.build();
    },
    BuildHelpCard: (data = {}) => {
        const cardBuilder = CardService.newCardBuilder()
            .setName(Plugins.ViewModel.id + '-Help')
            .setHeader(CardService.newCardHeader()
                .setTitle('Help - ' + Plugins.ViewModel.name)
                .setSubtitle('Help and Support')
                .setImageStyle(CardService.ImageStyle.SQUARE)
                .setImageUrl(Plugins.YES_IMG_URL)
                .setImageAltText('Help Image'))
            .addSection(CardService.newCardSection()
                .addWidget(
                    CardService.newTextParagraph()
                        .setText('This is the help section for the App Model plugin. Here you can find information and support.')));
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

        // 2. Settings section
        data.debug_mode_switch = PropertiesService.getUserProperties().getProperty('debug_mode_switch') || 'OFF';
        data.developer_mode_switch = PropertiesService.getUserProperties().getProperty('developer_mode_switch') || 'OFF';
        data.terminal_output_switch = PropertiesService.getUserProperties().getProperty('terminal_output_switch') || 'ON';
        data.txt_bot_api_token = PropertiesService.getUserProperties().getProperty('txt_bot_api_token') || '';

        cardBuilder.addSection(
            CardService.newCardSection()
                .setHeader('Settings')
                .setCollapsible(false)
                .setNumUncollapsibleWidgets(2)
                // Terminal Output toggle
                .addWidget(
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
                )
                // Developer mode toggle
                .addWidget(
                    CardService.newDecoratedText()
                        .setTopLabel('Developer Mode')
                        .setText('Enable or disable developer mode for advanced features.')
                        .setWrapText(true)
                        .setSwitchControl(
                            CardService.newSwitch()
                                .setFieldName('developer_mode_switch')
                                .setSelected(data.developer_mode_switch === 'ON')
                                .setValue('ON')
                                .setOnChangeAction(
                                    CardService.newAction()
                                        .setFunctionName('AppHandler.ViewModel.ToggleAction')
                                        .setParameters({
                                            actionName: 'developer_mode_switch'
                                        })
                                )
                        )
                )
                // Debug mode toggle
                .addWidget(
                    CardService.newDecoratedText()
                        .setTopLabel('Debug Mode')
                        .setText('Enable or disable debug mode for detailed logging.')
                        .setWrapText(true)
                        .setSwitchControl(
                            CardService.newSwitch()
                                .setFieldName('debug_mode_switch')
                                .setSelected(data.debug_mode_switch === 'ON')
                                .setValue('ON')
                                .setOnChangeAction(
                                    CardService.newAction()
                                        .setFunctionName('AppHandler.ViewModel.ToggleAction')
                                        .setParameters({
                                            actionName: 'debug_mode_switch'
                                        })
                                )
                        )
                )
        );

        // 3. data section
        if (data.developer_mode_switch === 'ON') {
            cardBuilder.addSection(
                Plugins.ViewModel.BuildDataSection(data)
            );
        }

        return cardBuilder.build();
    },
    BuildMembershipSection: (data = {}) => {
        const isPremium = data.isPremium ?? false;

        const newSection = CardService.newCardSection()
            .setHeader('Membership Subscription')
            .setCollapsible(true)
            .setNumUncollapsibleWidgets(1);

        // Add membership status widget
        newSection.addWidget(CardService.newDecoratedText()
            .setTopLabel('Membership Status')
            .setText(isPremium ? '💎 Premium Member' : '🆓 Free Member')
            .setBottomLabel(isPremium ? 'Thank you for being a premium member!' : 'Upgrade to premium for more features.')
            .setWrapText(false));

        // Create button based on membership status
        if (isPremium) {
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
                    .setText('💎 Upgrade to Premium')
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
    BuildResultSection: (result = {}) => {
        const grid = CardService.newGrid()
            .setId('resultGrid')
            .setTitle('Preview')
            .setNumColumns(1)
            .setBorderStyle(
                CardService.newBorderStyle()
                    .setType(CardService.BorderType.STROKE)
                    // No effect as of now
                    //.setStrokeColor('#4CAF50')
                    .setCornerRadius(0));
        // Add each property from result to the grid
        Object.keys(result).forEach((key) => {
            grid.addItem(
                CardService.newGridItem()
                    .setLayout(CardService.GridItemLayout.TEXT_ABOVE)
                    .setIdentifier(key)
                    .setTitle(key)
                    .setSubtitle(JSON.stringify(result[key])));
        });
        // Raw JSON view
        const rawResultTextParagraph = CardService.newTextParagraph()
            .setText('Raw:\n' + JSON.stringify(result))
            .setMaxLines(1);
        // Build the execution result card
        return CardService.newCardSection()
            .setHeader('🟢 200 OK')
            .addWidget(grid)
            .addWidget(rawResultTextParagraph);
    },
    BuildErrorSection: (errorText = '') => {
        return CardService.newCardSection()
            .setHeader('⛔ Error')
            .addWidget(
                CardService.newTextParagraph()
                    .setText(errorText)
            );
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

            const data = {
                ...appModelData,
                // You can add more data extraction logic here if needed
                developer_mode_switch: PropertiesService.getUserProperties().getProperty('developer_mode_switch') || 'OFF'
            };


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
                developer_mode_switch: PropertiesService.getUserProperties().getProperty('developer_mode_switch') || 'OFF'
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
    }
};

Plugins.GetMe = {
    id: 'GetMePlugin',
    name: 'Get Me',
    short_description: 'Retrieve Telegram bot information',
    description: 'The GetMe plugin allows you to retrieve information about your Telegram bot using the Bot API. Simply provide your bot token to get started.',
    version: '1.2.0',
    stars: '⭐⭐⭐⭐⭐',
    imageUrl: 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/google-workspace-marketplace/120x120.png',
    WelcomeSection: (data = {}) => {
        return CardService.newCardSection()
            //.setHeader('GetMe Extensions')
            .setCollapsible(true)
            .setNumUncollapsibleWidgets(1)
            // add main widget
            .addWidget(CardService.newDecoratedText()
                .setStartIcon(
                    CardService.newIconImage().setMaterialIcon(
                        CardService.newMaterialIcon().setName('smart_toy')))
                .setTopLabel(`Version ${Plugins.GetMe.version} ${Plugins.GetMe.stars}`)
                .setText(Plugins.GetMe.name)
                .setBottomLabel(Plugins.GetMe.short_description)
                .setWrapText(false)
                .setButton(
                    CardService.newTextButton()
                        //.setText('Get Started')
                        .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
                        .setAltText('Start using GetMe plugin')
                        //.setBackgroundColor('#4CAF50')
                        .setDisabled(false)
                        .setMaterialIcon(
                            CardService.newMaterialIcon()
                                .setName('extension')
                        )
                        .setOnClickAction(
                            CardService.newAction()
                                .setFunctionName('Plugins.Navigations.PushCard')
                                .setParameters({ path: 'Plugins.GetMe.HomeCard' })
                        )))
            // add more description below
            .addWidget(CardService.newTextParagraph()
                .setText(Plugins.GetMe.description)
            )
            // add separator
            .addWidget(CardService.newDivider())
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

        // Build the GetMe plugin card
        const cardBuilder = CardService.newCardBuilder()
            .setName(Plugins.GetMe.name)
            .setHeader(CardService.newCardHeader()
                .setTitle(Plugins.GetMe.name)
                .setSubtitle(Plugins.GetMe.short_description)
                .setImageStyle(CardService.ImageStyle.SQUARE)
                .setImageUrl(Plugins.GetMe.imageUrl)
                .setImageAltText('Card Image'))
            // Add section for inputs parameters
            .addSection(CardService.newCardSection()
                .setHeader('📄 Input Parameters')
                .setCollapsible(true)
                .setNumUncollapsibleWidgets(1)
                // Bot Token input
                .addWidget(
                    CardService.newTextInput()
                        .setFieldName('txt_bot_api_token')
                        .setTitle('🤖 Your Bot Token')
                        .setHint('Enter your Bot Token, get it from @BotFather')
                        .setValue(input_token || ''))
                // More info text
                .addWidget(
                    CardService.newTextParagraph()
                        .setText(Plugins.GetMe.description)
                )
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
            );

        const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();

        // If token is provided, call getMe API
        if (input_token) {
            // Log the request to Terminal Output sheet
            TerminalOutput.Write(activeSpreadsheet, 'Plugins.GetMe', 'Start', data, `Request to get bot info with token: ${input_token}`);

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
                TerminalOutput.Write(activeSpreadsheet, 'Plugins.GetMe', 'Response', result, `Retrieved bot info for token: ${input_token}`);

                // Add result section
                cardBuilder.addSection(Plugins.ViewModel.BuildResultSection(result));
            } catch (error) {
                TerminalOutput.Write(activeSpreadsheet, 'Plugins.GetMe', 'ERROR', data, error.toString());
                cardBuilder.addSection(Plugins.ViewModel.BuildErrorSection(error.toString()));
            }
        }
        else {
            TerminalOutput.Write(activeSpreadsheet, 'Plugins.GetMe', 'Info', data, 'No Bot Token provided, skipping API call.');
            // Placeholder section for "Result" section when no token is provided
            cardBuilder.addSection(
                CardService.newCardSection()
                    .setHeader('🟡 Wait for input')
                    .addWidget(
                        CardService.newTextParagraph()
                            .setText('Please enter your Bot Token and click "Send" to retrieve your bot information.'))
            );
        }

        if (data.developer_mode_switch === 'ON') {
            // Add data section
            cardBuilder.addSection(
                Plugins.ViewModel.BuildDataSection(data)
            );
        }

        // Add fixed footer with About and Help buttons
        cardBuilder.setFixedFooter(
            CardService.newFixedFooter()
                .setPrimaryButton(
                    CardService.newTextButton()
                        .setAltText('Send Request to get bot info')
                        //.setBackgroundColor('#E7EA55')
                        //.setTextButtonStyle(CardService.TextButtonStyle.FILLED)
                        .setMaterialIcon(
                            CardService.newMaterialIcon()
                                .setName('send')
                                .setFill(true)
                                .setWeight(0)
                                .setGrade(200)
                        )
                        .setText('Send')
                        .setOnClickAction(
                            CardService.newAction()
                                // List of widget IDs whose values are required for this action to be executed
                                .addRequiredWidget(['txt_bot_api_token'])
                                .setFunctionName('BotApiHandler.View.GetMe'))
                ));

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
    }
}

Plugins.GetChat = {
    id: 'GetChatPlugin',
    name: 'Get Chat',
    short_description: 'Retrieve Telegram chat information',
    description: 'The Get Chat plugin allows you to retrieve information about a Telegram chat (channel, group, or user) using the Bot API. Provide your bot token and the chat ID to get started.',
    version: '1.1.1',
    stars: '⭐⭐⭐⭐⭐',
    imageUrl: 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/google-workspace-marketplace/120x120.png',
    WelcomeSection: (data = {}) => {
        return CardService.newCardSection()
            //.setHeader('GetChat Extensions')
            .setCollapsible(true)
            .setNumUncollapsibleWidgets(1)
            // add main widget
            .addWidget(CardService.newDecoratedText()
                .setStartIcon(
                    CardService.newIconImage().setMaterialIcon(
                        CardService.newMaterialIcon().setName('chat_info')))
                .setTopLabel(`Version ${Plugins.GetChat.version} ${Plugins.GetChat.stars}`)
                .setText(Plugins.GetChat.name)
                .setBottomLabel(Plugins.GetChat.short_description)
                .setWrapText(false)
                .setButton(
                    CardService.newTextButton()
                        //.setText('Get Started')
                        .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
                        .setAltText('Start using Get Chat plugin')
                        //.setBackgroundColor('#4CAF50')
                        .setDisabled(false)
                        .setMaterialIcon(
                            CardService.newMaterialIcon()
                                .setName('extension')
                        )
                        .setOnClickAction(
                            CardService.newAction()
                                .setFunctionName('Plugins.Navigations.PushCard')
                                .setParameters({ path: 'Plugins.GetChat.HomeCard' })
                        )))
            // add more description below
            .addWidget(CardService.newTextParagraph()
                .setText(Plugins.GetChat.description)
            )
            // add separator
            .addWidget(CardService.newDivider())
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
        const token = data.txt_bot_api_token || '';
        const chatId = data.txt_chat_id || '';
        // Build the GetChat plugin card
        const cardBuilder = CardService.newCardBuilder()
            .setName(Plugins.GetChat.name)
            .setHeader(CardService.newCardHeader()
                .setTitle(Plugins.GetChat.name)
                .setSubtitle(Plugins.GetChat.short_description)
                .setImageStyle(CardService.ImageStyle.SQUARE)
                .setImageUrl(Plugins.GetChat.imageUrl)
                .setImageAltText('Card Image'))
            // Add section for inputs (token, chat id)
            .addSection(CardService.newCardSection()
                .setHeader('Input Parameters')
                .setCollapsible(true)
                .setNumUncollapsibleWidgets(2)
                // Bot Token input
                .addWidget(
                    CardService.newTextInput()
                        .setValue(token)
                        .setId('txt_bot_api_token')
                        .setFieldName('txt_bot_api_token')
                        .setTitle('🤖 Your Bot Token')
                        .setHint('Enter your Bot Token, get it from @BotFather'))
                // Chat ID input
                .addWidget(
                    CardService.newTextInput()
                        .setValue(chatId)
                        .setId('txt_chat_id')
                        .setFieldName('txt_chat_id')
                        .setTitle('📢 Chat ID')
                        .setHint('Enter the Chat ID to get information'))
                // More info text
                .addWidget(
                    CardService.newTextParagraph()
                        .setText(Plugins.GetChat.description)
                )
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
                ));

        const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();

        // Add result section if token is provided
        if (token !== '' && chatId !== '') {
            // Log the request to Terminal Output sheet
            TerminalOutput.Write(activeSpreadsheet, 'Plugins.GetChat', 'Start', data, `Request to get chat info with token: ${token}, chat ID: ${chatId}`);

            try {
                const telegramBotClient = new TelegramBotClient(token);
                const response = telegramBotClient.getChat(encodeURIComponent(chatId));

                if (response.getResponseCode() !== 200) {
                    throw new Error(`Failed to get chat info: ${response.getContentText()}`);
                }
                const result = JSON.parse(response.getContentText()).result;

                // Log the response to Terminal Output sheet
                TerminalOutput.Write(activeSpreadsheet, 'Plugins.GetChat', 'Response', result, `Retrieved chat info for token: ${token} and chat ID: ${chatId}`);

                cardBuilder.addSection(Plugins.ViewModel.BuildResultSection(result));
            } catch (error) {
                TerminalOutput.Write(activeSpreadsheet, 'Plugins.GetChat', 'ERROR', data, `Exception while getting chat info for token: ${token}, chat ID: ${chatId} - ${error.toString()}`);
                cardBuilder.addSection(
                    Plugins.ViewModel.BuildErrorSection(error.toString()));

            }
        }
        else {
            TerminalOutput.Write(activeSpreadsheet, 'Plugins.GetChat', 'Info', data, 'No Bot Token or Chat ID provided, skipping API call.');
            // Placeholder section for "Result" section when no token/chat ID is provided
            cardBuilder.addSection(
                CardService.newCardSection()
                    .setHeader('🟡 Wait for input')
                    .addWidget(
                        CardService.newTextParagraph()
                            .setText('Please enter your Bot Token and Chat ID, then click "Send" to retrieve chat information.'))
            );
        }

        // Add fixed footer with Get Chat Info button;
        cardBuilder.setFixedFooter(
            CardService.newFixedFooter()
                .setPrimaryButton(
                    CardService.newTextButton()
                        .setText('Send')
                        .setAltText('Send Request to get chat info')
                        //.setBackgroundColor('#E7EA55')
                        //.setTextButtonStyle(CardService.TextButtonStyle.FILLED)
                        .setMaterialIcon(
                            CardService.newMaterialIcon()
                                .setName('send')
                                .setFill(true)
                                .setWeight(0)
                                .setGrade(200)
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
            .setHeader(CardService.newCardHeader()
                .setTitle('Help - ' + Plugins.GetChat.name));
        return cardBuilder.build();
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
}


if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Plugins
    };
};

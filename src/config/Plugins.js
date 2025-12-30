class Plugins {
    get pluginList() {
        return [
            Plugins.GetMe,
            Plugins.GetChat,
            Plugins.JsonTools
        ];
    }
}

Plugins.ViewModel = {
    id: 'AppModelPlugin',
    name: 'Telegram Bot Studio',
    description: 'Plugins to manage Telegram Bot Studio features within Google Workspace.',
    version: '1.0.0',
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
                .setImageUrl(Plugins.ViewModel.imageUrl)
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
                .setImageUrl(Plugins.ViewModel.imageUrl)
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
                .setImageUrl(Plugins.ViewModel.imageUrl)
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
        cardBuilder.addSection(
            CardService.newCardSection()
                .setHeader('Settings')
                .setCollapsible(true)
                .setNumUncollapsibleWidgets(2)
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
    name: 'GetMe Plugin',
    description: 'Plugin to get bot information using GetMe method.',
    version: '1.0.3',
    imageUrl: 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/google-workspace-marketplace/120x120.png',
    WelcomeSection: (data = {}) => {
        return CardService.newCardSection()
            .setHeader('GetMe Extensions')
            .setCollapsible(true)
            .setNumUncollapsibleWidgets(1)
            .addWidget(CardService.newDecoratedText()
                .setTopLabel(Plugins.GetMe.version)
                .setText(Plugins.GetMe.name + ':')
                .setBottomLabel(Plugins.GetMe.description)
                .setWrapText(false)
                .setButton(
                    CardService.newTextButton()
                        .setText('🤖')
                        .setDisabled(false)
                        .setOnClickAction(
                            CardService.newAction()
                                .setFunctionName('Plugins.Navigations.PushCard')
                                .setParameters({ path: 'Plugins.GetMe.HomeCard' })
                        )));
    },
    HomeCard: (data = {}) => {
        const token = data.txt_bot_api_token || '';

        // Build the GetMe plugin card
        const cardBuilder = CardService.newCardBuilder()
            .setName(Plugins.GetMe.name)
            .setHeader(CardService.newCardHeader()
                .setTitle('GetMe Bot Information')
                .setSubtitle('GetMe Card')
                .setImageStyle(CardService.ImageStyle.SQUARE)
                .setImageUrl(Plugins.GetMe.imageUrl)
                .setImageAltText('Card Image'))
            // Add section for inputs and button
            .addSection(CardService.newCardSection()
                .setHeader('🗃️ Get (Me)')
                .setCollapsible(true)
                .setNumUncollapsibleWidgets(token ? 1 : 2)
                // Bot Token input
                .addWidget(
                    CardService.newTextInput()
                        .setFieldName('txt_bot_api_token')
                        .setTitle('🤖 Your Bot Token')
                        .setHint('Enter your Bot Token, get it from @BotFather')
                        .setValue(token))
                // Get Me button
                .addWidget(
                    CardService.newTextButton()
                        .setText('🤖 Get Bot Info')
                        .setOnClickAction(
                            CardService.newAction()
                                // List of widget IDs whose values are required for this action to be executed
                                .addRequiredWidget(['txt_bot_api_token'])
                                .setFunctionName('BotApiHandler.View.GetMe'))));

        // Add result section if token is provided
        if (token !== '') {
            const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
            // Log the request to Terminal Output sheet
            TerminalOutput.Write(activeSpreadsheet, 'Plugins.GetMe', 'Start', data, `Request to get bot info with token: ${token}`);

            const telegramBotClient = new TelegramBotClient(token);
            const response = telegramBotClient.getMe();
            if (response.getResponseCode() !== 200) {
                TerminalOutput.Write(activeSpreadsheet, 'Plugins.GetMe', 'ERROR:HomeCard', response.getContentText(), `Failed to get bot info for token: ${token}`);
                throw new Error("Failed to get bot info");
            }
            const result = JSON.parse(response.getContentText()).result;

            // Log the response to Terminal Output sheet
            TerminalOutput.Write(activeSpreadsheet, 'Plugins.GetMe', 'Response', result, `Retrieved bot info for token: ${token}`);

            cardBuilder.addSection(Plugins.GetMe.ResultSection(result));
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
                        .setText('About')
                        .setOnClickAction(
                            CardService.newAction()
                                .setFunctionName('Plugins.Navigations.PushCard')
                                .setParameters({ path: 'Plugins.GetMe.AboutCard' })
                        ))
                .setSecondaryButton(
                    CardService.newTextButton()
                        .setText('Help')
                        .setOnClickAction(
                            CardService.newAction()
                                .setFunctionName('Plugins.Navigations.PushCard')
                                .setParameters({ path: 'Plugins.GetMe.HelpCard' })
                        )));

        return cardBuilder.build();
    },
    ResultSection: (result = {}) => {
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
            .setCollapsible(true)
            .setNumUncollapsibleWidgets(2)
            .addWidget(rawResultTextParagraph)
            .addWidget(grid);
    },
    AboutCard: (data = {}) => {
        const cardBuilder = CardService.newCardBuilder()
            .setName('About ' + Plugins.GetMe.name)
            .setHeader(CardService.newCardHeader()
                .setTitle('About ' + Plugins.GetMe.name)
                .setSubtitle(Plugins.GetMe.description)
                .setImageStyle(CardService.ImageStyle.SQUARE)
                .setImageUrl(Plugins.GetMe.imageUrl)
                .setImageAltText('Card Image'))
            .addSection(CardService.newCardSection()
                .addWidget(
                    CardService.newTextParagraph()
                        .setText(`**${Plugins.GetMe.name}** v${Plugins.GetMe.version}\n\n${Plugins.GetMe.description}\n\nDeveloped by Telegram Bot Studio.`)));

        return cardBuilder.build();
    },
    HelpCard: (data = {}) => {
        const cardBuilder = CardService.newCardBuilder()
            .setName('Help - ' + Plugins.GetMe.name)
            .setHeader(CardService.newCardHeader()
                .setTitle('Help - ' + Plugins.GetMe.name)
                .setSubtitle('Help and Support')
                .setImageStyle(CardService.ImageStyle.SQUARE)
                .setImageUrl(Plugins.GetMe.imageUrl)
                .setImageAltText('Help Image'))
            .addSection(CardService.newCardSection()
                .addWidget(
                    CardService.newTextParagraph()
                        .setText('This is the help section for the GetMe plugin. Here you can find information and support.')));

        return cardBuilder.build();
    }
}

Plugins.GetChat = {
    id: 'GetChatPlugin',
    name: 'GetChat Plugin',
    description: 'Plugin to get chat information using getChat method.',
    version: '1.0.2',
    imageUrl: 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/google-workspace-marketplace/120x120.png',
    WelcomeSection: (data = {}) => {
        return CardService.newCardSection()
            .setHeader('GetChat Extensions')
            .setCollapsible(true)
            .setNumUncollapsibleWidgets(1)
            .addWidget(CardService.newDecoratedText()
                .setTopLabel(Plugins.GetChat.version)
                .setText(Plugins.GetChat.name + ':')
                .setBottomLabel(Plugins.GetChat.description)
                .setWrapText(false)
                .setButton(
                    CardService.newTextButton()
                        .setText('📢')
                        .setDisabled(false)
                        .setOnClickAction(
                            CardService.newAction()
                                .setFunctionName('Plugins.Navigations.PushCard')
                                .setParameters({ path: 'Plugins.GetChat.HomeCard' })
                        )));
    },
    HomeCard: (data = {}) => {
        const token = data.txt_bot_api_token || '';
        const chatId = data.txt_chat_id || '';
        // Build the GetChat plugin card
        const cardBuilder = CardService.newCardBuilder()
            .setName(Plugins.GetChat.name)
            .setHeader(CardService.newCardHeader()
                .setTitle('GetChat Chat Information')
                .setSubtitle('Usage the api getChat Method to get information about a chat.')
                .setImageStyle(CardService.ImageStyle.SQUARE)
                .setImageUrl(Plugins.GetChat.imageUrl)
                .setImageAltText('Card Image'))
            // Add section for inputs (token, chat id)
            .addSection(CardService.newCardSection()
                .setHeader('🗃️ Get (Chat)')
                .setCollapsible(true)
                .setNumUncollapsibleWidgets(3)
                // Bot Token input
                .addWidget(
                    CardService.newTextInput()
                        .setValue(token)
                        //.setId('txt_bot_api_token')
                        .setFieldName('txt_bot_api_token')
                        .setTitle('🤖 Your Bot Token')
                        .setHint('Enter your Bot Token, get it from @BotFather'))
                // Chat ID input
                .addWidget(
                    CardService.newTextInput()
                        .setValue(chatId)
                        //.setId('txt_chat_id')
                        .setFieldName('txt_chat_id')
                        .setTitle('📢 Chat ID')
                        .setHint('Enter the Chat ID to get information'))
                // Get Chat Info button
                .addWidget(
                    CardService.newTextButton()
                        .setText('📢 Get Chat Info')
                        .setOnClickAction(
                            CardService.newAction()
                                // List of widget IDs whose values are required for this action to be executed
                                .addRequiredWidget(['txt_bot_api_token'])
                                .addRequiredWidget(['txt_chat_id'])
                                .setFunctionName('BotApiHandler.View.GetChat'))));


        // Add result section if token is provided
        if (token !== '' && chatId !== '') {
            const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
            // Log the request to Terminal Output sheet
            TerminalOutput.Write(activeSpreadsheet, 'Plugins.GetChat', 'Start', data, `Request to get chat info with token: ${token}, chat ID: ${chatId}`);

            const telegramBotClient = new TelegramBotClient(token);
            const response = telegramBotClient.getChat(encodeURIComponent(chatId));
            if (response.getResponseCode() !== 200) {
                TerminalOutput.Write(activeSpreadsheet, 'Plugins.GetChat', 'ERROR', response.getContentText(), `Failed to get chat info for token: ${token} and chat ID: ${chatId}`);
                throw new Error("Failed to get chat info");
            }
            const result = JSON.parse(response.getContentText()).result;

            // Log the response to Terminal Output sheet
            TerminalOutput.Write(activeSpreadsheet, 'Plugins.GetChat', 'Response', result, `Retrieved chat info for token: ${token} and chat ID: ${chatId}`);

            cardBuilder.addSection(Plugins.GetChat.ResultSection(result));
        }

        // if developer mode is on, add data section
        if (data.developer_mode_switch === 'ON') {
            cardBuilder.addSection(
                Plugins.ViewModel.BuildDataSection(data)
            );
        }

        // Add fixed footer with Get Chat Info button;
        cardBuilder.setFixedFooter(
            CardService.newFixedFooter()
                .setPrimaryButton(
                    CardService.newTextButton()
                        .setText('About')
                        .setOnClickAction(
                            CardService.newAction()
                                .setFunctionName('Plugins.Navigations.PushCard')
                                .setParameters({ path: 'Plugins.GetChat.AboutCard' })
                        ))
                .setSecondaryButton(
                    CardService.newTextButton()
                        .setText('Help')
                        .setOnClickAction(
                            CardService.newAction()
                                .setFunctionName('Plugins.Navigations.PushCard')
                                .setParameters({ path: 'Plugins.GetChat.HelpCard' })
                        )));

        return cardBuilder.build();
    },
    ResultSection: (result = {}) => {
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
            .setCollapsible(true)
            .setNumUncollapsibleWidgets(2)
            .addWidget(rawResultTextParagraph)
            .addWidget(grid);
    },
    AboutCard: (data = {}) => {
        const cardBuilder = CardService.newCardBuilder()
            .setName('About ' + Plugins.GetChat.name)
            .setHeader(CardService.newCardHeader()
                .setTitle('About ' + Plugins.GetChat.name));
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

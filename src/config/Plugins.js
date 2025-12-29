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
                            .setText('Learn More')
                            .setOnClickAction(
                                CardService.newAction()
                                    .setFunctionName('AppHandler.ViewModel.OpenAboutCard')))
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
        return cardBuilder.build();
    }
};

Plugins.Navigations = {
    PushCard: (e) => {
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
                ...appModelData
                // You can add more data extraction logic here if needed
            };

            // Call the plugin action to get the card
            return CardService.newActionResponseBuilder()
                .setNavigation(
                    CardService.newNavigation()
                        .pushCard(Plugins[plugin][action](data))
                ).build();

        }

        throw new Error(`Plugin path "${path}" not found.`);
    }
};

Plugins.GetMe = {
    id: 'GetMePlugin',
    name: 'GetMe Plugin',
    description: 'Plugin to get bot information using GetMe method.',
    version: '1.0.0',
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
        // Build the GetMe plugin card
        const cardBuilder = CardService.newCardBuilder()
            .setName(Plugins.GetMe.name)
            .setHeader(CardService.newCardHeader()
                .setTitle('GetMe Bot Information')
                .setSubtitle('GetMe Card')
                .setImageStyle(CardService.ImageStyle.SQUARE)
                .setImageUrl(Plugins.GetMe.imageUrl)
                .setImageAltText('Card Image'))
            .addSection(CardService.newCardSection()
                .setHeader('GetMe Bot Information')
                .setCollapsible(true)
                .setNumUncollapsibleWidgets(1)
                // Bot Token input
                .addWidget(
                    CardService.newTextInput()
                        .setFieldName('txt_bot_api_token')
                        .setTitle('🤖 Your Bot Token')
                        .setHint('Enter your Bot Token, get it from @BotFather')
                        .setValue(data.botToken || '')))
            .addSection(CardService.newCardSection()
                .addWidget(
                    CardService.newTextParagraph()
                        .setText('Use this card to get bot information using the GetMe method.')))
            .addSection(CardService.newCardSection()
                .addWidget(
                    CardService.newTextParagraph()
                        .setText('Explore more features with the premium membership!')))
            // Add JSON Tools Welcome Section
            .addSection(Plugins.JsonTools.WelcomeSection(data))
            // Add fixed footer with Get Bot Info button
            .setFixedFooter(
                CardService.newFixedFooter()
                    .setPrimaryButton(
                        CardService.newTextButton()
                            .setText('Get Bot Info')
                            .setOnClickAction(
                                CardService.newAction()
                                    // List of widget IDs whose values are required for this action to be executed
                                    .addRequiredWidget(['txt_bot_api_token'])
                                    .setFunctionName('BotApiHandler.View.onGetMeClick'))));

        return cardBuilder.build();
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
    description: 'Plugin to get chat information using GetChat method.',
    version: '1.0.0',
    imageUrl: 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/google-workspace-marketplace/120x120.png',
    WelcomeSection: (data = {}) => {
        return CardService.newCardSection()
            .setHeader('GetChat Extensions')
            .setCollapsible(true)
            .setNumUncollapsibleWidgets(1)
            .addWidget(CardService.newDecoratedText()
                .setTopLabel(Plugins.GetChat.version)
                .setText(Plugins.GetChat.name + ':')
                .setBottomLabel(Plugins.GetChat.description));
    },
    HomeCard: (data = {}) => {
        // Build the GetChat plugin card
        const cardBuilder = CardService.newCardBuilder()
            .setName(Plugins.GetChat.name)
            .setHeader(CardService.newCardHeader()
                .setTitle('GetChat Information')
                .setSubtitle('GetChat Card')
                .setImageStyle(CardService.ImageStyle.SQUARE)
                .setImageUrl(Plugins.GetChat.imageUrl)
                .setImageAltText('Card Image'))
            // Add section for inputs (token, chat id)
            .addSection(CardService.newCardSection()
                .setHeader('GetChat Information')
                .setCollapsible(true)
                .setNumUncollapsibleWidgets(1)
                // Bot Token input
                .addWidget(
                    CardService.newTextInput()
                        .setFieldName('txt_bot_api_token')
                        .setTitle('🤖 Your Bot Token')
                        .setHint('Enter your Bot Token, get it from @BotFather'))
                // Chat ID input
                .addWidget(
                    CardService.newTextInput()
                        .setFieldName('txt_chat_id')
                        .setTitle('💬 Chat ID')
                        .setHint('Enter the Chat ID to get information')));

        return cardBuilder.build();
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
    description: 'Plugin to work with JSON data.',
    version: '1.0.0',
    imageUrl: 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/google-workspace-marketplace/120x120.png',
    WelcomeSection: (data = {}) => {
        return CardService.newCardSection()
            .setHeader('Useful JSON Tools')
            .setCollapsible(true)
            .setNumUncollapsibleWidgets(1)
            // Add button set for JSON Tools
            .addWidget(CardService.newButtonSet()
                // Add Pretty Print JSON button
                .addButton(CardService.newTextButton()
                    .setText('🎨 Beautify JSON')
                    .setOnClickAction(
                        CardService.newAction()
                            .setFunctionName('JsonHandler.View.BeautifyJson')
                    ))
                // Add Minify JSON button
                .addButton(CardService.newTextButton()
                    .setText('🗜️ Minify JSON')
                    .setOnClickAction(
                        CardService.newAction()
                            .setFunctionName('JsonHandler.View.MinifyJson')
                    ))
                // Add Validate JSON button
                .addButton(CardService.newTextButton()
                    .setText('✅ Validate JSON')
                    .setOnClickAction(
                        CardService.newAction()
                            .setFunctionName('JsonHandler.View.ValidateJson')
                    )));
    }
}


if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Plugins
    };
};

class Plugins {
}

Plugins.ViewModel = {
    id: 'AppModelPlugin',
    name: 'Telegram Bot Studio',
    description: 'Plugins to manage Telegram Bot Studio features within Google Workspace.',
    version: '1.0.0',
    imageUrl: 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/google-workspace-marketplace/120x120.png',
    plugins: [
        Plugins.GetMe,
        //Plugins.GetChat
    ],
    BuildHomeCard: (data = {}) => {
        // Build the App Model plugin card
        const cardBuilder = CardService.newCardBuilder()
            .setName(Plugins.id)
            .setHeader(CardService.newCardHeader()
                .setTitle(Plugins.name)
                .setSubtitle(Plugins.description)
                .setImageStyle(CardService.ImageStyle.SQUARE)
                .setImageUrl(Plugins.imageUrl)
                .setImageAltText(Plugins.name + ' Image'));

        // for each plugin, add a section
        Plugins.ViewModel.plugins.forEach((plugin) => {
            if (!plugin || !plugin.WelcomeSection) return;
            cardBuilder.addSection(
                plugin.WelcomeSection(data));
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
                                    .setFunctionName('AppModelHandler.View.onExploreMoreFeaturesClick')))
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
                                    .setFunctionName('AppModelHandler.View.onUpgradeToPremiumClick')))
                    .setSecondaryButton(
                        CardService.newTextButton()
                            .setText('Learn More')
                            .setOnClickAction(
                                CardService.newAction()
                                    .setFunctionName('AppModelHandler.View.onLearnMoreClick')))
            );
        }

        return cardBuilder.build();
    },
    BuildAboutCard: (data = {}) => {
        const cardBuilder = CardService.newCardBuilder()
            .setName('About ' + Plugins.name)
            .setHeader(CardService.newCardHeader()
                .setTitle('About ' + Plugins.name)
                .setSubtitle(Plugins.description)
                .setImageStyle(CardService.ImageStyle.SQUARE)
                .setImageUrl(Plugins.imageUrl)
                .setImageAltText('Card Image'))
            .addSection(CardService.newCardSection()
                .addWidget(
                    CardService.newTextParagraph()
                        .setText(`**${Plugins.name}** v${Plugins.version}\n\n${Plugins.description}\n\nDeveloped by Telegram Bot Studio.`)));
        return cardBuilder.build();
    },
    BuildHelpCard: (data = {}) => {
        const cardBuilder = CardService.newCardBuilder()
            .setName('Help - ' + Plugins.name)
            .setHeader(CardService.newCardHeader()
                .setTitle('Help - ' + Plugins.name)
                .setSubtitle('Help and Support')
                .setImageStyle(CardService.ImageStyle.SQUARE)
                .setImageUrl(Plugins.imageUrl)
                .setImageAltText('Help Image'))
            .addSection(CardService.newCardSection()
                .addWidget(
                    CardService.newTextParagraph()
                        .setText('This is the help section for the App Model plugin. Here you can find information and support.')));
        return cardBuilder.build();
    },
    BuildUserProfileCard: (data = {}) => {
        const cardBuilder = CardService.newCardBuilder()
            .setName('Profile - ' + Plugins.name)
            .setHeader(CardService.newCardHeader()
                .setTitle('Profile - ' + Plugins.name)
                .setSubtitle('User Profile')
                .setImageStyle(CardService.ImageStyle.SQUARE)
                .setImageUrl(Plugins.imageUrl)
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

        // path = 'Plugins.GetMe.HomeCard', 'Plugins.GetChat.HomeCard', etc.
        if (path && Plugins[path]) {
            const appModelData = AppModel.create()
                .toJSON();

            const data = {
                ...appModelData
                // You can add more data extraction logic here if needed
            };
            return Plugins[path](data);
        }
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
                        .setDisabled(!!!data.isPremium)
                        .setOnClickAction(
                            CardService.newAction()
                                .setFunctionName('Plugins.Navigations.onPushCardClick')
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
};


if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Plugins
    };
};

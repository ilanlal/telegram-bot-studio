// Entity Metadata Configuration Class
class EMD {
    constructor(model = {}) {
        this.model = model;
    }

    static get Common() {
        return {
            entityName: 'Common',
            card: (data = {}) => {
                return {
                    name: 'common_Card',
                    header: {
                        title: 'Common Card',
                        subTitle: 'Common functionalities and information.',
                        imageUrl: EMD.DEFAULT_IMAGE_URL,
                        imageStyle: CardService.ImageStyle.SQUARE,
                        imageAltText: 'Common Image'
                    },
                    sections: [
                        {
                            // header: 'Common Information',
                            widgets: [
                                {
                                    id: 'common_text_paragraph',
                                    TextParagraph: {
                                        text: 'This card contains common functionalities and information.'
                                    }
                                }
                            ]
                        },
                        {   // Data view
                            header: 'Data View',
                            collapsible: true,
                            numUncollapsibleWidgets: 0,
                            widgets: [
                                {   // Data View widget
                                    id: 'data_view_widget',
                                    TextParagraph: {
                                        text: `Data: ${JSON.stringify(data, null, 2)}`,
                                        maxLines: 35
                                    }
                                }
                            ]
                        }
                    ]
                };
            }
        };
    }
}

EMD.DEFAULT_IMAGE_URL = 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/google-workspace-marketplace/120x120.png';
EMD.WELCOME_IMG_URL = 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/google-workspace-marketplace/480X480_welcome.png';
EMD.MATH_IMG_URL = 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/bitmoji-math.webp';
EMD.THANK_YOU_IMG_URL = 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/bitmoji-thank-you.webp';
EMD.YOU_GOT_IT_IMG_URL = 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/bitmoji-you-got-it.webp';
EMD.BIG_TIME_IMG_URL = 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/bitmoji-big-time.webp';
EMD.PEACH_IMG_URL = 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/bitmoji-peach.webp';
EMD.HAVE_A_NICE_DAY_IMG_URL = 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/bitmoji-have-a-nice-day.webp';
EMD.I_AM_THINKING_IMG_URL = 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/bitmoji-i-am-thinking.webp';
EMD.WAIT_FOR_IT_IMG_URL = 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/bitmoji-wait-for-it.webp';
EMD.YES_IMG_URL = 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/bitmoji-yes.webp';
EMD.PAY_ATTENTION_IMG_URL = 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/bitmoji-pay-attention.webp';
EMD.KISS_IMG_URL = 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/bitmoji-kiss.webp';
EMD.CHEERS_IMG_URL = 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/bitmoji-cheers.webp';
EMD.BLINK_IMG_URL = 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/bitmoji-blink.webp';
EMD.LOGO_PNG_URL = 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/google-workspace-marketplace/240x240.png';
EMD.GIT_REPO_URL = 'https://github.com/ilanlal/telegram-bot-studio';

EMD.Home = {
    entityName: 'Home',
    card: (data = {}) => {
        return {
            name: 'homeCard',
            header:
            {
                title: '🤖 Home',
                subTitle: 'Telegram Bot Studio',
                imageUrl: EMD.DEFAULT_IMAGE_URL,
                imageStyle: CardService.ImageStyle.SQUARE,
                imageAltText: 'Telegram Bot Studio Home Image'
            },
            sections: [
                {   // Connection management section
                    header: '🛜 Bot Connection',
                    collapsible: true,
                    numUncollapsibleWidgets: 1,
                    widgets: [
                        {  // TextButton to push 'BotConnections' card
                            id: 'bot_connections_button',
                            TextButton: {
                                text: '🛜 New',
                                onClick: {
                                    functionName: 'NavigationHandler.ViewModel.onPushCardClick',
                                    parameters: { template: 'EMD.Cards.BotConnections' }
                                }
                            }
                        }
                    ]
                },
                {   // GetMe extensions section
                    header: 'GetMe Extensions',
                    collapsible: true,
                    numUncollapsibleWidgets: 1,
                    widgets: [
                        {  // DecoratedText with TextButton to push 'GetMePlugin' card
                            id: 'get_me_plugin_button',
                            DecoratedText: {
                                text: '🤖 GetMe:',
                                bottomLabel: 'Want to test the bot identity?',
                                wrapText: false,
                                textButton: {
                                    text: '🤖',
                                    onClick: {
                                        functionName: 'NavigationHandler.ViewModel.onPushCardClick',
                                        parameters: { template: 'EMD.Cards.GetMePlugin' }
                                    }
                                }
                            }
                        },
                        {   // GetMe Extensions TextParagraph widget
                            id: 'get_me_extensions_widget',
                            TextParagraph: {
                                text: 'Explore and manage GetMe extensions using the buttons below.'
                            }
                        }
                    ]
                },
                {   // GetChat extensions section
                    header: 'GetChat Extensions',
                    collapsible: true,
                    numUncollapsibleWidgets: 1,
                    widgets: [
                        {   // DecoratedText with TextButton to push 'GetChatPlugin' card
                            id: 'get_chat_plugin_button',
                            DecoratedText: {
                                text: '📢 GetChat:',
                                bottomLabel: 'Want to explore chat functionalities?',
                                wrapText: false,
                                textButton: {
                                    disabled: !!!data.appModel?.isPremium,
                                    text: '📢',
                                    onClick: {
                                        functionName: 'NavigationHandler.ViewModel.onPushCardClick',
                                        parameters: { template: 'EMD.Cards.GetChatPlugin' }
                                    }
                                }
                            }
                        },
                        {   // GetChat Extensions TextParagraph widget
                            id: 'get_chat_extensions_widget',
                            TextParagraph: {
                                text: 'Explore and manage GetChat extensions using the buttons below.'
                            }
                        }
                    ]
                },
                {   // Data view
                    header: 'Data View',
                    collapsible: true,
                    numUncollapsibleWidgets: 0,
                    widgets: [
                        {   // Data View widget
                            id: 'data_view_widget',
                            TextParagraph: {
                                text: `${JSON.stringify(data, null, 2)}`,
                                maxLines: 35
                            }
                        }
                    ]
                }
            ],
            fixedFooter: {
                primaryButton: {
                    textButton: {
                        disabled: !!data.appModel?.isPremium,
                        text: '🏆 Free',
                        onClick: {
                            functionName: 'NavigationHandler.ViewModel.onPushCardClick',
                            parameters: { template: 'EMD.Cards.MembershipSubscription' }
                        }
                    }
                },
                secondaryButton: {
                    textButton: {
                        text: '💝 Show Thanks',
                        onClick: {
                            functionName: 'NavigationHandler.ViewModel.onPushCardClick',
                            parameters: { template: 'EMD.Cards.ThankYou' }
                        }
                    }
                }
            }
        };
    }
}

EMD.Help = {
    entityName: 'Help',
    card: (data = {}) => {
        return {
            name: 'help_Card',
            header: {
                title: 'Help & Support',
                subTitle: 'Get help and support for this Addon.',
                imageUrl: EMD.BIG_TIME_IMG_URL,
                imageStyle: CardService.ImageStyle.SQUARE,
                imageAltText: 'Help Image'
            },
            sections: [
                {
                    // header: 'Help & Support',
                    widgets: [
                        {
                            id: 'help_text_paragraph',
                            TextParagraph: {
                                text: 'If you need assistance, please contact our support team or visit our help center.'
                            }
                        }
                    ]
                },
                {   // Data view
                    header: 'Data View',
                    collapsible: true,
                    numUncollapsibleWidgets: 0,
                    widgets: [
                        {   // Data View widget
                            id: 'data_view_widget',
                            TextParagraph: {
                                text: `Data: ${JSON.stringify(data, null, 2)}`,
                                maxLines: 35
                            }
                        }
                    ]
                }
            ]
        };
    }
}

EMD.About = {
    entityName: 'About',
    card: (data = {}) => {
        return {
            name: 'about_Card',
            header: {
                title: 'About This Addon',
                subTitle: 'Learn more about this Addon.',
                imageUrl: EMD.BLINK_IMG_URL,
                imageStyle: CardService.ImageStyle.SQUARE,
                imageAltText: 'About Image'
            },
            sections: [
                {
                    // header: 'About This Addon',
                    widgets: [
                        {
                            id: 'about_text_paragraph',
                            TextParagraph: {
                                text: 'This addon is designed to help you manage your tasks efficiently.'
                            }
                        },
                        { // Version Info widget
                            id: 'version_info_widget',
                            TextParagraph: {
                                text: `Version: ${data.appModel?.version || 'N/A'} (Build: ${data.appModel?.build || 'N/A'})`
                            }
                        }
                    ]
                },
                {   // Data view
                    header: 'Data View',
                    collapsible: true,
                    numUncollapsibleWidgets: 0,
                    widgets: [
                        {   // Data View widget
                            id: 'data_view_widget',
                            TextParagraph: {
                                text: `Data: ${JSON.stringify(data, null, 2)}`,
                                maxLines: 35
                            }
                        }
                    ]
                }
            ]
        };
    }
}

EMD.Account = {
    entityName: 'Account',
    card: (data = {}) => {
        return {
            name: 'account_Card',
            header: {
                title: 'Account Management',
                subTitle: 'Manage your account settings and preferences.',
                imageUrl: EMD.PEACH_IMG_URL,
                imageStyle: CardService.ImageStyle.SQUARE,
                imageAltText: 'Account Image'
            },
            sections: [
                {
                    // header: 'Account Management',
                    widgets: [
                        {
                            id: 'account_text_paragraph',
                            TextParagraph: {
                                text: 'Manage your account settings and preferences here.'
                            }
                        },
                        { // user Info widget
                            id: 'user_info_widget',
                            TextParagraph: {
                                text: `User is ${data.appModel?.isPremium ? 'a Premium' : 'a Free'} user.`
                            }
                        }
                    ]
                },
                {   // Data view
                    header: 'Data View',
                    collapsible: true,
                    numUncollapsibleWidgets: 0,
                    widgets: [
                        {   // Data View widget
                            id: 'data_view_widget',
                            TextParagraph: {
                                text: `${JSON.stringify(data, null, 2)}`,
                                maxLines: 35
                            }
                        }
                    ]
                }
            ]
        };
    }
}

EMD.Logger = {
    entityName: 'eventLog',
    sheet: (data = {}) => {
        return {
            name: '📜 Event Log',
            columns: ['Created On', 'DC', 'Action', 'chat_id', 'content', 'event', 'note'],
            sample_data: []
        };
    }
}

EMD.TerminalOutput = {
    entityName: 'TerminalOutput',
    sheet: (data = {}) => {
        return {
            name: '💻 Terminal Output',
            columns: ['Timestamp', 'Source', 'Message', 'Event Object', 'More Info']
        };
    }
}

EMD.BotSetup = {
    entityName: 'BotSetup',
    card: (data = {}) => {
        return {
            name: 'bot_setup_Card',
            header: {
                title: '🤖 Bot Setup',
                subTitle: 'Configure your bot environment variables here.',
                imageUrl: EMD.YES_IMG_URL,
                imageStyle: CardService.ImageStyle.SQUARE,
                imageAltText: 'Environment Image'
            }
            ,
            sections:
                [
                    {   // Bot Configuration section
                        header: 'Step 1. Bot Configuration',
                        collapsible: true,
                        numUncollapsibleWidgets: 1,
                        widgets: [
                            {   // TextInput for bot token
                                id: 'bot_token_input_widget',
                                TextInput: {
                                    title: 'Enter your Bot Token, get it from @BotFather',
                                    fieldName: 'bot_token_input',
                                    hint: 'Bot Token',
                                    multiline: false,
                                    inputMode: CardService.TextInputMode.PLAIN_TEXT,
                                    value: data.botToken || ''
                                }
                            },
                            {   // TextParagraph widget
                                id: 'basic_bot_operation_text_paragraph',
                                TextParagraph: {
                                    text: 'Use the input fields below to configure your basic bot settings.'
                                }
                            },
                            {   // TextButton to call getMe API
                                id: 'get_me_button',
                                TextButton: {
                                    text: '🔍 Get Me',
                                    onClick: {
                                        functionName: 'BotApiHandler.View.onGetMeClick'
                                    }
                                }
                            }
                        ]
                    },
                    {   // Step 2. Deployment setup
                        // header: '🚀 Deployment Setup',
                        collapsible: true,
                        numUncollapsibleWidgets: 1,
                        widgets: [
                            {   // TextInput for Deployment ID
                                id: 'deployment_id_variable',
                                TextInput: {
                                    title: 'Production Deployment ID',
                                    fieldName: 'txt_deployment_id',
                                    hint: 'Enter production deployment ID'
                                }
                            },
                            { // getWebhookInfo Button
                                id: 'get_webhook_info_button',
                                TextButton: {
                                    text: '🌐 Get Webhook Info',
                                    onClick: {
                                        functionName: 'BotApiHandler.View.onGetWebhookInfoClick'
                                    }
                                }
                            }
                        ]
                    },
                    {   // Webhook setup
                        // header: '🔗 Webhook Setup',
                        collapsible: true,
                        numUncollapsibleWidgets: 1,
                        widgets: [
                            {
                                id: 'webhook_setup_info',
                                TextParagraph: {
                                    text: `🔗 Webhook currently: ${data.setupFlow?.webhookSet ? '✅ Active' : '🔴 Inactive'}`
                                }
                            },
                            { // Webhook URL info
                                id: 'webhook_url_info',
                                TextParagraph: {
                                    text: JSON.stringify(data.getWebhookInfoResult || {}, null, 2),
                                    maxLines: 35
                                }
                            },
                            { // DecoratedText for prod webhook action (set,delete)
                                id: 'prod_webhook_action',
                                DecoratedText: {
                                    text: 'Production Webhook Action',
                                    topLabel: `🔗 Webhook Action`,
                                    bottomLabel: `${data.setupFlow?.webhookSet ? 'Delete or update your webhook' : 'Set up your webhook'}`,
                                    wrapText: false,
                                    textButton: {
                                        disabled: (data.environmentVariables?.deploymentIdSet ? false : true) || (data.environmentVariables?.botTokenSet ? false : true),
                                        text: `${data.setupFlow?.webhookSet ? '🗑️ Delete Webhook' : '📡 Set Webhook'}`,
                                        onClick: {
                                            functionName: 'BotApiHandler.Addon.onWebhookToggleClick',
                                            parameters: {
                                                action: data.setupFlow?.webhookSet ? 'deleteWebhook' : 'setWebhook',
                                                environment: 'exec'
                                            }
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    {   // Bot info settings
                        // header: '🤖 Bot Information',
                        collapsible: true,
                        numUncollapsibleWidgets: 1,
                        widgets: [
                            {   // Bot info paragraph title
                                id: 'bot_info',
                                TextParagraph: {
                                    text: 'Set up your bot information \n\n(name, short description, commands, etc.) from the spreadsheet below.',
                                    maxLines: 10
                                }
                            },
                            {   // Bind Sheet with sample Data Button
                                id: 'bot_info_bind_sheet_button',
                                TextButton: {
                                    text: '📄 Bind Sheet with Sample Data',
                                    onClick: {
                                        functionName: 'SpreadsheetHandler.Addon.onInsertSampleDataClick',
                                        parameters: { sheet: 'EMD.Spreadsheet.BotSetup' }
                                    }
                                }
                            },
                            {   // setMyName Button
                                id: 'bot_info_set_my_name_button',
                                TextButton: {
                                    text: '🌐 api/setMyName',
                                    onClick: {
                                        functionName: 'BotApiHandler.Addon.onSetMyNameClick',
                                        parameters: {}
                                    }
                                }
                            },
                            {   // setMyDescription Button
                                id: 'bot_info_set_my_description_button',
                                TextButton: {
                                    text: '🌐 api/setMyDescription',
                                    onClick: {
                                        functionName: 'BotApiHandler.Addon.onSetMyDescriptionClick',
                                        parameters: {}
                                    }
                                }
                            },
                            {  // setMyShortDescription Button
                                id: 'bot_info_set_my_short_description_button',
                                TextButton: {
                                    text: '🌐 api/setMyShortDescription',
                                    onClick: {
                                        functionName: 'BotApiHandler.Addon.onSetMyShortDescriptionClick',
                                        parameters: {}
                                    }
                                }
                            },
                            {  // setMyCommands Button
                                id: 'bot_info_set_my_commands_button',
                                TextButton: {
                                    text: '🌐 api/setMyCommands',
                                    onClick: {
                                        functionName: 'BotApiHandler.Addon.onSetMyCommandsClick',
                                        parameters: {}
                                    }
                                }
                            }
                        ]
                    },
                    {   // Data view
                        header: 'Data View',
                        collapsible: true,
                        numUncollapsibleWidgets: 0,
                        widgets: [
                            {   // Data View widget
                                id: 'data_view_widget',
                                TextParagraph: {
                                    text: `Data: ${JSON.stringify(data, null, 2)}`,
                                    maxLines: 35
                                }
                            }
                        ]
                    }
                ]
        }
    },
    sheet: (data = {}) => {
        return {
            // Sheet name for Bot Setup
            name: '🤖 Bot',
            // Columns for the Bot Setup sheet (in multiple languages, including default). The first column is the key.
            columns: ['key', 'default', 'en', 'es', 'fr', 'ar', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko', 'he'],
            // Sample data for the Bot settings (setMyName, setMyDescription, setMyShortDescription, setMyCommands), in multiple languages;
            sample_data: [
                ['-------------------------- Bot Information ---------------------'],
                // setMyName; 0-64 characters.
                ['name',
                    // default (en)
                    '🤖 Bot Hub, Private, Secure, Easy to use',
                    // en
                    '🤖 Bot Hub, Private, Secure, Easy to use',
                    // es
                    '🤖 Centro de bots, privado, seguro, fácil de usar',
                    // fr
                    '🤖 Centre de bots, privé, sécurisé, facile à utiliser',
                    // ar
                    '🤖 مركز الروبوتات، خاص، آمن، سهل الاستخدام',
                    // de
                    '🤖 Bot-Zentrale, privat, sicher, einfach zu bedienen',
                    // it
                    '🤖 Centro bot, privato, sicuro, facile da usare',
                    // pt
                    '🤖 Central de bots, privado, seguro, fácil de usar',
                    // ru
                    'Центр ботов, приватный, безопасный, простой в использовании',
                    // zh
                    '🤖 机器人中心，私密，安全，易于使用',
                    // ja
                    '🤖 ボットハブ、プライベート、セキュア、使いやすい',
                    // ko
                    '🤖 봇 허브, 개인용, 안전함, 사용하기 쉬움',
                    // he
                    '🤖 מרכז בוטים, פרטי, מאובטח, קל לשימוש'],
                // setMyShortDescription; 0-120 characters.
                ['short_description',
                    // default (en)
                    'What bot can do? Take a journey with this bot, explore its features!',
                    // en
                    'What bot can do? Take a journey with this bot, explore its features!',
                    // es
                    '¿Qué puede hacer el bot? ¡Emprende un viaje con este bot y explora sus funciones!',
                    // fr
                    'Que peut faire le bot ? Partez en voyage avec ce bot et explorez ses fonctionnalités !',
                    // ar
                    'ماذا يمكن أن يفعل الروبوت؟ انطلق في رحلة مع هذا الروبوت واستكشف ميزاته!',
                    // de
                    'Was kann der Bot tun? Machen Sie eine Reise mit diesem Bot und erkunden Sie seine Funktionen!',
                    // it
                    'Cosa può fare il bot? Fai un viaggio con questo bot ed esplora le sue funzionalità!',
                    // pt
                    'O que o bot pode fazer? Faça uma jornada com este bot e explore seus recursos!',
                    // ru
                    'Что может делать бот? Отправьтесь в путешествие с этим ботом и исследуйте его функции!',
                    // zh
                    '机器人能做什么？与这个机器人一起踏上旅程，探索它的功能！',
                    // ja
                    'ボットは何ができますか？このボットと一緒に旅をして、その機能を探検しましょう！',
                    // ko
                    '봇은 무엇을 할 수 있나요? 이 봇과 함께 여행을 떠나 그 기능을 탐험해보세요!',
                    // he
                    'מה הבוט יכול לעשות? צא למסע עם הבוט הזה, חקור את התכונות שלו!'],
                // setMyDescription; 0-512 characters.
                ['description',
                    // default (en)
                    'Telegram Bots are secure and private channels ideal marketing tools within customer relationship management (CRM) systems. \n\n'
                    + 'Promote your goods and services, send notifications, conduct surveys, and much more!\n\n'
                    + 'Group your customers, create targeted communication channels, and engage with your audience like never before!\n\n',
                    // en
                    'Telegram Bots are secure and private channels ideal marketing tools within customer relationship management (CRM) systems. \n\n'
                    + 'Promote your goods and services, send notifications, conduct surveys, and much more!\n\n'
                    + 'Group your customers, create targeted communication channels, and engage with your audience like never before!\n\n',
                    // es
                    'Los bots de Telegram son canales seguros y privados, herramientas de marketing ideales dentro de los sistemas de gestión de relaciones con los clientes (CRM). \n\n'
                    + 'Promociona tus productos y servicios, envía notificaciones, realiza encuestas y mucho más.\n\n'
                    + 'Agrupa a tus clientes, crea canales de comunicación segmentados y conecta con tu audiencia como nunca antes.\n\n',
                    // fr
                    'Les bots Telegram sont des canaux sécurisés et privés, des outils de marketing idéaux au sein des systèmes de gestion de la relation client (CRM). \n\n'
                    + 'Faites la promotion de vos biens et services, envoyez des notifications, réalisez des sondages, et bien plus encore !\n\n'
                    + 'Regroupez vos clients, créez des canaux de communication ciblés, et engagez-vous avec votre audience comme jamais auparavant !\n\n',
                    // ar
                    'روبوتات تيليجرام هي قنوات آمنة وخاصة، وأدوات تسويقية مثالية ضمن أنظمة إدارة علاقات العملاء (CRM). \n\n'
                    + 'قم بالترويج لمنتجاتك وخدماتك، وأرسل الإشعارات، وأجرِ الاستطلاعات، وأكثر من ذلك بكثير!\n\n'
                    + 'قم بتجميع عملائك، وأنشئ قنوات اتصال مستهدفة، وتفاعل مع جمهورك كما لم يحدث من قبل!\n\n',
                    // de
                    'Telegram-Bots sind sichere und private Kanäle, ideale Marketing-Tools innerhalb von Customer-Relationship-Management-(CRM)-Systemen. \n\n'
                    + 'Bewerben Sie Ihre Waren und Dienstleistungen, senden Sie Benachrichtigungen, führen Sie Umfragen durch und vieles mehr!\n\n'
                    + 'Gruppieren Sie Ihre Kunden, erstellen Sie gezielte Kommunikationskanäle und interagieren Sie wie nie zuvor mit Ihrem Publikum!\n\n',
                    // it
                    'I bot di Telegram sono canali sicuri e privati, strumenti di marketing ideali all\'interno dei sistemi di gestione delle relazioni con i clienti (CRM). \n\n'
                    + 'Promuovi i tuoi beni e servizi, invia notifiche, conduci sondaggi e molto altro!\n\n'
                    + 'Raggruppa i tuoi clienti, crea canali di comunicazione mirati e interagisci con il tuo pubblico come mai prima d\'ora!\n\n',
                    // pt
                    'Os bots do Telegram são canais seguros e privados, ferramentas de marketing ideais dentro dos sistemas de gestão de relacionamento com o cliente (CRM). \n\n'
                    + 'Promova seus bens e serviços, envie notificações, realize pesquisas e muito mais!\n\n'
                    + 'Agrupe seus clientes, crie canais de comunicação direcionados e interaja com seu público como nunca antes!\n\n',
                    // ru
                    'Телеграм-боты — это безопасные и приватные каналы, идеальные маркетинговые инструменты в системах управления взаимоотношениями с клиентами (CRM). \n\n'
                    + 'Продвигайте свои товары и услуги, отправляйте уведомления, проводите опросы и многое другое!\n\n'
                    + 'Группируйте своих клиентов, создавайте целевые каналы связи и взаимодействуйте с вашей аудиторией как никогда ранее!\n\n',
                    // zh
                    '电报机器人 是安全且私密的频道，是客户关系管理（CRM）系统中理想的营销工具。 \n\n'
                    + '推广您的商品和服务，发送通知，进行调查，等等！\n\n'
                    + '将客户分组，创建针对性的沟通渠道，与受众进行前所未有的互动！\n\n',
                    // ja
                    'テレグラムボット は、安全でプライベートなチャネルであり、顧客関係管理（CRM）システム内で理想的なマーケティングツールです。 \n\n'
                    + '商品やサービスを宣伝し、通知を送信し、アンケートを実施するなど、さまざまなことができます！\n\n'
                    + '顧客をグループ化し、ターゲットを絞ったコミュニケーションチャネルを作成し、かつてない方法でオーディエンスと交流しましょう！\n\n',
                    // ko
                    '텔레그램 봇 은 안전하고 개인적인 채널로, 고객 관계 관리(CRM) 시스템 내에서 이상적인 마케팅 도구입니다. \n\n'
                    + '상품 및 서비스를 홍보하고, 알림을 보내고, 설문 조사를 수행하는 등 다양한 작업을 수행할 수 있습니다!\n\n'
                    + '고객을 그룹화하고, 대상 커뮤니케이션 채널을 만들고, 그 어느 때보다 청중과 소통하세요!\n\n',
                    // he
                    'בוטים של טלגרם הם ערוצים מאובטחים ופרטיים, כלים שיווקיים אידיאליים בתוך מערכות ניהול קשרי לקוחות (CRM). \n\n'
                    + 'קדם את הסחורות והשירותים שלך, שלח התראות, ערוך סקרים ועוד!\n\n'
                    + 'קבץ את הלקוחות שלך, צור ערוצי תקשורת ממוקדים ואינטראקציה עם הקהל שלך כמו שמעולם לא היה לפני כן!\n\n'],
                // setMyCommands; Each command is represented by an object with 'command' and 'description' fields.
                ['commands',
                    // default (en)
                    JSON.stringify(
                        [
                            {   // '/start' command
                                // Text of the command; 1-32 characters. Can contain only lowercase English letters, digits and underscores.
                                command: '/start',
                                // Description of the command; 1-256 characters.
                                description: 'Start the bot'
                            },
                            {   // '/help' command
                                command: '/help',
                                description: 'Get help on using the bot, or report an issue'
                            },
                            {   // '/about' command
                                command: '/about',
                                description: 'About the bot'
                            }
                        ]),
                    // English
                    JSON.stringify(
                        [
                            {   // '/start' command
                                // Text of the command; 1-32 characters. Can contain only lowercase English letters, digits and underscores.
                                command: '/start',
                                // Description of the command; 1-256 characters.
                                description: 'Start the bot'
                            },
                            {   // '/help' command
                                command: '/help',
                                description: 'Get help on using the bot, or report an issue'
                            },
                            {   // '/about' command
                                command: '/about',
                                description: 'About the bot'
                            }
                        ]),
                    // Spanish
                    JSON.stringify(
                        [
                            {   // '/start' command
                                command: '/start',
                                description: 'Iniciar el bot'
                            },
                            {   // '/help' command
                                command: '/help',
                                description: 'Obtener ayuda sobre el uso del bot o informar un problema'
                            },
                            {   // '/about' command
                                command: '/about',
                                description: 'Acerca del bot'
                            }
                        ]),
                    // French
                    JSON.stringify(
                        [
                            {   // '/start' command
                                command: '/start',
                                description: 'Démarrer le bot'
                            },
                            {   // '/help' command
                                command: '/help',
                                description: 'Obtenir de l\'aide sur l\'utilisation du bot ou signaler un problème'
                            },
                            {   // '/about' command
                                command: '/about',
                                description: 'À propos du bot'
                            }
                        ]),
                    // Arabic
                    JSON.stringify(
                        [
                            {   // '/start' command
                                command: '/start',
                                description: 'بدء تشغيل البوت'
                            },
                            {   // '/help' command
                                command: '/help',
                                description: 'الحصول على مساعدة حول استخدام البوت أو الإبلاغ عن مشكلة'
                            },
                            {   // '/about' command
                                command: '/about',
                                description: 'معلومات عن البوت'
                            }
                        ]),
                    // German
                    JSON.stringify(
                        [
                            {   // '/start' command
                                command: '/start',
                                description: 'Bot starten'
                            },
                            {   // '/help' command
                                command: '/help',
                                description: 'Hilfe zur Verwendung des Bots oder zur Meldung eines Problems erhalten'
                            },
                            {   // '/about' command
                                command: '/about',
                                description: 'Über den Bot'
                            }
                        ]),
                    // Italian
                    JSON.stringify(
                        [
                            {   // '/start' command
                                command: '/start',
                                description: 'Avvia il bot'
                            },
                            {   // '/help' command
                                command: '/help',
                                description: 'Ottieni aiuto sull\'uso del bot o segnala un problema'
                            },
                            {   // '/about' command
                                command: '/about',
                                description: 'Informazioni sul bot'
                            }
                        ]),
                    // Portuguese
                    JSON.stringify([
                        {   // '/start' command
                            command: '/start',
                            description: 'Iniciar o bot'
                        },
                        {   // '/help' command
                            command: '/help',
                            description: 'Obter ajuda sobre o uso do bot ou relatar um problema'
                        },
                        {   // '/about' command
                            command: '/about',
                            description: 'Informações sobre o bot'
                        }
                    ]),
                    // Russian
                    JSON.stringify([
                        {   // '/start' command
                            command: '/start',
                            description: 'Запустить бота'
                        },
                        {   // '/help' command
                            command: '/help',
                            description: 'Получить помощь по использованию бота или сообщить о проблеме'
                        },
                        {   // '/about' command
                            command: '/about',
                            description: 'Информация о боте'
                        }
                    ]),
                    // Chinese
                    JSON.stringify([
                        {   // '/start' command
                            command: '/start',
                            description: '启动机器人'
                        },
                        {   // '/help' command
                            command: '/help',
                            description: '获取有关使用机器人的帮助或报告问题'
                        },
                        {   // '/about' command
                            command: '/about',
                            description: '有关机器人的信息'
                        }
                    ]),
                    // Japanese
                    JSON.stringify([
                        {   // '/start' command
                            command: '/start',
                            description: 'ボットを開始します'
                        },
                        {   // '/help' command
                            command: '/help',
                            description: 'ボットの使用に関するヘルプを取得するか、問題を報告します'
                        },
                        {   // '/about' command
                            command: '/about',
                            description: 'ボットに関する情報'
                        }
                    ]),
                    // Korean
                    JSON.stringify([
                        {   // '/start' command
                            command: '/start',
                            description: '봇을 시작합니다'
                        },
                        {   // '/help' command
                            command: '/help',
                            description: '봇 사용에 대한 도움을 받거나 문제를 보고합니다'
                        },
                        {   // '/about' command
                            command: '/about',
                            description: '봇에 대한 정보'
                        }
                    ]),
                    // Hebrew
                    JSON.stringify([
                        {   // '/start' command
                            command: '/start',
                            description: 'הפעל את הבוט'
                        },
                        {   // '/help' command
                            command: '/help',
                            description: 'קבל עזרה בשימוש בבוט או דווח על בעיות'
                        },
                        {   // '/about' command
                            command: '/about',
                            description: 'מידע על הבוט'
                        }
                    ])
                ],
                ['-------------------------- Environment Variables ---------------------'],
                ['bot_api_token', '[YOUR_BOT_API_TOKEN]'],
                ['deployment_id', '[YOUR_PRODUCTION_DEPLOYMENT_ID]']
            ]
        }
    }
}

EMD.WebhookSetup = {
    entityName: 'WebhookSetup',
    card: (data = {}) => {
        return {
            name: 'webhook_setup_card',
            header: {
                title: 'Webhook Setup',
                subTitle: 'Configure your bot webhook settings.',
                imageUrl: EMD.WAIT_FOR_IT_IMG_URL,
                imageStyle: CardService.ImageStyle.SQUARE,
                imageAltText: 'Webhook Setup Image'
            },
            sections: [
                {   // Webhook Configuration section
                    header: 'Webhook Configuration',
                    collapsible: false,
                    numUncollapsibleWidgets: 0,
                    widgets: [
                        {   // TextParagraph widget
                            id: 'webhook_setup_text_paragraph',
                            TextParagraph: {
                                text: 'Use the input fields below to configure your webhook settings.'
                            }
                        }
                    ]
                }
            ]
        };
    }
}

EMD.CommonBotOperations = {
    entityName: 'BasicBotOperation',
    card: (data = {}) => {
        return {
            name: 'basic_bot_operation_card',
            header: {
                title: 'Basic API Operation',
                subTitle: 'Perform basic bot operations like getting bot info and sending test messages.',
                imageUrl: EMD.YOU_GOT_IT_IMG_URL,
                imageStyle: CardService.ImageStyle.SQUARE,
                imageAltText: 'Basic Bot Operation Image'
            },
            sections: [
                {   // Bot Configuration section
                    header: 'Telegram API Operations',
                    collapsible: true,
                    numUncollapsibleWidgets: 2,
                    widgets: [
                        {   // TextInput for bot token
                            id: 'bot_token_input_widget',
                            TextInput: {
                                title: '🤖 Your Bot Token',
                                hint: 'Enter your Bot Token, get it from @BotFather',
                                fieldName: 'txt_bot_api_token',
                                multiline: false,
                                inputMode: CardService.TextInputMode.PLAIN_TEXT,
                                value: data.botApiToken || ''
                            }
                        },
                        {   // TextButton to call getMe API
                            id: 'get_me_button',
                            TextButton: {
                                text: '🤖 Get Me',
                                onClick: {
                                    functionName: 'BotApiHandler.View.onGetMeClick',
                                    // List of widget IDs whose values are required for this action to be executed
                                    requiredWidgets: ['txt_bot_api_token']
                                }
                            }
                        },
                        {   // TextInput for chat ID
                            id: 'chat_id_input_widget',
                            TextInput: {
                                title: '📢 Chat ID',
                                hint: 'Enter Chat ID, for channels use @channelusername',
                                fieldName: 'chat_id_input',
                                multiline: false,
                                inputMode: CardService.TextInputMode.PLAIN_TEXT,
                                value: data.chatId || ''
                            }
                        },
                        {   // TextButton to call getChat API
                            id: 'get_chat_button',
                            TextButton: {
                                text: '📢 Get Chat',
                                onClick: {
                                    functionName: 'ChannelsHandler.View.onGetChatClick',
                                    // List of widget IDs whose values are required for this action to be executed
                                    requiredWidgets: ['txt_bot_api_token', 'chat_id_input']
                                }
                            }
                        }
                    ]
                },
                {  // Minify/Beautify JSON section
                    header: 'Useful JSON Tools',
                    collapsible: true,
                    numUncollapsibleWidgets: 2,
                    widgets: [
                        {  // TextParagraph widget
                            id: 'json_handler_text_paragraph',
                            TextParagraph: {
                                maxLines: 2,
                                text: 'These tools help you to beautify, minify, and validate JSON data. you receive from various sources. (client/server)\n\n'
                                    + 'Select the cell in the spreadsheet containing JSON data before using these tools.\n\n'
                                    + 'The current cell is the cell that has focus in the Google Sheets UI, and is highlighted by a dark border.\n\n'
                                    + 'There is never more than one current cell. If no cell is selected, there is no current cell. '
                            }
                        },
                        {   // TextButton to beautify JSON
                            id: 'beautify_json_button',
                            TextButton: {
                                text: '🎨 Beautify',
                                onClick: {
                                    functionName: 'JsonHandler.View.onBeautifyJsonClick'
                                }
                            }
                        },
                        {   // TextButton to minify JSON
                            id: 'minify_json_button',
                            TextButton: {
                                text: '🗜️ Minify',
                                onClick: {
                                    functionName: 'JsonHandler.View.onMinifyJsonClick'
                                }
                            }
                        },
                        {   // TextButton to validate JSON
                            id: 'validate_json_button',
                            TextButton: {
                                text: '✅ Validate',
                                onClick: {
                                    functionName: 'JsonHandler.View.onValidateJsonClick'
                                }
                            }
                        }
                    ]
                }
            ],
            fixedFooter: {
                primaryButton: {
                    textButton: {
                        disabled: true,
                        text: '💾 Save',
                        onClick: {
                            functionName: 'NavigationHandler.ViewModel.onPushCardClick',
                            parameters: { template: 'EMD.Cards.Home' }
                        }
                    }
                },
                secondaryButton: {
                    textButton: {
                        text: '❓ Need Help?',
                        onClick: {
                            functionName: 'NavigationHandler.ViewModel.onPushCardClick',
                            parameters: { template: 'EMD.Cards.Help' }
                        }
                    }
                }
            }
        };
    }
}

EMD.Customer = {
    entityName: 'Customer',
    displayName: 'Customer',
    pluralDisplayName: 'Customers',
    card: (data = {}) => {
        return {
            name: 'customer_Card',
            header: {
                title: '👥 Customer Management',
                subTitle: 'Manage your customers here. Customers are your Telegram bot users.',
                imageUrl: EMD.DEFAULT_IMAGE_URL,
                imageStyle: CardService.ImageStyle.SQUARE,
                imageAltText: 'Customer Image'
            },
            sections:
                [
                    { // Customer Management Section
                        // header: 'Customer Management',
                        collapsible: false,
                        numUncollapsibleWidgets: 0,
                        widgets: [
                            { // add data sample to Customer Sheet
                                id: 'add_sample_data_customer_widget',
                                DecoratedText: {
                                    topLabel: '➕',
                                    text: 'Add Sample Data',
                                    bottomLabel: 'Populate your Customer sheet with sample data to get started quickly.',
                                    wrapText: false,
                                    textButton: {
                                        text: 'Add Sample Data',
                                        disabled: false,
                                        onClick: {
                                            functionName: 'SpreadsheetHandler.Addon.onInsertSampleDataClick',
                                            parameters: {
                                                sheet: 'EMD.Spreadsheet.Customer'
                                            }
                                        }
                                    }
                                }
                            }
                        ]
                    }
                ]
        };
    },
    sheet: (data = {}) => {
        return {
            name: '👥  Members',
            columns: ['Created on', 'chat_id', 'username', 'First Name', 'Last Name', 'language_code', 'is_bot', 'Data'],
            sample_data:
                [
                    ['2025-11-17T18:55:38.519Z', '123456789', 'john_doe', 'John', 'Doe', 'en', 'false', '{"message_id":54,"from":{"id":123456789,"is_bot":false,"first_name":"John","last_name":"Doe","username":"john_doe","language_code":"en","is_premium":true},"chat":{"id":123456789,"first_name":"John","last_name":"Doe","username":"john_doe","type":"private"},"date":1763405735,"text":"/start","entities":[{"offset":0,"length":6,"type":"bot_command"}]}'],
                    ['2025-11-17T18:55:38.519Z', '987654321', 'jane_smith', 'Jane', 'Smith', 'es', 'false', '{"message_id":78,"from":{"id":987654321,"is_bot":false,"first_name":"Jane","last_name":"Smith","username":"jane_smith","language_code":"es","is_premium":false},"chat":{"id":987654321,"first_name":"Jane","last_name":"Smith","username":"jane_smith","type":"private"},"date":1763492135,"text":"/help","entities":[{"offset":0,"length":5,"type":"bot_command"}]}'],
                    ['2024-01-03T09:45:00.445Z', '555666777', 'alice_wonder', 'Alice', 'Wonder', 'fr', 'false', '{"message_id":102,"from":{"id":555666777,"is_bot":false,"first_name":"Alice","last_name":"Wonder","username":"alice_wonder","language_code":"fr","is_premium":true},"chat":{"id":555666777,"first_name":"Alice","last_name":"Wonder","username":"alice_wonder","type":"private"},"date":1763578535,"text":"/about","entities":[{"offset":0,"length":6,"type":"bot_command"}]}'],
                    ['2024-01-04T18:20:00.000Z', '222333444', 'bob_builder', 'Bob', 'Builder', 'de', 'false', '{"message_id":130,"from":{"id":222333444,"is_bot":false,"first_name":"Bob","last_name":"Builder","username":"bob_builder","language_code":"de","is_premium":false},"chat":{"id":222333444,"first_name":"Bob","last_name":"Builder","username":"bob_builder","type":"private"},"date":1763664935,"text":"/start","entities":[{"offset":0,"length":6,"type":"bot_command"}]}'],
                    ['2024-01-05T11:10:00.000Z', '888999000', 'charlie_chaplin', 'Charlie', 'Chaplin', 'it', 'false', '{"message_id":158,"from":{"id":888999000,"is_bot":false,"first_name":"Charlie","last_name":"Chaplin","username":"charlie_chaplin","language_code":"it","is_premium":true},"chat":{"id":888999000,"first_name":"Charlie","last_name":"Chaplin","username":"charlie_chaplin","type":"private"},"date":1763751335,"text":"/help","entities":[{"offset":0,"length":5,"type":"bot_command"}]}'],
                    ['2024-01-06T14:55:00.000Z', '444555666', 'diana_prince', 'Diana', 'Prince', 'pt', 'false', '{"message_id":186,"from":{"id":444555666,"is_bot":false,"first_name":"Diana","last_name":"Prince","username":"diana_prince","language_code":"pt","is_premium":false},"chat":{"id":444555666,"first_name":"Diana","last_name":"Prince","username":"diana_prince","type":"private"},"date":1763837735,"text":"/about","entities":[{"offset":0,"length":6,"type":"bot_command"}]}'],
                    ['2024-01-07T08:05:00.000Z', '111222333', 'edward_snow', 'Edward', 'Snow', 'ru', 'false', '{"message_id":210,"from":{"id":111222333,"is_bot":false,"first_name":"Edward","last_name":"Snow","username":"edward_snow","language_code":"ru","is_premium":true},"chat":{"id":111222333,"first_name":"Edward","last_name":"Snow","username":"edward_snow","type":"private"},"date":1763924135,"text":"/start","entities":[{"offset":0,"length":6,"type":"bot_command"}]}'],
                    ['2024-01-08T17:40:00.000Z', '777888999', 'fiona_shrek', 'Fiona', 'Shrek', 'zh', 'false', '{"message_id":238,"from":{"id":777888999,"is_bot":false,"first_name":"Fiona","last_name":"Shrek","username":"fiona_shrek","language_code":"zh","is_premium":false},"chat":{"id":777888999,"first_name":"Fiona","last_name":"Shrek","username":"fiona_shrek","type":"private"},"date":1764010535,"text":"/help","entities":[{"offset":0,"length":5,"type":"bot_command"}]}'],
                    ['2024-01-09T10:25:00.000Z', '333444555', 'george_clooney', 'George', 'Clooney', 'ja', 'false', '{"message_id":266,"from":{"id":333444555,"is_bot":false,"first_name":"George","last_name":"Clooney","username":"george_clooney","language_code":"ja","is_premium":true},"chat":{"id":333444555,"first_name":"George","last_name":"Clooney","username":"george_clooney","type":"private"},"date":1764096935,"text":"/about","entities":[{"offset":0,"length":6,"type":"bot_command"}]}'],
                    ['2024-01-10T13:15:00.000Z', '666777888', 'hannah_montana', 'Hannah', 'Montana', 'ko', 'false', '{"message_id":294,"from":{"id":666777888,"is_bot":false,"first_name":"Hannah","last_name":"Montana","username":"hannah_montana","language_code":"ko","is_premium":false},"chat":{"id":666777888,"first_name":"Hannah","last_name":"Montana","username":"hannah_montana","type":"private"},"date":1764183335,"text":"/start","entities":[{"offset":0,"length":6,"type":"bot_command"}]}'],
                    ['2024-01-11T09:50:00.000Z', '999000111', 'ivan_ivanov', 'Ivan', 'Ivanov', 'he', 'false', '{"message_id":322,"from":{"id":999000111,"is_bot":false,"first_name":"Ivan","last_name":"Ivanov","username":"ivan_ivanov","language_code":"he","is_premium":true},"chat":{"id":999000111,"first_name":"Ivan","last_name":"Ivanov","username":"ivan_ivanov","type":"private"},"date":1764269735,"text":"/help","entities":[{"offset":0,"length":5,"type":"bot_command"}]}'],
                    ['2024-01-12T16:30:00.000Z', '121314151', 'julia_roberts', 'Julia', 'Roberts', 'en', 'false', '{"message_id":350,"from":{"id":121314151,"is_bot":false,"first_name":"Julia","last_name":"Roberts","username":"julia_roberts","language_code":"en","is_premium":false},"chat":{"id":121314151,"first_name":"Julia","last_name":"Roberts","username":"julia_roberts","type":"private"},"date":1764356135,"text":"/about","entities":[{"offset":0,"length":6,"type":"bot_command"}]}'],
                    ['2024-01-13T11:20:00.000Z', '161718192', 'kevin_bacon', 'Kevin', 'Bacon', 'es', 'false', '{"message_id":378,"from":{"id":161718192,"is_bot":false,"first_name":"Kevin","last_name":"Bacon","username":"kevin_bacon","language_code":"es","is_premium":true},"chat":{"id":161718192,"first_name":"Kevin","last_name":"Bacon","username":"kevin_bacon","type":"private"},"date":1764442535,"text":"/start","entities":[{"offset":0,"length":6,"type":"bot_command"}]}'],
                    ['2024-01-14T14:10:00.000Z', '202122232', 'linda_hamilton', 'Linda', 'Hamilton', 'fr', 'false', '{"message_id":406,"from":{"id":202122232,"is_bot":false,"first_name":"Linda","last_name":"Hamilton","username":"linda_hamilton","language_code":"fr","is_premium":false},"chat":{"id":202122232,"first_name":"Linda","last_name":"Hamilton","username":"linda_hamilton","type":"private"},"date":1764528935,"text":"/help","entities":[{"offset":0,"length":5,"type":"bot_command"}]}'],
                    ['2024-01-15T08:55:00.000Z', '242526272', 'michael_jordan', 'Michael', 'Jordan', 'ar', 'false', '{"message_id":434,"from":{"id":242526272,"is_bot":false,"first_name":"Michael","last_name":"Jordan","username":"michael_jordan","language_code":"ar","is_premium":true},"chat":{"id":242526272,"first_name":"Michael","last_name":"Jordan","username":"michael_jordan","type":"private"},"date":1764615335,"text":"/about","entities":[{"offset":0,"length":6,"type":"bot_command"}]}'],
                    ['2024-01-16T17:35:00.000Z', '282930313', 'natalie_portman', 'Natalie', 'Portman', 'de', 'false', '{"message_id":462,"from":{"id":282930313,"is_bot":false,"first_name":"Natalie","last_name":"Portman","username":"natalie_portman","language_code":"de","is_premium":false},"chat":{"id":282930313,"first_name":"Natalie","last_name":"Portman","username":"natalie_portman","type":"private"},"date":1764701735,"text":"/start","entities":[{"offset":0,"length":6,"type":"bot_command"}]}'],
                    ['2024-01-17T10:15:00.000Z', '323334353', 'oscar_wilde', 'Oscar', 'Wilde', 'it', 'false', '{"message_id":490,"from":{"id":323334353,"is_bot":false,"first_name":"Oscar","last_name":"Wilde","username":"oscar_wilde","language_code":"it","is_premium":true},"chat":{"id":323334353,"first_name":"Oscar","last_name":"Wilde","username":"oscar_wilde","type":"private"},"date":1764788135,"text":"/help","entities":[{"offset":0,"length":5,"type":"bot_command"}]}'],
                    ['2024-01-18T13:05:00.000Z', '363738394', 'paula_abdul', 'Paula', 'Abdul', 'pt', 'false', '{"message_id":518,"from":{"id":363738394,"is_bot":false,"first_name":"Paula","last_name":"Abdul","username":"paula_abdul","language_code":"pt","is_premium":false},"chat":{"id":363738394,"first_name":"Paula","last_name":"Abdul","username":"paula_abdul","type":"private"},"date":1764874535,"text":"/about","entities":[{"offset":0,"length":6,"type":"bot_command"}]}'],
                    ['2024-01-19T09:40:00.000Z', '404142434', 'quentin_tarantino', 'Quentin', 'Tarantino', 'ru', 'false', '{"message_id":546,"from":{"id":404142434,"is_bot":false,"first_name":"Quentin","last_name":"Tarantino","username":"quentin_tarantino","language_code":"ru","is_premium":true},"chat":{"id":404142434,"first_name":"Quentin","last_name":"Tarantino","username":"quentin_tarantino","type":"private"},"date":1764960935,"text":"/start","entities":[{"offset":0,"length":6,"type":"bot_command"}]}'],
                    ['2024-01-20T16:20:00.000Z', '444546474', 'rachel_green', 'Rachel', 'Green', 'zh', 'false', '{"message_id":574,"from":{"id":444546474,"is_bot":false,"first_name":"Rachel","last_name":"Green","username":"rachel_green","language_code":"zh","is_premium":false},"chat":{"id":444546474,"first_name":"Rachel","last_name":"Green","username":"rachel_green","type":"private"},"date":1765047335,"text":"/help","entities":[{"offset":0,"length":5,"type":"bot_command"}]}']
                ]
        }
    }
}

EMD.Automation = {
    entityName: 'Automation',
    card: (data = {}) => {
        return {
            name: 'automation_Card',
            header: {
                title: '⚡ Automation & Workflows',
                subTitle: 'Add and manage automations to enhance your Telegram bot functionality.',
                imageUrl: EMD.MATH_IMG_URL,
                imageStyle: CardService.ImageStyle.SQUARE,
                imageAltText: 'Automation Image'
            },
            sections:
                [
                    { // Automation Overview Section
                        header: 'Automation Overview',
                        collapsible: false,
                        numUncollapsibleWidgets: 0,
                        widgets: [
                            { // Automation Overview Text
                                id: 'automation_overview_widget',
                                TextParagraph: {
                                    text: 'Automations allow you to streamline and enhance your Telegram bot\'s functionality. '
                                        + 'By setting up automations, you can create dynamic interactions, manage user engagement, '
                                        + 'and perform various tasks automatically based on user actions or predefined triggers. '
                                }
                            }
                        ]
                    },
                    {   // Sample Data Management Section
                        header: 'Create Automations from Templates',
                        collapsible: true,
                        numUncollapsibleWidgets: 4,
                        widgets: [
                            {   // Add Basic Automation template widget
                                id: 'create_basic_automation_widget',
                                DecoratedText: {
                                    topLabel: '✨ Base',
                                    text: 'Get started with essential automations to enhance your Telegram bot experience.',
                                    bottomLabel: 'Beginner-friendly templates to kickstart your bot automations',
                                    wrapText: false,
                                    textButton: {
                                        text: '✨ Baseic',
                                        disabled: false,
                                        onClick: {
                                            functionName: 'SpreadsheetHandler.Addon.onInsertSampleDataClick',
                                            parameters: {
                                                sheet: 'EMD.Spreadsheet.BasicAutomation',
                                            }
                                        }
                                    }
                                }
                            },
                            {   // Add Donation Campaign template widget
                                id: 'create_donation_campaign_widget',
                                DecoratedText: {
                                    topLabel: '🐱❤️',
                                    text: 'Support Our Feline Friends! ❤️🐱\n\nHelp us make a difference in the lives of stray and abandoned cats. Your generous donation will provide food, shelter, and medical care to these deserving animals. Together, we can create a better future for our furry friends. Thank you for your kindness and support!',
                                    bottomLabel: 'Join us in our mission to care for cats in need.',
                                    wrapText: false,
                                    textButton: {
                                        text: '🐱❤️ Donation Template',
                                        disabled: false,
                                        onClick: {
                                            functionName: 'SpreadsheetHandler.Addon.onInsertSampleDataClick',
                                            parameters: {
                                                sheet: 'EMD.Spreadsheet.DonationCampaign',
                                            }
                                        }
                                    }
                                }
                            },
                            {   // Add API Automation template widget
                                id: 'create_api_automation_widget',
                                DecoratedText: {
                                    topLabel: '🤖 API',
                                    text: 'Add API automation templates to manage your API-related tasks efficiently.',
                                    bottomLabel: 'Bind API template data to get started with API automations',
                                    wrapText: false,
                                    textButton: {
                                        text: '🤖 API Template',
                                        disabled: false,
                                        onClick: {
                                            functionName: 'SpreadsheetHandler.Addon.onInsertSampleDataClick',
                                            parameters: {
                                                sheet: 'EMD.Spreadsheet.ApiFeaturesAutomation'
                                            }
                                        }
                                    }
                                }
                            },
                            {   // Add Security Automation template widget
                                id: 'create_security_automation_widget',
                                DecoratedText: {
                                    topLabel: '🔒 Security',
                                    text: 'Create security-focused automations to protect your bot and users.',
                                    bottomLabel: 'Bind security template data to get started',
                                    wrapText: false,
                                    textButton: {
                                        text: '🔒 Security Template',
                                        disabled: false,
                                        onClick: {
                                            functionName: 'SpreadsheetHandler.Addon.onInsertSampleDataClick',
                                            parameters: {
                                                sheet: 'EMD.Spreadsheet.SecurityAutomation'
                                            }
                                        }
                                    }
                                }
                            },
                            {   // Add Store Automation template widget
                                id: 'create_store_automation_widget',
                                DecoratedText: {
                                    topLabel: '💰 Store',
                                    text: 'Add store automation templates to manage your store-related tasks efficiently.',
                                    bottomLabel: 'Bind store template data to get started with store automations',
                                    wrapText: false,
                                    textButton: {
                                        text: '💰 Store Template',
                                        disabled: false,
                                        onClick: {
                                            functionName: 'SpreadsheetHandler.Addon.onInsertSampleDataClick',
                                            parameters: {
                                                sheet: 'EMD.Spreadsheet.StoreAutomation'
                                            }
                                        }
                                    }
                                }
                            },
                            {   // Add Survey Automation template widget
                                id: 'create_survey_automation_widget',
                                DecoratedText: {
                                    topLabel: '📋 Survey',
                                    text: 'Add survey automation templates to manage your survey-related tasks efficiently.',
                                    bottomLabel: 'Bind survey template data to get started with survey automations',
                                    wrapText: false,
                                    textButton: {
                                        text: '📋 Survey Template',
                                        disabled: false,
                                        onClick: {
                                            functionName: 'SpreadsheetHandler.Addon.onInsertSampleDataClick',
                                            parameters: {
                                                sheet: 'EMD.Spreadsheet.SurveyAutomation'
                                            }
                                        }
                                    }
                                }
                            }
                        ]
                    }
                ]
        };
    },
    sheet: (data = {}) => {
        return {
            name: '✨ Automations',
            columns: ['action', 'en', 'es', 'fr', 'ar', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko', 'he'],
            sample_data:
                [
                    ['_command_not_found_',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Oops! Command not found. Please use /help to see the list of available commands.',
                                parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [
                                            { text: "Help", callback_data: "/help" },
                                            { text: "About", callback_data: "/about" }
                                        ],
                                        [
                                            { text: "Home", callback_data: "/start" }
                                        ]
                                    ]
                                }
                            }
                        }]),
                        // es
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '¡Vaya! Comando no encontrado. Por favor, usa /help para ver la lista de comandos disponibles.',
                                parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "Inicio", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // fr
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '¡Vaya! Comando no encontrado. Por favor, usa /help para ver la lista de comandos disponibles.',
                                parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "L'accueil", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // ar
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'عذرًا! الأمر غير موجود. يرجى استخدام /help لرؤية قائمة الأوامر المتاحة.',
                                parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "الصفحة الرئيسية", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // de
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Hoppla! Befehl nicht gefunden. Bitte benutze /help, um die Liste der verfügbaren Befehle zu sehen.',
                                parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "Home", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // it
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Oops! Comando non trovato. Per favore usa /help per vedere la lista dei comandi disponibili.',
                                parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "Inizio", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // pt
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Ops! Comando não encontrado. Por favor, use /help para ver a lista de comandos disponíveis.',
                                parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "Início", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // ru
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Упс! Команда не найдена. Пожалуйста, используйте /help, чтобы увидеть список доступных команд.',
                                parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "Главная", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // zh
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '哎呀！未找到命令。请使用 /help 查看可用命令列表。',
                                parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "主页", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // ja
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'おっと！コマンドが見つかりません。利用可能なコマンドのリストを見るには /help を使用してください。',
                                parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "ホーム", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // ko
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '이런! 명령을 찾을 수 없습니다. 사용 가능한 명령 목록을 보려면 /help를 사용하세요.',
                                parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "홈", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // he
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'אופס! הפקודה לא נמצאה. אנא השתמש ב-/help כדי לראות את רשימת הפקודות הזמינות.',
                                parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "בית", callback_data: "/home" }]
                                    ]
                                }
                            }
                        }])]
                ]
        }
    }
}

EMD.BasicAutomation = {
    entityName: 'BasicAutomation',
    sheet: (data = {}) => {
        return {
            name: EMD.Automation.sheet(data).name,
            columns: EMD.Automation.sheet(data).columns,
            sample_data:
                [
                    ['---- 📦 BASIC AUTOMATION SAMPLE DATA START ----'],
                    ['_action_not_found_',
                        // default (en)
                        JSON.stringify([
                            { "next": "#remove_keyboard" },
                            { "next": "#send_unknown_action_message" },
                            { "next": "#append_main_menu_keyboard" }
                        ])
                    ],
                    ['/start',
                        // default (en)
                        JSON.stringify([
                            { "next": "#remove_keyboard" },
                            { "next": "#send_welcome_messages" },
                            { "next": "#append_main_menu_keyboard" }
                        ])
                    ],
                    ['/help',
                        // default (en)
                        JSON.stringify([
                            { "next": "#remove_keyboard" },
                            { "next": "#send_help_message" },
                            { "next": "#send_about_git_message" },
                            { "next": "#append_main_menu_keyboard" }
                        ])
                    ],
                    ['/about',
                        // default (en)
                        JSON.stringify([
                            { "next": "#remove_keyboard" },
                            { "next": "#send_about_message" },
                            { "next": "#send_about_opensource_message" },
                            { "next": "#send_how_to_contribute_message" },
                            { "next": "#append_main_menu_keyboard" }
                        ])
                    ],
                    ['/show_me_love',
                        // default (en)
                        JSON.stringify([
                            { "next": "#remove_keyboard" },
                            { "next": "#send_donation_message" },
                            { "next": "#send_show_me_love_invoice" },
                            { "next": "#send_about_opensource_message" },
                            { "next": "#append_main_menu_keyboard" }])
                    ],
                    ['#send_welcome_messages',
                        // default (en)
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: 'Hi..' + '\n\n'
                                        + 'Thank you for starting me! \n\n'
                                        + '<blockquote expandable>Privacy Policy: 🔏 \n\n'
                                        + '<b>All our interactions are confidential and secure.</b> You are in safe hands.\n\n'
                                        + '</blockquote>\n\n'
                                        + '<blockquote expandable>About Me: 🤖 \n\n'
                                        + 'I am here to assist you with various Telegram bot functionalities.\n\n'
                                        + 'You can use me to learn about sending messages, photos, media groups, and more!\n\n'
                                        + 'Just let me know what you would like to do!' + '\n\n'
                                        + '</blockquote>',
                                    photo: EMD.WELCOME_IMG_URL, // <-- Updated
                                    parse_mode: 'HTML',
                                    protect_content: true,
                                    has_spoiler: false,
                                    show_caption_above_media: false
                                }
                            }
                        ]),
                        // es
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: 'Hola..' + '\n\n'
                                        + '¡Gracias por iniciarme! \n\n'
                                        + '<blockquote expandable>Política de privacidad: 🔏 \n\n'
                                        + '<b>Todas nuestras interacciones son confidenciales y seguras.</b> Estás en buenas manos.\n\n'
                                        + '</blockquote>\n\n'
                                        + '<blockquote expandable>Sobre mí: 🤖 \n\n'
                                        + 'Estoy aquí para ayudarte con varias funcionalidades de bots de Telegram.\n\n'
                                        + '¡Puedes usarme para aprender sobre el envío de mensajes, fotos, grupos de medios y más!\n\n'
                                        + '¡Solo dime qué te gustaría hacer!' + '\n\n'
                                        + '</blockquote>',
                                    photo: EMD.WELCOME_IMG_URL, // <-- Updated
                                    parse_mode: 'HTML',
                                    protect_content: true,
                                    has_spoiler: false,
                                    show_caption_above_media: false
                                }
                            }
                        ]),
                        // fr
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: 'Salut..' + '\n\n'
                                        + 'Merci de m\'avoir démarré! \n\n'
                                        + '<blockquote expandable>Politique de confidentialité: 🔏 \n\n'
                                        + '<b>Toutes nos interactions sont confidentielles et sécurisées.</b> Vous êtes entre de bonnes mains.\n\n'
                                        + '</blockquote>\n\n'
                                        + '<blockquote expandable>À propos de moi: 🤖 \n\n'
                                        + 'Je suis là pour vous aider avec diverses fonctionnalités de bot Telegram.\n\n'
                                        + 'Vous pouvez m\'utiliser pour en savoir plus sur l\'envoi de messages, de photos, de groupes de médias, et plus encore!\n\n'
                                        + 'Faites-moi simplement savoir ce que vous souhaitez faire!' + '\n\n'
                                        + '</blockquote>',
                                    photo: EMD.WELCOME_IMG_URL, // <-- Updated
                                    parse_mode: 'HTML',
                                    protect_content: true,
                                    has_spoiler: false,
                                    show_caption_above_media: false
                                }
                            }
                        ]),
                        // ar
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: 'مرحباً..' + '\n\n'
                                        + 'شكراً لك على تشغيلي! \n\n'
                                        + '<blockquote expandable>سياسة الخصوصية: 🔏 \n\n'
                                        + '<b>جميع تفاعلاتنا سرية وآمنة.</b> أنت في أيد أمينة.\n\n'
                                        + '</blockquote>\n\n'
                                        + '<blockquote expandable>عني: 🤖 \n\n'
                                        + 'أنا هنا لمساعدتك في وظائف روبوتات تيليجرام المختلفة.\n\n'
                                        + 'يمكنك استخدامي للتعرف على إرسال الرسائل والصور ومجموعات الوسائط والمزيد!\n\n'
                                        + 'فقط أخبرني بما تود القيام به!' + '\n\n'
                                        + '</blockquote>',
                                    photo: EMD.WELCOME_IMG_URL, // <-- Updated
                                    parse_mode: 'HTML',
                                    protect_content: true,
                                    has_spoiler: false,
                                    show_caption_above_media: false
                                }
                            }
                        ]),
                        // de
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: 'Hallo..' + '\n\n'
                                        + 'Danke, dass Sie mich gestartet haben! \n\n'
                                        + '<blockquote expandable>Datenschutzrichtlinie: 🔏 \n\n'
                                        + '<b>Alle unsere Interaktionen sind vertraulich und sicher.</b> Sie sind in sicheren Händen.\n\n'
                                        + '</blockquote>\n\n'
                                        + '<blockquote expandable>Über mich: 🤖 \n\n'
                                        + 'Ich bin hier, um Ihnen bei verschiedenen Telegram-Bot-Funktionen zu helfen.\n\n'
                                        + 'Sie können mich nutzen, um mehr über das Senden von Nachrichten, Fotos, Mediengruppen und mehr zu erfahren!\n\n'
                                        + 'Lassen Sie mich einfach wissen, was Sie tun möchten!' + '\n\n'
                                        + '</blockquote>',
                                    photo: EMD.WELCOME_IMG_URL, // <-- Updated
                                    parse_mode: 'HTML',
                                    protect_content: true,
                                    has_spoiler: false,
                                    show_caption_above_media: false
                                }
                            }
                        ]),
                        // it
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: 'Ciao..' + '\n\n'
                                        + 'Grazie per avermi avviato! \n\n'
                                        + '<blockquote expandable>Informativa sulla privacy: 🔏 \n\n'
                                        + '<b>Tutte le nostre interazioni sono riservate e sicure.</b> Sei in buone mani.\n\n'
                                        + '</blockquote>\n\n'
                                        + '<blockquote expandable>Chi sono: 🤖 \n\n'
                                        + 'Sono qui per assisterti con varie funzionalità del bot Telegram.\n\n'
                                        + 'Puoi usarmi per saperne di più sull\'invio di messaggi, foto, gruppi multimediali e altro!\n\n'
                                        + 'Fammi solo sapere cosa vorresti fare!' + '\n\n'
                                        + '</blockquote>',
                                    photo: EMD.WELCOME_IMG_URL, // <-- Updated
                                    parse_mode: 'HTML',
                                    protect_content: true,
                                    has_spoiler: false,
                                    show_caption_above_media: false
                                }
                            }
                        ]),
                        // pt
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: 'Olá..' + '\n\n'
                                        + 'Obrigado por me iniciar! \n\n'
                                        + '<blockquote expandable>Política de Privacidade: 🔏 \n\n'
                                        + '<b>Todas as nossas interações são confidenciais e seguras.</b> Você está em boas mãos.\n\n'
                                        + '</blockquote>\n\n'
                                        + '<blockquote expandable>Sobre mim: 🤖 \n\n'
                                        + 'Estou aqui para ajudá-lo com várias funcionalidades de bots do Telegram.\n\n'
                                        + 'Você pode me usar para aprender sobre o envio de mensagens, fotos, grupos de mídia e muito mais!\n\n'
                                        + 'Basta me dizer o que você gostaria de fazer!' + '\n\n'
                                        + '</blockquote>',
                                    photo: EMD.WELCOME_IMG_URL, // <-- Updated
                                    parse_mode: 'HTML',
                                    protect_content: true,
                                    has_spoiler: false,
                                    show_caption_above_media: false
                                }
                            }
                        ]),
                        // ru
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: 'Привет..' + '\n\n'
                                        + 'Спасибо, что запустили меня! \n\n'
                                        + '<blockquote expandable>Политика конфиденциальности: 🔏 \n\n'
                                        + '<b>Все наши взаимодействия конфиденциальны и безопасны.</b> Вы в надежных руках.\n\n'
                                        + '</blockquote>\n\n'
                                        + '<blockquote expandable>Обо мне: 🤖 \n\n'
                                        + 'Я здесь, чтобы помочь вам с различными функциями Telegram-бота.\n\n'
                                        + 'Вы можете использовать меня, чтобы узнать об отправке сообщений, фотографий, медиагрупп и многого другого!\n\n'
                                        + 'Просто дайте мне знать, что вы хотите сделать!' + '\n\n'
                                        + '</blockquote>',
                                    photo: EMD.WELCOME_IMG_URL, // <-- Updated
                                    parse_mode: 'HTML',
                                    protect_content: true,
                                    has_spoiler: false,
                                    show_caption_above_media: false
                                }
                            }
                        ]),
                        // zh
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: '嗨..' + '\n\n'
                                        + '感谢您启动我！ \n\n'
                                        + '<blockquote expandable>隐私政策: 🔏 \n\n'
                                        + '<b>我们所有的互动都是保密和安全的。</b> 您很安全。\n\n'
                                        + '</blockquote>\n\n'
                                        + '<blockquote expandable>关于我: 🤖 \n\n'
                                        + '我在这里帮助您实现各种 Telegram 机器人功能。\n\n'
                                        + '您可以使用我来了解如何发送消息、照片、媒体组等！\n\n'
                                        + '请告诉我您想做什么!' + '\n\n'
                                        + '</blockquote>',
                                    photo: EMD.WELCOME_IMG_URL, // <-- Updated
                                    parse_mode: 'HTML',
                                    protect_content: true,
                                    has_spoiler: false,
                                    show_caption_above_media: false
                                }
                            }
                        ]),
                        // ja
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: 'こんにちは..' + '\n\n'
                                        + '私を起動していただきありがとうございます！ \n\n'
                                        + '<blockquote expandable>プライバシーポリシー: 🔏 \n\n'
                                        + '<b>すべてのやり取りは機密で安全です。</b> あなたは安全です。\n\n'
                                        + '</blockquote>\n\n'
                                        + '<blockquote expandable>私について: 🤖 \n\n'
                                        + '私は、さまざまな Telegram ボットの機能でお客様をサポ​​ートするためにここにいます。\n\n'
                                        + 'メッセージ、写真、メディアグループなどの送信について学ぶために私を使用することができます！\n\n'
                                        + '何をしたいか教えてください!' + '\n\n'
                                        + '</blockquote>',
                                    photo: EMD.WELCOME_IMG_URL, // <-- Updated
                                    parse_mode: 'HTML',
                                    protect_content: true,
                                    has_spoiler: false,
                                    show_caption_above_media: false
                                }
                            }
                        ]),
                        // ko
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: '안녕하세요..' + '\n\n'
                                        + '저를 시작해 주셔서 감사합니다! \n\n'
                                        + '<blockquote expandable>개인정보 처리방침: 🔏 \n\n'
                                        + '<b>당사의 모든 상호 작용은 기밀이며 안전합니다.</b> 귀하는 안전합니다.\n\n'
                                        + '</blockquote>\n\n'
                                        + '<blockquote expandable>소개: 🤖 \n\n'
                                        + '저는 다양한 텔레그램 봇 기능으로 여러분을 돕기 위해 여기에 있습니다.\n\n'
                                        + '메시지, 사진, 미디어 그룹 전송 등에 대해 배우기 위해 저를 사용할 수 있습니다!\n\n'
                                        + '무엇을 하고 싶은지 알려주세요!' + '\n\n'
                                        + '</blockquote>',
                                    photo: EMD.WELCOME_IMG_URL, // <-- Updated
                                    parse_mode: 'HTML',
                                    protect_content: true,
                                    has_spoiler: false,
                                    show_caption_above_media: false
                                }
                            }
                        ]),
                        // he
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: 'היי..' + '\n\n'
                                        + 'תודה שהתחלת אותי! \n\n'
                                        + '<blockquote expandable>מדיניות פרטיות: 🔏 \n\n'
                                        + '<b>כל האינטראקציות שלנו חסויות ומאובטחות.</b> אתה בידיים בטוחות.\n\n'
                                        + '</blockquote>\n\n'
                                        + '<blockquote expandable>עליי: 🤖 \n\n'
                                        + 'אני כאן כדי לסייע לך בפונקציות שונות של בוט טלגרם.\n\n'
                                        + 'אתה יכול להשתמש בי כדי ללמוד על שליחת הודעות, תמונות, קבוצות מדיה ועוד!\n\n'
                                        + 'רק תן לי לדעת מה תרצה לעשות!' + '\n\n'
                                        + '</blockquote>',
                                    photo: EMD.WELCOME_IMG_URL, // <-- Updated
                                    parse_mode: 'HTML',
                                    protect_content: true,
                                    has_spoiler: false,
                                    show_caption_above_media: false
                                }
                            }
                        ])
                    ],
                    ['#send_help_message',
                        // default (en)
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: 'Welcome to <b>Help & Support</b> ⁉️ \n\n'
                                        + 'Here are some resources to assist you:\n\n'
                                        + 'To get started, simply use the /start command. For assistance, use /help to access helpful resources and support options.\n\n'
                                        + 'Feel free to explore and customize the bot to suit your needs!\n\n',
                                    photo: EMD.HELP_IMG_URL,
                                    parse_mode: 'HTML',
                                    protect_content: true,
                                    has_spoiler: true,
                                    show_caption_above_media: false
                                }
                            }
                        ]),
                        // es
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: 'Bienvenido a <b>Ayuda y Soporte</b> ⁉️ \n\n'
                                        + 'Aquí tienes algunos recursos para ayudarte:\n\n'
                                        + 'Para empezar, simplemente usa el comando /start. Para asistencia, usa /help para acceder a recursos útiles y opciones de soporte.\n\n'
                                        + '¡Siéntete libre de explorar y personalizar el bot para adaptarlo a tus necesidades!\n\n',
                                    photo: EMD.HELP_IMG_URL,
                                    parse_mode: 'HTML',
                                    protect_content: true,
                                    has_spoiler: true,
                                    show_caption_above_media: false
                                }
                            }
                        ]),
                        // fr
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: 'Bienvenue dans <b>Aide et Support</b> ⁉️ \n\n'
                                        + 'Voici quelques ressources pour vous aider:\n\n'
                                        + 'Pour commencer, utilisez simplement la commande /start. Pour de l\'aide, utilisez /help pour accéder à des ressources utiles et des options de support.\n\n'
                                        + 'N\'hésitez pas à explorer et à personnaliser le bot pour répondre à vos besoins!\n\n',
                                    photo: EMD.HELP_IMG_URL,
                                    parse_mode: 'HTML',
                                    protect_content: true,
                                    has_spoiler: true,
                                    show_caption_above_media: false
                                }
                            }
                        ]),
                        // ar
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: 'مرحبًا بك في <b>المساعدة والدعم</b> ⁉️ \n\n'
                                        + 'إليك بعض الموارد لمساعدتك:\n\n'
                                        + 'للبدء، ما عليك سوى استخدام الأمر /start. للمساعدة، استخدم /help للوصول إلى الموارد المفيدة وخيارات الدعم.\n\n'
                                        + 'لا تتردد في استكشاف وتخصيص الروبوت ليناسب احتياجاتك!\n\n',
                                    photo: EMD.HELP_IMG_URL,
                                    parse_mode: 'HTML',
                                    protect_content: true,
                                    has_spoiler: true,
                                    show_caption_above_media: false
                                }
                            }
                        ]),
                        // de
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: 'Willkommen bei <b>Hilfe & Support</b> ⁉️ \n\n'
                                        + 'Hier sind einige Ressourcen, die Ihnen helfen:\n\n'
                                        + 'Um zu beginnen, verwenden Sie einfach den Befehl /start. Für Unterstützung verwenden Sie /help, um auf hilfreiche Ressourcen und Support-Optionen zuzugreifen.\n\n'
                                        + 'Fühlen Sie sich frei, den Bot zu erkunden und an Ihre Bedürfnisse anzupassen!\n\n',
                                    photo: EMD.HELP_IMG_URL,
                                    parse_mode: 'HTML',
                                    protect_content: true,
                                    has_spoiler: true,
                                    show_caption_above_media: false
                                }
                            }
                        ]),
                        // it
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: 'Benvenuto in <b>Aiuto e Supporto</b> ⁉️ \n\n'
                                        + 'Ecco alcune risorse per assisterti:\n\n'
                                        + 'Per iniziare, usa semplicemente il comando /start. Per assistenza, usa /help per accedere a risorse utili e opzioni di supporto.\n\n'
                                        + 'Sentiti libero di esplorare e personalizzare il bot per soddisfare le tue esigenze!\n\n',
                                    photo: EMD.HELP_IMG_URL,
                                    parse_mode: 'HTML',
                                    protect_content: true,
                                    has_spoiler: true,
                                    show_caption_above_media: false
                                }
                            }
                        ]),
                        // pt
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: 'Bem-vindo ao <b>Ajuda e Suporte</b> ⁉️ \n\n'
                                        + 'Aqui estão alguns recursos para te ajudar:\n\n'
                                        + 'Para começar, basta usar o comando /start. Para assistência, use /help para acessar recursos úteis e opções de suporte.\n\n'
                                        + 'Sinta-se à vontade para explorar e personalizar o bot para atender às suas necessidades!\n\n',
                                    photo: EMD.HELP_IMG_URL,
                                    parse_mode: 'HTML',
                                    protect_content: true,
                                    has_spoiler: true,
                                    show_caption_above_media: false
                                }
                            }
                        ]),
                        // ru
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: 'Добро пожаловать в <b>Помощь и Поддержка</b> ⁉️ \n\n'
                                        + 'Вот некоторые ресурсы для помощи:\n\n'
                                        + 'Чтобы начать, просто используйте команду /start. Для получения помощи используйте /help для доступа к полезным ресурсам и вариантам поддержки.\n\n'
                                        + 'Не стесняйтесь исследовать и настраивать бота в соответствии с вашими потребностями!\n\n',
                                    photo: EMD.HELP_IMG_URL,
                                    parse_mode: 'HTML',
                                    protect_content: true,
                                    has_spoiler: true,
                                    show_caption_above_media: false
                                }
                            }
                        ]),
                        // zh
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: '欢迎来到<b>帮助与支持</b> ⁉️ \n\n'
                                        + '以下是一些可以帮助您的资源:\n\n'
                                        + '要开始，只需使用 /start 命令。如需帮助，请使用 /help 访问有用的资源和支持选项。\n\n'
                                        + '请随时探索和自定义机器人以满足您的需求!\n\n',
                                    photo: EMD.HELP_IMG_URL,
                                    parse_mode: 'HTML',
                                    protect_content: true,
                                    has_spoiler: true,
                                    show_caption_above_media: false
                                }
                            }
                        ]),
                        // ja
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: '<b>ヘルプとサポート</b>へようこそ ⁉️ \n\n'
                                        + 'ここに役立つリソースがあります:\n\n'
                                        + '開始するには、単に /start コマンドを使用してください。サポートについては、/help を使用して役立つリソースとサポートオプションにアクセスしてください。\n\n'
                                        + '自由に探索し、ニーズに合わせてボットをカスタマイズしてください!\n\n',
                                    photo: EMD.HELP_IMG_URL,
                                    parse_mode: 'HTML',
                                    protect_content: true,
                                    has_spoiler: true,
                                    show_caption_above_media: false
                                }
                            }
                        ]),
                        // ko
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: '<b>도움말 및 지원</b>에 오신 것을 환영합니다 ⁉️ \n\n'
                                        + '다음은 도움이 될 수 있는 몇 가지 리소스입니다:\n\n'
                                        + '시작하려면 단순히 /start 명령을 사용하십시오. 지원이 필요하면 /help를 사용하여 유용한 리소스 및 지원 옵션에 액세스하십시오.\n\n'
                                        + '자유롭게 봇을 탐색하고 필요에 맞게 사용자 정의하십시오!\n\n',
                                    photo: EMD.HELP_IMG_URL,
                                    parse_mode: 'HTML',
                                    protect_content: true,
                                    has_spoiler: true,
                                    show_caption_above_media: false
                                }
                            }
                        ]),
                        // he
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: 'ברוכים הבאים ל<b>עזרה ותמיכה</b> ⁉️ \n\n'
                                        + 'להלן מספר משאבים שיסייעו לך:\n\n'
                                        + 'כדי להתחיל, פשוט השתמש בפקודה /start. לעזרה, השתמש ב-/help כדי לגשת למשאבים מועילים ואפשרויות תמיכה.\n\n'
                                        + 'אתה מוזמן לחקור ולהתאים אישית את הבוט לצרכים שלך!\n\n',
                                    photo: EMD.HELP_IMG_URL,
                                    parse_mode: 'HTML',
                                    protect_content: true,
                                    has_spoiler: true,
                                    show_caption_above_media: false
                                }
                            }
                        ])
                    ],
                    ['#send_about_message',
                        // default (en)
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: 'Welcome to <b>About</b>!\n\n'
                                        + 'I am a simple yet powerful Telegram bot built with Google Apps Script. \n\n'
                                        + 'I showcase various features of the Telegram Bot API, allowing you to send messages, photos, media groups, and interactive inline keyboards with ease.\n\n',
                                    photo: EMD.ABOUT_IMG_URL,
                                    parse_mode: 'HTML',
                                    protect_content: true,
                                    has_spoiler: false,
                                    show_caption_above_media: true
                                }
                            }
                        ]),
                        // es
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: '¡Bienvenido a <b>Acerca de</b>!\n\n'
                                        + 'Soy un bot de Telegram simple pero potente, construido con Google Apps Script. \n\n'
                                        + 'Muestro varias funciones de la API de Bot de Telegram, permitiéndote enviar mensajes, fotos, grupos de medios y teclados en línea interactivos con facilidad.\n\n',
                                    photo: EMD.ABOUT_IMG_URL,
                                    parse_mode: 'HTML',
                                    protect_content: true,
                                    has_spoiler: false,
                                    show_caption_above_media: true
                                }
                            }
                        ]),
                        // fr
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: 'Bienvenue dans <b>À Propos</b>!\n\n'
                                        + 'Je suis un bot Telegram simple mais puissant, construit avec Google Apps Script. \n\n'
                                        + 'Je présente diverses fonctionnalités de l\'API Bot de Telegram, vous permettant d\'envoyer facilement des messages, des photos, des groupes de médias et des claviers en ligne interactifs.\n\n',
                                    photo: EMD.ABOUT_IMG_URL,
                                    parse_mode: 'HTML',
                                    protect_content: true,
                                    has_spoiler: false,
                                    show_caption_above_media: true
                                }
                            }
                        ]),
                        // ar
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: 'مرحباً بك في <b>حول</b>!\n\n'
                                        + 'أنا روبوت تيليجرام بسيط ولكنه قوي، تم بناؤه باستخدام Google Apps Script. \n\n'
                                        + 'أعرض ميزات مختلفة لواجهة برمجة تطبيقات بوت تيليجرام، مما يسمح لك بإرسال الرسائل والصور ومجموعات الوسائط ولوحات المفاتيح المضمنة التفاعلية بسهولة.\n\n',
                                    photo: EMD.ABOUT_IMG_URL,
                                    parse_mode: 'HTML',
                                    protect_content: true,
                                    has_spoiler: false,
                                    show_caption_above_media: true
                                }
                            }
                        ]),
                        // de
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: 'Willkommen bei <b>Über</b>!\n\n'
                                        + 'Ich bin ein einfacher, aber leistungsstarker Telegram-Bot, der mit Google Apps Script erstellt wurde. \n\n'
                                        + 'Ich zeige verschiedene Funktionen der Telegram Bot API, mit denen Sie Nachrichten, Fotos, Mediengruppen und interaktive Inline-Tastaturen einfach senden können.\n\n',
                                    photo: EMD.ABOUT_IMG_URL,
                                    parse_mode: 'HTML',
                                    protect_content: true,
                                    has_spoiler: false,
                                    show_caption_above_media: true
                                }
                            }
                        ]),
                        // it
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: 'Benvenuto in <b>Informazioni</b>!\n\n'
                                        + 'Sono un bot Telegram semplice ma potente, costruito con Google Apps Script. \n\n'
                                        + 'Mostro varie funzionalità dell\'API Bot di Telegram, permettendoti di inviare messaggi, foto, gruppi multimediali e tastiere inline interattive con facilità.\n\n',
                                    photo: EMD.ABOUT_IMG_URL,
                                    parse_mode: 'HTML',
                                    protect_content: true,
                                    has_spoiler: false,
                                    show_caption_above_media: true
                                }
                            }
                        ]),
                        // pt
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: 'Bem-vindo ao <b>Sobre</b>!\n\n'
                                        + 'Eu sou um bot do Telegram simples, mas poderoso, construído com Google Apps Script. \n\n'
                                        + 'Eu mostro vários recursos da API Bot do Telegram, permitindo que você envie mensagens, fotos, grupos de mídia e teclados inline interativos com facilidade.\n\n',
                                    photo: EMD.ABOUT_IMG_URL,
                                    parse_mode: 'HTML',
                                    protect_content: true,
                                    has_spoiler: false,
                                    show_caption_above_media: true
                                }
                            }
                        ]),
                        // ru
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: 'Добро пожаловать в раздел <b>О нас</b>!\n\n'
                                        + 'Я простой, но мощный Telegram-бот, созданный с помощью Google Apps Script. \n\n'
                                        + 'Я демонстрирую различные функции API Telegram Bot, позволяя вам легко отправлять сообщения, фотографии, медиагруппы и интерактивные встроенные клавиатуры.\n\n',
                                    photo: EMD.ABOUT_IMG_URL,
                                    parse_mode: 'HTML',
                                    protect_content: true,
                                    has_spoiler: false,
                                    show_caption_above_media: true
                                }
                            }
                        ]),
                        // zh
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: '欢迎来到<b>关于</b>！\n\n'
                                        + '我是一个简单而强大的 Telegram 机器人，使用 Google Apps Script 构建。 \n\n'
                                        + '我展示了 Telegram 机器人 API 的各种功能，让您可以轻松发送消息、照片、媒体组和交互式内联键盘。\n\n',
                                    photo: EMD.ABOUT_IMG_URL,
                                    parse_mode: 'HTML',
                                    protect_content: true,
                                    has_spoiler: false,
                                    show_caption_above_media: true
                                }
                            }
                        ]),
                        // ja
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: '<b>概要</b>へようこそ！\n\n'
                                        + '私は Google Apps Script で構築された、シンプルながら強力な Telegram ボットです。 \n\n'
                                        + '私は Telegram Bot API のさまざまな機能を紹介し、メッセージ、写真、メディアグループ、およびインタラクティブなインラインキーボードを簡単に送信できるようにします。\n\n',
                                    photo: EMD.ABOUT_IMG_URL,
                                    parse_mode: 'HTML',
                                    protect_content: true,
                                    has_spoiler: false,
                                    show_caption_above_media: true
                                }
                            }
                        ]),
                        // ko
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: '<b>소개</b>에 오신 것을 환영합니다!\n\n'
                                        + '저는 Google Apps Script로 구축된 간단하면서도 강력한 텔레그램 봇입니다. \n\n'
                                        + '저는 텔레그램 봇 API의 다양한 기능을 선보이며, 메시지, 사진, 미디어 그룹 및 대화형 인라인 키보드를 쉽게 보낼 수 있도록 합니다.\n\n',
                                    photo: EMD.ABOUT_IMG_URL,
                                    parse_mode: 'HTML',
                                    protect_content: true,
                                    has_spoiler: false,
                                    show_caption_above_media: true
                                }
                            }
                        ]),
                        // he
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: 'ברוכים הבאים ל<b>אודות</b>!\n\n'
                                        + 'אני בוט טלגרם פשוט אך עוצמתי, שנבנה באמצעות Google Apps Script. \n\n'
                                        + 'אני מציג תכונות שונות של ה-API של בוט טלגרם, ומאפשר לך לשלוח הודעות, תמונות, קבוצות מדיה ומקלדות אינטראקטיביות בקלות.\n\n',
                                    photo: EMD.ABOUT_IMG_URL,
                                    parse_mode: 'HTML',
                                    protect_content: true,
                                    has_spoiler: false,
                                    show_caption_above_media: true
                                }
                            }
                        ])
                    ],
                    ['#send_unknown_action_message',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🚧 Sorry, we could not recognize this action. Please try again or use /help for assistance.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // es
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🚧 ¡Vaya! Lo sentimos, pero no pudimos reconocer esa acción. Por favor, inténtalo de nuevo o utiliza /help para obtener ayuda.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // fr
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🚧 Désolé, mais nous n\'avons pas pu reconnaître cette action. Veuillez réessayer ou utiliser /help pour obtenir de l\'aide.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ar
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🚧 عذرًا، لم نتمكن من التعرف على هذا الإجراء. يرجى المحاولة مرة أخرى أو استخدام /help للحصول على المساعدة.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // de
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🚧 Hoppla! Wir konnten diese Aktion nicht erkennen. Bitte versuchen Sie es erneut oder verwenden Sie /help, um Hilfe zu erhalten.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // it
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🚧 Ci scusiamo, ma non siamo riusciti a riconoscere questa azione. Per favore riprova o usa /help per ricevere assistenza.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // pt
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🚧 Desculpe, não conseguimos reconhecer esta ação. Por favor, tente novamente ou use /help para obter assistência.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ru
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🚧 Извините, мы не смогли распознать это действие. Пожалуйста, попробуйте еще раз или используйте /help для получения помощи.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // zh
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🚧 抱歉，我们无法识别此操作。请重试或使用 /help 获取帮助。',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ja
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🚧 申し訳ありませんが、このアクションを認識できませんでした。もう一度お試しいただくか、/help を使用してサポートを受けてください。',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ko
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🚧 죄송합니다. 이 작업을 인식할 수 없습니다. 다시 시도하거나 /help를 사용하여 도움을 받으십시오.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // he
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '🚧 סליחה, לא הצלחנו לזהות את הפעולה הזו. אנא נסה שוב או השתמש ב-/help לקבלת עזרה.',
                                parse_mode: 'HTML'
                            }
                        }])
                    ],
                    ['#append_main_menu_keyboard',
                        // default (en)
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                reply_markup: {
                                    inline_keyboard: [
                                        [
                                            { text: "🪬 Run Security Checks", callback_data: "/security_checks" }
                                        ],
                                        [
                                            { text: "💖 Show Me Love", callback_data: "/show_me_love" }
                                        ],
                                        [
                                            { text: "ℹ️ About", callback_data: "/about" },
                                            { text: "❓ Help", callback_data: "/help" }
                                        ]
                                    ]
                                }
                            }
                        }]),
                        // es
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                reply_markup: {
                                    inline_keyboard: [
                                        [
                                            { text: "🪬 Ejecutar comprobaciones de seguridad", callback_data: "/security_checks" }
                                        ],
                                        [
                                            { text: "💖 Muéstrame amor", callback_data: "/show_me_love" }],
                                        [
                                            { text: "ℹ️ Acerca de", callback_data: "/about" },
                                            { text: "❓ Ayuda", callback_data: "/help" }
                                        ]
                                    ]
                                }
                            }
                        }]),
                        // fr
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                reply_markup: {
                                    inline_keyboard: [
                                        [
                                            { text: "🪬 Exécuter les vérifications de sécurité", callback_data: "/security_checks" }
                                        ],
                                        [
                                            { text: "💖 Montre-moi de l'amour", callback_data: "/show_me_love" }],
                                        [
                                            { text: "ℹ️ À propos", callback_data: "/about" },
                                            { text: "❓ Aide", callback_data: "/help" }
                                        ]
                                    ]
                                }
                            }
                        }]),
                        // ar
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                reply_markup: {
                                    inline_keyboard: [
                                        [
                                            { text: "🪬 تشغيل فحوصات الأمان", callback_data: "/security_checks" }
                                        ],
                                        [
                                            { text: "💖 أرني الحب", callback_data: "/show_me_love" }],
                                        [
                                            { text: "ℹ️ حول", callback_data: "/about" },
                                            { text: "❓ مساعدة", callback_data: "/help" }
                                        ]
                                    ]
                                }
                            }
                        }]),
                        // de
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                reply_markup: {
                                    inline_keyboard: [
                                        [
                                            { text: "🪬 Sicherheitsprüfungen durchführen", callback_data: "/security_checks" }
                                        ],
                                        [
                                            { text: "💖 Zeig mir Liebe", callback_data: "/show_me_love" }],
                                        [
                                            { text: "ℹ️ Über", callback_data: "/about" },
                                            { text: "❓ Hilfe", callback_data: "/help" }
                                        ]
                                    ]
                                }
                            }
                        }]),
                        // it
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                reply_markup: {
                                    inline_keyboard: [
                                        [
                                            { text: "🪬 Esegui controlli di sicurezza", callback_data: "/security_checks" }
                                        ],
                                        [
                                            { text: "💖 Mostrami amore", callback_data: "/show_me_love" }],
                                        [
                                            { text: "ℹ️ Informazioni", callback_data: "/about" },
                                            { text: "❓ Aiuto", callback_data: "/help" }
                                        ]
                                    ]
                                }
                            }
                        }]),
                        // pt
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                reply_markup: {
                                    inline_keyboard: [
                                        [
                                            { text: "🪬 Execute security checks", callback_data: "/security_checks" }
                                        ],
                                        [
                                            { text: "💖 Mostre-me amor", callback_data: "/show_me_love" }],
                                        [
                                            { text: "ℹ️ Sobre", callback_data: "/about" },
                                            { text: "❓ Ajuda", callback_data: "/help" }
                                        ]
                                    ]
                                }
                            }
                        }]),
                        // ru
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                reply_markup: {
                                    inline_keyboard: [
                                        [
                                            { text: "🪬 Выполнить проверки безопасности", callback_data: "/security_checks" }
                                        ],
                                        [
                                            { text: "💖 Покажи мне любовь", callback_data: "/show_me_love" }],
                                        [
                                            { text: "ℹ️ О боте", callback_data: "/about" },
                                            { text: "❓ Помощь", callback_data: "/help" }
                                        ]
                                    ]
                                }
                            }
                        }]),
                        // zh
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                reply_markup: {
                                    inline_keyboard: [
                                        [
                                            { text: "🪬 执行安全检查", callback_data: "/security_checks" }
                                        ],
                                        [
                                            { text: "💖 给我爱", callback_data: "/show_me_love" }],
                                        [
                                            { text: "ℹ️ 关于", callback_data: "/about" },
                                            { text: "❓ 帮助", callback_data: "/help" }
                                        ]
                                    ]
                                }
                            }
                        }]),
                        // ja
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                reply_markup: {
                                    inline_keyboard: [
                                        [
                                            { text: "🪬 セキュリティチェックを実行する", callback_data: "/security_checks" }
                                        ],
                                        [
                                            { text: "💖 愛を見せて", callback_data: "/show_me_love" }],
                                        [
                                            { text: "ℹ️ 約", callback_data: "/about" },
                                            { text: "❓ ヘルプ", callback_data: "/help" }
                                        ]
                                    ]
                                }
                            }
                        }]),
                        // ko
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                reply_markup: {
                                    inline_keyboard: [
                                        [
                                            { text: "🪬 보안 검사 실행", callback_data: "/security_checks" }
                                        ],
                                        [
                                            { text: "💖 사랑을 보여줘", callback_data: "/show_me_love" }],
                                        [
                                            { text: "ℹ️ 정보", callback_data: "/about" },
                                            { text: "❓ 도움말", callback_data: "/help" }
                                        ]
                                    ]
                                }
                            }
                        }]),
                        // he
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                reply_markup: {
                                    inline_keyboard: [
                                        [
                                            { text: "🪬 הפעל בדיקות אבטחה", callback_data: "/security_checks" }
                                        ],
                                        [
                                            { text: "💖 תראה לי אהבה", callback_data: "/show_me_love" }],
                                        [
                                            { text: "ℹ️ אודות", callback_data: "/about" },
                                            { text: "❓ עזרה", callback_data: "/help" }
                                        ]
                                    ]
                                }
                            }
                        }])
                    ],
                    ['#append_back_to_start_keyboard',
                        // default (en)
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                text: 'Choose an option:',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "⬅️ Back to Start", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // es
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                text: 'Elige una opción:',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "⬅️ Volver al inicio", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // fr
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                text: 'Choisissez une option :',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "⬅️ Retour au début", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // ar
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                text: 'اختر خيارًا:',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "⬅️ العودة إلى البداية", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // de
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                text: 'Wählen Sie eine Option:',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "⬅️ Zurück zum Start", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // it
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                text: 'Scegli un\'opzione:',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "⬅️ Torna all'inizio", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // pt
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                text: 'Escolha uma opção:',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "⬅️ Voltar ao Início", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // ru
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                text: 'Выберите опцию:',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "⬅️ Назад к началу", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // zh
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                text: '选择一个选项：',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "⬅️ 返回开始", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // ja
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                text: 'オプションを選択してください:',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "⬅️ 最初に戻る", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // ko
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                text: '옵션을 선택하세요:',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "⬅️ 시작으로 돌아가기", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // he
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                text: 'בחר אפשרות:',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "⬅️ חזרה להתחלה", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }])
                    ],
                    ['#append_top_security_checks_keyboard',
                        // default (en)
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "Android Security Checks", callback_data: "/android_security_checks" }],
                                        [{ text: "iOS Security Checks", callback_data: "/ios_security_checks" }],
                                        [{ text: "Privacy Checks", callback_data: "/privacy_checks" }],
                                        [{ text: "About 🛈", callback_data: "/about" }, { text: "❓ Help", callback_data: "/help" }],
                                        [{ text: "🏠 Start", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // es
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "Verificaciones de seguridad de Android", callback_data: "/android_security_checks" }],
                                        [{ text: "Verificaciones de seguridad de iOS", callback_data: "/ios_security_checks" }],
                                        [{ text: "Verificaciones de privacidad", callback_data: "/privacy_checks" }],
                                        [{ text: "Acerca de 🛈", callback_data: "/about" }, { text: "❓ Ayuda", callback_data: "/help" }],
                                        [{ text: "🏠 Inicio", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // fr
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "Vérifications de sécurité Android", callback_data: "/android_security_checks" }],
                                        [{ text: "Vérifications de sécurité iOS", callback_data: "/ios_security_checks" }],
                                        [{ text: "Vérifications de confidentialité", callback_data: "/privacy_checks" }],
                                        [{ text: "À propos 🛈", callback_data: "/about" }, { text: "❓ Aide", callback_data: "/help" }],
                                        [{ text: "🏠 Accueil", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // ar
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "فحوصات أمان Android", callback_data: "/android_security_checks" }],
                                        [{ text: "فحوصات أمان iOS", callback_data: "/ios_security_checks" }],
                                        [{ text: "فحوصات الخصوصية", callback_data: "/privacy_checks" }],
                                        [{ text: "حول 🛈", callback_data: "/about" }, { text: "❓ مساعدة", callback_data: "/help" }],
                                        [{ text: "🏠 البداية", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // de
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "Android-Sicherheitsprüfungen", callback_data: "/android_security_checks" }],
                                        [{ text: "iOS-Sicherheitsprüfungen", callback_data: "/ios_security_checks" }],
                                        [{ text: "Datenschutzprüfungen", callback_data: "/privacy_checks" }],
                                        [{ text: "Über 🛈", callback_data: "/about" }, { text: "❓ Hilfe", callback_data: "/help" }],
                                        [{ text: "🏠 Startseite", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // it
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "Controlli di sicurezza Android", callback_data: "/android_security_checks" }],
                                        [{ text: "Controlli di sicurezza iOS", callback_data: "/ios_security_checks" }],
                                        [{ text: "Controlli sulla privacy", callback_data: "/privacy_checks" }],
                                        [{ text: "Informazioni 🛈", callback_data: "/about" }, { text: "❓ Aiuto", callback_data: "/help" }],
                                        [{ text: "🏠 Home", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // pt
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "Verificações de segurança do Android", callback_data: "/android_security_checks" }],
                                        [{ text: "Verificações de segurança do iOS", callback_data: "/ios_security_checks" }],
                                        [{ text: "Verificações de privacidade", callback_data: "/privacy_checks" }],
                                        [{ text: "Sobre 🛈", callback_data: "/about" }, { text: "❓ Ajuda", callback_data: "/help" }],
                                        [{ text: "🏠 Início", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // ru
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "Проверки безопасности Android", callback_data: "/android_security_checks" }],
                                        [{ text: "Проверки безопасности iOS", callback_data: "/ios_security_checks" }],
                                        [{ text: "Проверки конфиденциальности", callback_data: "/privacy_checks" }],
                                        [{ text: "О программе 🛈", callback_data: "/about" }, { text: "❓ Помощь", callback_data: "/help" }],
                                        [{ text: "🏠 Главная", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // zh
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "Android 安全检查", callback_data: "/android_security_checks" }],
                                        [{ text: "iOS 安全检查", callback_data: "/ios_security_checks" }],
                                        [{ text: "隐私检查", callback_data: "/privacy_checks" }],
                                        [{ text: "关于 🛈", callback_data: "/about" }, { text: "❓ 帮助", callback_data: "/help" }],
                                        [{ text: "🏠 主页", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // ja
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "Android セキュリティチェック", callback_data: "/android_security_checks" }],
                                        [{ text: "iOS セキュリティチェック", callback_data: "/ios_security_checks" }],
                                        [{ text: "プライバシーチェック", callback_data: "/privacy_checks" }],
                                        [{ text: "について 🛈", callback_data: "/about" }, { text: "❓ ヘルプ", callback_data: "/help" }],
                                        [{ text: "🏠 ホーム", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // ko
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "Android 보안 검사", callback_data: "/android_security_checks" }],
                                        [{ text: "iOS 보안 검사", callback_data: "/ios_security_checks" }],
                                        [{ text: "개인정보 보호 검사", callback_data: "/privacy_checks" }],
                                        [{ text: "정보 🛈", callback_data: "/about" }, { text: "❓ 도움말", callback_data: "/help" }],
                                        [{ text: "🏠 홈", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // he
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "בדיקות אבטחת Android", callback_data: "/android_security_checks" }],
                                        [{ text: "בדיקות אבטחת iOS", callback_data: "/ios_security_checks" }],
                                        [{ text: "בדיקות פרטיות", callback_data: "/privacy_checks" }],
                                        [{ text: "אודות 🛈", callback_data: "/about" }, { text: "❓ עזרה", callback_data: "/help" }],
                                        [{ text: "🏠 בית", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }])
                    ],
                    ['#remove_keyboard',
                        // default (en)
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                reply_markup: {
                                    inline_keyboard: [[]]
                                }
                            }
                        }])
                    ],
                    ['#send_about_git_message',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'You can find the source code of this bot on GitHub:\n\n'
                                    + '<a href="' + EMD.GIT_REPO_URL + '#L3872">' + EMD.GIT_REPO_URL + '</a>',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // es
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Puedes encontrar el código fuente de este bot en GitHub:\n\n'
                                    + '<a href="' + EMD.GIT_REPO_URL + '#L3872">' + EMD.GIT_REPO_URL + '</a>',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // fr
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Vous pouvez trouver le code source de ce bot sur GitHub:\n\n'
                                    + '<a href="' + EMD.GIT_REPO_URL + '#L3872">' + EMD.GIT_REPO_URL + '</a>',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ar
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'يمكنك العثور على الشفرة المصدرية لهذا البوت على GitHub:\n\n'
                                    + '<a href="' + EMD.GIT_REPO_URL + '#L3872">' + EMD.GIT_REPO_URL + '</a>',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // de
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Sie können den Quellcode dieses Bots auf GitHub finden:\n\n'
                                    + '<a href="' + EMD.GIT_REPO_URL + '#L3872">' + EMD.GIT_REPO_URL + '</a>',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // it
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Puoi trovare il codice sorgente di questo bot su GitHub:\n\n'
                                    + '<a href="' + EMD.GIT_REPO_URL + '#L3872">' + EMD.GIT_REPO_URL + '</a>',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // pt
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Você pode encontrar o código-fonte deste bot no GitHub:\n\n'
                                    + '<a href="' + EMD.GIT_REPO_URL + '#L3872">' + EMD.GIT_REPO_URL + '</a>',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ru
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Вы можете найти исходный код этого бота на GitHub:\n\n'
                                    + '<a href="' + EMD.GIT_REPO_URL + '#L3872">' + EMD.GIT_REPO_URL + '</a>',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // zh
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '您可以在 GitHub 上找到此机器人的源代码：\n\n'
                                    + '<a href="' + EMD.GIT_REPO_URL + '#L3872">' + EMD.GIT_REPO_URL + '</a>',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ja
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'このボットのソースコードはGitHubで見つけることができます：\n\n'
                                    + '<a href="' + EMD.GIT_REPO_URL + '#L3872">' + EMD.GIT_REPO_URL + '</a>',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ko
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '이 봇의 소스 코드는 GitHub에서 찾을 수 있습니다:\n\n'
                                    + '<a href="' + EMD.GIT_REPO_URL + '#L3872">' + EMD.GIT_REPO_URL + '</a>',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // he
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'אתה יכול למצוא את קוד המקור של הבוט הזה ב-GitHub:\n\n'
                                    + '<a href="' + EMD.GIT_REPO_URL + '#L3872">' + EMD.GIT_REPO_URL + '</a>',
                                parse_mode: 'HTML'
                            }
                        }])
                    ],
                    ['#send_privacy_policy_message',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'This is a secure private message. 🔒\n\n'
                                    + 'Please ensure that you do not share this message with anyone else.',
                                parse_mode: 'HTML'
                            }
                        }])

                    ],
                    ['#answer_completed',
                        // default (en)
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: 'Session completed successfully! ✅',
                                show_alert: false
                            }
                        }]),
                        // es
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: '¡Sesión completada con éxito! ✅',
                                show_alert: false
                            }
                        }]),
                        // fr
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: 'Session terminée avec succès ! ✅',
                                show_alert: false
                            }
                        }]),
                        // ar
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: 'تم إكمال الجلسة بنجاح! ✅',
                                show_alert: false
                            }
                        }]),
                        // de
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: 'Sitzung erfolgreich abgeschlossen! ✅',
                                show_alert: false
                            }
                        }]),
                        // it
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: 'Sessione completata con successo! ✅',
                                show_alert: false
                            }
                        }]),
                        // pt
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: 'Sessão concluída com sucesso! ✅',
                                show_alert: false
                            }
                        }]),
                        // ru
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: 'Сессия успешно завершена! ✅',
                                show_alert: false
                            }
                        }]),
                        // zh
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: '会话成功完成！ ✅',
                                show_alert: false
                            }
                        }]),
                        // ja
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: 'セッションが正常に完了しました！ ✅',
                                show_alert: false
                            }
                        }]),
                        // ko
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: '세션이 성공적으로 완료되었습니다! ✅',
                                show_alert: false
                            }
                        }]),
                        // he
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: 'הסשן הושלם בהצלחה! ✅',
                                show_alert: false
                            }
                        }])
                    ],
                    ['#answer_unknown_action',
                        // default (en)
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: '🚧 Oops! We could not recognize this action. Please try again or use /help for assistance.',
                                show_alert: false
                            }
                        }]),
                        // es
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: '🚧 ¡Vaya! No pudimos reconocer esta acción. Por favor, inténtalo de nuevo o usa /help para obtener ayuda.',
                                show_alert: false
                            }
                        }]),
                        // fr
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: '🚧 Oups ! Nous n\'avons pas pu reconnaître cette action. Veuillez réessayer ou utiliser /help pour obtenir de l\'aide.',
                                show_alert: false
                            }
                        }]),
                        // ar
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: '🚧 عذرًا! لم نتمكن من التعرف على هذا الإجراء. يرجى المحاولة مرة أخرى أو استخدام /help للحصول على المساعدة.',
                                show_alert: false
                            }
                        }]),
                        // de
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: '🚧 Hoppla! Wir konnten diese Aktion nicht erkennen. Bitte versuchen Sie es erneut oder verwenden Sie /help für Unterstützung.',
                                show_alert: false
                            }
                        }]),
                        // it
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: '🚧 Ops! Non siamo riusciti a riconoscere questa azione. Per favore riprova o usa /help per assistenza.',
                                show_alert: false
                            }
                        }]),
                        // pt
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: '🚧 Ops! Não conseguimos reconhecer esta ação. Por favor, tente novamente ou use /help para obter assistência.',
                                show_alert: false
                            }
                        }]),
                        // ru
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: '🚧 Упс! Мы не смогли распознать это действие. Пожалуйста, попробуйте еще раз или используйте /help для получения помощи.',
                                show_alert: false
                            }
                        }]),
                        // zh
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: '🚧 哎呀！我们无法识别此操作。请重试或使用 /help 获取帮助。',
                                show_alert: false
                            }
                        }]),
                        // ja
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: '🚧 おっと！このアクションを認識できませんでした。もう一度お試しいただくか、/help を使用してヘルプを取得してください。',
                                show_alert: false
                            }
                        }]),
                        // ko
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: '🚧 죄송합니다! 이 작업을 인식할 수 없습니다. 다시 시도하거나 /help를 사용하여 도움을 받으세요.',
                                show_alert: false
                            }
                        }]),
                        // he
                        JSON.stringify([{
                            method: 'answerCallbackQuery',
                            payload: {
                                text: '🚧 מצטערים! לא הצלחנו לזהות את הפעולה הזו. אנא נסה שוב או השתמש ב-/help לקבלת עזרה.',
                                show_alert: false
                            }
                        }])
                    ],
                    ['#send_about_opensource_message',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'This bot is open-source! 🎉\n\n'
                                    + 'Feel free to explore the source code, contribute, or customize it for your own needs.\n\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // es
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '¡Este bot es de código abierto! 🎉\n\n'
                                    + 'No dudes en explorar el código fuente, contribuir o personalizarlo según tus propias necesidades.\n\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // fr
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Ce bot est open-source ! 🎉\n\n'
                                    + 'N\'hésitez pas à explorer le code source, contribuer ou le personnaliser selon vos propres besoins.\n\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ar
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'هذا البوت مفتوح المصدر! 🎉\n\n'
                                    + 'لا تتردد في استكشاف الكود المصدري، المساهمة، أو تخصيصه حسب احتياجاتك الخاصة.\n\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // de
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Dieser Bot ist Open-Source! 🎉\n\n'
                                    + 'Fühlen Sie sich frei, den Quellcode zu erkunden, beizutragen oder ihn an Ihre eigenen Bedürfnisse anzupassen.\n\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // it
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Questo bot è open-source! 🎉\n\n'
                                    + 'Sentiti libero di esplorare il codice sorgente, contribuire o personalizzarlo in base alle tue esigenze.\n\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // pt
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Este bot é de código aberto! 🎉\n\n'
                                    + 'Sinta-se à vontade para explorar o código-fonte, contribuir ou personalizá-lo de acordo com suas necessidades.\n\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ru
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Этот бот с открытым исходным кодом! 🎉\n\n'
                                    + 'Не стесняйтесь исследовать исходный код, вносить свой вклад или настраивать его в соответствии с вашими потребностями.\n\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // zh
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '这个机器人是开源的！ 🎉\n\n'
                                    + '欢迎探索源代码，贡献或根据您的需求进行定制。\n\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ja
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'このボットはオープンソースです！ 🎉\n\n'
                                    + 'ソースコードを自由に探索し、貢献したり、自分のニーズに合わせてカスタマイズしたりしてください。\n\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ko
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '이 봇은 오픈 소스입니다! 🎉\n\n'
                                    + '소스 코드를 자유롭게 탐색하고, 기여하거나, 자신의 필요에 맞게 맞춤 설정하세요.\n\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // he
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'הבוט הזה הוא קוד פתוח! 🎉\n\n'
                                    + 'אל תהססו לחקור את קוד המקור, לתרום או להתאים אותו לצרכים שלכם.\n\n',
                                parse_mode: 'HTML'
                            }
                        }])
                    ],
                    ['#send_donation_message',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'If you find this bot useful and would like to support its development, please consider making a donation. 🙏\n\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // es
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Si encuentras este bot útil y te gustaría apoyar su desarrollo, considera hacer una donación. 🙏\n\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // fr
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Si vous trouvez ce bot utile et souhaitez soutenir son développement, veuillez envisager de faire un don. 🙏\n\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ar
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'إذا وجدت هذا البوت مفيدًا وترغب في دعم تطويره، يرجى التفكير في التبرع. 🙏\n\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // de
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Wenn Sie diesen Bot nützlich finden und seine Entwicklung unterstützen möchten, ziehen Sie bitte eine Spende in Betracht. 🙏\n\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // it
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Se trovi questo bot utile e desideri supportarne lo sviluppo, considera la possibilità di fare una donazione. 🙏\n\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // pt
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Se você achar este bot útil e quiser apoiar seu desenvolvimento, considere fazer uma doação. 🙏\n\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ru
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Если вы считаете этого бота полезным и хотите поддержать его разработку, пожалуйста, рассмотрите возможность сделать пожертвование. 🙏\n\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // zh
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '如果您觉得这个机器人有用，并希望支持其开发，请考虑捐赠。🙏\n\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ja
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'このボットが役に立った場合、その開発を支援するために寄付を検討してください。🙏\n\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ko
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '이 봇이 유용하다고 생각되면 개발을 지원하기 위해 기부를 고려해 주세요. 🙏\n\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // he
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'אם אתה מוצא את הבוט הזה שימושי ורוצה לתמוך בפיתוחו, אנא שקול לעשות תרומה. 🙏\n\n',
                                parse_mode: 'HTML'
                            }
                        }])
                    ],
                    ['#send_donation_invoice_a',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendInvoice',
                            payload: {
                                title: 'Support Development - Tier A',
                                description: 'Support the ongoing development and maintenance of this bot with a Tier A donation. Your contribution helps us keep the bot running smoothly and add new features!',
                                currency: 'XTR',
                                payload: 'donation_tier_a_001',
                                prices: JSON.stringify([
                                    { label: 'Tier A Donation', amount: 100 } // Amount in smallest units (e.g., cents)
                                ]),
                            }
                        }]),
                        // es
                        JSON.stringify([{
                            method: 'sendInvoice',
                            payload: {
                                title: 'Apoyar el Desarrollo - Nivel A',
                                description: 'Apoya el desarrollo y mantenimiento continuo de este bot con una donación de Nivel A. ¡Tu contribución nos ayuda a mantener el bot funcionando sin problemas y agregar nuevas funciones!',
                                currency: 'XTR',
                                payload: 'donation_tier_a_001',
                                prices: JSON.stringify([
                                    { label: 'Donación Nivel A', amount: 100 } // Amount in smallest units (e.g., cents)
                                ]),
                            }
                        }]),
                        // fr
                        JSON.stringify([{
                            method: 'sendInvoice',
                            payload: {
                                title: 'Soutenir le Développement - Niveau A',
                                description: 'Soutenez le développement et la maintenance continus de ce bot avec un don de Niveau A. Votre contribution nous aide à maintenir le bon fonctionnement du bot et à ajouter de nouvelles fonctionnalités !',
                                currency: 'XTR',
                                payload: 'donation_tier_a_001',
                                prices: JSON.stringify([
                                    { label: 'Don de Niveau A', amount: 100 } // Amount in smallest units (e.g., cents)
                                ]),
                            }
                        }]),
                        // ar
                        JSON.stringify([{
                            method: 'sendInvoice',
                            payload: {
                                title: 'دعم التطوير - المستوى أ',
                                description: 'ادعم التطوير والصيانة المستمرة لهذا البوت من خلال تبرع من المستوى أ. تساعدنا مساهمتك في الحفاظ على تشغيل البوت بسلاسة وإضافة ميزات جديدة!',
                                currency: 'XTR',
                                payload: 'donation_tier_a_001',
                                prices: JSON.stringify([
                                    { label: 'تبرع المستوى أ', amount: 100 } // Amount in smallest units (e.g., cents)
                                ]),
                            }
                        }]),
                        // de
                        JSON.stringify([{
                            method: 'sendInvoice',
                            payload: {
                                title: 'Unterstützen Sie die Entwicklung - Stufe A',
                                description: 'Unterstützen Sie die laufende Entwicklung und Wartung dieses Bots mit einer Spende der Stufe A. Ihr Beitrag hilft uns, den Bot reibungslos am Laufen zu halten und neue Funktionen hinzuzufügen!',
                                currency: 'XTR',
                                payload: 'donation_tier_a_001',
                                prices: JSON.stringify([
                                    { label: 'Spende Stufe A', amount: 100 } // Amount in smallest units (e.g., cents)
                                ]),
                            }
                        }]),
                        // it
                        JSON.stringify([{
                            method: 'sendInvoice',
                            payload: {
                                title: 'Supporta lo Sviluppo - Livello A',
                                description: 'Supporta lo sviluppo e la manutenzione continua di questo bot con una donazione di Livello A. Il tuo contributo ci aiuta a mantenere il bot funzionante senza problemi e ad aggiungere nuove funzionalità!',
                                currency: 'XTR',
                                payload: 'donation_tier_a_001',
                                prices: JSON.stringify([
                                    { label: 'Donazione Livello A', amount: 100 } // Amount in smallest units (e.g., cents)
                                ]),
                            }
                        }]),
                        // pt
                        JSON.stringify([{
                            method: 'sendInvoice',
                            payload: {
                                title: 'Apoie o Desenvolvimento - Nível A',
                                description: 'Apoie o desenvolvimento e a manutenção contínua deste bot com uma doação de Nível A. Sua contribuição nos ajuda a manter o bot funcionando sem problemas e a adicionar novos recursos!',
                                currency: 'XTR',
                                payload: 'donation_tier_a_001',
                                prices: JSON.stringify([
                                    { label: 'Doação Nível A', amount: 100 } // Amount in smallest units (e.g., cents)
                                ]),
                            }
                        }]),
                        // ru
                        JSON.stringify([{
                            method: 'sendInvoice',
                            payload: {
                                title: 'Поддержите разработку - Уровень А',
                                description: 'Поддержите текущую разработку и обслуживание этого бота пожертвованием уровня А. Ваш вклад помогает нам поддерживать работу бота и добавлять новые функции!',
                                currency: 'XTR',
                                payload: 'donation_tier_a_001',
                                prices: JSON.stringify([
                                    { label: 'Пожертвование Уровень А', amount: 100 } // Amount in smallest units (e.g., cents)
                                ]),
                            }
                        }]),
                        // zh
                        JSON.stringify([{
                            method: 'sendInvoice',
                            payload: {
                                title: '支持开发 - A级',
                                description: '通过A级捐赠支持此机器人的持续开发和维护。您的贡献帮助我们保持机器人顺利运行并添加新功能！',
                                currency: 'XTR',
                                payload: 'donation_tier_a_001',
                                prices: JSON.stringify([
                                    { label: 'A级捐赠', amount: 100 } // Amount in smallest units (e.g., cents)
                                ]),
                            }
                        }]),
                        // ja
                        JSON.stringify([{
                            method: 'sendInvoice',
                            payload: {
                                title: '開発支援 - レベルA',
                                description: 'レベルAの寄付でこのボットの継続的な開発とメンテナンスを支援してください。あなたの貢献は、ボットのスムーズな運用と新機能の追加に役立ちます！',
                                currency: 'XTR',
                                payload: 'donation_tier_a_001',
                                prices: JSON.stringify([
                                    { label: 'レベルAの寄付', amount: 100 } // Amount in smallest units (e.g., cents)
                                ]),
                            }
                        }]),
                        // ko
                        JSON.stringify([{
                            method: 'sendInvoice',
                            payload: {
                                title: '개발 지원 - 레벨 A',
                                description: '레벨 A 기부로 이 봇의 지속적인 개발 및 유지 관리를 지원하세요. 귀하의 기여는 봇의 원활한 운영과 새로운 기능 추가에 도움이 됩니다!',
                                currency: 'XTR',
                                payload: 'donation_tier_a_001',
                                prices: JSON.stringify([
                                    { label: '레벨 A 기부', amount: 100 } // Amount in smallest units (e.g., cents)
                                ]),
                            }
                        }]),
                        // he
                        JSON.stringify([{
                            method: 'sendInvoice',
                            payload: {
                                title: 'תמיכה בפיתוח - רמה א',
                                description: 'תמכו בפיתוח ובתחזוקה המתמשכת של הבוט הזה באמצעות תרומה ברמה א. התרומה שלכם עוזרת לנו לשמור על הבוט פועל בצורה חלקה ולהוסיף תכונות חדשות!',
                                currency: 'XTR',
                                payload: 'donation_tier_a_001',
                                prices: JSON.stringify([
                                    { label: 'תרומת רמה א', amount: 100 } // Amount in smallest units (e.g., cents)
                                ]),
                            }
                        }])
                    ],
                    ['#send_please_support_message',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Your support means a lot to us! 🌟\n\nThank you for considering a donation to help us keep improving this bot.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // es
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '¡Tu apoyo significa mucho para nosotros! 🌟\n\nGracias por considerar una donación para ayudarnos a seguir mejorando este bot.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // fr
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Votre soutien signifie beaucoup pour nous ! 🌟\n\nMerci de considérer un don pour nous aider à continuer d\'améliorer ce bot.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ar
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'دعمكم يعني الكثير لنا! 🌟\n\nشكرًا للنظر في التبرع لمساعدتنا في الاستمرار في تحسين هذا البوت.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // de
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Ihre Unterstützung bedeutet uns viel! 🌟\n\nVielen Dank, dass Sie eine Spende in Betracht ziehen, um uns zu helfen, diesen Bot weiter zu verbessern.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // it
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Il tuo supporto significa molto per noi! 🌟\n\nGrazie per aver considerato una donazione per aiutarci a continuare a migliorare questo bot.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // pt
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Seu apoio significa muito para nós! 🌟\n\nObrigado por considerar uma doação para nos ajudar a continuar melhorando este bot.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ru
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Ваша поддержка много для нас значит! 🌟\n\nСпасибо, что рассматриваете возможность пожертвования, чтобы помочь нам продолжать улучшать этого бота.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // zh
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '您的支持对我们意义重大！ 🌟\n\n感谢您考虑捐赠以帮助我们不断改进这个机器人。',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ja
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'あなたのサポートは私たちにとって非常に重要です！ 🌟\n\nこのボットの改善を続けるために寄付を検討していただき、ありがとうございます。',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ko
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '당신의 지원은 우리에게 큰 의미가 있습니다! 🌟\n\n이 봇을 계속 개선할 수 있도록 기부를 고려해 주셔서 감사합니다.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // he
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'התמיכה שלך משמעותית עבורנו! 🌟\n\nתודה ששקלת לתרום כדי לעזור לנו להמשיך ולשפר את הבוט הזה.',
                                parse_mode: 'HTML'
                            }
                        }])
                    ],
                    ['#send_how_to_contribute_message',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Want to contribute to this project? 🤝\n\n'
                                    + 'You can help by reporting issues, suggesting features, or submitting pull requests on our GitHub repository.\n\n'
                                    + 'Visit: <a href="' + EMD.GIT_REPO_URL + '">' + EMD.GIT_REPO_URL + '</a> to get started!'
                                    + '\n\nDo you want to be a part of our community?'
                                    + '\n\nSelect one of the options below.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // es
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '¿Quieres contribuir a este proyecto? 🤝\n\n'
                                    + 'Puedes ayudar reportando problemas, sugiriendo características o enviando pull requests en nuestro repositorio de GitHub.\n\n'
                                    + 'Visita: <a href="' + EMD.GIT_REPO_URL + '">' + EMD.GIT_REPO_URL + '</a> para comenzar!'
                                    + '\n\n¿Quieres ser parte de nuestra comunidad?'
                                    + '\n\nSelecciona una de las opciones a continuación.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // fr
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Vous souhaitez contribuer à ce projet ? 🤝\n\n'
                                    + 'Vous pouvez aider en signalant des problèmes, en suggérant des fonctionnalités ou en soumettant des pull requests sur notre dépôt GitHub.\n\n'
                                    + 'Visitez : <a href="' + EMD.GIT_REPO_URL + '">' + EMD.GIT_REPO_URL + '</a> pour commencer!'
                                    + '\n\nVoulez-vous faire partie de notre communauté ?'
                                    + '\n\nSélectionnez l\'une des options ci-dessous.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ar
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'هل ترغب في المساهمة في هذا المشروع؟ 🤝\n\n'
                                    + 'يمكنك المساعدة عن طريق الإبلاغ عن المشكلات، اقتراح الميزات، أو تقديم طلبات سحب على مستودع GitHub الخاص بنا.\n\n'
                                    + 'قم بزيارة: <a href="' + EMD.GIT_REPO_URL + '">' + EMD.GIT_REPO_URL + '</a> للبدء!'
                                    + '\n\nهل تريد أن تكون جزءًا من مجتمعنا؟'
                                    + '\n\nاختر أحد الخيارات أدناه.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // de
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Möchten Sie zu diesem Projekt beitragen? 🤝\n\n'
                                    + 'Sie können helfen, indem Sie Probleme melden, Funktionen vorschlagen oder Pull-Anfragen in unserem GitHub-Repository einreichen.\n\n'
                                    + 'Besuchen Sie: <a href="' + EMD.GIT_REPO_URL + '">' + EMD.GIT_REPO_URL + '</a>, um loszulegen!'
                                    + '\n\nMöchten Sie Teil unserer Community sein?'
                                    + '\n\nWählen Sie eine der untenstehenden Optionen.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // it
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Vuoi contribuire a questo progetto? 🤝\n\n'
                                    + 'Puoi aiutare segnalando problemi, suggerendo funzionalità o inviando pull request nel nostro repository GitHub.\n\n'
                                    + 'Visita: <a href="' + EMD.GIT_REPO_URL + '">' + EMD.GIT_REPO_URL + '</a> per iniziare!'
                                    + '\n\nVuoi far parte della nostra comunità?'
                                    + '\n\nSeleziona una delle opzioni qui sotto.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // pt
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Você deseja contribuir para este projeto? 🤝\n\n'
                                    + 'Você pode ajudar relatando problemas, sugerindo recursos ou enviando pull requests em nosso repositório GitHub.\n\n'
                                    + 'Visite: <a href="' + EMD.GIT_REPO_URL + '">' + EMD.GIT_REPO_URL + '</a> para começar!'
                                    + '\n\nVocê quer fazer parte da nossa comunidade?'
                                    + '\n\nSelecione uma das opções abaixo.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ru
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Вы хотите внести свой вклад в этот проект? 🤝\n\n'
                                    + 'Вы можете помочь, сообщая о проблемах, предлагая функции или отправляя запросы на включение изменений в нашем репозитории GitHub.\n\n'
                                    + 'Посетите: <a href="' + EMD.GIT_REPO_URL + '">' + EMD.GIT_REPO_URL + '</a>, чтобы начать!'
                                    + '\n\nХотите стать частью нашего сообщества?'
                                    + '\n\nВыберите один из вариантов ниже.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // zh
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '您想为这个项目做出贡献吗？ 🤝\n\n'
                                    + '您可以通过报告问题、建议功能或在我们的 GitHub 仓库中提交拉取请求来帮助我们。\n\n'
                                    + '访问：<a href="' + EMD.GIT_REPO_URL + '">' + EMD.GIT_REPO_URL + '</a> 开始吧！'
                                    + '\n\n您想成为我们社区的一员吗？'
                                    + '\n\n请选择以下选项之一。',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ja
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'このプロジェクトに貢献したいですか？ 🤝\n\n'
                                    + '問題を報告したり、機能を提案したり、プルリクエストを送信したりして、私たちのGitHubリポジトリで支援できます。\n\n'
                                    + '訪問：<a href="' + EMD.GIT_REPO_URL + '">' + EMD.GIT_REPO_URL + '</a> から始めましょう！'
                                    + '\n\n私たちのコミュニティの一員になりたいですか？'
                                    + '\n\n以下のオプションのいずれかを選択してください。',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ko
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '이 프로젝트에 기여하고 싶으신가요? 🤝\n\n'
                                    + '문제를 보고하거나 기능을 제안하거나 GitHub 저장소에 풀 리퀘스트를 제출하여 도울 수 있습니다.\n\n'
                                    + '시작하려면 방문하세요: <a href="' + EMD.GIT_REPO_URL + '">' + EMD.GIT_REPO_URL + '</a>'
                                    + '\n\n우리 커뮤니티의 일원이 되고 싶으신가요?'
                                    + '\n\n아래 옵션 중 하나를 선택하세요.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // he
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'האם ברצונך לתרום לפרויקט זה? 🤝\n\n'
                                    + 'אתה יכול לעזור על ידי דיווח על בעיות, הצעת תכונות או שליחת בקשות משיכה במאגר ה-GitHub שלנו.\n\n'
                                    + 'בקר בכתובת: <a href="' + EMD.GIT_REPO_URL + '">' + EMD.GIT_REPO_URL + '</a> כדי להתחיל!'
                                    + '\n\nהאם ברצונך להיות חלק מהקהילה שלנו?'
                                    + '\n\nבחר באחת מהאפשרויות למטה.',
                                parse_mode: 'HTML'
                            }
                        }])
                    ],
                    ['#send_show_me_love_message',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'If you love this bot and want to show your appreciation, please consider starring our GitHub repository! ⭐️\n\n'
                                    + 'Your support helps us reach more users and continue improving the bot.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // es
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Si amas este bot y quieres mostrar tu aprecio, ¡considera darle una estrella a nuestro repositorio de GitHub! ⭐️\n\n'
                                    + 'Tu apoyo nos ayuda a llegar a más usuarios y continuar mejorando el bot.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // fr
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Si vous aimez ce bot et souhaitez montrer votre appréciation, veuillez envisager de mettre une étoile à notre dépôt GitHub ! ⭐️\n\n'
                                    + 'Votre soutien nous aide à atteindre plus d\'utilisateurs et à continuer d\'améliorer le bot.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ar
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'إذا كنت تحب هذا البوت وترغب في إظهار تقديرك، يرجى التفكير في وضع نجمة على مستودع GitHub الخاص بنا! ⭐️\n\n'
                                    + 'دعمك يساعدنا في الوصول إلى المزيد من المستخدمين ومواصلة تحسين البوت.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // de
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Wenn du diesen Bot liebst und deine Wertschätzung zeigen möchtest, erwäge bitte, unserem GitHub-Repository einen Stern zu geben! ⭐️\n\n'
                                    + 'Deine Unterstützung hilft uns, mehr Nutzer zu erreichen und den Bot weiter zu verbessern.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // it
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Se ami questo bot e vuoi mostrare il tuo apprezzamento, considera di mettere una stella al nostro repository GitHub! ⭐️\n\n'
                                    + 'Il tuo supporto ci aiuta a raggiungere più utenti e a continuare a migliorare il bot.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // pt
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Se você ama este bot e quer mostrar sua apreciação, considere dar uma estrela ao nosso repositório GitHub! ⭐️\n\n'
                                    + 'Seu apoio nos ajuda a alcançar mais usuários e continuar melhorando o bot.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ru
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Если вам нравится этот бот и вы хотите выразить свою признательность, пожалуйста, рассмотрите возможность поставить звезду нашему репозиторию на GitHub! ⭐️\n\n'
                                    + 'Ваша поддержка помогает нам достигать большего числа пользователей и продолжать улучшать бота.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // zh
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '如果你喜欢这个机器人并想表达你的赞赏，请考虑给我们的GitHub仓库点个星！⭐️\n\n'
                                    + '你的支持帮助我们接触更多用户，继续改进机器人。',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ja
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'このボットが気に入っていて感謝の気持ちを示したい場合は、ぜひ私たちのGitHubリポジトリにスターを付けてください！ ⭐️\n\n'
                                    + 'あなたのサポートは、より多くのユーザーにリーチし、ボットを改善し続けるのに役立ちます。',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ko
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '이 봇을 좋아하고 감사를 표시하고 싶다면, 저희 GitHub 저장소에 별을 달아주세요! ⭐️\n\n'
                                    + '여러분의 지원은 더 많은 사용자에게 다가가고 봇을 계속 개선하는 데 도움이 됩니다.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // he
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'אם אתה אוהב את הבוט הזה ורוצה להראות את הערכתך, שקול לתת כוכב למאגר ה-GitHub שלנו! ⭐️\n\n'
                                    + 'התמיכה שלך עוזרת לנו להגיע ליותר משתמשים ולהמשיך לשפר את הבוט.',
                                parse_mode: 'HTML'
                            }
                        }])
                    ],
                    ['#send_show_me_love_invoice',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendInvoice',
                            payload: {
                                title: 'Show Some Love ❤️',
                                description: 'If you enjoy using this bot and would like to support its development, consider making a small donation. Every bit helps us keep improving and adding new features!',
                                currency: 'XTR',
                                payload: 'show_me_love_001',
                                prices: JSON.stringify([
                                    { label: 'Support Donation', amount: 100 } // Amount in smallest units (e.g., cents)
                                ]),
                                photo_url: EMD.LOGO_PNG_URL,
                                photo_width: 480,
                                protect_content: true
                            }
                        }]),
                        // es
                        JSON.stringify([{
                            method: 'sendInvoice',
                            payload: {
                                title: 'Muestra Algo de Amor ❤️',
                                description: 'Si disfrutas usar este bot y te gustaría apoyar su desarrollo, considera hacer una pequeña donación. ¡Cada aporte nos ayuda a seguir mejorando y agregando nuevas funciones!',
                                currency: 'XTR',
                                payload: 'show_me_love_001',
                                prices: JSON.stringify([
                                    { label: 'Donación de Apoyo', amount: 100 } // Amount in smallest units (e.g., cents)
                                ]),
                                photo_url: EMD.LOGO_PNG_URL,
                                photo_width: 480,
                                protect_content: true
                            }
                        }]),
                        // fr
                        JSON.stringify([{
                            method: 'sendInvoice',
                            payload: {
                                title: 'Montrez un Peu d\'Amour ❤️',
                                description: 'Si vous appréciez l\'utilisation de ce bot et souhaitez soutenir son développement, envisagez de faire un petit don. Chaque contribution nous aide à continuer d\'améliorer et d\'ajouter de nouvelles fonctionnalités !',
                                currency: 'XTR',
                                payload: 'show_me_love_001',
                                prices: JSON.stringify([
                                    { label: 'Don de Soutien', amount: 100 } // Amount in smallest units (e.g., cents)
                                ]),
                                photo_url: EMD.LOGO_PNG_URL,
                                photo_width: 480,
                                protect_content: true
                            }
                        }]),
                        // ar
                        JSON.stringify([{
                            method: 'sendInvoice',
                            payload: {
                                title: 'أظهر بعض الحب ❤️',
                                description: 'إذا كنت تستمتع باستخدام هذا البوت وترغب في دعم تطويره، فكر في تقديم تبرع صغير. كل مساهمة تساعدنا في الاستمرار في التحسين وإضافة ميزات جديدة!',
                                currency: 'XTR',
                                payload: 'show_me_love_001',
                                prices: JSON.stringify([
                                    { label: 'تبرع دعم', amount: 100 } // Amount in smallest units (e.g., cents)
                                ]),
                                photo_url: EMD.LOGO_PNG_URL,
                                photo_width: 480,
                                protect_content: true
                            }
                        }]),
                        // de
                        JSON.stringify([{
                            method: 'sendInvoice',
                            payload: {
                                title: 'Zeige etwas Liebe ❤️',
                                description: 'Wenn du diesen Bot gerne benutzt und seine Entwicklung unterstützen möchtest, erwäge eine kleine Spende. Jeder Beitrag hilft uns, den Bot weiter zu verbessern und neue Funktionen hinzuzufügen!',
                                currency: 'XTR',
                                payload: 'show_me_love_001',
                                prices: JSON.stringify([
                                    { label: 'Unterstützungs-Spende', amount: 100 } // Amount in smallest units (e.g., cents)
                                ]),
                                photo_url: EMD.LOGO_PNG_URL,
                                photo_width: 480,
                                protect_content: true
                            }
                        }]),
                        // it
                        JSON.stringify([{
                            method: 'sendInvoice',
                            payload: {
                                title: 'Mostra un po\' d\'amore ❤️',
                                description: 'Se ti piace usare questo bot e vuoi supportarne lo sviluppo, considera di fare una piccola donazione. Ogni contributo ci aiuta a continuare a migliorare e aggiungere nuove funzionalità!',
                                currency: 'XTR',
                                payload: 'show_me_love_001',
                                prices: JSON.stringify([
                                    { label: 'Donazione di Supporto', amount: 100 } // Amount in smallest units (e.g., cents)
                                ]),
                                photo_url: EMD.LOGO_PNG_URL,
                                photo_width: 480,
                                protect_content: true
                            }
                        }]),
                        // pt
                        JSON.stringify([{
                            method: 'sendInvoice',
                            payload: {
                                title: 'Mostra un po\' d\'amore ❤️',
                                description: 'Se ti piace usare questo bot e vuoi supportarne lo sviluppo, considera di fare una piccola donazione. Ogni contributo ci aiuta a continuare a migliorare e aggiungere nuove funzionalità!',
                                currency: 'XTR',
                                payload: 'show_me_love_001',
                                prices: JSON.stringify([
                                    { label: 'Donazione di Supporto', amount: 100 } // Amount in smallest units (e.g., cents)
                                ]),
                                photo_url: EMD.LOGO_PNG_URL,
                                photo_width: 480,
                                protect_content: true
                            }
                        }]),
                        // ru
                        JSON.stringify([{
                            method: 'sendInvoice',
                            payload: {
                                title: 'Покажи немного любви ❤️',
                                description: 'Если вам нравится использовать этого бота и вы хотите поддержать его развитие, рассмотрите возможность сделать небольшой взнос. Каждый вклад помогает нам продолжать улучшать бота и добавлять новые функции!',
                                currency: 'XTR',
                                payload: 'show_me_love_001',
                                prices: JSON.stringify([
                                    { label: 'Пожертвование на поддержку', amount: 100 } // Amount in smallest units (e.g., cents)
                                ]),
                                photo_url: EMD.LOGO_PNG_URL,
                                photo_width: 480,
                                protect_content: true
                            }
                        }]),
                        // zh
                        JSON.stringify([{
                            method: 'sendInvoice',
                            payload: {
                                title: '展示一点爱 ❤️',
                                description: '如果你喜欢使用这个机器人并想支持它的发展，考虑做一个小额捐赠。每一份贡献都帮助我们继续改进机器人并添加新功能！',
                                currency: 'XTR',
                                payload: 'show_me_love_001',
                                prices: JSON.stringify([
                                    { label: '支持捐赠', amount: 100 } // Amount in smallest units (e.g., cents)
                                ]),
                                photo_url: EMD.LOGO_PNG_URL,
                                photo_width: 480,
                                protect_content: true
                            }
                        }]),
                        // ja
                        JSON.stringify([{
                            method: 'sendInvoice',
                            payload: {
                                title: '少し愛を見せて ❤️',
                                description: 'このボットの使用が気に入っていて、その開発をサポートしたい場合は、小額の寄付を検討してください。すべての寄付がボットの改善と新機能の追加に役立ちます！',
                                currency: 'XTR',
                                payload: 'show_me_love_001',
                                prices: JSON.stringify([
                                    { label: 'サポート寄付', amount: 100 } // Amount in smallest units (e.g., cents)
                                ]),
                                photo_url: EMD.LOGO_PNG_URL,
                                photo_width: 480,
                                protect_content: true
                            }
                        }]),
                        // ko
                        JSON.stringify([{
                            method: 'sendInvoice',
                            payload: {
                                title: '조금의 사랑을 보여주세요 ❤️',
                                description: '이 봇을 사용하는 것이 마음에 들고 개발을 지원하고 싶다면 작은 기부를 고려해 보세요. 모든 기부는 봇을 개선하고 새로운 기능을 추가하는 데 도움이 됩니다!',
                                currency: 'XTR',
                                payload: 'show_me_love_001',
                                prices: JSON.stringify([
                                    { label: '지원 기부', amount: 100 } // Amount in smallest units (e.g., cents)
                                ]),
                                photo_url: EMD.LOGO_PNG_URL,
                                photo_width: 480,
                                protect_content: true
                            }
                        }]),
                        // he
                        JSON.stringify([{
                            method: 'sendInvoice',
                            payload: {
                                title: 'הראה קצת אהבה ❤️',
                                description: 'אם אתה אוהב להשתמש בבוט הזה ורוצה לתמוך בפיתוח שלו, שקול לעשות תרומה קטנה. כל תרומה עוזרת לנו להמשיך לשפר את הבוט ולהוסיף תכונות חדשות!',
                                currency: 'XTR',
                                payload: 'show_me_love_001',
                                prices: JSON.stringify([
                                    { label: 'תרומת תמיכה', amount: 100 } // Amount in smallest units (e.g., cents)
                                ]),
                                photo_url: EMD.LOGO_PNG_URL,
                                photo_width: 480,
                                protect_content: true
                            }
                        }])
                    ],
                    ['#send_end_of_session_message',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '- ⌨️',
                                parse_mode: 'HTML'
                            }
                        }])
                    ],
                    ['/security_checks',
                        // default (en)
                        JSON.stringify([
                            { "next": "#remove_keyboard" },
                            { "next": "#send_welcome_to_security_checks_message" },
                            { "next": "#send_malware_protection_message" },
                            { "next": "#send_check_your_device_now_message" },
                            { "next": "#append_top_security_checks_keyboard" }
                        ])
                    ],
                    ['#send_welcome_to_security_checks_message',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Welcome to Security Checks! \n\n'
                                    + 'Here you can find recommendations to enhance the security of your device, account and data.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // es
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '¡Bienvenido a las Verificaciones de Seguridad! \n\n'
                                    + 'Aquí puedes encontrar recomendaciones para mejorar la seguridad de tu dispositivo, cuenta y datos.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // fr
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Bienvenue dans les Vérifications de Sécurité ! \n\n'
                                    + 'Ici, vous pouvez trouver des recommandations pour améliorer la sécurité de votre appareil, compte et données.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ar
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'مرحبًا بك في فحوصات الأمان! \n\n'
                                    + 'هنا يمكنك العثور على توصيات لتعزيز أمان جهازك وحسابك وبياناتك.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // de
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Willkommen bei den Sicherheitsprüfungen! \n\n'
                                    + 'Hier finden Sie Empfehlungen zur Verbesserung der Sicherheit Ihres Geräts, Kontos und Ihrer Daten.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // it
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Benvenuto in Controlli di Sicurezza! \n\n'
                                    + 'Qui puoi trovare raccomandazioni per migliorare la sicurezza del tuo dispositivo, account e dati.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // pt
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Bem-vindo às Verificações de Segurança! \n\n'
                                    + 'Aqui você pode encontrar recomendações para melhorar a segurança do seu dispositivo, conta e dados.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ru
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Добро пожаловать в Проверки безопасности! \n\n'
                                    + 'Здесь вы можете найти рекомендации по повышению безопасности вашего устройства, аккаунта и данных.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // zh
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '欢迎使用安全检查！ \n\n'
                                    + '在这里，您可以找到增强设备、帐户和数据安全性的建议。',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ja
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'セキュリティチェックへようこそ！ \n\n'
                                    + 'ここでは、デバイス、アカウント、データのセキュリティを強化するための推奨事項を見つけることができます。',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ko
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '보안 검사에 오신 것을 환영합니다! \n\n'
                                    + '여기에서 장치, 계정 및 데이터의 보안을 강화하기 위한 권장 사항을 찾을 수 있습니다.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // he
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'ברוכים הבאים לבדיקות אבטחה! \n\n'
                                    + 'כאן תוכלו למצוא המלצות לשיפור האבטחה של המכשיר, החשבון והנתונים שלכם.',
                                parse_mode: 'HTML'
                            }
                        }])
                    ],
                    ['#send_malware_protection_message',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Malware Protection: \n\n'
                                    + 'Ensure your device has up-to-date antivirus software installed to protect against malware threats.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // es
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Protección contra malware: \n\n'
                                    + 'Asegúrate de que tu dispositivo tenga instalado un software antivirus actualizado para protegerte contra amenazas de malware.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // fr
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Protection contre les logiciels malveillants : \n\n'
                                    + 'Assurez-vous que votre appareil dispose d\'un logiciel antivirus à jour pour vous protéger contre les menaces de logiciels malveillants.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ar
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'حماية من البرامج الضارة: \n\n'
                                    + 'تأكد من أن جهازك يحتوي على برنامج مضاد فيروسات محدث لحمايتك من تهديدات البرامج الضارة.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // de
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Malware-Schutz: \n\n'
                                    + 'Stellen Sie sicher, dass auf Ihrem Gerät eine aktuelle Antivirensoftware installiert ist, um sich vor Malware-Bedrohungen zu schützen.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // it
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Protezione da malware: \n\n'
                                    + 'Assicurati che il tuo dispositivo abbia un software antivirus aggiornato per proteggerti dalle minacce di malware.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // pt
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Proteção contra malware: \n\n'
                                    + 'Certifique-se de que seu dispositivo tenha um software antivírus atualizado para protegê-lo contra ameaças de malware.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ru
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Защита от вредоносных программ: \n\n'
                                    + 'Убедитесь, что на вашем устройстве установлено обновленное антивирусное программное обеспечение для защиты от угроз вредоносных программ.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // zh
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '恶意软件保护： \n\n'
                                    + '确保您的设备安装了最新的防病毒软件，以保护您免受恶意软件的威胁。',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ja
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'マルウェア対策： \n\n'
                                    + 'お使いのデバイスに最新のアンチウイルスソフトウェアがインストールされていることを確認して、マルウェアの脅威から保護してください。',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ko
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '맬웨어 보호: \n\n'
                                    + '장치에 최신 안티바이러스 소프트웨어가 설치되어 있어 맬웨어 위협으로부터 보호받을 수 있도록 하십시오.',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // he
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'הגנה מפני תוכנות זדוניות: \n\n'
                                    + 'ודא שהמכשיר שלך מותקן עם תוכנת אנטי-וירוס מעודכנת כדי להגן מפני איומי תוכנות זדוניות.',
                                parse_mode: 'HTML'
                            }
                        }])
                    ],
                    ['#send_check_your_device_now_message',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Check Your Device Now! \n\n'
                                    + 'Ensure your device is secure by following these steps:\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // es
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '¡Revisa tu dispositivo ahora! \n\n'
                                    + 'Asegúrate de que tu dispositivo esté seguro siguiendo estos pasos:\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // fr
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Vérifiez votre appareil maintenant ! \n\n'
                                    + 'Assurez-vous que votre appareil est sécurisé en suivant ces étapes :\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ar
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'تحقق من جهازك الآن! \n\n'
                                    + 'تأكد من أن جهازك آمن باتباع هذه الخطوات:\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // de
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Überprüfen Sie jetzt Ihr Gerät! \n\n'
                                    + 'Stellen Sie sicher, dass Ihr Gerät sicher ist, indem Sie diese Schritte befolgen:\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // it
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Controlla il tuo dispositivo ora! \n\n'
                                    + 'Assicurati che il tuo dispositivo sia sicuro seguendo questi passaggi:\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // pt
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Verifique seu dispositivo agora! \n\n'
                                    + 'Certifique-se de que seu dispositivo está seguro seguindo estas etapas:\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ru
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Проверьте свое устройство сейчас! \n\n'
                                    + 'Убедитесь, что ваше устройство защищено, выполнив следующие шаги:\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // zh
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '立即检查您的设备！ \n\n'
                                    + '按照以下步骤确保您的设备安全：\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ja
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '今すぐデバイスを確認してください！ \n\n'
                                    + '次の手順に従って、デバイスが安全であることを確認してください：\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ko
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: '지금 장치를 확인하세요! \n\n'
                                    + '다음 단계를 따라 장치가 안전한지 확인하십시오:\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // he
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'בדוק את המכשיר שלך עכשיו! \n\n'
                                    + 'ודא שהמכשיר שלך מאובטח על ידי ביצוע השלבים הבאים:\n',
                                parse_mode: 'HTML'
                            }
                        }])
                    ],
                    ['/android_security_checks',
                        // default (en)
                        JSON.stringify([
                            { "next": "#remove_keyboard" },
                            { "next": '#send_android_security_checks' },
                            { "next": '#append_top_security_checks_keyboard' }
                        ])
                    ],
                    ['/ios_security_checks',
                        // default (en)
                        JSON.stringify([
                            { "next": "#remove_keyboard" },
                            { "next": '#send_ios_security_checks' },
                            { "next": '#append_top_security_checks_keyboard' }
                        ])
                    ],
                    ['/privacy_checks',
                        // default (en)
                        JSON.stringify([
                            { "next": "#remove_keyboard" },
                            { "next": '#send_privacy_checks' },
                            { "next": '#append_top_security_checks_keyboard' }
                        ])
                    ],
                    ['#send_android_security_checks',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Android Security Checks: \n\n'
                                    + '1. Keep your device updated with the latest security patches.\n'
                                    + '2. Only install apps from trusted sources like Google Play Store.\n'
                                    + '3. Use a strong screen lock and enable biometric authentication.\n'
                                    + '4. Regularly back up your data to a secure location.\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // es
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Verificaciones de seguridad de Android: \n\n'
                                    + '1. Mantén tu dispositivo actualizado con los últimos parches de seguridad.\n'
                                    + '2. Solo instala aplicaciones de fuentes confiables como Google Play Store.\n'
                                    + '3. Usa un bloqueo de pantalla fuerte y habilita la autenticación biométrica.\n'
                                    + '4. Realiza copias de seguridad de tus datos regularmente en una ubicación segura.\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // fr
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Vérifications de sécurité Android : \n\n'
                                    + '1. Gardez votre appareil à jour avec les derniers correctifs de sécurité.\n'
                                    + '2. N\'installez des applications que depuis des sources fiables comme le Google Play Store.\n'
                                    + '3. Utilisez un verrouillage d\'écran fort et activez l\'authentification biométrique.\n'
                                    + '4. Sauvegardez régulièrement vos données dans un endroit sécurisé.\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ar
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'فحوصات أمان Android: \n\n'
                                    + '1. حافظ على تحديث جهازك بأحدث تصحيحات الأمان.\n'
                                    + '2. قم بتثبيت التطبيقات فقط من مصادر موثوقة مثل متجر Google Play.\n'
                                    + '3. استخدم قفل شاشة قوي وقم بتمكين المصادقة البيومترية.\n'
                                    + '4. قم بعمل نسخ احتياطية لبياناتك بانتظام إلى موقع آمن.\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // de
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Android-Sicherheitsprüfungen: \n\n'
                                    + '1. Halten Sie Ihr Gerät mit den neuesten Sicherheitspatches auf dem neuesten Stand.\n'
                                    + '2. Installieren Sie Apps nur aus vertrauenswürdigen Quellen wie dem Google Play Store.\n'
                                    + '3. Verwenden Sie eine starke Bildschirmsperre und aktivieren Sie die biometrische Authentifizierung.\n'
                                    + '4. Sichern Sie Ihre Daten regelmäßig an einem sicheren Ort.\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // it
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Controlli di sicurezza Android: \n\n'
                                    + '1. Mantieni il tuo dispositivo aggiornato con le ultime patch di sicurezza.\n'
                                    + '2. Installa app solo da fonti affidabili come il Google Play Store.\n'
                                    + '3. Usa un blocco schermo forte e abilita l\'autenticazione biometrica.\n'
                                    + '4. Esegui regolarmente il backup dei tuoi dati in una posizione sicura.\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // pt
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Verificações de segurança do Android: \n\n'
                                    + '1. Mantenha seu dispositivo atualizado com os patches de segurança mais recentes.\n'
                                    + '2. Instale aplicativos apenas de fontes confiáveis, como a Google Play Store.\n'
                                    + '3. Use um bloqueio de tela forte e ative a autenticação biométrica.\n'
                                    + '4. Faça backup dos seus dados regularmente em um local seguro.\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ru
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Проверки безопасности Android: \n\n'
                                    + '1. Держите ваше устройство обновленным с последними патчами безопасности.\n'
                                    + '2. Устанавливайте приложения только из надежных источников, таких как Google Play Store.\n'
                                    + '3. Используйте надежную блокировку экрана и включайте биометрическую аутентификацию.\n'
                                    + '4. Регулярно делайте резервные копии ваших данных в безопасном месте.\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // zh
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Android 安全检查：\n\n'
                                    + '1. 保持您的设备更新最新的安全补丁。\n'
                                    + '2. 仅从可信来源（如 Google Play 商店）安装应用程序。\n'
                                    + '3. 使用强屏幕锁定并启用生物识别认证。\n'
                                    + '4. 定期备份您的数据到安全位置。\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ja
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Androidのセキュリティチェック：\n\n'
                                    + '1. デバイスを最新のセキュリティパッチで更新してください。\n'
                                    + '2. Google Playストアなどの信頼できるソースからのみアプリをインストールしてください。\n'
                                    + '3. 強力な画面ロックを使用し、生体認証を有効にしてください。\n'
                                    + '4. 定期的にデータを安全な場所にバックアップしてください。\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ko
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Android 보안 점검: \n\n'
                                    + '1. 최신 보안 패치로 기기를 업데이트하세요.\n'
                                    + '2. Google Play 스토어와 같은 신뢰할 수 있는 출처에서만 앱을 설치하세요.\n'
                                    + '3. 강력한 화면 잠금과 생체 인증을 사용하세요.\n'
                                    + '4. 데이터를 정기적으로 안전한 장소에 백업하세요.\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // he
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'בדיקות אבטחה של Android: \n\n'
                                    + '1. שמור על המכשיר שלך מעודכן עם תיקוני האבטחה האחרונים.\n'
                                    + '2. התקן אפליקציות רק ממקורות מהימנים, כמו Google Play Store.\n'
                                    + '3. השתמש בנעילת מסך חזקה והפעל אימות ביומטרי.\n'
                                    + '4. גבה את הנתונים שלך באופן קבוע במקום בטוח.\n',
                                parse_mode: 'HTML'
                            }
                        }])
                    ],
                    ['#send_ios_security_checks',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'iOS Security Checks: \n\n'
                                    + '1. Keep your iOS device updated with the latest software updates.\n'
                                    + '2. Only download apps from the official App Store.\n'
                                    + '3. Use a strong passcode and enable Face ID or Touch ID.\n'
                                    + '4. Regularly back up your data using iCloud or iTunes.\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // es
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Controles de seguridad de iOS: \n\n'
                                    + '1. Mantenga su dispositivo iOS actualizado con las últimas actualizaciones de software.\n'
                                    + '2. Descargue aplicaciones solo desde la App Store oficial.\n'
                                    + '3. Use un código de acceso fuerte y habilite Face ID o Touch ID.\n'
                                    + '4. Realice copias de seguridad de sus datos regularmente usando iCloud o iTunes.\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // fr
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Vérifications de sécurité iOS : \n\n'
                                    + '1. Maintenez votre appareil iOS à jour avec les dernières mises à jour logicielles.\n'
                                    + '2. Téléchargez uniquement des applications depuis l\'App Store officiel.\n'
                                    + '3. Utilisez un code d\'accès fort et activez Face ID ou Touch ID.\n'
                                    + '4. Sauvegardez régulièrement vos données en utilisant iCloud ou iTunes.\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ar
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'فحوصات أمان iOS: \n\n'
                                    + '1. حافظ على تحديث جهاز iOS الخاص بك بأحدث تحديثات البرامج.\n'
                                    + '2. قم بتنزيل التطبيقات فقط من متجر التطبيقات الرسمي.\n'
                                    + '3. استخدم رمز مرور قوي وقم بتمكين Face ID أو Touch ID.\n'
                                    + '4. قم بعمل نسخ احتياطية لبياناتك بانتظام باستخدام iCloud أو iTunes.\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // de
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'iOS-Sicherheitsprüfungen: \n\n'
                                    + '1. Halten Sie Ihr iOS-Gerät mit den neuesten Software-Updates auf dem neuesten Stand.\n'
                                    + '2. Laden Sie Apps nur aus dem offiziellen App Store herunter.\n'
                                    + '3. Verwenden Sie einen starken Passcode und aktivieren Sie Face ID oder Touch ID.\n'
                                    + '4. Sichern Sie Ihre Daten regelmäßig mit iCloud oder iTunes.\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // it
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Controlli di sicurezza iOS: \n\n'
                                    + '1. Mantieni il tuo dispositivo iOS aggiornato con gli ultimi aggiornamenti software.\n'
                                    + '2. Scarica le app solo dall\'App Store ufficiale.\n'
                                    + '3. Usa un codice di accesso forte e abilita Face ID o Touch ID.\n'
                                    + '4. Esegui regolarmente il backup dei tuoi dati utilizzando iCloud o iTunes.\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // pt
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Verificações de segurança do iOS: \n\n'
                                    + '1. Mantenha seu dispositivo iOS atualizado com as últimas atualizações de software.\n'
                                    + '2. Baixe aplicativos apenas da App Store oficial.\n'
                                    + '3. Use um código de acesso forte e ative o Face ID ou Touch ID.\n'
                                    + '4. Faça backup regularmente dos seus dados usando o iCloud ou iTunes.\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ru
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Проверки безопасности iOS: \n\n'
                                    + '1. Держите ваше устройство iOS обновленным с последними обновлениями программного обеспечения.\n'
                                    + '2. Загружайте приложения только из официального App Store.\n'
                                    + '3. Используйте надежный пароль и включайте Face ID или Touch ID.\n'
                                    + '4. Регулярно делайте резервные копии ваших данных с помощью iCloud или iTunes.\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // zh
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'iOS安全检查：\n\n'
                                    + '1. 保持您的iOS设备更新到最新的软件版本。\n'
                                    + '2. 仅从官方App Store下载应用程序。\n'
                                    + '3. 使用强密码并启用Face ID或Touch ID。\n'
                                    + '4. 定期使用iCloud或iTunes备份您的数据。\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ja
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'iOSのセキュリティチェック：\n\n'
                                    + '1. iOSデバイスを最新のソフトウェアアップデートで常に最新の状態に保ちます。\n'
                                    + '2. 公式のApp Storeからのみアプリをダウンロードします。\n'
                                    + '3. 強力なパスコードを使用し、Face IDまたはTouch IDを有効にします。\n'
                                    + '4. iCloudまたはiTunesを使用して定期的にデータをバックアップします。\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // ko
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'iOS 보안 점검: \n\n'
                                    + '1. iOS 기기를 최신 소프트웨어 업데이트로 유지하세요.\n'
                                    + '2. 공식 App Store에서만 앱을 다운로드하세요.\n'
                                    + '3. 강력한 암호를 사용하고 Face ID 또는 Touch ID를 활성화하세요.\n'
                                    + '4. iCloud 또는 iTunes를 사용하여 데이터를 정기적으로 백업하세요.\n',
                                parse_mode: 'HTML'
                            }
                        }]),
                        // he
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'בדיקות אבטחה של iOS: \n\n'
                                    + '1. שמור על מכשיר ה-iOS שלך מעודכן עם עדכוני התוכנה האחרונים.\n'
                                    + '2. הורד אפליקציות רק מחנות האפליקציות הרשמית.\n'
                                    + '3. השתמש בקוד גישה חזק והפעל Face ID או Touch ID.\n'
                                    + '4. גבה את הנתונים שלך באופן קבוע באמצעות iCloud או iTunes.\n',
                                parse_mode: 'HTML'
                            }
                        }])
                    ],
                    ['#send_privacy_checks',
                        // default (en)
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: 'Privacy Checks: \n\n'
                                        + '1. Review app permissions and revoke any unnecessary access.\n'
                                        + '2. Use strong, unique passwords for your accounts.\n'
                                        + '3. Enable two-factor authentication (2FA) wherever possible.\n'
                                        + '4. Be cautious about sharing personal information online.\n',
                                    parse_mode: 'HTML'
                                }
                            }
                        ])
                    ],
                    ['#2_lines_keyboard',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Choose your Religion:',
                                reply_markup: {
                                    inline_keyboard: [
                                        [
                                            { text: "✡️ Jewish", web_app: { url: "https://example.com/1" } },
                                            { text: "☪️ Muslim", web_app: { url: "https://example.com/2" } }
                                        ],
                                        [
                                            { text: "✝️ Christian", web_app: { url: "https://example.com/3" } },
                                            { text: "🕉️ Hindu", web_app: { url: "https://example.com/4" } }
                                        ],
                                        [
                                            { text: "☸️ Buddhist", web_app: { url: "https://example.com/5" } },
                                            { text: "☯️ Atheist", web_app: { url: "https://example.com/6" } }
                                        ],
                                        [
                                            { text: "🛐 Other", web_app: { url: "https://example.com/7" } }
                                        ]
                                    ]
                                }
                            }
                        }])
                    ],
                    ['#3_lines_keyboard_3x4',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Choose your Zodiac Sign:',
                                reply_markup: {
                                    inline_keyboard: [
                                        [
                                            { text: "♈ Aries", web_app: { url: "https://example.com/1" } },
                                            { text: "♉ Taurus", web_app: { url: "https://example.com/2" } },
                                            { text: "♊ Gemini", web_app: { url: "https://example.com/3" } }
                                        ],
                                        [
                                            { text: "♋ Cancer", web_app: { url: "https://example.com/4" } },
                                            { text: "♌ Leo", web_app: { url: "https://example.com/5" } },
                                            { text: "♍ Virgo", web_app: { url: "https://example.com/6" } }
                                        ],
                                        [
                                            { text: "♎ Libra", web_app: { url: "https://example.com/7" } },
                                            { text: "♏ Scorpio", web_app: { url: "https://example.com/8" } },
                                            { text: "♐ Sagittarius", web_app: { url: "https://example.com/9" } }
                                        ],
                                        [
                                            { text: "♑ Capricorn", web_app: { url: "https://example.com/10" } },
                                            { text: "♒ Aquarius", web_app: { url: "https://example.com/11" } },
                                            { text: "♓ Pisces", web_app: { url: "https://example.com/12" } }
                                        ]

                                    ]
                                }
                            }
                        }])
                    ]
                ]
        }
    }
}

EMD.SurveyAutomation = {
    entityName: 'SurveyAutomation',
    sheet: (data = {}) => {
        return {
            name: EMD.Automation.sheet(data).name,
            columns: EMD.Automation.sheet(data).columns,
            sample_data:
                [
                    ['---- 📋 SURVEY AUTOMATION SAMPLE DATA START ----',],
                    ['/surveys',
                        // default (en)
                        JSON.stringify([
                            { "next": "#remove_keyboard" },
                            { "next": "#send_welcome_to_survey_center" },
                            { "next": "#append_survey_options_keyboard" }
                        ])
                    ],
                    ['#append_survey_options_keyboard',
                        // default (en)
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                reply_markup: {
                                    inline_keyboard: [
                                        [
                                            { text: "Random Color", callback_data: "#sendPoll01" },
                                            { text: "Horoscope Signs", callback_data: "#sendPoll02" }
                                        ],
                                        [
                                            { text: "Religion", callback_data: "#sendPoll03" },
                                            { text: "Geo Location", callback_data: "#sendPoll04" }
                                        ],
                                        [
                                            { text: "Group of Age", callback_data: "#sendQuiz01" },
                                            { text: "Gender", callback_data: "#sendQuiz02" }
                                        ],
                                        [
                                            { text: "Education", callback_data: "#sendQuiz03" },
                                            { text: "Employment", callback_data: "#sendQuiz04" }
                                        ]
                                    ]
                                }
                            }
                        }])
                    ],
                    ['#send_welcome_to_survey_center',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendMessage',
                            payload: {
                                text: 'Welcome to the <b>Poll Center!</b> \n\n'
                                    + 'Here you can participate in various polls and quizzes to share your opinions and test your knowledge.',
                                parse_mode: 'HTML'
                            }
                        }])
                    ],
                    // Random Color Poll
                    ['#sendPoll01',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendPoll',
                            payload: {
                                question: 'Select random color from the list:',
                                question_parse_mode: 'HTML',
                                options: JSON.stringify([
                                    '🟥 Red',
                                    '🟩 Green',
                                    '🟦 Blue'
                                ]),
                                protect_content: true,
                                open_period: 300,
                                is_anonymous: true,
                                explanation: 'We appreciate your participation in our poll! \n\n Your feedback helps us improve the bot and add more exciting features!',
                                explanation_parse_mode: 'HTML'
                            }
                        }])
                    ],
                    // Horoscope Signs Poll
                    ['#sendPoll02',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendPoll',
                            payload: {
                                question: 'Select your Horoscope Sign:',
                                question_parse_mode: 'HTML',
                                options: JSON.stringify([
                                    '♈ Aries', '♉ Taurus', '♊ Gemini',
                                    '♋ Cancer', '♌ Leo', '♍ Virgo',
                                    '♎ Libra', '♏ Scorpio', '♐ Sagittarius',
                                    '♑ Capricorn', '♒ Aquarius', '♓ Pisces'
                                ]),
                                protect_content: true,
                                open_period: 300,
                                is_anonymous: false,
                                explanation: 'Your feedback helps us improve the bot and add more exciting features!',
                                explanation_parse_mode: 'HTML'
                            }
                        }])
                    ],
                    ['#sendPoll03',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendPoll',
                            payload: {
                                question: 'How often do you use this bot?',
                                question_parse_mode: 'HTML',
                                options: JSON.stringify([
                                    'Daily',
                                    'Weekly',
                                    'Monthly',
                                    'Rarely'
                                ]),
                                protect_content: true,
                                open_period: 300,
                                is_anonymous: false,
                                explanation: 'Your feedback helps us improve the bot and add more exciting features!',
                                explanation_parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "🏠 Start", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }])
                    ],
                    ['#sendPoll04',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendPoll',
                            payload: {
                                question: 'What type of content do you prefer?',
                                question_parse_mode: 'HTML',
                                options: JSON.stringify([
                                    'Educational',
                                    'Entertainment',
                                    'News',
                                    'Other'
                                ]),
                                protect_content: true,
                                open_period: 300,
                                is_anonymous: false,
                                explanation: 'Your feedback helps us improve the bot and add more exciting features!',
                                explanation_parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "🏠 Start", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }])
                    ],
                    ['#sendQuiz01',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendPoll',
                            payload: {
                                question: 'What is the <b>main</b> advantage of using Interactive Inline Keyboards in Telegram bots? ✨',
                                question_parse_mode: 'HTML',
                                options: JSON.stringify([
                                    'They allow sending larger files',
                                    'They enable real-time user interaction',
                                    'They improve message delivery speed',
                                    'They support multimedia content'
                                ]),
                                protect_content: true,
                                open_period: 300,
                                is_anonymous: false,
                                type: 'quiz',
                                correct_option_id: 3,
                                explanation: 'Interactive Inline Keyboards allow users to engage directly with the bot, making the experience more dynamic and user-friendly!',
                                explanation_parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "🏠 Start", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // es
                        JSON.stringify([{
                            method: 'sendPoll',
                            payload: {
                                question: '¿Cuál es la <b>principal</b> ventaja de usar teclados en línea interactivos en los bots de Telegram? ✨',
                                question_parse_mode: 'HTML',
                                options: JSON.stringify([
                                    'Permiten enviar archivos más grandes',
                                    'Permiten la interacción en tiempo real con el usuario',
                                    'Mejoran la velocidad de entrega de mensajes',
                                    'Soportan contenido multimedia'
                                ]),
                                protect_content: true,
                                open_period: 300,
                                is_anonymous: false,
                                type: 'quiz',
                                correct_option_id: 3,
                                explanation: '¡Los teclados en línea interactivos permiten a los usuarios interactuar directamente con el bot, haciendo la experiencia más dinámica y amigable!',
                                explanation_parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "🏠 Inicio", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // fr
                        JSON.stringify([{
                            method: 'sendPoll',
                            payload: {
                                question: 'Quel est le <b>principal</b> avantage d\'utiliser des claviers en ligne interactifs dans les bots Telegram ? ✨',
                                question_parse_mode: 'HTML',
                                options: JSON.stringify([
                                    'Ils permettent d\'envoyer des fichiers plus volumineux',
                                    'Ils permettent une interaction en temps réel avec l\'utilisateur',
                                    'Ils améliorent la vitesse de livraison des messages',
                                    'Ils prennent en charge le contenu multimédia'
                                ]),
                                protect_content: true,
                                open_period: 300,
                                is_anonymous: false,
                                type: 'quiz',
                                correct_option_id: 3,
                                explanation: 'Les claviers en ligne interactifs permettent aux utilisateurs d\'interagir directement avec le bot, rendant l\'expérience plus dynamique et conviviale !',
                                explanation_parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "🏠 Accueil", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // ar
                        JSON.stringify([{
                            method: 'sendPoll',
                            payload: {
                                question: 'ما هي <b>الميزة الرئيسية</b> لاستخدام لوحات المفاتيح التفاعلية في بوتات تيليجرام؟ ✨',
                                question_parse_mode: 'HTML',
                                options: JSON.stringify([
                                    'تسمح بإرسال ملفات أكبر',
                                    'تمكن من التفاعل في الوقت الحقيقي مع المستخدم',
                                    'تحسن سرعة تسليم الرسائل',
                                    'تدعم المحتوى متعدد الوسائط'
                                ]),
                                protect_content: true,
                                open_period: 300,
                                is_anonymous: false,
                                type: 'quiz',
                                correct_option_id: 3,
                                explanation: 'لوحات المفاتيح التفاعلية تتيح للمستخدمين التفاعل مباشرة مع البوت، مما يجعل التجربة أكثر ديناميكية وودية!',
                                explanation_parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "🏠 الرئيسية", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // de
                        JSON.stringify([{
                            method: 'sendPoll',
                            payload: {
                                question: 'Was ist der <b>Haupt</b>vorteil der Verwendung von interaktiven Inline-Tastaturen in Telegram-Bots? ✨',
                                question_parse_mode: 'HTML',
                                options: JSON.stringify([
                                    'Sie ermöglichen das Senden größerer Dateien',
                                    'Sie ermöglichen die Echtzeit-Interaktion mit dem Benutzer',
                                    'Sie verbessern die Nachrichtenzustellungsgeschwindigkeit',
                                    'Sie unterstützen Multimedia-Inhalte'
                                ]),
                                protect_content: true,
                                open_period: 300,
                                is_anonymous: false,
                                type: 'quiz',
                                correct_option_id: 3,
                                explanation: 'Interaktive Inline-Tastaturen ermöglichen es den Benutzern, direkt mit dem Bot zu interagieren, was das Erlebnis dynamischer und benutzerfreundlicher macht!',
                                explanation_parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "🏠 Startseite", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // it
                        JSON.stringify([{
                            method: 'sendPoll',
                            payload: {
                                question: 'Qual è il <b>principale</b> vantaggio di utilizzare le tastiere inline interattive nei bot di Telegram? ✨',
                                question_parse_mode: 'HTML',
                                options: JSON.stringify([
                                    'Consentono di inviare file più grandi',
                                    'Consentono l\'interazione in tempo reale con l\'utente',
                                    'Migliorano la velocità di consegna dei messaggi',
                                    'Supportano contenuti multimediali'
                                ]),
                                protect_content: true,
                                open_period: 300,
                                is_anonymous: false,
                                type: 'quiz',
                                correct_option_id: 3,
                                explanation: 'Le tastiere inline interattive consentono agli utenti di interagire direttamente con il bot, rendendo l\'esperienza più dinamica e user-friendly!',
                                explanation_parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "🏠 Home", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // pt
                        JSON.stringify([{
                            method: 'sendPoll',
                            payload: {
                                question: 'Qual é a <b>principal</b> vantagem de usar teclados inline interativos em bots do Telegram? ✨',
                                question_parse_mode: 'HTML',
                                options: JSON.stringify([
                                    'Eles permitem o envio de arquivos maiores',
                                    'Eles possibilitam a interação em tempo real com o usuário',
                                    'Eles melhoram a velocidade de entrega de mensagens',
                                    'Eles suportam conteúdo multimídia'
                                ]),
                                protect_content: true,
                                open_period: 300,
                                is_anonymous: false,
                                type: 'quiz',
                                correct_option_id: 3,
                                explanation: 'As teclas inline interativas permitem que os usuários interajam diretamente com o bot, tornando a experiência mais dinâmica e amigável!',
                                explanation_parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "🏠 Início", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // ru
                        JSON.stringify([{
                            method: 'sendPoll',
                            payload: {
                                question: 'Какое <b>основное</b> преимущество использования интерактивных встроенных клавиатур в ботах Telegram? ✨',
                                question_parse_mode: 'HTML',
                                options: JSON.stringify([
                                    'Они позволяют отправлять большие файлы',
                                    'Они обеспечивают взаимодействие с пользователем в реальном времени',
                                    'Они улучшают скорость доставки сообщений',
                                    'Они поддерживают мультимедийный контент'
                                ]),
                                protect_content: true,
                                open_period: 300,
                                is_anonymous: false,
                                type: 'quiz',
                                correct_option_id: 3,
                                explanation: 'Интерактивные встроенные клавиатуры позволяют пользователям напрямую взаимодействовать с ботом, делая опыт более динамичным и удобным!',
                                explanation_parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "🏠 Главная", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // zh
                        JSON.stringify([{
                            method: 'sendPoll',
                            payload: {
                                question: '在Telegram机器人中使用交互式内联键盘的<b>主要</b>优势是什么？✨',
                                question_parse_mode: 'HTML',
                                options: JSON.stringify([
                                    '它们允许发送更大的文件',
                                    '它们实现了与用户的实时互动',
                                    '它们提高了消息传递速度',
                                    '它们支持多媒体内容'
                                ]),
                                protect_content: true,
                                open_period: 300,
                                is_anonymous: false,
                                type: 'quiz',
                                correct_option_id: 3,
                                explanation: '交互式内联键盘允许用户直接与机器人互动，使体验更加动态和用户友好！',
                                explanation_parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "🏠 主页", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // ja
                        JSON.stringify([{
                            method: 'sendPoll',
                            payload: {
                                question: 'Telegramボットでインタラクティブなインラインキーボードを使用する<b>主な</b>利点は何ですか？✨',
                                question_parse_mode: 'HTML',
                                options: JSON.stringify([
                                    'より大きなファイルの送信が可能',
                                    'ユーザーとのリアルタイムの対話を可能にする',
                                    'メッセージ配信速度を向上させる',
                                    'マルチメディアコンテンツをサポートする'
                                ]),
                                protect_content: true,
                                open_period: 300,
                                is_anonymous: false,
                                type: 'quiz',
                                correct_option_id: 3,
                                explanation: 'インタラクティブなインラインキーボードにより、ユーザーはボットと直接対話でき、体験がよりダイナミックでユーザーフレンドリーになります！',
                                explanation_parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "🏠 ホーム", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // ko
                        JSON.stringify([{
                            method: 'sendPoll',
                            payload: {
                                question: 'Telegram 봇에서 대화형 인라인 키보드를 사용하는 <b>주요</b> 이점은 무엇인가요? ✨',
                                question_parse_mode: 'HTML',
                                options: JSON.stringify([
                                    '더 큰 파일 전송이 가능하다',
                                    '사용자와의 실시간 상호작용을 가능하게 한다',
                                    '메시지 전달 속도를 향상시킨다',
                                    '멀티미디어 콘텐츠를 지원한다'
                                ]),
                                protect_content: true,
                                open_period: 300,
                                is_anonymous: false,
                                type: 'quiz',
                                correct_option_id: 3,
                                explanation: '대화형 인라인 키보드를 통해 사용자는 봇과 직접 상호작용할 수 있어 경험이 더욱 역동적이고 사용자 친화적입니다!',
                                explanation_parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "🏠 홈", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // he
                        JSON.stringify([{
                            method: 'sendPoll',
                            payload: {
                                question: 'מהו היתרון ה<b>עיקרי</b> בשימוש במקלדות אינטראקטיביות מקוונות בבוטים של טלגרם? ✨',
                                question_parse_mode: 'HTML',
                                options: JSON.stringify([
                                    'הן מאפשרות שליחת קבצים גדולים יותר',
                                    'הן מאפשרות אינטראקציה בזמן אמת עם המשתמש',
                                    'הן משפרות את מהירות מסירת ההודעות',
                                    'הן תומכות בתוכן מולטימדיה'
                                ]),
                                protect_content: true,
                                open_period: 300,
                                is_anonymous: false,
                                type: 'quiz',
                                correct_option_id: 3,
                                explanation: 'מקלדות אינטראקטיביות מקוונות מאפשרות למשתמשים אינטראקציה ישירה עם הבוט, מה שהופך את החוויה לדינמית וידידותית יותר למשתמש!',
                                explanation_parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "🏠 בית", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }])
                    ],
                    ['#sendQuiz02',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendPoll',
                            payload: {
                                question: 'How can Interactive Inline Keyboards enhance user engagement in Telegram bots? 🤖',
                                question_parse_mode: 'HTML',
                                options: JSON.stringify([
                                    'By providing static information',
                                    'By enabling real-time interactions and responses',
                                    'By sending automated messages only',
                                    'By limiting user choices'
                                ]),
                                protect_content: true,
                                open_period: 300,
                                is_anonymous: false,
                                type: 'quiz',
                                correct_option_id: 1,
                                explanation: 'Interactive Inline Keyboards allow users to engage directly with the bot, making the experience more dynamic and user-friendly!',
                                explanation_parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "🏠 Start", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }])

                    ],
                    ['#sendQuiz03',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendPoll',
                            payload: {
                                question: 'What type of content can be delivered using Interactive Inline Keyboards in Telegram bots? 📱',
                                question_parse_mode: 'HTML',
                                options: JSON.stringify([
                                    'Only text messages',
                                    'Multimedia content including photos and videos',
                                    'Only audio files',
                                    'None of the above'
                                ]),
                                protect_content: true,
                                open_period: 300,
                                is_anonymous: false,
                                type: 'quiz',
                                correct_option_id: 1,
                                explanation: 'Interactive Inline Keyboards allow users to engage directly with the bot, making the experience more dynamic and user-friendly!',
                                explanation_parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "🏠 Start", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }])
                    ],
                    ['#sendQuiz04',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendPoll',
                            payload: {
                                question: 'What is the <b>main</b> advantage of using Interactive Inline Keyboards in Telegram bots? ✨',
                                question_parse_mode: 'HTML',
                                options: JSON.stringify([
                                    'They allow sending larger files',
                                    'They enable real-time user interaction',
                                    'They improve message delivery speed',
                                    'They support multimedia content'
                                ]),
                                protect_content: true,
                                open_period: 300,
                                is_anonymous: false,
                                type: 'quiz',
                                correct_option_id: 3,
                                explanation: 'Interactive Inline Keyboards allow users to engage directly with the bot, making the experience more dynamic and user-friendly!',
                                explanation_parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "🏠 Start", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // es
                        JSON.stringify([{
                            method: 'sendPoll',
                            payload: {
                                question: '¿Cuál es la <b>principal</b> ventaja de usar teclados en línea interactivos en los bots de Telegram? ✨',
                                question_parse_mode: 'HTML',
                                options: JSON.stringify([
                                    'Permiten enviar archivos más grandes',
                                    'Permiten la interacción en tiempo real con el usuario',
                                    'Mejoran la velocidad de entrega de mensajes',
                                    'Soportan contenido multimedia'
                                ]),
                                protect_content: true,
                                open_period: 300,
                                is_anonymous: false,
                                type: 'quiz',
                                correct_option_id: 3,
                                explanation: '¡Los teclados en línea interactivos permiten a los usuarios interactuar directamente con el bot, haciendo la experiencia más dinámica y amigable!',
                                explanation_parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "🏠 Inicio", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // fr
                        JSON.stringify([{
                            method: 'sendPoll',
                            payload: {
                                question: 'Quel est le <b>principal</b> avantage d\'utiliser des claviers en ligne interactifs dans les bots Telegram ? ✨',
                                question_parse_mode: 'HTML',
                                options: JSON.stringify([
                                    'Ils permettent d\'envoyer des fichiers plus volumineux',
                                    'Ils permettent une interaction en temps réel avec l\'utilisateur',
                                    'Ils améliorent la vitesse de livraison des messages',
                                    'Ils prennent en charge le contenu multimédia'
                                ]),
                                protect_content: true,
                                open_period: 300,
                                is_anonymous: false,
                                type: 'quiz',
                                correct_option_id: 3,
                                explanation: 'Les claviers en ligne interactifs permettent aux utilisateurs d\'interagir directement avec le bot, rendant l\'expérience plus dynamique et conviviale !',
                                explanation_parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "🏠 Accueil", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // ar
                        JSON.stringify([{
                            method: 'sendPoll',
                            payload: {
                                question: 'ما هي <b>الميزة الرئيسية</b> لاستخدام لوحات المفاتيح التفاعلية في بوتات تيليجرام؟ ✨',
                                question_parse_mode: 'HTML',
                                options: JSON.stringify([
                                    'تسمح بإرسال ملفات أكبر',
                                    'تمكن من التفاعل في الوقت الحقيقي مع المستخدم',
                                    'تحسن سرعة تسليم الرسائل',
                                    'تدعم المحتوى متعدد الوسائط'
                                ]),
                                protect_content: true,
                                open_period: 300,
                                is_anonymous: false,
                                type: 'quiz',
                                correct_option_id: 3,
                                explanation: 'لوحات المفاتيح التفاعلية تتيح للمستخدمين التفاعل مباشرة مع البوت، مما يجعل التجربة أكثر ديناميكية وودية!',
                                explanation_parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "🏠 الرئيسية", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // de
                        JSON.stringify([{
                            method: 'sendPoll',
                            payload: {
                                question: 'Was ist der <b>Haupt</b>vorteil der Verwendung von interaktiven Inline-Tastaturen in Telegram-Bots? ✨',
                                question_parse_mode: 'HTML',
                                options: JSON.stringify([
                                    'Sie ermöglichen das Senden größerer Dateien',
                                    'Sie ermöglichen die Echtzeit-Interaktion mit dem Benutzer',
                                    'Sie verbessern die Nachrichtenzustellungsgeschwindigkeit',
                                    'Sie unterstützen Multimedia-Inhalte'
                                ]),
                                protect_content: true,
                                open_period: 300,
                                is_anonymous: false,
                                type: 'quiz',
                                correct_option_id: 3,
                                explanation: 'Interaktive Inline-Tastaturen ermöglichen es den Benutzern, direkt mit dem Bot zu interagieren, was das Erlebnis dynamischer und benutzerfreundlicher macht!',
                                explanation_parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "🏠 Startseite", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // it
                        JSON.stringify([{
                            method: 'sendPoll',
                            payload: {
                                question: 'Qual è il <b>principale</b> vantaggio di utilizzare le tastiere inline interattive nei bot di Telegram? ✨',
                                question_parse_mode: 'HTML',
                                options: JSON.stringify([
                                    'Consentono di inviare file più grandi',
                                    'Consentono l\'interazione in tempo reale con l\'utente',
                                    'Migliorano la velocità di consegna dei messaggi',
                                    'Supportano contenuti multimediali'
                                ]),
                                protect_content: true,
                                open_period: 300,
                                is_anonymous: false,
                                type: 'quiz',
                                correct_option_id: 3,
                                explanation: 'Le tastiere inline interattive consentono agli utenti di interagire direttamente con il bot, rendendo l\'esperienza più dinamica e user-friendly!',
                                explanation_parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "🏠 Home", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // pt
                        JSON.stringify([{
                            method: 'sendPoll',
                            payload: {
                                question: 'Qual é a <b>principal</b> vantagem de usar teclados inline interativos em bots do Telegram? ✨',
                                question_parse_mode: 'HTML',
                                options: JSON.stringify([
                                    'Eles permitem o envio de arquivos maiores',
                                    'Eles possibilitam a interação em tempo real com o usuário',
                                    'Eles melhoram a velocidade de entrega de mensagens',
                                    'Eles suportam conteúdo multimídia'
                                ]),
                                protect_content: true,
                                open_period: 300,
                                is_anonymous: false,
                                type: 'quiz',
                                correct_option_id: 3,
                                explanation: 'As teclas inline interativas permitem que os usuários interajam diretamente com o bot, tornando a experiência mais dinâmica e amigável!',
                                explanation_parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "🏠 Início", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // ru
                        JSON.stringify([{
                            method: 'sendPoll',
                            payload: {
                                question: 'Какое <b>основное</b> преимущество использования интерактивных встроенных клавиатур в ботах Telegram? ✨',
                                question_parse_mode: 'HTML',
                                options: JSON.stringify([
                                    'Они позволяют отправлять большие файлы',
                                    'Они обеспечивают взаимодействие с пользователем в реальном времени',
                                    'Они улучшают скорость доставки сообщений',
                                    'Они поддерживают мультимедийный контент'
                                ]),
                                protect_content: true,
                                open_period: 300,
                                is_anonymous: false,
                                type: 'quiz',
                                correct_option_id: 3,
                                explanation: 'Интерактивные встроенные клавиатуры позволяют пользователям напрямую взаимодействовать с ботом, делая опыт более динамичным и удобным!',
                                explanation_parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "🏠 Главная", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // zh
                        JSON.stringify([{
                            method: 'sendPoll',
                            payload: {
                                question: '在Telegram机器人中使用交互式内联键盘的<b>主要</b>优势是什么？✨',
                                question_parse_mode: 'HTML',
                                options: JSON.stringify([
                                    '它们允许发送更大的文件',
                                    '它们实现了与用户的实时互动',
                                    '它们提高了消息传递速度',
                                    '它们支持多媒体内容'
                                ]),
                                protect_content: true,
                                open_period: 300,
                                is_anonymous: false,
                                type: 'quiz',
                                correct_option_id: 3,
                                explanation: '交互式内联键盘允许用户直接与机器人互动，使体验更加动态和用户友好！',
                                explanation_parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "🏠 主页", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // ja
                        JSON.stringify([{
                            method: 'sendPoll',
                            payload: {
                                question: 'Telegramボットでインタラクティブなインラインキーボードを使用する<b>主な</b>利点は何ですか？✨',
                                question_parse_mode: 'HTML',
                                options: JSON.stringify([
                                    'より大きなファイルの送信が可能',
                                    'ユーザーとのリアルタイムの対話を可能にする',
                                    'メッセージ配信速度を向上させる',
                                    'マルチメディアコンテンツをサポートする'
                                ]),
                                protect_content: true,
                                open_period: 300,
                                is_anonymous: false,
                                type: 'quiz',
                                correct_option_id: 3,
                                explanation: 'インタラクティブなインラインキーボードにより、ユーザーはボットと直接対話でき、体験がよりダイナミックでユーザーフレンドリーになります！',
                                explanation_parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "🏠 ホーム", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // ko
                        JSON.stringify([{
                            method: 'sendPoll',
                            payload: {
                                question: 'Telegram 봇에서 대화형 인라인 키보드를 사용하는 <b>주요</b> 이점은 무엇인가요? ✨',
                                question_parse_mode: 'HTML',
                                options: JSON.stringify([
                                    '더 큰 파일 전송이 가능하다',
                                    '사용자와의 실시간 상호작용을 가능하게 한다',
                                    '메시지 전달 속도를 향상시킨다',
                                    '멀티미디어 콘텐츠를 지원한다'
                                ]),
                                protect_content: true,
                                open_period: 300,
                                is_anonymous: false,
                                type: 'quiz',
                                correct_option_id: 3,
                                explanation: '대화형 인라인 키보드를 통해 사용자는 봇과 직접 상호작용할 수 있어 경험이 더욱 역동적이고 사용자 친화적입니다!',
                                explanation_parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "🏠 홈", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }]),
                        // he
                        JSON.stringify([{
                            method: 'sendPoll',
                            payload: {
                                question: 'מהו היתרון ה<b>עיקרי</b> בשימוש במקלדות אינטראקטיביות מקוונות בבוטים של טלגרם? ✨',
                                question_parse_mode: 'HTML',
                                options: JSON.stringify([
                                    'הן מאפשרות שליחת קבצים גדולים יותר',
                                    'הן מאפשרות אינטראקציה בזמן אמת עם המשתמש',
                                    'הן משפרות את מהירות מסירת ההודעות',
                                    'הן תומכות בתוכן מולטימדיה'
                                ]),
                                protect_content: true,
                                open_period: 300,
                                is_anonymous: false,
                                type: 'quiz',
                                correct_option_id: 3,
                                explanation: 'מקלדות אינטראקטיביות מקוונות מאפשרות למשתמשים אינטראקציה ישירה עם הבוט, מה שהופך את החוויה לדינמית וידידותית יותר למשתמש!',
                                explanation_parse_mode: 'HTML',
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "🏠 בית", callback_data: "/start" }]
                                    ]
                                }
                            }
                        }])
                    ]
                ]
        }
    }
}

EMD.StoreAutomation = {
    entityName: 'StoreAutomation',
    sheet: (data = {}) => {
        return {
            name: EMD.Automation.sheet(data).name,
            columns: EMD.Automation.sheet(data).columns,
            sample_data:
                [
                    ['---- ✨ STORE AUTOMATION SAMPLE DATA START ----'],
                    ['/store',
                        // default (en)
                        JSON.stringify([
                            { "next": "#remove_keyboard" },
                            { "next": "/cats" }
                        ])

                    ],
                    ['#categoryA',
                        // default (en)
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: 'Welcome to Category A! Here you can find a variety of products and services tailored to your needs.',
                                    parse_mode: 'HTML'
                                }
                            },
                            {
                                method: 'sendInvoice',
                                payload: {
                                    title: 'Product #1',
                                    description: 'An amazing product that you will love! \n\n'
                                        + 'This product is made from high-quality materials and offers great value for money.\n\n',
                                    photo_url: "https://www.gstatic.com/webp/gallery/1.jpg",
                                    photo_width: 240,
                                    currency: 'XTR',
                                    payload: 'custom_payload_123', // Custom payload for your reference
                                    prices: JSON.stringify([
                                        { label: 'Total', amount: 550 } // Amount in smallest units (e.g., cents)
                                    ]),
                                }
                            }, {
                                method: 'sendInvoice',
                                payload: {
                                    title: 'Product #2',
                                    description: 'An amazing product that you will love! \n\n'
                                        + 'This product is made from high-quality materials and offers great value for money.\n\n'
                                        + 'Available in multiple colors and sizes.',
                                    photo_url: "https://www.gstatic.com/webp/gallery/2.jpg",
                                    photo_width: 240,
                                    currency: 'XTR',
                                    payload: 'custom_payload_124', // Custom payload for your reference
                                    prices: JSON.stringify([
                                        { label: 'Total', amount: 980 } // Amount in smallest units (e.g., cents)

                                    ]),
                                }
                            },
                            {
                                method: 'sendInvoice',
                                payload: {
                                    title: 'Product #3',
                                    description: 'An amazing product that you will love! \n\n'
                                        + 'This product is made from high-quality materials and offers great value for money.\n\n'
                                        + 'Shipping included.',
                                    photo_url: "https://www.gstatic.com/webp/gallery/3.jpg",
                                    photo_width: 240,
                                    currency: 'XTR',
                                    payload: 'custom_payload_125', // Custom payload for your reference
                                    prices: JSON.stringify([
                                        { label: 'Total', amount: 1200 } // Amount in smallest units (e.g., cents)
                                    ]),
                                }
                            }, { "next": "/store" }
                        ])
                    ],
                    ['#categoryB',
                        // default (en)
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: 'Welcome to Category B! Here you can find a variety of products and services tailored to your needs.',
                                    parse_mode: 'HTML'
                                }
                            },
                            {
                                method: 'sendInvoice',
                                payload: {
                                    title: 'Product #10',
                                    description: 'An amazing product that you will love! \n\n'
                                        + 'This product is made from high-quality materials and offers great value for money.\n\n',
                                    photo_url: "https://www.gstatic.com/webp/gallery/1.jpg",
                                    photo_width: 240,
                                    currency: 'XTR',
                                    payload: 'custom_payload_130', // Custom payload for your reference
                                    prices: JSON.stringify([
                                        { label: 'Total', amount: 450 } // Amount in smallest units (e.g., cents)
                                    ]),
                                }
                            }, {
                                method: 'sendInvoice',
                                payload: {
                                    title: 'Product #20',
                                    description: 'An amazing product that you will love! \n\n'
                                        + 'This product is made from high-quality materials and offers great value for money.\n\n',
                                    photo_url: "https://www.gstatic.com/webp/gallery/2.jpg",
                                    photo_width: 240,
                                    currency: 'XTR',
                                    payload: 'custom_payload_124', // Custom payload for your reference
                                    prices: JSON.stringify([
                                        { label: 'Total', amount: 45 } // Amount in smallest units (e.g., cents)
                                    ]),
                                }
                            },
                            {
                                method: 'sendInvoice',
                                payload: {
                                    title: 'Product #30',
                                    description: 'An amazing product that you will love! \n\n'
                                        + 'This product is made from high-quality materials and offers great value for money.\n\n',
                                    photo_url: "https://www.gstatic.com/webp/gallery/3.jpg",
                                    photo_width: 240,
                                    currency: 'XTR',
                                    payload: 'custom_payload_125', // Custom payload for your reference
                                    prices: JSON.stringify([
                                        { label: 'Total', amount: 300 } // Amount in smallest units (e.g., cents)
                                    ]),
                                }
                            }
                        ])
                    ],
                    ['#categoryC',
                        // default (en)
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: 'Welcome to Category C! Here you can find a variety of products and services tailored to your needs.',
                                    parse_mode: 'HTML'
                                }
                            },
                            {
                                method: 'sendInvoice',
                                payload: {
                                    title: 'Product # 100',
                                    description: 'An amazing product that you will love! \n\n'
                                        + 'This product is made from high-quality materials and offers great value for money.\n\n',
                                    photo_url: "https://www.gstatic.com/webp/gallery/1.jpg",
                                    photo_width: 240,
                                    currency: 'XTR',
                                    payload: 'custom_payload_130', // Custom payload for your reference
                                    prices: JSON.stringify([
                                        { label: 'Total', amount: 1250 } // Amount in smallest units (e.g., cents)
                                    ]),
                                }
                            },
                            {
                                method: 'sendInvoice',
                                payload: {
                                    title: 'Product # 122',
                                    description: 'An amazing product that you will love! \n\n'
                                        + 'This product is made from high-quality materials and offers great value for money.\n\n',
                                    photo_url: "https://www.gstatic.com/webp/gallery/2.jpg",
                                    photo_width: 240,
                                    currency: 'XTR',
                                    payload: 'custom_payload_124', // Custom payload for your reference
                                    prices: JSON.stringify([
                                        { label: 'Total', amount: 5580 } // Amount in smallest units (e.g., cents)
                                    ]),
                                }
                            },
                            {
                                method: 'sendInvoice',
                                payload: {
                                    title: 'Product # 33',
                                    description: 'An amazing product that you will love! \n\n'
                                        + 'This product is made from high-quality materials and offers great value for money.\n\n',
                                    photo_url: "https://www.gstatic.com/webp/gallery/3.jpg",
                                    photo_width: 240,
                                    currency: 'XTR',
                                    payload: 'custom_payload_125', // Custom payload for your reference
                                    prices: JSON.stringify([
                                        { label: 'Total', amount: 1200 } // Amount in smallest units (e.g., cents)
                                    ]),
                                }
                            }
                        ])
                    ],
                    ['#categoryD',
                        // default (en)
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: 'Welcome to Category D! Here you can find a variety of products and services tailored to your needs.',
                                    parse_mode: 'HTML'
                                }
                            },
                            {
                                method: 'sendInvoice',
                                payload: {
                                    title: 'Product #11',
                                    description: 'An amazing product that you will love! \n\n'
                                        + 'This product is made from high-quality materials and offers great value for money.\n\n',
                                    photo_url: "https://www.gstatic.com/webp/gallery/1.jpg",
                                    photo_width: 240,
                                    currency: 'XTR',
                                    payload: 'custom_payload_130', // Custom payload for your reference
                                    prices: JSON.stringify([
                                        { label: 'Total', amount: 123 } // Amount in smallest units (e.g., cents)
                                    ]),
                                }
                            },
                            {
                                method: 'sendInvoice',
                                payload: {
                                    title: 'Product #12',
                                    description: 'An amazing product that you will love! \n\n'
                                        + 'This product is made from high-quality materials and offers great value for money.\n\n',
                                    photo_url: "https://www.gstatic.com/webp/gallery/2.jpg",
                                    photo_width: 240,
                                    currency: 'XTR',
                                    payload: 'custom_payload_124', // Custom payload for your reference
                                    prices: JSON.stringify([
                                        { label: 'Total', amount: 550 } // Amount in smallest units (e.g., cents)
                                    ]),
                                }
                            },
                            {
                                method: 'sendInvoice',
                                payload: {
                                    title: 'Product #13',
                                    description: 'An amazing product that you will love! \n\n'
                                        + 'This product is made from high-quality materials and offers great value for money.\n\n',
                                    photo_url: "https://www.gstatic.com/webp/gallery/3.jpg",
                                    photo_width: 240,
                                    currency: 'XTR',
                                    payload: 'custom_payload_125', // Custom payload for your reference
                                    prices: JSON.stringify([
                                        { label: 'Total', amount: 1200 } // Amount in smallest units (e.g., cents)
                                    ]),
                                }
                            }
                        ])
                    ],
                    ['#categoryE',
                        // default (en)
                        JSON.stringify([
                            {   // send welcome message
                                method: 'sendMessage',
                                payload: {
                                    text: 'Welcome to Category E! Here you can find a variety of products and services tailored to your needs.',
                                    parse_mode: 'HTML'
                                }
                            },
                            {
                                // send paid media as sample after invoice
                                method: 'sendPaidMedia',
                                payload: {
                                    protect_content: true,
                                    star_count: 1000,
                                    media: [
                                        {
                                            type: 'photo',
                                            media: 'https://www.gstatic.com/webp/gallery/1.jpg',
                                            caption: 'Thank you for your purchase! Here is your paid media content.'
                                        }
                                    ]
                                }
                            },
                            {
                                // send paid media as sample after invoice
                                method: 'sendPaidMedia',
                                payload: {
                                    protect_content: true,
                                    star_count: 2400,
                                    media: [
                                        {
                                            type: 'photo',
                                            media: 'https://www.gstatic.com/webp/gallery/3.jpg',
                                            caption: 'Thank you for your purchase! Here is your paid media content.'
                                        }
                                    ]
                                }
                            },
                            {
                                // send paid media as sample after invoice
                                method: 'sendPaidMedia',
                                payload: {
                                    protect_content: true,
                                    star_count: 1400,
                                    media: [
                                        {
                                            type: 'photo',
                                            media: 'https://www.gstatic.com/webp/gallery/2.jpg',
                                            caption: 'Thank you for your purchase! Here is your paid media content.'
                                        }
                                    ]
                                }
                            }
                        ])
                    ],
                    ['#send_paid_media_sample',
                        // default (en)
                        JSON.stringify([
                            {
                                // send paid media as sample after invoice
                                method: 'sendPaidMedia',
                                payload: {
                                    protect_content: true,
                                    star_count: 1000,
                                    caption: 'Thank you for your purchase! Here is your paid media content.',
                                    parse_mode: 'HTML',
                                    disable_notification: false,
                                    show_caption_above_media: false,
                                    // A JSON-serialized array describing the media to be sent; up to 10 items
                                    media: [
                                        {
                                            type: 'photo',
                                            media: EMD.CHEERS_IMG_URL
                                        }
                                    ]
                                }
                            }
                        ])
                    ],
                    ['#send_invoice_sample',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendInvoice',
                            payload: {
                                title: 'Sample Product',
                                description: 'This is a sample product used to demonstrate the Send Invoice API feature.',
                                photo_url: EMD.PEACH_IMG_URL,
                                photo_width: 240,
                                currency: 'XTR',
                                payload: 'sample_payload_001', // Custom payload for your reference
                                prices: JSON.stringify([{ label: 'Total', amount: 1999 }]), // Amount in smallest units (e.g., cents)
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "Pay 1299 XTR", pay: true }]
                                    ]
                                }
                            }
                        }])
                    ]
                    ['---- 🛍️ STORE AUTOMATION SAMPLE DATA END ----']
                ]
        }
    }
}

EMD.DonationCampaign = {
    entityName: 'DonationCampaign',
    sheet: (data = {}) => {
        return {
            name: EMD.Automation.sheet(data).name,
            columns: EMD.Automation.sheet(data).columns,
            sample_data:
                [
                    ['---- 🐱❤️ Support Our Feline Friends! ❤️🐱 ----'],
                    ['_invoice_link_result_',
                        // default (en)
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: 'Success! 🥳 Your dedicated donation link is ready. Share it widely to help us find Cat Guardians globally and fund critical care for stray cats. Every share is a life saved! 🐾\n\n'
                                        + 'Invoice Link: {{invoice_link}}\n\n',
                                    parse_mode: 'HTML'
                                }
                            }
                        ]),
                        // es
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: '¡Éxito! 🥳 Tu enlace de donación dedicado está listo. Compártelo ampliamente para ayudarnos a encontrar Guardianes Felinos a nivel mundial y financiar la atención crítica para gatos callejeros. ¡Cada vez que compartes, es una vida salvada! 🐾\n\n'
                                        + 'Enlace de Factura: {{invoice_link}}\n\n',
                                    parse_mode: 'HTML'
                                }
                            }
                        ]),
                        // fr
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: 'Succès ! 🥳 Votre lien de don dédié est prêt. Partagez-le largement pour nous aider à trouver des Gardiens de Chats dans le monde entier et à financer les soins essentiels pour les chats errants. Chaque partage est une vie sauvée ! 🐾\n\n'
                                        + 'Lien de Facture: {{invoice_link}}\n\n',
                                    parse_mode: 'HTML'
                                }
                            }
                        ]),
                        // ar
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: 'نجاح! 🥳 رابط التبرع المخصص لك جاهز. شاركه على نطاق واسع لمساعدتنا في العثور على حراس القطط عالميًا وتمويل الرعاية الحرجة للقطط الضالة. كل مشاركة هي حياة تم إنقاذها! 🐾\n\n'
                                        + 'رابط الفاتورة: {{invoice_link}}\n\n',
                                    parse_mode: 'HTML'
                                }
                            }
                        ]),
                        // de
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: 'Erfolg! 🥳 Ihr dedizierter Spenden-Link ist bereit. Teilen Sie ihn weitläufig, um uns zu helfen, weltweit Katzenwächter zu finden und kritische Versorgung für streunende Katzen zu finanzieren. Jede Teilung ist ein gerettetes Leben! 🐾\n\n'
                                        + 'Rechnungslink: {{invoice_link}}\n\n',
                                    parse_mode: 'HTML'
                                }
                            }
                        ]),
                        // it
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: 'Successo! 🥳 Il tuo link di donazione dedicato è pronto. Condividilo ampiamente per aiutarci a trovare Guardiani dei Gatti a livello globale e finanziare le cure critiche per i gatti randagi. Ogni condivisione è una vita salvata! 🐾\n\n'
                                        + 'Link Fattura: {{invoice_link}}\n\n',
                                    parse_mode: 'HTML'
                                }
                            }
                        ]),
                        // pt
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: 'Sucesso! 🥳 Seu link de doação dedicado está pronto. Compartilhe-o amplamente para nos ajudar a encontrar Guardiões de Gatos globalmente e financiar cuidados críticos para gatos de rua. Cada compartilhamento é uma vida salva! 🐾\n\n'
                                        + 'Link da Fatura: {{invoice_link}}\n\n',
                                    parse_mode: 'HTML'
                                }
                            }
                        ]),
                        // ru
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: 'Успех! 🥳 Ваша специальная ссылка для пожертвований готова. Поделитесь ею, чтобы помочь нам найти Хранителей Кошек по всему миру и профинансировать жизненно важный уход за бездомными кошками. Каждый репост — это спасенная жизнь! 🐾\n\n'
                                        + 'Ссылка на счет: {{invoice_link}}\n\n',
                                    parse_mode: 'HTML'
                                }
                            }
                        ]),
                        // zh
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: '成功！🥳 您的专属捐款链接已准备就绪。广泛分享它，帮助我们在全球寻找猫咪守护者，并为流浪猫提供关键护理。每一次分享都是拯救一个生命！🐾\n\n'
                                        + '发票链接: {{invoice_link}}\n\n',
                                    parse_mode: 'HTML'
                                }
                            }
                        ]),
                        // ja
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: '成功です！🥳 あなた専用の寄付リンクが準備できました。広く共有して、世界中で猫の守護者を見つけ、野良猫に重要なケアを提供する資金を調達するのを助けてください。シェアするたびに命が救われます！🐾\n\n'
                                        + '請求書リンク: {{invoice_link}}\n\n',
                                    parse_mode: 'HTML'
                                }
                            }
                        ]),
                        // ko
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: '성공! 🥳 당신의 전용 기부 링크가 준비되었습니다. 널리 공유하여 전 세계적으로 고양이 수호자를 찾고 길고양이들에게 중요한 관리를 제공할 수 있도록 도와주세요. 공유할 때마다 생명을 구할 수 있습니다! 🐾\n\n'
                                        + '인보이스 링크: {{invoice_link}}\n\n',
                                    parse_mode: 'HTML'
                                }
                            }
                        ]),
                        // he
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: 'הצלחה! 🥳 קישור התרומה הייעודי שלך מוכן. שתף אותו באופן נרחב כדי לעזור לנו למצוא שומרי חתולים גלובליים ולממן טיפול קריטי לחתולי רחוב. כל שיתוף הוא חיים שניצלו! 🐾\n\n'
                                        + 'קישור חשבונית: {{invoice_link}}\n\n',
                                    parse_mode: 'HTML'
                                }
                            }
                        ])
                    ],
                    ['/cats',
                        // default (en)
                        JSON.stringify([
                            { "next": "#remove_keyboard" },
                            { "next": "/1st_engagement" }
                        ])
                    ],
                    ['/1st_engagement',
                        // default (en)
                        JSON.stringify([
                            { "next": "#remove_keyboard" },
                            { "next": "#send_1st_engagement_sample" }
                        ])
                    ],
                    ['#send_1st_engagement_sample',
                        // default (en)
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: '🚨 URGENT CALL for Cat Lovers! 🐾❤️\n\n'
                                        + 'Look at these sweet faces! Thousands of stray and abandoned cats are waiting for a hero like you to step in. They need food, medical care, and a safe, warm place to nap.\n\n'
                                        + 'Your small act of kindness can change a life today. Every donation helps us rescue, treat, and find forever homes for these deserving feline friends.\n\n'
                                        + 'Will you be their light? Choose how you want to make a difference: Donate, Volunteer, or simply Learn More about our mission!\n\n'
                                        + 'Thank you for your purr-fect compassion! 🐱🌟',
                                    photo: EMD.YOU_GOT_IT_IMG_URL,
                                    parse_mode: 'HTML',
                                    reply_markup: {
                                        inline_keyboard: [
                                            [
                                                { text: "🎖️ Learn More", callback_data: "/2nd_engagement" }
                                            ]
                                        ]
                                    }
                                }
                            }
                        ]),
                        // es
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: '🚨 LLAMADA URGENTE para Amantes de los Gatos! 🐾❤️\n\n'
                                        + '¡Mira estas caritas dulces! Miles de gatos callejeros y abandonados están esperando que un héroe como tú intervenga. Necesitan comida, atención médica y un lugar seguro y cálido para echar una siesta.\n\n'
                                        + 'Tu pequeño acto de bondad puede cambiar una vida hoy. Cada donación nos ayuda a rescatar, tratar y encontrar hogares permanentes para estos merecedores amigos felinos.\n\n'
                                        + '¿Serás su luz? Elige cómo quieres marcar la diferencia: ¡Dona, Colabora (Voluntario), o simplemente Aprende Más sobre nuestra misión!\n\n'
                                        + '¡Gracias por tu perfecta compasión felina! 🐱🌟',
                                    photo: EMD.YOU_GOT_IT_IMG_URL,
                                    parse_mode: 'HTML',
                                    reply_markup: {
                                        inline_keyboard: [
                                            [
                                                { text: "🎖️ Aprender Más", callback_data: "/2nd_engagement" }
                                            ]
                                        ]
                                    }
                                }
                            }
                        ]),
                        // fr
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: '🚨 APPEL URGENT aux Amoureux des Chats! 🐾❤️\n\n'
                                        + 'Regardez ces doux visages! Des milliers de chats errants et abandonnés attendent un héros comme vous. Ils ont besoin de nourriture, de soins médicaux et d\'un endroit sûr et chaud pour faire la sieste.\n\n'
                                        + 'Votre petit acte de gentillesse peut changer une vie aujourd\'hui. Chaque don nous aide à sauver, soigner et trouver des foyers éternels pour ces amis félins méritants.\n\n'
                                        + 'Serez-vous leur lumière? Choisissez comment vous voulez faire la différence: Faites un Don, Collaborez (Volontariat), ou simplement Apprenez-en Davantage sur notre mission!\n\n'
                                        + 'Merci pour votre compassion ronronnante! 🐱🌟',
                                    photo: EMD.YOU_GOT_IT_IMG_URL,
                                    parse_mode: 'HTML',
                                    reply_markup: {
                                        inline_keyboard: [
                                            [
                                                { text: "🎖️ En savoir plus", callback_data: "/2nd_engagement" }
                                            ]
                                        ]
                                    }
                                }
                            }
                        ]),
                        // ar
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: '🚨 نداء عاجل لمحبي القطط! 🐾❤️\n\n'
                                        + 'انظر إلى هذه الوجوه الجميلة! الآلاف من القطط الضالة والمهجورة تنتظر بطلاً مثلك للتدخل. إنهم بحاجة إلى طعام، رعاية طبية، ومكان آمن ودافئ للقيلولة.\n\n'
                                        + 'عملك الصغير من اللطف يمكن أن يغير حياة اليوم. كل تبرع يساعدنا على إنقاذ وعلاج وإيجاد منازل أبدية لهؤلاء الأصدقاء القطط المستحقين.\n\n'
                                        + 'هل ستكون نورهم؟ اختر كيف تريد أن تحدث فرقًا: تبرع، تطوع، أو ببساطة تعرّف على المزيد حول مهمتنا!\n\n'
                                        + 'شكراً لتعاطفك الرائع! 🐱🌟',
                                    photo: EMD.YOU_GOT_IT_IMG_URL,
                                    parse_mode: 'HTML',
                                    reply_markup: {
                                        inline_keyboard: [
                                            [
                                                { text: "🎖️ تعرّف على المزيد", callback_data: "/2nd_engagement" }
                                            ]
                                        ]
                                    }
                                }
                            }
                        ]),
                        // de
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: '🚨 DRINGENDER AUFRUF an Katzenliebhaber! 🐾❤️\n\n'
                                        + 'Sehen Sie diese süßen Gesichter! Tausende streunende und ausgesetzte Katzen warten auf einen Helden wie Sie. Sie brauchen Futter, medizinische Versorgung und einen sicheren, warmen Ort zum Nickerchen.\n\n'
                                        + 'Ihre kleine Geste der Freundlichkeit kann heute ein Leben verändern. Jede Spende hilft uns, diese verdienten Samtpfoten zu retten, zu behandeln und ein Zuhause für immer zu finden.\n\n'
                                        + 'Werden Sie ihr Licht sein? Wählen Sie, wie Sie etwas bewirken möchten: Spenden, Zusammenarbeiten (als Freiwilliger) oder einfach mehr über unsere Mission erfahren!\n\n'
                                        + 'Vielen Dank für Ihr schnurriges Mitgefühl! 🐱🌟',
                                    photo: EMD.YOU_GOT_IT_IMG_URL,
                                    parse_mode: 'HTML',
                                    reply_markup: {
                                        inline_keyboard: [
                                            [
                                                { text: "🎖️ Mehr erfahren", callback_data: "/2nd_engagement" }
                                            ]
                                        ]
                                    }
                                }
                            }
                        ]),
                        // it
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: '🚨 APPELLO URGENTE per Amanti dei Gatti! 🐾❤️\n\n'
                                        + 'Guarda questi dolci musi! Migliaia di gatti randagi e abbandonati stanno aspettando un eroe come te. Hanno bisogno di cibo, cure mediche e un posto sicuro e caldo per fare un pisolino.\n\n'
                                        + 'Il tuo piccolo atto di gentilezza può cambiare una vita oggi. Ogni donazione ci aiuta a salvare, curare e trovare case per sempre per questi meritevoli amici felini.\n\n'
                                        + 'Sarai la loro luce? Scegli come vuoi fare la differenza: Dona, Collabora (Volontariato), o semplicemente Scopri di più sulla nostra missione!\n\n'
                                        + 'Grazie per la tua perfetta compassione felina! 🐱🌟',
                                    photo: EMD.YOU_GOT_IT_IMG_URL,
                                    parse_mode: 'HTML',
                                    reply_markup: {
                                        inline_keyboard: [
                                            [
                                                { text: "🎖️ Scopri di più", callback_data: "/2nd_engagement" }
                                            ]
                                        ]
                                    }
                                }
                            }
                        ]),
                        // pt
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: '🚨 CHAMADA URGENTE para Amantes de Gatos! 🐾❤️\n\n'
                                        + 'Olhe para estes rostinhos doces! Milhares de gatos vadios e abandonados estão esperando por um herói como você para intervir. Eles precisam de comida, cuidados médicos e um lugar seguro e quente para tirar uma soneca.\n\n'
                                        + 'Seu pequeno ato de bondade pode mudar uma vida hoje. Cada doação nos ajuda a resgatar, tratar e encontrar lares permanentes para estes merecedores amigos felinos.\n\n'
                                        + 'Você será a luz deles? Escolha como você quer fazer a diferença: Doe, Colabore (Voluntariado) ou simplesmente Saiba Mais sobre nossa missão!\n\n'
                                        + 'Obrigado pela sua compaixão ronronante! 🐱🌟',
                                    photo: EMD.YOU_GOT_IT_IMG_URL,
                                    parse_mode: 'HTML',
                                    reply_markup: {
                                        inline_keyboard: [
                                            [
                                                { text: "🎖️ Saiba Mais", callback_data: "/2nd_engagement" }
                                            ]
                                        ]
                                    }
                                }
                            }
                        ]),
                        // ru
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: '🚨 СРОЧНЫЙ ПРИЗЫВ для любителей кошек! 🐾❤️\n\n'
                                        + 'Посмотрите на эти милые мордашки! Тысячи бездомных и брошенных кошек ждут такого героя, как вы. Им нужна еда, медицинская помощь и безопасное, теплое место для сна.\n\n'
                                        + 'Ваш небольшой акт доброты может изменить жизнь сегодня. Каждое пожертвование помогает нам спасать, лечить и находить постоянные дома для этих достойных пушистых друзей.\n\n'
                                        + 'Станете ли вы их светом? Выберите, как вы хотите помочь: Сделайте пожертвование, Станьте волонтером (Сотрудничайте) или просто Узнайте больше о нашей миссии!\n\n'
                                        + 'Спасибо за ваше идеальное кошачье сострадание! 🐱🌟',
                                    photo: EMD.YOU_GOT_IT_IMG_URL,
                                    parse_mode: 'HTML',
                                    reply_markup: {
                                        inline_keyboard: [
                                            [
                                                { text: "🎖️ Узнать больше", callback_data: "/2nd_engagement" }
                                            ]
                                        ]
                                    }
                                }
                            }
                        ]),
                        // zh
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: '🚨 猫咪爱好者的紧急呼吁! 🐾❤️\n\n'
                                        + '看看这些甜美的面孔！成千上万的流浪猫和被遗弃的猫正在等待像您这样的英雄伸出援手。它们需要食物、医疗护理和一个安全、温暖的小憩之所。\n\n'
                                        + '您的小小善举可以改变今天的生活。每一笔捐款都帮助我们拯救、治疗并为这些值得的猫科动物朋友找到永久的家。\n\n'
                                        + '您愿意成为它们的光芒吗？选择您想如何发挥作用：捐款、合作（志愿服务），或只是了解更多关于我们的使命！\n\n'
                                        + '感谢您的完美猫式同情心！🐱🌟',
                                    photo: EMD.YOU_GOT_IT_IMG_URL,
                                    parse_mode: 'HTML',
                                    reply_markup: {
                                        inline_keyboard: [
                                            [
                                                { text: "🎖️ 了解更多", callback_data: "/2nd_engagement" }
                                            ]
                                        ]
                                    }
                                }
                            }
                        ]),
                        // ja
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: '🚨 猫好きへの緊急呼びかけ！ 🐾❤️\n\n'
                                        + 'この愛らしい顔を見てください！何千匹もの野良猫や捨てられた猫が、あなたのようなヒーローが介入するのを待っています。彼らは食べ物、医療、そして安全で暖かい昼寝場所を必要としています。\n\n'
                                        + 'あなたの小さな親切な行動が今日、命を変えることができます。すべての寄付は、これらの価値ある猫の友を救助し、治療し、永遠の家を見つけるのに役立ちます。\n\n'
                                        + 'あなたは彼らの光になりますか？どのように貢献したいかを選択してください：寄付する、協力する（ボランティア）、または単に私たちの使命について詳しく知る！\n\n'
                                        + 'あなたの完璧な猫への思いやりに感謝します！ 🐱🌟',
                                    photo: EMD.YOU_GOT_IT_IMG_URL,
                                    parse_mode: 'HTML',
                                    reply_markup: {
                                        inline_keyboard: [
                                            [
                                                { text: "🎖️ 詳細はこちら", callback_data: "/2nd_engagement" }
                                            ]
                                        ]
                                    }
                                }
                            }
                        ]),
                        // ko
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: '🚨 고양이 애호가를 위한 긴급 요청! 🐾❤️\n\n'
                                        + '이 사랑스러운 얼굴들을 보세요! 수천 마리의 길 잃은 고양이와 버려진 고양이들이 당신과 같은 영웅이 나서기를 기다리고 있습니다. 그들은 음식, 의료 지원, 그리고 안전하고 따뜻한 낮잠 장소가 필요합니다.\n\n'
                                        + '당신의 작은 친절이 오늘 한 생명을 바꿀 수 있습니다. 모든 기부는 이 소중한 고양이 친구들을 구조하고 치료하며 영원한 집을 찾는 데 도움이 됩니다.\n\n'
                                        + '당신은 그들의 빛이 되어줄 수 있나요? 기부, 협력(자원 봉사), 또는 단순히 우리의 임무에 대해 자세히 알아보는 등 어떻게 기여하고 싶은지 선택하세요!\n\n'
                                        + '당신의 완벽한 고양이 애정에 감사드립니다! 🐱🌟',
                                    photo: EMD.YOU_GOT_IT_IMG_URL,
                                    parse_mode: 'HTML',
                                    reply_markup: {
                                        inline_keyboard: [
                                            [
                                                { text: "🎖️ 자세히 알아보기", callback_data: "/2nd_engagement" }
                                            ]
                                        ]
                                    }
                                }
                            }
                        ]),
                        // he
                        JSON.stringify([
                            {
                                method: 'sendPhoto',
                                payload: {
                                    caption: '🚨 קריאה דחופה לאוהבי חתולים! 🐾❤️\n\n'
                                        + 'תסתכלו על הפרצופים המתוקים האלה! אלפי חתולי רחוב וחתולים נטושים מחכים לגיבור כמוך שיכנס לתמונה. הם זקוקים למזון, טיפול רפואי ומקום בטוח וחם לנמנם בו.\n\n'
                                        + 'מעשה החסד הקטן שלך יכול לשנות חיים היום. כל תרומה עוזרת לנו להציל, לטפל ולמצוא בתים לנצח לחברים החתוליים הראויים האלה.\n\n'
                                        + 'האם תהיה האור שלהם? בחר כיצד תרצה לעשות שינוי: תרום, שתף פעולה (התנדב), או פשוט למד עוד על המשימה שלנו!\n\n'
                                        + 'תודה על החמלה המושלמת שלך! 🐱🌟',
                                    photo: EMD.YOU_GOT_IT_IMG_URL,
                                    parse_mode: 'HTML',
                                    reply_markup: {
                                        inline_keyboard: [
                                            [
                                                { text: "🎖️ למידע נוסף", callback_data: "/2nd_engagement" }
                                            ]
                                        ]
                                    }
                                }
                            }
                        ])
                    ],
                    ['/2nd_engagement',
                        // default (en)
                        JSON.stringify([
                            { "next": "#remove_keyboard" },
                            { "next": "#send_2nd_engagement_sample" }
                        ])
                    ],
                    ['#send_2nd_engagement_sample',
                        // default (en)
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: '🐈 The Cat Guardian Pledge: Why We Need You 🐾\n\n'
                                        + 'We believe every cat deserves a safe, loving life. Our mission is to rescue, rehabilitate, and rehome the most vulnerable felines in need, turning fear into purrs.\n\n'
                                        + 'Your support directly powers three core pillars of our life-saving work:\n'
                                        + '1. 🏥 <b>Emergency Care:</b> Funding critical surgeries, vaccinations, and essential spay/neuter programs.\n'
                                        + '2. 🍲 <b>Nourishment & Shelter:</b> Providing high-quality food, cozy temporary homes, and safety.\n'
                                        + '3. 🤝 <b>Adoption & Collaboration:</b> Matching cats with their forever homes and mobilizing local volunteers.\n\n'
                                        + 'We are committed to a global impact, touching the lives of stray cats wherever they need a hand.\n\n'
                                        + 'Ready to be a Cat Guardian? Choose your role below: Donate to fund a rescue, or Join our Community to collaborate! 🌟',
                                    parse_mode: 'HTML',
                                    reply_markup: {
                                        inline_keyboard: [
                                            [{ text: "💝 Donate Now", callback_data: "/3rd_engagement" }],
                                            [{ text: "👥 Join Our Community", callback_data: "/join_our_community" }]
                                        ]
                                    }
                                }
                            }
                        ]),
                        // es
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: '🐈 El Compromiso del Guardián Felino: Por Qué Te Necesitamos 🐾\n\n'
                                        + 'Creemos que cada gato merece una vida segura y amorosa. Nuestra misión es rescatar, rehabilitar y reubicar a los felinos más vulnerables que lo necesiten, transformando el miedo en ronroneos.\n\n'
                                        + 'Tu apoyo impulsa directamente tres pilares fundamentales de nuestro trabajo para salvar vidas:\n'
                                        + '1. 🏥 <b>Atención de Emergencia:</b> Financiando cirugías críticas, vacunas y programas esenciales de esterilización/castración.\n'
                                        + '2. 🍲 <b>Nutrición y Refugio:</b> Proporcionando alimentos de alta calidad, hogares temporales acogedores y seguridad.\n'
                                        + '3. 🤝 <b>Adopción y Colaboración:</b> Encontrando el hogar perfecto para los gatos y movilizando voluntarios locales.\n\n'
                                        + 'Estamos comprometidos con un impacto global, ayudando a los gatos callejeros dondequiera que necesiten una mano.\n\n'
                                        + '¿Listo para ser un Guardián Felino? Elige tu rol a continuación: Dona para financiar un rescate, o Únete a nuestra Comunidad para colaborar! 🌟',
                                    parse_mode: 'HTML',
                                    reply_markup: {
                                        inline_keyboard: [
                                            [{ text: "💝 Donar Ahora", callback_data: "/3rd_engagement" }],
                                            [{ text: "👥 Únete a Nuestra Comunidad", callback_data: "/join_our_community" }]
                                        ]
                                    }
                                }
                            }
                        ]),
                        // fr
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: '🐈 L\'Engagement du Gardien de Chat : Pourquoi Nous Avons Besoin de Vous 🐾\n\n'
                                        + 'Nous croyons que chaque chat mérite une vie sûre et aimante. Notre mission est de secourir, réhabiliter et reloger les félins les plus vulnérables dans le besoin, transformant la peur en ronronnements.\n\n'
                                        + 'Votre soutien alimente directement trois piliers essentiels de notre travail pour sauver des vies:\n'
                                        + '1. 🏥 <b>Soins d\'Urgence :</b> Financement des chirurgies critiques, des vaccinations et des programmes essentiels de stérilisation/castration.\n'
                                        + '2. 🍲 <b>Nourriture & Abri :</b> Fournir des aliments de haute qualité, des foyers temporaires douillets et la sécurité.\n'
                                        + '3. 🤝 <b>Adoption & Collaboration :</b> Trouver le foyer parfait pour les chats et mobiliser les bénévoles locaux.\n\n'
                                        + 'Nous nous engageons à avoir un impact mondial, aidant les chats errants partout où ils ont besoin d\'aide.\n\n'
                                        + 'Prêt à être un Gardien de Chat ? Choisissez votre rôle ci-dessous : Faites un don pour financer un sauvetage, ou Rejoignez notre Communauté pour collaborer ! 🌟',
                                    parse_mode: 'HTML',
                                    reply_markup: {
                                        inline_keyboard: [
                                            [{ text: "💝 Faire un Don Maintenant", callback_data: "/3rd_engagement" }],
                                            [{ text: "👥 Rejoindre Notre Communauté", callback_data: "/join_our_community" }]
                                        ]
                                    }
                                }
                            }
                        ]),
                        // ar
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: '🐈 تعهد حارس القطط: لماذا نحتاج إليك 🐾\n\n'
                                        + 'نؤمن بأن كل قطة تستحق حياة آمنة ومحبة. مهمتنا هي إنقاذ، تأهيل، وإعادة توطين القطط الأكثر ضعفاً التي تحتاج للمساعدة، وتحويل الخوف إلى مواءات مريحة.\n\n'
                                        + 'دعمك يغذي مباشرة ثلاثة أعمدة أساسية لعملنا المنقذ للحياة:\n'
                                        + '1. 🏥 <b>رعاية طارئة:</b> تمويل العمليات الجراحية الحيوية، اللقاحات، وبرامج التعقيم/الخصي الأساسية.\n'
                                        + '2. 🍲 <b>تغذية ومأوى:</b> توفير طعام عالي الجودة، ومنازل مؤقتة دافئة وآمنة.\n'
                                        + '3. 🤝 <b>تبني وتعاون:</b> مطابقة القطط مع منازلها الأبدية وتعبئة المتطوعين المحليين.\n\n'
                                        + 'نحن ملتزمون بتأثير عالمي، نلامس حياة القطط الضالة أينما احتاجت إلى مساعدة.\n\n'
                                        + 'هل أنت مستعد لتكون حارس قطط؟ اختر دورك أدناه: تبرع لتمويل عملية إنقاذ، أو انضم إلى مجتمعنا للتعاون! 🌟',
                                    parse_mode: 'HTML',
                                    reply_markup: {
                                        inline_keyboard: [
                                            [{ text: "💝 تبرع الآن", callback_data: "/3rd_engagement" }],
                                            [{ text: "👥 انضم إلى مجتمعنا", callback_data: "/join_our_community" }]
                                        ]
                                    }
                                }
                            }
                        ]),
                        // de
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: '🐈 Das Katzenwächter-Versprechen: Warum wir Sie brauchen 🐾\n\n'
                                        + 'Wir glauben, dass jede Katze ein sicheres, liebevolles Leben verdient. Unsere Mission ist es, die schutzbedürftigsten Katzen in Not zu retten, zu rehabilitieren und neu zu vermitteln, um Angst in Schnurren zu verwandeln.\n\n'
                                        + 'Ihre Unterstützung treibt direkt drei Kernpfeiler unserer lebensrettenden Arbeit an:\n'
                                        + '1. 🏥 <b>Notfallversorgung:</b> Finanzierung kritischer Operationen, Impfungen und essentieller Kastrations-/Sterilisationsprogramme.\n'
                                        + '2. 🍲 <b>Nahrung & Unterkunft:</b> Bereitstellung von hochwertigem Futter, gemütlichen Übergangsheimen und Sicherheit.\n'
                                        + '3. 🤝 <b>Adoption & Zusammenarbeit:</b> Vermittlung von Katzen in ihr endgültiges Zuhause und Mobilisierung lokaler Freiwilliger.\n\n'
                                        + 'Wir engagieren uns für eine globale Wirkung und helfen streunenden Katzen, wo immer sie eine helfende Hand brauchen.\n\n'
                                        + 'Bereit, ein Katzenwächter zu sein? Wählen Sie Ihre Rolle unten: Spenden Sie, um eine Rettung zu finanzieren, oder treten Sie unserer Community bei, um zusammenzuarbeiten! 🌟',
                                    parse_mode: 'HTML',
                                    reply_markup: {
                                        inline_keyboard: [
                                            [{ text: "💝 Jetzt spenden", callback_data: "/3rd_engagement" }],
                                            [{ text: "👥 Treten Sie unserer Gemeinschaft bei", callback_data: "/join_our_community" }]
                                        ]
                                    }
                                }
                            }
                        ]),
                        // it
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: '🐈 L\'Impegno del Guardiano dei Gatti: Perché Abbiamo Bisogno di Te 🐾\n\n'
                                        + 'Crediamo che ogni gatto meriti una vita sicura e amorevole. La nostra missione è salvare, riabilitare e trovare casa ai felini più vulnerabili, trasformando la paura in fusa.\n\n'
                                        + 'Il tuo supporto alimenta direttamente tre pilastri fondamentali del nostro lavoro per salvare vite:\n'
                                        + '1. 🏥 <b>Cure d\'Emergenza:</b> Finanziamento di interventi chirurgici critici, vaccinazioni e programmi essenziali di sterilizzazione/castrazione.\n'
                                        + '2. 🍲 <b>Nutrimento e Rifugio:</b> Fornitura di cibo di alta qualità, case temporanee accoglienti e sicurezza.\n'
                                        + '3. 🤝 <b>Adozione e Collaborazione:</b> Abbinamento dei gatti con le loro case per sempre e mobilitazione dei volontari locali.\n\n'
                                        + 'Ci impegniamo per un impatto globale, toccando le vite dei gatti randagi ovunque abbiano bisogno di aiuto.\n\n'
                                        + 'Pronto a essere un Guardiano dei Gatti? Scegli il tuo ruolo qui sotto: Dona per finanziare un salvataggio, o Unisciti alla nostra Comunità per collaborare! 🌟',
                                    parse_mode: 'HTML',
                                    reply_markup: {
                                        inline_keyboard: [
                                            [{ text: "💝 Dona Ora", callback_data: "/3rd_engagement" }],
                                            [{ text: "👥 Unisciti alla Nostra Comunità", callback_data: "/join_our_community" }]
                                        ]
                                    }
                                }
                            }
                        ]),
                        // pt
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: '🐈 O Compromisso do Guardião de Gatos: Por Que Precisamos de Você 🐾\n\n'
                                        + 'Acreditamos que todo gato merece uma vida segura e amorosa. Nossa missão é resgatar, reabilitar e realojar os felinos mais vulneráveis em necessidade, transformando o medo em ronronos.\n\n'
                                        + 'Seu apoio impulsiona diretamente três pilares essenciais do nosso trabalho de salvar vidas:\n'
                                        + '1. 🏥 <b>Cuidados de Emergência:</b> Financiamento de cirurgias críticas, vacinação e programas essenciais de esterilização/castração.\n'
                                        + '2. 🍲 <b>Nutrição e Abrigo:</b> Fornecimento de alimentos de alta qualidade, lares temporários aconchegantes e segurança.\n'
                                        + '3. 🤝 <b>Adoção e Colaboração:</b> Encontrar o lar permanente perfeito para os gatos e mobilizar voluntários locais.\n\n'
                                        + 'Estamos comprometidos com um impacto global, alcançando a vida de gatos de rua onde quer que precisem de uma mão.\n\n'
                                        + 'Pronto para ser um Guardião de Gatos? Escolha seu papel abaixo: Doe para financiar um resgate, ou Junte-se à nossa Comunidade para colaborar! 🌟',
                                    parse_mode: 'HTML',
                                    reply_markup: {
                                        inline_keyboard: [
                                            [{ text: "💝 Doe Agora", callback_data: "/3rd_engagement" }],
                                            [{ text: "👥 Junte-se à Nossa Comunidade", callback_data: "/join_our_community" }]
                                        ]
                                    }
                                }
                            }
                        ]),
                        // ru
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: '🐈 Обещание Хранителя Кошек: Почему мы нуждаемся в Вас 🐾\n\n'
                                        + 'Мы верим, что каждая кошка заслуживает безопасной и любящей жизни. Наша миссия — спасать, реабилитировать и пристраивать самых уязвимых кошек, превращая страх в мурлыканье.\n\n'
                                        + 'Ваша поддержка напрямую питает три ключевых столпа нашей спасательной работы:\n'
                                        + '1. 🏥 <b>Экстренная помощь:</b> Финансирование критических операций, вакцинации и основных программ стерилизации/кастрации.\n'
                                        + '2. 🍲 <b>Питание и приют:</b> Предоставление высококачественного корма, уютных временных домов и безопасности.\n'
                                        + '3. 🤝 <b>Усыновление и сотрудничество:</b> Поиск идеальной семьи для кошек и мобилизация местных волонтеров.\n\n'
                                        + 'Мы стремимся к глобальному воздействию, помогая бездомным кошкам везде, где нужна помощь.\n\n'
                                        + 'Готовы стать Хранителем Кошек? Выберите свою роль ниже: Сделайте пожертвование для финансирования спасения или Присоединяйтесь к нашему Сообществу для сотрудничества! 🌟',
                                    parse_mode: 'HTML',
                                    reply_markup: {
                                        inline_keyboard: [
                                            [{ text: "💝 Пожертвовать сейчас", callback_data: "/3rd_engagement" }],
                                            [{ text: "👥 Присоединиться к нашему сообществу", callback_data: "/join_our_community" }]
                                        ]
                                    }
                                }
                            }
                        ]),
                        // zh
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: '🐈 猫咪守护者承诺：为什么我们需要您 🐾\n\n'
                                        + '我们相信每只猫都值得拥有一个安全、充满爱的生活。我们的使命是拯救、康复和重新安置社区内外最弱势的猫科动物，将恐惧转化为咕噜声。\n\n'
                                        + '您的支持直接驱动我们救生工作的三个核心支柱:\n'
                                        + '1. 🏥 <b>紧急护理：</b> 资助关键手术、疫苗接种和必要的绝育/阉割计划。\n'
                                        + '2. 🍲 <b>营养与住所：</b> 提供高质量的食物、舒适的临时住所和安全保障。\n'
                                        + '3. 🤝 <b>领养与协作：</b> 为猫咪找到它们永远的家，并动员本地志愿者。\n\n'
                                        + '我们致力于产生全球影响，在流浪猫最需要帮助的地方伸出援手。\n\n'
                                        + '准备好成为一名猫咪守护者了吗？请在下方选择您的角色：捐款以资助一次救援，或加入我们的社区进行协作！🌟',
                                    parse_mode: 'HTML',
                                    reply_markup: {
                                        inline_keyboard: [
                                            [{ text: "💝 立即捐款", callback_data: "/3rd_engagement" }],
                                            [{ text: "👥 加入我们的社区", callback_data: "/join_our_community" }]
                                        ]
                                    }
                                }
                            }
                        ]),
                        // ja
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: '🐈 猫の守護者の誓い：なぜあなたが必要なのか 🐾\n\n'
                                        + '私たちはすべての猫が安全で愛情ある生活を送る価値があると信じています。私たちの使命は、最も弱い立場の猫を救助し、リハビリし、新しい家に迎えることです。恐怖を喉を鳴らす音に変えましょう。\n\n'
                                        + 'あなたの支援は、私たちの命を救う活動の3つの核となる柱を直接支えます:\n'
                                        + '1. 🏥 <b>緊急医療：</b> 重要な手術、予防接種、必須の不妊・去勢プログラムに資金を提供します。\n'
                                        + '2. 🍲 <b>栄養とシェルター：</b> 高品質の食事、居心地の良い一時的な家、そして安全を提供します。\n'
                                        + '3. 🤝 <b>里親探しと協力：</b> 猫と永遠の家族を結びつけ、地元のボランティアを動員します。\n\n'
                                        + '私たちはグローバルな影響を与えることにコミットし、助けが必要な場所ならどこでも野良猫の命に触れています。\n\n'
                                        + '猫の守護者になる準備はできましたか？以下からあなたの役割を選んでください：寄付で救助を支援するか、私たちのコミュニティに参加して協力しましょう！🌟',
                                    parse_mode: 'HTML',
                                    reply_markup: {
                                        inline_keyboard: [
                                            [{ text: "💝 今すぐ寄付", callback_data: "/3rd_engagement" }],
                                            [{ text: "👥 コミュニティに参加", callback_data: "/join_our_community" }]
                                        ]
                                    }
                                }
                            }
                        ]),
                        // ko
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: '🐈 고양이 수호자의 서약: 왜 당신이 필요한가요 🐾\n\n'
                                        + '우리는 모든 고양이가 안전하고 사랑받는 삶을 누릴 자격이 있다고 믿습니다. 우리의 임무는 가장 취약한 고양이를 구조하고, 재활시키고, 입양시키는 것입니다. 두려움을 골골송으로 바꿔주세요.\n\n'
                                        + '당신의 지원은 우리의 생명을 구하는 작업의 세 가지 핵심 기둥을 직접적으로 지원합니다:\n'
                                        + '1. 🏥 <b>응급 치료:</b> 중요한 수술, 예방 접종, 필수적인 중성화/불임 수술 프로그램에 자금을 지원합니다.\n'
                                        + '2. 🍲 <b>영양 및 쉼터:</b> 고품질 사료, 아늑한 임시 보호소 및 안전을 제공합니다.\n'
                                        + '3. 🤝 <b>입양 및 협력:</b> 고양이와 평생 가족을 연결하고 지역 자원 봉사자를 동원합니다.\n\n'
                                        + '우리는 도움이 필요한 길고양이들의 삶에 영향을 미치기 위해 전 세계적인 영향력을 발휘하기 위해 노력하고 있습니다.\n\n'
                                        + '고양이 수호자가 될 준비가 되셨나요? 아래에서 역할을 선택하세요: 구조 자금을 기부하거나 커뮤니티에 참여하여 협력하세요! 🌟',
                                    parse_mode: 'HTML',
                                    reply_markup: {
                                        inline_keyboard: [
                                            [{ text: "💝 지금 기부하기", callback_data: "/3rd_engagement" }],
                                            [{ text: "👥 우리 커뮤니티에 참여", callback_data: "/join_our_community" }]
                                        ]
                                    }
                                }
                            }
                        ]),
                        // he
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: '🐈 הבטחת שומר החתולים: למה אנחנו זקוקים לך 🐾\n\n'
                                        + 'אנו מאמינים שלכל חתול מגיע חיים בטוחים ואוהבים. המשימה שלנו היא להציל, לשקם ולמצוא בית לחתולים הפגיעים ביותר הזקוקים לעזרה, ולהפוך פחד לגרגורים.\n\n'
                                        + 'התמיכה שלך מניעה ישירות שלושה עמודי ליבה של עבודתנו להצלת חיים:\n'
                                        + '1. 🏥 <b>טיפול רפואי דחוף:</b> מימון ניתוחים קריטיים, חיסונים ותוכניות עיקור/סירוס חיוניות.\n'
                                        + '2. 🍲 <b>תזונה ומחסה:</b> אספקת מזון איכותי, בתים זמניים נעימים וביטחון.\n'
                                        + '3. 🤝 <b>אימוץ ושיתוף פעולה:</b> מציאת ההתאמה האנושית המושלמת לחתולים וגיוס מתנדבים מקומיים.\n\n'
                                        + 'אנו מחויבים להשפעה גלובלית, נוגעים בחייהם של חתולי רחוב בכל מקום שהם זקוקים ליד עוזרת.\n\n'
                                        + 'מוכנים להיות שומר חתולים? בחר את תפקידך למטה: תרום כדי לממן הצלה, או הצטרף לקהילה שלנו כדי לשתף פעולה! 🌟',
                                    parse_mode: 'HTML',
                                    reply_markup: {
                                        inline_keyboard: [
                                            [{ text: "💝 תרום עכשיו", callback_data: "/3rd_engagement" }],
                                            [{ text: "👥 הצטרף לקהילה שלנו", callback_data: "/join_our_community" }]
                                        ]
                                    }
                                }
                            }
                        ])
                    ],
                    ['/3rd_engagement',
                        // default (en)
                        JSON.stringify([
                            { "next": "#remove_keyboard" },
                            { "next": "#send_3rd_engagement_sample" }
                        ])
                    ],
                    ['#send_3rd_engagement_sample',
                        // default (en)
                        JSON.stringify([
                            {   // send ask for donation message
                                method: 'sendInvoice',
                                payload: {
                                    // Product name, 1-32 characters
                                    title: 'Save a Stray Cat\'s Life Today 🐾',
                                    // Product description, 1-255 characters
                                    description: 'You are a Cat Hero! Your XTR donation will provide emergency medical care, food, and safe shelter for a vulnerable cat. Every coin counts towards a \'purr-fect\' happy ending. Thank you for your kindness! 🐱❤️',
                                    payload: 'bronze_supporter', // Custom payload for your reference
                                    currency: 'XTR',
                                    prices: JSON.stringify([
                                        { label: 'Donate XTR to Save a Cat', amount: 1000 }
                                    ]),
                                    photo_url: EMD.LOGO_PNG_URL,
                                    photo_width: 240,
                                    protect_content: false,
                                    allow_paid_broadcast: false,
                                    reply_markup: {
                                        inline_keyboard: [
                                            [
                                                { text: "👥 Join Our Community", callback_data: "/join_our_community" }
                                            ],
                                            [
                                                { text: "🎖️ Learn More", callback_data: "/2nd_engagement" }
                                            ]
                                        ]
                                    }
                                }
                            }
                        ]),
                        // es
                        JSON.stringify([
                            {
                                method: 'sendInvoice',
                                payload: {
                                    title: 'Salva la Vida de un Gato Callejero Hoy 🐾',
                                    description: '¡Eres un Héroe Felino! Tu donación en XTR proporcionará atención médica de emergencia, comida y refugio seguro a un gato vulnerable. Cada moneda cuenta para un final feliz "perfecto". ¡Gracias por tu bondad! 🐱❤️',
                                    payload: 'bronze_supporter',
                                    currency: 'XTR',
                                    prices: JSON.stringify([
                                        { label: 'Donar XTR para Salvar un Gato', amount: 1000 }
                                    ]),
                                    photo_url: EMD.LOGO_PNG_URL,
                                    photo_width: 240,
                                    protect_content: false,
                                    allow_paid_broadcast: false,
                                    reply_markup: {
                                        inline_keyboard: [
                                            [
                                                { text: "👥 Únete a Nuestra Comunidad", callback_data: "/join_our_community" }
                                            ],
                                            [
                                                { text: "🎖️ Aprender Más", callback_data: "/2nd_engagement" }
                                            ]
                                        ]
                                    }
                                }
                            }
                        ]),
                        // fr
                        JSON.stringify([
                            {
                                method: 'sendInvoice',
                                payload: {
                                    title: 'Sauvez la Vie d\'un Chat Errant Aujourd\'hui 🐾',
                                    description: 'Vous êtes un Héros Félin! Votre don en XTR fournira des soins médicaux d\'urgence, de la nourriture et un abri sûr à un chat vulnérable. Chaque pièce compte pour une fin heureuse "ronronnante". Merci pour votre gentillesse! 🐱❤️',
                                    payload: 'bronze_supporter',
                                    currency: 'XTR',
                                    prices: JSON.stringify([
                                        { label: 'Donner XTR pour Sauver un Chat', amount: 1000 }
                                    ]),
                                    photo_url: EMD.LOGO_PNG_URL,
                                    photo_width: 240,
                                    protect_content: false,
                                    allow_paid_broadcast: false,
                                    reply_markup: {
                                        inline_keyboard: [
                                            [
                                                { text: "👥 Rejoignez Notre Communauté", callback_data: "/join_our_community" }
                                            ],
                                            [
                                                { text: "🎖️ En savoir plus", callback_data: "/2nd_engagement" }
                                            ]
                                        ]
                                    }
                                }
                            }
                        ]),
                        // ar
                        JSON.stringify([
                            {
                                method: 'sendInvoice',
                                payload: {
                                    title: 'أنقذ حياة قطة ضالة اليوم 🐾',
                                    description: 'أنت بطل القطط! تبرعك بـ XTR سيوفر رعاية طبية طارئة، طعامًا، ومأوى آمنًا لقطة ضعيفة. كل عملة مهمة لتحقيق نهاية سعيدة "مُرضية". شكراً لك على لطفك! 🐱❤️',
                                    payload: 'bronze_supporter',
                                    currency: 'XTR',
                                    prices: JSON.stringify([
                                        { label: 'تبرع بـ XTR لإنقاذ قطة', amount: 1000 }
                                    ]),
                                    photo_url: EMD.LOGO_PNG_URL,
                                    photo_width: 240,
                                    protect_content: false,
                                    allow_paid_broadcast: false,
                                    reply_markup: {
                                        inline_keyboard: [
                                            [
                                                { text: "👥 انضم إلى مجتمعنا", callback_data: "/join_our_community" }
                                            ],
                                            [
                                                { text: "🎖️ تعرّف على المزيد", callback_data: "/2nd_engagement" }
                                            ]
                                        ]
                                    }
                                }
                            }
                        ]),
                        // de
                        JSON.stringify([
                            {
                                method: 'sendInvoice',
                                payload: {
                                    title: 'Retten Sie heute ein streunendes Katzenleben 🐾',
                                    description: 'Sie sind ein Katzenheld! Ihre XTR-Spende bietet Notfallversorgung, Futter und sicheren Unterschlupf für eine schutzbedürftige Katze. Jede Münze zählt für ein "schnurr-fekt" glückliches Ende. Vielen Dank für Ihre Freundlichkeit! 🐱❤️',
                                    payload: 'bronze_supporter',
                                    currency: 'XTR',
                                    prices: JSON.stringify([
                                        { label: 'Spenden Sie XTR, um eine Katze zu retten', amount: 1000 }
                                    ]),
                                    photo_url: EMD.LOGO_PNG_URL,
                                    photo_width: 240,
                                    protect_content: false,
                                    allow_paid_broadcast: false,
                                    reply_markup: {
                                        inline_keyboard: [
                                            [
                                                { text: "👥 Treten Sie unserer Gemeinschaft bei", callback_data: "/join_our_community" }
                                            ],
                                            [
                                                { text: "🎖️ Mehr erfahren", callback_data: "/2nd_engagement" }
                                            ]
                                        ]
                                    }
                                }
                            }
                        ]),
                        // it
                        JSON.stringify([
                            {
                                method: 'sendInvoice',
                                payload: {
                                    title: 'Salva la Vita di un Gatto Randagio Oggi 🐾',
                                    description: 'Sei un Eroe Felino! La tua donazione in XTR fornirà cure mediche d\'emergenza, cibo e un rifugio sicuro a un gatto vulnerabile. Ogni moneta conta per un lieto fine "perfetto". Grazie per la tua gentilezza! 🐱❤️',
                                    payload: 'bronze_supporter',
                                    currency: 'XTR',
                                    prices: JSON.stringify([
                                        { label: 'Dona XTR per Salvare un Gatto', amount: 1000 }
                                    ]),
                                    photo_url: EMD.LOGO_PNG_URL,
                                    photo_width: 240,
                                    protect_content: false,
                                    allow_paid_broadcast: false,
                                    reply_markup: {
                                        inline_keyboard: [
                                            [
                                                { text: "👥 Unisciti alla Nostra Comunità", callback_data: "/join_our_community" }
                                            ],
                                            [
                                                { text: "🎖️ Scopri di più", callback_data: "/2nd_engagement" }
                                            ]
                                        ]
                                    }
                                }
                            }
                        ]),
                        // pt
                        JSON.stringify([
                            {
                                method: 'sendInvoice',
                                payload: {
                                    title: 'Salve a Vida de um Gato de Rua Hoje 🐾',
                                    description: 'Você é um Herói Felino! Sua doação em XTR fornecerá cuidados médicos de emergência, comida e abrigo seguro para um gato vulnerável. Cada moeda conta para um final feliz "perfeito". Obrigado pela sua bondade! 🐱❤️',
                                    payload: 'bronze_supporter',
                                    currency: 'XTR',
                                    prices: JSON.stringify([
                                        { label: 'Doar XTR para Salvar um Gato', amount: 1000 }
                                    ]),
                                    photo_url: EMD.LOGO_PNG_URL,
                                    photo_width: 240,
                                    protect_content: false,
                                    allow_paid_broadcast: false,
                                    reply_markup: {
                                        inline_keyboard: [
                                            [
                                                { text: "👥 Junte-se à Nossa Comunidade", callback_data: "/join_our_community" }
                                            ],
                                            [
                                                { text: "🎖️ Saiba Mais", callback_data: "/2nd_engagement" }
                                            ]
                                        ]
                                    }
                                }
                            }
                        ]),
                        // ru
                        JSON.stringify([
                            {
                                method: 'sendInvoice',
                                payload: {
                                    title: 'Спасите жизнь бездомной кошки сегодня 🐾',
                                    description: 'Вы - Кошачий Герой! Ваше пожертвование в XTR обеспечит неотложную медицинскую помощь, еду и безопасное убежище для уязвимой кошки. Каждая монета важна для "мур-фектного" счастливого конца. Спасибо за вашу доброту! 🐱❤️',
                                    payload: 'bronze_supporter',
                                    currency: 'XTR',
                                    prices: JSON.stringify([
                                        { label: 'Пожертвовать XTR, чтобы спасти кошку', amount: 1000 }
                                    ]),
                                    photo_url: EMD.LOGO_PNG_URL,
                                    photo_width: 240,
                                    protect_content: false,
                                    allow_paid_broadcast: false,
                                    reply_markup: {
                                        inline_keyboard: [
                                            [
                                                { text: "👥 Присоединяйтесь к нашему сообществу", callback_data: "/join_our_community" }
                                            ],
                                            [
                                                { text: "🎖️ Узнать больше", callback_data: "/2nd_engagement" }
                                            ]
                                        ]
                                    }
                                }
                            }
                        ]),
                        // zh
                        JSON.stringify([
                            {
                                method: 'sendInvoice',
                                payload: {
                                    title: '今天就拯救流浪猫的生命吧 🐾',
                                    description: '您是猫咪英雄！您的 XTR 捐款将为一只脆弱的猫咪提供紧急医疗护理、食物和安全的住所。每一分钱都为实现一个"喵"不可言的幸福结局而努力。感谢您的善良！ 🐱❤️',
                                    payload: 'bronze_supporter',
                                    currency: 'XTR',
                                    prices: JSON.stringify([
                                        { label: '捐赠 XTR 以拯救一只猫', amount: 1000 }
                                    ]),
                                    photo_url: EMD.LOGO_PNG_URL,
                                    photo_width: 240,
                                    protect_content: false,
                                    allow_paid_broadcast: false,
                                    reply_markup: {
                                        inline_keyboard: [
                                            [
                                                { text: "👥 加入我们的社区", callback_data: "/join_our_community" }
                                            ],
                                            [
                                                { text: "🎖️ 了解更多", callback_data: "/2nd_engagement" }
                                            ]
                                        ]
                                    }
                                }
                            }
                        ]),
                        // ja
                        JSON.stringify([
                            {
                                method: 'sendInvoice',
                                payload: {
                                    title: '今日、野良猫の命を救おう 🐾',
                                    description: 'あなたは猫のヒーローです！あなたのXTR寄付は、弱い立場の猫に緊急医療、食べ物、そして安全なシェルターを提供します。すべてのお金が「完璧」なハッピーエンドにつながります。あなたの優しさに感謝します！ 🐱❤️',
                                    payload: 'bronze_supporter',
                                    currency: 'XTR',
                                    prices: JSON.stringify([
                                        { label: '猫を救うためにXTRを寄付', amount: 1000 }
                                    ]),
                                    photo_url: EMD.LOGO_PNG_URL,
                                    photo_width: 240,
                                    protect_content: false,
                                    allow_paid_broadcast: false,
                                    reply_markup: {
                                        inline_keyboard: [
                                            [
                                                { text: "👥 コミュニティに参加", callback_data: "/join_our_community" }
                                            ],
                                            [
                                                { text: "🎖️ 詳細はこちら", callback_data: "/2nd_engagement" }
                                            ]
                                        ]
                                    }
                                }
                            }
                        ]),
                        // ko
                        JSON.stringify([
                            {
                                method: 'sendInvoice',
                                payload: {
                                    title: '오늘 길고양이의 생명을 구하세요 🐾',
                                    description: '당신은 고양이 영웅입니다! 당신의 XTR 기부는 취약한 고양이에게 긴급 의료, 음식 및 안전한 쉼터를 제공할 것입니다. 모든 동전은 "완벽한" 해피 엔딩을 위해 중요합니다. 당신의 친절에 감사드립니다! 🐱❤️',
                                    payload: 'bronze_supporter',
                                    currency: 'XTR',
                                    prices: JSON.stringify([
                                        { label: '고양이 구호를 위해 XTR 기부', amount: 1000 }
                                    ]),
                                    photo_url: EMD.LOGO_PNG_URL,
                                    photo_width: 240,
                                    protect_content: false,
                                    allow_paid_broadcast: false,
                                    reply_markup: {
                                        inline_keyboard: [
                                            [
                                                { text: "👥 우리 커뮤니티에 참여하세요", callback_data: "/join_our_community" }
                                            ],
                                            [
                                                { text: "🎖️ 자세히 알아보기", callback_data: "/2nd_engagement" }
                                            ]
                                        ]
                                    }
                                }
                            }
                        ]),
                        // he
                        JSON.stringify([
                            {
                                method: 'sendInvoice',
                                payload: {
                                    title: 'הצל חיים של חתול רחוב היום 🐾',
                                    description: 'אתה גיבור חתולים! תרומת ה-XTR שלך תספק טיפול רפואי חירום, מזון ומחסה בטוח לחתול פגיע. כל מטבע חשוב עבור סוף טוב "מושלם". תודה על טוב לבך! 🐱❤️',
                                    payload: 'bronze_supporter',
                                    currency: 'XTR',
                                    prices: JSON.stringify([
                                        { label: 'תרום XTR להצלת חתול', amount: 1000 }
                                    ]),
                                    photo_url: EMD.LOGO_PNG_URL,
                                    photo_width: 240,
                                    protect_content: false,
                                    allow_paid_broadcast: false,
                                    reply_markup: {
                                        inline_keyboard: [
                                            [
                                                { text: "👥 הצטרף לקהילה שלנו", callback_data: "/join_our_community" }
                                            ],
                                            [
                                                { text: "🎖️ למידע נוסף", callback_data: "/2nd_engagement" }
                                            ]
                                        ]
                                    }
                                }
                            }
                        ])
                    ],
                    ['/join_our_community',
                        // default (en)
                        JSON.stringify([
                            { "next": "#remove_keyboard" },
                            { "next": "#send_join_community_sample" }
                        ])
                    ],
                    ['#send_join_community_sample',
                        // default (en)
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: '🐈 Welcome to the Cat Guardian Movement! 🐾\n\n'
                                        + 'This is more than a community; it’s a global network of dedicated cat lovers working together to save lives.\n\n'
                                        + '**How to Collaborate & Connect:**\n'
                                        + '1. 🗣️ **Join our Group** to discuss cat care, share rescue stories, and find local collaboration opportunities.\n'
                                        + '2. 📢 **Join our Channel** for official updates, success stories, and donation impact reports.\n'
                                        + '3. 🤝 **Volunteer:** Ask in the group how you can help with fostering, transport, or fundraising!\n\n'
                                        + 'Click below to jump in and start making a difference! 🐱❤️',
                                    parse_mode: 'HTML',
                                    reply_markup: {
                                        inline_keyboard: [
                                            [
                                                { text: "⛱️ Join our Group", url: "https://t.me/easyadm_cats_community" },
                                                { text: "📢 Join our Channel", url: "https://t.me/easyadm_cats_channel" }
                                            ],
                                            [
                                                { text: "Report an Issue", url: "https://t.me/easyadm_support_bot" },
                                                { text: "Social Media", url: "https://easyadm.com/socials" }
                                            ],
                                            [
                                                { text: "💝 Support Us (Donate)", callback_data: "/2nd_engagement" }
                                            ]
                                        ]
                                    }
                                }
                            }
                        ]),
                        // es
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: '🐈 ¡Bienvenido al Movimiento Guardián Felino! 🐾\n\n'
                                        + 'Esto es más que una comunidad; es una red global de amantes de los gatos dedicados que trabajan juntos para salvar vidas.\n\n'
                                        + '**Cómo Colaborar y Conectar:**\n'
                                        + '1. 🗣️ **Únete a nuestro Grupo** para discutir el cuidado de los gatos, compartir historias de rescate y encontrar oportunidades de colaboración local.\n'
                                        + '2. 📢 **Únete a nuestro Canal** para recibir actualizaciones oficiales, historias de éxito e informes de impacto de las donaciones.\n'
                                        + '3. 🤝 **Voluntariado:** ¡Pregunta en el grupo cómo puedes ayudar con el acogimiento temporal, el transporte o la recaudación de fondos!\n\n'
                                        + '¡Haz clic abajo para unirte y comenzar a marcar la diferencia! 🐱❤️',
                                    parse_mode: 'HTML',
                                    reply_markup: {
                                        inline_keyboard: [
                                            [
                                                { text: "⛱️ Únete a nuestro Grupo", url: "https://t.me/easyadm_cats_community" },
                                                { text: "📢 Únete a nuestro Canal", url: "https://t.me/easyadm_cats_channel" }
                                            ],
                                            [
                                                { text: "Reportar un Problema", url: "https://t.me/easyadm_support_bot" },
                                                { text: "Redes Sociales", url: "https://easyadm.com/socials" }
                                            ],
                                            [
                                                { text: "💝 Apóyanos (Donar)", callback_data: "/2nd_engagement" }
                                            ]
                                        ]
                                    }
                                }
                            }
                        ]),
                        // fr
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: '🐈 Bienvenue dans le Mouvement des Gardiens de Chats ! 🐾\n\n'
                                        + 'C\'est plus qu\'une communauté; c\'est un réseau mondial d\'amoureux des chats dévoués qui travaillent ensemble pour sauver des vies.\n\n'
                                        + '**Comment Collaborer et Se Connecter :**\n'
                                        + '1. 🗣️ **Rejoignez notre Groupe** pour discuter des soins aux chats, partager des histoires de sauvetage et trouver des opportunités de collaboration locale.\n'
                                        + '2. 📢 **Rejoignez notre Chaîne** pour des mises à jour officielles, des histoires de succès et des rapports d\'impact des dons.\n'
                                        + '3. 🤝 **Bénévolat :** Demandez dans le groupe comment vous pouvez aider avec l\'accueil temporaire, le transport ou la collecte de fonds !\n\n'
                                        + 'Cliquez ci-dessous pour vous joindre à nous et commencer à faire la différence ! 🐱❤️',
                                    parse_mode: 'HTML',
                                    reply_markup: {
                                        inline_keyboard: [
                                            [
                                                { text: "⛱️ Rejoindre notre Groupe", url: "https://t.me/easyadm_cats_community" },
                                                { text: "📢 Rejoindre notre Chaîne", url: "https://t.me/easyadm_cats_channel" }
                                            ],
                                            [
                                                { text: "Signaler un Problème", url: "https://t.me/easyadm_support_bot" },
                                                { text: "Médias Sociaux", url: "https://easyadm.com/socials" }
                                            ],
                                            [
                                                { text: "💝 Soutenez-nous (Donner)", callback_data: "/2nd_engagement" }
                                            ]
                                        ]
                                    }
                                }
                            }
                        ]),
                        // ar
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: '🐈 مرحبًا بك في حركة حراس القطط! 🐾\n\n'
                                        + 'هذا أكثر من مجرد مجتمع؛ إنها شبكة عالمية من محبي القطط المتفانين يعملون معًا لإنقاذ الأرواح.\n\n'
                                        + '**كيف تتعاون وتتواصل:**\n'
                                        + '1. 🗣️ **انضم إلى مجموعتنا** لمناقشة رعاية القطط، ومشاركة قصص الإنقاذ، والعثور على فرص تعاون محلية.\n'
                                        + '2. 📢 **انضم إلى قناتنا** للحصول على التحديثات الرسمية، قصص النجاح، وتقارير تأثير التبرعات.\n'
                                        + '3. 🤝 **تطوع:** اسأل في المجموعة كيف يمكنك المساعدة في الاحتضان المؤقت، النقل، أو جمع التبرعات!\n\n'
                                        + 'انقر أدناه للانضمام والبدء في إحداث فرق! 🐱❤️',
                                    parse_mode: 'HTML',
                                    reply_markup: {
                                        inline_keyboard: [
                                            [
                                                { text: "⛱️ انضم إلى مجموعتنا", url: "https://t.me/easyadm_cats_community" },
                                                { text: "📢 انضم إلى قناتنا", url: "https://t.me/easyadm_cats_channel" }
                                            ],
                                            [
                                                { text: "الإبلاغ عن مشكلة", url: "https://t.me/easyadm_support_bot" },
                                                { text: "وسائل التواصل الاجتماعي", url: "https://easyadm.com/socials" }
                                            ],
                                            [
                                                { text: "💝 ادعمنا (تبرع)", callback_data: "/2nd_engagement" }
                                            ]
                                        ]
                                    }
                                }
                            }
                        ]),
                        // de
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: '🐈 Willkommen bei der Katzenwächter-Bewegung! 🐾\n\n'
                                        + 'Dies ist mehr als eine Gemeinschaft; es ist ein globales Netzwerk engagierter Katzenliebhaber, die zusammenarbeiten, um Leben zu retten.\n\n'
                                        + '**Wie Sie Zusammenarbeiten & Sich Verbinden:**\n'
                                        + '1. 🗣️ **Treten Sie unserer Gruppe bei**, um über Katzenpflege zu diskutieren, Rettungsgeschichten zu teilen und lokale Kooperationsmöglichkeiten zu finden.\n'
                                        + '2. 📢 **Abonnieren Sie unseren Kanal** für offizielle Updates, Erfolgsgeschichten und Berichte über die Wirkung von Spenden.\n'
                                        + '3. 🤝 **Ehrenamtliche Hilfe:** Fragen Sie in der Gruppe, wie Sie bei der Pflege, dem Transport oder der Spendensammlung helfen können!\n\n'
                                        + 'Klicken Sie unten, um einzusteigen und einen Unterschied zu machen! 🐱❤️',
                                    parse_mode: 'HTML',
                                    reply_markup: {
                                        inline_keyboard: [
                                            [
                                                { text: "⛱️ Treten Sie unserer Gruppe bei", url: "https://t.me/easyadm_cats_community" },
                                                { text: "📢 Abonnieren Sie unseren Kanal", url: "https://t.me/easyadm_cats_channel" }
                                            ],
                                            [
                                                { text: "Ein Problem melden", url: "https://t.me/easyadm_support_bot" },
                                                { text: "Soziale Medien", url: "https://easyadm.com/socials" }
                                            ],
                                            [
                                                { text: "💝 Unterstützen Sie uns (Spenden)", callback_data: "/2nd_engagement" }
                                            ]
                                        ]
                                    }
                                }
                            }
                        ]),
                        // it
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: '🐈 Benvenuti nel Movimento dei Guardiani dei Gatti! 🐾\n\n'
                                        + 'Questa è più di una comunità; è una rete globale di amanti dei gatti dedicati che lavorano insieme per salvare vite.\n\n'
                                        + '**Come Collaborare e Connettersi:**\n'
                                        + '1. 🗣️ **Unisciti al nostro Gruppo** per discutere di cura dei gatti, condividere storie di salvataggio e trovare opportunità di collaborazione locale.\n'
                                        + '2. 📢 **Unisciti al nostro Canale** per aggiornamenti ufficiali, storie di successo e rapporti sull\'impatto delle donazioni.\n'
                                        + '3. 🤝 **Volontariato:** Chiedi nel gruppo come puoi aiutare con l\'affido temporaneo, il trasporto o la raccolta fondi!\n\n'
                                        + 'Clicca qui sotto per unirti e iniziare a fare la differenza! 🐱❤️',
                                    parse_mode: 'HTML',
                                    reply_markup: {
                                        inline_keyboard: [
                                            [
                                                { text: "⛱️ Unisciti al nostro Gruppo", url: "https://t.me/easyadm_cats_community" },
                                                { text: "📢 Unisciti al nostro Canale", url: "https://t.me/easyadm_cats_channel" }
                                            ],
                                            [
                                                { text: "Segnala un Problema", url: "https://t.me/easyadm_support_bot" },
                                                { text: "Social Media", url: "https://easyadm.com/socials" }
                                            ],
                                            [
                                                { text: "💝 Sostienici (Dona)", callback_data: "/2nd_engagement" }
                                            ]
                                        ]
                                    }
                                }
                            }
                        ]),
                        // pt
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: '🐈 Bem-vindo ao Movimento Guardião de Gatos! 🐾\n\n'
                                        + 'Isto é mais do que uma comunidade; é uma rede global de amantes de gatos dedicados que trabalham juntos para salvar vidas.\n\n'
                                        + '**Como Colaborar e Conectar:**\n'
                                        + '1. 🗣️ **Junte-se ao nosso Grupo** para discutir cuidados com gatos, compartilhar histórias de resgate e encontrar oportunidades de colaboração local.\n'
                                        + '2. 📢 **Junte-se ao nosso Canal** para atualizações oficiais, histórias de sucesso e relatórios de impacto de doações.\n'
                                        + '3. 🤝 **Voluntariado:** Pergunte no grupo como você pode ajudar com acolhimento temporário, transporte ou angariação de fundos!\n\n'
                                        + 'Clique abaixo para entrar e começar a fazer a diferença! 🐱❤️',
                                    parse_mode: 'HTML',
                                    reply_markup: {
                                        inline_keyboard: [
                                            [
                                                { text: "⛱️ Junte-se ao nosso Grupo", url: "https://t.me/easyadm_cats_community" },
                                                { text: "📢 Junte-se ao nosso Canal", url: "https://t.me/easyadm_cats_channel" }
                                            ],
                                            [
                                                { text: "Reportar um Problema", url: "https://t.me/easyadm_support_bot" },
                                                { text: "Redes Sociais", url: "https://easyadm.com/socials" }
                                            ],
                                            [
                                                { text: "💝 Apoie-nos (Doar)", callback_data: "/2nd_engagement" }
                                            ]
                                        ]
                                    }
                                }
                            }
                        ]),
                        // ru
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: '🐈 Добро пожаловать в Движение Хранителей Кошек! 🐾\n\n'
                                        + 'Это больше, чем просто сообщество; это глобальная сеть преданных любителей кошек, работающих вместе, чтобы спасать жизни.\n\n'
                                        + '**Как сотрудничать и подключаться:**\n'
                                        + '1. 🗣️ **Присоединяйтесь к нашей Группе**, чтобы обсуждать уход за кошками, делиться историями спасения и находить возможности для местного сотрудничества.\n'
                                        + '2. 📢 **Присоединяйтесь к нашему Каналу** для получения официальных обновлений, историй успеха и отчетов о влиянии пожертвований.\n'
                                        + '3. 🤝 **Волонтерство:** Спросите в группе, как вы можете помочь с временным приютом, транспортировкой или сбором средств!\n\n'
                                        + 'Нажмите ниже, чтобы присоединиться и начать менять ситуацию к лучшему! 🐱❤️',
                                    parse_mode: 'HTML',
                                    reply_markup: {
                                        inline_keyboard: [
                                            [
                                                { text: "⛱️ Присоединиться к нашей Группе", url: "https://t.me/easyadm_cats_community" },
                                                { text: "📢 Присоединиться к нашему Каналу", url: "https://t.me/easyadm_cats_channel" }
                                            ],
                                            [
                                                { text: "Сообщить о проблеме", url: "https://t.me/easyadm_support_bot" },
                                                { text: "Социальные сети", url: "https://easyadm.com/socials" }
                                            ],
                                            [
                                                { text: "💝 Поддержите нас (Пожертвовать)", callback_data: "/2nd_engagement" }
                                            ]
                                        ]
                                    }
                                }
                            }
                        ]),
                        // zh
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: '🐈 欢迎加入猫咪守护者行动！🐾\n\n'
                                        + '这不仅仅是一个社区；它是一个由热心的猫咪爱好者组成的全球网络，共同努力拯救生命。\n\n'
                                        + '**如何合作和联系：**\n'
                                        + '1. 🗣️ **加入我们的群组**，讨论猫咪护理，分享救援故事，并寻找本地合作机会。\n'
                                        + '2. 📢 **加入我们的频道**，获取官方更新、成功案例和捐款影响报告。\n'
                                        + '3. 🤝 **志愿服务：** 在群组中询问如何帮助寄养、运输或筹款！\n\n'
                                        + '点击下方加入我们，开始做出改变！ 🐱❤️',
                                    parse_mode: 'HTML',
                                    reply_markup: {
                                        inline_keyboard: [
                                            [
                                                { text: "⛱️ 加入我们的群组", url: "https://t.me/easyadm_cats_community" },
                                                { text: "📢 加入我们的频道", url: "https://t.me/easyadm_cats_channel" }
                                            ],
                                            [
                                                { text: "报告问题", url: "https://t.me/easyadm_support_bot" },
                                                { text: "社交媒体", url: "https://easyadm.com/socials" }
                                            ],
                                            [
                                                { text: "💝 支持我们 (捐款)", callback_data: "/2nd_engagement" }
                                            ]
                                        ]
                                    }
                                }
                            }
                        ]),
                        // ja
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: '🐈 猫の守護者運動へようこそ！🐾\n\n'
                                        + 'これは単なるコミュニティではありません。命を救うために協力する献身的な猫愛好家のグローバルネットワークです。\n\n'
                                        + '**協力と接続の方法：**\n'
                                        + '1. 🗣️ **私たちのグループに参加**して、猫の世話について話し合ったり、救助の話を共有したり、地元の協力の機会を見つけたりしましょう。\n'
                                        + '2. 📢 **私たちのチャンネルに参加**して、公式の最新情報、成功事例、寄付の影響レポートを入手してください。\n'
                                        + '3. 🤝 **ボランティア：** 一時預かり、輸送、資金調達でどのように支援できるかグループで尋ねてください！\n\n'
                                        + '下のボタンをクリックして参加し、変化をもたらし始めましょう！ 🐱❤️',
                                    parse_mode: 'HTML',
                                    reply_markup: {
                                        inline_keyboard: [
                                            [
                                                { text: "⛱️ グループに参加", url: "https://t.me/easyadm_cats_community" },
                                                { text: "📢 チャンネルに参加", url: "https://t.me/easyadm_cats_channel" }
                                            ],
                                            [
                                                { text: "問題を報告", url: "https://t.me/easyadm_support_bot" },
                                                { text: "ソーシャルメディア", url: "https://easyadm.com/socials" }
                                            ],
                                            [
                                                { text: "💝 私たちを支援 (寄付)", callback_data: "/2nd_engagement" }
                                            ]
                                        ]
                                    }
                                }
                            }
                        ]),
                        // ko
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: '🐈 고양이 수호자 운동에 오신 것을 환영합니다! 🐾\n\n'
                                        + '이것은 단순한 커뮤니티 이상입니다. 생명을 구하기 위해 함께 노력하는 헌신적인 고양이 애호가들의 글로벌 네트워크입니다.\n\n'
                                        + '**협력하고 연결하는 방법:**\n'
                                        + '1. 🗣️ **저희 그룹에 가입**하여 고양이 돌보기에 대해 토론하고, 구조 이야기를 공유하고, 지역 협력 기회를 찾아보세요.\n'
                                        + '2. 📢 **저희 채널에 가입**하여 공식 업데이트, 성공 사례 및 기부 영향 보고서를 확인하세요.\n'
                                        + '3. 🤝 **자원 봉사:** 그룹에서 임시 보호, 운송 또는 모금 활동에 어떻게 도움을 줄 수 있는지 문의하세요!\n\n'
                                        + '아래를 클릭하여 참여하고 변화를 만들기 시작하세요! 🐱❤️',
                                    parse_mode: 'HTML',
                                    reply_markup: {
                                        inline_keyboard: [
                                            [
                                                { text: "⛱️ 저희 그룹에 가입하세요", url: "https://t.me/easyadm_cats_community" },
                                                { text: "📢 저희 채널에 가입하세요", url: "https://t.me/easyadm_cats_channel" }
                                            ],
                                            [
                                                { text: "문제 보고", url: "https://t.me/easyadm_support_bot" },
                                                { text: "소셜 미디어", url: "https://easyadm.com/socials" }
                                            ],
                                            [
                                                { text: "💝 저희를 지원하세요 (기부)", callback_data: "/2nd_engagement" }
                                            ]
                                        ]
                                    }
                                }
                            }
                        ]),
                        // he
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: '🐈 ברוכים הבאים לתנועת שומרי החתולים! 🐾\n\n'
                                        + 'זה יותר מקהילה; זו רשת גלובלית של אוהבי חתולים מסורים הפועלים יחד להציל חיים.\n\n'
                                        + '**כיצד לשתף פעולה ולהתחבר:**\n'
                                        + '1. 🗣️ **הצטרף לקבוצה שלנו** כדי לדון בטיפול בחתולים, לשתף סיפורי הצלה ולמצוא הזדמנויות לשיתוף פעולה מקומי.\n'
                                        + '2. 📢 **הצטרף לערוץ שלנו** לקבלת עדכונים רשמיים, סיפורי הצלחה ודוחות השפעה של תרומות.\n'
                                        + '3. 🤝 **התנדבות:** שאל בקבוצה כיצד תוכל לעזור עם אומנה, הובלה או גיוס כספים!\n\n'
                                        + 'לחץ למטה כדי להצטרף ולהתחיל לעשות שינוי! 🐱❤️',
                                    parse_mode: 'HTML',
                                    reply_markup: {
                                        inline_keyboard: [
                                            [
                                                { text: "⛱️ הצטרף לקבוצה שלנו", url: "https://t.me/easyadm_cats_community" },
                                                { text: "📢 הצטרף לערוץ שלנו", url: "https://t.me/easyadm_cats_channel" }
                                            ],
                                            [
                                                { text: "דווח על בעיה", url: "https://t.me/easyadm_support_bot" },
                                                { text: "מדיה חברתית", url: "https://easyadm.com/socials" }
                                            ],
                                            [
                                                { text: "💝 תמכו בנו (תרומה)", callback_data: "/2nd_engagement" }
                                            ]
                                        ]
                                    }
                                }
                            }
                        ])
                    ],
                    ['/send_invoice_donation_sample',
                        // default (en)
                        JSON.stringify([
                            {   // send donation invoice sample
                                method: 'sendInvoice',
                                payload: {
                                    // Product name, 1-32 characters
                                    title: 'Donate to Support Stray Cats',
                                    // Product description, 1-255 characters
                                    description: '🙏 Thank you for considering a Donation! 🙏\n\n'
                                        + 'Your generosity will directly impact the lives of stray and abandoned cats, providing them with the care and support they need to thrive.\n\n',
                                    payload: 'bronze_supporter', // Custom payload for your reference
                                    currency: 'XTR',
                                    prices: JSON.stringify([
                                        { label: 'Donate 10000 XTR', amount: 10000 }
                                    ]),
                                    photo_url: EMD.LOGO_PNG_URL,
                                    photo_width: 240,
                                    protect_content: false,
                                    // Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. 
                                    // The relevant Stars will be withdrawn from the bot's balance.
                                    allow_paid_broadcast: false
                                }
                            }
                        ])
                    ],
                    ['/create_invoice_link',
                        // default (en)
                        JSON.stringify([
                            {   // create invoice link for 30 day bronze cat care subscription
                                method: 'createInvoiceLink',
                                payload: {
                                    // Product name, 1-32 characters
                                    title: '30-Day Cat Care Subscription 😻',
                                    // Product description, 1-255 characters
                                    description: 'Become a monthly \'Cat Guardian\' and ensure a stray cat receives 30 days of continuous, life-saving support! Your recurring XTR subscription covers daily meals, vet check-ups, and a warm place to rest. Join the cause! 🐾',
                                    currency: 'XTR',
                                    // Bot-defined invoice payload, 1-128 bytes. This will not be displayed to the user, use it for your internal processes.
                                    payload: '30day_bronze_cat_care_subscription',
                                    prices: JSON.stringify([
                                        { label: 'Subscribe to Care (1000 XTR/Month)', amount: 1000 }
                                    ]),
                                    photo_url: EMD.LOGO_PNG_URL,
                                    photo_width: 240,
                                    protect_content: false,
                                    allow_paid_broadcast: false,
                                    // The number of seconds the subscription will be active for before the next payment. 
                                    // The currency must be set to “XTR” (Telegram Stars) if the parameter is used. Currently, it must always be 2592000 (30 days) if specified.
                                    subscription_periods: 2592000 // 30 days in seconds
                                }
                            }
                        ]),
                        // es
                        JSON.stringify([
                            {
                                method: 'createInvoiceLink',
                                payload: {
                                    title: 'Suscripción de Cuidado Felino 30 Días 😻',
                                    description: '¡Conviértete en un \'Guardián Felino\' mensual y asegura 30 días de apoyo continuo y vital a un gato callejero! Tu suscripción recurrente en XTR cubre comidas diarias, chequeos veterinarios y un lugar cálido para descansar. ¡Únete a la causa! 🐾',
                                    currency: 'XTR',
                                    payload: '30day_bronze_cat_care_subscription',
                                    prices: JSON.stringify([
                                        { label: 'Suscribirse para Cuidar (1000 XTR/Mes)', amount: 1000 }
                                    ]),
                                    photo_url: EMD.LOGO_PNG_URL,
                                    photo_width: 240,
                                    protect_content: false,
                                    allow_paid_broadcast: false,
                                    subscription_periods: 2592000
                                }
                            }
                        ]),
                        // fr
                        JSON.stringify([
                            {
                                method: 'createInvoiceLink',
                                payload: {
                                    title: 'Abonnement Soins Chat 30 Jours 😻',
                                    description: 'Devenez un \'Gardien de Chat\' mensuel et assurez 30 jours de soutien continu et vital à un chat errant! Votre abonnement XTR récurrent couvre les repas quotidiens, les visites vétérinaires et un endroit chaud pour se reposer. Rejoignez la cause ! 🐾',
                                    currency: 'XTR',
                                    payload: '30day_bronze_cat_care_subscription',
                                    prices: JSON.stringify([
                                        { label: 'S\'abonner aux Soins (1000 XTR/Mois)', amount: 1000 }
                                    ]),
                                    photo_url: EMD.LOGO_PNG_URL,
                                    photo_width: 240,
                                    protect_content: false,
                                    allow_paid_broadcast: false,
                                    subscription_periods: 2592000
                                }
                            }
                        ]),
                        // ar
                        JSON.stringify([
                            {
                                method: 'createInvoiceLink',
                                payload: {
                                    title: 'اشتراك رعاية القطط 30 يومًا 😻',
                                    description: 'كن \'حارس قطط\' شهريًا واضمن لقطة ضالة 30 يومًا من الدعم المستمر والمنقذ للحياة! يغطي اشتراك XTR المتكرر وجبات يومية وفحوصات بيطرية ومكانًا دافئًا للراحة. انضم للقضية! 🐾',
                                    currency: 'XTR',
                                    payload: '30day_bronze_cat_care_subscription',
                                    prices: JSON.stringify([
                                        { label: 'الاشتراك في الرعاية (1000 XTR/شهر)', amount: 1000 }
                                    ]),
                                    photo_url: EMD.LOGO_PNG_URL,
                                    photo_width: 240,
                                    protect_content: false,
                                    allow_paid_broadcast: false,
                                    subscription_periods: 2592000
                                }
                            }
                        ]),
                        // de
                        JSON.stringify([
                            {
                                method: 'createInvoiceLink',
                                payload: {
                                    title: '30-Tage Katzenpflege-Abo 😻',
                                    description: 'Werden Sie ein monatlicher \'Katzenwächter\' und sichern Sie einer streunenden Katze 30 Tage lang kontinuierliche, lebensrettende Unterstützung! Ihr wiederkehrendes XTR-Abo deckt tägliche Mahlzeiten, Tierarztchecks und einen warmen Ruheplatz ab. Machen Sie mit! 🐾',
                                    currency: 'XTR',
                                    payload: '30day_bronze_cat_care_subscription',
                                    prices: JSON.stringify([
                                        { label: 'Abonnieren Sie die Pflege (1000 XTR/Monat)', amount: 1000 }
                                    ]),
                                    photo_url: EMD.LOGO_PNG_URL,
                                    photo_width: 240,
                                    protect_content: false,
                                    allow_paid_broadcast: false,
                                    subscription_periods: 2592000
                                }
                            }
                        ]),
                        // it
                        JSON.stringify([
                            {
                                method: 'createInvoiceLink',
                                payload: {
                                    title: 'Abbonamento Cura Gatto 30 Giorni 😻',
                                    description: 'Diventa un \'Guardiano dei Gatti\' mensile e assicurati 30 giorni di supporto continuo e vitale per un gatto randagio! Il tuo abbonamento XTR ricorrente copre pasti giornalieri, controlli veterinari e un posto caldo dove riposare. Unisciti alla causa! 🐾',
                                    currency: 'XTR',
                                    payload: '30day_bronze_cat_care_subscription',
                                    prices: JSON.stringify([
                                        { label: 'Abbonati alla Cura (1000 XTR/Mese)', amount: 1000 }
                                    ]),
                                    photo_url: EMD.LOGO_PNG_URL,
                                    photo_width: 240,
                                    protect_content: false,
                                    allow_paid_broadcast: false,
                                    subscription_periods: 2592000
                                }
                            }
                        ]),
                        // pt
                        JSON.stringify([
                            {
                                method: 'createInvoiceLink',
                                payload: {
                                    title: 'Assinatura Cuidado Gato 30 Dias 😻',
                                    description: 'Torne-se um \'Guardião de Gatos\' mensal e garanta 30 dias de apoio contínuo e vital a um gato de rua! Sua assinatura XTR recorrente cobre refeições diárias, check-ups veterinários e um lugar quente para descansar. Junte-se à causa! 🐾',
                                    currency: 'XTR',
                                    payload: '30day_bronze_cat_care_subscription',
                                    prices: JSON.stringify([
                                        { label: 'Assinar para Cuidar (1000 XTR/Mês)', amount: 1000 }
                                    ]),
                                    photo_url: EMD.LOGO_PNG_URL,
                                    photo_width: 240,
                                    protect_content: false,
                                    allow_paid_broadcast: false,
                                    subscription_periods: 2592000
                                }
                            }
                        ]),
                        // ru
                        JSON.stringify([
                            {
                                method: 'createInvoiceLink',
                                payload: {
                                    title: 'Подписка на 30 дней ухода за кошкой 😻',
                                    description: 'Станьте ежемесячным «Хранителем кошек» и обеспечьте бездомной кошке 30 дней непрерывной, жизненно важной поддержки! Ваша регулярная подписка XTR покрывает ежедневное питание, ветеринарные осмотры и теплое место для отдыха. Присоединяйтесь к делу! 🐾',
                                    currency: 'XTR',
                                    payload: '30day_bronze_cat_care_subscription',
                                    prices: JSON.stringify([
                                        { label: 'Подписаться на Уход (1000 XTR/Месяц)', amount: 1000 }
                                    ]),
                                    photo_url: EMD.LOGO_PNG_URL,
                                    photo_width: 240,
                                    protect_content: false,
                                    allow_paid_broadcast: false,
                                    subscription_periods: 2592000
                                }
                            }
                        ]),
                        // zh
                        JSON.stringify([
                            {
                                method: 'createInvoiceLink',
                                payload: {
                                    title: '30天猫咪护理订阅 😻',
                                    description: '成为每月的“猫咪守护者”，确保一只流浪猫获得30天持续、救命的支持！您的定期 XTR 订阅涵盖每日餐食、兽医检查和温暖的休息场所。加入我们吧！🐾',
                                    currency: 'XTR',
                                    payload: '30day_bronze_cat_care_subscription',
                                    prices: JSON.stringify([
                                        { label: '订阅护理 (1000 XTR/月)', amount: 1000 }
                                    ]),
                                    photo_url: EMD.LOGO_PNG_URL,
                                    photo_width: 240,
                                    protect_content: false,
                                    allow_paid_broadcast: false,
                                    subscription_periods: 2592000
                                }
                            }
                        ]),
                        // ja
                        JSON.stringify([
                            {
                                method: 'createInvoiceLink',
                                payload: {
                                    title: '30日間の猫ケア定期購読 😻',
                                    description: '毎月の「猫の守護者」になり、野良猫に30日間の継続的な救命支援を保証してください！定期的なXTR購読は、毎日の食事、獣医の診察、暖かい休息場所をカバーします。この活動に参加しましょう！🐾',
                                    currency: 'XTR',
                                    payload: '30day_bronze_cat_care_subscription',
                                    prices: JSON.stringify([
                                        { label: 'ケアを購読 (1000 XTR/月)', amount: 1000 }
                                    ]),
                                    photo_url: EMD.LOGO_PNG_URL,
                                    photo_width: 240,
                                    protect_content: false,
                                    allow_paid_broadcast: false,
                                    subscription_periods: 2592000
                                }
                            }
                        ]),
                        // ko
                        JSON.stringify([
                            {
                                method: 'createInvoiceLink',
                                payload: {
                                    title: '30일 고양이 관리 구독 😻',
                                    description: '매월 \'고양이 수호자\'가 되어 길고양이에게 30일 동안 지속적이고 생명을 구하는 지원을 보장하세요! 귀하의 정기적인 XTR 구독은 매일 식사, 수의사 검진, 따뜻한 쉴 곳을 제공합니다. 캠페인에 참여하세요! 🐾',
                                    currency: 'XTR',
                                    payload: '30day_bronze_cat_care_subscription',
                                    prices: JSON.stringify([
                                        { label: '관리를 구독 (1000 XTR/월)', amount: 1000 }
                                    ]),
                                    photo_url: EMD.LOGO_PNG_URL,
                                    photo_width: 240,
                                    protect_content: false,
                                    allow_paid_broadcast: false,
                                    subscription_periods: 2592000
                                }
                            }
                        ]),
                        // he
                        JSON.stringify([
                            {
                                method: 'createInvoiceLink',
                                payload: {
                                    title: 'מנוי לטיפול בחתול 30 יום 😻',
                                    description: 'הפוך ל\'שומר חתולים\' חודשי והבטח לחתול רחוב 30 ימי תמיכה מתמשכת ומצילת חיים! מנוי XTR החוזר שלך מכסה ארוחות יומיות, בדיקות וטרינר ומקום חם למנוחה. הצטרף למטרה! 🐾',
                                    currency: 'XTR',
                                    payload: '30day_bronze_cat_care_subscription',
                                    prices: JSON.stringify([
                                        { label: 'הירשם לטיפול (1000 XTR/חודש)', amount: 1000 }
                                    ]),
                                    photo_url: EMD.LOGO_PNG_URL,
                                    photo_width: 240,
                                    protect_content: false,
                                    allow_paid_broadcast: false,
                                    subscription_periods: 2592000
                                }
                            }
                        ])
                    ]
                ]
        }
    }
}

EMD.ApiFeaturesAutomation = {
    entityName: 'ApiFeatures',
    sheet: (data = {}) => {
        return {
            name: EMD.Automation.sheet(data).name,
            columns: EMD.Automation.sheet(data).columns,
            sample_data:
                [
                    ['---- 🤖 API FEATURES SAMPLE DATA ----'],
                    ['/api_features',
                        // default (en)
                        JSON.stringify([
                            { "next": "#remove_keyboard" },
                            { "next": "#send_api_features_message" },
                            { "next": "#append_api_features_keyboard" }
                        ])
                    ],
                    ['#send_api_features_message',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendPhoto',
                            payload: {
                                caption: 'Welcome to the API Features Showcase! \n\n'
                                    + 'Discover how to integrate and utilize various API features to enhance your Telegram Bot experience.',
                                photo: EMD.MATH_IMG_URL,
                                protect_content: true,
                                has_spoiler: false,
                                parse_mode: 'HTML',
                                disable_notification: false
                            }
                        }])
                    ],
                    ['#append_api_features_keyboard',
                        // default (en)
                        JSON.stringify([{
                            method: 'editMessageReplyMarkup',
                            payload: {
                                reply_markup: {
                                    inline_keyboard: [
                                        [
                                            { text: "💬 Messages", callback_data: "/sendMessage" },
                                            { text: "🖼️ Photos", callback_data: "/sendPhoto" },
                                            { text: "🖼️ Media Groups", callback_data: "/sendMediaGroup" }
                                        ],
                                        [
                                            { text: "🎛️ Reply Markup (Keyboard, Keypad)", callback_data: "/sendReplyMarkup" }
                                        ],
                                        // Open youTube as web app
                                        [
                                            {
                                                text: "▶️ EasyADM YouTube Channel",
                                                web_app: {
                                                    url: "https://youtube.com/@easyadm6040"
                                                }
                                            }
                                        ],
                                        [
                                            {
                                                text: "🌐 EasyADM Website",
                                                web_app: {
                                                    url: "https://easyadm.com"
                                                }
                                            }
                                        ],
                                        [
                                            { text: "🏠 Start", callback_data: "/start" }
                                        ]
                                    ]
                                }
                            }
                        }])
                    ],
                    ['/sendMessage',
                        // default (en)
                        JSON.stringify([
                            { "next": "#remove_keyboard" },
                            { "next": "#send_sample_message" },
                            { "next": "#append_api_features_keyboard" },
                        ])
                    ],
                    ['/sendPhoto',
                        // default (en)
                        JSON.stringify([
                            { "next": "#remove_keyboard" },
                            { "next": "#send_sample_photo" },
                            { "next": "#append_api_features_keyboard" },
                        ])
                    ],
                    ['/sendMediaGroup',
                        // default (en)
                        JSON.stringify([
                            { "next": "#remove_keyboard" },
                            { "next": "#send_sample_media_group" },
                            { "next": "#send_end_of_session_message" },
                            { "next": "#append_api_features_keyboard" },
                        ])
                    ],
                    ['/sendReplyMarkup',
                        // default (en)
                        JSON.stringify([
                            { "next": "#remove_keyboard" },
                            { "next": "#send_sample_reply_markup" },
                            { "next": "#send_end_of_session_message" },
                            { "next": "#append_api_features_keyboard" }
                        ])
                    ],
                    ['#send_sample_message',
                        // default (en)
                        JSON.stringify([
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: 'This is a sample message sent using the Send Message API feature.',
                                    parse_mode: 'HTML'
                                }
                            },
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: 'This is another sample message to demonstrate the Send Message API feature.',
                                    parse_mode: 'HTML'
                                }
                            },
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: 'I can customize the content and format of any the messages as needed.',
                                    parse_mode: 'HTML'
                                }
                            },
                            {
                                delay_ms: 3000,
                                method: 'editMessageText',
                                payload: {
                                    text: 'I can customize the content and format of any the messages as needed.\n\n'
                                        + 'This message has been edited using the Edit Message Text API feature.',
                                    parse_mode: 'HTML'
                                }
                            },
                            {
                                method: 'sendMessage',
                                payload: {
                                    text: 'I can use delay between actions to control the flow of messages.\n\n',
                                    parse_mode: 'HTML'
                                }
                            },
                            {
                                delay_ms: 3000,
                                method: 'editMessageText',
                                payload: {
                                    text: 'I can use delay between actions to control the flow of messages.\n\n'
                                        + 'This message has been edited after a delay (3000 ms) to demonstrate timing control.',
                                    parse_mode: 'HTML'
                                }
                            },
                            {
                                delay_ms: 3000,
                                method: 'editMessageText',
                                payload: {
                                    text: 'I can use delay between actions to control the flow of messages.\n\n'
                                        + 'This message has been edited after a delay (3000 ms) to demonstrate timing control. \n\n'
                                        + 'This is the final edited message in this sample sequence.\n\n'
                                        + 'Thank you for exploring the Send Message API feature!',
                                    parse_mode: 'HTML'
                                }
                            },
                            {
                                delay_ms: 1000,
                                method: 'sendMessage',
                                payload: {
                                    text: 'This concludes the sample messages demonstrating the Send Message API feature.',
                                    parse_mode: 'HTML'
                                }
                            },
                            {
                                delay_ms: 1000,
                                method: 'editMessageText',
                                payload: {
                                    text: 'This concludes the sample messages demonstrating the Send Message API feature. \n\n'
                                        + '1. I can send multiple messages in sequence.\n',
                                    parse_mode: 'HTML'
                                }
                            },
                            {
                                delay_ms: 1000,
                                method: 'editMessageText',
                                payload: {
                                    text: 'This concludes the sample messages demonstrating the Send Message API feature. \n\n'
                                        + '1. I can send multiple messages in sequence.\n'
                                        + '2. I can edit messages after sending them.\n',
                                    parse_mode: 'HTML'
                                }
                            },
                            {
                                delay_ms: 1000,
                                method: 'editMessageText',
                                payload: {
                                    text: 'This concludes the sample messages demonstrating the Send Message API feature. \n\n'
                                        + '1. I can send multiple messages in sequence.\n'
                                        + '2. I can edit messages after sending them.\n'
                                        + '3. I can introduce delays between actions.\n',
                                    parse_mode: 'HTML'
                                }
                            },
                            {
                                delay_ms: 1000,
                                method: 'editMessageText',
                                payload: {
                                    text: 'This concludes the sample messages demonstrating the Send Message API feature. \n\n'
                                        + '1. I can send multiple messages in sequence.\n'
                                        + '2. I can edit messages after sending them.\n'
                                        + '3. I can introduce delays between actions.\n'
                                        + 'Thank you for exploring this feature with me!',
                                    parse_mode: 'HTML'
                                }
                            }
                        ])
                    ],
                    ['#send_sample_photo',
                        // default (en)
                        JSON.stringify([
                            {   // sendPhoto
                                method: 'sendPhoto',
                                payload: {
                                    caption: 'Welcome to the sample photo demonstration! \n\n'
                                        + 'This is a sample photo sent using the Send Photo API feature. \n\n'
                                        + 'In about 3 seconds, I will edit the caption to demonstrate the Edit Message Caption API feature.\n\n',
                                    photo: EMD.PEACH_IMG_URL,
                                    parse_mode: 'HTML',
                                    has_spoiler: false,
                                    protect_content: true,
                                    disable_notification: true
                                }
                            },
                            {  // editMessageMedia after delay
                                delay_ms: 3000,
                                method: 'editMessageMedia',
                                payload: {
                                    media: {
                                        type: "photo",
                                        media: EMD.PAY_ATTENTION_IMG_URL,
                                        caption: 'This is a sample photo sent using the Send Photo API feature. \n\n'
                                            + 'The caption has been edited after a 3 second delay to demonstrate the Edit Message Caption API feature.\n\n'
                                            + 'Now, In about 3 seconds, I will edit the photo to demonstrate the Edit Message Media API feature.',
                                        parse_mode: 'HTML',
                                        has_spoiler: false,
                                        protect_content: true,
                                        disable_notification: true
                                    }
                                }
                            },
                            {   // editMessageMedia after delay
                                delay_ms: 3000,
                                method: 'editMessageMedia',
                                payload: {
                                    media: {
                                        type: 'photo',
                                        media: EMD.YOU_GOT_IT_IMG_URL,
                                        caption: 'This is a sample photo sent using the Send Photo API feature. \n\n'
                                            + 'The caption has been edited after a 3 second delay to demonstrate the Edit Message Caption API feature.\n\n'
                                            + 'The photo has also been edited after a 3 second delay to demonstrate the Edit Message Media API feature.',
                                        parse_mode: 'HTML',
                                        has_spoiler: true,
                                        protect_content: true,
                                        disable_notification: true
                                    }
                                }
                            }
                        ])
                    ],
                    ['#send_sample_media_group',
                        // default (en)
                        JSON.stringify([{
                            method: 'sendMediaGroup',
                            payload: {
                                media: [
                                    {
                                        type: 'photo',
                                        media: EMD.I_AM_THINKING_IMG_URL,
                                        caption: 'I Am Thinking Photo 1',
                                        parse_mode: 'HTML',
                                        has_spoiler: false,
                                        show_caption_above_media: false
                                    },
                                    {
                                        type: 'photo',
                                        media: EMD.HAVE_A_NICE_DAY_IMG_URL,
                                        caption: 'Have a Nice Day Photo 2',
                                        parse_mode: 'HTML',
                                        has_spoiler: false,
                                        show_caption_above_media: false
                                    },
                                    {
                                        type: 'photo',
                                        media: EMD.BIG_TIME_IMG_URL,
                                        caption: 'Big Time Photo 3',
                                        parse_mode: 'HTML',
                                        has_spoiler: false,
                                        show_caption_above_media: false
                                    },
                                    {
                                        type: 'photo',
                                        media: EMD.YOU_GOT_IT_IMG_URL,
                                        caption: 'You Got It Photo 4',
                                        parse_mode: 'HTML',
                                        has_spoiler: false,
                                        show_caption_above_media: false
                                    },
                                    {
                                        type: 'photo',
                                        media: EMD.BLINK_IMG_URL,
                                        caption: 'Blink Photo 5',
                                        parse_mode: 'HTML',
                                        has_spoiler: false,
                                        show_caption_above_media: false
                                    },
                                    {
                                        type: 'photo',
                                        media: EMD.CHEERS_IMG_URL,
                                        caption: 'Cheers Photo 6',
                                        parse_mode: 'HTML',
                                        has_spoiler: true,
                                        show_caption_above_media: false
                                    },
                                    {
                                        type: 'photo',
                                        media: EMD.PAY_ATTENTION_IMG_URL,
                                        caption: 'Pay Attention Photo 7',
                                        parse_mode: 'HTML',
                                        has_spoiler: true,
                                        show_caption_above_media: false
                                    },
                                    {
                                        type: 'photo',
                                        media: EMD.THANK_YOU_IMG_URL,
                                        caption: 'Thank You Photo 8',
                                        parse_mode: 'HTML',
                                        has_spoiler: true,
                                        show_caption_above_media: false
                                    }
                                ],
                                protect_content: true,
                                disable_notification: true
                            }
                        }])
                    ],
                    ['#send_sample_reply_markup',
                        // default (en)
                        JSON.stringify([
                            {   // sendMessage
                                method: 'sendMessage',
                                payload: {
                                    text: 'This is a sample message with custom reply markup (keyboard). \n\n'
                                        + 'You can interact with the buttons below to see how reply markups work in Telegram Bots.\n\n'
                                        + '<blockquote expandable>About InlineKeyboardMarkup:\n\n'
                                        + 'This object represents an inline keyboard that appears right next to the message it belongs to.\n\n</blockquote>\n\n'
                                        + '1. In this example, I have added an inline keyboard with various color combination buttons.\n'
                                        + '2. You can explore different combinations by clicking the buttons below.\n',
                                    parse_mode: 'HTML',
                                    reply_markup: {
                                        inline_keyboard: [
                                            [
                                                { text: "🔴🟢🔵", callback_data: "/echo 🔴🟢🔵" }
                                            ],
                                            [
                                                { text: "🔴", callback_data: "/echo 🔴" },
                                                { text: "🟢", callback_data: "/echo 🟢" },
                                                { text: "🔵", callback_data: "/echo 🔵" }
                                            ]
                                        ]
                                    }
                                }
                            },
                            {   // sendMessage
                                delay_ms: 3000,
                                method: 'sendMessage',
                                payload: {
                                    text: 'This is another message with custom reply markup (keyboard). \n\n'
                                        + 'You can interact with the buttons below to see how reply markups work in Telegram Bots.\n\n'
                                        + '1. In this example, I have added an inline keyboard with various color combination buttons.\n'
                                        + '2. In about 3 seconds, I will send a new message to add even more keys to the keyboard below.\n',
                                    parse_mode: 'HTML',
                                    reply_markup: {
                                        inline_keyboard: [
                                            [
                                                { text: "🟥🟦", callback_data: "/echo 🟥🟦" },
                                                { text: "🟦🟩", callback_data: "/echo 🟦🟩" },
                                                { text: "🟩🟨", callback_data: "/echo 🟩🟨" },
                                            ],
                                            [
                                                { text: "🟥🟩🟦🟨", callback_data: "/echo 🟥🟩🟦🟨" },
                                                { text: "🟨🟦🟩🟥", callback_data: "/echo 🟨🟦🟩🟥" }
                                            ],
                                            [
                                                { text: "🟨🟥", callback_data: "/echo 🟨🟥" },
                                                { text: "🟥🟩", callback_data: "/echo 🟥🟩" }
                                            ],
                                            [
                                                { text: "🟦🟥🟨🟩", callback_data: "/echo 🟦🟥🟨🟩" }
                                            ],
                                            [
                                                { text: "☢️", callback_data: "/echo ☢️" },
                                                { text: "☣️", callback_data: "/echo ☣️" },
                                                { text: "⚛️", callback_data: "/echo ⚛️" },
                                                { text: "🛑", callback_data: "/echo 🛑" },
                                                { text: "🚷", callback_data: "/echo 🚷" }
                                            ]
                                        ]
                                    }
                                }
                            },
                            {   // sendMessage
                                delay_ms: 3000,
                                method: 'sendMessage',
                                payload: {
                                    text: 'This is new sample message with custom reply markup (keyboard). \n\n'
                                        + 'You can interact with the buttons below to see how reply markups work in Telegram Bots.\n\n'
                                        + '1. In this example, I have added an inline keyboard with various types of buttons.\n'
                                        + '2. You can explore different button functionalities by clicking the buttons below.\n',
                                    parse_mode: 'HTML',
                                    reply_markup: {
                                        inline_keyboard: [
                                            [
                                                { text: "Copy to clipboard", copy_text: { text: "This text has been copied to clipboard!" } }
                                            ],
                                            [

                                                { text: "Web app", web_app: { url: "https://easyadm.com" } },
                                                { text: "Url", url: "https://telegram.org" }
                                            ]
                                        ]
                                    }
                                }
                            }
                        ])
                    ]
                ]
        };
    }
}

EMD.SecurityChecksAutomation = {
    entityName: 'SecurityChecks',
    sheet: (data = {}) => {
        return {
            name: EMD.Automation.sheet(data).name,
            columns: EMD.Automation.sheet(data).columns,
            sample_data: [
                ['---- 🔐 SECURITY CHECKS SAMPLE AUTOMATION DATA BELOW ----'],
                ['/security_checks',
                    // default (en)
                    JSON.stringify([
                        { "next": "#remove_keyboard" },
                        { "next": "#send_welcome_to_security_checks_message" },
                        { "next": "#send_malware_protection_message" },
                        { "next": "#send_check_your_device_now_message" },
                        { "next": "#append_top_security_checks_keyboard" },
                        { "next": "#answer_completed" }
                    ])
                ],
                ['#send_welcome_to_security_checks_message',
                    // default (en)
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Welcome to Security Checks! \n\n'
                                + 'Here you can find recommendations to enhance the security of your device, account and data.',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // es
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: '¡Bienvenido a las Verificaciones de Seguridad! \n\n'
                                + 'Aquí puedes encontrar recomendaciones para mejorar la seguridad de tu dispositivo, cuenta y datos.',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // fr
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Bienvenue dans les Vérifications de Sécurité ! \n\n'
                                + 'Ici, vous pouvez trouver des recommandations pour améliorer la sécurité de votre appareil, compte et données.',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // ar
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'مرحبًا بك في فحوصات الأمان! \n\n'
                                + 'هنا يمكنك العثور على توصيات لتعزيز أمان جهازك وحسابك وبياناتك.',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // de
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Willkommen bei den Sicherheitsprüfungen! \n\n'
                                + 'Hier finden Sie Empfehlungen zur Verbesserung der Sicherheit Ihres Geräts, Kontos und Ihrer Daten.',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // it
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Benvenuto in Controlli di Sicurezza! \n\n'
                                + 'Qui puoi trovare raccomandazioni per migliorare la sicurezza del tuo dispositivo, account e dati.',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // pt
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Bem-vindo às Verificações de Segurança! \n\n'
                                + 'Aqui você pode encontrar recomendações para melhorar a segurança do seu dispositivo, conta e dados.',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // ru
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Добро пожаловать в Проверки безопасности! \n\n'
                                + 'Здесь вы можете найти рекомендации по повышению безопасности вашего устройства, аккаунта и данных.',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // zh
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: '欢迎使用安全检查！ \n\n'
                                + '在这里，您可以找到增强设备、帐户和数据安全性的建议。',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // ja
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'セキュリティチェックへようこそ！ \n\n'
                                + 'ここでは、デバイス、アカウント、データのセキュリティを強化するための推奨事項を見つけることができます。',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // ko
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: '보안 검사에 오신 것을 환영합니다! \n\n'
                                + '여기에서 장치, 계정 및 데이터의 보안을 강화하기 위한 권장 사항을 찾을 수 있습니다.',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // he
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'ברוכים הבאים לבדיקות אבטחה! \n\n'
                                + 'כאן תוכלו למצוא המלצות לשיפור האבטחה של המכשיר, החשבון והנתונים שלכם.',
                            parse_mode: 'HTML'
                        }
                    }])
                ],
                ['#send_malware_protection_message',
                    // default (en)
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Malware Protection: \n\n'
                                + 'Ensure your device has up-to-date antivirus software installed to protect against malware threats.',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // es
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Protección contra malware: \n\n'
                                + 'Asegúrate de que tu dispositivo tenga instalado un software antivirus actualizado para protegerte contra amenazas de malware.',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // fr
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Protection contre les logiciels malveillants : \n\n'
                                + 'Assurez-vous que votre appareil dispose d\'un logiciel antivirus à jour pour vous protéger contre les menaces de logiciels malveillants.',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // ar
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'حماية من البرامج الضارة: \n\n'
                                + 'تأكد من أن جهازك يحتوي على برنامج مضاد فيروسات محدث لحمايتك من تهديدات البرامج الضارة.',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // de
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Malware-Schutz: \n\n'
                                + 'Stellen Sie sicher, dass auf Ihrem Gerät eine aktuelle Antivirensoftware installiert ist, um sich vor Malware-Bedrohungen zu schützen.',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // it
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Protezione da malware: \n\n'
                                + 'Assicurati che il tuo dispositivo abbia un software antivirus aggiornato per proteggerti dalle minacce di malware.',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // pt
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Proteção contra malware: \n\n'
                                + 'Certifique-se de que seu dispositivo tenha um software antivírus atualizado para protegê-lo contra ameaças de malware.',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // ru
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Защита от вредоносных программ: \n\n'
                                + 'Убедитесь, что на вашем устройстве установлено обновленное антивирусное программное обеспечение для защиты от угроз вредоносных программ.',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // zh
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: '恶意软件保护： \n\n'
                                + '确保您的设备安装了最新的防病毒软件，以保护您免受恶意软件的威胁。',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // ja
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'マルウェア対策： \n\n'
                                + 'お使いのデバイスに最新のアンチウイルスソフトウェアがインストールされていることを確認して、マルウェアの脅威から保護してください。',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // ko
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: '맬웨어 보호: \n\n'
                                + '장치에 최신 안티바이러스 소프트웨어가 설치되어 있어 맬웨어 위협으로부터 보호받을 수 있도록 하십시오.',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // he
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'הגנה מפני תוכנות זדוניות: \n\n'
                                + 'ודא שהמכשיר שלך מותקן עם תוכנת אנטי-וירוס מעודכנת כדי להגן מפני איומי תוכנות זדוניות.',
                            parse_mode: 'HTML'
                        }
                    }])
                ],
                ['#send_check_your_device_now_message',
                    // default (en)
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Check Your Device Now! \n\n'
                                + 'Ensure your device is secure by following these steps:\n',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // es
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: '¡Revisa tu dispositivo ahora! \n\n'
                                + 'Asegúrate de que tu dispositivo esté seguro siguiendo estos pasos:\n',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // fr
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Vérifiez votre appareil maintenant ! \n\n'
                                + 'Assurez-vous que votre appareil est sécurisé en suivant ces étapes :\n',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // ar
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'تحقق من جهازك الآن! \n\n'
                                + 'تأكد من أن جهازك آمن باتباع هذه الخطوات:\n',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // de
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Überprüfen Sie jetzt Ihr Gerät! \n\n'
                                + 'Stellen Sie sicher, dass Ihr Gerät sicher ist, indem Sie diese Schritte befolgen:\n',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // it
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Controlla il tuo dispositivo ora! \n\n'
                                + 'Assicurati che il tuo dispositivo sia sicuro seguendo questi passaggi:\n',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // pt
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Verifique seu dispositivo agora! \n\n'
                                + 'Certifique-se de que seu dispositivo está seguro seguindo estas etapas:\n',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // ru
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Проверьте свое устройство сейчас! \n\n'
                                + 'Убедитесь, что ваше устройство защищено, выполнив следующие шаги:\n',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // zh
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: '立即检查您的设备！ \n\n'
                                + '按照以下步骤确保您的设备安全：\n',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // ja
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: '今すぐデバイスを確認してください！ \n\n'
                                + '次の手順に従って、デバイスが安全であることを確認してください：\n',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // ko
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: '지금 장치를 확인하세요! \n\n'
                                + '다음 단계를 따라 장치가 안전한지 확인하십시오:\n',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // he
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'בדוק את המכשיר שלך עכשיו! \n\n'
                                + 'ודא שהמכשיר שלך מאובטח על ידי ביצוע השלבים הבאים:\n',
                            parse_mode: 'HTML'
                        }
                    }])
                ],
                ['#append_top_security_checks_keyboard',
                    // default (en)
                    JSON.stringify([{
                        method: 'editMessageReplyMarkup',
                        payload: {
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: "Android Security Checks", callback_data: "/android_security_checks" }],
                                    [{ text: "iOS Security Checks", callback_data: "/ios_security_checks" }],
                                    [{ text: "Privacy Checks", callback_data: "/privacy_checks" }],
                                    [{ text: "About 🛈", callback_data: "/about" }, { text: "❓ Help", callback_data: "/help" }],
                                    [{ text: "🏠 Start", callback_data: "/start" }]
                                ]
                            }
                        }
                    }]),
                    // es
                    JSON.stringify([{
                        method: 'editMessageReplyMarkup',
                        payload: {
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: "Verificaciones de seguridad de Android", callback_data: "/android_security_checks" }],
                                    [{ text: "Verificaciones de seguridad de iOS", callback_data: "/ios_security_checks" }],
                                    [{ text: "Verificaciones de privacidad", callback_data: "/privacy_checks" }],
                                    [{ text: "Acerca de 🛈", callback_data: "/about" }, { text: "❓ Ayuda", callback_data: "/help" }],
                                    [{ text: "🏠 Inicio", callback_data: "/start" }]
                                ]
                            }
                        }
                    }]),
                    // fr
                    JSON.stringify([{
                        method: 'editMessageReplyMarkup',
                        payload: {
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: "Vérifications de sécurité Android", callback_data: "/android_security_checks" }],
                                    [{ text: "Vérifications de sécurité iOS", callback_data: "/ios_security_checks" }],
                                    [{ text: "Vérifications de confidentialité", callback_data: "/privacy_checks" }],
                                    [{ text: "À propos 🛈", callback_data: "/about" }, { text: "❓ Aide", callback_data: "/help" }],
                                    [{ text: "🏠 Accueil", callback_data: "/start" }]
                                ]
                            }
                        }
                    }]),
                    // ar
                    JSON.stringify([{
                        method: 'editMessageReplyMarkup',
                        payload: {
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: "فحوصات أمان Android", callback_data: "/android_security_checks" }],
                                    [{ text: "فحوصات أمان iOS", callback_data: "/ios_security_checks" }],
                                    [{ text: "فحوصات الخصوصية", callback_data: "/privacy_checks" }],
                                    [{ text: "حول 🛈", callback_data: "/about" }, { text: "❓ مساعدة", callback_data: "/help" }],
                                    [{ text: "🏠 البداية", callback_data: "/start" }]
                                ]
                            }
                        }
                    }]),
                    // de
                    JSON.stringify([{
                        method: 'editMessageReplyMarkup',
                        payload: {
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: "Android-Sicherheitsprüfungen", callback_data: "/android_security_checks" }],
                                    [{ text: "iOS-Sicherheitsprüfungen", callback_data: "/ios_security_checks" }],
                                    [{ text: "Datenschutzprüfungen", callback_data: "/privacy_checks" }],
                                    [{ text: "Über 🛈", callback_data: "/about" }, { text: "❓ Hilfe", callback_data: "/help" }],
                                    [{ text: "🏠 Startseite", callback_data: "/start" }]
                                ]
                            }
                        }
                    }]),
                    // it
                    JSON.stringify([{
                        method: 'editMessageReplyMarkup',
                        payload: {
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: "Controlli di sicurezza Android", callback_data: "/android_security_checks" }],
                                    [{ text: "Controlli di sicurezza iOS", callback_data: "/ios_security_checks" }],
                                    [{ text: "Controlli sulla privacy", callback_data: "/privacy_checks" }],
                                    [{ text: "Informazioni 🛈", callback_data: "/about" }, { text: "❓ Aiuto", callback_data: "/help" }],
                                    [{ text: "🏠 Home", callback_data: "/start" }]
                                ]
                            }
                        }
                    }]),
                    // pt
                    JSON.stringify([{
                        method: 'editMessageReplyMarkup',
                        payload: {
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: "Verificações de segurança do Android", callback_data: "/android_security_checks" }],
                                    [{ text: "Verificações de segurança do iOS", callback_data: "/ios_security_checks" }],
                                    [{ text: "Verificações de privacidade", callback_data: "/privacy_checks" }],
                                    [{ text: "Sobre 🛈", callback_data: "/about" }, { text: "❓ Ajuda", callback_data: "/help" }],
                                    [{ text: "🏠 Início", callback_data: "/start" }]
                                ]
                            }
                        }
                    }]),
                    // ru
                    JSON.stringify([{
                        method: 'editMessageReplyMarkup',
                        payload: {
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: "Проверки безопасности Android", callback_data: "/android_security_checks" }],
                                    [{ text: "Проверки безопасности iOS", callback_data: "/ios_security_checks" }],
                                    [{ text: "Проверки конфиденциальности", callback_data: "/privacy_checks" }],
                                    [{ text: "О программе 🛈", callback_data: "/about" }, { text: "❓ Помощь", callback_data: "/help" }],
                                    [{ text: "🏠 Главная", callback_data: "/start" }]
                                ]
                            }
                        }
                    }]),
                    // zh
                    JSON.stringify([{
                        method: 'editMessageReplyMarkup',
                        payload: {
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: "Android 安全检查", callback_data: "/android_security_checks" }],
                                    [{ text: "iOS 安全检查", callback_data: "/ios_security_checks" }],
                                    [{ text: "隐私检查", callback_data: "/privacy_checks" }],
                                    [{ text: "关于 🛈", callback_data: "/about" }, { text: "❓ 帮助", callback_data: "/help" }],
                                    [{ text: "🏠 主页", callback_data: "/start" }]
                                ]
                            }
                        }
                    }]),
                    // ja
                    JSON.stringify([{
                        method: 'editMessageReplyMarkup',
                        payload: {
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: "Android セキュリティチェック", callback_data: "/android_security_checks" }],
                                    [{ text: "iOS セキュリティチェック", callback_data: "/ios_security_checks" }],
                                    [{ text: "プライバシーチェック", callback_data: "/privacy_checks" }],
                                    [{ text: "について 🛈", callback_data: "/about" }, { text: "❓ ヘルプ", callback_data: "/help" }],
                                    [{ text: "🏠 ホーム", callback_data: "/start" }]
                                ]
                            }
                        }
                    }]),
                    // ko
                    JSON.stringify([{
                        method: 'editMessageReplyMarkup',
                        payload: {
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: "Android 보안 검사", callback_data: "/android_security_checks" }],
                                    [{ text: "iOS 보안 검사", callback_data: "/ios_security_checks" }],
                                    [{ text: "개인정보 보호 검사", callback_data: "/privacy_checks" }],
                                    [{ text: "정보 🛈", callback_data: "/about" }, { text: "❓ 도움말", callback_data: "/help" }],
                                    [{ text: "🏠 홈", callback_data: "/start" }]
                                ]
                            }
                        }
                    }]),
                    // he
                    JSON.stringify([{
                        method: 'editMessageReplyMarkup',
                        payload: {
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: "בדיקות אבטחת Android", callback_data: "/android_security_checks" }],
                                    [{ text: "בדיקות אבטחת iOS", callback_data: "/ios_security_checks" }],
                                    [{ text: "בדיקות פרטיות", callback_data: "/privacy_checks" }],
                                    [{ text: "אודות 🛈", callback_data: "/about" }, { text: "❓ עזרה", callback_data: "/help" }],
                                    [{ text: "🏠 בית", callback_data: "/start" }]
                                ]
                            }
                        }
                    }])
                ],
                ['/android_security_checks',
                    // default (en)
                    JSON.stringify([
                        { "next": "#remove_keyboard" },
                        { "next": '#send_android_security_checks' },
                        { "next": '#append_top_security_checks_keyboard' }
                    ])
                ],
                ['/ios_security_checks',
                    // default (en)
                    JSON.stringify([
                        { "next": "#remove_keyboard" },
                        { next: '#send_ios_security_checks' },
                        { next: '#append_top_security_checks_keyboard' }
                    ])
                ],
                ['/privacy_checks',
                    // default (en)
                    JSON.stringify([
                        { "next": "#remove_keyboard" },
                        { next: '#send_privacy_checks' },
                        { next: '#append_top_security_checks_keyboard' }
                    ])
                ],
                ['#send_android_security_checks',
                    // default (en)
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Android Security Checks: \n\n'
                                + '1. Keep your device updated with the latest security patches.\n'
                                + '2. Only install apps from trusted sources like Google Play Store.\n'
                                + '3. Use a strong screen lock and enable biometric authentication.\n'
                                + '4. Regularly back up your data to a secure location.\n',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // es
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Verificaciones de seguridad de Android: \n\n'
                                + '1. Mantén tu dispositivo actualizado con los últimos parches de seguridad.\n'
                                + '2. Solo instala aplicaciones de fuentes confiables como Google Play Store.\n'
                                + '3. Usa un bloqueo de pantalla fuerte y habilita la autenticación biométrica.\n'
                                + '4. Realiza copias de seguridad de tus datos regularmente en una ubicación segura.\n',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // fr
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Vérifications de sécurité Android : \n\n'
                                + '1. Gardez votre appareil à jour avec les derniers correctifs de sécurité.\n'
                                + '2. N\'installez des applications que depuis des sources fiables comme le Google Play Store.\n'
                                + '3. Utilisez un verrouillage d\'écran fort et activez l\'authentification biométrique.\n'
                                + '4. Sauvegardez régulièrement vos données dans un endroit sécurisé.\n',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // ar
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'فحوصات أمان Android: \n\n'
                                + '1. حافظ على تحديث جهازك بأحدث تصحيحات الأمان.\n'
                                + '2. قم بتثبيت التطبيقات فقط من مصادر موثوقة مثل متجر Google Play.\n'
                                + '3. استخدم قفل شاشة قوي وقم بتمكين المصادقة البيومترية.\n'
                                + '4. قم بعمل نسخ احتياطية لبياناتك بانتظام إلى موقع آمن.\n',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // de
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Android-Sicherheitsprüfungen: \n\n'
                                + '1. Halten Sie Ihr Gerät mit den neuesten Sicherheitspatches auf dem neuesten Stand.\n'
                                + '2. Installieren Sie Apps nur aus vertrauenswürdigen Quellen wie dem Google Play Store.\n'
                                + '3. Verwenden Sie eine starke Bildschirmsperre und aktivieren Sie die biometrische Authentifizierung.\n'
                                + '4. Sichern Sie Ihre Daten regelmäßig an einem sicheren Ort.\n',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // it
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Controlli di sicurezza Android: \n\n'
                                + '1. Mantieni il tuo dispositivo aggiornato con le ultime patch di sicurezza.\n'
                                + '2. Installa app solo da fonti affidabili come il Google Play Store.\n'
                                + '3. Usa un blocco schermo forte e abilita l\'autenticazione biometrica.\n'
                                + '4. Esegui regolarmente il backup dei tuoi dati in una posizione sicura.\n',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // pt
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Verificações de segurança do Android: \n\n'
                                + '1. Mantenha seu dispositivo atualizado com os patches de segurança mais recentes.\n'
                                + '2. Instale aplicativos apenas de fontes confiáveis, como a Google Play Store.\n'
                                + '3. Use um bloqueio de tela forte e ative a autenticação biométrica.\n'
                                + '4. Faça backup dos seus dados regularmente em um local seguro.\n',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // ru
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Проверки безопасности Android: \n\n'
                                + '1. Держите ваше устройство обновленным с последними патчами безопасности.\n'
                                + '2. Устанавливайте приложения только из надежных источников, таких как Google Play Store.\n'
                                + '3. Используйте надежную блокировку экрана и включайте биометрическую аутентификацию.\n'
                                + '4. Регулярно делайте резервные копии ваших данных в безопасном месте.\n',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // zh
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Android 安全检查：\n\n'
                                + '1. 保持您的设备更新最新的安全补丁。\n'
                                + '2. 仅从可信来源（如 Google Play 商店）安装应用程序。\n'
                                + '3. 使用强屏幕锁定并启用生物识别认证。\n'
                                + '4. 定期备份您的数据到安全位置。\n',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // ja
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Androidのセキュリティチェック：\n\n'
                                + '1. デバイスを最新のセキュリティパッチで更新してください。\n'
                                + '2. Google Playストアなどの信頼できるソースからのみアプリをインストールしてください。\n'
                                + '3. 強力な画面ロックを使用し、生体認証を有効にしてください。\n'
                                + '4. 定期的にデータを安全な場所にバックアップしてください。\n',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // ko
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Android 보안 점검: \n\n'
                                + '1. 최신 보안 패치로 기기를 업데이트하세요.\n'
                                + '2. Google Play 스토어와 같은 신뢰할 수 있는 출처에서만 앱을 설치하세요.\n'
                                + '3. 강력한 화면 잠금과 생체 인증을 사용하세요.\n'
                                + '4. 데이터를 정기적으로 안전한 장소에 백업하세요.\n',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // he
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'בדיקות אבטחה של Android: \n\n'
                                + '1. שמור על המכשיר שלך מעודכן עם תיקוני האבטחה האחרונים.\n'
                                + '2. התקן אפליקציות רק ממקורות מהימנים, כמו Google Play Store.\n'
                                + '3. השתמש בנעילת מסך חזקה והפעל אימות ביומטרי.\n'
                                + '4. גבה את הנתונים שלך באופן קבוע במקום בטוח.\n',
                            parse_mode: 'HTML'
                        }
                    }])
                ],
                ['#send_ios_security_checks',
                    // default (en)
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'iOS Security Checks: \n\n'
                                + '1. Keep your iOS device updated with the latest software updates.\n'
                                + '2. Only download apps from the official App Store.\n'
                                + '3. Use a strong passcode and enable Face ID or Touch ID.\n'
                                + '4. Regularly back up your data using iCloud or iTunes.\n',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // es
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Controles de seguridad de iOS: \n\n'
                                + '1. Mantenga su dispositivo iOS actualizado con las últimas actualizaciones de software.\n'
                                + '2. Descargue aplicaciones solo desde la App Store oficial.\n'
                                + '3. Use un código de acceso fuerte y habilite Face ID o Touch ID.\n'
                                + '4. Realice copias de seguridad de sus datos regularmente usando iCloud o iTunes.\n',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // fr
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Vérifications de sécurité iOS : \n\n'
                                + '1. Maintenez votre appareil iOS à jour avec les dernières mises à jour logicielles.\n'
                                + '2. Téléchargez uniquement des applications depuis l\'App Store officiel.\n'
                                + '3. Utilisez un code d\'accès fort et activez Face ID ou Touch ID.\n'
                                + '4. Sauvegardez régulièrement vos données en utilisant iCloud ou iTunes.\n',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // ar
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'فحوصات أمان iOS: \n\n'
                                + '1. حافظ على تحديث جهاز iOS الخاص بك بأحدث تحديثات البرامج.\n'
                                + '2. قم بتنزيل التطبيقات فقط من متجر التطبيقات الرسمي.\n'
                                + '3. استخدم رمز مرور قوي وقم بتمكين Face ID أو Touch ID.\n'
                                + '4. قم بعمل نسخ احتياطية لبياناتك بانتظام باستخدام iCloud أو iTunes.\n',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // de
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'iOS-Sicherheitsprüfungen: \n\n'
                                + '1. Halten Sie Ihr iOS-Gerät mit den neuesten Software-Updates auf dem neuesten Stand.\n'
                                + '2. Laden Sie Apps nur aus dem offiziellen App Store herunter.\n'
                                + '3. Verwenden Sie einen starken Passcode und aktivieren Sie Face ID oder Touch ID.\n'
                                + '4. Sichern Sie Ihre Daten regelmäßig mit iCloud oder iTunes.\n',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // it
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Controlli di sicurezza iOS: \n\n'
                                + '1. Mantieni il tuo dispositivo iOS aggiornato con gli ultimi aggiornamenti software.\n'
                                + '2. Scarica le app solo dall\'App Store ufficiale.\n'
                                + '3. Usa un codice di accesso forte e abilita Face ID o Touch ID.\n'
                                + '4. Esegui regolarmente il backup dei tuoi dati utilizzando iCloud o iTunes.\n',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // pt
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Verificações de segurança do iOS: \n\n'
                                + '1. Mantenha seu dispositivo iOS atualizado com as últimas atualizações de software.\n'
                                + '2. Baixe aplicativos apenas da App Store oficial.\n'
                                + '3. Use um código de acesso forte e ative o Face ID ou Touch ID.\n'
                                + '4. Faça backup regularmente dos seus dados usando o iCloud ou iTunes.\n',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // ru
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'Проверки безопасности iOS: \n\n'
                                + '1. Держите ваше устройство iOS обновленным с последними обновлениями программного обеспечения.\n'
                                + '2. Загружайте приложения только из официального App Store.\n'
                                + '3. Используйте надежный пароль и включайте Face ID или Touch ID.\n'
                                + '4. Регулярно делайте резервные копии ваших данных с помощью iCloud или iTunes.\n',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // zh
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'iOS安全检查：\n\n'
                                + '1. 保持您的iOS设备更新到最新的软件版本。\n'
                                + '2. 仅从官方App Store下载应用程序。\n'
                                + '3. 使用强密码并启用Face ID或Touch ID。\n'
                                + '4. 定期使用iCloud或iTunes备份您的数据。\n',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // ja
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'iOSのセキュリティチェック：\n\n'
                                + '1. iOSデバイスを最新のソフトウェアアップデートで常に最新の状態に保ちます。\n'
                                + '2. 公式のApp Storeからのみアプリをダウンロードします。\n'
                                + '3. 強力なパスコードを使用し、Face IDまたはTouch IDを有効にします。\n'
                                + '4. iCloudまたはiTunesを使用して定期的にデータをバックアップします。\n',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // ko
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'iOS 보안 점검: \n\n'
                                + '1. iOS 기기를 최신 소프트웨어 업데이트로 유지하세요.\n'
                                + '2. 공식 App Store에서만 앱을 다운로드하세요.\n'
                                + '3. 강력한 암호를 사용하고 Face ID 또는 Touch ID를 활성화하세요.\n'
                                + '4. iCloud 또는 iTunes를 사용하여 데이터를 정기적으로 백업하세요.\n',
                            parse_mode: 'HTML'
                        }
                    }]),
                    // he
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'בדיקות אבטחה של iOS: \n\n'
                                + '1. שמור על מכשיר ה-iOS שלך מעודכן עם עדכוני התוכנה האחרונים.\n'
                                + '2. הורד אפליקציות רק מחנות האפליקציות הרשמית.\n'
                                + '3. השתמש בקוד גישה חזק והפעל Face ID או Touch ID.\n'
                                + '4. גבה את הנתונים שלך באופן קבוע באמצעות iCloud או iTunes.\n',
                            parse_mode: 'HTML'
                        }
                    }])
                ],
                ['#send_privacy_checks',
                    // default (en)
                    JSON.stringify([
                        { "next": "#remove_keyboard" },
                        {
                            method: 'sendMessage',
                            payload: {
                                text: 'Privacy Checks: \n\n'
                                    + '1. Review app permissions and revoke any unnecessary access.\n'
                                    + '2. Use strong, unique passwords for your accounts.\n'
                                    + '3. Enable two-factor authentication (2FA) wherever possible.\n'
                                    + '4. Be cautious about sharing personal information online.\n',
                                parse_mode: 'HTML'
                            }
                        },
                        { "next": "#append_top_security_checks_keyboard" }
                    ]),
                    // es
                    JSON.stringify([
                        { "next": "#remove_keyboard" },
                        {
                            method: 'sendMessage',
                            payload: {
                                text: 'Comprobaciones de privacidad: \n\n'
                                    + '1. Revisa los permisos de las aplicaciones y revoca cualquier acceso innecesario.\n'
                                    + '2. Utiliza contraseñas fuertes y únicas para tus cuentas.\n'
                                    + '3. Habilita la autenticación de dos factores (2FA) siempre que sea posible.\n'
                                    + '4. Ten cuidado al compartir información personal en línea.\n',
                                parse_mode: 'HTML'
                            }
                        },
                        { "next": "#append_top_security_checks_keyboard" }
                    ]),
                    // fr
                    JSON.stringify([
                        { "next": "#remove_keyboard" },
                        {
                            method: 'sendMessage',
                            payload: {
                                text: 'Contrôles de confidentialité : \n\n'
                                    + '1. Examinez les autorisations des applications et révoquez tout accès inutile.\n'
                                    + '2. Utilisez des mots de passe forts et uniques pour vos comptes.\n'
                                    + '3. Activez l\'authentification à deux facteurs (2FA) dans la mesure du possible.\n'
                                    + '4. Soyez prudent lorsque vous partagez des informations personnelles en ligne.\n',
                                parse_mode: 'HTML'
                            }
                        },
                        { "next": "#append_top_security_checks_keyboard" }
                    ]),
                    // ar
                    JSON.stringify([
                        { "next": "#remove_keyboard" },
                        {
                            method: 'sendMessage',
                            payload: {
                                text: 'فحوصات الخصوصية: \n\n'
                                    + '1. راجع أذونات التطبيق وقم بإلغاء أي وصول غير ضروري.\n'
                                    + '2. استخدم كلمات مرور قوية وفريدة لحساباتك.\n'
                                    + '3. قم بتمكين المصادقة الثنائية (2FA) حيثما أمكن ذلك.\n'
                                    + '4. كن حذرًا عند مشاركة المعلومات الشخصية عبر الإنترنت.\n',
                                parse_mode: 'HTML'
                            }
                        },
                        { "next": "#append_top_security_checks_keyboard" }
                    ]),
                    // de
                    JSON.stringify([
                        { "next": "#remove_keyboard" },
                        {
                            method: 'sendMessage',
                            payload: {
                                text: 'Datenschutzkontrollen: \n\n'
                                    + '1. Überprüfen Sie App-Berechtigungen und widerrufen Sie unnötige Zugriffe.\n'
                                    + '2. Verwenden Sie starke, eindeutige Passwörter für Ihre Konten.\n'
                                    + '3. Aktivieren Sie die Zwei-Faktor-Authentifizierung (2FA), wo immer möglich.\n'
                                    + '4. Seien Sie vorsichtig beim Teilen persönlicher Informationen online.\n',
                                parse_mode: 'HTML'
                            }
                        },
                        { "next": "#append_top_security_checks_keyboard" }
                    ]),
                    // it
                    JSON.stringify([
                        { "next": "#remove_keyboard" },
                        {
                            method: 'sendMessage',
                            payload: {
                                text: 'Controlli sulla privacy: \n\n'
                                    + '1. Rivedi i permessi delle app e revoca l\'accesso non necessario.\n'
                                    + '2. Usa password forti e uniche per i tuoi account.\n'
                                    + '3. Abilita l\'autenticazione a due fattori (2FA) ovunque sia possibile.\n'
                                    + '4. Sii cauto nel condividere informazioni personali online.\n',
                                parse_mode: 'HTML'
                            }
                        },
                        { "next": "#append_top_security_checks_keyboard" }
                    ]),
                    // pt
                    JSON.stringify([
                        { "next": "#remove_keyboard" },
                        {
                            method: 'sendMessage',
                            payload: {
                                text: 'Verificações de privacidade: \n\n'
                                    + '1. Revise as permissões de aplicativos e revogue qualquer acesso desnecessário.\n'
                                    + '2. Use senhas fortes e exclusivas para suas contas.\n'
                                    + '3. Ative a autenticação de dois fatores (2FA) sempre que possível.\n'
                                    + '4. Tenha cuidado ao compartilhar informações pessoais online.\n',
                                parse_mode: 'HTML'
                            }
                        },
                        { "next": "#append_top_security_checks_keyboard" }
                    ]),
                    // ru
                    JSON.stringify([
                        { "next": "#remove_keyboard" },
                        {
                            method: 'sendMessage',
                            payload: {
                                text: 'Проверки конфиденциальности: \n\n'
                                    + '1. Проверяйте разрешения приложений и отзывайте ненужный доступ.\n'
                                    + '2. Используйте надежные, уникальные пароли для своих учетных записей.\n'
                                    + '3. Включите двухфакторную аутентификацию (2FA) везде, где это возможно.\n'
                                    + '4. Будьте осторожны при обмене личной информацией в Интернете.\n',
                                parse_mode: 'HTML'
                            }
                        },
                        { "next": "#append_top_security_checks_keyboard" }
                    ]),
                    // zh
                    JSON.stringify([
                        { "next": "#remove_keyboard" },
                        {
                            method: 'sendMessage',
                            payload: {
                                text: '隐私检查： \n\n'
                                    + '1. 审查应用程序权限并撤销任何不必要的访问权限。\n'
                                    + '2. 为您的帐户使用强大、独特的密码。\n'
                                    + '3. 尽可能启用两步验证（2FA）。\n'
                                    + '4. 在线共享个人信息时要谨慎。\n',
                                parse_mode: 'HTML'
                            }
                        },
                        { "next": "#append_top_security_checks_keyboard" }
                    ]),
                    // ja
                    JSON.stringify([
                        { "next": "#remove_keyboard" },
                        {
                            method: 'sendMessage',
                            payload: {
                                text: 'プライバシーチェック： \n\n'
                                    + '1. アプリの権限を確認し、不要なアクセスをすべて取り消します。\n'
                                    + '2. アカウントには強力でユニークなパスワードを使用してください。\n'
                                    + '3. 可能な限り二要素認証（2FA）を有効にしてください。\n'
                                    + '4. オンラインで個人情報を共有する際には注意してください。\n',
                                parse_mode: 'HTML'
                            }
                        },
                        { "next": "#append_top_security_checks_keyboard" }
                    ]),
                    // ko
                    JSON.stringify([
                        { "next": "#remove_keyboard" },
                        {
                            method: 'sendMessage',
                            payload: {
                                text: '개인정보 보호 확인: \n\n'
                                    + '1. 앱 권한을 검토하고 불필요한 접근을 모두 취소하세요.\n'
                                    + '2. 계정에 강력하고 고유한 비밀번호를 사용하세요.\n'
                                    + '3. 가능하면 2단계 인증(2FA)을 활성화하세요.\n'
                                    + '4. 온라인에서 개인 정보를 공유할 때 주의하세요.\n',
                                parse_mode: 'HTML'
                            }
                        },
                        { "next": "#append_top_security_checks_keyboard" }
                    ]),
                    // he
                    JSON.stringify([
                        { "next": "#remove_keyboard" },
                        {
                            method: 'sendMessage',
                            payload: {
                                text: 'בדיקות פרטיות: \n\n'
                                    + '1. סקור את הרשאות האפליקציה ובטל כל גישה מיותרת.\n'
                                    + '2. השתמש בסיסמאות חזקות וייחודיות עבור החשבונות שלך.\n'
                                    + '3. הפעל אימות דו-שלבי (2FA) בכל מקום אפשרי.\n'
                                    + '4. היזהר משיתוף מידע אישי באינטרנט.\n',
                                parse_mode: 'HTML'
                            }
                        },
                        { "next": "#append_top_security_checks_keyboard" }
                    ])
                ],
                ['#send_call_to_security_action_message',
                    // default (en)
                    JSON.stringify([{
                        method: 'sendMessage',
                        payload: {
                            text: 'For more security actions, visit our website or contact support.',
                            parse_mode: 'HTML'
                        }
                    }])
                ]
            ]
        };
    }
}

EMD.CreateInvoiceLink = {
    entityName: 'InvoiceLink',
    card: (data = {}) => {
        return {
            name: 'invoiceLink_Card',
            header: {
                title: 'Invoice Links',
                subTitle: 'Manage your invoice links here.',
                imageUrl: EMD.DEFAULT_IMAGE_URL,
                imageStyle: CardService.ImageStyle.SQUARE,
                imageAltText: 'Invoice Links Image'
            },
            sections: [
                {   // Invoice Links Parameters section
                    header: 'Invoice Links Parameters',
                    collapsible: true,
                    numUncollapsibleWidgets: 3,
                    widgets: [
                        {  // [YOUR_BOT_API_TOKEN] TextInput widget
                            id: 'bot_api_token_text_input',
                            TextInput: {
                                title: 'Bot API Token',
                                value: data.bot_api_token || '[YOUR_BOT_API_TOKEN]',
                                hint: 'Enter your Telegram Bot API Token here',
                                fieldName: 'bot_api_token',
                                multiline: false,
                                // inputMode (CardService.TextInputMode.PLAIN_TEXT || CardService.TextInputMode.RICH_TEXT)
                                inputMode: CardService.TextInputMode.RICH_TEXT
                            }
                        },
                        {   // Title TextInput widget
                            id: 'title_text_input',
                            TextInput: {
                                title: 'Title',
                                value: data.title || 'Support the Project',
                                hint: 'Enter the title for the invoice link. (Max 32 characters)',
                                fieldName: 'title',
                                multiline: false,
                                // inputMode (CardService.TextInputMode.PLAIN_TEXT || CardService.TextInputMode.RICH_TEXT)
                                inputMode: CardService.TextInputMode.RICH_TEXT,
                                validation: {
                                    characterLimit: '32',
                                    // InputType.INTEGER || InputType.EMAIL || InputType.FLOAT || InputType.TEXT
                                    type: CardService.InputType.TEXT
                                },
                            }
                        },
                        {   // Description TextInput widget
                            id: 'description_text_input',
                            TextInput: {
                                title: 'Description',
                                value: data.description || 'Buy me a kiss to support the development of this project.',
                                hint: 'Enter the description for the invoice link (Max 255 characters)',
                                fieldName: 'description',
                                multiline: false,
                                // inputMode (CardService.TextInputMode.PLAIN_TEXT || CardService.TextInputMode.RICH_TEXT)
                                inputMode: CardService.TextInputMode.RICH_TEXT,
                                validation: {
                                    characterLimit: '255',
                                    // InputType.INTEGER || InputType.EMAIL || InputType.FLOAT || InputType.TEXT
                                    type: CardService.InputType.TEXT
                                },
                            }
                        },
                        {   // Currency TextInput widget
                            id: 'currency_text_input',
                            TextInput: {
                                title: 'Currency',
                                value: data.currency || 'XTR',
                                hint: 'Enter the currency for the invoice link (e.g., USD, EUR, XTR)',
                                fieldName: 'currency',
                                multiline: false,
                                // inputMode (CardService.TextInputMode.PLAIN_TEXT || CardService.TextInputMode.RICH_TEXT)
                                inputMode: CardService.TextInputMode.PLAIN_TEXT,
                                validation: {
                                    characterLimit: '3',
                                    // InputType.INTEGER || InputType.EMAIL || InputType.FLOAT || InputType.TEXT
                                    type: CardService.InputType.TEXT
                                },
                            }
                        },
                        {   // Payload TextInput widget
                            id: 'payload_text_input',
                            TextInput: {
                                title: 'Payload',
                                value: data.payload || '',
                                hint: 'Enter the payload for the invoice link',
                                fieldName: 'payload',
                                multiline: false,
                                // inputMode (CardService.TextInputMode.PLAIN_TEXT || CardService.TextInputMode.RICH_TEXT)
                                inputMode: CardService.TextInputMode.PLAIN_TEXT,
                                validation: {
                                    characterLimit: '64',
                                    // InputType.INTEGER || InputType.EMAIL || InputType.FLOAT || InputType.TEXT
                                    type: CardService.InputType.TEXT
                                },
                            }
                        },
                        {   // provider_token TextInput widget
                            id: 'provider_token_text_input',
                            TextInput: {
                                title: 'Provider Token',
                                value: data.provider_token || '',
                                hint: 'Enter the provider token for the invoice link',
                                fieldName: 'provider_token',
                                multiline: false,
                                // inputMode (CardService.TextInputMode.PLAIN_TEXT || CardService.TextInputMode.RICH_TEXT)
                                inputMode: CardService.TextInputMode.PLAIN_TEXT,
                                validation: {
                                    characterLimit: '255',
                                    // InputType.INTEGER || InputType.EMAIL || InputType.FLOAT || InputType.TEXT
                                    type: CardService.InputType.TEXT
                                },
                            }
                        }
                    ]
                },
                {   // Prices Info section
                    header: 'Prices Info',
                    collapsible: true,
                    numUncollapsibleWidgets: 1,
                    widgets: [
                        {   // Prices TextInput widget
                            id: 'prices_text_input',
                            TextInput: {
                                title: 'Prices',
                                value: JSON.stringify(data.prices || [{ label: 'Kiss', amount: 500 }], null, 2),
                                hint: 'Enter the prices for the invoice link',
                                fieldName: 'prices',
                                multiline: true,
                                // inputMode (CardService.TextInputMode.PLAIN_TEXT || CardService.TextInputMode.RICH_TEXT)
                                inputMode: CardService.TextInputMode.RICH_TEXT
                            }
                        },
                        {   // max_tip_amount TextInput widget
                            id: 'max_tip_amount_text_input',
                            TextInput: {
                                title: 'Max Tip Amount',
                                value: data.max_tip_amount || '',
                                hint: 'Enter the max tip amount for the invoice link',
                                fieldName: 'max_tip_amount',
                                multiline: false,
                                // inputMode (CardService.TextInputMode.PLAIN_TEXT || CardService.TextInputMode.RICH_TEXT)
                                inputMode: CardService.TextInputMode.PLAIN_TEXT,
                                validation: {
                                    characterLimit: '10',
                                    // InputType.INTEGER || InputType.EMAIL || InputType.FLOAT || InputType.TEXT
                                    type: CardService.InputType.INTEGER
                                },
                            }
                        }
                    ]
                },
                {   // Photo Url and Dimensions section
                    header: 'Photo Url and Dimensions',
                    collapsible: true,
                    numUncollapsibleWidgets: 0,
                    widgets: [
                        {   // photo_url TextInput widget
                            id: 'photo_url_text_input',
                            TextInput: {
                                title: 'Photo URL',
                                value: data.photo_url || '',
                                hint: 'Enter the photo URL for the invoice link',
                                fieldName: 'photo_url',
                                multiline: false,
                                // inputMode (CardService.TextInputMode.PLAIN_TEXT || CardService.TextInputMode.RICH_TEXT)
                                inputMode: CardService.TextInputMode.PLAIN_TEXT,
                                validation: {
                                    characterLimit: '2048',
                                    // InputType.INTEGER || InputType.EMAIL || InputType.FLOAT || InputType.TEXT
                                    type: CardService.InputType.TEXT
                                },
                            }
                        },
                        {   // photo_width TextInput widget
                            id: 'photo_width_text_input',
                            TextInput: {
                                title: 'Photo Width',
                                value: data.photo_width || '',
                                hint: 'Enter the photo width for the invoice link',
                                fieldName: 'photo_width',
                                multiline: false,
                                // inputMode (CardService.TextInputMode.PLAIN_TEXT || CardService.TextInputMode.RICH_TEXT)
                                inputMode: CardService.TextInputMode.PLAIN_TEXT,
                                validation: {
                                    characterLimit: '10',
                                    // InputType.INTEGER || InputType.EMAIL || InputType.FLOAT || InputType.TEXT
                                    type: CardService.InputType.INTEGER
                                },
                            }
                        },
                        {   // photo_height TextInput widget
                            id: 'photo_height_text_input',
                            TextInput: {
                                title: 'Photo Height',
                                value: data.photo_height || '',
                                hint: 'Enter the photo height for the invoice link',
                                fieldName: 'photo_height',
                                multiline: false,
                                // inputMode (CardService.TextInputMode.PLAIN_TEXT || CardService.TextInputMode.RICH_TEXT)
                                inputMode: CardService.TextInputMode.PLAIN_TEXT,
                                validation: {
                                    characterLimit: '10',
                                    // InputType.INTEGER || InputType.EMAIL || InputType.FLOAT || InputType.TEXT
                                    type: CardService.InputType.INTEGER
                                },
                            }
                        }
                    ]
                },
                {   // Invoice Links Operations section
                    header: 'Invoice Links Operations',
                    collapsible: false,
                    numUncollapsibleWidgets: 0,
                    widgets: [
                        {   // Create Invoice Link Button
                            id: 'create_invoice_link_button',
                            TextButton: {
                                text: '➕ Create Invoice Link',
                                onClick: {
                                    functionName: 'BotApiHandler.View.onCreateInvoiceLinkClick'
                                }
                            }
                        }
                    ]
                },
                {   // Data view
                    header: 'Data View',
                    collapsible: true,
                    numUncollapsibleWidgets: 0,
                    widgets: [
                        {   // Data View widget
                            id: 'data_view_widget',
                            TextParagraph: {
                                text: `Data: ${JSON.stringify(data, null, 2)}`,
                                maxLines: 35
                            }
                        }
                    ]
                }
            ]
        };
    },
    sheet: (data = {}) => {
        return {
            name: '🧾 Invoice Links',
            columns: ['Title', 'Payload', 'Link', 'Created On', 'Status'],
            sample_data: [
                ['Show me love',
                    // createInvoiceLink payload
                    JSON.stringify({
                        title: 'Support the Project',
                        description: 'Buy me a kiss to support the development of this project.',
                        currency: 'XTR',
                        prices: [{ label: 'Kiss', amount: 500 }], // $5.00
                        payload: 'support_project_001',
                        need_name: false,
                        need_email: false,
                        need_phone_number: false,
                        need_shipping_address: false,
                        photo_url: EMD.LOGO_PNG_URL,
                        photo_size: 512,
                        photo_width: 512,
                        photo_height: 512,
                    }),
                    '[Invoice Link Here]',
                    '[Created On Here]',
                    '[Status Here]'
                ],
                ['Subscribe to Basic',
                    // createInvoiceLink payload
                    JSON.stringify({
                        title: 'Basic Subscription',
                        description: 'Subscribe to the basic plan for essential features.',
                        currency: 'XTR',
                        prices: [{ label: 'Monthly Subscription', amount: 499 }], // $4.99
                        payload: 'basic_subscription_001',
                        need_name: false,
                        need_email: false,
                        need_phone_number: false,
                        photo_url: EMD.LOGO_PNG_URL,
                        photo_size: 512,
                        photo_width: 512,
                        photo_height: 512,
                        subscription_period: 2592000 // 30 days in seconds
                    }),
                    '[Invoice Link Here]',
                    '[Created On Here]',
                    '[Status Here]'
                ],
                ['Subscribe to Premium',
                    // createInvoiceLink payload
                    JSON.stringify({
                        title: 'Premium Subscription',
                        description: 'Subscribe to the premium plan for additional features.',
                        currency: 'XTR',
                        prices: [{ label: 'Monthly Subscription', amount: 999 }], // $9.99
                        payload: 'premium_subscription_001',
                        need_name: false,
                        need_email: false,
                        need_phone_number: false,
                        photo_url: EMD.LOGO_PNG_URL,
                        photo_size: 512,
                        photo_width: 512,
                        photo_height: 512,
                        subscription_period: 2592000 // 30 days in seconds
                    }),
                    '[Invoice Link Here]',
                    '[Created On Here]',
                    '[Status Here]'
                ]
            ]
        };
    }
}

EMD.MembershipSubscription = {
    entityName: 'MembershipSubscription',
    card: (data = {}) => {
        return {
            name: 'membershipSubscription_Card',
            header: {
                title: 'Membership Subscription',
                subTitle: 'Choose your subscription plan',
                imageUrl: EMD.YES_IMG_URL,
                imageStyle: CardService.ImageStyle.SQUARE,
                imageAltText: 'Membership Subscription Image'
            },
            sections: [
                {   // Subscription Plans section
                    header: 'Subscription Plans',
                    collapsible: true,
                    numUncollapsibleWidgets: 2,
                    widgets: [
                        {   // Basic Plan DecoratedText widget
                            id: 'basic_plan_decorated_text',
                            DecoratedText: {
                                text: 'Basic Plan - $0.00/month',
                                bottomLabel: 'Essential features for personal use.',
                                wrapText: true
                            }
                        },
                        {   // Premium Plan DecoratedText widget
                            id: 'premium_plan_decorated_text',
                            DecoratedText: {
                                text: 'Premium Plan - 90 days for FREE',
                                bottomLabel: 'Additional features for power users.',
                                wrapText: true,
                                textButton: {
                                    disabled: !!data.appModel?.isPremium,
                                    text: 'Subscribe Now',
                                    onClick: {
                                        functionName: 'EventHandler.ViewModel.onActivatePremiumClicked'
                                    }
                                }
                            }
                        }
                    ]
                }
            ],
            fixedFooter: {
                primaryButton: {
                    textButton: {
                        disabled: !!data.appModel?.isPremium,
                        text: '🏆 Activate Now',
                        onClick: {
                            functionName: 'EventHandler.ViewModel.onActivatePremiumClicked'
                        }
                    }
                },
                secondaryButton: {
                    textButton: {
                        disabled: !!!data.appModel?.isPremium,
                        text: '🛑 Deactivate',
                        onClick: {
                            functionName: 'EventHandler.ViewModel.onDeactivatePremiumClicked'
                        }
                    }
                }
            }
        };
    }
}

EMD.ThankYou = {
    entityName: 'ThankYou',
    card: (data = {}) => {
        return {
            name: 'thankYou_Card',
            header: {
                title: 'Thank You!',
                subTitle: 'We appreciate your support.',
                imageUrl: EMD.THANK_YOU_IMG_URL,
                imageStyle: CardService.ImageStyle.SQUARE,
                imageAltText: 'Thank You Image'
            },
            sections: [
                {   // Thank You Message section
                    header: 'A Heartfelt Thanks',
                    collapsible: false,
                    widgets: [
                        {
                            id: 'thank_you_text_paragraph',
                            TextParagraph: {
                                text: 'Thank you for your support! Your contribution helps us continue to improve and provide valuable features.'
                            }
                        },
                        {   // DecoratedText with TextButton to push 'About' card
                            id: 'about_button',
                            DecoratedText: {
                                text: 'Learn more about this addon',
                                bottomLabel: 'Click the button to view addon information.',
                                wrapText: false,
                                textButton: {
                                    disabled: false,
                                    text: 'ℹ️',
                                    onClick: {
                                        functionName: 'NavigationHandler.ViewModel.onPushCardClick',
                                        parameters: { template: 'EMD.Cards.About' }
                                    }
                                }
                            }
                        }
                    ]
                }
            ]
        };
    }
}

EMD.CardSample = {
    entityName: 'CardSample',
    card: (data = {}) => {
        return {
            name: `${data.cardName || 'rootCard'}`,
            header: {
                title: `${data.cardName || 'Sample'} Card`,
                subTitle: `Time: ${new Date().toLocaleString()}`,
                imageUrl: EMD.MATH_IMG_URL,
                imageStyle: CardService.ImageStyle.SQUARE,
                imageAltText: 'Sample Image'
            },
            sections: [
                {
                    // header: 'Sample Card Section',
                    widgets: [
                        {
                            id: 'sample_card_text_paragraph',
                            TextParagraph: {
                                text: 'This is a sample card that has been pushed onto the card stack. You can navigate back to the previous card using the back button.'
                            }
                        }
                    ]
                },
                {   // Card operations section
                    header: 'Card Operations',
                    collapsible: true,
                    numUncollapsibleWidgets: 2,
                    widgets: [
                        {   // TextParagraph widget
                            id: 'card_operations_text_paragraph',
                            TextParagraph: {
                                text: 'Use the buttons below to demonstrate card operations like popping to root or opening a new card.'
                            }
                        },
                        {   // TextButton to open a new card
                            id: 'open_new_card_button',
                            TextButton: {
                                text: '🆕 Open New Card',
                                onClick: {
                                    functionName: 'NavigationHandler.ViewModel.onPushCardClick',
                                    parameters: { template: 'EMD.Cards.CardSample', cardName: 'cardB' }
                                }
                            }
                        },
                        {   // TextButton to pop to root card
                            id: 'pop_to_root_card_button',
                            TextButton: {
                                text: '⬆️ Pop to Root Card',
                                onClick: {
                                    functionName: 'NavigationHandler.ViewModel.onPopToRootCardClick'
                                }
                            }
                        },
                        {   // TextButton to update current card
                            id: 'update_current_card_button',
                            TextButton: {
                                text: '♻️ Update Current Card',
                                onClick: {
                                    functionName: 'NavigationHandler.ViewModel.onUpdateCardClick',
                                    parameters: { template: 'EMD.Cards.CardSample', cardName: 'updatedCard' }
                                }
                            }
                        },
                        {   // TextButton to pop to named card
                            id: 'pop_to_named_card_button',
                            TextButton: {
                                text: '🔙 Pop to Named Card (Home)',
                                onClick: {
                                    functionName: 'NavigationHandler.ViewModel.onPopToNamedCardClick',
                                    parameters: { cardName: 'EMD.Cards.Home' }
                                }
                            }
                        }
                    ]
                },
                {   // TextButton to show terminal output sheet with welcome message
                    collapsible: false,
                    numUncollapsibleWidgets: 0,
                    widgets: [
                        {  // Welcome widget
                            id: 'welcome_text_paragraph',
                            TextParagraph: {
                                text: 'Welcome to the Addon! Use the menu to navigate through different sections.'
                            }
                        },
                        {  // DecoratedText with TextButton to show terminal output sheet
                            id: 'show_terminal_output_button',
                            DecoratedText: {
                                text: '💻 Terminal Output',
                                bottomLabel: 'View the terminal output log sheet',
                                wrapText: false,
                                textButton: {
                                    disabled: false,
                                    text: '💻',
                                    onClick: {
                                        functionName: 'SpreadsheetHandler.Addon.onInsertSampleDataClick',
                                        parameters: { sheet: 'EMD.Spreadsheet.TerminalOutput' }
                                    }
                                }
                            }
                        },
                        {  // DecoratedText with TextButton to push 'Help' card
                            id: 'basic_bot_operation_button',
                            DecoratedText: {
                                text: '❓ Need Help?',
                                bottomLabel: 'Click \'❓\' to open the Help card',
                                wrapText: false,
                                textButton: {
                                    disabled: false,
                                    text: '❓',
                                    onClick: {
                                        functionName: 'NavigationHandler.ViewModel.onPushCardClick',
                                        parameters: { template: 'EMD.Cards.Help', cardName: 'Help' }
                                    }
                                }
                            }
                        }
                    ]
                },
                {   // Demonstration navigation features section
                    header: 'EMD.Cards Demonstration',
                    collapsible: true,
                    numUncollapsibleWidgets: 0,
                    widgets: [
                        {   // TextParagraph widget
                            id: 'card_handler_demo_text_paragraph',
                            TextParagraph: {
                                text: 'This section demonstrates various features including input widgets and data views.'
                            }
                        },
                        {   // DecoratedText with TextButton to push 'Sample' card
                            id: 'about_card_button',
                            DecoratedText: {
                                text: 'Push Card',
                                bottomLabel: 'Click \'➡️\' to push Sample card onto the stack',
                                wrapText: false,
                                textButton: {
                                    disabled: false,
                                    text: '➡️',
                                    onClick: {
                                        functionName: 'NavigationHandler.ViewModel.onPushCardClick',
                                        parameters: { template: 'EMD.Cards.Sample', cardName: 'Sample' }
                                    }
                                }
                            }
                        }
                    ]
                },
                {   // Demonstration collapsible section with various input widgets
                    header: 'Text Input Samples',
                    collapsible: true,
                    numUncollapsibleWidgets: 2,
                    widgets: [
                        {
                            id: 'demo_text_paragraph',
                            TextParagraph: {
                                text: 'This is a demonstration collapsible section to showcase how to structure cards and sections in your Addon.'
                            }
                        },
                        {   // TextInput sample with rich text input mode and text validation
                            id: 'sample_text_input_widget',
                            TextInput: {
                                title: 'Sample Text Input with RICH_TEXT Mode and Validation on Text',
                                fieldName: 'sample_text_input',
                                hint: 'Enter some text here',
                                multiline: false,
                                // inputMode (CardService.TextInputMode.PLAIN_TEXT || CardService.TextInputMode.RICH_TEXT)
                                inputMode: CardService.TextInputMode.RICH_TEXT,
                                validation: {
                                    characterLimit: '150',
                                    // InputType.INTEGER || InputType.EMAIL || InputType.FLOAT || InputType.TEXT
                                    type: CardService.InputType.TEXT
                                },
                                value: data.sampleTextInputValue || ''
                            }
                        },
                        {   // TextInput sample with plain text input mode and INTEGER validation, character limit 3
                            id: 'sample_integer_input_widget',
                            TextInput: {
                                title: 'Sample Integer Input with PLAIN_TEXT Mode and Validation on Integer, Character Limit 3',
                                fieldName: 'sample_integer_input',
                                hint: 'Enter an integer value here',
                                multiline: false,
                                // inputMode (CardService.TextInputMode.PLAIN_TEXT || CardService.TextInputMode.RICH_TEXT)
                                inputMode: CardService.TextInputMode.PLAIN_TEXT,
                                validation: {
                                    characterLimit: '3',
                                    // InputType.INTEGER || InputType.EMAIL || InputType.FLOAT || InputType.TEXT
                                    type: CardService.InputType.INTEGER
                                },
                                value: data.sampleIntegerInputValue || ''
                            }
                        },
                        {   // TextInput sample with plain text input mode and FLOAT validation, character limit 7
                            id: 'sample_float_input_widget',
                            TextInput: {
                                title: 'Sample Float Input with PLAIN_TEXT Mode and Validation on Float, Character Limit 7',
                                fieldName: 'sample_float_input',
                                hint: 'Enter a float value here',
                                multiline: false,
                                // inputMode (CardService.TextInputMode.PLAIN_TEXT || CardService.TextInputMode.RICH_TEXT)
                                inputMode: CardService.TextInputMode.PLAIN_TEXT,
                                validation: {
                                    characterLimit: '7',
                                    // InputType.INTEGER || InputType.EMAIL || InputType.FLOAT || InputType.TEXT
                                    type: CardService.InputType.FLOAT
                                },
                                value: data.sampleFloatInputValue || ''
                            }
                        }
                    ]

                },
                {   // Data view
                    header: 'Data View',
                    collapsible: true,
                    numUncollapsibleWidgets: 0,
                    widgets: [
                        {   // Data View widget
                            id: 'data_view_widget',
                            TextParagraph: {
                                text: `Data: ${JSON.stringify(data, null, 2)}`,
                                maxLines: 35
                            }
                        }
                    ]
                }
            ],
            fixedFooter: {
                primaryButton: {
                    textButton: {
                        text: '🏠 Go to Home',
                        onClick: {
                            functionName: 'NavigationHandler.ViewModel.onPopToNamedCardClick',
                            parameters: { cardName: 'EMD.Cards.Home' }
                        }
                    }
                }
            }
        };
    }
}

EMD.GetMePlugin = {
    entityName: 'GetMePlugin',
    card: (data = {}) => {
        return {
            name: 'getMePlugin_Card',
            header: {
                title: '🤖 Get Me',
                subTitle: 'Basic Bot Operation',
                imageUrl: EMD.YOU_GOT_IT_IMG_URL,
                imageStyle: CardService.ImageStyle.SQUARE,
                imageAltText: 'Basic Bot Operation Image'
            },
            sections: [
                {   // Bot Configuration section
                    header: 'Telegram API Operations',
                    collapsible: false,
                    numUncollapsibleWidgets: 2,
                    widgets: [
                        {   // TextInput for bot token
                            id: 'bot_token_input_widget',
                            TextInput: {
                                title: '🤖 Your Bot Token',
                                hint: 'Enter your Bot Token, get it from @BotFather',
                                fieldName: 'txt_bot_api_token',
                                multiline: false,
                                inputMode: CardService.TextInputMode.PLAIN_TEXT,
                                value: data.botApiToken || ''
                            }
                        },
                        {   // TextButton to call getMe API
                            id: 'get_me_button',
                            TextButton: {
                                text: '🤖 Get Me',
                                onClick: {
                                    functionName: 'BotApiHandler.View.onGetMeClick',
                                    // List of widget IDs whose values are required for this action to be executed
                                    requiredWidgets: ['txt_bot_api_token']
                                }
                            }
                        }
                    ]
                },
                {  // Minify/Beautify JSON section
                    header: 'Useful JSON Tools',
                    collapsible: true,
                    numUncollapsibleWidgets: 2,
                    widgets: [
                        {  // TextParagraph widget
                            id: 'json_handler_text_paragraph',
                            TextParagraph: {
                                maxLines: 2,
                                text: 'These tools help you to beautify, minify, and validate JSON data. you receive from various sources. (client/server)\n\n'
                                    + 'Select the cell in the spreadsheet containing JSON data before using these tools.\n\n'
                                    + 'The current cell is the cell that has focus in the Google Sheets UI, and is highlighted by a dark border.\n\n'
                                    + 'There is never more than one current cell. If no cell is selected, there is no current cell. '
                            }
                        },
                        {   // TextButton to beautify JSON
                            id: 'beautify_json_button',
                            TextButton: {
                                text: '🎨 Beautify',
                                onClick: {
                                    functionName: 'JsonHandler.View.onBeautifyJsonClick'
                                }
                            }
                        },
                        {   // TextButton to minify JSON
                            id: 'minify_json_button',
                            TextButton: {
                                text: '🗜️ Minify',
                                onClick: {
                                    functionName: 'JsonHandler.View.onMinifyJsonClick'
                                }
                            }
                        },
                        {   // TextButton to validate JSON
                            id: 'validate_json_button',
                            TextButton: {
                                text: '✅ Validate',
                                onClick: {
                                    functionName: 'JsonHandler.View.onValidateJsonClick'
                                }
                            }
                        }
                    ]
                }
            ],
            fixedFooter: {
                primaryButton: {
                    textButton: {
                        disabled: true,
                        text: '💾 Save',
                        onClick: {
                            functionName: 'NavigationHandler.ViewModel.onPushCardClick',
                            parameters: { template: 'EMD.Cards.Home' }
                        }
                    }
                },
                secondaryButton: {
                    textButton: {
                        text: '❓ Need Help?',
                        onClick: {
                            functionName: 'NavigationHandler.ViewModel.onPushCardClick',
                            parameters: { template: 'EMD.Cards.Help' }
                        }
                    }
                }
            }
        };
    }
}

EMD.GetChatPlugin = {
    entityName: 'GetChatPlugin',
    card: (data = {}) => {
        return {
            name: 'getChatPlugin_Card',
            header: {
                title: '📢 Get Chat',
                subTitle: 'Get Chat full information by Chat ID',
                imageUrl: EMD.YOU_GOT_IT_IMG_URL,
                imageStyle: CardService.ImageStyle.SQUARE,
                imageAltText: 'Basic Bot Operation Image'
            },
            sections: [
                {   // Bot Configuration section
                    header: 'Telegram API Operations',
                    collapsible: false,
                    numUncollapsibleWidgets: 2,
                    widgets: [
                        {   // TextInput for bot token
                            id: 'bot_token_input_widget',
                            TextInput: {
                                title: '🤖 Your Bot Token',
                                hint: 'Enter your Bot Token, get it from @BotFather',
                                fieldName: 'txt_bot_api_token',
                                multiline: false,
                                inputMode: CardService.TextInputMode.PLAIN_TEXT,
                                value: data.botApiToken || ''
                            }
                        },
                        {   // TextInput for chat ID
                            id: 'chat_id_input_widget',
                            TextInput: {
                                title: '📢 Chat ID',
                                hint: 'Enter Chat ID, for channels use @channelusername',
                                fieldName: 'chat_id_input',
                                multiline: false,
                                inputMode: CardService.TextInputMode.PLAIN_TEXT,
                                value: data.chatId || ''
                            }
                        },
                        {   // TextButton to call getChat API
                            id: 'get_chat_button',
                            TextButton: {
                                text: '📢 Get Chat',
                                onClick: {
                                    functionName: 'ChannelsHandler.View.onGetChatClick',
                                    // List of widget IDs whose values are required for this action to be executed
                                    requiredWidgets: ['txt_bot_api_token', 'chat_id_input']
                                }
                            }
                        }
                    ]
                },
                {  // Minify/Beautify JSON section
                    header: 'Useful JSON Tools',
                    collapsible: true,
                    numUncollapsibleWidgets: 2,
                    widgets: [
                        {  // TextParagraph widget
                            id: 'json_handler_text_paragraph',
                            TextParagraph: {
                                maxLines: 1,
                                text: 'These tools help you to beautify, minify, and validate JSON data. you receive from various sources. (client/server)\n\n'
                                    + 'Select the cell in the spreadsheet containing JSON data before using these tools.\n\n'
                                    + 'The current cell is the cell that has focus in the Google Sheets UI, and is highlighted by a dark border.\n\n'
                                    + 'There is never more than one current cell. If no cell is selected, there is no current cell. '
                            }
                        },
                        {   // TextButton to beautify JSON
                            id: 'beautify_json_button',
                            TextButton: {
                                text: '🎨 Beautify',
                                onClick: {
                                    functionName: 'JsonHandler.View.onBeautifyJsonClick'
                                }
                            }
                        },
                        {   // TextButton to minify JSON
                            id: 'minify_json_button',
                            TextButton: {
                                text: '🗜️ Minify',
                                onClick: {
                                    functionName: 'JsonHandler.View.onMinifyJsonClick'
                                }
                            }
                        },
                        {   // TextButton to validate JSON
                            id: 'validate_json_button',
                            TextButton: {
                                text: '✅ Validate',
                                onClick: {
                                    functionName: 'JsonHandler.View.onValidateJsonClick'
                                }
                            }
                        }
                    ]
                }
            ],
            fixedFooter: {
                primaryButton: {
                    textButton: {
                        disabled: true,
                        text: '💾 Save',
                        onClick: {
                            functionName: 'NavigationHandler.ViewModel.onPushCardClick',
                            parameters: { template: 'EMD.Cards.Home' }
                        }
                    }
                },
                secondaryButton: {
                    textButton: {
                        text: '❓ Need Help?',
                        onClick: {
                            functionName: 'NavigationHandler.ViewModel.onPushCardClick',
                            parameters: { template: 'EMD.Cards.Help' }
                        }
                    }
                }
            }
        };
    }
}

EMD.BotConnections = {
    entityName: 'BotConnections',
    card: (data = {}) => {
        return {
            name: 'bot_connections_Card',
            header: {
                title: '🔗 Bot Connections'
            },
            sections: [
                {   // Bot Connections section
                    header: 'Manage your bot connections here.',
                    widgets: [
                        {   // Bot Connections TextParagraph widget
                            id: 'bot_connections_text_paragraph',
                            TextParagraph: {
                                text: 'Manage your bot connections here.'
                            }
                        },
                        {   // TextInput for bot token
                            id: 'bot_token_input_widget',
                            TextInput: {
                                title: '🤖 Your Bot Token',
                                hint: 'Enter your Bot Token, get it from @BotFather',
                                fieldName: 'txt_bot_api_token',
                                multiline: false,
                                inputMode: CardService.TextInputMode.PLAIN_TEXT,
                                value: data.botApiToken || ''
                            }
                        },
                        {   // text input for display name
                            id: 'display_name_input_widget',
                            TextInput: {
                                title: 'Display Name',
                                fieldName: 'display_name_input',
                                hint: 'Display Name',
                                multiline: false,
                                inputMode: CardService.TextInputMode.PLAIN_TEXT,
                                value: data.displayName || ''
                            }
                        }
                    ]
                }
            ],
            fixedFooter: {
                primaryButton: {
                    textButton: {
                        text: '💾 Save',
                        onClick: {
                            functionName: 'ConnectionHandler.ViewModel.onCreateBotConnectionClicked',
                            // List of widget IDs whose values are required for this action to be executed
                            requiredWidgets: ['bot_token_input', 'display_name_input']
                        }
                    }
                },
                secondaryButton: {
                    textButton: {
                        text: '❓ Need Help?',
                        onClick: {
                            functionName: 'NavigationHandler.ViewModel.onPushCardClick',
                            parameters: { template: 'EMD.Cards.Help' }
                        }
                    }
                }
            }
        };
    },
    sheet: (data = {}) => {
        return {
            name: '🔗 Bot Connections',
            columns: ['YOUR_BOT_TOKEN', 'DISPLAY_NAME'],
            sample_data: []
        };
    }
}

EMD.Cards = {
    Home: EMD.Home.card,
    Account: EMD.Account.card,
    Help: EMD.Help.card,
    About: EMD.About.card,
    CardSample: EMD.CardSample.card,
    BotConnections: EMD.BotConnections.card,
    BotSetup: EMD.BotSetup.card,
    Automation: EMD.Automation.card,
    WebhookSetup: EMD.WebhookSetup.card,
    CreateInvoiceLink: EMD.CreateInvoiceLink.card,
    MembershipSubscription: EMD.MembershipSubscription.card,
    ThankYou: EMD.ThankYou.card,
    GetMePlugin: EMD.GetMePlugin.card,
    GetChatPlugin: EMD.GetChatPlugin.card
}

EMD.Spreadsheet = {
    Logger: EMD.Logger.sheet,
    TerminalOutput: EMD.TerminalOutput.sheet,
    BotSetup: EMD.BotSetup.sheet,
    Automation: EMD.Automation.sheet,
    BasicAutomation: EMD.BasicAutomation.sheet,
    Customer: EMD.Customer.sheet,
    BotConnections: EMD.BotConnections.sheet
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EMD };
}
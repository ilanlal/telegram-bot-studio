// Entity Metadata Configuration Class
class EMD {
    constructor(model = {}) {
        this.model = model;
    }
}

EMD.DEFAULT_IMAGE_URL = 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/logo128.png';
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
EMD.LOGO_PNG_URL = 'https://raw.githubusercontent.com/ilanlal/telegram-bot-studio/main/assets/logo480.png';
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
                {   // Welcome section
                    // header: 'Welcome to your home',
                    collapsible: false,
                    numUncollapsibleWidgets: 0,
                    widgets: [
                        {  // Welcome TextParagraph widget
                            id: 'welcome_widget',
                            TextParagraph: {
                                maxLines: 4,
                                text: 'Welcome to Telegram Bot Studio! 🎉\n\n'
                                    + 'Enjoy building your Telegram bots with ease and efficiency!\n\n'
                                    + 'For more information, visit our [GitHub Repository](' + EMD.GIT_REPO_URL + ').'
                                    + '\n\nHappy Bot Building! 🤖🚀'
                            }
                        }
                    ]
                },
                {   // Common Actions section
                    header: 'Common Actions',
                    collapsible: false,
                    numUncollapsibleWidgets: 0,
                    widgets: [
                        {   // Common Bot Operations TextParagraph widget
                            id: 'common_bot_operations_widget',
                            TextParagraph: {
                                maxLines: 6,
                                text: 'Perform common bot operations using the button below.'
                            }
                        },
                        {  // DecoratedText with TextButton to push 'CommonBotOperations' card
                            id: 'common_bot_operations_button',
                            DecoratedText: {
                                text: 'Need help with common bot operations?',
                                bottomLabel: 'Click the button to insert sample data into your spreadsheet.',
                                wrapText: false,
                                textButton: {
                                    disabled: false,
                                    text: '💻',
                                    onClick: {
                                        functionName: 'NavigationHandler.ViewModel.onPushCardClick',
                                        parameters: { template: 'EMD.Cards.CommonBotOperations' }
                                    }
                                }
                            }
                        }
                    ]
                },
                {   // Webhook and Automation Setup section
                    header: 'Webhook and Automation Setup',
                    collapsible: false,
                    numUncollapsibleWidgets: 0,
                    widgets: [
                        {   // Webhook Setup widget
                            id: 'webhook_setup_widget',
                            TextParagraph: {
                                maxLines: 6,
                                text: 'Set up your bot webhook and basic automation using the buttons below.'
                            }
                        },
                        {  // DecoratedText with TextButton to push 'WebhookSetup' card
                            id: 'webhook_setup_button',
                            DecoratedText: {
                                text: 'Set up your bot webhook?',
                                bottomLabel: 'Click the button to open the webhook setup card.',
                                wrapText: false,
                                textButton: {
                                    disabled: false,
                                    text: '🌐',
                                    onClick: {
                                        functionName: 'NavigationHandler.ViewModel.onPushCardClick',
                                        parameters: { template: 'EMD.Cards.WebhookSetup' }
                                    }
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
                                text: `Version: ${data.packageInfo?.version || 'N/A'} (Build: ${data.packageInfo?.build || 'N/A'})`
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
                                text: `User is ${data.userInfo?.isPremium ? 'a Premium' : 'a Free'} user.`
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
            columns: ['Timestamp', 'Source', 'Message', 'Details', 'More Info'],
            sample_data: [
                [new Date().toISOString(), 'server', 'Hi there! This is your terminal output log.', 'No details', 'N/A']
            ]
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
                    {   // identify bot api token
                        // header: '🔑 Bot API Token',
                        collapsible: true,
                        numUncollapsibleWidgets: 1,
                        widgets: [
                            { // Bot token set state
                                id: 'bot_token_set_state',
                                TextParagraph: {
                                    text: `🔑 Bot Token currently: ${data.setupFlow?.botTokenSet ? '✅ Set' : '❌ Not Set'}`
                                }
                            },
                            { // Get Me Result
                                id: 'get_me_result',
                                TextParagraph: {
                                    text: JSON.stringify(data.getMeResult || {}, null, 2)
                                }
                            },
                            { // Bot Token input variable
                                id: 'bot_token_variable',
                                TextInput: {
                                    title: 'Bot API Token',
                                    fieldName: 'txt_bot_api_token',
                                    hint: 'Enter bot API token'
                                },
                                propertyName: EnvironmentModel.InputMeta.BOT_API_TOKEN
                            },
                            { // Identify Token Button
                                id: 'identify_token_button',
                                TextButton: {
                                    text: '🆔 Identify Token',
                                    onClick: {
                                        functionName: 'BotHandler.Addon.onIdentifyTokenClick'
                                    }
                                }
                            }
                        ]
                    },
                    {   // Deployment setup
                        // header: '🚀 Deployment Setup',
                        collapsible: true,
                        numUncollapsibleWidgets: 1,
                        widgets: [
                            {
                                id: 'deployment_id_info',
                                TextParagraph: {
                                    text: `🚀 Deployment ID is currently: ${data.environmentVariables?.deploymentIdSet ? '✅ Set' : '❌ Not Set'}`
                                }
                            },
                            {   // Production Deployment ID Variable
                                id: 'deployment_id_variable',
                                TextInput: {
                                    title: 'Production Deployment ID',
                                    fieldName: 'txt_deployment_id',
                                    hint: 'Enter production deployment ID'
                                },
                                propertyName: EnvironmentModel.InputMeta.DEPLOYMENT_ID
                            },
                            {   // Test Deployment ID Variable
                                id: 'test_deployment_id_variable',
                                TextInput: {
                                    title: 'Test Deployment ID',
                                    fieldName: 'txt_test_deployment_id',
                                    hint: 'Enter test deployment ID'
                                },
                                propertyName: EnvironmentModel.InputMeta.TEST_DEPLOYMENT_ID
                            },
                            { // Identify Deployment ID Button
                                id: 'identify_deployment_id_button',
                                TextButton: {
                                    text: '💾 Save Deployment ID',
                                    onClick: {
                                        functionName: 'EnvironmentHandler.Addon.onSaveDeploymentIdClick'
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
                                            functionName: 'BotHandler.Addon.onWebhookToggleClick',
                                            parameters: {
                                                action: data.setupFlow?.webhookSet ? 'deleteWebhook' : 'setWebhook',
                                                environment: 'exec'
                                            }
                                        }
                                    }
                                }
                            },
                            { // DecoratedText for test webhook action (set,delete)
                                id: 'test_webhook_action',
                                DecoratedText: {
                                    text: 'Test Webhook Action',
                                    topLabel: `🔗 Test Webhook Action`,
                                    bottomLabel: `${data.setupFlow?.webhookSet ? 'Delete or update your webhook' : 'Set up your webhook'}`,
                                    wrapText: false,
                                    textButton: {
                                        disabled: data.setupFlow?.webhookSet ? true : (data.environmentVariables?.testDeploymentIdSet ? false : true) || (data.environmentVariables?.botTokenSet ? false : true),
                                        text: `${data.setupFlow?.webhookSet ? '🗑️ Delete Webhook' : '📡 Set Webhook'}`,
                                        onClick: {
                                            functionName: 'BotHandler.Addon.onWebhookToggleClick',
                                            parameters: {
                                                action: data.setupFlow?.webhookSet ? 'deleteWebhook' : 'setWebhook',
                                                environment: 'test'
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
                                        functionName: 'BotHandler.Addon.onSetMyNameClick',
                                        parameters: {}
                                    }
                                }
                            },
                            {   // setMyDescription Button
                                id: 'bot_info_set_my_description_button',
                                TextButton: {
                                    text: '🌐 api/setMyDescription',
                                    onClick: {
                                        functionName: 'BotHandler.Addon.onSetMyDescriptionClick',
                                        parameters: {}
                                    }
                                }
                            },
                            {  // setMyShortDescription Button
                                id: 'bot_info_set_my_short_description_button',
                                TextButton: {
                                    text: '🌐 api/setMyShortDescription',
                                    onClick: {
                                        functionName: 'BotHandler.Addon.onSetMyShortDescriptionClick',
                                        parameters: {}
                                    }
                                }
                            },
                            {  // setMyCommands Button
                                id: 'bot_info_set_my_commands_button',
                                TextButton: {
                                    text: '🌐 api/setMyCommands',
                                    onClick: {
                                        functionName: 'BotHandler.Addon.onSetMyCommandsClick',
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
                ]
            ]
        }
    }
}

EMD.CommonBotOperations = {
    entityName: 'BasicBotOperation',
    card: (data = {}) => {
        return {
            name: 'basic_bot_operation_card',
            header: {
                title: 'Basic Bot Operation',
                subTitle: 'Perform basic bot operations and manage settings.',
                imageUrl: EMD.YOU_GOT_IT_IMG_URL,
                imageStyle: CardService.ImageStyle.SQUARE,
                imageAltText: 'Basic Bot Operation Image'
            },
            sections: [
                {   // Bot Configuration section
                    header: '#1. Bot Configuration',
                    collapsible: false,
                    numUncollapsibleWidgets: 0,
                    widgets: [
                        {   // TextParagraph widget
                            id: 'basic_bot_operation_text_paragraph',
                            TextParagraph: {
                                text: 'Use the input fields below to configure your basic bot settings.'
                            }
                        },
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
                        {   // TextButton to call getMe API
                            id: 'get_me_button',
                            TextButton: {
                                text: '🔍 Get Me',
                                onClick: {
                                    functionName: 'BotHandler.ViewModel.onGetMeClick'
                                }
                            }
                        }
                    ]
                },
                {   // Chat ID Configuration section
                    header: '#2. Chat ID Configuration',
                    collapsible: true,
                    numUncollapsibleWidgets: 0,
                    widgets: [
                        {   // TextInput for chat ID
                            id: 'chat_id_input_widget',
                            TextInput: {
                                title: 'Enter Chat ID, for channels use @channelusername',
                                fieldName: 'chat_id_input',
                                hint: 'Chat ID',
                                multiline: false,
                                inputMode: CardService.TextInputMode.PLAIN_TEXT,
                                value: data.chatId || ''
                            }
                        },
                        {   // TextButton to call getChat API
                            id: 'get_chat_button',
                            TextButton: {
                                text: '🔍 Get Chat',
                                onClick: {
                                    functionName: 'BotHandler.ViewModel.onGetChatClick'
                                }
                            }
                        }
                    ]

                },
                {   // Common Operations section
                    header: '#3. Common Operations',
                    collapsible: true,
                    numUncollapsibleWidgets: 3,
                    widgets: [
                        {   // TextParagraph widget
                            id: 'common_operations_text_paragraph',
                            TextParagraph: {
                                text: 'Use the buttons below to perform common bot operations.'
                            }
                        }
                    ]
                }
            ],
            fixedFooter: {
                primaryButton: {
                    text: 'Save Settings',
                    onClick: {
                        functionName: 'BotHandler.ViewModel.onSaveSettingsClick'
                    }
                }
            }
        };
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
            ]
        };
    }
}

EMD.Cards = {
    Home: EMD.Home.card,
    Account: EMD.Account.card,
    Help: EMD.Help.card,
    About: EMD.About.card,
    CardSample: EMD.CardSample.card,
    CommonBotOperations: EMD.CommonBotOperations.card,
    WebhookSetup: EMD.WebhookSetup.card,
    BotSetup: EMD.BotSetup.card
}

EMD.Spreadsheet = {
    Logger: EMD.Logger.sheet,
    TerminalOutput: EMD.TerminalOutput.sheet,
    BotSetup: EMD.BotSetup.sheet
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EMD };
}
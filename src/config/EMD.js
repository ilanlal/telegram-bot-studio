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
                        },
                        {   // DecoratedText with TextButton to push 'AutomationSetup' card
                            id: 'automation_setup_button',
                            DecoratedText: {
                                text: 'Set up your automation workflows?',
                                bottomLabel: 'Click the button to open the automation setup card.',
                                wrapText: false,
                                textButton: {
                                    disabled: false,
                                    text: '🤖',
                                    onClick: {
                                        functionName: 'NavigationHandler.ViewModel.onPushCardClick',
                                        parameters: { template: 'EMD.Cards.Automation' }
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
                    header: 'Step 1. Bot Configuration',
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
                                    functionName: 'BotHandler.View.onGetMeClick'
                                }
                            }
                        }
                    ]
                },
                {   // Chat ID Configuration section
                    header: 'Step 2. Chat ID Configuration',
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
                                    functionName: 'ChannelsHandler.View.onGetChatClick'
                                }
                            }
                        }
                    ]
                },
                {   // Send Test Message section
                    header: 'Send Test Message',
                    collapsible: true,
                    numUncollapsibleWidgets: 3,
                    widgets: [
                        {   // TextParagraph widget
                            id: 'send_test_message_text_paragraph',
                            TextParagraph: {
                                text: 'Use the buttons below to send a test message to the specified chat ID.'
                            }
                        },
                        {   // decorated text for sending test message
                            id: 'send_test_message_decorated_text',
                            DecoratedText: {
                                text: 'Send Test Message',
                                topLabel: '📨 Send a test message to the specified chat ID',
                                wrapText: false,
                                textButton: {
                                    disabled: (data.botToken && data.chatId) ? false : true,
                                    text: '📨 Send Message',
                                    onClick: {
                                        functionName: 'BotHandler.View.onSendTestMessageClick'
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
    displayName: 'Automation',
    pluralDisplayName: 'Automations',
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
    displayName: 'Basic Automation',
    pluralDisplayName: 'Basic Automations',
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
    BotSetup: EMD.BotSetup.card,
    Automation: EMD.Automation.card
}

EMD.Spreadsheet = {
    Logger: EMD.Logger.sheet,
    TerminalOutput: EMD.TerminalOutput.sheet,
    BotSetup: EMD.BotSetup.sheet,
    Automation: EMD.Automation.sheet,
    BasicAutomation: EMD.BasicAutomation.sheet,
    Customer: EMD.Customer.sheet
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EMD };
}
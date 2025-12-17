// Entity Metadata Configuration Class
class EMD {
    constructor(model = {}) {
        this.model = model;
    }
}

EMD.DEFAULT_IMAGE_URL = 'https://raw.githubusercontent.com/ilanlal/basic-telegram-bot-remastered/main/assets/logo480.png';
EMD.WELCOME_IMG_URL = 'https://raw.githubusercontent.com/ilanlal/basic-telegram-bot-remastered/main/assets/bitmoji-20190109115847.webp';
EMD.HELP_IMG_URL = 'https://raw.githubusercontent.com/ilanlal/basic-telegram-bot-remastered/main/assets/bitmoji-20190109115939.webp';
EMD.ABOUT_IMG_URL = 'https://raw.githubusercontent.com/ilanlal/basic-telegram-bot-remastered/main/assets/bitmoji-20190528070537.webp';
EMD.MATH_IMG_URL = 'https://raw.githubusercontent.com/ilanlal/basic-telegram-bot-remastered/main/assets/bitmoji-20190109115604.webp';
EMD.SUPPORT_IMG_URL = 'https://raw.githubusercontent.com/ilanlal/basic-telegram-bot-remastered/main/assets/bitmoji-20190109120015.webp';
EMD.THANK_YOU_IMG_URL = 'https://raw.githubusercontent.com/ilanlal/basic-telegram-bot-remastered/main/assets/bitmoji-20190109115743.webp';
EMD.YOU_GOT_IT_IMG_URL = 'https://raw.githubusercontent.com/ilanlal/basic-telegram-bot-remastered/main/assets/bitmoji-20190528070739.webp';
EMD.BIG_TIME_IMG_URL = 'https://raw.githubusercontent.com/ilanlal/basic-telegram-bot-remastered/main/assets/bitmoji-20190528070720.webp';
EMD.PEACH_IMG_URL = 'https://raw.githubusercontent.com/ilanlal/basic-telegram-bot-remastered/main/assets/bitmoji-20190109115654.webp';
EMD.HAVE_A_NICE_DAY_IMG_URL = 'https://raw.githubusercontent.com/ilanlal/basic-telegram-bot-remastered/main/assets/bitmoji-20190528070956.webp';
EMD.I_AM_THINKING_IMG_URL = 'https://raw.githubusercontent.com/ilanlal/basic-telegram-bot-remastered/main/assets/bitmoji-20190109115627.webp';
EMD.WAIT_FOR_IT_IMG_URL = 'https://raw.githubusercontent.com/ilanlal/basic-telegram-bot-remastered/main/assets/bitmoji-20190528070537.webp';
EMD.YES_IMG_URL = 'https://raw.githubusercontent.com/ilanlal/basic-telegram-bot-remastered/main/assets/bitmoji-20190528070629.webp';
EMD.PAY_ATTENTION_IMG_URL = 'https://raw.githubusercontent.com/ilanlal/basic-telegram-bot-remastered/main/assets/bitmoji-20190528070905.webp';
EMD.KISS_IMG_URL = 'https://raw.githubusercontent.com/ilanlal/basic-telegram-bot-remastered/main/assets/bitmoji-20190109115813.webp';
EMD.CHEERS_IMG_URL = 'https://raw.githubusercontent.com/ilanlal/basic-telegram-bot-remastered/main/assets/bitmoji-20190109115847.webp';
EMD.BLINK_IMG_URL = 'https://raw.githubusercontent.com/ilanlal/basic-telegram-bot-remastered/main/assets/bitmoji-20190109115905.webp';
EMD.LOGO_PNG_URL = 'https://raw.githubusercontent.com/ilanlal/basic-telegram-bot-remastered/main/assets/logo480.png';
EMD.GIT_REPO_URL = 'https://github.com/ilanlal/basic-telegram-bot-remastered';

EMD.Home = {
    entityName: 'Home',
    card: (data = {}) => {
        return {
            name: 'homeCard',
            header:
            {
                title: '🏠 Home',
                subTitle: 'Welcome to your home',
                imageUrl: EMD.DEFAULT_IMAGE_URL,
                imageStyle: CardService.ImageStyle.SQUARE,
                imageAltText: 'Home Image'
            },
            sections: [
                {  // Environment variables section
                    //header: 'Environment Variables',
                    collapsible: true,
                    numUncollapsibleWidgets: 1,
                    widgets: [
                        {   // Environment variables widget
                            id: 'environment_variables_widget',
                            DecoratedText: {
                                text: data?.environmentTraffic || 'Configure your environment variables to get started',
                                topLabel: 'Step #1: Environment Variables',
                                bottomLabel: 'Click 🔩 to manage your environment variables',
                                wrapText: false,
                                textButton: {
                                    disabled: false,
                                    text: '🔩',
                                    onClick: {
                                        functionName: 'CardHandler.Addon.onOpenCardClick',
                                        parameters: {
                                            card: 'EMD.Cards.EnvironmentVariables'
                                        }
                                    }
                                }
                            }
                        }
                    ]
                },
                {   // Bot Setup Section
                    // header: 'Telegram Bot Setup',
                    collapsible: true,
                    numUncollapsibleWidgets: 1,
                    widgets: [
                        {   // Bot setup widget
                            id: 'bot_setup_widget',
                            DecoratedText: {
                                text: 'Step #2: Setup Your Bot',
                                topLabel: '📡 Bot Setup',
                                bottomLabel: 'Click on 🤖 to setup your bot API token, set bot info & webhook',
                                wrapText: false,
                                textButton: {
                                    disabled: false,
                                    text: '🤖',
                                    onClick: {
                                        functionName: 'CardHandler.Addon.onOpenCardClick',
                                        parameters: { card: 'EMD.Cards.BotSetup' }
                                    }
                                }
                            }
                        }
                    ]
                },
                {   // Automation Section
                    // header: 'Automation',
                    collapsible: true,
                    numUncollapsibleWidgets: 1,
                    widgets: [
                        {   // Automation management widget
                            id: 'automation_management_widget',
                            DecoratedText: {
                                text: 'Automation - Workflow Management',
                                topLabel: `Total: ${data?.totalAutomations || 0} workflows`,
                                bottomLabel: 'Click ⚡ to manage your automations',
                                wrapText: false,
                                textButton: {
                                    disabled: false,
                                    text: '⚡',
                                    onClick: {
                                        functionName: 'CardHandler.Addon.onOpenCardClick',
                                        parameters: { card: 'EMD.Cards.Automation' }
                                    }
                                }
                            }
                        }
                    ]
                },
                {   // Channel Management Section
                    // header: 'Channel Management',
                    collapsible: true,
                    numUncollapsibleWidgets: 1,
                    widgets: [
                        {  // Channel management widget
                            id: 'channel_management_widget',
                            DecoratedText: {
                                text: 'Channels: Manage Your Bot Channels',
                                topLabel: `Total: ${data?.totalChannels || 0} channels`,
                                bottomLabel: 'Click 📢 to manage your bot channels',
                                wrapText: false,
                                textButton: {
                                    disabled: false,
                                    text: '📢',
                                    onClick: {
                                        functionName: 'CardHandler.Addon.onOpenCardClick',
                                        parameters: { card: 'EMD.Cards.Channels' }
                                    }
                                }
                            }
                        }
                    ]
                },
                { // Customer Management Section
                    // header: 'Customer Management',
                    collapsible: true,
                    numUncollapsibleWidgets: 1,
                    widgets: [
                        {  // Customer management widget
                            id: 'customer_management_widget',
                            DecoratedText: {
                                text: 'CRM: Manage Your Customers',
                                topLabel: `Total: ${data?.totalCustomer || 0} customers`,
                                bottomLabel: 'Click 👥 to manage your customers (telegram users)',
                                wrapText: false,
                                textButton: {
                                    disabled: false,
                                    text: '👥',
                                    onClick: {
                                        functionName: 'CardHandler.Addon.onOpenCardClick',
                                        parameters: { card: 'EMD.Cards.Customer' }
                                    }
                                }
                            }
                        }
                    ]
                },
                { // Data view
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

EMD.Help = {
    entityName: 'Help',
    card: (data = {}) => {
        return {
            name: 'help_Card',
            header: {
                title: 'Help & Support',
                subTitle: 'Get help and support for this Addon.',
                imageUrl: EMD.HELP_IMG_URL,
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
                imageUrl: EMD.I_AM_THINKING_IMG_URL,
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
                imageUrl: EMD.BLINK_IMG_URL,
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
            name: '💻 Terminal Output'
        };
    }
}


EMD.Cards = {
    Home: EMD.Home.card,
    Account: EMD.Account.card,
    Help: EMD.Help.card,
    About: EMD.About.card
}

EMD.Spreadsheet = {
    Logger: EMD.Logger.sheet,
    TerminalOutput: EMD.TerminalOutput.sheet
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EMD };
}
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
    WebhookSetup: EMD.WebhookSetup.card
}

EMD.Spreadsheet = {
    Logger: EMD.Logger.sheet,
    TerminalOutput: EMD.TerminalOutput.sheet
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EMD };
}
require('../tests');
const { doGet, onOpen, onInstall, doPost } = require('./Code');

describe('doGet', () => {
    it('should run doGet message handler', () => {
        const event = {}; // Mock event object
        const response = doGet(event);
        expect(response).toBeDefined();
    });
});

describe('doPost', () => {
    // onInstall and onOpen are needed for completeness
    it('should run doPost without errors', () => {
        PropertiesService.getScriptProperties().setProperty('txt_bot_api_token', 'DUMMY_BOT_TOKEN');

        const event = {
            postData: {
                contents: JSON.stringify({
                    message: {
                        from: { id: 67890, is_bot: false, first_name: 'TestUser' },
                        chat: { id: 12345 },
                        text: '/start',
                        entities: [{ type: 'bot_command', offset: 0, length: 6 }]
                    }
                })
            }
        }; // Mock event object
        expect(() => {
            doPost(event);
        }).not.toThrow();
    });
});

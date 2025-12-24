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
        const event = {
            postData: JSON.stringify({
                contents: {
                    message: {
                        from: { id: 5678, is_bot: false, first_name: 'Test User' },
                        chat: { id: 5678, first_name: 'Test User', type: 'private' },
                        date: 1700000000,
                        text: '/start'
                    }
                }
            })
        }; // Mock event object
        expect(() => {
            doPost(event);
        }).not.toThrow();
    });
});

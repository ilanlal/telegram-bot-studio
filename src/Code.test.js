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
    it('should run onInstall without errors', () => {
        const event = {
            postData: { contents: '{}' } 
        }; // Mock event object
        expect(() => {
            doPost(event);
        }).not.toThrow();
    });
});

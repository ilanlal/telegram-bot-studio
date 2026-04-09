require('../tests');
const { doGet, onInstall, onOpen } = require('./Code');

describe('doGet', () => {
    // mock HtmlService for testing
    global.HtmlService = {
        createHtmlOutput: (html) => ({
            getContent: () => html,
            setTitle: () => ({ getContent: () => html, setTitle: () => ({ getContent: () => html }) })
        })
    };


    it('should run doGet message handler', () => {
        const e = {}; // Mock event object
        const response = doGet(e);
        expect(response).toBeDefined();
    });

    it('should return HTML output', () => {
        const e = {}; // Mock event object
        const response = doGet(e);
        expect(response.getContent()).toContain('<h1>Telegram Bot Studio (TBS)</h1>');
    });

    // onInstall and onOpen tests can be added here if they have any logic to test
    it('should run onInstall without errors', () => {
        const e = {}; // Mock event object
        expect(() => onInstall(e)).not.toThrow();
    });

    it('should run onOpen without errors', () => {
        const e = {}; // Mock event object
        expect(() => onOpen(e)).not.toThrow();
    });

});

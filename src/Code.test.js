require('../tests');
const { doGet, onOpen, onInstall } = require('./Code');

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
        const event = {}; // Mock event object
        expect(() => {
            onInstall(event);
        }).not.toThrow();
    });

    it('should run onOpen without errors', () => {
        const event = {}; // Mock event object
        expect(() => {
            onOpen(event);
        }).not.toThrow();
    });
});

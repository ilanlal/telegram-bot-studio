require('../tests');
const { doGet, onInstall, onOpen } = require('./Code');

describe('doGet', () => {
    it('should run doGet message handler', () => {
        const e = {}; // Mock event object
        const response = doGet(e);
        expect(response).toBeDefined();
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

require('../../../tests');
const { AppModel } = require('./AppModel');
const { SheetModel } = require('./SheetModel');
const { EMD } = require('../../config/EMD');

describe('AppModel', () => {
    /** @type {AppModel} */
    let appModel;
    
    beforeEach(() => {
        appModel = AppModel.create(
            PropertiesService.getDocumentProperties(),
            PropertiesService.getUserProperties(),
            PropertiesService.getScriptProperties()
        );
    });

    test('should create a AppModel instance', () => {
        expect(appModel).toBeInstanceOf(AppModel);
    });

    test('should get membership info', () => {
        const membershipInfo = appModel.toJSON();
        expect(membershipInfo).toBeDefined();
        expect(membershipInfo.isPremium).toBe(false);
        expect(membershipInfo.expiresAt).toBeNull();
    });

    test('should get package info', () => {
        const packageInfo = appModel.toJSON();
        expect(packageInfo).toBeDefined();
        expect(packageInfo.version).toBeDefined();
        expect(packageInfo.gitRepository).toBeDefined();
    });

    test('toJSON should return correct structure', () => {
        const json = appModel.toJSON();
        expect(json).toHaveProperty('isPremium');
        expect(json).toHaveProperty('balance');
        expect(json).toHaveProperty('expiresAt');
        expect(json).toHaveProperty('version');
        expect(json).toHaveProperty('build');
        expect(json).toHaveProperty('author');
        expect(json).toHaveProperty('license');
        expect(json).toHaveProperty('gitRepository');
    });
});
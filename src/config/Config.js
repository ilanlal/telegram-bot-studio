// Deprecated: Use package.json for versioning and metadata
class Config {
    static get version() { return '1.2.0'; }
    static get build() { return '20251217.084500'; }
    static get author() { return 'Ilan Laloum <ilanlal@gmail.com>'; }
    static get license() { return 'MIT'; }
    static get repository() { return 'https://github.com/ilanlal/basic-telegram-bot-remastered'; }
    static getVersion() { return Config.version; }
    static getBuild() { return Config.build; }
    static getAuthor() { return Config.author; }
    static getLicense() { return Config.license; }
    static getRepository() { return Config.repository; }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Config };
}
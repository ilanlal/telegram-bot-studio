const { Config } = require('./Config');
const { EMD } = require('./EMD');
const { Plugins } = require('./Plugins');

// Expose globally for easy access in other modules
global.EMD = EMD;
global.Config = Config;
global.Plugins = Plugins;
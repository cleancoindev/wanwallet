"use strict";

const settings = require('../settings.js');
const Logger = require('./logger.js');
const path = require('path');
const fs = require('fs');
let config;
if (settings.network === 'testnet') {
    config = require('./config_testnet.js');
} else {
    config = require('./config_main.js');
}
config.version = '1.0.0';
config.host = '// http://localhost'; // http://localhost
config.rpcIpcPath = settings.rpcIpcPath;


config.keyStorePath = settings.getKeystoreDir('wanchain');
config.ethkeyStorePath = settings.getKeystoreDir('ethereum');


config.useLocalNode = true;

config.loglevel = settings.loglevel;

config.listOption = true;

function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}

mkdirsSync(config.databasePathPrex);
config.logger = new Logger('CrossChain', config.ccLog, config.ccErr, config.loglevel);
config.getLogger = function (name) {
    return new Logger(name, config.ccLog, config.ccErr, config.loglevel);
}

config.wanKeyStorePath = config.keyStorePath;
config.ethKeyStorePath = config.ethkeyStorePath;

config.ethGasPrice = 60;
config.wanGasPrice = 200;
config.ethNormalGas = 30000;//21004
config.ethLockGas = 200000; //171866;
config.ethRefundGas = 120000;  // 91663;
config.ethRevokeGas = 100000; // 40323;

config.wanLockGas = 300000; // 232665;
config.wanRefundGas = 120000; // 34881;
config.wanRevokeGas = 100000; // 49917;

config.crossDbname = 'crossTransDb2.1';
config.crossCollection = 'crossTrans';             // E20 & ETH
// config.crossCollectionBtc = 'crossTransBtc';
config.normalCollection = 'normalTrans';

config.consoleColor = {
    'COLOR_FgRed': '\x1b[31m',
    'COLOR_FgYellow': '\x1b[33m',
    'COLOR_FgGreen': "\x1b[32m"
};

module.exports = config;

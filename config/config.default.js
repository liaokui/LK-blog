/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1583825967682_9264';

  // add your middleware config here
  config.middleware = [];

  config.security = {
    csrf: {
      enable: true,
      ignoreJSON: true,
    },
    // 允许访问接口的白名单
    // domainWhiteList: [ '*' ], // ['http://localhost:8080']
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  const mongoose = {
    clients: {
      lkblog: {
        // url: 'mongodb://127.0.0.1:27017/lkblog',
        url: 'mongodb://150.109.105.237:27017/lkblog',
        options: {
          user: 'lkblogUser', // 数据库账号
          pass: '123456', // 数据库密码
          useUnifiedTopology: true,
        },
      },
    },
  };
  const user = { // 初始化后台管理管理员的账号
    userName: 'admin',
    password: 'admin',
  };
  const session = {
    maxAge: 3600 * 1000,
  };
  const jwt = {
    cert: 'liaokui', // jwt秘钥
  };
  const multipart = {
    fileSize: '50mb',
    mode: 'stream',
    // will append to whilelist
    fileExtensions: [ '.xls', '.txt', '.epub' ],
  };

  return {
    ...config,
    ...userConfig,
    mongoose,
    user,
    session,
    jwt,
    multipart,
  };
};

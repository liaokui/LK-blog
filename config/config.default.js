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
      enable: false,
      ignoreJSON: true,
    },
    // 允许访问接口的白名单
    domainWhiteList: [ '*' ], // ['http://localhost:8080']
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  const mongoose = {
    clients: {
      blog: {
        url: 'mongodb://127.0.0.1/blog',
        options: {
          // user: 'test', // 数据库账号
          // pass: 'test'  // 数据库密码
        },
      },
    },
  };
  const user = { // 初始化管理员的账号
    userName: 'admin',
    password: 'admin',
  };
  const session = {
    maxAge: 3600 * 1000,
  };
  const jwt = {
    cert: 'huanggegehaoshuai', // jwt秘钥
  };

  return {
    ...config,
    ...userConfig,
    mongoose,
    user,
    session,
    jwt,
  };
};

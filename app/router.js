'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // 客户端首页
  router.get('/', controller.page.index);

  // 后台管理首页
  router.get('/admin', controller.page.admin);

  // 接口api
  // 验证验证码
  router.get('/api/getCaptcha', controller.login.getCaptcha);
  // 登录
  router.post('/api/login', controller.login.login);
};

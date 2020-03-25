'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;

  // 后台授权中间件
  const auth = app.middleware.auth();

  // 客户端首页
  // router.get('/', controller.page.index);

  // 后台管理首页
  // router.get('/admin', controller.page.admin);

  // 接口api
  // 验证验证码
  router.get('/api/getCaptcha', controller.login.getCaptcha);
  // 登录
  router.post('/api/login', controller.login.login);

  // 上传
  router.get('/api/test', auth, controller.test.index);
  router.post('/api/upload', controller.upload.index);
  // router.resources('file', '/api/upload', controller.upload.index);
};

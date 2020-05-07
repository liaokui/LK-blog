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
  router.post('/api/upload', auth, controller.upload.index);

  // 标签
  router.get('/api/tag/find', auth, controller.tag.find);
  router.post('/api/tag/create', auth, controller.tag.create);
  router.post('/api/tag/remove', auth, controller.tag.remove);

  // 留言
  router.get('/api/message/find', auth, controller.message.find);
  router.post('/api/message/create', controller.message.create);
  router.post('/api/message/remove', auth, controller.message.remove);

  // 文章
  router.get('/api/article/find', controller.article.find);
  router.get('/api/article/detail', controller.article.detail);
  router.post('/api/article/create', auth, controller.article.create);
  router.post('/api/article/update', auth, controller.article.update);
  router.post('/api/article/remove', auth, controller.article.remove);
  router.post('/api/article/publish', auth, controller.article.publish);

  // 项目
  router.get('/api/project/find', controller.project.find);
  router.get('/api/project/detail', controller.project.detail);
  router.post('/api/project/create', auth, controller.project.create);
  router.post('/api/project/update', auth, controller.project.update);
  router.post('/api/project/remove', auth, controller.project.remove);
  router.post('/api/project/publish', auth, controller.project.publish);

  // 统计
  router.get('/api/statistics/amount', auth, controller.statistics.amount);
  router.get('/api/statistics/hostTag', auth, controller.statistics.hostTag);
};

'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {

  async getCaptcha() {
    const { ctx } = this;
    const captcha = await ctx.service.login.getCaptcha();

    // 把生成的验证码文本信息（如：t8ec），存入session，以待验证
    ctx.session.code = captcha.text;
    // 将生成的验证码svg图片返回给前端
    ctx.body = captcha.data;
  }

  async login() {
    const { ctx } = this;
    const { username, password, code } = ctx.request.body;
    const resMsg = {
      errcode: 0,
      data: {},
      msg: '登录成功',
    };
    const isCaptchaVali = ctx.service.login.checkCaptcha(code);
    console.log(isCaptchaVali);
    if (!isCaptchaVali) {
      resMsg.errcode = 1;
      resMsg.msg = '验证码错误';
      ctx.body = resMsg;
      return;
    }
    // 验证码正确则继续登录操作
    const userData = await ctx.service.login.login({ username, password });
    if (!userData) {
      resMsg.errcode = 2;
      resMsg.msg = '用户名或密码错误';
      ctx.body = resMsg;
      return;
    }
    resMsg.token = userData.token;
    resMsg.data = {
      username: userData.user.userName,
      uid: userData.user._id,
    };
    ctx.body = resMsg;
  }

}

module.exports = LoginController;

'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');

class MessageController extends Controller {
  // 列表
  async find() {
    const { ctx } = this;
    const { pageSize = 10, pageNumber = 1, keyword = '' } = ctx.query;
    const resMsg = {
      status: 'success',
      data: {},
      msg: '获取列表成功',
    };
    const list = await ctx.service.message.getList(parseInt(pageSize), parseInt(pageNumber), keyword);
    resMsg.data = {
      list: list.list,
      count: list.count,
    };
    ctx.body = resMsg;
  }

  // 创建
  async create() {
    const { ctx } = this;
    const { nickname, email, message, code } = ctx.request.body;
    const resMsg = {
      status: 'success',
      data: {},
      msg: '留言成功',
    };
    const isCaptchaVali = ctx.service.login.checkCaptcha(code);
    if (!isCaptchaVali) {
      resMsg.status = 'error';
      resMsg.msg = '验证码错误';
      ctx.body = resMsg;
      return;
    }
    if (!nickname || !email || !message) {
      resMsg.status = 'error';
      resMsg.msg = '请填写完整的留言信息';
      ctx.body = resMsg;
      return;
    }
    const res = await ctx.service.message.create();
    if (!res.id) {
      resMsg.msg = '留言失败';
      resMsg.status = 'error';
    } else {
      resMsg.data.id = res.id;
    }
    ctx.body = resMsg;
  }

  // 删除
  async remove() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    const resMsg = {
      status: 'success',
      data: {},
      msg: '删除成功',
    };
    const res = await ctx.service.message.delete(id);
    if (res.n === 0) {
      resMsg.msg = '留言id不存在';
      resMsg.status = 'error';
    }
    ctx.body = resMsg;
  }
}

module.exports = MessageController;

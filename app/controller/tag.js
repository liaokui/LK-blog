'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');

class TagController extends Controller {
  async find() {
    const { ctx } = this;
    const resMsg = {
      status: 'success',
      data: {},
      msg: '获取列表成功',
    };
    const decode = jwt.verify(ctx.get('Authorization'), ctx.app.config.jwt.cert);
    const list = await ctx.service.tag.getList(decode ? decode.id : null);
    resMsg.data = list;
    ctx.body = resMsg;
  }
  async create() {
    const { ctx } = this;
    const { tagName } = ctx.request.body;
    const resMsg = {
      status: 'success',
      data: {},
      msg: '添加成功',
    };
    const isNew = await ctx.service.tag.checkDuplicate(tagName);
    if (!isNew) {
      resMsg.msg = '该标签已存在';
      resMsg.status = 'error';
    } else {
      const res = await ctx.service.tag.create(tagName);
      if (!res.id) {
        resMsg.msg = '添加失败';
        resMsg.status = 'error';
      }
    }
    ctx.body = resMsg;
  }
  async remove() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    const resMsg = {
      status: 'success',
      data: {},
      msg: '删除成功',
    };
    const res = await ctx.service.tag.delete(id);
    if (res.n === 0) {
      resMsg.msg = '标签id不存在';
      resMsg.status = 'error';
    }
    ctx.body = resMsg;
  }
}

module.exports = TagController;

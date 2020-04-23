'use strict';

const Controller = require('egg').Controller;

class ProjectController extends Controller {
  // 查询列表
  async find() {
    const { ctx } = this;
    const { pageSize = 10, pageNumber = 1, keyword = '', status = [ 0, 1 ] } = ctx.query;
    const resMsg = {
      status: 'success',
      data: {},
      msg: '获取列表成功',
    };
    const list = await ctx.service.project.getList(parseInt(pageSize), parseInt(pageNumber), keyword, status);
    resMsg.data = {
      list: list.list,
      count: list.count,
    };
    ctx.body = resMsg;
  }
  // 查询详情
  async detail() {
    const { ctx } = this;
    const { id } = ctx.query;
    const resMsg = {
      status: 'success',
      data: {},
      msg: '查询成功',
    };
    const list = await ctx.service.project.getDetail(id);
    if (list.length <= 0) {
      resMsg.status = 'error';
      resMsg.msg = '查询失败';
    } else {
      resMsg.data = list[0];
    }
    ctx.body = resMsg;
  }
  // 创建
  async create() {
    const { ctx } = this;
    const { title, introduction, tagId, cover, content } = ctx.request.body;
    const resMsg = {
      status: 'success',
      data: {},
      msg: '创建成功',
    };
    if (!title || !introduction || !tagId || !cover || !content) {
      resMsg.status = 'error';
      resMsg.msg = '请填写完整的项目信息';
      return;
    }
    const res = await ctx.service.project.create();
    if (!res.id) {
      resMsg.msg = '创建失败';
      resMsg.status = 'error';
    } else {
      resMsg.data.id = res.id;
    }
    ctx.body = resMsg;
  }
  // 更新
  async update() {
    const { ctx } = this;
    const { id, title, introduction, tagId, cover, content } = ctx.request.body;
    const resMsg = {
      status: 'success',
      data: {},
      msg: '更新成功',
    };
    if (!title || !introduction || !tagId || !cover || !content) {
      resMsg.status = 'error';
      resMsg.msg = '请填写完整的项目信息';
      return;
    }
    const res = await ctx.service.project.update(id);
    if (res.n === 0) {
      resMsg.msg = '更新失败';
      resMsg.status = 'error';
    }
    resMsg.data.id = res.id;
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
    const res = await ctx.service.project.delete(id);
    if (res.n === 0) {
      resMsg.msg = '项目id不存在';
      resMsg.status = 'error';
    }
    ctx.body = resMsg;
  }
  // 发布 or 撤销发布
  async publish() {
    const { ctx } = this;
    const { id, status } = ctx.request.body;
    const resMsg = {
      status: 'success',
      data: {},
      msg: '发布成功',
    };
    const res = await ctx.service.project.publish(id);
    if (res.n === 0) {
      if (status === 1) {
        resMsg.msg = '发布失败';
      } else {
        resMsg.msg = '撤销失败';
      }
      resMsg.status = 'error';
    }
    if (status === 0) {
      resMsg.msg = '撤销成功';
    }
    resMsg.data.id = res.id;
    ctx.body = resMsg;
  }
}

module.exports = ProjectController;

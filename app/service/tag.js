'use strict';

const Service = require('egg').Service;

class TagService extends Service {

  // 添加
  async create(tagName) {
    const { ctx } = this;
    return await ctx.model.Tag.create({ tagName, userId: ctx.userId });
  }
  // 检查重复
  async checkDuplicate(tagName) {
    const { ctx } = this;
    const res = await ctx.model.Tag.find({ tagName });
    return res.length === 0;
  }

  // 获取列表
  async getList() {
    const { ctx } = this;
    console.log(ctx.userId);
    const res = await ctx.model.Tag.find({ userId: ctx.userId });
    return res;
  }

  // 删除
  async delete(id) {
    const { ctx } = this;
    return await ctx.model.Tag.remove({ _id: id });
  }
}

module.exports = TagService;

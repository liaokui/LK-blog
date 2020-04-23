'use strict';

const Service = require('egg').Service;

class MessageService extends Service {

  // 添加
  async create() {
    const { ctx } = this;
    return await ctx.model.Message.create({
      nickname: ctx.request.body.nickname,
      email: ctx.request.body.email,
      message: ctx.request.body.message,
      createTime: Date(),
    });
  }

  // 获取列表
  async getList(pageSize, pageNumber, keyword) {
    const { ctx } = this;
    const reg = new RegExp(keyword, 'i');
    const count = await ctx.model.Message.countDocuments();
    const list = await ctx.model.Message.find({ $or: [{ nickname: { $regex: reg } }, { email: { $regex: reg } }] }).limit(pageSize).skip((pageNumber - 1) * pageSize)
      .sort({ createTime: -1 });
    return {
      list,
      count,
    };
  }

  // 删除
  async delete(id) {
    const { ctx } = this;
    return await ctx.model.Message.remove({ _id: id });
  }

}

module.exports = MessageService;

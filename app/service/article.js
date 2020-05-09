'use strict';

const Service = require('egg').Service;

class ArticleService extends Service {
  // 获取列表
  async getList(pageSize, pageNumber, keyword, status) {
    const { ctx } = this;
    const reg = new RegExp(keyword, 'i');
    const count = await ctx.model.Article.countDocuments();
    const list = await ctx.model.Article.find({ status, $or: [{ title: { $regex: reg } }, { author: { $regex: reg } }] }).limit(pageSize).skip((pageNumber - 1) * pageSize)
      .populate([ 'tagId' ])
      .sort({ createTime: -1 });
    return {
      list,
      count,
    };
  }

  // 获取详情
  async getDetail(id) {
    const { ctx } = this;
    const params = {};
    params._id = id;
    if (ctx.query.status) {
      params.status = ctx.query.status;
    }
    return await ctx.model.Article.find(params).populate([ 'tagId' ]);
  }

  // 创建
  async create() {
    const { ctx } = this;
    return await ctx.model.Article.create({
      title: ctx.request.body.title,
      author: ctx.request.body.author,
      tagId: ctx.request.body.tagId,
      cover: ctx.request.body.cover,
      content: ctx.request.body.content,
      status: 0,
      createTime: Date(),
      updateTime: Date(),
    });
  }

  // 更新
  async update(id) {
    const { ctx } = this;
    return await ctx.model.Article.update({ _id: id }, {
      title: ctx.request.body.title,
      author: ctx.request.body.author,
      tagId: ctx.request.body.tagId,
      cover: ctx.request.body.cover,
      content: ctx.request.body.content,
      updateTime: Date(),
    });
  }

  // 删除
  async delete(id) {
    const { ctx } = this;
    return await ctx.model.Article.remove({ _id: id });
  }

  // 发布 or 撤销发布
  async publish(id) {
    const { ctx } = this;
    return await ctx.model.Article.update({ _id: id }, {
      status: ctx.request.body.status,
    });
  }
}

module.exports = ArticleService;

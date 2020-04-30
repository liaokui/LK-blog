/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */
'use strict';

const Service = require('egg').Service;

class StatisticsService extends Service {
  async getAmount() {
    const { ctx } = this;
    const list = [];
    list.push({
      type: 'article',
      label: '文章',
      amount: await ctx.model.Article.countDocuments(),
    });
    list.push({
      type: 'project',
      label: '项目',
      amount: await ctx.model.Project.countDocuments(),
    });
    list.push({
      type: 'message',
      label: '留言',
      amount: await ctx.model.Message.countDocuments(),
    });
    list.push({
      type: 'tag',
      label: '标签',
      amount: await ctx.model.Tag.countDocuments(),
    });
    return list;
  }
  async getHostTag() {
    const { ctx } = this;
    let list = [];
    let dataList;
    list.push([ 'product', '文章', '项目' ]);
    const tagList = await ctx.model.Tag.find();
    await Promise.all(tagList.map(async item => {
      const data = [];
      data.push(item.tagName);
      const articleData = await ctx.model.Article.find({ tagId: item._id });
      data.push(articleData.length);
      const projectData = await ctx.model.Project.find({ tagId: item._id });
      data.push(projectData.length);
      return data;
    })).then(res => {
      dataList = res;
    });
    dataList.sort((a, b) => {
      return (a[1] + a[2]) < (b[1] + b[2]);
    });
    if (dataList.length >= 6) {
      dataList.length = 6;
    }
    list = list.concat(dataList);
    return list;
  }
}

module.exports = StatisticsService;

'use strict';

const Controller = require('egg').Controller;

class StatisticsController extends Controller {
  async amount() {
    const { ctx } = this;
    const resMsg = {
      status: 'success',
      data: {},
      msg: '查询成功',
    };
    const res = await ctx.service.statistics.getAmount();
    resMsg.data = res;
    ctx.body = resMsg;
  }
  async hostTag() {
    const { ctx } = this;
    const resMsg = {
      status: 'success',
      data: {},
      msg: '查询成功',
    };
    const res = await ctx.service.statistics.getHostTag();
    resMsg.data = res;
    ctx.body = resMsg;
  }
}


module.exports = StatisticsController;

'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const util = require('util');
const path = require('path');
const readFilePromise = util.promisify(fs.readFile);

class PageController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.response.type = 'html';
    const page = await readFilePromise(path.resolve(__dirname, '../public/client/dist/index.html'));
    ctx.body = page;
  }
  async admin() {
    const { ctx } = this;
    ctx.response.type = 'html';
    const page = await readFilePromise(path.resolve(__dirname, '../public/admin/dist/index.html'));
    ctx.body = page;
  }
}

module.exports = PageController;

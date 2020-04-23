/* eslint-disable strict */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const conn = app.mongooseDB.get('lkblog');

  const MessageSchema = new Schema({
    nickname: { type: String },
    email: { type: String },
    message: { type: String },
    createTime: { type: String },
  });

  return conn.model('Message', MessageSchema);
};

/* eslint-disable strict */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const conn = app.mongooseDB.get('lkblog');

  const TagSchema = new Schema({
    tagName: { type: String },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  });

  return conn.model('Tag', TagSchema);
};

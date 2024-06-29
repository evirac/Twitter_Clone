const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
  content: { type: String, required: true },
  image: { type: String },
  TweetedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  retweetBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  replies: [{ type: Schema.Types.ObjectId, ref: 'Tweet' }],
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Tweet', tweetSchema);

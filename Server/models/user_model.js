const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  username: {type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  joined: { type: Date, default: Date.now },
  profilePicture: { type: String, default: '' },
  location: { type: String },
  dateOfBirth: { type: Date },
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const User = mongoose.model('User', userSchema);
module.exports = User;

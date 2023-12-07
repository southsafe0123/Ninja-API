const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
  email: { type: String, required: true, unique: true, },
  token: { type: String, required: true },
  create_at: { type: Date, default: Date.now },//thời gian tạo token
  status: { type: Boolean, default: true }//trạng thái đã sử dụng hay chưa
});

module.exports = mongoose.model('PasswordReset', schema) || mongoose.models.PasswordReset;
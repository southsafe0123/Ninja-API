const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;
const schema = new Schema({
    email: { type: String, required: true, unique: true, },
    name: { type: String, required: true, },
    password: { type: String, required: true, },
   role :{ type: Number, require: true},
   isVerified:{type: Boolean, default:false,},
   gameInfor:{type: ObjectId, ref: 'UserGame' }
});

module.exports = mongoose.model('User', schema) || mongoose.models.User;
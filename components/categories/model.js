const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    name: {
        type: String, // kiểu dữ liệu
        required: true, // bắt buộc phải có
        unique: true, // duy nhất
    },
    description: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Category', schema) || mongoose.models.Category;
const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;

const schema = new Schema({
    title: { type: String, required: true, unique: true, },
    content: { type: String, required: true, },
    image:{type: String},
    
    created_at:{type:Date, default:Date.now},
    updated_at:{type: Date, default:Date.now},
    created_by:{type:Object, required:true, ref:'User'},
    updated_by:{type:Object, required:true, ref:'User'},
});

module.exports = mongoose.model('News', schema) || mongoose.models.News;
const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;

const schema = new Schema({
    name: { type: String, required: true, unique: true, },
    price: { type: Number, required: true, },
    quantity: { type: Number, required: true, },
    image:{type: String},
    description: { type: String, required: true, },
    category_id: { type: ObjectId, required: true, ref: 'Category' },
   
    created_at:{type:Date, default:Date.now},
    updated_at:{type: Date, default:Date.now},
    created_by:{type:Object, required:true, ref:'User'},
    updated_by:{type:Object, required:true, ref:'User'},
});

module.exports = mongoose.model('Product', schema) || mongoose.models.Product;
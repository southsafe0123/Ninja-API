const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;
const schema = new Schema({
   Scene:{type:Number, default:1},
   healthMax:{type:Number, default:2},
    currentHealth:{type:Number, default:2},
    shurikenDmg:{type:Number, default:1},
    shirukenNum:{type:Number, default:1},
    currentExp:{type:Number, default:0},
    level:{type:Number, default:0},
    expRequire:{type:Number, default:4},
   users_id:{type: ObjectId, required: true, ref: 'User' },
   
});

module.exports = mongoose.model('UserGame', schema) || mongoose.models.UserGame;
const mongoose = require('mongoose');
const { User } = require('./User');
const {Schema} = mongoose;

const shooterSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    accountBalance:{
        type: Number,
        required: true
    },
    freelas:[{
        type: Schema.Types.ObjectId,
        ref:'Freelas',
        required: true
    }]

});

const Shooter = mongoose.model('Shooter', shooterSchema);

module.exports = {
    Shooter,
    shooterSchema
};
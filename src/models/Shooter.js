const mongoose = require('mongoose');
const { User } = require('./User');
const {Schema} = mongoose;

const shooterSchema = new Schema({
    _userId:{
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    accountBalance:{
        type: Number,
        required: true
    },
    freelasToDo:[{
        type: Schema.Types.ObjectId,
        ref:'Freelas',
        required: false
    }]

});

const Shooter = mongoose.model('Shooter', shooterSchema);

module.exports = {
    Shooter,
    shooterSchema
};
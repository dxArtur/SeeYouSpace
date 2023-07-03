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
    freelaToDo:[{
        freelaId: {
          type: Schema.Types.ObjectId,
          ref: 'Freela',
          required: false
        }
      }]

});

const Shooter = mongoose.model('Shooter', shooterSchema);

module.exports = {
    Shooter,
    shooterSchema
};
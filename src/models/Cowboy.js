const mongoose = require('mongoose');
const {Schema} = mongoose;
const {User} = require('./User');
const { Freela } = require('./Freela');



const cowboySchema = new Schema({
    _userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    nick: {
        type: String,
        required: true
    },
    freelaDone: [{ 
        type: Schema.Types.ObjectId,
        ref:'Freela',
        required: false
    }],

    freelaToDo: [{
        freelaId: {
          type: Schema.Types.ObjectId,
          ref: 'Freela',
          required: false
        }
      }],
    
    treasureChest: {
        type: Number,
        required: true,
    },
});

const Cowboy = mongoose.model('Cowboy', cowboySchema);

module.exports = {
    Cowboy,
    cowboySchema
};
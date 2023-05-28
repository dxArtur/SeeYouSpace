const mongoose = require('mongoose');
const {Schema} = mongoose;
const {User} = require('./User');
const {Freela} = require('/Freela');
const { freelaSchema } = require('./Freela');

const cowboySchema = new Schema({
    userId: {
        type:Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    nick: {
        type: String,
        required: true
    },
    freelaDone: [{ 
        type: Schema.Types.ObjectId,
        ref:'Freela',
        required: true
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
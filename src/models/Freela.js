const mongoose = require('mongoose');
const {Schema} = mongoose;
const { Shooter } = require('./Shooter');

const freelaSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref:Shooter,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    reward: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }

});

const Freela = mongoose.model('Freela', freelaSchema);

module.exports = {
    Freela,
    freelaSchema
};
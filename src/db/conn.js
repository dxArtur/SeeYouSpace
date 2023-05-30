const mongoose = require('mongoose');

async function main (){
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USER}:${process.env.DB_KEY}@bebopcluster.kf2sswx.mongodb.net/?retryWrites=true&w=majority`
        );
        console.log('DB CONNECTED');
    } catch (error) {
        console.log(error);
    }
}

module.exports = main;
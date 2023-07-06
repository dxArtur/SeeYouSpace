const mongoose = require('mongoose');

async function main (){
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_user}:${process.env.DB_key}@bebopcluster.kf2sswx.mongodb.net/?retryWrites=true&w=majority`
        );
        console.log('DB CONNECTED');
    } catch (error) {
        console.log(error);
    }
}

module.exports = main;
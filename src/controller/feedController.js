const {Shooter: ShooterModel} = require('../models/Shooter');
const { User: UserModel } = require('../models/User');


const feedController ={
    renderIndex: async(req, res)=>{
        res.render('feed.njk')
    }
}

module.exports=feedController;

const {Shooter: ShooterModel} = require('../models/Shooter');
const { User: UserModel } = require('../models/User');
const {Freela: FreelaModel} = require('../models/Freela')


const feedController ={
    renderIndex: async(req, res)=>{
        let freelas = null
        let users = null
        let name
        if (req.session.user) {
            console.log(req.session.user)
            name = req.session.user
        }
        try {
            freelas = await FreelaModel.find()
            console.log('freelas: '+freelas)
            users = await UserModel.find()
            console.log('shooters: '+users)
        } catch (error) {
            console.log(error)
        }
        res.render('index.njk', {freelas, users, user: name})
    },

    renderProfile: async(req, res)=>{
        const user = req.session.user
        res.render('profile.njk', { user })
    }
}

module.exports=feedController;

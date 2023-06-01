const {User: UserModel} = require('../models/User');
const routes = require('../routes/Cowboy');
//const {createCowboy}=require('../controller/cowboyController');
const {createShooter}=require('../controller/shooterController');
const bcrypt = require('bcrypt');


const userExist = async(req, res)=>{
    try {
        const id = req.params.id;
        if(! (await UserModel.findById(id))){
            res.status(404).json({message:'user not found'});
        }
        return user;
    } catch (error) {
        console.log(error)
    }
};


const userController = {

    createUser: async(req, res)=>{
        try {
            const user = {
                email: req.body.email,
                name: req.body.name,
                password: await bcrypt.hash(req.body.password, 2),
                type: req.body.type
            }
            console.log(req.body);

            const emailUsed = await UserModel.findOne({email: user.email});
            if(!emailUsed){
                const userCreated = await UserModel.create(user);
                //req.userId=userCreated._id;
                (user.type === 'cowboy' ? res.redirect('/cowboy/add') : res.redirect('/shooter/add') );
                //res.status(201).json({message: 'user created', userCreated});
            }
        } catch (error) {
            console.log(error);
        }
    },

    loginUser: async(req, res)=>{
        res.send('route login');
    },

    deleteUser: async(req, res)=>{
        res.send('route delete');
    },

    updateUser: async(req, res)=>{
        res.send('route update');
    }
}

module.exports = userController;
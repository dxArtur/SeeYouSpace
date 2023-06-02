const {User: UserModel, User} = require('../models/User');
const cowboy = require('../routes/Cowboy');
const shooter = require('../routes/Shooter');
//shooter.route('/cowboy').post
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
                password: await bcrypt.hash(req.body.password, process.env.SALT),
                type: req.body.type
            }
            console.log(req.body);

            const emailUsed = await UserModel.findOne({email: user.email});
            if(!emailUsed){
                const userCreated = await UserModel.create(user);
                //req.userId=userCreated._id;
                //res.status(201).json({message: 'user created', userCreated});
                
                res.redirect(307, `/space/${userCreated.type}/add?_id=${userCreated._id}`);
                
                /*
                (user.type === 'cowboy' 
                ? res.redirect(`/cowboy/add/?_id=${userCreated._id}`) 
                : res.redirect(`/shooter/add/?_id=${userCreated._id}`));
                */
                
            }
        } catch (error) {
            console.log(error);
        }
    },

    loginUser: async(req, res)=>{
        try {
            
        } catch (error) {
            console.log(error);
        }
        res.send('route login');
    },

    deleteUser: async(req, res)=>{
        try {
            if(await UserModel.findById(req.params.id)){
                const userDeleted = await UserModel.findByIdAndDelete(req.params.id);

                res.status(201).json({message: 'user deleted', userDeleted})
           }
        } catch (error) {
            console.log(error);
        }
    },

    updateUser: async(req, res)=>{
        try {
            if(await UserModel.findById(req.params.id)){
                const user = {
                    email: req.body.email,
                    name: req.body.name,
                    password: await bcrypt.hash(req.body.password, process.env.SALT),
                    type: req.body.type
                }
                const userUpdated = await UserModel.findByIdAndUpdate(req.params.id, user);

                res.status(201).json({message: 'user updated', userUpdated});
            }
        } catch (error) {
            console.log(error);
        }
    },

    getUser: async(req, res)=>{
        try {
            if(await UserModel.find(req.params.id)){
                const userSelected = await UserModel.findById(req.params.id);
                res.status(201).json({message: 'user selected', userSelected});
            }
        } catch (error) {
            console.log(error);
        }
    },

    getAllUsers:async(req, res)=>{
        try {
            const users = await UserModel.find();
            res.status(201).json({message: 'all user created', users})
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = userController;
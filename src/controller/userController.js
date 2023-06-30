const {User: UserModel, User} = require('../models/User');
const cowboy = require('../routes/Cowboy');
const shooter = require('../routes/Shooter');
//shooter.route('/cowboy').post
//const {createCowboy}=require('../controller/cowboyController');
const {createShooter}=require('../controller/shooterController');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nunjucks = require('nunjucks');
const cowboyController = require('./cowboyController');
const shooterController = require('./shooterController')
const feedController = require('./indexController');
const { Freela: FreelaModel } = require('../models/Freela');


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
    getCreateUser: async(req, res)=>{
        res.render('user/registerUser.njk');
    },

    createUser: async(req, res)=>{
        try {
            const user = {
                email: req.body.email,
                name: req.body.name,
                password: await bcrypt.hash(req.body.password, Number(process.env.SALT)),
                type: req.body.type
            }
            const emailUsed = await UserModel.findOne({email: user.email});
            if(!emailUsed){
                const userCreated = await UserModel.create(user);
                //req.userId=userCreated._id;
                //res.status(201).json({message: 'user created', userCreated});
                res.locals.userId = userCreated._id
                if(req.body.type === 'cowboy') {
                    return cowboyController.getCreateCowboy(req, res)
                    //return res.redirect(307, 'cowboy/registerCowboy')
                }else {
                    return shooterController.getCreateShooter(req, res)
                    //return res.redirect(307, 'shooter/registerShooter')
                }
                
                //res.redirect(307, `/space/${userCreated.type}/add?_id=${userCreated._id}`);
                
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

    renderLogin: async(req, res)=>{
        res.render('user/login.njk');
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
                    password: await bcrypt.hash(req.body.password, Number(process.env.SALT)),
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
            const userSelected = await UserModel.findById(req.params.id)
            console.log(userSelected);

            const freelas = await FreelaModel.find()


            res.render('user/seeUser.njk', {user: userSelected, freelas})
            //res.status(201).json({message: 'user selected', userSelected});
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
    },

    cleanDB: async(req, res)=>{
        try {
            const users = await UserModel.find();
            for (let i = 0; i < users.length; i++) {
              const user = users[i];
              console.log('Deleting user:', user);
              await UserModel.deleteOne({ _id: user._id });
            }
            res.status(201).json({ message: 'All users deleted' })
        } catch (error) {
            console.log(error)
        }
    },

    loginUser: async(req, res)=>{
        try {
            const {email, password } = req.body;
            const user = await UserModel.findOne({email});
            const match = await bcrypt.compare(password, user.password);
            //const usr = await UserModel.readByEmail(email);
            if(! user || ! match){
                console.log('bad auth');
            }

            const token = await jwt.sign(
                {userId : user._id,
                email: user.email
                },
                process.env.SECRET,
                {expiresIn: "1h"});

            const tokenBearer = `Bearer ${token}`;

            req.session.user = user;
            res.cookie('access_token', tokenBearer, { maxAge: 3600000 }); // 1h
            res.set('Authorization', tokenBearer);
            return feedController.renderIndex(req, res);
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = userController;
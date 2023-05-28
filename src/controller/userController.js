const {User: UserModel} = require('../models/User');
const {Cowboy: CowboyModel} = require('../models/Cowboy');
const {Freela: FreelaModel} = require('../models/Freela');
const bcrypt = require('bcrypt');





const userController = {

    createUser: async(req, res)=>{
        try {
            const user ={
                email: req.body.email,
                name: req.body.name,
                password: await bcrypt.hash(req.body.password, 10),
                type: req.body.type
            }
            if(!(emailUsed = await UserModel.findOne({email: user.email}))){
                const userCreated = await UserModel.create(user);
                if(user.type==='cowboy'){
                    this.loginUser;
                } else{
                    this.deleteUser;
                }
                res.status(201).json({message: 'user created', userCreated});
            }
        } catch (error) {
            
        }
    },
    createCowboy: async (req, res)=>{
        try {
            const user = {
                email: req.body.email,
                name: req.body.name,
                password: await bcrypt.hash(req.body.password, 10),
                avatar:  req.body.avatar,
                type: req.body.type,
                nick: req.body.nick,
                treasureChest: req.body.treasureChest,
                freelaDone: req.body.freelaDone
            };

            const emailUsed = await UserModel.findOne({email: user.email})
            if (!emailUsed){
                const userCreated = await UserModel.create(user);

                const cowboy = {
                    user: userCreated._id,
                    nick: user.nick,
                    treasureChest: user.treasureChest,
                    freelaDone: user.freelaDone
                };

                const cowboyCreated = await CowboyModel.create(cowboy);

                res.status(201).json({message: 'cowboy created', cowboyCreated});

            }
        } catch (error) {
           console.log(error);
        }
    },

    loginUser: async(req, res)=>{
        res.send('foi cowboy');
    },

    deleteUser: async(req, res)=>{
        res.send('foi shooter');
    },

    updateUser: async(req, res)=>{
        res.send('route update');
    }
}

module.exports = userController;
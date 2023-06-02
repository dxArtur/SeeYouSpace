const {Shooter: ShooterModel} = require('../models/Shooter');
const { User: UserModel } = require('../models/User');
const { Freela: FreelaModel, Freela } = require('../models/Freela');

const shooterController = {
    createShooter : async(req, res, id)=>{
        console.log('shtr');
        console.log(req.params.id);
        try {
            const shooter = {
                userId: req.params.id,
                accountBalance: req.body.accountBalance,
                freelasUnfinished: req.body.freelasUnfinished
            }
            const shooterCreated = await ShooterModel.create(shooter);
            res.status(201).send({message: 'shooter created', shooterCreated})
        } catch (error) {
          console.log(error);
        }
    },

    updateShooter: async(req, res)=>{
        try {
            if(await ShooterModel.findById(req.params.id)){
                const shooter = {
                    accountBalance: req.body.accountBalance,
                    freelasUnfinished: req.body.freelasUnfinished
                }
                const shooterUpdated = await ShooterModel.findByIdAndUpdate(req.params.id, shooter);
                res.status(201).json({message: 'shooter updated', shooterUpdated});
            }
        } catch (error) {
            console.log(error);
        }
    },

    deleteShooter: async(req, res)=>{
        try {
            if(await ShooterModel.findById(req.params.id)){
                const shooterDeleted = await ShooterModel.findByIdAndRemove(req.params.id);
                res.status(201).json({message:'shooter deleted', shooterDeleted});
            }
        } catch (error) {
            console.log(error);
        }
    },


    getShooterByName: async(req, res)=>{},

    getShooter: async(req, res)=>{
        try {
            const shooter = await ShooterModel.findById(req.params.id);
            if(shooter){
                res.status(201).json({message: 'this is shooter', shooter})
            }
        } catch (error) {
            console.log(error);
        }
    },

    getAllShooter: async(req, res)=>{
        try {
            const shooters = await ShooterModel.find();
            res.status(200).json({shooters});
        } catch (error) {
            console.log(error);
        }
    },

    payToCowboy: async(req, res)=>{
        try {
            const freela = {};
            const cowboy ={};

            if(await UserModel.findById(cowboy.id) || await ShooterModel.findById(freela.id)){
                if(freela.reward<= accountBalance){
                    accountBalance -=freela.reward;
                    const shooter = {
                        accountBalance
                    }
                    const accountBalanceUpdated = await ShooterModel.findByIdAndUpdate(shooter.id, shooter);

                    res.status(200).json({accountBalanceUpdated});
                }
            }
        } catch (error) {
            console.log(error);
        }
    },

};

module.exports = shooterController;
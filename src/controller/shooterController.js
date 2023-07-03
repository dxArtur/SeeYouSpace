const {Shooter: ShooterModel} = require('../models/Shooter');
const { User: UserModel } = require('../models/User');
const { Freela: FreelaModel, Freela } = require('../models/Freela');
const { renderIndex } = require('./indexController');

const shooterController = {
    getCreateShooter: async(req, res)=>{
        res.render('shooter/registerShooter.njk');
    },

    createShooter : async(req, res)=>{
        console.log('shtr');
        try {
            const shooter = {
                _userId: req.body.id,
                accountBalance: req.body.accountBalance
            }
            const shooterCreated = await ShooterModel.create(shooter);
            return renderIndex(req, res)
        } catch (error) {
          console.log(error);
        }
    },

    updateShooter: async(req, res)=>{
        try {
            if(await ShooterModel.findById(req.params.id)){
                const shooter = {
                    accountBalance: req.body.accountBalance,
                    freelasToDo: req.body.freelasToDo
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

    getShooter: async(req, res)=>{
        try {
            const shooter = await ShooterModel.findById(req.params.id);
            if (shooter) {
                console.log(shooter)
                res.status(201).json({message: 'this is shooter', shooter})
            }
        } catch (error) {
            console.log(error);
        }
    },

    getAllShooter: async(req, res)=>{
        try {
            const shooters = await ShooterModel.find();
            res.status(201).json({message: 'all shooters created', shooters})
        } catch (error) {
            console.log(error);
        }
    },

    payToCowboy: async(req, res)=>{
        try {
            const freela = {};
            const cowboy ={};

            const userId = req.session.user._id;
            

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
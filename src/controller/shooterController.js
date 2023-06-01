const {Shooter: ShooterModel} = require('../models/Shooter');

const shooterController = {
    createShooter : async(req, res)=>{
        try {
            const shooter = {
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
    }

};

module.exports = shooterController;
const {Shooter: ShooterModel} = require('../models/Shooter');

const shooterController = {
    createShooter : async(req, res)=>{
        try {
            const shooter ={
                accountBalance: req.body.accountBalance,
                freelasUnfinished: req.body.freelasUnfinished
            };

            const shooterCreated = await ShooterModel.create(shooter);
            res.status(201).send({message: 'shooter created', shooterCreated})
        } catch (error) {
          console.log(error);
        }
    },

    updateShooter: async(req, res)=>{},

    deleteShooter: async(req, res)=>{},

    getShooter: async(req, res)=>{},

    getAllShooter: async(req, res)=>{}

};

module.exports = shooterController;
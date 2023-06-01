const {Freela: FreelaModel} = require('../models/Freela');


const freelaController ={
    createFreela: async(req, res)=>{
        try {
            const freela = {
                author: req.body.author,
                tittle: req.body.tittle,
                description: req.body.description,
                reward: req.body.reward,
                status: req.body.status
            };
            const createdFreela = await FreelaModel.create(createdFreela);
            res.status(201).json({message: 'freela created with sucessfull', createdFreela});
        } catch (error) {
            console.log(error);
        }
    },
    getFreela: async(req, res)=>{
        res.send('see freela');
    },
    deleteFreela: async(req, res)=>{
        res.send('freela deleted');
    },
    updateFreela: async(req, res)=>{
        res.send('update freela');
    }
};

module.exports=freelaController;
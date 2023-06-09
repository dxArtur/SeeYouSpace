const {Freela: FreelaModel} = require('../models/Freela');

const nunjucks = require('nunjucks');


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
        try {
            if(await FreelaModel.find(req.params.id)){
                const freelaSelected = await FreelaModel.findById(req.params.id);
                res.status(201).json({message: 'freela selected', freelaSelected});
            }
        } catch (error) {
            console.log(error);
        }
    },

    getAllFreelas: async(req, res)=>{
        try {
            const freelas = await FreelaModel.find();
            res.status(200).json({freelas});
         } catch (error) {
             console.log(error);
         }
    },

    deleteFreela: async(req, res)=>{
        try {
            if(await FreelaModel.findById(req.params.id)){
                const freelaDeleted = await FreelaModel.findByIdAndDelete(req.params.id);

                res.status(201).json({message: 'Freela deleted', freelaDeleted})
           }
        } catch (error) {
            console.log(error);
        }
    },
    updateFreela: async(req, res)=>{
        try {
            if(await FreelaModel.findById(req.params.id)){
                const freela = {
                    author: req.body.author,
                    tittle: req.body.tittle,
                    description: req.body.description,
                    reward: req.body.reward,
                    status: req.body.status
                }
                const freelaUpdated = await FreelaModel.findByIdAndUpdate(req.params.id, freela);
                res.status(201).json({message: 'freela updated', freelaUpdated});
            }
        } catch (error) {
            console.log(error);
        }
    }
};

module.exports=freelaController;
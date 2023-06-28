const {Freela: FreelaModel} = require('../models/Freela');

const freelaController ={
    getCreateFreela: async(req, res)=>{
        res.render('freela/registerFreela.njk');
    },

    createFreela: async(req, res)=>{
        try {
            const freela = {
                author: req.body.author,
                title: req.body.title,
                description: req.body.description,
                reward: req.body.reward,
                status: req.body.status
            };
            const freelaCreated = await FreelaModel.create(freela);
            res.status(201).json({message: 'freela created with sucessfull', freelaCreated});
        } catch (error) {
            console.log(error);
        }
    },
    renderFreela:async(req, res)=>{
        res.render('freela/freela.njk', freelaSelected)
    },
    getFreela: async(req, res)=>{
        console.log('acessou essa rota')
        try {
            const freela = await FreelaModel.findById(req.params.id);
            //res.status(201).json({message: 'freela found is', freelaSelected});
            console.log(freela)
            res.render('freela/freela.njk', freela)
        } catch (error) {
            console.log(error);
        }
    },

    getAllFreelas: async(req, res)=>{
        try {
            const freelas = await FreelaModel.find();
            res.status(201).json({freelas});
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
                    title: req.body.title,
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
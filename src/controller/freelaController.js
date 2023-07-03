const {Freela: FreelaModel} = require('../models/Freela');
const {User: UserModel } = require('../models/User');
const {Cowboy: CowboyModel} = require('../models/Cowboy');

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
    renderMyFreela: async(req, res) =>{
        let freelas
        try {
            const userId = req.session.user._id;
            const cowboy = await CowboyModel.findOne({ _userId: userId }).exec()
            console.log(cowboy.freelaToDo)
            freelas = cowboy.freelaToDo

        } catch (error) {
            
        }
        res.render('freela/myFreela.njk', freelas)
    },
    getFreela: async(req, res)=>{
        try {
            const freela = await FreelaModel.findById(req.params.id);
            const users = await UserModel.find()
            //res.status(201).json({message: 'freela found is', freelaSelected});
            res.render('freela/freela.njk', {freela, users})
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
const {Cowboy: CowboyModel} = require('../models/Cowboy');
const { renderIndex } = require('./indexController');


const cowboyController = {

    getCreateCowboy: async(req, res)=>{
        res.render('cowboy/registerCowboy.njk')
    },
    
    createCowboy: async(req, res)=>{
        try {
            const cowboy = {
                _userId: req.body.id,
                nick: req.body.nick,
                treasureChest: req.body.treasureChest,
                freelaDone: req.body.freelaDone
            };
            console.log('-------------')
            console.log(cowboy)
            const cowboyCreated = await CowboyModel.create(cowboy);
            res.status(201).json({message: 'cowboy created', cowboyCreated});

        } catch (error) {
            console.log(error);
        }
    },

    getCowboy: async(req, res)=>{
        try {
            const cowboy = await CowboyModel.findById(req.params.id);
            console.log(cowboy)
            if(cowboy){
                res.status(201).json({message: 'this is cowboy', cowboy})
            }
        } catch (error) {
            console.log(error);
        }
    },

    getAllCowboy: async(req, res)=>{
        try {
           const cowboys = await CowboyModel.find()
           res.status(200).json({cowboys});
        } catch (error) {
            console.log(error);
        }

    },
    
    getCowboyByName: async(req, res)=>{
        try {
            console.log('find by name');
        } catch (error) {
            console.log(error);
        }
    },

    updateCowboy: async(req, res)=>{
        try {
            
            if(await CowboyModel.findById(req.params.id)){
                const cowboy = {
                    type: req.body.type,
                    nick: req.body.nick,
                    treasureChest: req.body.treasureChest,
                    freelaDone: req.body.freelaDone
                }
                const cowboyUpdated = await CowboyModel.findByIdAndUpdate(req.params.id, cowboy);
                res.status(201).json({message: 'cowboy updated', cowboyUpdated});
           }
        } catch (error) {
            console.log(error);
        }
    },

    deleteCowboy: async(req, res)=>{
        try {
            if(await CowboyModel.findById(req.params.id)){
                const cowboyDeleted = await CowboyModel.findByIdAndDelete(req.params.id);
                res.status(201).json({message:'cowboy deleted', cowboyDeleted});
            }
        } catch (error) {
            console.log(error);
        }
    },

    acceptFreela: async(req, res)=>{
        try {
            const freelaId = req.body.freelaId;
            const userId = req.session.user._id;
            const cowboy = await CowboyModel.find({ userId: userId })
            if (cowboy) {
                if (await FreelaModel.findById(freelaId)) {
                    const freelasCopy = [...cowboy.freelasDone, {freelaId: freelaId}]

                    const updatedFreelas = {
                        freelaDone: freelasCopy
                    }

                    const updatedCowboy = await CowboyModel.findByIdAndUpdate(req.params.id, updatedFreelas);
                    return renderIndex(req, res)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

};

module.exports= cowboyController;
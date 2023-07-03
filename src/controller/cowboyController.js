const {Cowboy: CowboyModel, cowboySchema} = require('../models/Cowboy');
const { renderIndex } = require('./indexController');
const { Freela: FreelaModel} = require('../models/Freela')
const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const { payToCowboy } = require('./shooterController');
const ObjectId = mongoose.Types.ObjectId;




const cowboyController = {

    getCreateCowboy: async(req, res)=>{
        res.render('cowboy/registerCowboy.njk')
    },
    
    createCowboy: async(req, res)=>{
        try {
            const cowboy = {
                _userId: req.body.id,
                nick: req.body.nick,
                treasureChest: req.body.treasureChest
            };
            const cowboyCreated = await CowboyModel.create(cowboy);
            if (req.session) {
                    
            }
            res.redirect('/space/feed')

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
    
    getCowboyByUserId: async(req, res)=>{
        try {
            const userId = '648d34851504e3cdd3c8fd15'
            const cowboy = await CowboyModel.findOne({userId: userId}).exec()
            console.log(cowboy)
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
        console.log(req.body)
        try {
            let freelaId = req.body.id
            const userId = req.session.user._id;
            const freelaAccepted = await FreelaModel.findById(freelaId)
            const cowboy = await CowboyModel.findOne( {_userId: userId}).exec()
            //console.log(freelaId)
            if (cowboy && freelaAccepted) {
                console.log('oiiii')
                

                const freelaUpdated = await CowboyModel.findOneAndUpdate(
                    { _userId: userId },
                    { $push: { freelaToDo: { freelaId: new ObjectId(freelaId) }}},
                    { new: true }
                )
                
                
                const updatesInFreela = await FreelaModel.findByIdAndUpdate(
                    {_id: freelaId},
                    { $set: { visibility: false, responsable: userId } },
                    { new: true }
                )


                return renderIndex(req, res)

/*
                const uptade = await CowboyModel.updateOne(
                    { _id: userId },
                    { $push: { freelaToDo: freelaId } }
                )

                const updatedFreelas = {
                    $push: { freelaToDo: freelaId}
                };

                //const updatedCowboy = await CowboyModel.findByIdAndUpdate(req.params.id, updatedFreelas);
                return renderIndex(req, res)
                    
                cowboy.freelaToDo.push({ freelaId: freelaId });
          
                const updatedCowboy = await cowboy.save();

                cowboy.freelaToDo.forEach((item) => {
                    console.log(item);
                });

                */
            }
        } catch (error) {
            console.log(error)
        }
    },

    doneFreela: async (req, res) =>{
        try {
            let freelaId = req.body.id
            const userId = req.session.user._id;
            const freelaAccepted = await FreelaModel.findById(freelaId)
            const cowboy = await CowboyModel.findOne( {_userId: userId}).exec()
            if (cowboy && freelaAccepted) {
                

                const freelaUpdated = await CowboyModel.findOneAndUpdate(
                    { _userId: userId },
                    { $push: { freelaDone: { freelaId: new ObjectId(freelaId) }}},
                    { new: true })

                const freelaDoned = await CowboyModel.findOneAndUpdate(
                    { _userId: userId },
                    { $pull: { freelaToDo: { freelaId: freelaId } } },
                    { new: true }
                    )


            //payToCowboy(req, res)
            return renderIndex(req, res)
            }
        } catch (error) {
            console.log(error)
        }
    }

};

module.exports= cowboyController;
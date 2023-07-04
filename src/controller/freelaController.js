const {Freela: FreelaModel} = require('../models/Freela');
const {User: UserModel } = require('../models/User');
const {Cowboy: CowboyModel} = require('../models/Cowboy');
const {Shooter: ShooterModel} = require('../models/Shooter');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const freelaController ={
    getCreateFreela: async(req, res)=>{
        res.render('freela/createFreela.njk');
    },

    renderFormUpdate: async(req, res)=>{
        console.log('oiiiiiiiiiiii')
        const freelaId = req.query.id;
        console.log(freelaId)
        res.render('freela/updateFreela.njk', {freelaId});
    },

    createFreela: async(req, res)=>{
        try {
            const freela = {
                author: req.body.author,
                title: req.body.title,
                description: req.body.description,
                reward: req.body.reward
            };
            const freelaCreated = await FreelaModel.create(freela);

            const freelaId = freelaCreated._id

            console.log(freelaId)

            const userId = req.session.user._id;
            const shooter = await ShooterModel.findOne( {_userId: userId}).exec()

            const insertInShooter = await ShooterModel.findOneAndUpdate(
                { _userId: userId },
                { $push: { freelaToDo: { freelaId: new ObjectId(freelaId) }}},
                { new: true }
            )

            res.redirect('/space/feed')
        } catch (error) {
            console.log(error);
        }
    },
    renderFreela:async(req, res)=>{
        const userId = req.session.user._id;
        res.render('freela/freela.njk', {freelaSelected, user: req.session.user})
    },
    renderMyFreela: async(req, res) =>{
        //let freelas
        try {
            const userId = req.session.user._id;
            const typeUser = req.session.user.type
            if (typeUser === "cowboy"){
                const cowboy = await CowboyModel.findOne({ _userId: userId });
                const freelas = cowboy.freelaToDo
                const users = await UserModel.find()

                const freelaIds = cowboy.freelaToDo.map(freela => freela.freelaId);
                console.log(freelaIds)
                const freelaData = await FreelaModel.find({ _id: { $in: freelaIds } })
                console.log(freelaData)

                const formattedFreelas = freelaData.map(freela => ({
                    _id: freela._id,
                    title: freela.title,
                    reward: freela.reward,
                    author: freela.author,
                    responsable: freela.responsable,
                    description: freela.description
                    
                }))

                console.log(formattedFreelas)

                res.render('freela/myFreela.njk', {freelas: formattedFreelas, users})
            } else {
                console.log('-------')
                const shooter = await ShooterModel.findOne({ _userId: userId });
                const freelas = shooter.freelaToDo
                const users = await UserModel.find()

                const freelaIds = shooter.freelaToDo.map(freela => freela.freelaId);
                console.log(freelaIds)
                const freelaData = await FreelaModel.find({ _id: { $in: freelaIds } })
                console.log(freelaData)

                const formattedFreelas = freelaData.map(freela => ({
                    _id: freela._id,
                    title: freela.title,
                    reward: freela.reward,
                    author: freela.author,
                    responsable: freela.responsable,
                    description: freela.description
                    
                }))

                console.log('0000')
                console.log(formattedFreelas)

                res.render('freela/myFreela.njk', {freelas: formattedFreelas, users})
            }
            //freelas = await CowboyModel.findOne( {_userId: userId}).select('freelaToDo')
            
            
        } catch (error) {
            
        }
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
            console.log('veio')
            if(await FreelaModel.findById(req.params.id)){
                const freelaDeleted = await FreelaModel.findByIdAndDelete(req.params.id);

                res.redirect('/space/feed')
           }
        } catch (error) {
            console.log(error);
        }
    },
    updateFreela: async(req, res)=>{
        try {
            const id = req.body.freelaId
            if(await FreelaModel.findById(id)){
                const freela = {
                    _id: req.body.freelaId,
                    author: req.body.author,
                    title: req.body.title,
                    description: req.body.description,
                    reward: req.body.reward,
                }
                const freelaUpdated = await FreelaModel.findByIdAndUpdate(id, freela);
                console.log(freelaUpdated)
                res.redirect('/space/feed')
            }
        } catch (error) {
            console.log(error);
        }
    }
};

module.exports=freelaController;
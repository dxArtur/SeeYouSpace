const {Cowboy: CowboyModel} = require('../models/Cowboy');


const cowboyController = {
    
    createCowboy: async(req, res)=>{
        try {
            const cowboy = {
                type: req.body.type,
                nick: req.body.nick,
                treasureChest: req.body.treasureChest,
                freelaDone: req.body.freelaDone
            };
            const cowboyCreated = await CowboyModel.create(cowboy);
            res.status(201).json({message: 'cowboy created', cowboyCreated});

        } catch (error) {
            console.log(error);
        }
    }
};

module.exports= cowboyController;
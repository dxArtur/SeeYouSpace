const cowboyController = require('../controller/cowboyController');

const router = require('express').Router();

router
    .route('/cowboy')
    .get((req, res)=>cowboyController.get(req, res));

router
    .route('/cowboy/all')
    .get((req, res)=>cowboyController.getAll(req, res));

router
    .route('/cowboy/donefreela/:freelaId')
    .put((req, res)=>cowboyController.done(req, res));

router
    .route('/cowboy/doingFreela/:freelaId')
    .put((req, res)=>cowboyController.doingFreela(req, res));
    
    /*
    .pega um freela,
    .conclui um freeela,
    .
    */

module.exports=router;
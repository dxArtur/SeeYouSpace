const cowboyController = require('../controller/cowboyController');

const router = require('express').Router();

router
    .route('/cowboy/add')
    .get((req, res)=>cowboyController.getCreateCowboy(req, res));

router
    .route('/cowboy/add')
    .post((req, res)=>cowboyController.createCowboy(req, res));

router
    .route('/cowboy/:id')
    .get((req, res)=>cowboyController.getCowboy(req, res));

router
    .route('/acceptFreela')
    .post((req, res)=>cowboyController.acceptFreela(req, res))

router
    .route('/cowboyAll')
    .get((req, res)=>cowboyController.getAllCowboy(req, res));

router
    .route('/cowboybyid')
    .get((req, res)=>cowboyController.getCowboyByUserId(req, res));

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
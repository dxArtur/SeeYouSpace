const router = require('express').Router();

router
    .route('/cowboy')
    .get((req, res)=>cowboyController.get(req, res));


module.exports=router;
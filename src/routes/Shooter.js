const router = require('express').Router();

router
    .route('/shooter')
    .get((req, res)=>shooterController.get(req, res));

module.exports= router;
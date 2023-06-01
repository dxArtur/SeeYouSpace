const router = require('express').Router();

router
    .route('/shooter/add')
    .get((req, res)=>shooterController.get(req, res));

module.exports= router;
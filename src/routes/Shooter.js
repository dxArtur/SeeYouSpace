const router = require('express').Router();
const shooterController = require('../controller/shooterController');

router
    .route('/shooter/add')
    .get((req, res)=>shooterController.getCreateShooter(req, res));

router
    .route('/shooter/add')
    .post((req, res)=>shooterController.createShooter(req, res));

router
    .route('/shooter/:id')
    .get((req, res)=>shooterController.getShooter(req, res));

    router
    .route('/shooterAll')
    .get((req, res)=>shooterController.getAllShooter(req, res));

router
    .route('/shooter/:id')
    .delete((req, res)=>shooterController.deleteShooter(req, res));

router.route('/shooter/:id')
    .put((req, res)=> shooterController.updateShooter(req, res));

module.exports= router;
const router = require('express').Router();
const freelaController = require('../controller/freelaController');

router
    .route('/freela')
    .post((req, res)=>freelaController.create(req, res));

router
    .route('/freela')
    .get((req, res)=>freelaController.view(req, res));

router
    .route('/freela/add')
    .get((req, res)=>freelaController.view(req, res));

router
    .route('/freela')
    .delete((req, res)=>freelaController.delete(req, res));

router
    .route('/freela')
    .put((req, res)=>freelaController.update(req, res));

    router
    .route('/watch')
    .get((req, res)=>freelaController.testWatch(req, res));

/*routes ideias
    search, view
*/
module.exports=router;
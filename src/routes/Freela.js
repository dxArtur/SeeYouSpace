const router = require('express').Router();
const freelaController = require('../controller/freelaController');

router
    .route('/freela/add')
    .get((req, res)=>freelaController.getCreateFreela(req, res))

router
    .route('/freela/add')
    .post((req, res)=>freelaController.createFreela(req, res));

router
    .route('/freela/all')
    .get((req, res)=>freelaController.getAllFreelas(req, res));

router
    .route('/freela/:id')
    .get((req, res)=>freelaController.getFreela(req, res));

router
    .route('/freela/:id')
    .delete((req, res)=>freelaController.delete(req, res));

router
    .route('/freela/:id')
    .put((req, res)=>freelaController.update(req, res));


/*routes ideias
    search, view
*/
module.exports=router;
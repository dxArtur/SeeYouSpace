const router = require('express').Router();
const freelaController = require('../controller/freelaController');

router
    .route('/freela/add')
    .get((req, res)=>freelaController.getCreateFreela(req, res))

router
    .route('/myfreelas')
    .get((req, res)=>freelaController.renderMyFreela(req, res));

router
    .route('/freela/add')
    .post((req, res)=>freelaController.createFreela(req, res));

router
    .route('/freelaAll')
    .get((req, res)=>freelaController.getAllFreelas(req, res));

router
    .route('/freela/:id')
    .get((req, res)=>freelaController.getFreela(req, res));

router
    .route('/deleteFreela/:id')
    .post((req, res)=>freelaController.deleteFreela(req, res));

router
    .route('/updateFreela/:id')
    .get((req, res)=>freelaController.renderFormUpdate(req, res));    

router
    .route('/updateFreela')
    .post((req, res)=>freelaController.updateFreela(req, res));


/*routes ideias
    search, view
*/
module.exports=router;
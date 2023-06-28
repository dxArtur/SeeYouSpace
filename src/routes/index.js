const router = require('express').Router();
const indexController = require('../controller/indexController')


router
    .route('/feed')
    .get((req, res)=>indexController.renderIndex(req, res));

module.exports = router;
const router = require('express').Router();
const feedController = require('../controller/feedController')


router
    .route('/feed')
    .get((req, res)=>feedController.renderIndex(req, res));

module.exports = router;
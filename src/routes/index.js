const router = require('express').Router();
const indexController = require('../controller/indexController')
const middleware = require('../middleware/index')


router
    .route('/feed')
    .get(middleware.isAuthenticated, (req, res)=>indexController.renderIndex(req, res));

router
    .route('/profile')
    .get(middleware.isAuthenticated, (req, res)=>indexController.renderProfile(req, res));

module.exports = router;
const router = require('express').Router();
const userController = require('../controller/userController');

router
    .route('/user/add')
    .post((req, res) => userController.createUser(req, res));

router
    .route('/user/login')
    .post((req, res)=>userController.loginUser(req, res));

router
    .route('/user/:id')
    .delete((req, res)=>userController.deleteUser(req, res));

router.route('/user/:id')
    .put((req, res)=> userController.updateUser(req, res));

module.exports = router;
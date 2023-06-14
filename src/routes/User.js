const router = require('express').Router();
const userController = require('../controller/userController');

router
    .route('/user/add')
    .post((req, res)=>userController.createUser(req, res));

router
    .route('/user/add')
    .get((req, res)=>userController.getCreateUser(req, res));


router
    .route('/user/index')
    .get((req, res)=>userController.index(req, res));

router
    .route('/user/all')
    .get((req, res)=>userController.getAllUsers(req, res));

router
    .route('/user/login')
    .get((req, res)=>userController.loginUser(req, res));

router
    .route('/user/login')
    .post((req, res)=>userController.auth(req, res));

router
    .route('/user/:id')
    .delete((req, res)=>userController.deleteUser(req, res));

router.route('/user/:id')
    .put((req, res)=> userController.updateUser(req, res));


module.exports = router;
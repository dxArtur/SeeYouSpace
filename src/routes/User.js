const router = require('express').Router();
const userController = require('../controller/userController');
const middleware = require('../middleware/index')

router
    .route('/user/add')
    .get((req, res)=>userController.getCreateUser(req, res));

router
    .route('/user/add')
    .post((req, res)=>userController.createUser(req, res));

router
    .route('/user/index')
    .get((req, res)=>userController.index(req, res));

router.route('/user/:id').get((req, res)=>userController.getUser(req, res))

router
    .route('/user/all')
    .get((req, res)=>userController.getAllUsers(req, res));

router
    .route('/user/login')
    .get((req, res)=>userController.renderLogin(req, res));

router
    .route('/user/login')
    .post((req, res)=>userController.loginUser(req, res));

router
    .route('/user/:id')
    .delete(middleware.isAuthenticated, (req, res)=>userController.deleteUser(req, res));

router.route('/user/:id')
    .put(middleware.isAuthenticated, (req, res)=>userController.updateUser(req, res));

router.route('/clean').delete((req, res)=>userController.cleanDB(req, res))


module.exports = router;
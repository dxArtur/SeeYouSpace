const router = require('express').Router();


const userRouter = require('./User');
router.use('/', userRouter);

const cowboyRouter = require('./Cowboy');
router.use('/', cowboyRouter);

const shooterRouter = require('./Shooter');
router.use('/', shooterRouter);

const freelaRouter = require('./Freela');
router.use('/', freelaRouter);

const indexRouter = require('./index');
router.use('/', indexRouter);

module.exports = router;
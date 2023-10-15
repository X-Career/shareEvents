const router = require('express').Router();
const userRouter = require('./user');
const categoryRouter = require('./category');
const eventRouter = require('./event');

router.use('/user', userRouter);
router.use('/category', categoryRouter);
router.use('/event', eventRouter);

module.exports = router;
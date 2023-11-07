const router = require('express').Router();
const userRouter = require('./user');
const categoryRouter = require('./category');
const eventRouter = require('./event');
const commentRouter = require('./comment');
const seatRouter = require('./seat');
const orderRouter = require('./order');

router.use('/user', userRouter);
router.use('/category', categoryRouter);
router.use('/event', eventRouter);
router.use('/comment', commentRouter);
router.use('/seat', seatRouter);
// router.use('/order', orderRouter);

module.exports = router;
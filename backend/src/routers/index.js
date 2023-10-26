const router = require('express').Router();
const userRouter = require('./user');
const categoryRouter = require('./category');
const eventRouter = require('./event');
const commentRouter = require('./comment');
const seatRouter = require('./seat');

router.use('/user', userRouter);
router.use('/category', categoryRouter);
router.use('/event', eventRouter);
router.use('/comment', commentRouter);
router.use('/seat', seatRouter);

module.exports = router;
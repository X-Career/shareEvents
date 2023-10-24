const router = require('express').Router();
const userRouter = require('./user');
const categoryRouter = require('./category');
const eventRouter = require('./event');
const commentRouter = require('./comment');

router.use('/user', userRouter);
router.use('/category', categoryRouter);
router.use('/event', eventRouter);
router.use('/comment', commentRouter);

module.exports = router;
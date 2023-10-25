const router = require('express').Router();
const { authentication, checkPermissionAdmin, checkPermissionCreator } = require('../middlewares/authentication');
const { updateComment, deleteComment } = require('../controllers/comment.js');

router.put('/updateComment/:id', authentication, updateComment);
router.delete('/deleteComment/:id', authentication, deleteComment);

module.exports = router;

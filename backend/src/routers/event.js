const router = require('express').Router();
const { getList, getEventById, createEvent, updateEvent, deleteEvent } = require('../controllers/event.js');
const { authentication, checkPermissionAdmin, checkPermissionCreator } = require('../middlewares/authentication.js');
const uploadImage = require('../cloudinary/index.js');
const { createComment, updateComment, deleteComment } = require('../controllers/comment.js');

router.get('/', getList);
router.get('/:id', getEventById);
router.post('/createEvent', checkPermissionCreator, uploadImage.array("image", 10), createEvent);
router.put('/updateEvent/:id', checkPermissionCreator, uploadImage.array("image", 10), updateEvent);
router.delete('/deleteEvent/:id', checkPermissionCreator, deleteEvent);
router.get('/loadEvent/:id', checkPermissionCreator, uploadImage.array("image", 10), getEventById);
router.put('/updateEventOfAdmin/:id', checkPermissionAdmin, updateEvent);

router.post('/:id/createComment', authentication, createComment);

module.exports = router;

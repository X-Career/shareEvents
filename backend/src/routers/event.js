const router = require('express').Router();
const { getList, getDetailEvent, getEventById, createEvent, updateEvent, deleteEvent } = require('../controllers/event.js');
const { authentication, checkPermissionAdmin, checkPermissionCreator } = require('../middlewares/authentication.js');
const uploadImage = require('../cloudinary/index.js');

router.get('/', getList);
router.get('/:id', getDetailEvent);
router.post('/createEvent', checkPermissionCreator, uploadImage.array("image"), createEvent);
router.put('/updateEvent/:id', checkPermissionCreator, uploadImage.array("image"), updateEvent);
router.delete('/deleteEvent/:id', checkPermissionCreator, deleteEvent);
router.get('/loadEvent/:id', checkPermissionCreator, uploadImage.array("image"), getEventById);
router.put('/updateEventOfAdmin/:id', checkPermissionAdmin, updateEvent);

module.exports = router;

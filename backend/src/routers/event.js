const router = require('express').Router();
const { getAllEvents, getDetailEvent, createEvent, updateEvent, deleteEvent } = require('../controllers/event.js');
const { authentication, checkPermissionAdmin, checkPermissionCreator } = require('../middlewares/authentication.js');
const uploadImage = require('../cloudinary/index.js');

router.get('/', getAllEvents);
router.get('/:id', getDetailEvent);
router.post('/createEvent', checkPermissionCreator, uploadImage.array("image"), createEvent);
router.put('/updateEvent/:id', checkPermissionCreator, updateEvent);
router.delete('/deleteEvent/:id', checkPermissionCreator, deleteEvent);
router.put('/updateEventOfAdmin/:id', checkPermissionAdmin, updateEvent);

module.exports = router;

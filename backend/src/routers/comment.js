const router = require('express').Router();
const { getList, getEventById, createEvent, updateEvent, deleteEvent } = require('../controllers/event.js');
const { authentication, checkPermissionAdmin, checkPermissionCreator } = require('../middlewares/authentication.js');
const uploadImage = require('../cloudinary/index.js');


module.exports = router;

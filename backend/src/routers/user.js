const router = require('express').Router();
const { register, login } = require('../controllers/user.js');
const uploadImage = require('../cloudinary/index.js');

router.post('/login', login);
router.post('/register', uploadImage.single('image'), register);

module.exports = router;

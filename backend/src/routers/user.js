const router = require('express').Router();
const { register, login, updateUser, loadUser, deleteUser } = require('../controllers/user.js');
const uploadImage = require('../cloudinary/index.js');
const { authentication, checkPermissionAdmin, checkPermissionCreator } = require('../middlewares/authentication.js');

router.post('/login', login);
router.post('/register', uploadImage.single('image'), register);
router.put('/updateUser/:id', authentication, uploadImage.single('image'), updateUser);
router.get('/loadUser/:id', authentication, loadUser);
router.delete('/deleteUser/:id', authentication, deleteUser);

module.exports = router;

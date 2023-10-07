const router = require('express').Router();
const { getAll, getDetail, createCategory, updateCategory, deleteCategory } = require('../controllers/category.js');
const { authentication, checkPermissionAdmin, checkPermissionCreator } = require('../middlewares/authentication.js');

router.get('/', getAll);
router.get('/:id', getDetail);
router.post('/createCategoty', checkPermissionAdmin, createCategory);
router.put('/updateCategory', checkPermissionAdmin, updateCategory);
router.delete('/deleteCategory', checkPermissionAdmin , deleteCategory);

module.exports = router;

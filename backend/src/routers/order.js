const router = require('express').Router();
const { authentication, checkPermissionAdmin, checkPermissionCreator } = require('../middlewares/authentication.js');
const { createOrder, getAllOrders, deleteOrder, getOrderById, updateOrder } = require('../controllers/order.js');

router.put('/updateOrder/:id', checkPermissionCreator, updateOrder);
router.get('/getOrderById/:id', checkPermissionCreator, getOrderById)
router.delete('/deleteOrder/:id', checkPermissionCreator, deleteOrder);

module.exports = router;
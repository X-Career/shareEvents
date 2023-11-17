const router = require('express').Router();
const { authentication, checkPermissionAdmin, checkPermissionCreator } = require('../middlewares/authentication');
const { createSeat, updateSeat, deleteSeat, getAllSeats, getSeatById } = require('../controllers/seat.js');

router.get('/getAllSeats', getAllSeats);
router.get('/:id', getSeatById);
router.post('/createSeat', checkPermissionAdmin, createSeat)
router.put('/updateSeat/:id', checkPermissionAdmin, updateSeat);
router.delete('/deleteSeat/:id', checkPermissionAdmin, deleteSeat);

module.exports = router;

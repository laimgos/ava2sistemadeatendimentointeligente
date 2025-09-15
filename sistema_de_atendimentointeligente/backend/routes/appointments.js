const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const appointmentController = require('../controllers/appointmentController');

router.get('/', auth, appointmentController.list);
router.post('/', auth, appointmentController.create);
router.get('/:id', auth, appointmentController.getById);
router.put('/:id', auth, appointmentController.update);
router.delete('/:id', auth, appointmentController.remove);

module.exports = router;

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware'); 
const {
  getAllOrders,
  updateOrder,
  deleteOrder,
  payOrder,
} = require('../controllers/orderController');


router.post('/addOrder', authMiddleware, orderController.createOrUpdateOrder);
router.get('/', authMiddleware, getAllOrders);

router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);
router.put('/pay/:id', payOrder);

module.exports = router;


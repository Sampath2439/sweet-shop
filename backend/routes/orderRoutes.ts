import express from 'express';
import { createOrder, getMyOrders, getCart, saveCart } from '../controllers/orderController.ts';
import { protect } from '../middleware/authMiddleware.ts';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/myorders', protect, getMyOrders);
router.get('/cart', protect, getCart);
router.post('/cart', protect, saveCart);


export default router;

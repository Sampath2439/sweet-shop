import express from 'express';
import { getSweets, addSweet, updateSweet, deleteSweet } from '../controllers/sweetController.ts';
import { protect, admin } from '../middleware/authMiddleware.ts';

const router = express.Router();

router.get('/', getSweets);
router.post('/', protect, admin, addSweet);
router.put('/:id', protect, admin, updateSweet);
router.delete('/:id', protect, admin, deleteSweet);

export default router;

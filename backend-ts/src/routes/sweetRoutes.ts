import express from 'express';
import { getSweets, addSweet, updateSweet, deleteSweet } from '../controllers/sweetController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getSweets);
router.post('/', protect, admin, addSweet);
router.put('/:id', protect, admin, updateSweet);
router.delete('/:id', protect, admin, deleteSweet);

export default router;

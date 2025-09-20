"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sweetController_1 = require("../controllers/sweetController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get('/', sweetController_1.getSweets);
router.post('/', authMiddleware_1.protect, authMiddleware_1.admin, sweetController_1.addSweet);
router.put('/:id', authMiddleware_1.protect, authMiddleware_1.admin, sweetController_1.updateSweet);
router.delete('/:id', authMiddleware_1.protect, authMiddleware_1.admin, sweetController_1.deleteSweet);
exports.default = router;
//# sourceMappingURL=sweetRoutes.js.map
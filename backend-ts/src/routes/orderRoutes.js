"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controllers/orderController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post('/', authMiddleware_1.protect, orderController_1.createOrder);
router.get('/myorders', authMiddleware_1.protect, orderController_1.getMyOrders);
router.get('/cart', authMiddleware_1.protect, orderController_1.getCart);
router.post('/cart', authMiddleware_1.protect, orderController_1.saveCart);
exports.default = router;
//# sourceMappingURL=orderRoutes.js.map
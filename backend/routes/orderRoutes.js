import express from 'express'
import { getOrders, addOrderItems, getOrderById, updateOrderToPaid, getMyOrders } from '../controllers/orderController.js'
const router = express.Router()
import {protect, admin} from '../middleware/authMiddleware.js'

router.route('/')
    .post(protect, addOrderItems)
    .get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)

export default router
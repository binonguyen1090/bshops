import express from 'express'
import {getTopProduct,createProductReview, createProduct, updateProduct ,getProducts,getProductById, deleteProduct } from '../controllers/productController.js'
import {protect,admin} from '../middleware/authMiddleware.js'



const router = express.Router()


router.route('/')
    .get(getProducts)
    .post(protect, admin, createProduct)
router.get('/top',getTopProduct)
router.route('/:id/reviews')
    .post(protect, createProductReview)
router.route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct)
    

export default router
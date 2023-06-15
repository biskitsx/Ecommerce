import { Router } from 'express'
import { addToWishlist, createProduct, deleteImages, deleteProduct, getProduct, getProducts, rating, updateProduct, uploadImage } from '../controllers/productController.js'
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js'
import { productImgResize, upload } from '../middlewares/uploadImage.js'

const router = Router()

// CRUD
router.post("/",isAdmin, createProduct)
router.get("/", getProducts)
router.get("/find/:id", getProduct)
router.put("/find/:id", updateProduct)
router.delete("/find/:id", deleteProduct)

// WISHLIST
router.put("/wishlist/:prodId", authMiddleware, addToWishlist)

// RATING
router.put('/rating/:prodId', authMiddleware ,rating)

// UPLoAD 
router.put('/upload', upload.array('images', 10), productImgResize,uploadImage)
router.delete('/delete-img/:path',deleteImages )
export default router
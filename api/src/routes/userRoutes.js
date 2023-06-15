
import { Router } from "express";
import { getUsers, getUser, updateUser, deleteUser, blockUser, unBlockUser, register, login, handleRefreshToken, logout, updatePassword, forgotPasswordToken, resetPassword, getWishlist, saveAddress, userCart, getUserCart, emptyCart, applyCoupon, createOrder, getOrder, updateOrderStatus } from "../controllers/userController.js"; 
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";

const router = Router()

// auth 
router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)

// refreshh token
router.get('/refresh', handleRefreshToken)

// crud
router.get('/find/:id',getUser)
router.put('/find/:id', updateUser)
router.delete('/find/:id', deleteUser)
router.get('/', getUsers)

// block
router.put('/block-user/:id', isAdmin, blockUser)
router.put('/unblock-user/:id', isAdmin, unBlockUser)

// update password & forget
router.put('/password',authMiddleware , updatePassword)
router.post('/forgot-password-token', forgotPasswordToken)
router.post('/reset-password/:token', resetPassword)

// get wishlist
router.get('/wishlist', authMiddleware, getWishlist)

// save address
router.put('/save-address', authMiddleware, saveAddress)

// add & get to cart 
router.post('/cart', authMiddleware, userCart)
router.get('/cart', authMiddleware, getUserCart)
router.delete('/cart', authMiddleware, emptyCart)

// apply coupon
router.post('/cart/apply-coupon', authMiddleware, applyCoupon)
router.post('/cart/cash-order', authMiddleware, createOrder)
router.get('/cart/get-order', authMiddleware, getOrder)

router.put('/update-order', authMiddleware, updateOrderStatus)

export default router
import { createCoupon, deleteCoupon, getCoupon, getCoupons, updateCoupon } from '../controllers/couponController.js'
import {Router} from 'express'

const router = Router()

router.post('/', createCoupon)
router.get('/', getCoupons)
router.get('/:id', getCoupon)
router.put('/:id', updateCoupon)
router.delete('/:id', deleteCoupon)

export default router
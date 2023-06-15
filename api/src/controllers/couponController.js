import Coupon from '../models/couponModel.js'

export const createCoupon = async (req, res, next) => {
    try {
        const coupon = await Coupon.create(req.body)
        res.json(coupon)
    } catch (error) {
        next(error)
    }
}

export const updateCoupon = async (req, res, next) => {
    try {
        const coupon = await Coupon.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.json(coupon)
    } catch (error) {
        next(error)
    }
}

export const getCoupon = async (req, res, next) => {
    try {
        const coupon = await Coupon.findByIdAndUpdate(req.params.id)
        res.json(coupon)
    } catch (error) {
        next(error)
    }
}

export const getCoupons = async (req, res, next) => {
    try {
        res.json(await Coupon.find({}))
    } catch (error) {
        next(error)
    }
}

export const deleteCoupon = async (req, res, next) => {
    try {
        const coupon = await Coupon.findByIdAndDelete(req.params.id)
        res.json(coupon)
    } catch (error) {
        next(error)
    }
}

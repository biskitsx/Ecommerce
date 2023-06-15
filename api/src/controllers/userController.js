import bcrypt from 'bcrypt'
import crypto from 'crypto'
import User from "../models/userModel.js"
import { validateMongoDbId } from "../utils/validateMongodbId.js"
import { tokenManager } from "../config/tokenManager.js"
import { createError } from "../utils/createError.js"
import { sendEmail } from './emailController.js'
import Cart from '../models/cartModel.js'
import Product from '../models/productModel.js'
import Coupon from '../models/couponModel.js'
import Order from '../models/orderModel.js'
import uniqid from 'uniqid'
// register
export const register = async (req, res, next) => {
    try {
        const user = await User.register(req.body)
        // token
        const token = tokenManager.createToken(user._id)
        // response

        return res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            mobile: user.mobile,
            token
        })

    } catch (error) {
        next(error)
    }
}

// login
export const login = async (req, res, next) => {
    try {
        const user = await User.login(req.body)

        // token
        const token = tokenManager.createToken(user._id)
        const refreshToken = tokenManager.createRefreshToken(user._id)
        user.refreshToken = refreshToken
        await user.save()

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })

        // response
        return res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            mobile: user.mobile,
            token
        })
    } catch (error) {
        next(error)
    }
}


/* CRUD  GET*/
export const getUsers = async (req, res, next) => {
    try {
        res.json(await User.find({}))
    } catch (error) {
        next(error)
    }
}

/* CRUD  GET*/
export const getUser = async (req, res, next) => {
    try {
        validateMongoDbId(req.params.id)
        res.json(await User.findById(req.params.id))
    } catch (error) {
        next(error)
    }
}

/* CRUD DELETE */
export const deleteUser = async (req, res, next) => {
    try {
        validateMongoDbId(req.params.id)
        res.json(await User.findByIdAndDelete(req.params.id))
    } catch (error) {
        next(error)
    }
}

/* CRUD  UPDATE*/
export const updateUser = async (req, res, next) => {
    try {
        validateMongoDbId(req.params.id)
        const user = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.json(user)

    } catch (error) {
        next(error)
    }
}

/* BLOCK */
export const blockUser = async (req, res, next) => {
    try {
        validateMongoDbId(req.params.id)
        const user = await User.findByIdAndUpdate(req.params.id, {
            $set: { isBlocked: true }
        }, { new: true })
        res.json(user)
    } catch (error) {
        next(error)
    }
}

/* UNBLOCK */
export const unBlockUser = async (req, res, next) => {
    try {
        validateMongoDbId(req.params.id)

        const user = await User.findByIdAndUpdate(req.params.id, {
            $set: { isBlocked: false }
        }, { new: true })
        res.json(user)
    } catch (error) {
        next(error)
    }
}


/* REFRESH TOKEN*/
export const handleRefreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) return next(createError(401, "No Refresh Token in Cookies"))

        const user = await User.findOne({ refreshToken })
        if (!user) return next(createError(401, "No Refresh present in db or not match"))

        const decoded = tokenManager.verifyToken(refreshToken)
        const accessToken = tokenManager.createToken(user._id)

        res.json({ accessToken })

    } catch (error) {
        next(error)
    }
}



export const logout = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) return next(createError(401, "No Refresh Token in Cookies"))

        const user = await User.findOne({ refreshToken })
        if (user) {
            user.refreshToken = ''
            await user.save()
        }

        res
            .status(204)
            .clearCookie("refreshToken", { httpOnly: true, secure: true })
            .json({ msg: "yeye" })

    } catch (error) {
        next(error)
    }
}

export const updatePassword = async (req, res, next) => {
    try {
        console.log(req.user)
        const { _id } = req.user
        const { password } = req.body
        validateMongoDbId(_id)
        const user = await User.findById(_id)
        if (password) {
            await user.updatePassword(password)
            res.json(user)
        } else {
            res.json(user)
        }
    } catch (error) {
        next(error)
    }
}

export const forgotPasswordToken = async (req, res, next) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email })
        if (!user) return next(createError(404, "User not found with this email"))

        const token = await user.createPasswordResetToken()
        const resetURL = `Hi, Please follow tis link to reset Your password. This link is valid till 10 minutes from now <a href='http://localhost:3000/api/user/reset-password/${token}'>click</a>`
        const data = {
            to: email,
            text: "Hey user",
            subject: "Forgot Password Link",
            html: resetURL
        }
        sendEmail(data, req, res, next)
        res.json(token)
    } catch (error) {
        next(error)
    }
}

export const resetPassword = async (req, res, next) => {
    try {
        const { password } = req.body
        const { token } = req.params
        const hashToken = crypto.createHash('sha256').update(token).digest("hex")
        const user = await User.findOne({
            passwordResetToken: hashToken,
            passwordResetExpires: { $gt: Date.now()}
        })
        if (!user) return next(createError(405, "Token Expired, Please try again"))

        // change password
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined
        await user.save()
        res.json(user)
    } catch (error) {
        next(error)
    }
}


export const getWishlist = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).populate('wishList')
        res.json(user)
    } catch (error) {
        next(error)
    }
}

export const saveAddress = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.user._id, 
            {
                address: req.body.address
            },
            {
                new: true
            }
            )
            res.json(user)
        } catch (error) {
            next(error)
        }
    }
    
    export const userCart = async (req, res, next) => {
        try {
            const { cart } = req.body
            const { _id } = req.user
            
            let products =[]
            const alreadyExistCart = await Cart.findOne( { orderBy: _id })
            
            if (alreadyExistCart) {
                alreadyExistCart.remove()
            }
            
            for (let i=0 ; i < cart.length ; i++) {
                let object = {}
                object.product = cart[i]._id
                object.count = cart[i].count
                object.color = cart[i].color
                const getPrice = await Product.findById(cart[i]._id).select("price").exec()
                object.price = getPrice.price
                products.push(object)
            }
            
            let cartTotal = 0 
            for (let i=0; i<products.length ; i++ ) {
                cartTotal += (products[i].price* products[i].count)
            }
            
            const newCart = await Cart.create({
                products,
                cartTotal,
                orderBy: _id
            })
            
            res.json(newCart)
            
        } catch (error) {
            next(error)
        }
    }
    
    
export const getUserCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({orderBy: req.user._id})
        res.json(cart)
    } catch (error) {
        next(error)
    }
}

export const emptyCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOneAndRemove({orderBy: req.user._id})
        res.json(cart)
    } catch (error) {
        next(error)
    }
}

export const applyCoupon = async (req, res, next) => {
    try {
        const { coupon } = req.body
        // const cart = await Cart.findOneAndRemove({orderBy: req.user._id})
        const validCoupon = Coupon.findOne({name: coupon})
        if (!validCoupon) return next(404, "Invalid Coupon")

        let { cartTotal } = await Cart.findOne({ orderBy: _id})
        const totalAfterDiscount = (cartTotal - (cartTotal * validCoupon.discount)/100).toFixed(2)

        const cart = await Cart.findOneAndUpdate({ orderBy: _id}, {
            totalAfterDiscount
        }, {new: true})
        res.json(cart)
    } catch (error) {
        next(error)
    }
}

export const createOrder = async (req, res, next) => {
    try {
        const { COD, couponApplied } = req.body
        const { _id } =req.body
        if (!COD) return next(400, "Create cash order fail")
        const userCart = await Cart.findOne( { orderBy: _id })
        let finalAmount ;
        if (couponApplied && userCart.totalAfterDiscount) {
            finalAmount = userCart.totalAfterDiscount * 100
        } else {
            finalAmount = userCart.cartTotal * 100
        }

        let newOrder = await new Order({
            products: userCart.products,
            paymentIntent: {
                id: uniqid(),
                method: 'COD',
                amout: finalAmount,
                status: 'Cash on Delivery',
                created: Date.now(),
                currency: "usd"
            },
            orderBy: _id,
            orderStatus: 'Cash on Delivery'
        }).save()
        let update = userCart.products.map((item) => {
            return {
                updateOne: {
                    filter: { _id: item.product._id},
                    update: { $inc: {quantity: -item.count}, sold: +item.count}
                }
            }
        })
        const updated = await Product.bulkWrite(update, {})

        res.json({msg: 'success'})
    } catch (error) {
        next(error)
    }
}

export const getOrder = async (req, res, next) => {
    try {
        const userOrders = await Order.findOne({orderBy: req.user._id.toString()}).populate('products.product').exec()
        res.json(userOrders)
        // res.json(await Order.find({}))
    } catch (error) {
        next(error)
    }
}
export const updateOrderStatus = async (req, res, next) => {
    try {
        const { status } = req.body
        const order = await findById(req.params.id, {
            orderStatus: status,
            paymentIntent: {
                status
            }
        }, {new: true})
        res.json(order)
    } catch (error) {
        next(error)
    }
}



import { tokenManager } from "../config/tokenManager.js"
import User from "../models/userModel.js"
import {createError} from '../utils/createError.js'
export const authMiddleware = async (req, res, next) => {
    // if (req?.headers?.authorization?.startsWith("Bearer")) {
    //     const token = req.headers.authorization.split(" ")[1]
    //     try {
    //         if (token) {
    //             const decoded = tokenManager.verifyToken(token)
    //             if (decoded) {
    //                 const user  = await User.findById(decoded.id)
    //                 req.user = user
    //                 return next()
    //             }
    //         }
    //     } catch (error) {
    //         return next(error)
    //     }
    // } else {
    //     return next(createError(404, "There is no token attached to header"))
    // }
    try {
        const token = req.cookies.refreshToken
        if (!token) return next(createError(404, "There is no token attached to cookies"))

        const decoded = tokenManager.verifyToken(token)
        if (decoded) {
            const user = await User.findById(decoded.id)
            req.user = user 
            return next()

        }

    } catch(error) {
        next(error)
    }
}

export const isAdmin = async (req, res, next) => {
    if (req?.headers?.authorization?.startsWith("Bearer")) {
        const token = req.headers.authorization.split(" ")[1]
        try {
            if (token) {
                const decoded = tokenManager.verifyToken(token)
                if (decoded) {
                    const user  = await User.findById(decoded.id)
                    if (user.role !== 'admin') {
                        return next(createError(404, "You are not admin"))
                    }
                    req.user = user 
                    return next()
                }
            }
        } catch (error) {
            // console.log("hello")
            return next(error)
        }
    } else {
        return next(createError(404, "There is no token attached to header"))
    }
}
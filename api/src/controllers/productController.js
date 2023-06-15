import Product from '../models/productModel.js'
import User from '../models/userModel.js'

import slugify from 'slugify'
import { createError } from '../utils/createError.js'
import {cloudinaryDeleteImg, cloudinaryUploadImg} from '../utils/cloudinary.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const createProduct = async (req, res, next) => {
    try {
        if (req.body.title) req.body.slug = slugify(req.body.title)
        const product = await Product.create(req.body)
        res.json(product)
    } catch (error) {
        next(error)
    }
}

export const getProducts = async (req, res, next) => {
    try {
        const { min, max , sort, fields, page, limit, ...others } = req.query
        let query = Product.find({
            price: { $gte: min || 0 , $lte: max || 100000},
            ...others
        })

        /* SORT */
        if (sort) {
            const sortBy = sort.split(',').join(' ')
            query.sort(sortBy)
        } else {
            query.sort('createAt')
            
        }

        /* LIMITING THE FIELDS */
        if (fields) {
            const sortBy = fields.split(',').join(' ')
            query.select(sortBy)
        } else {
            query.select('-__v')
        }

        /* pagination */
        if (page) {
            const productCount = await Product.countDocuments()
            const skip = (page - 1) * limit
            
            if (skip > productCount) next(createError(411, "This Page does not exists"))
            query.skip(skip).limit(limit)

        }
        const products  = await query.populate('color')
        res.json(products)
    } catch (error) {
        next(error)
    }
}

export const getProduct = async (req, res, next) => {
    try {
        res.json(await Product.findById(req.params.id))
    } catch (error) {
        next(error)
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
        res.json(await Product.findByIdAndDelete(req.params.id))
    } catch (error) {
        next(error)
    }
}

export const updateProduct = async (req, res, next) => {
    try {
        if (req.body.title) req.body.slug = slugify(req.body.title)
        const product = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})
        res.json(product)
    } catch (error) {
        next(error)
    }
}

export const addToWishlist = async (req, res, next) => {
    const { _id } = req.user
    const { prodId } = req.params
    
    try {
        let user = await User.findById(_id)
        const isWishlist = user.wishList.indexOf(prodId)
        if (isWishlist !== -1) { // มี prod Id
            user.wishList.splice(isWishlist, 1)
        } else {
            user.wishList.push(prodId)
        }
        await user.save()
        res.json(user)
    } catch (error) {
        next(error)
    }
}

export const rating = async (req, res, next) => {
    const { _id } = req.user
    const { prodId } = req.params
    const { star, comment } = req.body
    
    const data = {
        star: star,
        comment: comment,
        postedBy: _id
    }

    try {
        const product = await Product.findById(prodId)
        const indexRating = product.ratings.findIndex((item) => item.postedBy.toString() === _id.toString()) 
        
        if (indexRating !== -1) { // เจอ
            product.ratings[indexRating] = data
        } else { // ไม่เจอ
            product.ratings.push(data)
        }

        // all rating
        let sum = 0 ;
        let count = product.ratings.length
        product.ratings.forEach((item)=>{
            sum += item.star
        })

        product.totalRating = Math.round(sum/count)
        await product.save()
        res.json(product)

    } catch (error) {
        next(error)
    }
}

export const uploadImage = async (req, res, next) => {
    try {
        // const { id } = req.params
        const { files } = req
        const urls = []
        console.log(files)
        for (const file of files) {
            const sharpPath = path.join(__dirname,`../public/images/products/${file.filename}`)
            const newPath = await cloudinaryUploadImg(sharpPath)
            urls.push(newPath)
            fs.unlinkSync(sharpPath)
        }
        res.json(urls)
    } catch (error) {
        console.error(error)
        next(error)
    }
}

export const deleteImages = async (req, res, next) => {
    try {
        const deleted = await cloudinaryDeleteImg(req.params.path)
        res.json({msg: "deleted successfully"})
    } catch (error) {
        next(error)
    }
}
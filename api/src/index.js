// package import
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'

// dotnev
dotenv.config()

// app express
const app = express()

// config & utils
import { logger } from './utils/logger.js'
import { dbConnect } from './config/dbConnect.js'
import { errorMiddleware } from './middlewares/errorMiddleware.js'

// routes import
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import blogRoutes from './routes/blogRoutes.js'
import categoryRoutes from './routes/prodCategoryRoutes.js'
import brandRoutes from './routes/brandRoutes.js'
import couponRoutes from './routes/couponRoutes.js'
import colorRoutes from './routes/colorRoutes.js'
import enqRoutes from './routes/enqRoutes.js'

// configuration
app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))

// routes
app.use('/api/user',    userRoutes)
app.use('/api/product', productRoutes)
app.use('/api/blog',    blogRoutes)
app.use('/api/category',categoryRoutes)
app.use('/api/brand',   brandRoutes)
app.use('/api/coupon',  couponRoutes)
app.use('/api/color',   colorRoutes)
app.use('/api/enquiry', enqRoutes)


// handler error
app.use(errorMiddleware)

// listening 
const PORT = process.env.PORT || 4000
app.listen(PORT,()=>{
    logger.info(`Node Server at PORT: ${PORT}`)
    dbConnect()
})
import mongoose from 'mongoose'
import { logger } from '../utils/logger.js'
export const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        logger.info("Database Connected Successfully")
    } catch(e) {
        logger.error("Can't Connect to Database")
    }
}
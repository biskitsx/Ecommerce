import multer from 'multer'
import sharp from 'sharp'
import path, { dirname, extname } from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/images"))
    },
    filename: function (req, file, cb) {
        console.log('first')
        cb(null, Date.now() + extname(file.originalname))
    }
})

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb({ message: "Unsupported file format" }, false)
    }

}

export const upload = multer({
    storage: storage,
    fileFilter: multerFilter,
    limits: { fieldSize: 2000000 }
})

export const productImgResize = async (req, res, next) => {
    try {
        if (req.files) {
            for (const file of req.files) {
                await sharp(file.path)
                    .resize(300, 300)
                    .toFormat('jpeg')
                    .jpeg({ quality: 90 })
                    .toFile(path.join(__dirname, `../public/images/products/${file.filename}`));
                fs.unlinkSync(file.path);
            }
        }
        next()
    } catch (error) {
        next(error)
    }
}

export const blogImgResize = async (req, res, next) => {
    if (req.files) {
        for (const file of req.files) {
            await sharp(file.path)
                .resize(300, 300)
                .toFormat('jpeg')
                .jpeg({ quality: 90 })
                .toFile(path.join(__dirname, `../public/images/products/${file.filename}`));
            fs.unlinkSync(file.path);
        }
    }
    next()
}


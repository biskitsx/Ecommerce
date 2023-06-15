import Brand from '../models/brandModel.js'

export const createBrand = async (req, res, next) => {
    try {
        const brand = await Brand.create(req.body)
        res.json(brand)
    } catch (error) {
        next(error)
    }
}

export const updateBrand = async (req, res, next) => {
    try {
        const brand = await Brand.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.json(brand)
    } catch (error) {
        next(error)
    }
}

export const getBrand = async (req, res, next) => {
    try {
        const brand = await Brand.findByIdAndUpdate(req.params.id)
        res.json(brand)
    } catch (error) {
        next(error)
    }
}

export const getBrands = async (req, res, next) => {
    try {
        res.json(await Brand.find({}))
    } catch (error) {
        next(error)
    }
}

export const deleteBrand = async (req, res, next) => {
    try {
        const brand = await Brand.findByIdAndDelete(req.params.id)
        res.json(brand)
    } catch (error) {
        next(error)
    }
}

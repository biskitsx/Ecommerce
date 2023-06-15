import Category from '../models/prodCategoryModel.js'

export const createCategory = async (req, res, next) => {
    try {
        const category = await Category.create(req.body)
        res.json(category)
    } catch (error) {
        next(error)
    }
}

export const updateCategory = async (req, res, next) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.json(category)
    } catch (error) {
        next(error)
    }
}

export const getCategory = async (req, res, next) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id)
        res.json(category)
    } catch (error) {
        next(error)
    }
}

export const getCategorys = async (req, res, next) => {
    try {
        res.json(await Category.find({}))
    } catch (error) {
        next(error)
    }
}

export const deleteCategory = async (req, res, next) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id)
        res.json(category)
    } catch (error) {
        next(error)
    }
}

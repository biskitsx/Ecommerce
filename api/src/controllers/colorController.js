import Color from '../models/colorModel.js'

export const createColor = async (req, res, next) => {
    try {
        const color = await Color.create(req.body)
        res.json(color)
    } catch (error) {
        next(error)
    }
}

export const updateColor = async (req, res, next) => {
    try {
        const color = await Color.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.json(color)
    } catch (error) {
        next(error)
    }
}

export const getColor = async (req, res, next) => {
    try {
        const color = await Color.findByIdAndUpdate(req.params.id)
        res.json(color)
    } catch (error) {
        next(error)
    }
}

export const getColors = async (req, res, next) => {
    try {
        res.json(await Color.find({}))
    } catch (error) {
        next(error)
    }
}

export const deleteColor = async (req, res, next) => {
    try {
        const color = await Color.findByIdAndDelete(req.params.id)
        res.json(color)
    } catch (error) {
        next(error)
    }
}

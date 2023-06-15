import Enquiry from '../models/enqModel.js'

export const createEnquiry = async (req, res, next) => {
    try {
        const enquiry = await Enquiry.create(req.body)
        res.json(enquiry)
    } catch (error) {
        next(error)
    }
}

export const updateEnquiry = async (req, res, next) => {
    try {
        const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.json(enquiry)
    } catch (error) {
        next(error)
    }
}

export const getEnquiry = async (req, res, next) => {
    try {
        const enquiry = await Enquiry.findByIdAndUpdate(req.params.id)
        res.json(enquiry)
    } catch (error) {
        next(error)
    }
}

export const getEnquirys = async (req, res, next) => {
    try {
        res.json(await Enquiry.find({}))
    } catch (error) {
        next(error)
    }
}

export const deleteEnquiry = async (req, res, next) => {
    try {
        const enquiry = await Enquiry.findByIdAndDelete(req.params.id)
        res.json(enquiry)
    } catch (error) {
        next(error)
    }
}

import mongoose, { model } from "mongoose";

const enqSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        mobile: {
            type: String,
            required: true
        },
        comment: {
            type: String,
            required: true
        },
        status: {
            type: String,
            deufalt: "Submitted",
            enum: ["Submitted", "Contacted", "In Progress"]
        }
    },
    {
        timestamps: true
    }
)

const Enquiry = mongoose.models.Enquiry || mongoose.model("Enquiry", enqSchema)
export default Enquiry
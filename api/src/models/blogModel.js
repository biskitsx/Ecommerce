import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        numViews: {
            type: Number,
            default: 0
        },
        isLiked: {
            type: Boolean,
            default: false
        },
        isDisLiked: {
            type: Boolean,
            default: false
        },
        likes: [{
            type: mongoose.Types.ObjectId,
            ref: "User"
        }],
        dislikes: [{
            type: mongoose.Types.ObjectId,
            ref: "User"
        }],
        image: {
            type: String,
            default: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg'
        },
        author: {
            type: String,
            default: "admin"
        }
    }, 
    {
        timestamps: true,
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        }
});

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema)
export default Blog
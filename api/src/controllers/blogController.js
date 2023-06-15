import Blog from '../models/blogModel.js'

export const createBlog = async (req, res, next) => {
    try {
        const blog = await Blog.create(req.body)
        res.json(blog)
    } catch (error) {
        next(error)
    }
}

export const updateBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.json(blog)
    } catch (error) {
        next(error)
    }
}

export const getBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, {
            $inc: { numViews: 1 }
        }, { new: true }).populate('dislikes likes')
        
        res.json(blog)
    } catch (error) {
        next(error)
    }
}

export const getBlogs = async (req, res, next) => {
    try {
        res.json(await Blog.find({}))
    } catch (error) {
        next(error)
    }
}

export const deleteBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id)
        res.json(blog)
    } catch (error) {
        next(error)
    }
}

export const likeTheBlog = async (req, res, next) => {
    try {
        const blogId = req.params.blogId
        const { isLiked, isDisLiked } = await Blog.findById(blogId)
        const userId = req.user.id
        let blog;

        // unlike
        if (isLiked) {
            blog = await Blog.findByIdAndUpdate(blogId,
                {
                    isLiked: false,
                    $pull: { likes: userId }
                }, { new: true })
        } // กดไลค์ 
        else {
            // กด dislike อยู่
            if (isDisLiked) {
                blog = await Blog.findByIdAndUpdate(blogId,
                    {
                        isLiked: true,
                        isDisLiked: false,
                        $push: { likes: userId },
                        $pull: { dislikes: userId }
                    }, { new: true })
            } else { // ไม่ได้กด dislike
                blog = await Blog.findByIdAndUpdate(blogId,
                    {
                        isLiked: true,
                        $push: { likes: userId },
                    }, { new: true })

            }
        }
        res.json(blog)
    } catch (error) {
        next(error)
    }
}


export const dislikeTheBlog = async (req, res, next) => {
    try {
        const blogId = req.params.blogId
        const { isLiked, isDisLiked } = await Blog.findById(blogId)
        const userId = req.user.id
        let blog;
        // กด dislike อยู่
        if (isDisLiked) {

            blog = await Blog.findByIdAndUpdate(blogId,
                {
                    isDisLiked: false,
                    $pull: { dislikes: userId }
                }, { new: true })
            } // ไม่ได้กด dislike 
        else {
            // กด like อยู่
            if (isLiked) {
                blog = await Blog.findByIdAndUpdate(blogId,
                    {
                        isLiked: false,
                        isDisLiked: true,
                        $pull: { likes: userId },
                        $push: { dislikes: userId }
                    }, { new: true })
            } else { // ไม่ได้กด ไลค์
                blog = await Blog.findByIdAndUpdate(blogId,
                    {
                        isDisLiked: true,
                        $push: { dislikes: userId },
                    }, { new: true })
            }
        }
        res.json(blog)
    } catch (error) {
        next(error)
    }
}

export const uploadImage = async (req, res, next) => {
    try {
        const { id } = req.params
        const { files } = req
        const urls = []
        for (const file of files) {
            const sharpPath = path.join(__dirname,`../public/images/blogs/${file.filename}`)
            const newPath = await cloudinaryUploadImg(sharpPath)
            urls.push(newPath)
            fs.unlinkSync(sharpPath)
        }
        const product = await Blog.findByIdAndUpdate(id, {
            images: urls
        }, {new :true})
        res.json(product)
    } catch (error) {
        console.error(error)
        next(error)
    }
}
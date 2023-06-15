import { Router } from 'express'
import { createBlog, deleteBlog, dislikeTheBlog, getBlog, getBlogs,  likeTheBlog, updateBlog, uploadImage } from '../controllers/blogController.js'
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js'
import { blogImgResize, upload } from '../middlewares/uploadImage.js'

const router = Router()

/* CRUD */
router.get("/:id", getBlog)
router.get("/", getBlogs)
router.post("/", isAdmin,createBlog)
router.put("/:id",isAdmin,  updateBlog)
router.delete("/:id", isAdmin, deleteBlog)

/* LIKE DISLIKE */
router.put("/like/:blogId",authMiddleware,  likeTheBlog)
router.put("/dislike/:blogId",authMiddleware,  dislikeTheBlog)

/* UPLOAD */
router.put('/upload/:id', upload.array('images', 10), blogImgResize, uploadImage)

export default router
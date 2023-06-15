import { createCategory, deleteCategory, getCategory, getCategorys, updateCategory } from '../controllers/prodCategoryController.js'
import {Router} from 'express'

const router = Router()

router.post('/', createCategory)
router.get('/', getCategorys)
router.get('/:id', getCategory)
router.put('/:id', updateCategory)
router.delete('/:id', deleteCategory)

export default router
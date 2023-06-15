import { createColor, deleteColor, getColor, getColors, updateColor } from '../controllers/colorController.js'
import {Router} from 'express'

const router = Router()

router.post('/', createColor)
router.get('/', getColors)
router.get('/:id', getColor)
router.put('/:id', updateColor)
router.delete('/:id', deleteColor)

export default router
import { createBrand, deleteBrand, getBrand, getBrands, updateBrand } from '../controllers/brandController.js'
import {Router} from 'express'

const router = Router()

router.post('/', createBrand)
router.get('/', getBrands)
router.get('/:id', getBrand)
router.put('/:id', updateBrand)
router.delete('/:id', deleteBrand)

export default router
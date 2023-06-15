import { createEnquiry, deleteEnquiry, getEnquiry, getEnquirys, updateEnquiry } from '../controllers/enqController.js'
import {Router} from 'express'

const router = Router()

router.post('/', createEnquiry)
router.get('/', getEnquirys)
router.get('/:id', getEnquiry)
router.put('/:id', updateEnquiry)
router.delete('/:id', deleteEnquiry)

export default router
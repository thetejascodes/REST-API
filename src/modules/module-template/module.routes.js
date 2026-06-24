import { Router } from 'express'
import ModuleController from './module.controller'

const router = Router()

router.post('/', ModuleController.create)
router.get('/', ModuleController.list)

export default router
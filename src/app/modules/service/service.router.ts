import express from 'express'
import { ServiceController } from './service.controller'
const router = express.Router()
router.get('/all/:id', ServiceController.allService)
router.get('/', ServiceController.getAllFromDB)
router.get('/admin/:id', ServiceController.AdminGetService)
router.post('/', ServiceController.insertIntoDB)
router.patch('/:id', ServiceController.updateOneInDB)
router.delete('/:id', ServiceController.deleteByIdFromDB)
router.get('/:id', ServiceController.getByIdFromDB)
export const ServiceRoutes = router

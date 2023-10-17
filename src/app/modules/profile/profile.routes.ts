import express from 'express'
import { ProfileController } from './profile.controller'

const router = express.Router()

router.get('/:id', ProfileController.getByIdFromDB)
router.patch('/:id', ProfileController.updateOneInDB)

router.delete('/:id', ProfileController.deleteByIdFromDB)
export const ProfileRoutes = router

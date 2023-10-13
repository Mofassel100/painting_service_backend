import express from 'express'
import { ProfileController } from './profile.controller'

const router = express.Router()

router.patch('/:id', ProfileController.updateOneInDB)

router.delete('/:id', ProfileController.deleteByIdFromDB)
router.get('/:id', ProfileController.getByIdFromDB)
export const ProfileRoutes = router

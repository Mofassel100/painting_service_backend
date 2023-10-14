import express from 'express'
import { FeedbackController } from './feedback.controller'
const router = express.Router()
router.get('/', FeedbackController.getAllFromDB)
// router.get('/:id', AcademicFacultyController.getByIdFromDB);

router.post('/', FeedbackController.insertIntoDB)

router.patch('/:id', FeedbackController.updateOneInDB)

router.delete('/:id', FeedbackController.deleteByIdFromDB)
router.get('/:id', FeedbackController.getByIdFromDB)
export const FeedbackRoutes = router

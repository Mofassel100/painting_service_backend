import express from 'express'
import { CategoryController } from './category.controller'


const router = express.Router()
router.get('/', CategoryController.getAllFromDB)
router.get('/admin/:id', CategoryController.UserGetServiceCategory)
// router.get('/:id', AcademicFacultyController.getByIdFromDB);

router.post(
  '/',

  CategoryController.insertIntoDB,
)

router.patch('/:id', CategoryController.updateOneInDB)

router.delete('/:id', CategoryController.deleteByIdFromDB)
router.get('/:id', CategoryController.getByIdFromDB)
export const CategoryRoutes = router
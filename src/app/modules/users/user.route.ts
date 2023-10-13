import express from 'express'

import { UserController } from './user.controller'

const router = express.Router()

router.get('/', UserController.getAllFromDB)
router.get('/admin', UserController.getAllAdmin)
// router.get('/:id', AcademicFacultyController.getByIdFromDB);

router.post(
  '/',

  UserController.insertIntoDB,
)

// router.patch(
//     '/:id',
//     validateRequest(AcademicFacultyValidation.update),
//     auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//     AcademicFacultyController.updateOneInDB
// );

// router.delete(
//     '/:id',
//     auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//     AcademicFacultyController.deleteByIdFromDB
// );

export const userRoutes = router

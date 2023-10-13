import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../share/catchAsync'
import sendResponse from '../../../share/sendResponse'
import { UserService } from './user.service'
import pick from '../../../share/pick'
import { userFilterableFields } from './user.constant'

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.insertIntoDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'UserCreated created successfully',
    data: result,
  })
})

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields)
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
  const result = await UserService.getAllFromDB(filters, options)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User feched successfully!',
    data: result,
  })
})

// const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const result = await AcademicFacultyService.getByIdFromDB(id);
//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: 'AcademicFaculty fetched successfully',
//         data: result
//     });
// })

// const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const result = await AcademicFacultyService.updateOneInDB(id, req.body);
//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: 'AcademicFaculty updated successfully',
//         data: result
//     });
// });

// const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const result = await AcademicFacultyService.deleteByIdFromDB(id);
//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: 'AcademicFaculty delete successfully',
//         data: result
//     });
// });

export const UserController = {
  insertIntoDB,
  getAllFromDB,
  // getByIdFromDB,
  // updateOneInDB,
  // deleteByIdFromDB
}

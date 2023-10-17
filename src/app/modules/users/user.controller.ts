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
const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
  
  const result = await UserService.getAllAdmin()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User feched successfully!',
    data: result,
  })
})
const getAllUser = catchAsync(async (req: Request, res: Response) => {
  
  const result = await UserService.getAllUser()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User feched successfully!',
    data: result,
  })
})



export const UserController = {
  insertIntoDB,
  getAllFromDB,
  getAllAdmin ,
  getAllUser
  // getByIdFromDB,
  // updateOneInDB,
  // deleteByIdFromDB
}

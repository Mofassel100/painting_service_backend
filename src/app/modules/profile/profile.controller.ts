import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../share/catchAsync'
import sendResponse from '../../../share/sendResponse'
import { ProfileService } from './profile.service'

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await ProfileService.getByIdFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile fetched successfully',
    data: result,
  })
})

const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await ProfileService.updateOneInDB(id, req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile updated successfully',
    data: result,
  })
})

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await ProfileService.deleteByIdFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile delete successfully',
    data: result,
  })
})

export const ProfileController = {
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
}

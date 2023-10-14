import { Request, Response } from 'express'
import catchAsync from '../../../share/catchAsync'
import { FeedbackService } from './feedback.service'
import sendResponse from '../../../share/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../share/pick'
import { feedbackFilterableFields } from './feedback.constant'
const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await FeedbackService.insertIntoDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback created successfully',
    data: result,
  })
})
const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, feedbackFilterableFields)
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
  const result = await FeedbackService.getAllFromDB(filters, options)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback all feched successfully!',
    data: result,
  })
})
const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await FeedbackService.getByIdFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Feedback fetched successfully',
    data: result,
  })
})

const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await FeedbackService.updateOneInDB(id, req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback updated successfully',
    data: result,
  })
})

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await FeedbackService.deleteByIdFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback delete successfully',
    data: result,
  })
})

export const FeedbackController = {
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
  getAllFromDB,
  insertIntoDB,
}

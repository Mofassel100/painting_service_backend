import { Request, Response } from 'express'
import catchAsync from '../../../share/catchAsync'
import { ServiceService } from './service.service'
import sendResponse from '../../../share/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../share/pick'
import { serviceFilterableFields } from './service.constant'

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceService.insertIntoDB(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service created successfully',
    data: result,
  })
})

const AdminGetService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await ServiceService.UserGetService(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Specific User All Service feched successfully!',
    data: result,
  })
})
const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, serviceFilterableFields)
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
  const result = await ServiceService.getAllFromDB(filters, options)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service feched successfully!',
    data: result,
  })
})
const allService = catchAsync(async (req: Request, res: Response) => {
const id = req.params.id
  const result = await ServiceService.allService(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service feched successfully!',
    data: result,
  })
})
const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await ServiceService.getByIdFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service fetched successfully',
    data: result,
  })
})

const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await ServiceService.updateOneInDB(id, req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service updated successfully',
    data: result,
  })
})

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await ServiceService.deleteByIdFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service delete successfully',
    data: result,
  })
})

export const ServiceController = {
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
  getAllFromDB,
  insertIntoDB,
  AdminGetService,
  allService
}

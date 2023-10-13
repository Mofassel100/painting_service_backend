import { Request, Response } from "express"
import catchAsync from "../../../share/catchAsync"
import { CategoryService } from "./category.service"
import sendResponse from "../../../share/sendResponse"
import httpStatus from "http-status"
import pick from "../../../share/pick"
import { categoryFilterableFields } from "./category.constant"

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await CategoryService.insertIntoDB(req.body)
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category created successfully',
      data: result,
    })
  })
  
  const UserGetServiceCategory = catchAsync(async (req: Request, res: Response) => {
     const {id} = req.params
    const result = await CategoryService.UserGetService(id)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Specific User All Category feched successfully!',
      data: result,
    })
  })
  const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, categoryFilterableFields)
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
    const result = await CategoryService.getAllFromDB(filters, options)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category feched successfully!',
      data: result,
    })
  })
  const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await CategoryService.getByIdFromDB(id)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category fetched successfully',
      data: result,
    })
  })
  
  const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await CategoryService.updateOneInDB(id, req.body)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'category updated successfully',
      data: result,
    })
  })
  
  const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await CategoryService.deleteByIdFromDB(id)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'category delete successfully',
      data: result,
    })
  })
  
  export const CategoryController = {
    getByIdFromDB,
    updateOneInDB,
    deleteByIdFromDB,
    getAllFromDB,
    insertIntoDB,
    UserGetServiceCategory
  }
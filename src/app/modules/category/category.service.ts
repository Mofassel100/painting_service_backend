/* eslint-disable @typescript-eslint/ban-ts-comment */
// import { v2 as cloudinary} from 'cloudinary';


import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'

import { Prisma } from '@prisma/client'
import { ICategory, ICategoryFilterRequest } from './category.interface'
import prisma from '../../../share/prisma'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'
import { paginationHelpers } from '../../../helper/paginationHelper'
import { categorySearchableFields } from './category.constant'

const insertIntoDB = async (data: ICategory): Promise<ICategory> => {
  const isExistUser = await prisma.category.findFirst({
    where: {
       title: data.title
    },
  })
  console.log(isExistUser)
  if (isExistUser) {
    throw new ApiError(httpStatus.BAD_GATEWAY, 'Category Service already exist')
  }
  const result = await prisma.category.create({ data ,include:{
    user:true
  }})
  return result
}

const getAllFromDB = async (
  filters: ICategoryFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<ICategory[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options)
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      OR: categorySearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    })
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          equals: (filterData as any)[key],
        },
      })),
    })
  }

  const whereConditions: Prisma.CategoryWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}

  const result = await prisma.category.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  })
  const total = await prisma.category.count({
    where: whereConditions,
  })

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  }
}
const UserGetService = async(id:string)=>{
  const isExistUser = await prisma.category.findFirst({
    where:{
      userId:id
    }
  })
  if(id && id !== isExistUser?.id){
    throw new ApiError(httpStatus.BAD_REQUEST,"User does not machet")
  }
  const result = await prisma.category.findMany({
    where:{
      userId:id
     
    }
  })
 return result
}
const getByIdFromDB = async (id: string): Promise<ICategory | null> => {

    const result = await prisma.category.findUnique({
      where: {
        id,
      },
      include:{
        user: true
      }
    })
    return result
  }
  
  const updateOneInDB = async (
    id: string,
    payload: Partial<ICategory>,
  )=> {
    const isExistUser = await prisma.category.findFirst({
      where:{
        id:id
      }
    })
    if(id && id !== isExistUser?.id){
      throw new ApiError(httpStatus.BAD_REQUEST,"Category id does not machet")
    }
    const result = await prisma.category.updateMany({
      where: {
      userId:isExistUser?.id
      },
      data: payload,
      
    })
    return result
  }
  
  const deleteByIdFromDB = async (id: string): Promise<ICategory> => {
    const result = await prisma.category.delete({
      where: {
        id,
      },
      include:{
        user:true
      }
    })
  
    return result
  }

export const CategoryService = {
  insertIntoDB,
  getAllFromDB,
  updateOneInDB,
  getByIdFromDB,
  deleteByIdFromDB,
  UserGetService

}

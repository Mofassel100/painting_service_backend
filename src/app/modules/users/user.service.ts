
import prisma from '../../../share/prisma'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'
import { IUser, IUserFilterRequest } from './user.interface'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'
import { paginationHelpers } from '../../../helper/paginationHelper'
import { userSearchableFields } from './user.constant'
import { Prisma, Roles } from '@prisma/client'



const insertIntoDB = async (data: IUser): Promise<IUser> => {
  const isExistUser = await prisma.user.findUnique({
    where: {
      email: data?.email,
    },
  })
  if (isExistUser) {
    throw new ApiError(httpStatus.BAD_GATEWAY, 'User already exist')
  }
  const result = await prisma.user.create({ data })
  return result
}
const getAllAdmin = async()=>{
  const result = await prisma.user.findMany({
    where:{
      role: Roles.admin
    }
  })
  return result
}
const getAllUser= async()=>{
  const result = await prisma.user.findMany({
    where:{
      role: Roles.user
    }
  })
  return result
}
const getAllFromDB = async (
  filters: IUserFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<IUser[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options)
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      OR: userSearchableFields.map(field => ({
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
         
          equals:  (filterData as { [key: string]: string | undefined })[key],
        },
      })),
    })
  }

  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}

  const result = await prisma.user.findMany({
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
  const total = await prisma.user.count({
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


export const UserService = {
  insertIntoDB,
  getAllFromDB,
  getAllAdmin,
  getAllUser
}

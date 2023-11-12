import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import prisma from '../../../share/prisma'
import { IService, IServiceFilterRequest } from './service.interface'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'
import { ICategory } from '../category/category.interface'
import { paginationHelpers } from '../../../helper/paginationHelper'
import {
  serviceFilterableFields,
  serviceRelationalFieldsMapper,
  serviceSearchableFields,
} from './service.constant'
import { Prisma } from '@prisma/client'

const insertIntoDB = async (data: IService) => {
  const isExistService = await prisma.category.findFirst({
    where: {
      title: data.title,
    },
    include: {
      user: true,
    },
  })
  if (isExistService?.title !== data.title) {
    throw new ApiError(
      httpStatus.BAD_GATEWAY,
      'Service and category does not matched',
    )
  }
  const result = await prisma.service.create({ data })

  return result
}

const getAllFromDB = async (
  filters: IServiceFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<ICategory[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options)
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      OR: serviceSearchableFields.map(field => ({
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
          equals: (filterData as { [key: string]: string | undefined })[key],
        },
      })),
    })
  }

  const whereConditions: Prisma.ServiceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}

  const result = await prisma.service.findMany({
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
  const total = await prisma.service.count({
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
const UserGetService = async (id: string) => {
  const result = await prisma.service.findMany({
    where: {
      userId: id,
    },
    include: {
      category: true,
      user: true,
    },
  })
  return result
}
const allService = async (id: string) => {
  const result = await prisma.service.findMany({
    where: {
      categoryId: id,
    },
    include: {
      category: true,
      user: true,
    },
  })
  return result
}
const getByIdFromDB = async (id: string): Promise<ICategory | null> => {
  const result = await prisma.service.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  })
  return result
}

const updateOneInDB = async (id: string, payload: Partial<ICategory>) => {
  const isExistUser = await prisma.user.findFirst({
    where: {
      id: id,
    },
  })
  if (id && isExistUser && id !== isExistUser?.id) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'user id does not matched')
  }
  const result = await prisma.service.updateMany({
    where: {
      id: isExistUser?.id,
    },
    data: payload,
  })
  return result
}

const deleteByIdFromDB = async (id: string) => {
  const result = await prisma.service.delete({
    where: {
      id,
    },
    include: {
      user: true,
    },
  })
  return result
}
const getAllFromDBService = async (
  filters: IServiceFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<IService[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options)
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      OR: serviceSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    })
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (serviceFilterableFields.includes(key)) {
          return {
            [serviceRelationalFieldsMapper[key]]: {
              id: (filterData as { [key: string]: string | undefined })[key],
              titile: (filterData as { [key: string]: string | undefined })[
                key
              ],
              name: (filterData as { [key: string]: string | undefined })[key],
            },
          }
        } else {
          return {
            [key]: {
              equals: (filterData as { [key: string]: string | undefined })[
                key
              ],
            },
          }
        }
      }),
    })
  }

  // if (Object.keys(filterData).length > 0) {
  //   andConditions.push({
  //     AND: Object.keys(filterData).map(key => ({
  //       [key]: {
  //         equals: (filterData as { [key: string]: string | undefined })[key],
  //       },
  //     })),
  //   })
  // }

  const whereConditions: Prisma.ServiceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}

  const result = await prisma.service.findMany({
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
  const total = await prisma.service.count({
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

export const ServiceService = {
  insertIntoDB,
  getAllFromDB,
  updateOneInDB,
  getByIdFromDB,
  deleteByIdFromDB,
  UserGetService,
  allService,
  getAllFromDBService,
}

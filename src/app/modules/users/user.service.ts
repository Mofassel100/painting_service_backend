/* eslint-disable @typescript-eslint/ban-ts-comment */
// import { v2 as cloudinary} from 'cloudinary';

import prisma from '../../../share/prisma'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'
import { IUser, IUserFilterRequest } from './user.interface'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'
import { paginationHelpers } from '../../../helper/paginationHelper'
import { userSearchableFields } from './user.constant'
import { Prisma } from '@prisma/client'
// @ts-ignore
// const cloudinary = require("cloudinary").v2

// cloudinary.config({
//   cloud_name: config.cloudinary.cloudName,
//   api_key:config.cloudinary.apiKey,
//   api_secret: config.cloudinary.apiSecret
// });

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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          equals: (filterData as any)[key],
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

// const getByIdFromDB = async (id: string): Promise<AcademicFaculty | null> => {
//     const result = await prisma.academicFaculty.findUnique({
//         where: {
//             id
//         }
//     });
//     return result;
// };

// const updateOneInDB = async (
//     id: string,
//     payload: Partial<AcademicFaculty>
// ): Promise<AcademicFaculty> => {
//     const result = await prisma.academicFaculty.update({
//         where: {
//             id
//         },
//         data: payload
//     });

//     if (result) {
//         await RedisClient.publish(EVENT_ACADEMIC_FACULTY_UPDATED, JSON.stringify(result));
//     }
//     return result;
// };

// const deleteByIdFromDB = async (id: string): Promise<AcademicFaculty> => {
//     const result = await prisma.academicFaculty.delete({
//         where: {
//             id
//         }
//     });

//     if (result) {
//         await RedisClient.publish(EVENT_ACADEMIC_FACULTY_DELETED, JSON.stringify(result));
//     }
//     return result;
// };

export const UserService = {
  insertIntoDB,
  getAllFromDB,
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// import { v2 as cloudinary} from 'cloudinary';

import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'

import { Prisma } from '@prisma/client'
import { IFeedback, IFeedbackFilterRequest } from './feedback.interface'
import prisma from '../../../share/prisma'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'
import { paginationHelpers } from '../../../helper/paginationHelper'
import { feedbackSearchableFields } from './feedback.constant'

const insertIntoDB = async (datas:IFeedback): Promise<IFeedback> => {
  const isEistUser = await prisma.feedback.findFirst({
    where:{
      email: datas.email
    }
  })
  let result;
  if(isEistUser){
    const feedbackData:Partial<IFeedback> = datas
    const res  = await prisma.feedback.update({
      where:{
        id: isEistUser.id
      },
      data:feedbackData
    })
 result  = res
  }else{
    const res = await prisma.feedback.create({
      data:datas,
      include: {
        service: true,
      },
    })
    result = res
  }
  return result
}

const getAllFromDB = async (
  filters: IFeedbackFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<IFeedback[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options)
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      OR: feedbackSearchableFields.map(field => ({
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

  const whereConditions: Prisma.FeedbackWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}

  const result = await prisma.feedback.findMany({
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
  const total = await prisma.feedback.count({
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
const getByIdFromDB = async (id: string): Promise<IFeedback | null> => {
  const result = await prisma.feedback.findUnique({
    where: {
      id,
    },
    include: {
      service: true,
    },
  })
  return result
}

const updateOneInDB = async (id: string, payload: Partial<IFeedback>) => {
  const isExistUser = await prisma.user.findFirst({
    where: {
      id: id,
    },
  })
  if (id !== isExistUser?.id) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User id does not machet')
  }
  const result = await prisma.feedback.update({
    where: {
      id: isExistUser?.id,
    },
    data: payload,
  })
  return result
}

const deleteByIdFromDB = async (id: string): Promise<IFeedback> => {
  const result = await prisma.feedback.delete({
    where: {
      id,
    },
    include: {
      service: true,
    },
  })

  return result
}

export const FeedbackService = {
  insertIntoDB,
  getAllFromDB,
  updateOneInDB,
  getByIdFromDB,
  deleteByIdFromDB,
}

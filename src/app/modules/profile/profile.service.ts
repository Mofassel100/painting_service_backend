import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import prisma from '../../../share/prisma'
import { IUser } from '../users/user.interface'

const getByIdFromDB = async (id: string) => {
  console.log(id)
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  })
  return result
}

const updateOneInDB = async (
  id: string,
  payload: Partial<IUser>,
): Promise<IUser> => {
  const isEistUser = await prisma.user.findUnique({
    where: {
      id: id,
    },
  })
  if (!isEistUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist')
  }
  const result = await prisma.user.update({
    where: {
      id: isEistUser.id,
    },
    data: payload,
  })
  return result
}

const deleteByIdFromDB = async (id: string): Promise<IUser> => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  })

  return result
}

export const ProfileService = {
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
}

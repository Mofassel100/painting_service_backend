import prisma from '../../../share/prisma'
import { IUser } from '../users/user.interface'

const getByIdFromDB = async (id: string): Promise<IUser | null> => {
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
  const result = await prisma.user.update({
    where: {
      id,
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

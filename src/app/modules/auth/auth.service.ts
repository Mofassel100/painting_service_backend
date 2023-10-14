import httpStatus from 'http-status'
import { Secret } from 'jsonwebtoken'
import config from '../../../config'
import ApiError from '../../../errors/ApiError'

import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface'
import prisma from '../../../share/prisma'
import { jwtHelpers } from '../../../helper/jwtHelper'

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email,password } = payload

  const isUserExist = await prisma.user.findFirst({
    where: {
      email: email,
    },
  })

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }
  if(isUserExist.password !== password){
    throw new ApiError(httpStatus.BAD_REQUEST,"Password is invelid")
  }

  
  const payloads = {
    email: isUserExist.email,
    role: isUserExist.role,
    phoneNumber: isUserExist.phoneNumber,
    password: isUserExist.password,
    imageURL : isUserExist.imageURL,
    address : isUserExist.address,
     name : isUserExist.name
  }
  const accessToken = jwtHelpers.createToken(
    payloads,
    config.jwt.secret as Secret,
    config.jwt.jwt_expire_in as string,
  )

  const refreshToken = jwtHelpers.createToken(
    payloads,
    config.jwt.jwt_refresh_secret as Secret,
    config.jwt.jwt_refresh_expire_in as string,
  )

  return {
    accessToken,
    refreshToken,
  }
}

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {

  if(!token){
    throw new ApiError(httpStatus.BAD_REQUEST,"token not found")
  }
  let verifiedToken = null
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.jwt_refresh_secret as Secret,
    )
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token')
  }

  const { email } = verifiedToken

  // tumi delete hye gso  kintu tumar refresh token ase
  // checking deleted user's refresh token

  const isUserExist = await prisma.user.findFirst({where:{
    email: email
  }})
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }
  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      email: isUserExist.email,
      role: isUserExist.role,
      phoneNumber: isUserExist.phoneNumber,
      password: isUserExist.password,
      imageURL : isUserExist.imageURL,
      address : isUserExist.address,
       name : isUserExist.name
    },
    config.jwt.secret as Secret,
    config.jwt.jwt_expire_in as string,
  )

  return {
    accessToken: newAccessToken,
  }
}

export const AuthService = {
  loginUser,
  refreshToken,
}

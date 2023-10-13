/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express'
import { userRoutes } from '../modules/users/user.route'
import { ProfileRoutes } from '../modules/profile/profile.routes'

const router = express.Router()

const moduleRoutes: any[] = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/profile',
    route: ProfileRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router

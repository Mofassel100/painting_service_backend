
import express from 'express'
import { userRoutes } from '../modules/users/user.route'
import { ProfileRoutes } from '../modules/profile/profile.routes'
import { CategoryRoutes } from '../modules/category/category.routes'
import { ServiceRoutes } from '../modules/service/service.router'
import { FeedbackRoutes } from '../modules/feedback/feedback.routes'
import { AuthRoutes } from '../modules/auth/auth.route'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/profile',
    route: ProfileRoutes,
  },
  {
    path: '/category',
    route: CategoryRoutes,
  },
  {
    path: '/service',
    route: ServiceRoutes,
  },
  {
    path: '/feedback',
    route: FeedbackRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router

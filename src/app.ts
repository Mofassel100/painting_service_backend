import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import fileupload  from "express-fileupload"
import routes from './app/routes'

import cookieParser from 'cookie-parser'
import globalErrorHandler from './app/middlewares/globalErrorHandler'


const app: Application = express()

const corsOptions = {
  origin: true,
  credentials: true,
}
app.use(cors())
app.use('*', cors(corsOptions))
app.use(cookieParser())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1', routes)
app.use(globalErrorHandler)
app.use(fileupload(
  {
    useTempFiles:true
  }
))

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  })
  next()
})
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   res.status(httpStatus.OK).json({
//     success: true,
//     message: 'Welcome HTTP SERVER',
//   })
// })

export default app

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

export default app

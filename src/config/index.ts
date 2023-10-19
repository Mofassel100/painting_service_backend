import dotenv from 'dotenv'
import path from 'path'
import { z } from 'zod'

dotenv.config({ path: path.join(process.cwd(), '.env') })

const envVarsZodSchema = z.object({
  NODE_ENV: z.string(),
  PORT: z.string() || 5000,
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  JWT_REFRESH_EXPIRES_IN: z.string(),
})

const envVars = envVarsZodSchema.parse(process.env)

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  jwt: {
    secret: envVars.JWT_SECRET,
    jwt_expire_in: envVars.JWT_EXPIRES_IN,
    jwt_refresh_secret: envVars.JWT_REFRESH_SECRET,
    jwt_refresh_expire_in: envVars.JWT_REFRESH_EXPIRES_IN,
  }}



import { JwtPayload } from 'jsonwebtoken'

declare global {
  namespace Express {
   type Request = {
      user: JwtPayload | null
    }
  }
}

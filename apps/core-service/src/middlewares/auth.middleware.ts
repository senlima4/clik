import { verifyJWT } from "@/utils/jwt"
import { findUserById } from "@/services/users.service"
import { HttpException } from "@exceptions/HttpException"
import type { RequestWithUserHandler } from "@/types"

const authMiddleware: RequestWithUserHandler = async (req, _res, next) => {
  try {
    const headerToken = req.header("Authorization")
    const Authorization = req.cookies["Authorization"] || (headerToken ? headerToken.split("Bearer ")[1] : null)

    if (Authorization) {
      const payload = verifyJWT(Authorization)
      if (!payload) {
        return next(new HttpException(401, "invalid session"))
      }

      const user = await findUserById(payload.id)

      if (user) {
        req.user = user
        next()
      } else {
        next(new HttpException(401, "Wrong authentication token"))
      }
    } else {
      next(new HttpException(401, "invalid session"))
    }
  } catch (error) {
    next(new HttpException(401, "invalid session"))
  }
}

export default authMiddleware

import type { RequestHandler, RequestWithUserHandler } from "@/types"
import { VerifyCodeParam, RequestCodeParams, AuthService } from "@services/auth.service"

interface IAuthController {
  requestOTP: RequestHandler
  verifyOTP: RequestHandler
  logout: RequestHandler
  whoami: RequestWithUserHandler
}

export const AuthController: IAuthController = {
  requestOTP: async (req, res, next) => {
    try {
      await AuthService.requestCode(req.body as RequestCodeParams)
      res.status(201)
    } catch (error) {
      next(error)
    }
  },
  verifyOTP: async (req, res, next) => {
    try {
      await AuthService.verifyCode(req.body as VerifyCodeParam)
      res.status(201)
    } catch (error) {
      next(error)
    }
  },
  logout: async (_req, res, next) => {
    try {
      res.setHeader("Set-Cookie", ["Authorization=; Max-age=0"])
      res.status(204)
    } catch (error) {
      next(error)
    }
  },
  whoami: async (req, res, next) => {
    try {
      const { user } = req
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  },
}

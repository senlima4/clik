import type { RequestHandler } from "@/types"
import { VerifyInput, RequestInput, RegisterService } from "@/services/register.service"

interface IRegisterController {
  startFlow: RequestHandler
  completeFlow: RequestHandler
}

export const RegisterController: IRegisterController = {
  startFlow: async (req, res, next) => {
    try {
      await RegisterService.startRequest(req.body as RequestInput)
      res.status(201)
    } catch (error) {
      next(error)
    }
  },
  completeFlow: async (req, res, next) => {
    try {
      await RegisterService.verifyRequest(req.body as VerifyInput)
      res.status(201)
    } catch (error) {
      next(error)
    }
  },
}

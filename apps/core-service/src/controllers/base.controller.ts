import type { RequestHandler } from "@/types"

interface IBaseController {
  health: RequestHandler
  csrf: RequestHandler
}

export const BaseController: IBaseController = {
  health: async (req, res, next) => {
    try {
      res.status(200).json({ data: Date.now() })
    } catch (error) {
      next(error)
    }
  },
  csrf: async (req, res, next) => {
    try {
      if (req.csrfToken) {
        const csrf = req.csrfToken()
        res.status(200).json({ csrf })
      }
      res.status(201)
    } catch (error) {
      next(error)
    }
  },
}

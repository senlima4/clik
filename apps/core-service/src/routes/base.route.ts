import { Router } from "express"

import type { RouterItem } from "@/types"
import csrfMiddleware from "@/middlewares/csrf.middleware"
import { BaseController } from "@controllers/base.controller"

const router = Router()

// ? response date time(number)
router.get("/health", BaseController.health)

// ? response csrf token - please dont call at interface side
router.get("/csrf", csrfMiddleware, BaseController.csrf)

export const BaseRoute: RouterItem = {
  prefix: "/",
  router,
}

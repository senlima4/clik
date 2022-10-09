import { Router } from "express"

import type { RouterItem } from "@/types"
import { RegisterController } from "@/controllers/register.controller"

const router = Router()

router.post("/start", RegisterController.startFlow)
router.post("/complete", RegisterController.completeFlow)

export const RegisterRoute: RouterItem = {
  prefix: "/register",
  router,
}
